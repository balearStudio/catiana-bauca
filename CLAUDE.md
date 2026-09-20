# This repo

A client site built from `balearStudio/site-template` via the `balear-ewf`
pipeline. Read `DESIGN.md` at the repo root **before any UI work** — it is
this client's design contract (palette, type, motion, layout direction). If
it doesn't exist yet, the moodboard stage hasn't run; don't invent a design.

## Conventions

- **Content**: `src/content/<lang>/<namespace>.json`. Never hard-code copy
  in a component — add a key to the JSON and read it with `useTranslation`.
- **Design tokens**: CSS variables in `src/styles/tokens.css` only. Never
  hard-code a color, font, spacing or motion value in a component's styles.
- **Components**: one page = one file in `src/pages/`, registered in
  `src/pages.ts` (also drives sitemap/prerender — don't add a route without
  adding it there).
- **Animation**: GSAP, guarded by `prefers-reduced-motion` (see
  `src/pages/Home.tsx` for the pattern). One signature moment per page, not
  animation everywhere — see the plugin's `guidelines/motion.md`.
- **SEO/i18n plumbing** (`entry-server.tsx`, `entry-client.tsx`, `lib/seo.ts`,
  `i18n.ts`, `scripts/prerender.mjs`) is structural. Don't edit it per client;
  if it seems to need a per-client change, that's a sign the change belongs
  in content or tokens instead — ask before touching it.

## Working with this repo

- **Ask before assuming.** If intake, brief or `DESIGN.md` doesn't cover
  something you need, stop and ask rather than guessing.
- Anti-generic design rules, copy voice rules and the aesthetics checklist
  live in the `ewf` plugin's `guidelines/` (not copied into this repo — read
  them from the plugin so they stay in sync across all clients).
- `npm run build` runs the full pipeline: typecheck → client build → SSR
  build → prerender to static HTML per language/page → sitemap + robots.txt.
  `npx serve dist` after a build to check real output, not `npm run dev`
  (dev mode skips prerendering).
