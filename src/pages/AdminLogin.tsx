import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/admin')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-surface rounded-2xl p-8 border border-border">
        <h1 className="text-2xl font-semibold text-text mb-6">Admin Login</h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="text-sm text-muted mb-1 block">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-accent transition"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm text-muted mb-1 block">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-accent transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-background font-medium py-2.5 rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <Link to="/" className="text-center text-sm text-muted hover:text-accent transition">
            ← Back to portfolio
          </Link>
        </div>
      </form>
    </div>
  )
}

export default AdminLogin
