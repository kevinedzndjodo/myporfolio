import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

function Hero() {
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mm = gsap.matchMedia()

        mm.add('(min-width: 1024px)', () => {
            if (!contentRef.current) return

            gsap.fromTo(
                contentRef.current,
                { xPercent: -100, opacity: 0 },
                { xPercent: 0, opacity: 1, duration: 2, ease: 'power2.out' }
            )
        })

        return () => mm.revert()
    }, [])

    return (
        <section className="min-h-screen lg:h-full flex flex-col justify-center lg:justify-between gap-10 lg:gap-0 px-4 md:px-16 py-12 md:py-8 bg-background overflow-hidden">
            <div ref={contentRef} className="flex flex-col justify-center lg:justify-between h-full gap-10 lg:gap-0">
                <div className="flex items-center gap-2 w-fit bg-black px-3 py-1 rounded-full">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <span className="text-muted text-xs md:text-sm">Open for new projects</span>
                </div>

                <div>
                    <h1 className="text-3xl md:text-6xl font-semibold text-text max-w-3xl leading-tight">
                        Crafted experiences, designed to be beautiful and built to last.
                    </h1>

                    <p className="text-muted text-sm md:text-base mt-4 max-w-lg">
                        I'm a frontend developer building modern, accessible web experiences from Yaoundé, Cameroon.
                    </p>


                    <a href="#overview"
                        className="group inline-flex items-center gap-2 mt-6 md:mt-8 bg-accent text-background px-5 py-2.5 md:px-6 md:py-3 rounded-md font-medium text-sm md:text-base overflow-hidden relative"
                    >
                        <span className="transition-transform duration-300 group-hover:translate-x-2">
                            Find out more
                        </span>
                        <span className="transition-all duration-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                            →
                        </span>
                    </a>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted text-xs md:text-base">
                    <span>Find me at</span>
                    <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-text hover:text-accent transition">
                        <FontAwesomeIcon icon={faGithub} />
                        GitHub
                    </a>
                    <a href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-text hover:text-accent transition">
                        <FontAwesomeIcon icon={faLinkedin} />
                        LinkedIn
                    </a>
                    <a href="/kevin-resume.pdf" download="Kevin-Resume.pdf" className="text-text hover:text-accent transition underline underline-offset-4">
                        Download my resume (PDF)
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Hero