import { Router } from 'express'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { verifyPassword } from '../lib/password.js'
import { signToken } from '../lib/jwt.js'
import { validate } from '../middleware/validate.js'

const router = Router()
const prisma = new PrismaClient()

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

router.post('/login', validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const valid = await verifyPassword(password, user.password)
    if (!valid) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const token = signToken({ userId: user.id, email: user.email })
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
