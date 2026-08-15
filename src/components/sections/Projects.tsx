import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { api, CACHE_KEY, getCached, isValidRecentCache, type Project } from '../../lib/api'
import LoadState from './ui/LoadState'
import Modal from './ui/Modal'

gsap.registerPlugin(ScrollTrigger)

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:4000'

function projectImage(project: Project) {
  return project.image.startsWith('/uploads/')
    ? `${API_BASE}${project.image}`
    : `${import.meta.env.BASE_URL}projects/${project.image}`
}

function TechChips({ tech }: { tech: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tech.map((t) => (
        <span key={t} className="text-xs text-muted border border-border rounded-full px-3 py-1">
          {t}
        </span>
      ))}
    </div>
  )
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className="project-card grid md:grid-cols-2 gap-6 md:gap-10 bg-surface rounded-2xl p-4 md:p-10">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="project-image overflow-hidden rounded-xl block md:min-h-[360px]"
        aria-label={`Open ${project.name} (opens in a new tab)`}
      >
        <img
          src={projectImage(project)}
          alt={project.name}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          width={1440}
          height={900}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </a>

      <div className="project-content flex flex-col">
        <div className="flex items-center gap-3">
          <span className="text-[11px] uppercase tracking-widest text-accent font-medium">Featured</span>
          {project.year && <span className="text-xs text-muted">{project.year}</span>}
        </div>
        <h3 className="text-2xl md:text-3xl font-semibold text-text mt-2">{project.name}</h3>
        <p className="text-muted text-sm md:text-base mt-3">{project.description}</p>

        {project.challenges && (
          <div className="mt-5">
            <p className="text-xs text-accent font-medium uppercase tracking-wider">Challenges</p>
            <p className="text-muted text-sm mt-1">{project.challenges}</p>
          </div>
        )}

        {project.outcome && (
          <div className="mt-4">
            <p className="text-xs text-accent font-medium uppercase tracking-wider">Outcome</p>
            <p className="text-muted text-sm mt-1">{project.outcome}</p>
          </div>
        )}

        <div className="mt-5">
          <TechChips tech={project.tech} />
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-6">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-background px-5 py-2.5 rounded-md font-medium text-sm hover:opacity-90 transition"
          >
            Visit site <ExternalLink size={14} />
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
    </article>
  )
}

function ProjectCard({ project, onDetails }: { project: Project; onDetails: (p: Project) => void }) {
  return (
    <article className="project-card group bg-surface rounded-2xl p-4 md:p-5 flex flex-col">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="project-image overflow-hidden rounded-xl block aspect-video"
        aria-label={`Open ${project.name} (opens in a new tab)`}
      >
        <img
          src={projectImage(project)}
          alt={project.name}
          loading="lazy"
          decoding="async"
          width={1200}
          height={675}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </a>

      <div className="project-content flex flex-col flex-1 pt-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-text">{project.name}</h3>
          {project.year && <span className="text-xs text-muted">{project.year}</span>}
        </div>
        <p className="text-muted text-sm mt-2 line-clamp-2">{project.description}</p>

        <div className="mt-3">
          <TechChips tech={project.tech} />
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-auto pt-5">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-background px-4 py-2 rounded-md font-medium text-sm hover:opacity-90 transition"
          >
            Visit site
          </a>
          <button
            onClick={() => onDetails(project)}
            className="text-sm text-muted hover:text-accent transition"
          >
            Details
          </button>
        </div>
      </div>
    </article>
  )
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  if (!project) return null
  return (
    <Modal open={!!project} onClose={onClose} labelledBy="project-detail-title">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-accent font-medium">Project</span>
          <h3 id="project-detail-title" className="text-2xl font-semibold text-text mt-1">
            {project.name}
          </h3>
        </div>
        <button onClick={onClose} aria-label="Close details" className="text-muted hover:text-text transition p-1">
          <span className="text-2xl leading-none">&times;</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-xl mb-5 aspect-video">
        <img src={projectImage(project)} alt={project.name} className="w-full h-full object-cover" />
      </div>

      <p className="text-muted text-sm md:text-base">{project.description}</p>

      {project.challenges && (
        <div className="mt-5">
          <p className="text-xs text-accent font-medium uppercase tracking-wider">Challenges</p>
          <p className="text-muted text-sm mt-1">{project.challenges}</p>
        </div>
      )}

      {project.outcome && (
        <div className="mt-4">
          <p className="text-xs text-accent font-medium uppercase tracking-wider">Outcome</p>
          <p className="text-muted text-sm mt-1">{project.outcome}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-5">
        {project.tech.map((t) => (
          <span key={t} className="text-xs text-muted border border-border rounded-full px-3 py-1">
            {t}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-6 pt-5 border-t border-border">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-accent text-background px-5 py-2.5 rounded-md font-medium text-sm hover:opacity-90 transition"
        >
          Visit site <ExternalLink size={14} />
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
    </Modal>
  )
}

function Skeleton() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid md:grid-cols-2 gap-6 md:gap-10 bg-surface rounded-2xl p-4 md:p-10 animate-pulse">
        <div className="aspect-video bg-border/40 rounded-xl" />
        <div className="flex flex-col gap-3">
          <div className="h-4 w-1/4 bg-border/40 rounded" />
          <div className="h-6 w-1/2 bg-border/40 rounded" />
          <div className="h-4 w-full bg-border/40 rounded" />
          <div className="h-4 w-2/3 bg-border/40 rounded" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-surface rounded-2xl p-4 md:p-5 animate-pulse">
            <div className="aspect-video bg-border/40 rounded-xl" />
            <div className="h-5 w-2/3 bg-border/40 rounded mt-4" />
            <div className="h-4 w-full bg-border/40 rounded mt-2" />
          </div>
        ))}
      </div>
    </div>
  )
}

function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [projects, setProjects] = useState<Project[]>(() => getCached(CACHE_KEY.projects) ?? [])
  const [loading, setLoading] = useState(() => !isValidRecentCache(CACHE_KEY.projects))
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [detail, setDetail] = useState<Project | null>(null)

  useEffect(() => {
    let ignore = false
    api.projects.list()
      .then((data) => {
        if (!ignore) {
          setProjects(data)
          setError(null)
        }
      })
      .catch(() => {
        if (!ignore && projects.length === 0) setError('Could not load projects. The API may be offline.')
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })
    return () => { ignore = true }
  }, [reloadKey])

  const load = () => {
    setLoading(true)
    setError(null)
    setReloadKey((k) => k + 1)
  }

  const featured = projects.find((p) => p.featured) ?? null
  const rest = featured ? projects.filter((p) => p.id !== featured.id) : projects

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
            scrollTrigger: { trigger: card, start: 'top 80%' },
          }
        )

        gsap.fromTo(
          content,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.4,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 80%' },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [projects, loading, error])

  return (
    <section id="projects" ref={containerRef} className="px-4 md:px-16 py-16 md:py-24 bg-background">
      <h2 className="text-2xl md:text-4xl font-semibold text-text mb-10 md:mb-16">Projects</h2>

      <LoadState
        loading={loading}
        error={error}
        isEmpty={projects.length === 0}
        onRetry={load}
        skeleton={<Skeleton />}
        empty={<p className="text-muted text-sm">No projects yet.</p>}
      />

      {featured && (
        <div className="mb-8">
          <FeaturedCard project={featured} />
        </div>
      )}

      {rest.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((project) => (
            <ProjectCard key={project.id} project={project} onDetails={setDetail} />
          ))}
        </div>
      )}

      <ProjectModal project={detail} onClose={() => setDetail(null)} />
    </section>
  )
}

export default Projects
