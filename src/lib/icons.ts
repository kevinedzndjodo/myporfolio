import type { IconType } from 'react-icons'
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt, FaVuejs, FaFigma } from 'react-icons/fa'
import { SiTypescript, SiTailwindcss, SiVite, SiGreensock } from 'react-icons/si'

export const iconMap: Record<string, IconType> = {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt, FaVuejs, FaFigma,
  SiTypescript, SiTailwindcss, SiVite, SiGreensock,
}

export function getIcon(name: string): IconType | null {
  return iconMap[name] || null
}
