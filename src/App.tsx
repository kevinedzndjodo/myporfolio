import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Overview from './components/sections/Overview'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'


function App() {
  return (
    <>
      <div className="ambient-glow">
        <span></span>
        <span></span>
      </div>
      <main>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:h-screen">
          <Hero />
          <About />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mx-4 md:mx-16 my-6 md:my-8">
          <Overview />
          <Skills />
        </div>
        <Projects />
      </main>
    </>
  )
}

export default App