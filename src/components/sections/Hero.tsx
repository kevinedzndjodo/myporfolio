import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const stats = [
  { value: '2+', label: 'Years building' },
  { value: '8', label: 'Projects shipped' },
  { value: '30', label: 'Day project streak' },
]

function Hero() {
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mm = gsap.matchMedia()

        mm.add('(min-width: 1024px)', () => {
            if (!contentRef.current) return
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

            gsap.fromTo(
                contentRef.current,
                { xPercent: -100, opacity: 0 },
                { xPercent: 0, opacity: 1, duration: 2, ease: 'power2.out' }
            )
        })

        return () => mm.revert()
    }, [])

    return (
        <section id="home" className="min-h-[80vh] lg:min-h-screen lg:h-full flex flex-col justify-between gap-4 lg:gap-0 px-4 md:px-16 py-6 md:py-8 bg-background overflow-hidden">
            <div ref={contentRef} className="flex flex-col justify-between h-full gap-4 lg:gap-0">
                <div className="flex items-center gap-2 w-fit bg-background border border-border px-3 py-1 rounded-full">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <span className="text-muted text-xs md:text-sm">Open for new projects</span>
                </div>

                <div className="flex flex-col justify-center flex-1">
                    <p className="text-sm md:text-base font-medium text-accent mb-3">Kevin Edza — Frontend Developer</p>
                    <h1 className="text-3xl md:text-5xl xl:text-6xl font-semibold text-text max-w-3xl leading-tight">
                        Crafted experiences, designed to be beautiful and built to last.
                    </h1>

                    <p className="text-muted text-sm md:text-base mt-4 max-w-lg">
                        I'm a frontend developer from Yaoundé, Cameroon, turning ideas into fast, accessible web products with React, TypeScript and Tailwind.
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <a href="#overview"
                            className="group inline-flex items-center justify-center gap-2 bg-accent text-background px-5 py-3 md:px-6 md:py-3 rounded-md font-medium text-sm md:text-base overflow-hidden relative w-fit"
                        >
                            <span className="transition-transform duration-300 group-hover:translate-x-2">
                                Find out more
                            </span>
                            <span className="transition-all duration-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                                →
                            </span>
                        </a>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted text-xs md:text-base">
                            <span>Find me at</span>
                            <a href="https://github.com/kevinedzndjodo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-text hover:text-accent transition">
                                <FaGithub size={16} />
                                GitHub
                            </a>
                            <a href="https://linkedin.com/in/kevinndjodo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-text hover:text-accent transition">
                                <FaLinkedin size={16} />
                                LinkedIn
                            </a>
                            <a href={`${import.meta.env.BASE_URL}Kevin_Edza_Resume.pdf`} download="Kevin-Edza-Resume.pdf" className="text-text hover:text-accent transition underline underline-offset-4">
                                Download my resume (PDF)
                            </a>
                        </div>
                    </div>

                    <dl className="grid grid-cols-3 gap-4 w-fit">
                        {stats.map((s) => (
                            <div key={s.label} className="px-4 md:px-8 py-3 border-t border-border">
                                <dt className="sr-only">{s.label}</dt>
                                <dd className="text-2xl md:text-3xl font-semibold text-text">{s.value}</dd>
                                <p className="text-xs text-muted mt-1">{s.label}</p>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    )
}

export default Hero
