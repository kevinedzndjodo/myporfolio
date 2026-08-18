import { useEffect, useState } from 'react'
import { Home, User, FolderOpen, Mail, Languages } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import type { TranslationKey } from '../i18n/translations'

const navItems = [
  { href: '#home', label: 'nav.home', icon: Home },
  { href: '#overview', label: 'nav.about', icon: User },
  { href: '#projects', label: 'nav.projects', icon: FolderOpen },
  { href: '#contact', label: 'nav.contact', icon: Mail },
] as const

function BottomNav() {
  const { lang, toggleLang, t } = useLanguage()
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-background/80 backdrop-blur-lg border-t border-border"
      aria-label="Primary">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = active === href
          return (
            <a
              key={href}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center gap-0.5 transition-colors text-[10px] ${
                isActive ? 'text-accent' : 'text-muted hover:text-accent'
              }`}
            >
              <Icon size={20} />
              {t(label as TranslationKey)}
            </a>
          )
        })}
        <button
          onClick={toggleLang}
          aria-label={t('toggle.language')}
          className="flex flex-col items-center gap-0.5 transition-colors text-[10px] text-muted hover:text-accent cursor-pointer"
        >
          <Languages size={20} />
          {lang === 'en' ? 'FR' : 'EN'}
        </button>
      </div>
    </nav>
  )
}

export default BottomNav