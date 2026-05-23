# MHA Portfolio — Implementation Plan

## Vision
A premium luxury portfolio website with a Dubai aesthetic: deep dark backgrounds, gold accents, glass morphism, and full bilingual English/Arabic support with RTL layout switching.

---

## Monorepo Structure

```
MHA-Portfolio/                        ← workspace root (run all commands here)
├── apps/
│   ├── web/                          ← Next.js 16 portfolio  ✅ set up
│   │   ├── messages/
│   │   │   ├── en.json               ✅ all EN strings
│   │   │   └── ar.json               ✅ all AR strings
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── layout.tsx        ✅ root pass-through
│   │   │   │   ├── globals.css       ✅ Dubai dark palette + utilities
│   │   │   │   └── [locale]/
│   │   │   │       ├── layout.tsx    ✅ html/body, fonts, dir, NextIntlClientProvider
│   │   │   │       └── page.tsx      ← home page (sections go here)
│   │   │   ├── components/
│   │   │   │   ├── layout/           ← Navbar.tsx, Footer.tsx  (Phase 2)
│   │   │   │   ├── sections/         ← Hero, About, Skills...  (Phase 3)
│   │   │   │   └── ui/               ✅ shadcn/ui components
│   │   │   ├── i18n/
│   │   │   │   ├── routing.ts        ✅ locales: ['en','ar'], default: 'en'
│   │   │   │   └── request.ts        ✅ server-side message loader
│   │   │   ├── lib/
│   │   │   │   └── utils.ts          ✅ shadcn cn() utility
│   │   │   └── proxy.ts              ✅ next-intl locale middleware (Next.js 16)
│   │   ├── public/
│   │   │   ├── images/               ← profile photo goes here
│   │   │   └── cv.pdf                ← drop CV here when ready
│   │   ├── next.config.ts            ✅ next-intl plugin wired
│   │   ├── components.json           ✅ shadcn config (new-york, Tailwind v4)
│   │   └── package.json              ✅ @mha/web
│   ├── api/                          ← Backend (placeholder, ignored for now)
│   │   └── src/index.ts              ← placeholder only
│   └── types/                        ✅ @mha/types — shared TS types
│       └── src/index.ts              ✅ ContactFormPayload, Project, ApiResponse
├── .gitignore                        ✅ monorepo-aware, ignores node_modules everywhere
├── .gitattributes                    ✅ LF line endings
├── .vscode/settings.json             ✅ hides node_modules/.next from Explorer
├── package.json                      ✅ Bun workspace root  (workspaces: ["apps/*"])
└── bun.lock                          ✅ single shared lockfile
```

---

## Tech Stack (Installed & Verified)

| Layer | Package | Installed Version |
|---|---|---|
| Runtime / PM | Bun | 1.3.12 |
| Framework | Next.js (App Router) | **16.2.6** |
| React | React | 19.2.4 |
| Styling | Tailwind CSS | v4.3.0 |
| Components | shadcn/ui | 4.8.0 |
| Animation | Framer Motion | 12.40.0 |
| i18n | next-intl | 4.12.0 |
| Icons | Lucide React | 1.16.0 |
| Icons | React Icons | 5.6.0 |
| Fonts | Geist (EN) + Cairo (AR) | via next/font |
| Language | TypeScript | 5.x |
| Linter | ESLint | 9.x |
| Deployment | Vercel + GoDaddy Domain | — |

---

## Design System

### Color Palette (defined in `apps/web/src/app/globals.css`)
```
Background:   #0A0A0F  → oklch(0.058 0.006 285)
Surface:      #111118  → oklch(0.09 0.008 285)
Surface-2:    #1A1A24  → oklch(0.13 0.010 280)
Gold-primary: #C9A84C  → oklch(0.73 0.12 85)   → var(--primary)
Gold-light:   #E8C96A  → oklch(0.83 0.11 90)   → var(--gold-light)
Gold-dark:    #8B6914  → oklch(0.49 0.10 75)   → var(--gold-dark)
Text-primary: #F5F0E8  → oklch(0.96 0.007 80)  → var(--foreground)
Text-muted:   #8A8599  → oklch(0.57 0.018 285) → var(--muted-foreground)
Border:       gold/18% → oklch(0.73 0.12 85 / 18%)
```

### CSS Utilities (ready to use)
```css
.text-gold-gradient   /* gradient text: gold-light → gold */
.glass                /* backdrop-blur + gold border */
.glow-gold            /* gold box-shadow glow */
.section-padding      /* consistent section px/py */
```

### Fonts
- **English (LTR):** Geist — `var(--font-geist)`
- **Arabic (RTL):** Cairo — `var(--font-cairo)`
- Font switches automatically via `html[dir]` CSS selector

---

## Sections Breakdown

### 1. Navbar
- Sticky with blur background on scroll
- Logo: "MHA" initials in gold
- Links: About · Skills · Experience · Projects · Contact
- Language toggle: `EN | عربي`
- Download CV button (gold outline)
- Mobile hamburger menu

### 2. Hero
- Full-viewport height
- Animated greeting + name in gold gradient text
- Role/title + one-liner tagline
- CTAs: "View My Work" (gold filled) + "Contact Me" (ghost)
- Subtle animated background (grid or particles)

### 3. About
- Two-column: photo (gold-bordered) + bio
- Flips to text-first in RTL
- Key stats: Years experience, Projects, Clients
- Download CV link

### 4. Skills
- Glass morphism cards, grouped by category
- Gold glow on hover

### 5. Experience
- Vertical timeline, centered gold dots
- RTL-aware text alignment

### 6. Projects
- 3-col grid → 2 → 1 responsive
- Hover: gold border glow + overlay links

### 7. Contact
- Split layout: social links | contact form
- Social: LinkedIn, GitHub, Twitter/X, Email, **WhatsApp** (`wa.me/<number>`)
- **Floating WhatsApp button** — fixed bottom-right, visible everywhere

### 8. Resume / CV
- Education, Certifications, Languages inline in About
- Download CV button always in Navbar + About section
- PDF at `apps/web/public/cv.pdf`

---

## i18n (next-intl v4)

```
Locales:        ['en', 'ar']
Default:        'en'
URLs:           /en/...  and  /ar/...
RTL:            <html dir={locale === 'ar' ? 'rtl' : 'ltr'}>
Proxy file:     src/proxy.ts  (Next.js 16 convention, replaces middleware.ts)
Translations:   messages/en.json  +  messages/ar.json
Hook:           useTranslations('Section')
```

---

## Implementation Phases

### Phase 1 — Project Setup ✅ DONE
- [x] Bun 1.3.12 confirmed
- [x] Scaffolded Next.js 16.2.6 with TypeScript, Tailwind v4, App Router, Turbopack
- [x] shadcn/ui initialized (new-york style, Tailwind v4)
- [x] Installed: next-intl, framer-motion, react-icons, lucide-react
- [x] next-intl routing configured (en/ar, RTL)
- [x] Dubai dark color palette in globals.css
- [x] Fonts: Geist (EN) + Cairo (AR) with dir-based switching
- [x] Locale-aware root layout (`[locale]/layout.tsx`)
- [x] EN + AR translation files with all section strings
- [x] Monorepo: apps/web + apps/api (placeholder) + packages/types
- [x] .gitignore, .gitattributes, .vscode/settings.json configured
- [x] Clean build confirmed ✓

### Phase 2 — Core Layout  ← NEXT
- [ ] `components/layout/Navbar.tsx` — sticky, blur, lang toggle, mobile menu
- [ ] `components/layout/Footer.tsx`
- [ ] `components/layout/WhatsAppButton.tsx` — floating, fixed bottom-right
- [ ] Wire Navbar + Footer into `[locale]/layout.tsx`

### Phase 3 — Sections
- [ ] `sections/Hero.tsx`
- [ ] `sections/About.tsx`
- [ ] `sections/Skills.tsx`
- [ ] `sections/Experience.tsx`
- [ ] `sections/Projects.tsx`
- [ ] `sections/Contact.tsx`
- [ ] Assemble all in `[locale]/page.tsx`

### Phase 4 — Polish
- [ ] Framer Motion scroll animations (staggered fade-in-up)
- [ ] Hover micro-interactions
- [ ] Image optimization (next/image)
- [ ] SEO: `generateMetadata` per locale
- [ ] Lighthouse audit (target 90+)

### Phase 5 — Deploy
- [ ] Push to GitHub
- [ ] Import repo in Vercel → auto-detects Bun + Next.js
- [ ] Vercel Dashboard → Settings → Root Directory: `apps/web`
- [ ] Add GoDaddy domain in Vercel → Domains
- [ ] GoDaddy DNS:
  ```
  A     @    76.76.21.21
  CNAME www  cname.vercel-dns.com
  ```
- [ ] SSL auto-provisioned by Vercel
- [ ] Test mobile + RTL

---

## Dev Commands

```bash
# From repo root
bun run dev          # start Next.js dev server (Turbopack)
bun run build        # production build
bun run start        # start production server
bun install          # install / sync all workspace deps

# Future backend
bun run api:dev      # start Bun/Hono API (apps/api)
```

---

## Content Needed From You

| # | Item | Status |
|---|---|---|
| 1 | Full name (display + meta) | ⏳ |
| 2 | Role / title | ⏳ |
| 3 | Short bio (EN + AR if possible) | ⏳ |
| 4 | Skills list with categories | ⏳ |
| 5 | Work experience (company, role, dates, bullets) | ⏳ |
| 6 | Projects (name, description, tech, links) | ⏳ |
| 7 | Profile photo → `apps/web/public/images/` | ⏳ |
| 8 | Social links (LinkedIn, GitHub, etc.) | ⏳ |
| 9 | WhatsApp number (+971xxxxxxxxx) | ⏳ |
| 10 | GoDaddy domain name | ⏳ |
| 11 | CV/Resume PDF → `apps/web/public/cv.pdf` | ⏳ |
