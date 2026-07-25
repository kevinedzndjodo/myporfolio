import { useState, useEffect } from 'react'
import { api } from '../../lib/api'
import { ImageUp } from 'lucide-react'

function SettingsManager() {
  const [aboutImage, setAboutImage] = useState('')
  const [siteTitle, setSiteTitle] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => { load() }, [])

  const load = async () => {
    try {
      const s = await api.settings.get()
      setAboutImage(s.about_image || '')
      setSiteTitle(s.site_title || '')
    } catch (e) { console.error(e) }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await api.upload(file)
      setAboutImage(url)
    } catch (err) {
      setMessage('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    try {
      await api.settings.update({ about_image: aboutImage, site_title: siteTitle })
      setMessage('Saved!')
    } catch {
      setMessage('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:4000'

  return (
    <div>
      <h2 className="text-xl font-semibold text-text mb-6">Site Settings</h2>

      <form onSubmit={handleSave} className="max-w-lg flex flex-col gap-6">
        <div>
          <label className="text-sm text-muted mb-2 block">About Page Image</label>
          <div className="flex items-start gap-4">
            <div className="w-32 h-32 rounded-xl overflow-hidden bg-background border border-border shrink-0">
              {aboutImage ? (
                <img
                  src={aboutImage.startsWith('/uploads/') ? `${API_BASE}${aboutImage}` : `${import.meta.env.BASE_URL}${aboutImage.replace(/^\//, '')}`}
                  alt="About"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted text-xs">No image</div>
              )}
            </div>
            <div className="flex-1">
              <label className="cursor-pointer inline-flex items-center gap-2 bg-accent text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
                <ImageUp size={16} />
                {uploading ? 'Uploading...' : 'Choose file'}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              <p className="text-xs text-muted mt-2">{aboutImage || 'No image set'}</p>
              <p className="text-xs text-muted mt-1">Recommended: square, at least 400x400px</p>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm text-muted mb-1 block">Site Title</label>
          <input
            value={siteTitle}
            onChange={e => setSiteTitle(e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text text-sm"
          />
        </div>

        {message && (
          <p className={`text-sm ${message === 'Saved!' ? 'text-green-500' : 'text-red-500'}`}>{message}</p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full md:w-fit bg-accent text-background px-6 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  )
}

export default SettingsManager
