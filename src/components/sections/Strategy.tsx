import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

function Strategy() {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const tlRef = useRef<gsap.core.Tween | null>(null)
  const { t } = useLanguage()
  const strategyText = t('strategy.text')

  useEffect(() => {
    if (!containerRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const words = containerRef.current!.querySelectorAll('.word')
      tlRef.current = gsap.fromTo(
        words,
        { opacity: 0.2 },
        {
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      )
    }, containerRef)
    return () => { ctx.revert(); tlRef.current = null }
  }, [strategyText])

  return (
    <section id="strategy" className="px-4 md:px-16 py-16 md:py-24 bg-background">
      <p ref={containerRef} className="text-2xl md:text-4xl font-medium leading-snug max-w-4xl">
        {strategyText.split(' ').map((word, index) => (
          <span key={index} className="word text-text">
            {word}{' '}
          </span>
        ))}
      </p>
    </section>
  )
}

export default Strategy