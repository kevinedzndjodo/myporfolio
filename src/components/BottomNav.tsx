import { Home, User, FolderOpen, HelpCircle } from 'lucide-react'

const navItems = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#overview', label: 'About', icon: User },
  { href: '#projects', label: 'Projects', icon: FolderOpen },
  { href: '#faq', label: 'FAQ', icon: HelpCircle },
]

function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-background/80 backdrop-blur-lg border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            className="flex flex-col items-center gap-0.5 text-muted hover:text-accent transition-colors text-[10px]"
          >
            <Icon size={20} />
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default BottomNav
