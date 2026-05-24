@apps/web/AGENTS.md

# MHA Portfolio — Claude Instructions

## Project
Bun workspace monorepo. Next.js 16 portfolio at `apps/web/`, backend placeholder at `apps/api/`, shared types at `apps/types/`.
All commands run from the **repo root** (`C:\Users\Hamza\Desktop\MHA-Portfolio`).

## Mandatory Tool Rules

### Packages & Libraries → always use context7
Before installing, configuring, or writing code for ANY library or framework (Next.js, Tailwind, shadcn/ui, next-intl, Framer Motion, Hono, etc.), fetch the latest docs via context7:
1. `mcp__context7__resolve-library-id` → get the library ID
2. `mcp__context7__query-docs` → get up-to-date API / setup docs

Never rely on training data alone for library APIs — versions change.

### UI Components & Pages → always use frontend-design skill
When building any visual component, page, section, or layout, invoke the `frontend-design` skill first:
```
Skill({ skill: "frontend-design", ... })
```
This ensures production-grade, distinctive design — not generic AI output.

## Stack (verified installed)
- Runtime: Bun 1.3.12
- Next.js 16.2.6 (App Router, Turbopack) — **not v15**
- React 19.2.4
- Tailwind CSS v4.3.0 (CSS-first config, no tailwind.config.js)
- shadcn/ui 4.8.0 (new-york style)
- next-intl 4.12.0
- Framer Motion 12.40.0
- React Icons 5.6.0 + Lucide React 1.16.0
- TypeScript 5.x

## Key Conventions
- **Locale routing**: all pages live under `apps/web/src/app/[locale]/`
- **Proxy file**: `apps/web/src/proxy.ts` — Next.js 16 renamed middleware → proxy
- **Translations**: `apps/web/messages/en.json` + `apps/web/messages/ar.json`
- **RTL**: `dir` attribute set on `<html>` in `[locale]/layout.tsx`
- **Fonts**: Geist (EN/LTR) + Cairo (AR/RTL), switched via `html[dir]` CSS selector
- **Colors**: Dubai dark palette — bg `#0A0A0F`, gold `#C9A84C`, see `globals.css`
- **CSS utilities**: `.glass`, `.glow-gold`, `.text-gold-gradient`, `.section-padding`
- **shadcn components**: add with `bunx shadcn@latest add <component>` from `apps/web/`

## Data Layer
All content is driven by locale-aware JSON files — never hardcode copy in components.
- **EN source**: `apps/web/src/data/*.json`
- **AR mirror**: `apps/web/src/data/ar/*.json` (same structure, translated content)
- **Access**: `getData(key, locale)` from `apps/web/src/lib/data.ts`
- **Site constants**: `apps/web/src/lib/config.ts` (initials, fullName, stats, social links, etc.)
- **Web3Forms key**: stored in `contact.json` as `web3formsKey` — no backend needed for contact form

## ⚠️ CSS Variable Gotcha (`@theme inline`)
`globals.css` uses `@theme inline`, which means `--color-*` theme variables are **inlined at build time and do NOT exist as CSS custom properties in the browser**.

```css
/* WRONG — var(--color-background) resolves to nothing at runtime */
bg-[--color-background]

/* CORRECT — use the Tailwind utility (inlined value) */
bg-background

/* CORRECT — use the raw :root variable (these DO exist at runtime) */
style={{ backgroundColor: 'var(--background)' }}
/* or hardcode the oklch value */
style={{ backgroundColor: 'oklch(0.058 0.006 285)' }}
```

## ⚠️ Mobile Scroll Lock
Always lock scroll on `document.documentElement`, never `document.body`:
```ts
// Correct — works on iOS Safari
document.documentElement.style.overflow = open ? 'hidden' : '';
// Wrong — breaks position:fixed on iOS Safari
document.body.style.overflow = open ? 'hidden' : '';
```

## Current Build Status
All sections complete. Page order: Hero → About → Skills → Experience → Education → Projects → Contact.

| Section | Component | Notes |
|---|---|---|
| Navbar | `layout/Navbar.tsx` | Education link added |
| Footer | `layout/Footer.tsx` | — |
| WhatsApp | `layout/WhatsAppButton.tsx` | — |
| Hero (01) | `sections/Hero.tsx` | — |
| About (02) | `sections/About.tsx` | + Team Contributions, Languages cards at bottom |
| Skills (03) | `sections/Skills.tsx` | + Soft Skills tab, Platforms tab |
| Experience (04) | `sections/Experience.tsx` | — |
| Education (05) | `sections/Education.tsx` | Timeline + Honors/Awards cards |
| Projects (06) | `sections/Projects.tsx` | 3 featured + 4 other; gradient placeholder when imageUrl is null |
| Contact | `sections/Contact.tsx` | — |

**Pending**: project screenshot images (drop in `public/images/projects/` and set `imageUrl` in projects.json).

## Dev Commands (from repo root)
```bash
bun run dev        # start Next.js (Turbopack) on :3000
bun run build      # production build
bun install        # install / sync all workspace deps
bun run api:dev    # start backend (future)
```
