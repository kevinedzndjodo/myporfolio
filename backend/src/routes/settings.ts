import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../db.js'
import { authMiddleware } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = Router()

const updateSchema = z.object({
  about_image: z.string().optional(),
  site_title: z.string().optional(),
})

router.get('/', async (_req, res) => {
  try {
    const settings = await prisma.setting.findMany()
    const map: Record<string, string> = {}
    for (const s of settings) map[s.key] = s.value
    res.json(map)
  } catch (error) {
    console.error('Get settings error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.put('/', authMiddleware, validate(updateSchema), async (req, res) => {
  try {
    for (const [key, value] of Object.entries(req.body)) {
      if (value !== undefined) {
        await prisma.setting.upsert({
          where: { key },
          update: { value: value as string },
          create: { key, value: value as string },
        })
      }
    }
    const settings = await prisma.setting.findMany()
    const map: Record<string, string> = {}
    for (const s of settings) map[s.key] = s.value
    res.json(map)
  } catch (error) {
    console.error('Update settings error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
