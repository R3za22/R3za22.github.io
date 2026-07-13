# R3za22.github.io — Portfolio & Resume

Static portfolio site deployed to GitHub Pages. No build step, no framework, no dependencies.

Live: https://r3za22.github.io

## Editing content

**All copy lives in [`content.json`](content.json)** — profile, bio, links, projects,
skills, resume entries. Edit that file, push to `main`, done. Anything still marked
`EDIT ME` is a placeholder waiting for real content.

## Structure

| File | Purpose |
|---|---|
| `content.json` | Single source of truth for all text/links/project data |
| `index.html` | Hero/About, Projects, Android Apps, Skills sections (markup only) |
| `resume.html` | Resume page (summary, experience, education, skills + PDF link) |
| `js/main.js` | Renders both pages from `content.json`; fetches live GitHub stars/language for public repos with hardcoded fallbacks |
| `css/style.css` | **Placeholder styles — the design pass replaces this file wholesale** |
| `assets/resume.pdf` | Placeholder — replace with real resume |
| `assets/screenshots/` | App screenshots (see its README for expected filenames) |
| `.github/workflows/deploy.yml` | Deploys to Pages on push to `main` |

## Design pass notes (Claude Design)

- Replace `css/style.css` entirely; keep the HTML as-is if possible.
- JS targets these hooks — keep them: ids `#hero #profile-name #profile-title
  #profile-bio #profile-links #site-nav #project-grid #android-list #skills-groups
  #resume-pdf-link #experience-list #education-list #resume-summary-text #footer-line`,
  the `<template>` elements, and classes `pc-* ac-* re-* skill-group
  screenshot-placeholder repo-note`.
- Screenshot placeholders: missing images auto-swap to `.screenshot-placeholder` boxes.
- Headshot slot: `#headshot` in `index.html` is `hidden` until `assets/headshot.jpg`
  exists — remove the `hidden` attribute once added.
