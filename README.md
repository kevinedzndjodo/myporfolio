# Kevin Edza — Frontend Developer Portfolio

Portfolio site built with **React + TypeScript + Vite + Tailwind CSS**, backed by a small **Express + Prisma** admin CMS for managing projects, skills, FAQ, and contact messages.

## Live

- Portfolio: https://kevinedzndjodo.github.io/myporfolio/
- Backend API: https://myporfolio-api.onrender.com (self-hosted on Render)

## Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, GSAP, lucide-react
- **Backend:** Express, Prisma ORM, PostgreSQL, JWT auth, zod validation
- **Deploy:** GitHub Pages (frontend via `deploy.yml`), Render (backend via `backend/render.yaml`)

## Features

- Single-page portfolio with GSAP scroll animations, dark/light theme, mobile bottom nav
- Admin dashboard (`/admin`) to manage projects, skills, FAQ entries, and incoming contact messages
- Contact form persisted to the API with optional SMTP notification
- Rate limiting, helmet CSP, validated uploads, bcrypt password hashing

## Local development

### Backend

```bash
cd backend
cp .env.example .env   # fill in DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET
npm install
npm run db:push
npm run db:seed
npm run dev            # http://localhost:4000
```

### Frontend

```bash
npm install
VITE_API_URL=http://localhost:4000/api npm run dev   # http://localhost:5173
```

The seed script refuses to run without `ADMIN_EMAIL` and `ADMIN_PASSWORD` — there is intentionally no default password.

## Deployment

- **Frontend:** pushing to `main` triggers the GitHub Pages workflow (`.github/workflows/deploy.yml`). Set the `VITE_API_URL` repository variable to the hosted API root.
- **Backend:** `backend/render.yaml` provisions a Docker web service plus a managed Postgres database. Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and optionally `SMTP_*` in the Render dashboard.
