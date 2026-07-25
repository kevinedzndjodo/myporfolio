import { Sun, Moon } from 'lucide-react'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Overview from '../components/sections/Overview'
import Skills from '../components/sections/Skills'
import Projects from '../components/sections/Projects'
import Strategy from '../components/sections/Strategy'
import Faq from '../components/sections/Faq'
import Contact from '../components/sections/Contact'
import BottomNav from '../components/BottomNav'
import { useTheme } from '../context/ThemeContext'

function Portfolio() {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <button
        onClick={toggleTheme}
        className="fixed bottom-20 lg:bottom-6 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-surface border border-border text-text hover:bg-accent hover:text-background transition-all duration-300 shadow-lg"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="ambient-glow">
        <span></span>
        <span></span>
      </div>
      <main className="pb-16 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:h-screen">
          <Hero />
          <About />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mx-4 md:mx-16 my-6 md:my-8">
          <Overview />
          <Skills />
        </div>
        <Strategy />
        <Projects />
        <Faq />
        <Contact />
      </main>
      <footer className="px-4 md:px-16 py-6 md:py-8 bg-background text-muted text-sm md:text-base text-center">
        &copy; {new Date().getFullYear()} Kevin Edza. All rights reserved.
      </footer>
      <BottomNav />
    </>
  )
}

export default Portfolio
