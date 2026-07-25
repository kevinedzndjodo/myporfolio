import type { IconType } from 'react-icons'
import { FaHtml5, FaCss3Alt, FaJs, FaVuejs, FaReact, FaGitAlt, FaNodeJs, FaPython, FaDocker, FaAws, FaFigma } from 'react-icons/fa'
import { SiTypescript, SiTailwindcss, SiVite, SiGreensock, SiNextdotjs, SiExpress, SiPrisma, SiPostgresql, SiMongodb, SiRedis, SiGraphql, SiJest } from 'react-icons/si'

export const iconMap: Record<string, IconType> = {
  FaHtml5, FaCss3Alt, FaJs, FaVuejs, FaReact, FaGitAlt, FaNodeJs, FaPython, FaDocker, FaAws, FaFigma,
  SiTypescript, SiTailwindcss, SiVite, SiGreensock, SiNextdotjs, SiExpress, SiPrisma, SiPostgresql, SiMongodb, SiRedis, SiGraphql, SiJest,
}

export function getIcon(name: string): IconType | null {
  return iconMap[name] || null
}
