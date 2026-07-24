import type { IconType } from 'react-icons'
import { FaHtml5, FaCss3Alt, FaJs, FaVuejs, FaReact, FaGitAlt, FaNodeJs } from 'react-icons/fa'
import { SiTypescript, SiTailwindcss, SiVite, SiGreensock } from 'react-icons/si'

export interface Skill {
  name: string
  icon: IconType
}

export const skills: Skill[] = [
  { name: 'HTML', icon: FaHtml5 },
  { name: 'CSS', icon: FaCss3Alt },
  { name: 'JavaScript', icon: FaJs },
  { name: 'Vue.js', icon: FaVuejs },
  { name: 'React', icon: FaReact },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'Vite', icon: SiVite },
  { name: 'GSAP', icon: SiGreensock },
  { name: 'Git', icon: FaGitAlt },
  { name: 'Node.js', icon: FaNodeJs },
]