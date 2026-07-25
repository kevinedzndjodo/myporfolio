import { useState, useEffect } from 'react'
import { api, type Message } from '../../lib/api'
import { Trash2 } from 'lucide-react'

function MessagesManager() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { load() }, [])

  const load = async () => {
    setLoading(true)
    try { setMessages(await api.messages.list()) }
    catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this message?')) return
    try { await api.messages.delete(id); load() }
    catch (e) { console.error(e) }
  }

  if (loading) return <p className="text-muted">Loading...</p>

  return (
    <div>
      <h2 className="text-xl font-semibold text-text mb-6">Contact Messages</h2>

      <div className="flex flex-col gap-3">
        {messages.map(m => (
          <div key={m.id} className="bg-surface border border-border rounded-xl p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-text font-medium">{m.name}</span>
                  <span className="text-muted text-sm">{m.email}</span>
                </div>
                <p className="text-muted text-xs mt-1">{new Date(m.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => handleDelete(m.id)} className="text-muted hover:text-red-500 transition p-1 shrink-0"><Trash2 size={16} /></button>
            </div>
            <p className="text-text text-sm mt-3 whitespace-pre-wrap">{m.message}</p>
          </div>
        ))}
        {messages.length === 0 && <p className="text-muted text-sm">No messages yet.</p>}
      </div>
    </div>
  )
}

export default MessagesManager
