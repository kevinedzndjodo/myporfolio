import Button from './ui/Button'

const highlights = [
  { title: 'Frontend first', text: 'React, TypeScript, Tailwind — shipped on time.' },
  { title: 'Accessible & fast', text: 'Keyboard-friendly, reduced-motion aware, performant.' },
  { title: 'Concept to launch', text: 'From first conversation to live deployment.' },
]

function Overview() {
  return (
    <section id="overview" className="px-6 md:px-12 py-12 md:py-20 bg-surface rounded-2xl flex flex-col gap-8 justify-between h-full">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold text-text leading-snug">
          Frontend developer experienced in taking ideas from concept to launch.
        </h2>

        <p className="text-muted text-sm md:text-base max-w-lg mt-6">
          I build modern, accessible web experiences with React, TypeScript and Tailwind. If you're starting a new web project, let's talk about what you need.
        </p>
      </div>

      <div>
        <ul className="flex flex-col gap-4 md:gap-5">
          {highlights.map((h) => (
            <li key={h.title} className="border-l-2 border-accent pl-4">
              <p className="text-text font-medium text-sm md:text-base">{h.title}</p>
              <p className="text-muted text-xs md:text-sm mt-0.5">{h.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="#contact">Say hello</Button>
          <Button href="#projects" variant="secondary" external={false}>See my work</Button>
        </div>
      </div>
    </section>
  )
}

export default Overview
