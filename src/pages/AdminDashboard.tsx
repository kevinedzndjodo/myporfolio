import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { LogOut, FolderOpen, HelpCircle, Code, Mail } from 'lucide-react'
import ProjectsManager from '../components/admin/ProjectsManager'
import FaqManager from '../components/admin/FaqManager'
import SkillsManager from '../components/admin/SkillsManager'
import MessagesManager from '../components/admin/MessagesManager'

type Tab = 'projects' | 'faq' | 'skills' | 'messages'

const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: 'projects', label: 'Projects', icon: FolderOpen },
  { key: 'faq', label: 'FAQ', icon: HelpCircle },
  { key: 'skills', label: 'Skills', icon: Code },
  { key: 'messages', label: 'Messages', icon: Mail },
]

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('projects')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-text font-semibold hover:text-accent transition">Portfolio</Link>
            <span className="text-muted text-sm">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted text-sm hidden md:block">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-muted hover:text-text transition"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="flex gap-1 mb-8 border-b border-border overflow-x-auto">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                activeTab === key
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted hover:text-text'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'projects' && <ProjectsManager />}
        {activeTab === 'faq' && <FaqManager />}
        {activeTab === 'skills' && <SkillsManager />}
        {activeTab === 'messages' && <MessagesManager />}
      </div>
    </div>
  )
}

export default AdminDashboard
