import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaGithub } from 'react-icons/fa'
import { api, type Project } from '../../lib/api'
import LoadState from './ui/LoadState'

gsap.registerPlugin(ScrollTrigger)

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:4000'

function Skeleton() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {[1, 2].map((i) => (
        <div key={i} className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-surface rounded-2xl p-4 md:p-10 animate-pulse">
          <div className="w-full md:w-1/2 aspect-video bg-border/40 rounded-xl" />
          <div className="w-full md:w-1/2 flex flex-col gap-3">
            <div className="h-6 w-1/2 bg-border/40 rounded" />
            <div className="h-4 w-full bg-border/40 rounded" />
            <div className="h-4 w-2/3 bg-border/40 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

function Projects() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [reloadKey, setReloadKey] = useState(0)

    useEffect(() => {
      let ignore = false
      api.projects.list()
        .then(data => {
          if (!ignore) setProjects(data)
        })
        .catch(() => {
          if (!ignore) setError('Could not load projects. The API may be offline.')
        })
        .finally(() => {
          if (!ignore) setLoading(false)
        })
      return () => { ignore = true }
    }, [reloadKey])

    const load = () => {
      setLoading(true)
      setError(null)
      setReloadKey(k => k + 1)
    }

    useEffect(() => {
        if (loading || error) return
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const cards = containerRef.current?.querySelectorAll('.project-card')
        if (!cards) return

        if (reduceMotion) return

        const ctx = gsap.context(() => {
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
        }, containerRef)

        return () => ctx.revert()
    }, [projects, loading, error])

    return (
        <section id="projects" ref={containerRef} className="px-4 md:px-16 py-16 md:py-24 bg-background">
            <h2 className="text-2xl md:text-4xl font-semibold text-text mb-10 md:mb-16">
                Projects
            </h2>

            <p className="text-muted text-sm md:text-base mb-10 md:mb-16">
                Here are some of the projects I've worked on. Each one was a unique challenge that helped me grow as a developer.
            </p>

            <LoadState
              loading={loading}
              error={error}
              isEmpty={projects.length === 0}
              onRetry={load}
              skeleton={<Skeleton />}
              empty={<p className="text-muted text-sm">No projects yet.</p>}
            />

            <div className="flex flex-col gap-6 md:gap-8">
                {projects.map((project) => (
                    <div key={project.id} className="project-card group flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-surface rounded-2xl p-4 md:p-10 hover:bg-border/30 transition">
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-image w-full md:w-1/2 overflow-hidden rounded-xl block"
                            aria-label={`Open ${project.name} (opens in a new tab)`}
                        >
                            <img
                                src={project.image.startsWith('/uploads/') ? `${API_BASE}${project.image}` : `${import.meta.env.BASE_URL}projects/${project.image}`}
                                alt={project.name}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </a>

                        <div className="project-content w-full md:w-1/2">
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="text-xl md:text-2xl font-semibold text-text">
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

                            <div className="flex flex-wrap items-center gap-4 mt-5">
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-accent text-background px-4 py-2 rounded-md font-medium text-sm hover:opacity-90 transition"
                              >
                                Visit site
                              </a>
                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-text hover:text-accent transition text-sm"
                                >
                                  <FaGithub size={16} /> Source code
                                </a>
                              )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Projects