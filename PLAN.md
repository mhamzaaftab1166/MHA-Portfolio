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
│   │   │   ├── en.json               ✅ Navbar, Hero, About, Skills, Experience, Education, Projects, Contact, Footer
│   │   │   └── ar.json               ✅ full Arabic mirror
│   │   ├── public/
│   │   │   ├── images/
│   │   │   │   ├── MHA.png           ✅ profile photo
│   │   │   │   └── projects/         ← drop project screenshots here (imageUrl in projects.json)
│   │   │   └── cv/
│   │   │       └── hamza-aftab-cv.pdf  ← drop CV here when ready
│   │   └── src/
│   │       ├── app/
│   │       │   ├── layout.tsx        ✅ root pass-through
│   │       │   ├── globals.css       ✅ Dubai dark palette + utilities
│   │       │   └── [locale]/
│   │       │       ├── layout.tsx    ✅ html/body, fonts, dir, NextIntlClientProvider, metadata
│   │       │       └── page.tsx      ✅ Hero→About→Skills→Experience→Education→Projects→Contact
│   │       ├── components/
│   │       │   ├── layout/
│   │       │   │   ├── Navbar.tsx    ✅ data-driven, scroll-progress, glass, mobile menu, lang toggle
│   │       │   │   ├── Footer.tsx    ✅ data-driven, logo, nav, social icons
│   │       │   │   └── WhatsAppButton.tsx  ✅ fixed, pulse ring, tooltip
│   │       │   ├── sections/
│   │       │   │   ├── Hero.tsx      ✅ two-column, photo frame, role ticker (10 roles), 4 icon social links
│   │       │   │   ├── About.tsx     ✅ timeline bio, stats, glass info card + Team Contributions + Languages
│   │       │   │   ├── Skills.tsx    ✅ 7 category tabs (incl. Soft Skills + Platforms), animated level bars
│   │       │   │   ├── Experience.tsx ✅ vertical gold timeline, 4 jobs, tech stack pills
│   │       │   │   ├── Education.tsx ✅ academic timeline (NTU + PGC) + Honors/Awards cards
│   │       │   │   ├── Projects.tsx  ✅ 3 featured (horizontal) + 4 other (grid); gradient placeholders; NDA badge
│   │       │   │   └── Contact.tsx   ✅ Web3Forms integration, success/error states
│   │       │   └── ui/               ✅ shadcn/ui components
│   │       ├── data/
│   │       │   ├── hero.json         ✅ name, roles (10), stats, social links, cvUrl, whatsappNumber
│   │       │   ├── about.json        ✅ bio, location, email, phone, softSkills, supports, languages
│   │       │   ├── skills.json       ✅ 7 categories: frontend, backend, ai, testing, soft, platforms, tools
│   │       │   ├── experience.json   ✅ 4 jobs (GFMC, SLC, NTU, QB)
│   │       │   ├── education.json    ✅ 2 entries (NTU, PGC) + 2 honors (Gold Medal, PM Laptop)
│   │       │   ├── projects.json     ✅ 3 featured + 4 other; appStoreUrl/playStoreUrl on mobile projects
│   │       │   ├── contact.json      ✅ email, whatsapp, location, web3formsKey, socialLinks
│   │       │   ├── navbar.json       ✅ cvUrl, navLinks (incl. education)
│   │       │   └── ar/               ✅ Arabic mirrors of all above
│   │       ├── i18n/
│   │       │   ├── routing.ts        ✅ locales: ['en','ar'], default: 'en'
│   │       │   ├── navigation.ts     ✅ Link, usePathname, useRouter
│   │       │   └── request.ts        ✅ server-side message loader
│   │       ├── lib/
│   │       │   ├── config.ts         ✅ siteConfig — name, socials, phone, stats
│   │       │   ├── data.ts           ✅ getData(key, locale) — supports all 8 data keys
│   │       │   └── utils.ts          ✅ shadcn cn() utility
│   │       └── proxy.ts              ✅ next-intl locale middleware (Next.js 16)
│   ├── api/                          ← Backend (placeholder, Hono/Bun — future)
│   └── types/                        ✅ @mha/types — shared TS types
├── CLAUDE.md                         ✅ AI assistant instructions (up to date)
├── PLAN.md                           ✅ this file
├── .gitignore                        ✅
├── .gitattributes                    ✅
├── .vscode/settings.json             ✅
├── package.json                      ✅ Bun workspace root
└── bun.lock                          ✅
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
| Contact Form | Web3Forms | free, no backend |
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
.text-gold-gradient   /* gradient text: gold-dark → gold → gold-light */
.glass                /* backdrop-blur + dark surface + gold border */
.glow-gold            /* gold box-shadow */
.section-padding      /* consistent section px/py */
.animate-cursor-blink /* blinking | cursor in role ticker */
.animate-node-pulse   /* timeline node pulse for current job */
.animate-whatsapp-pulse
```

### Section Visual Pattern
Every section follows this pattern:
- Faint section number watermark (top-end, opacity ~2%)
- Dot grid background (opacity ~5%)
- Diagonal gold streak accent
- Section header row: `0X` number + short line + label text + extending line

### ⚠️ CSS Variable Gotcha
`@theme inline` in globals.css means `--color-*` variables are inlined at build and **do not exist as CSS custom properties** in the browser. Use Tailwind utilities directly:
```
✅ bg-background   ✅ bg-border   ✅ text-foreground
❌ bg-[--color-background]   ← resolves to nothing (transparent)
```

---

## Implementation Phases

### Phase 1 — Project Setup  ✅ COMPLETE
- [x] Bun 1.3.12, Next.js 16.2.6, React 19, Tailwind v4, TypeScript
- [x] shadcn/ui (new-york), framer-motion, next-intl, react-icons
- [x] Dubai dark palette, Geist+Cairo fonts, RTL dir switching
- [x] Monorepo: apps/web + apps/api (placeholder) + apps/types

### Phase 2 — Core Layout  ✅ COMPLETE
- [x] Navbar — scroll-progress bar, glass on scroll, mobile hamburger + overlay, lang toggle, Download CV
- [x] Footer — logo, nav links, social icons
- [x] WhatsAppButton — floating fixed, pulse ring, hover tooltip, RTL-aware

### Phase 3 — Content Sections  ✅ COMPLETE
- [x] Data layer — `src/data/*.json` (EN) + `src/data/ar/*.json` (AR)
- [x] `Hero.tsx` — two-column, photo frame, role ticker (10 roles), stats, 4 icon social buttons
- [x] `About.tsx` — timeline bio, glass info card, stats, Team Contributions + Languages bottom cards
- [x] `Skills.tsx` — 7 category tabs (incl. Soft Skills, Platforms), animated level bars
- [x] `Experience.tsx` — vertical gold timeline, 4 jobs, present badge, tech stack pills
- [x] `Education.tsx` — academic timeline (NTU + PGC), Honors/Awards glass cards
- [x] `Projects.tsx` — 3 featured horizontal cards + 4 compact cards; gradient placeholders; NDA lock badge; App Store / Play Store buttons
- [x] `Contact.tsx` — Web3Forms integration, two-column layout, success/error feedback
- [x] All sections assembled in `[locale]/page.tsx` with SectionDivider

### Phase 4 — Polish  ✅ COMPLETE
- [x] Scroll-triggered animations (`useInView`, Framer Motion) across all sections
- [x] `next/image` optimization (Hero photo, About photo)
- [x] `generateMetadata` per locale (title, description, OG, Twitter card)
- [x] UI polish pass (glass backgrounds, gold glows, spacing, typography)
- [x] Mobile responsiveness pass (Navbar z-index, scroll lock, Experience layout)
- [x] Text visibility pass (opacity bumped on bio, contact info, degree, honor descriptions)
- [ ] Lighthouse audit (target 90+) — pending after deploy

### Phase 5 — Deploy  ⏳ NEXT
- [ ] Drop CV PDF at `apps/web/public/cv/hamza-aftab-cv.pdf`
- [ ] Add project screenshots to `apps/web/public/images/projects/` and set `imageUrl` in `projects.json`
- [ ] Push to GitHub
- [ ] Import in Vercel → Root Directory: `apps/web`
- [ ] Add GoDaddy domain in Vercel Domains panel
- [ ] GoDaddy DNS:
  ```
  A     @    76.76.21.21
  CNAME www  cname.vercel-dns.com
  ```
- [ ] SSL auto-provisioned by Vercel ✓
- [ ] Lighthouse audit after deploy

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
| 2 | Display name | ✅ "Muhammad · Hamza Aftab" (two-line hero) |
| 3 | Role / title | ✅ 10 rotating roles in hero.json |
| 4 | Bio paragraphs | ✅ 4 paragraphs in about.json |
| 5 | Tech stack pills | ✅ in config.ts |
| 6 | Phone / WhatsApp | ✅ +971 521 096 471 |
| 7 | Email | ✅ mhamzaaftab1166@gmail.com |
| 8 | GitHub | ✅ github.com/mhamzaaftab1166 |
| 9 | LinkedIn | ✅ linkedin.com/in/hamzaaftab66/ |
| 10 | Profile photo | ✅ apps/web/public/images/MHA.png |
| 11 | Work experience | ✅ 4 jobs in experience.json |
| 12 | Skills | ✅ 7 categories in skills.json (incl. Soft Skills, Platforms) |
| 13 | Education | ✅ NTU (2020–24) + PGC (2018–20) in education.json |
| 14 | Honors | ✅ Gold Medalist + PM Laptop Scheme in education.json |
| 15 | Languages | ✅ English, Urdu, Hindi in about.json |
| 16 | Soft skills | ✅ 8 skills in about.json + Skills tab |
| 17 | Team contributions | ✅ 6 items in about.json |
| 18 | Projects | ✅ 7 projects in projects.json (3 featured + 4 other) |
| 19 | Project screenshots | ⏳ drop PNGs in public/images/projects/, set imageUrl |
| 20 | CV / Resume PDF | ⏳ drop at apps/web/public/cv/hamza-aftab-cv.pdf |
| 21 | GoDaddy domain | ⏳ provide domain name for deploy config |
| 22 | Twitter / X handle | ⏳ provide handle to add to contact.json socialLinks |
