import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()
const prisma = new PrismaClient()

router.get('/', authMiddleware, async (_req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(messages)
  } catch (error) {
    console.error('Get messages error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id)
    await prisma.contactMessage.delete({ where: { id } })
    res.status(204).end()
  } catch (error) {
    console.error('Delete message error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
