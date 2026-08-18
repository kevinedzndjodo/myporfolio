import type { FaqItem, Project, Skill } from '../lib/api'
import type { Lang } from '../i18n/translations'

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

export const FALLBACK_PROJECTS_FR: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Streamly',
    description:
      "Une plateforme de revente d'abonnements où les clients achètent Netflix, Spotify et d'autres abonnements numériques à partir d'un pool de comptes partagés, avec garantie de non-annulation.",
    challenges:
      'Mise en place d’un flux de paiement sécurisé de bout en bout avec CinetPay (MTN & Orange Money), attribution des abonnements depuis un pool de comptes partagés, et une file d’attente de jobs pour détecter et reconfigurer automatiquement les comptes en échec.',
    outcome:
      "Lancement d'une plateforme de production avec authentification utilisateur, gestion des commandes, un tableau de bord admin avec statistiques, renouvellements d'abonnements et provisionnement automatisé du pool de comptes.",
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
      'Une place de marché pour les vêtements d’occasion à Yaoundé où les vendeurs publient des produits avec finalisation sur WhatsApp, un filtre par catégorie, une recherche, des profils vendeurs et une page de détail produit.',
    challenges:
      'Gérer la navigation React Router sur quatre pages, structurer les données vendeurs et produits dans localStorage, et créer des liens WhatsApp pré-remplis avec un message d’achat en français.',
    outcome:
      'Une application React multi-pages avec recherche, filtrage par catégorie, cartes vendeurs avec évaluations et un flux de publication de produits. Déployée en ligne sur GitHub Pages.',
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
      'Un gestionnaire de dépenses React où vous ajoutez et supprimez des transactions, suivez le solde en direct, et obtenez des totaux séparés de revenus et dépenses — avec Context API et un useReducer.',
    challenges:
      'Organiser l’état partagé avec un reducer, garder le solde et les totaux à jour après chaque ajout ou suppression, et garder une interface minimale et propre.',
    outcome:
      'Un tableau de bord budgétaire classique avec mise à jour du solde en temps réel, déployé en ligne sur GitHub Pages.',
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
      'Un premier projet Vue 3 qui commence par un composant réutilisable ToDoItem : une case à cocher avec une prop label, stylisée comme une liste de tâches à un seul élément.',
    challenges:
      'Se familiariser avec les composants mono-fichier de Vue, la séparation script/template et le comportement basé sur les props dans une configuration minimale.',
    outcome:
      'Une application Vue 3 fonctionnelle illustrant la composition de composants, déployée en ligne sur GitHub Pages.',
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
      'Une calculatrice sans dépendance avec opérations arithmétiques de base, contrôles d’effacement et affichage en direct — le projet d’ouverture du défi 30-days-30-projects.',
    challenges:
      'Garder l’affichage précis à travers les opérations enchaînées sans framework, et rendre les boutons réactifs.',
    outcome:
      'Un projet jour-01 zéro dépendance, complétant la série des 30 jours aux côtés du générateur de couleurs, de l’horloge numérique et du compteur.',
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
      'Un générateur de palettes de couleurs aléatoires qui crée des schémas harmonieux de cinq couleurs à partir d’une seule couleur de départ, avec copie du code hex en un clic.',
    challenges: 'Équilibrer le hasard et l’harmonie pour que les palettes générées soient toujours utilisables, et garder une interface rapide sans framework.',
    outcome: 'Un outil zéro dépendance qui génère et copie des palettes accessibles en un seul geste.',
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
      'Une horloge numérique minimale plein écran avec bascule 12/24 heures, secondes en direct et en-tête de date — construite dans le cadre du défi 30-days-30-projects.',
    challenges: 'Garder le rendu de police net et la boucle de mise à jour efficace sans aucune bibliothèque.',
    outcome: 'Une horloge sans dépendance qui reste parfaitement synchronisée.',
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
      'Un compteur ciblé avec contrôles d’incrément, de décrément et de remise à zéro, plus un sélecteur de pas en direct — dans le cadre du défi 30-days-30-projects.',
    challenges:
      'Concevoir les contrôles pour que l’action principale soit impossible à manquer et que les remises à zéro ne soient jamais accidentelles.',
    outcome: 'Un compteur propre et accessible avec un retour visuel clair à chaque interaction.',
    year: 2026,
    tech: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://kevinedzndjodo.github.io/30days30projects/day-04-counter-app/',
    image: 'day-04-counter-app.webp',
    github: 'https://github.com/kevinedzndjodo/30days30projects',
    featured: false,
  },
]

export function fallbackProjects(lang: Lang): Project[] {
  const base = lang === 'fr' ? FALLBACK_PROJECTS_FR : FALLBACK_PROJECTS
  return base.map((p, i) => ({
    ...p,
    id: i + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }))
}

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

export const FALLBACK_FAQ_FR: FaqItem[] = [
  {
    id: 1,
    question: 'Avec quelles technologies travaillez-vous ?',
    answer:
      'Je construis des interfaces avec React, TypeScript et Tailwind, et je suis à l’aise avec Node.js lorsqu’un projet nécessite un backend.',
  },
  {
    id: 2,
    question: 'Êtes-vous disponible pour des projets en freelance ?',
    answer:
      'Oui — je suis actuellement ouvert à de nouvelles missions frontend. Contactez-moi via la section contact ci-dessus.',
  },
  {
    id: 3,
    question: 'Travaillez-vous avec des clients hors du Cameroun ?',
    answer:
      'Oui, je travaille à distance avec des clients partout, en communiquant par email ou via votre outil préféré.',
  },
  {
    id: 4,
    question: 'Puis-je voir plus de votre travail ?',
    answer:
      'Tout ce qui est affiché ci-dessus est quelque chose que j’ai construit et livré moi-même. Au-delà de cette page, je mène un défi 30-days-30-projects où je publie une nouvelle petite application chaque jour sur GitHub — le meilleur moyen de voir comment je travaille en temps réel.',
  },
]

export function fallbackFaq(lang: Lang): FaqItem[] {
  return lang === 'fr' ? FALLBACK_FAQ_FR : FALLBACK_FAQ
}

export function translateFaqItem(item: FaqItem, lang: Lang): FaqItem {
  if (lang !== 'fr') return item
  const fr = FALLBACK_FAQ_FR.find((f) => f.id === item.id)
  if (!fr) return item
  return { ...item, question: fr.question, answer: fr.answer }
}

export function translateProject(project: Project, lang: Lang): Project {
  if (lang !== 'fr') return project
  const fr = FALLBACK_PROJECTS_FR.find((p) => p.name === project.name)
  if (!fr) return project
  return {
    ...project,
    description: fr.description,
    challenges: fr.challenges,
    outcome: fr.outcome,
  }
}

export const FALLBACK_SKILLS: Skill[] = [
  'HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Tailwind', 'Vite', 'GSAP', 'Git',
].map((name, i) => {
  const icon = ['FaHtml5', 'FaCss3Alt', 'FaJs', 'FaReact', 'SiTypescript', 'SiTailwindcss', 'SiVite', 'SiGreensock', 'FaGitAlt'][i]
  return { id: i + 1, name, icon }
})
