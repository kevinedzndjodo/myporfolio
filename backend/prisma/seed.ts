import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const PROJECTS = [
  {
    name: 'Streamly',
    description:
      'A subscription reselling platform where customers buy Netflix, Spotify and other digital subscriptions from a pool of shared accounts, with no-cancellation guarantees.',
    challenges:
      'Building a secure end-to-end payment flow with CinetPay (MTN & Orange Mobile Money), implementing subscription assignment from a shared account pool, and a job queue to auto-detect and re-provision failed accounts.',
    outcome:
      'Launched a production platform with user auth, order management, an admin dashboard with statistics, subscription renewals, and automated account-pool provisioning.',
    year: 2024,
    tech: ['React', 'Node.js', 'PostgreSQL', 'Tailwind', 'Express'],
    url: 'https://streamly-frontend-three.vercel.app/',
    image: 'project-streamly.png',
    github: 'https://github.com/kevinedzndjodo/streamly',
  },
  {
    name: 'Color Palette Generator',
    description:
      'A random color palette generator that creates harmonious five-color schemes from a single seed color, with one-click hex copying.',
    challenges: 'Balancing randomness with harmony so generated palettes are always usable, and keeping the UI snappy with no framework.',
    outcome: 'A zero-dependency tool that generates and copies accessible palettes in a single tap.',
    year: 2026,
    tech: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://kevinedzndjodo.github.io/30-days-30-projects/day-02-color-generator/',
    image: 'day-02-color-generator.png',
    github: 'https://github.com/kevinedzndjodo/30-days-30-projects',
  },
  {
    name: 'Digital Clock',
    description:
      'A minimal full-screen digital clock with a 12/24-hour toggle, live seconds, and a date header — built as part of the 30-days-30-projects challenge.',
    challenges: 'Keeping the font rendering crisp and the update loop efficient without any library.',
    outcome: 'A dependency-free clock that stays perfectly in sync and degrades gracefully.',
    year: 2026,
    tech: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://kevinedzndjodo.github.io/30-days-30-projects/day-03-digital-clock/',
    image: 'day-03-digital-clock.png',
    github: 'https://github.com/kevinedzndjodo/30-days-30-projects',
  },
  {
    name: 'Counter App',
    description:
      'A focused counter app with increment, decrement and reset controls plus a live step-size selector — part of the 30-days-30-projects challenge.',
    challenges: 'Designing controls so the primary action is impossible to miss and state resets are never accidental.',
    outcome: 'A clean, accessible counter with clear visual feedback on every interaction.',
    year: 2026,
    tech: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://kevinedzndjodo.github.io/30-days-30-projects/day-04-counter-app/',
    image: 'day-04-counter-app.png',
    github: 'https://github.com/kevinedzndjodo/30-days-30-projects',
  },
]

async function main() {
  // Admin user — never fall back to a known default password
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const isProd = process.env.NODE_ENV === 'production'

  if (isProd && (!email || !password)) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in production. Failing seed instead of using known defaults.')
  }
  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required. Refusing to seed with a known default password.')
  }

  const hashed = await bcrypt.hash(password, 12)

  await prisma.user.upsert({
    where: { email },
    update: { password: hashed },
    create: { email, password: hashed, name: 'Admin' },
  })
  console.log('Admin user created:', email)

  // Settings
  const existingSettings = await prisma.setting.count()
  if (existingSettings === 0) {
    await prisma.setting.createMany({
      data: [
        { key: 'about_image', value: '/me.png' },
        { key: 'site_title', value: 'Kevin Edza — Frontend Developer' },
      ],
    })
    console.log('Seeded settings')
  }

  // Projects (upsert by name so new entries appear on existing databases)
  for (const project of PROJECTS) {
    const data = {
      description: project.description,
      challenges: project.challenges,
      outcome: project.outcome,
      year: project.year,
      tech: JSON.stringify(project.tech),
      url: project.url,
      image: project.image,
      github: project.github,
    }
    await prisma.project.upsert({
      where: { name: project.name },
      update: data,
      create: { name: project.name, ...data },
    })
    console.log('Upserted project:', project.name)
  }

  // FAQ
  const existingFaq = await prisma.faqItem.count()
  if (existingFaq === 0) {
    await prisma.faqItem.createMany({
      data: [
        {
          question: 'What technologies do you work with?',
          answer: 'I build interfaces with React, TypeScript, and Tailwind, and I\'m comfortable with Node.js when a project needs a backend.',
        },
        {
          question: 'Are you available for freelance projects?',
          answer: 'Yes — I\'m currently open to new freelance frontend work. Reach out via the contact section above.',
        },
        {
          question: 'Do you work with clients outside Cameroon?',
          answer: 'Yes, I work remotely with clients anywhere, communicating via email or your preferred tool.',
        },
        {
          question: 'Can I see more of your work?',
          answer: 'Everything displayed above is something I built and shipped myself. Beyond this page, I\'m running a 30-days-30-projects challenge where I publish a new small app every day on GitHub — the best way to watch how I work in real time.',
        },
      ],
    })
    console.log('Seeded FAQ items')
  }

  // Skills (frontend-focused)
  const skills = [
    { name: 'HTML', icon: 'FaHtml5' },
    { name: 'CSS', icon: 'FaCss3Alt' },
    { name: 'JavaScript', icon: 'FaJs' },
    { name: 'React', icon: 'FaReact' },
    { name: 'TypeScript', icon: 'SiTypescript' },
    { name: 'Tailwind', icon: 'SiTailwindcss' },
    { name: 'Vite', icon: 'SiVite' },
    { name: 'GSAP', icon: 'SiGreensock' },
    { name: 'Git', icon: 'FaGitAlt' },
  ]

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: {},
      create: skill,
    })
  }
  console.log('Upserted skills')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())