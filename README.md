# site-template

Vite + React 19 + TypeScript starting point for `balearEWF` client sites.
Used as a GitHub template repo by `/ewf:new-client` (Task 1.4) — don't build
client work directly on this repo.

## Stack

- Vite, React 19, TypeScript
- `react-i18next` for content, `/es/` and `/en/` subpath language routing
- GSAP for motion
- Hand-rolled static-site generation: `react-dom/server` + a Node prerender
  script (`scripts/prerender.mjs`), no extra SSG dependency. Every language
  and page gets a real, final `index.html` with correct `<title>`, meta
  description, canonical link, `hreflang` alternates and Open Graph tags —
  not a client-only SPA shell. See `docs/build-path.md` Task 1.3 in
  `balear-ewf` for why this was chosen over `vite-react-ssg`.
- No default visual theme: `src/styles/tokens.css` holds every design token
  as a CSS variable, filled in per client from `DESIGN.md`.

## Commands

```
npm install
npm run dev        # local dev server (no prerendering — for iterating on components)
npm run build      # typecheck, build client + SSR bundle, prerender, sitemap, robots.txt
npx serve dist     # serve the real production output and check it
npm run typecheck
```

`npm run build` output layout:

```
dist/
├── index.html       # redirect stub -> /es/ (default language)
├── es/index.html    # prerendered, real content + meta
├── en/index.html    # prerendered, real content + meta
├── sitemap.xml
├── robots.txt
└── assets/          # shared JS/CSS, referenced by every language's index.html
```

Set `PREVIEW=true` before `npm run build` to get `noindex` meta and a
disallow-all `robots.txt` (what `.github/workflows/deploy-preview.yml` does
for every deploy — there is no production workflow yet).

## Adding a page

Add the route to `src/pages.ts`, create the component in `src/pages/`,
register it in `src/App.tsx`'s `PAGE_COMPONENTS` map, and add a
`src/content/<lang>/<key>.json` file per language with at least
`meta.title` and `meta.description`.
