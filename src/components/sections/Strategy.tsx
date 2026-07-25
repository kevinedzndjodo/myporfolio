import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../../context/ThemeContext'

gsap.registerPlugin(ScrollTrigger)

const strategyText =
  "My approach is simple: understand the problem deeply, design with intention, and build with care. Every project starts with real conversations, not templates, so the end result actually fits what you need, not a generic mold."

function Strategy() {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const tlRef = useRef<gsap.core.Tween | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      const words = containerRef.current!.querySelectorAll('.word')
      const textColor = getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim()
      tlRef.current = gsap.to(words, {
        color: textColor,
        stagger: 0.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 1,
        },
      })
    }, containerRef)
    return () => { ctx.revert(); tlRef.current = null }
  }, [theme])

  return (
    <section id="strategy" className="px-4 md:px-16 py-16 md:py-24 bg-background">
      <p ref={containerRef} className="text-2xl md:text-4xl font-medium leading-snug max-w-4xl">
        {strategyText.split(' ').map((word, index) => (
          <span key={index} className="word text-muted">
            {word}{' '}
          </span>
        ))}
      </p>
    </section>
  )
}

export default Strategy