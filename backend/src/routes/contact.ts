import { Router } from 'express'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { validate } from '../middleware/validate.js'
import { sendContactEmail } from '../lib/email.js'

const router = Router()
const prisma = new PrismaClient()

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
})

router.post('/', validate(contactSchema), async (req, res) => {
  try {
    const message = await prisma.contactMessage.create({ data: req.body })

    await sendContactEmail(req.body.name, req.body.email, req.body.message).catch((err) => {
      console.error('Failed to send email notification:', err)
    })

    res.status(201).json({ id: message.id })
  } catch (error) {
    console.error('Contact error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
