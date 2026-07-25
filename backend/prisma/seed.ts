import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Admin user
  const email = process.env.ADMIN_EMAIL || 'admin@example.com'
  const password = process.env.ADMIN_PASSWORD || 'admin123'
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

  // Projects
  const existingProjects = await prisma.project.count()
  if (existingProjects === 0) {
    await prisma.project.create({
      data: {
        name: 'Streamly',
        description: 'A subscription reselling platform for digital services like Netflix and Spotify.',
        challenges: 'Building a secure payment flow with automatic subscription management and user verification system.',
        outcome: 'Launched a fully functional platform with Stripe integration, user authentication, and admin dashboard.',
        year: 2024,
        tech: JSON.stringify(['React', 'Node.js', 'PostgreSQL', 'Tailwind']),
        url: 'https://streamly-frontend-three.vercel.app/',
        image: 'project-streamly.png',
      },
    })
    console.log('Seeded project: Streamly')
  }

  // FAQ
  const existingFaq = await prisma.faqItem.count()
  if (existingFaq === 0) {
    await prisma.faqItem.createMany({
      data: [
        {
          question: 'What technologies do you work with?',
          answer: 'React, TypeScript, and Tailwind for the frontend, with Node.js and PostgreSQL when a backend is needed.',
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
          question: 'Can i see more of your work?',
          answer: 'You can explore my recently selected projects in the section above. I do not typically write lengthy case-studies here and prefer to show the work live, in-situ, for you to make your own judgements.\nProjects that have undergone significant change since I last worked on them and most projects in general are not shown. This is so you can be confident that every project displayed here is something I have built myself.\nThis portfolio is only a fraction of all work I have ever done. Most projects are either unable to be shown due to NDA or not visual enough for me to want to display here (think bug-fixing, feature addition or internal projects).',
        },
      ],
    })
    console.log('Seeded FAQ items')
  }

  // Skills
  const existingSkills = await prisma.skill.count()
  if (existingSkills === 0) {
    await prisma.skill.createMany({
      data: [
        { name: 'HTML', icon: 'FaHtml5' },
        { name: 'CSS', icon: 'FaCss3Alt' },
        { name: 'JavaScript', icon: 'FaJs' },
        { name: 'Vue.js', icon: 'FaVuejs' },
        { name: 'React', icon: 'FaReact' },
        { name: 'TypeScript', icon: 'SiTypescript' },
        { name: 'Tailwind', icon: 'SiTailwindcss' },
        { name: 'Vite', icon: 'SiVite' },
        { name: 'GSAP', icon: 'SiGreensock' },
        { name: 'Git', icon: 'FaGitAlt' },
        { name: 'Node.js', icon: 'FaNodeJs' },
      ],
    })
    console.log('Seeded skills')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
