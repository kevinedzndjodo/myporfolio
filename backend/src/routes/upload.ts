import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

const storage = multer.diskStorage({
  destination: path.resolve('uploads'),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    const name = crypto.randomBytes(16).toString('hex')
    cb(null, `${name}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['.png', '.jpg', '.jpeg', '.webp', '.gif']
    const ext = path.extname(file.originalname).toLowerCase()
    if (allowed.includes(ext)) {
      cb(null, true)
    } else {
      cb(new Error('Only image files (png, jpg, webp, gif) are allowed'))
    }
  },
})

router.post('/', authMiddleware, (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        res.status(400).json({ error: err.message })
      } else {
        res.status(400).json({ error: err.message })
      }
      return
    }

    if (!req.file) {
      res.status(400).json({ error: 'No file provided' })
      return
    }

    res.json({ url: `/uploads/${req.file.filename}` })
  })
})

export default router
