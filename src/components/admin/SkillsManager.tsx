import { useState, useEffect } from 'react'
import { api, type Skill, type SkillInput } from '../../lib/api'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Skill | null>(null)
  const [form, setForm] = useState<SkillInput>({ name: '', icon: '' })

  useEffect(() => { load() }, [])

  const load = async () => {
    setLoading(true)
    try { setSkills(await api.skills.list()) }
    catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const openCreate = () => {
    setEditing(null); setForm({ name: '', icon: '' }); setShowForm(true)
  }

  const openEdit = (s: Skill) => {
    setEditing(s); setForm({ name: s.name, icon: s.icon }); setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editing) await api.skills.update(editing.id, form)
      else await api.skills.create(form)
      setShowForm(false); load()
    } catch (e) { console.error(e) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this skill?')) return
    try { await api.skills.delete(id); load() }
    catch (e) { console.error(e) }
  }

  if (loading) return <p className="text-muted">Loading...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text">Skills</h2>
        <button onClick={openCreate} className="flex items-center gap-2 bg-accent text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
          <Plus size={16} /> New Skill
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-12 md:pt-20 px-4">
          <form onSubmit={handleSubmit} className="bg-surface rounded-2xl p-6 w-full max-w-md border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text">{editing ? 'Edit' : 'New'} Skill</h3>
              <button type="button" onClick={() => setShowForm(false)} className="text-muted hover:text-text transition"><X size={20} /></button>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-sm text-muted mb-1 block">Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text text-sm" required />
              </div>
              <div>
                <label className="text-sm text-muted mb-1 block">Icon component name</label>
                <input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text text-sm" placeholder="e.g. FaReact" required />
                <p className="text-xs text-muted mt-1">Must match a react-icons import (e.g. FaReact, SiTypescript)</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button type="submit" className="flex-1 bg-accent text-background py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition">{editing ? 'Update' : 'Create'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 border border-border rounded-lg text-sm text-muted hover:text-text transition">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {skills.map(s => (
          <div key={s.id} className="bg-surface border border-border rounded-full px-4 py-2 flex items-center gap-2">
            <span className="text-text text-sm">{s.name}</span>
            <span className="text-muted text-xs">({s.icon})</span>
            <button onClick={() => openEdit(s)} className="text-muted hover:text-accent transition ml-1"><Pencil size={14} /></button>
            <button onClick={() => handleDelete(s.id)} className="text-muted hover:text-red-500 transition"><Trash2 size={14} /></button>
          </div>
        ))}
        {skills.length === 0 && <p className="text-muted text-sm">No skills yet.</p>}
      </div>
    </div>
  )
}

export default SkillsManager
