import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
  if (!imageRef.current || !sectionRef.current) return

  const mm = gsap.matchMedia()

  mm.add('(min-width: 1024px)', () => {
    gsap.fromTo(
      imageRef.current,
      { xPercent: 150, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 1.5, ease: 'power2.out' }
    )
  })

  mm.add('(max-width: 1023px)', () => {
    gsap.fromTo(
      imageRef.current,
      { xPercent: -150, opacity: 0 },
      {
        xPercent: 0,
        opacity: 1,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    )
  })

  return () => mm.revert()
}, [])
  return (
    <section ref={sectionRef} className="relative h-full min-h-100 lg:min-h-screen overflow-hidden">
      <img
        ref={imageRef}
        src={`${import.meta.env.BASE_URL}me.png`}
        alt="Kevin, frontend developer"
        className="w-full h-full object-contain grayscale hover:grayscale-0 transition-[filter] duration-500"
      />

      <div className="lg:hidden absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-linear-to-t from-background via-background/80 to-transparent">
        <h2 className="text-lg md:text-2xl font-semibold text-text leading-snug">
          Hi, I'm Kevin — a frontend developer based in Yaoundé, Cameroon.
        </h2>

        <p className="text-muted text-sm mt-2 max-w-lg">
          I build modern, accessible web experiences with React, TypeScript, and Tailwind.
        </p>
      </div>
    </section>
  )
}

export default About