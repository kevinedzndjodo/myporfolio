import 'dotenv/config'
import fs from 'fs'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { config } from './config.js'

fs.mkdirSync('uploads', { recursive: true })
import authRoutes from './routes/auth.js'
import projectRoutes from './routes/projects.js'
import faqRoutes from './routes/faq.js'
import skillRoutes from './routes/skills.js'
import contactRoutes from './routes/contact.js'
import messageRoutes from './routes/messages.js'
import uploadRoutes from './routes/upload.js'
import settingsRoutes from './routes/settings.js'

const app = express()

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'blob:'],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        fontSrc: ["'self'", 'data:'],
      },
    },
  })
)
const corsOrigin = process.env.CORS_ORIGIN
app.use(cors({ origin: corsOrigin ? corsOrigin.split(',').map((s) => s.trim()) : 'http://localhost:5173' }))
app.use(express.json({ limit: '10kb' }))
app.use('/uploads', express.static('uploads'))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api/', limiter)

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Too many messages. Try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api/contact', contactLimiter)

app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/faq', faqRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/settings', settingsRoutes)

app.get('/', (_req, res) => {
  res.json({
    service: 'myporfolio-api',
    status: 'ok',
    endpoints: ['/api/auth', '/api/projects', '/api/faq', '/api/skills', '/api/contact', '/api/messages', '/api/upload', '/api/settings', '/api/health'],
  })
})

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.listen(config.PORT, () => {
  console.log(`Server running on http://localhost:${config.PORT}`)
})

export default app
