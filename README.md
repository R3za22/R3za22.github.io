# R3za22.github.io — Reza Ghamar · Resume & Portfolio

Bilingual (English + Persian/RTL) static site built with [Astro](https://astro.build), deployed to GitHub Pages.

Live: https://r3za22.github.io

## Editing content

| What | Where |
|---|---|
| Projects & case studies | `src/content/projects/{en,fa}/<slug>.md` — both languages must have the same slug and fields, or the build fails |
| Skills | `src/data/skills.{en,fa}.json` |
| Experience & education | `src/data/timeline.{en,fa}.json` |
| UI copy (nav, buttons, labels) | `src/i18n/ui.ts` |
| Screenshots | `src/assets/projects/<slug>/`, listed in the project's `images` frontmatter |
| Resume PDFs | `public/resume-en.pdf`, `public/resume-fa.pdf` |

Open owner items (resume files, domain) are listed in `CONTENT-TODO.md`.

## Commands

> This drive blocks symlinks: install with `npm install --no-bin-links`.

| Command | Does |
|---|---|
| `npm run dev` | Dev server at http://localhost:4321 |
| `npm run build` | Static build to `dist/` |
| `npm run check` | Type and template check |
| `npm test` | Unit tests (Vitest) |
| `npx playwright test` | End-to-end tests against the built site |
| `npx lhci autorun` | Lighthouse budget (≥ 95 every category) |

Push to `main` deploys via `.github/workflows/deploy.yml`.
