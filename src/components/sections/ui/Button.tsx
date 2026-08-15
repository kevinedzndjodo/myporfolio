import { FaGithub } from 'react-icons/fa'

interface ButtonProps {
  children: string
  href: string
  variant?: 'primary' | 'secondary'
  icon?: 'github' | 'arrow'
  external?: boolean
}

function Button({ children, href, variant = 'primary', icon, external = true }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 w-fit rounded-md font-medium text-sm md:text-base transition'

  const styles =
    variant === 'primary'
      ? 'bg-accent text-background px-5 py-2.5 md:px-6 md:py-3 hover:opacity-90'
      : 'border border-border text-text px-5 py-2.5 md:px-6 md:py-3 hover:border-accent hover:text-accent'

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`${base} ${styles}`}
    >
      {children}
      {icon === 'github' && <FaGithub size={16} />}
      {icon === 'arrow' && <span aria-hidden>→</span>}
    </a>
  )
}

export default Button
