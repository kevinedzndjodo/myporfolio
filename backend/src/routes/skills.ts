import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../db.js'
import { authMiddleware } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = Router()

const skillSchema = z.object({
  name: z.string().min(1).max(50),
  icon: z.string().min(1).max(100),
})

router.get('/', async (_req, res) => {
  try {
    const skills = await prisma.skill.findMany({ orderBy: { name: 'asc' } })
    res.json(skills)
  } catch (error) {
    console.error('Get skills error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/', authMiddleware, validate(skillSchema), async (req, res) => {
  try {
    const skill = await prisma.skill.create({ data: req.body })
    res.status(201).json(skill)
  } catch (error) {
    console.error('Create skill error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.put('/:id', authMiddleware, validate(skillSchema), async (req, res) => {
  try {
    const id = Number(req.params.id)
    const skill = await prisma.skill.update({ where: { id }, data: req.body })
    res.json(skill)
  } catch (error) {
    console.error('Update skill error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id)
    await prisma.skill.delete({ where: { id } })
    res.status(204).end()
  } catch (error) {
    console.error('Delete skill error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
