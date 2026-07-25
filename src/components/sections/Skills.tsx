import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { api, type Skill as SkillType } from '../../lib/api'
import { getIcon } from '../../lib/icons'
import Clock from './ui/Clock'

function Skills() {
  const [skills, setSkills] = useState<SkillType[]>([])
  const trackRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    api.skills.list().then(setSkills).catch(console.error)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    animationRef.current = gsap.to(track, {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: 'none',
    })

    return () => {
      animationRef.current?.kill()
    }
  }, [skills])

  const handleMouseEnter = () => {
    animationRef.current?.pause()
  }

  const handleMouseLeave = () => {
    animationRef.current?.resume()
  }

  return (
    <section className="px-6 md:px-12 py-12 md:py-20 bg-surface rounded-2xl flex flex-col gap-6 h-full">
      <h3 className="text-muted text-sm md:text-base">Web Development</h3>
        <p className='text-text'> I build modern, accessible web experiences with React, TypeScript, and Tailwind — from concept through to launch.</p>
      <div className="w-full overflow-hidden">
        <div
          ref={trackRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex w-max gap-3"
        >
          {[...skills, ...skills].map((skill, index) => {
            const Icon = getIcon(skill.icon)
            return (
              <span
                key={`${skill.id}-${index}`}
                className="flex items-center gap-2 border border-border text-text text-xs md:text-sm px-2.5 py-1 md:px-3 md:py-1.5 rounded-full whitespace-nowrap hover:bg-accent hover:text-background hover:border-accent transition"
              >
                {Icon && <Icon />}
                {skill.name}
              </span>
            )
          })}
        </div>
      </div>

      <div className="hidden lg:block mt-auto">
        <Clock />
      </div>
    </section>
  )
}

export default Skills
