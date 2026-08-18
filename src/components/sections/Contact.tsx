import { useState } from 'react'
import { api } from '../../lib/api'
import { Send, CheckCircle, Mail } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const CONTACT_EMAIL = 'kevinndjodo@icloud.com'

function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSending(true)
    try {
      await api.contact(form)
      setDone(true)
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : t('contact.error'))
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="px-4 md:px-16 py-16 md:py-24 bg-surface">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-semibold text-text mb-3">{t('contact.title')}</h2>
        <p className="text-muted text-sm md:text-base mb-10">
          {t('contact.text')}
        </p>

        {CONTACT_EMAIL && (
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 text-accent text-sm font-medium mb-8 hover:underline"
          >
            <Mail size={16} /> {t('contact.emailLink')}
          </a>
        )}

        {done ? (
          <div className="bg-background border border-border rounded-2xl p-8 text-center">
            <CheckCircle size={40} className="text-accent mx-auto mb-4" />
            <p className="text-text font-medium text-lg">{t('contact.sentTitle')}</p>
            <p className="text-muted text-sm mt-2">{t('contact.sentText')}</p>
            <button onClick={() => setDone(false)} className="mt-6 text-sm text-accent hover:underline">
              {t('contact.sentAnother')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="text-sm text-muted mb-1 block">{t('contact.name')}</label>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-accent transition"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-sm text-muted mb-1 block">{t('contact.email')}</label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-accent transition"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="text-sm text-muted mb-1 block">{t('contact.message')}</label>
              <textarea
                id="contact-message"
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-accent transition min-h-[140px]"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center gap-2 w-full md:w-fit bg-accent text-background px-6 py-3 rounded-xl font-medium text-sm hover:opacity-90 transition disabled:opacity-50"
            >
              <Send size={16} />
              {sending ? t('contact.sending') : t('contact.send')}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default Contact
