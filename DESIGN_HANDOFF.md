# Design Handoff — Portfolio Redesign Brief

**For: Claude Design (or any design agent).** This document is the complete context.
Read it fully before generating anything.

---

## 1. The ask

Redesign this portfolio to feel like a **top-tier, award-level personal site** — the kind
that makes a recruiter stop scrolling in the first second. Reference bar: Awwwards
"Site of the Day" personal portfolios, Linear/Vercel-grade landing pages, agency sites
that look like they cost $100k. Expensive, confident, memorable — not "nice template."

The current site is a deliberately unstyled skeleton. Structure, content, data flow, and
deployment are done. **Your job is purely visual + motion.**

- Live site: https://r3za22.github.io
- Repo: https://github.com/R3za22/R3za22.github.io
- Stack: plain HTML/CSS/JS, zero build step, deployed by GitHub Actions to GitHub Pages

## 2. Who this is for

**Reza Ghamar** — mobile & full-stack developer, Ahvaz, Iran. Self-taught, ships real
products end-to-end. Flagship work:

- **Mangaro** — Persian-first manga platform: native Android (Kotlin + Jetpack Compose,
  heavily reworked TachiyomiSY fork) + Django REST backend, live in production with
  OTP auth and subscription billing. The centerpiece project.
- **Zaboon** — gamified English-learning app for Persian speakers (React Native/Expo).
- **Profit App** — production team app (React Native, tagged releases).
- **Evently** — Next.js event platform with live demo.
- **Basic ETH Wallet** — Solidity multi-sig wallet contract.

Personality to convey: builder, not decorator. Persian-market products are a
differentiator — tasteful nods welcome (type, pattern, color), clichés not.

## 3. Design direction (suggested, not mandatory)

- **Dark-first**, high contrast, one strong accent. Light theme optional.
- **Typography is the design**: oversized display type in the hero, tight editorial
  grid, real hierarchy. Variable font welcome (self-host it — see constraints).
- **Motion**: scroll-driven section reveals, subtle parallax, magnetic/hover
  micro-interactions on cards and links, smooth anchor scrolling. A signature hero
  moment (canvas/WebGL grain, shader gradient, generative pattern, or big kinetic
  type) is what creates the "shock" — pick ONE and execute it perfectly.
- **Android apps section**: phone-frame mockups for screenshots (CSS device frames
  are fine). Screenshots are placeholders today — design the frame so real ones
  drop in later.
- Restraint: one idea, executed hard, beats five effects. No parallax soup.

## 4. Hard constraints

1. **Static GitHub Pages.** No build step, no framework, no server. Everything must
   work as plain files served from the repo root.
2. **Self-host all assets.** Fonts, libs — vendor them into the repo (e.g. `assets/fonts/`,
   `js/vendor/`). No CDN links (resilience + no external dependency).
3. **All copy comes from `content.json` at runtime** via `js/main.js`. Do NOT hardcode
   text into HTML. If you restructure markup, keep the render pipeline working.
4. **Performance**: aim Lighthouse 90+ perf. Motion must respect
   `prefers-reduced-motion`. No 3MB hero videos.
5. **Responsive**: mobile-first breakpoints; recruiters open portfolios on phones.
6. **Accessibility**: semantic markup already in place — keep it. Visible focus states.

## 5. Integration contract (what the JS depends on)

`js/main.js` renders everything from `content.json`. Preserve these hooks or update
`main.js` consistently if you change them:

- **IDs**: `#hero #profile-name #profile-title #profile-bio #profile-links #site-nav
  #project-grid #android-list #skills-groups #resume-pdf-link #resume-summary-text
  #experience-list #education-list #languages-list #footer-line #headshot`
- **Templates**: `<template id="tpl-project-card">`, `<template id="tpl-android-card">`,
  `<template id="tpl-resume-entry">` — card inner classes `pc-*`, `ac-*`, `re-*`
- **Classes**: `.skill-group`, `.screenshot-placeholder`, `.repo-note`, `.card-grid`,
  `.section`
- Missing screenshots auto-swap to `.screenshot-placeholder` divs — style them as
  intentional-looking empty device frames.
- `#headshot` img is `hidden` until `assets/headshot.jpg` exists.
- GitHub stars/language are fetched live for public repos and injected into `.pc-stats`.

**Freedom**: `css/style.css` is 100% throwaway — replace wholesale. Adding new wrapper
divs, canvas elements, additional JS files (`js/motion.js` etc.), and editing
`index.html`/`resume.html` markup is all allowed as long as the contract above holds.

## 6. Pages

- `index.html` — Hero/About → Projects (5 cards) → Android Apps (2 featured, with
  screenshot strips) → Skills (3 groups) → Resume teaser → footer
- `resume.html` — Summary, Experience, Education, Languages, Skills + PDF download.
  Can stay quieter/more printable than the landing page.

## 7. Assets status

| Asset | Status |
|---|---|
| App screenshots (`assets/screenshots/*.png`, names in its README) | ❌ pending — design placeholder frames |
| Headshot `assets/headshot.jpg` | ❌ pending |
| Resume PDF | placeholder |
| LinkedIn URL in `content.json` | placeholder |

## 8. Definition of done

- First viewport makes a strong, distinctive impression (the "signature moment")
- Works with JS-rendered content from `content.json` (open it locally: any static
  server, e.g. `python -m http.server`)
- Mobile layout is as considered as desktop
- `prefers-reduced-motion` honored; Lighthouse perf ≥ 90
- No external network dependencies except the GitHub API stats fetch
- Pushed to a branch (NOT main) so it can be reviewed before deploy
