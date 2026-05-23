# MHA Portfolio — Implementation Plan

## Vision
A premium luxury portfolio website with a Dubai aesthetic: deep dark backgrounds, gold accents, glass morphism, and full bilingual English/Arabic support with RTL layout switching.

---

## Monorepo Structure

```
MHA-Portfolio/                        ← workspace root (run all commands here)
├── apps/
│   ├── web/                          ← Next.js 16 portfolio  ✅
│   │   ├── messages/
│   │   │   ├── en.json               ✅ all EN strings (Hero, About, Skills…)
│   │   │   └── ar.json               ✅ all AR strings + RTL
│   │   ├── public/
│   │   │   ├── images/
│   │   │   │   └── MHA.png           ✅ profile photo added
│   │   │   └── cv.pdf                ← drop CV here when ready
│   │   └── src/
│   │       ├── app/
│   │       │   ├── layout.tsx        ✅ root pass-through
│   │       │   ├── globals.css       ✅ Dubai dark palette + utilities
│   │       │   └── [locale]/
│   │       │       ├── layout.tsx    ✅ html/body, fonts, dir, NextIntlClientProvider
│   │       │       └── page.tsx      ✅ renders Hero (more sections coming)
│   │       ├── components/
│   │       │   ├── layout/
│   │       │   │   ├── Navbar.tsx    ✅ scroll-progress, glass, mobile menu, lang toggle
│   │       │   │   ├── Footer.tsx    ✅ logo, nav, social icons
│   │       │   │   └── WhatsAppButton.tsx  ✅ fixed, pulse ring, tooltip
│   │       │   ├── sections/
│   │       │   │   ├── Hero.tsx      ✅ two-column, photo frame, role ticker, stats, CTAs
│   │       │   │   ├── About.tsx     ← Phase 3 next
│   │       │   │   ├── Skills.tsx    ← Phase 3
│   │       │   │   ├── Experience.tsx← Phase 3
│   │       │   │   ├── Projects.tsx  ← Phase 3
│   │       │   │   └── Contact.tsx   ← Phase 3
│   │       │   └── ui/               ✅ shadcn/ui components
│   │       ├── i18n/
│   │       │   ├── routing.ts        ✅ locales: ['en','ar'], default: 'en'
│   │       │   ├── navigation.ts     ✅ Link, usePathname, useRouter
│   │       │   └── request.ts        ✅ server-side message loader
│   │       ├── lib/
│   │       │   ├── config.ts         ✅ siteConfig — name, socials, phone, stats, tech
│   │       │   └── utils.ts          ✅ shadcn cn() utility
│   │       └── proxy.ts              ✅ next-intl locale middleware (Next.js 16)
│   ├── api/                          ← Backend (placeholder, Hono/Bun — future)
│   │   └── src/index.ts              ← placeholder only
│   └── types/                        ✅ @mha/types — shared TS types
│       └── src/index.ts              ✅ ContactFormPayload, Project, ApiResponse
├── .gitignore                        ✅ monorepo-aware
├── .gitattributes                    ✅ LF line endings
├── .vscode/settings.json             ✅ hides node_modules/.next from Explorer
├── package.json                      ✅ Bun workspace root
└── bun.lock                          ✅ single shared lockfile
```

---

## Tech Stack (Installed & Verified)

| Layer | Package | Version |
|---|---|---|
| Runtime / PM | Bun | 1.3.12 |
| Framework | Next.js (App Router) | **16.2.6** |
| React | React | 19.2.4 |
| Styling | Tailwind CSS | v4.3.0 |
| Components | shadcn/ui | 4.8.0 |
| Animation | Framer Motion | 12.40.0 |
| i18n | next-intl | 4.12.0 |
| Icons | React Icons | 5.6.0 |
| Icons | Lucide React | 1.16.0 |
| Fonts | Geist (EN) + Cairo (AR) | via next/font |
| Language | TypeScript | 5.x |
| Deployment | Vercel + GoDaddy Domain | — |

---

## Design System

### Color Palette (`apps/web/src/app/globals.css`)
```
Background:   oklch(0.058 0.006 285)  →  #0A0A0F
Surface:      oklch(0.09  0.008 285)  →  #111118
Gold-primary: oklch(0.73  0.12  85 )  →  #C9A84C  → var(--primary)
Gold-light:   oklch(0.83  0.11  90 )  →  #E8C96A  → var(--gold-light)
Text:         oklch(0.96  0.007 80 )  →  #F5F0E8
Muted:        oklch(0.57  0.018 285)  →  #8A8599
Border:       oklch(0.73  0.12  85 / 18%)
```

### CSS Utilities
```css
.text-gold-gradient   /* gradient text: gold-light → gold */
.glass                /* backdrop-blur + gold border */
.glow-gold            /* gold box-shadow */
.section-padding      /* consistent section px/py */
.animate-cursor-blink /* blinking | cursor */
.animate-whatsapp-pulse
```

### Fonts
- **English (LTR):** Geist — auto-switched via `html[dir="ltr"]`
- **Arabic (RTL):** Cairo — auto-switched via `html[dir="rtl"]`

---

## Implementation Phases

### Phase 1 — Project Setup  ✅ COMPLETE
- [x] Bun 1.3.12, Next.js 16.2.6, React 19, Tailwind v4, TypeScript
- [x] shadcn/ui (new-york), framer-motion, next-intl, react-icons
- [x] Dubai dark palette, Geist+Cairo fonts, RTL dir switching
- [x] Monorepo: apps/web + apps/api (placeholder) + apps/types
- [x] .gitignore, .gitattributes, .vscode/settings.json

### Phase 2 — Core Layout  ✅ COMPLETE
- [x] Navbar — scroll-progress bar, glass on scroll, mobile hamburger + overlay, lang toggle, Download CV
- [x] Footer — logo, nav links, social icons (GitHub/LinkedIn/Twitter/Email), copyright
- [x] WhatsAppButton — floating fixed, pulse ring, hover tooltip, RTL-aware (`end-6`)
- [x] All wired into `[locale]/layout.tsx`

### Phase 3 — Sections  🔄 IN PROGRESS
- [x] `Hero.tsx` — two-column (text + photo), animated background, role ticker, stats panel, CTAs, social row
- [ ] `About.tsx` — photo + bio, skills overview, download CV
- [ ] `Skills.tsx` — categorized cards with icons
- [ ] `Experience.tsx` — vertical timeline
- [ ] `Projects.tsx` — card grid with links
- [ ] `Contact.tsx` — form + social links + WhatsApp CTA
- [ ] Assemble all in `[locale]/page.tsx`

### Phase 4 — Polish
- [ ] Scroll-triggered animations (Framer Motion `whileInView`)
- [ ] `next/image` optimization across all sections
- [ ] `generateMetadata` per locale (title, description, OG)
- [ ] Lighthouse audit (target 90+)

### Phase 5 — Deploy
- [ ] Push to GitHub
- [ ] Import in Vercel → Root Directory: `apps/web`
- [ ] Add GoDaddy domain in Vercel Domains panel
- [ ] GoDaddy DNS:
  ```
  A     @    76.76.21.21
  CNAME www  cname.vercel-dns.com
  ```
- [ ] SSL auto-provisioned by Vercel ✓

---

## Dev Commands

```bash
# From repo root
bun run dev        # Next.js dev server on :3000 (Turbopack)
bun run build      # production build
bun run start      # production server
bun install        # sync all workspace deps
```

---

## Content Status

| # | Item | Status |
|---|---|---|
| 1 | Full name | ✅ Muhammad Hamza Aftab |
| 2 | Display name | ✅ "Muhammad · Hamza Aftab" (two-line hero treatment) |
| 3 | Role / title | ✅ Senior Full-Stack Engineer |
| 4 | Tagline / bio | ✅ Added to Hero |
| 5 | Tech stack | ✅ React, Next.js, RN, Vue, Nuxt, Node, TS, AI/LLM, Claude AI |
| 6 | Phone / WhatsApp | ✅ +971 521 096 471 |
| 7 | Email | ✅ hamzaaftab.dev@gmail.com |
| 8 | GitHub | ✅ github.com/mhamzaaftab1166 |
| 9 | LinkedIn | ✅ linkedin.com/in/hamzaaftab66/ |
| 10 | Twitter / X | ⏳ provide handle to update |
| 11 | Profile photo | ✅ apps/web/public/images/MHA.png |
| 12 | Work experience | ⏳ needed for Experience section |
| 13 | Projects (3–6) | ⏳ needed for Projects section |
| 14 | Skills by category | ⏳ needed for Skills section |
| 15 | GoDaddy domain | ⏳ provide domain name |
| 16 | CV / Resume PDF | ⏳ drop at apps/web/public/cv.pdf |
