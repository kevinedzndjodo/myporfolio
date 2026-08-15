import type { FaqItem, Project, Skill } from '../lib/api'

export const FALLBACK_PROJECTS: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Streamly',
    description:
      'A subscription reselling platform where customers buy Netflix, Spotify and other digital subscriptions from a pool of shared accounts, with no-cancellation guarantees.',
    challenges:
      'Building a secure end-to-end payment flow with CinetPay (MTN & Orange Mobile Money), implementing subscription assignment from a shared account pool, and a job queue to auto-detect and re-provision failed accounts.',
    outcome:
      'Launched a production platform with user auth, order management, an admin dashboard with statistics, subscription renewals, and automated account-pool provisioning.',
    year: 2026,
    tech: ['React', 'Node.js', 'PostgreSQL', 'Tailwind', 'Express'],
    url: 'https://streamly-frontend-three.vercel.app/',
    image: 'project-streamly.webp',
    github: 'https://github.com/kevinedzndjodo/streamly',
    featured: true,
  },
  {
    name: 'Shop Marketplace',
    description:
      'A marketplace for used clothing in Yaoundé where sellers list products with WhatsApp checkout, a category filter, search, seller profiles and a product detail page.',
    challenges:
      'Handling React Router navigation across four pages, structuring seller and product data in localStorage, and wiring WhatsApp links that pre-fill a French purchase message.',
    outcome:
      'A multi-page React app with search, category filtering, seller cards with ratings, and a post-product flow. Deployed live on GitHub Pages.',
    year: 2026,
    tech: ['React', 'Vite', 'Tailwind', 'React Router'],
    url: 'https://kevinedzndjodo.github.io/e-commerce-goodclothes/',
    image: 'shop-marketplace.webp',
    github: 'https://github.com/kevinedzndjodo/e-commerce-goodclothes',
    featured: false,
  },
  {
    name: 'Expense Tracker',
    description:
      'A React expense tracker where you add and delete transactions, see a running balance, and get separate income and expense totals — using the Context API and a useReducer.',
    challenges:
      'Organising shared state with a reducer, keeping the balance and income/expense totals in sync after every add or delete, and a clean minimal UI.',
    outcome:
      'A classic budgeting dashboard with live balance updates, deployed live on GitHub Pages.',
    year: 2026,
    tech: ['React', 'Context API', 'Tailwind'],
    url: 'https://kevinedzndjodo.github.io/expense-tracker/',
    image: 'expense-tracker.webp',
    github: 'https://github.com/kevinedzndjodo/expense-tracker',
    featured: false,
  },
  {
    name: 'Todo App (Vue 3)',
    description:
      'A first Vue 3 project that starts with a reusable ToDoItem component: a checkbox with a label prop, styled as a clean single-item todo list.',
    challenges:
      'Getting familiar with Vue single-file components, the script/template split, and props-based behaviour in a minimal setup.',
    outcome:
      'A working Vue 3 app showcasing component composition, deployed live on GitHub Pages.',
    year: 2026,
    tech: ['Vue 3', 'Vite', 'JavaScript'],
    url: 'https://kevinedzndjodo.github.io/todo-vue/',
    image: 'todo-vue.webp',
    github: 'https://github.com/kevinedzndjodo/todo-vue',
    featured: false,
  },
  {
    name: 'Simple Calculator',
    description:
      'A dependency-free calculator with basic arithmetic, clear controls and a live display — the opening project of the 30-days-30-projects challenge.',
    challenges:
      'Keeping the display accurate through chained operations without a framework, and making the buttons feel responsive.',
    outcome:
      'A zero-dependency day-01 project, completing the 30-days set alongside the color generator, digital clock and counter apps.',
    year: 2026,
    tech: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://kevinedzndjodo.github.io/30days30projects/day-01-calculator/',
    image: 'day-01-calculator.webp',
    github: 'https://github.com/kevinedzndjodo/30days30projects',
    featured: false,
  },
  {
    name: 'Color Palette Generator',
    description:
      'A random color palette generator that creates harmonious five-color schemes from a single seed color, with one-click hex copying.',
    challenges: 'Balancing randomness with harmony so generated palettes are always usable, and keeping the UI snappy with no framework.',
    outcome: 'A zero-dependency tool that generates and copies accessible palettes in a single tap.',
    year: 2026,
    tech: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://kevinedzndjodo.github.io/30days30projects/day-02-color-generator/',
    image: 'day-02-color-generator.webp',
    github: 'https://github.com/kevinedzndjodo/30days30projects',
    featured: false,
  },
  {
    name: 'Digital Clock',
    description:
      'A minimal full-screen digital clock with a 12/24-hour toggle, live seconds, and a date header — built as part of the 30-days-30-projects challenge.',
    challenges: 'Keeping the font rendering crisp and the update loop efficient without any library.',
    outcome: 'A dependency-free clock that stays perfectly in sync and degrades gracefully.',
    year: 2026,
    tech: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://kevinedzndjodo.github.io/30days30projects/day-03-digital-clock/',
    image: 'day-03-digital-clock.webp',
    github: 'https://github.com/kevinedzndjodo/30days30projects',
    featured: false,
  },
  {
    name: 'Counter App',
    description:
      'A focused counter app with increment, decrement and reset controls plus a live step-size selector — part of the 30-days-30-projects challenge.',
    challenges: 'Designing controls so the primary action is impossible to miss and state resets are never accidental.',
    outcome: 'A clean, accessible counter with clear visual feedback on every interaction.',
    year: 2026,
    tech: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://kevinedzndjodo.github.io/30days30projects/day-04-counter-app/',
    image: 'day-04-counter-app.webp',
    github: 'https://github.com/kevinedzndjodo/30days30projects',
    featured: false,
  },
]

export const FALLBACK_PROJECTS_AS_PROJECTS: Project[] = FALLBACK_PROJECTS.map((p, i) => ({
  ...p,
  id: i + 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}))

export const FALLBACK_FAQ: FaqItem[] = [
  {
    id: 1,
    question: 'What technologies do you work with?',
    answer:
      "I build interfaces with React, TypeScript, and Tailwind, and I'm comfortable with Node.js when a project needs a backend.",
  },
  {
    id: 2,
    question: 'Are you available for freelance projects?',
    answer:
      "Yes — I'm currently open to new freelance frontend work. Reach out via the contact section above.",
  },
  {
    id: 3,
    question: 'Do you work with clients outside Cameroon?',
    answer:
      'Yes, I work remotely with clients anywhere, communicating via email or your preferred tool.',
  },
  {
    id: 4,
    question: 'Can I see more of your work?',
    answer:
      "Everything displayed above is something I built and shipped myself. Beyond this page, I'm running a 30-days-30-projects challenge where I publish a new small app every day on GitHub — the best way to watch how I work in real time.",
  },
]

export const FALLBACK_SKILLS: Skill[] = [
  'HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Tailwind', 'Vite', 'GSAP', 'Git',
].map((name, i) => {
  const icon = ['FaHtml5', 'FaCss3Alt', 'FaJs', 'FaReact', 'SiTypescript', 'SiTailwindcss', 'SiVite', 'SiGreensock', 'FaGitAlt'][i]
  return { id: i + 1, name, icon }
})
