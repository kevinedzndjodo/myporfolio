import { Router } from 'express'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { authMiddleware } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = Router()
const prisma = new PrismaClient()

const projectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(5000),
  challenges: z.string().max(10000).optional().nullable(),
  outcome: z.string().max(5000).optional().nullable(),
  year: z.number().int().optional().nullable(),
  tech: z.array(z.string()),
  url: z.string().url(),
  image: z.string().min(1),
  github: z.string().url().optional().nullable(),
})

type ProjectRow = {
  id: number; name: string; description: string; challenges: string | null; outcome: string | null; year: number | null
  tech: string; url: string; image: string; github: string | null; createdAt: Date; updatedAt: Date
}

function formatProject(p: ProjectRow) {
  return { ...p, tech: JSON.parse(p.tech) as string[] }
}

router.get('/', async (_req, res) => {
  try {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(projects.map(formatProject))
  } catch (error) {
    console.error('Get projects error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/', authMiddleware, validate(projectSchema), async (req, res) => {
  try {
    const { tech, ...rest } = req.body
    const data = { ...rest, tech: JSON.stringify(tech) }
    const project = await prisma.project.create({ data })
    res.status(201).json(formatProject(project))
  } catch (error) {
    console.error('Create project error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.put('/:id', authMiddleware, validate(projectSchema), async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { tech, ...rest } = req.body
    const data = { ...rest, tech: JSON.stringify(tech) }
    const project = await prisma.project.update({ where: { id }, data })
    res.json(formatProject(project))
  } catch (error) {
    console.error('Update project error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id)
    await prisma.project.delete({ where: { id } })
    res.status(204).end()
  } catch (error) {
    console.error('Delete project error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
