import { useState, useEffect } from 'react'
import { api, type Project, type ProjectInput } from '../../lib/api'
import { Plus, Pencil, Trash2, X, ImageUp } from 'lucide-react'

const defaultForm: ProjectInput = {
  name: '', description: '', challenges: '', outcome: '', year: null, tech: [], url: '', image: '', github: '',
}

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:4000'

function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [form, setForm] = useState<ProjectInput>(defaultForm)
  const [techInput, setTechInput] = useState('')
  const [uploading, setUploading] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let ignore = false
    api.projects.list()
      .then(data => { if (!ignore) setProjects(data) })
      .catch((e) => { console.error(e) })
      .finally(() => { if (!ignore) setLoading(false) })
    return () => { ignore = true }
  }, [reloadKey])

  const load = () => setReloadKey(k => k + 1)

  const openCreate = () => {
    setEditing(null)
    setForm({ ...defaultForm })
    setTechInput('')
    setShowForm(true)
  }

  const openEdit = (p: Project) => {
    setEditing(p)
    setForm({
      name: p.name, description: p.description, challenges: p.challenges || '', outcome: p.outcome || '', year: p.year,
      tech: [...p.tech], url: p.url, image: p.image, github: p.github || '',
    })
    setTechInput('')
    setShowForm(true)
  }

  const addTech = () => {
    const t = techInput.trim()
    if (t && !form.tech.includes(t)) setForm({ ...form, tech: [...form.tech, t] })
    setTechInput('')
  }

  const removeTech = (t: string) => setForm({ ...form, tech: form.tech.filter(x => x !== t) })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editing) await api.projects.update(editing.id, form)
      else await api.projects.create(form)
      setShowForm(false)
      load()
    } catch (e) { console.error(e) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this project?')) return
    try { await api.projects.delete(id); load() }
    catch (e) { console.error(e) }
  }

  if (loading) return <p className="text-muted">Loading...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text">Projects</h2>
        <button onClick={openCreate} className="flex items-center gap-2 bg-accent text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
          <Plus size={16} /> New Project
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-12 md:pt-20 px-4">
          <form onSubmit={handleSubmit} className="bg-surface rounded-2xl p-6 w-full max-w-2xl border border-border max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text">{editing ? 'Edit' : 'New'} Project</h3>
              <button type="button" onClick={() => setShowForm(false)} className="text-muted hover:text-text transition"><X size={20} /></button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-muted mb-1 block">Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text text-sm" required />
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">Year</label>
                  <input type="number" value={form.year ?? ''} onChange={e => setForm({ ...form, year: e.target.value ? Number(e.target.value) : null })} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text text-sm" placeholder="e.g. 2024" />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted mb-1 block">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text text-sm min-h-[80px]" required />
              </div>

              <div>
                <label className="text-sm text-muted mb-1 block">Challenges / Difficulties</label>
                <textarea value={form.challenges ?? ''} onChange={e => setForm({ ...form, challenges: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text text-sm min-h-[100px]" placeholder="What were the main challenges and how did you solve them?" />
              </div>

              <div>
                <label className="text-sm text-muted mb-1 block">Outcome / Results</label>
                <textarea value={form.outcome ?? ''} onChange={e => setForm({ ...form, outcome: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text text-sm min-h-[80px]" placeholder="What was achieved?" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-muted mb-1 block">URL</label>
                  <input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text text-sm" required />
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">GitHub URL</label>
                  <input value={form.github ?? ''} onChange={e => setForm({ ...form, github: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text text-sm" placeholder="https://github.com/..." />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted mb-1 block">Image</label>
                  <div className="flex items-start gap-3">
                    {form.image && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-background border border-border shrink-0">
                        <img src={form.image.startsWith('/uploads/') ? `${API_BASE}${form.image}` : `${import.meta.env.BASE_URL}projects/${form.image}`} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                      <label className="cursor-pointer inline-flex items-center gap-2 bg-accent text-background px-3 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
                        <ImageUp size={14} />
                        {uploading ? 'Uploading...' : 'Upload'}
                        <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                          const file = e.target.files?.[0]
                          if (!file) return
                          setUploading(true)
                          try {
                            const url = await api.upload(file)
                            setForm({ ...form, image: url })
                          } catch (e) { console.error(e) }
                          setUploading(false)
                        }} />
                      </label>
                      <p className="text-xs text-muted mt-1">{form.image || 'No image'}</p>
                    </div>
                  </div>
                </div>

              <div>
                <label className="text-sm text-muted mb-1 block">Technologies</label>
                <div className="flex gap-2">
                  <input value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())} className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-text text-sm" placeholder="Add tech..." />
                  <button type="button" onClick={addTech} className="bg-accent text-background px-3 rounded-lg text-sm">Add</button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {form.tech.map(t => (
                    <span key={t} className="flex items-center gap-1 text-xs bg-background border border-border rounded-full px-2.5 py-1 text-text">
                      {t}
                      <button type="button" onClick={() => removeTech(t)} className="text-muted hover:text-text"><X size={12} /></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button type="submit" className="flex-1 bg-accent text-background py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition">
                {editing ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 border border-border rounded-lg text-sm text-muted hover:text-text transition">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {projects.map(p => (
          <div key={p.id} className="bg-surface border border-border rounded-xl p-4 flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <h4 className="text-text font-medium">{p.name}</h4>
                {p.year && <span className="text-xs text-muted">{p.year}</span>}
              </div>
              <p className="text-muted text-sm mt-1 line-clamp-2">{p.description}</p>
              {p.challenges && <p className="text-muted text-xs mt-1 line-clamp-1 italic">Challenges: {p.challenges}</p>}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {p.tech.map(t => <span key={t} className="text-xs text-muted border border-border rounded-full px-2 py-0.5">{t}</span>)}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(p)} className="text-muted hover:text-accent transition p-1"><Pencil size={16} /></button>
              <button onClick={() => handleDelete(p.id)} className="text-muted hover:text-red-500 transition p-1"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-muted text-sm">No projects yet.</p>}
      </div>
    </div>
  )
}

export default ProjectsManager
