import nodemailer from 'nodemailer'
import { config } from '../config.js'

function createTransporter() {
  if (!config.SMTP_HOST || !config.SMTP_USER || !config.SMTP_PASS) {
    return null
  }

  return nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
  })
}

export async function sendContactEmail(name: string, email: string, message: string): Promise<void> {
  const transporter = createTransporter()
  if (!transporter || !config.CONTACT_EMAIL) {
    console.log('SMTP not configured — contact message not sent')
    console.log({ name, email, message })
    return
  }

  await transporter.sendMail({
    from: `"Portfolio Contact" <${config.SMTP_USER}>`,
    to: config.CONTACT_EMAIL,
    subject: `New message from ${name}`,
    text: `From: ${name} (${email})\n\n${message}`,
    html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message.replace(/\n/g, '<br>')}</p>`,
  })
}
