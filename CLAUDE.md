@AGENTS.md

# portfolio-site

Personal portfolio for Davis Brooks. Next.js (App Router) + TypeScript + Tailwind CSS v4, deployed to Vercel.

## Next.js: read the docs before writing Next-specific code

This is the **latest** Next.js (16.x, React 19, Tailwind v4, Turbopack). Its APIs, conventions, and file structure may differ from your training data — do not assume. **Before writing any Next.js-specific code** (routing, layouts, metadata, server/client components, data fetching, `next/*` imports, config), read the relevant guide in `node_modules/next/dist/docs/`:

- `node_modules/next/dist/docs/01-app/` — App Router (the router this project uses)
- `node_modules/next/dist/docs/03-architecture/` — architecture & config
- `node_modules/next/dist/docs/index.md` — table of contents

Heed deprecation notices in those docs. When in doubt, the local docs are the source of truth, not memory.

## Design goes through Impeccable — always

**All design and frontend UI work goes through the Impeccable skill.** Invoke it for any visual/UX work: layout, components, typography, color, spacing, motion, responsive behavior, states.

**Never hardcode colors** (or other design values). Use design tokens defined by the design system. No raw hex, `rgb()`, or one-off Tailwind color literals like `text-[#123456]` in components — reference tokens. The same rule applies to typography scale, spacing, radii, and shadows: they live as tokens, and components consume tokens.

The two source-of-truth documents for what we build:
- `PRODUCT.md` — who this is for and what it must do.
- `DESIGN.md` — brand, personality, and visual direction (the token system flows from here).

Everything we build is downstream of `PRODUCT.md` and `DESIGN.md`. When they conflict with an ad-hoc idea, they win — or we update them deliberately first.

## Commands

- `npm run dev` — dev server (Turbopack) at http://localhost:3000
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint
