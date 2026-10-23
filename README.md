# Edward Tombre — CV

A plain, bilingual (English + French) CV site built with
[Astro](https://astro.build/), on the same stack as `mementoit-website`.
English is the default locale (served at `/`); French is served at `/fr/`.
The page prints to a clean A4 PDF (browser print, or the button on the page).

## Develop

```bash
pnpm install
pnpm dev           # http://localhost:4321
```

| Command          | What it does                              |
| ---------------- | ----------------------------------------- |
| `pnpm dev`       | Start the dev server                      |
| `pnpm build`     | Build the static site into `dist/`        |
| `pnpm preview`   | Serve the production build locally        |

## Project structure

```
src/
  assets/         # photo.jpg (or .png/.webp/.avif) — your portrait, optional
  data/cv.ts      # ALL CV content: profile, portfolio projects, education, languages
  i18n/
    types.ts      # Dictionary + Localized types — keeps EN/FR in sync
    en.ts, fr.ts  # UI strings (section titles, labels)
    index.ts      # useTranslations(), tr(), localeUrl(), formatYearMonth()
  layouts/
    Layout.astro  # <head>, hreflang, OG, JSON-LD, global styles
  components/
    Cv.astro      # Shared page composition used by both locales
    Intro, Section, Portfolio, Entry, Period, Header, Footer, LanguageSwitcher, Icon
  pages/
    index.astro       # English (default)
    fr/index.astro    # French
    404.astro         # Bilingual not-found page
  styles/global.css   # Design tokens (shared with mementoit-website) + print styles
public/             # favicon.svg, robots.txt
```

### Editing content

- **CV content:** edit `src/data/cv.ts`. Translatable fields are
  `{ en: '…', fr: '…' }`; the `Localized` type requires both, so a missing
  translation fails the build. Names and places can be plain strings.
- **Portfolio:** add a project to `projects` in any position — the list is
  sorted most recent first from each project's `start`/`end`. Those dates are
  only used for ordering and are never shown on the page.
- **Dates (education):** `'YYYY'` or `'YYYY-MM'`. `end: null` renders
  "present"; leaving `end` out shows the start date alone.
- **Photo:** save it as `src/assets/photo.jpg` (or `.png`, `.webp`, `.avif`).
  It is picked up automatically, cropped to a square (centred slightly above
  the middle) and resized/compressed at build time, so the original can be
  large. Without a photo, your initials are shown instead.
- **Hiding detail:** set `hidePoints: true` on a project to keep its bullet
  points in the data without showing them.
- **UI strings:** `src/i18n/en.ts` and `src/i18n/fr.ts`.

## Deploy (Dokploy)

Same setup as `mementoit-website`: a multi-stage `Dockerfile` builds the site
and serves `dist/` with nginx (`nginx.conf`).

Deployed on the **tombre** Dokploy server (project **Portfolio**), built from
`main` with auto-deploy on push, and served at `edward.tombre.fr` (canonical,
set as `site` in `astro.config.mjs`) and `tombre.fr`, both with Let's Encrypt.

> Don't add a Dockerfile `HEALTHCHECK` — under Swarm it causes a restart loop
> (Traefik returns 502). Dokploy/Traefik handle readiness.

Build the image locally to sanity-check first:

```bash
docker build -t portfolio .
docker run --rm -p 8080:80 portfolio   # http://localhost:8080
```

> Uses **pnpm** (pinned via the `packageManager` field). The Dockerfile enables
> it through corepack, so no global install is needed in CI/Dokploy.
