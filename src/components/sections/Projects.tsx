import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { api, type Project } from '../../lib/api'

gsap.registerPlugin(ScrollTrigger)

function Projects() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
      api.projects.list().then(setProjects).catch(console.error)
    }, [])

    useEffect(() => {
        const cards = containerRef.current?.querySelectorAll('.project-card')
        if (!cards) return

        cards.forEach((card) => {
            const image = card.querySelector('.project-image')
            const content = card.querySelector('.project-content')

            gsap.fromTo(
                image,
                { clipPath: 'inset(100% 0% 0% 0%)' },
                {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                    },
                }
            )

            gsap.fromTo(
                content,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 2.3,
                    delay: 0.7,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                    },
                }
            )
        })
    }, [projects])

    return (
        <section id="projects" ref={containerRef} className="px-4 md:px-16 py-16 md:py-24 bg-background">
            <h2 className="text-2xl md:text-4xl font-semibold text-text mb-10 md:mb-16">
                Projects
            </h2>

            <p className="text-muted text-sm md:text-base mb-10 md:mb-16">
                Here are some of the projects I've worked on. Each one was a unique challenge that helped me grow as a developer.
            </p>

            <div className="flex flex-col gap-6 md:gap-8">
                {projects.map((project) => (

                    <a key={project.id}
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card group flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-surface rounded-2xl p-4 md:p-10 hover:bg-border/30 transition"
                    >
                        <div className="project-image w-full md:w-1/2 overflow-hidden rounded-xl">
                            <img
                                src={`${import.meta.env.BASE_URL}projects/${project.image}`}
                                alt={project.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        <div className="project-content w-full md:w-1/2">
                            <div className="flex items-center gap-3">
                              <h3 className="text-xl md:text-2xl font-semibold text-text group-hover:text-accent transition">
                                  {project.name}
                              </h3>
                              {project.year && <span className="text-xs text-muted">{project.year}</span>}
                            </div>

                            <p className="text-muted text-sm md:text-base mt-3">
                                {project.description}
                            </p>

                            {project.challenges && (
                              <div className="mt-4">
                                <p className="text-xs text-accent font-medium uppercase tracking-wider">Challenges</p>
                                <p className="text-muted text-sm mt-1">{project.challenges}</p>
                              </div>
                            )}

                            {project.outcome && (
                              <div className="mt-3">
                                <p className="text-xs text-accent font-medium uppercase tracking-wider">Outcome</p>
                                <p className="text-muted text-sm mt-1">{project.outcome}</p>
                              </div>
                            )}

                            <div className="flex flex-wrap gap-2 mt-4">
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-xs text-muted border border-border rounded-full px-3 py-1"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    )
}

export default Projects
