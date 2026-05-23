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

## Dev Commands (from repo root)
```bash
bun run dev        # start Next.js (Turbopack) on :3000
bun run build      # production build
bun install        # install / sync all workspace deps
bun run api:dev    # start backend (future)
```
