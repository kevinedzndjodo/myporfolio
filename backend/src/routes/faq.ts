import { Router } from 'express'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { authMiddleware } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = Router()
const prisma = new PrismaClient()

const faqSchema = z.object({
  question: z.string().min(1).max(500),
  answer: z.string().min(1).max(5000),
})

router.get('/', async (_req, res) => {
  try {
    const items = await prisma.faqItem.findMany()
    res.json(items)
  } catch (error) {
    console.error('Get FAQ error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/', authMiddleware, validate(faqSchema), async (req, res) => {
  try {
    const item = await prisma.faqItem.create({ data: req.body })
    res.status(201).json(item)
  } catch (error) {
    console.error('Create FAQ error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.put('/:id', authMiddleware, validate(faqSchema), async (req, res) => {
  try {
    const id = Number(req.params.id)
    const item = await prisma.faqItem.update({ where: { id }, data: req.body })
    res.json(item)
  } catch (error) {
    console.error('Update FAQ error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id)
    await prisma.faqItem.delete({ where: { id } })
    res.status(204).end()
  } catch (error) {
    console.error('Delete FAQ error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
