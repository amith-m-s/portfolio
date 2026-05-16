# Amith M S — Portfolio

Elite backend engineering portfolio built with Next.js 15, TypeScript, and TailwindCSS.

## Stack
- **Next.js 15** App Router
- **TypeScript**
- **Tailwind CSS v4**
- **Google Fonts** (Syne, JetBrains Mono, Instrument Serif)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel (Recommended)

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: GitHub + Vercel Dashboard
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Vercel auto-detects Next.js — click Deploy

## GitHub Setup (from scratch)

```bash
cd portfolio
git init
git add .
git commit -m "feat: initial portfolio"
git branch -M main
git remote add origin https://github.com/amith-m-s/portfolio.git
git push -u origin main
```

## Sections
- **Hero** — Animated headline with cursor-reactive lighting
- **About** — Engineering philosophy, timeline, certifications
- **Projects** — Deep Resume Analyzer, LootBox Game, JARVIS, Pro Finance Tracker
- **Skills** — Ecosystem clusters by capability
- **Philosophy** — Engineering principles
- **Contact** — Footer with all links

## Customization
- Edit `components/Hero.tsx` for headline/CTAs
- Edit `components/Projects.tsx` for project case studies
- Edit `app/layout.tsx` for SEO metadata
- Edit `app/globals.css` for design tokens (CSS variables)
