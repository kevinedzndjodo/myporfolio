import { useState, useEffect } from 'react'
import { api, type FaqItem, type FaqInput } from '../../lib/api'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

function FaqManager() {
  const [items, setItems] = useState<FaqItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<FaqItem | null>(null)
  const [form, setForm] = useState<FaqInput>({ question: '', answer: '' })

  useEffect(() => { load() }, [])

  const load = async () => {
    setLoading(true)
    try { setItems(await api.faq.list()) }
    catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const openCreate = () => {
    setEditing(null); setForm({ question: '', answer: '' }); setShowForm(true)
  }

  const openEdit = (item: FaqItem) => {
    setEditing(item); setForm({ question: item.question, answer: item.answer }); setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editing) await api.faq.update(editing.id, form)
      else await api.faq.create(form)
      setShowForm(false); load()
    } catch (e) { console.error(e) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this FAQ item?')) return
    try { await api.faq.delete(id); load() }
    catch (e) { console.error(e) }
  }

  if (loading) return <p className="text-muted">Loading...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text">FAQ</h2>
        <button onClick={openCreate} className="flex items-center gap-2 bg-accent text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
          <Plus size={16} /> New FAQ
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-12 md:pt-20 px-4">
          <form onSubmit={handleSubmit} className="bg-surface rounded-2xl p-6 w-full max-w-lg border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text">{editing ? 'Edit' : 'New'} FAQ</h3>
              <button type="button" onClick={() => setShowForm(false)} className="text-muted hover:text-text transition"><X size={20} /></button>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-sm text-muted mb-1 block">Question</label>
                <input value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text text-sm" required />
              </div>
              <div>
                <label className="text-sm text-muted mb-1 block">Answer</label>
                <textarea value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text text-sm min-h-[120px]" required />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button type="submit" className="flex-1 bg-accent text-background py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition">{editing ? 'Update' : 'Create'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 border border-border rounded-lg text-sm text-muted hover:text-text transition">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {items.map(item => (
          <div key={item.id} className="bg-surface border border-border rounded-xl p-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h4 className="text-text font-medium">{item.question}</h4>
              <p className="text-muted text-sm mt-1 line-clamp-2">{item.answer}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(item)} className="text-muted hover:text-accent transition p-1"><Pencil size={16} /></button>
              <button onClick={() => handleDelete(item.id)} className="text-muted hover:text-red-500 transition p-1"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted text-sm">No FAQ items yet.</p>}
      </div>
    </div>
  )
}

export default FaqManager
