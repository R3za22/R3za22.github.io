---
name: "AIProfit"
tagline: "Persian RTL platform for retail investors: analysed opportunities, courses, articles and paid subscriptions."
pitch: "A Persian, right-to-left platform for Iranian retail investors: curated market opportunities with explicit levels, courses with licensed video, articles, a paid bot subscription and consultation."
platform: "Web (Next.js, RTL)"
hosting: "Liara (Iran), deploy path prepared"
period: "2026-08 — now"
role: "Sole developer: design, frontend, backend"
status: "shipped"
team: false
stack: ["Next.js", "React", "TypeScript", "Drizzle", "PostgreSQL", "Zarinpal"]
links:
  demo: "/demos/aiprofit/"
order: 3
featured: true
images: []
architecture:
  nodes:
    - title: "Next.js 15 app"
      detail: "React 19 · server components · 28 screens from a design handoff"
    - title: "PostgreSQL"
      detail: "Drizzle ORM · migrations · seed scripts"
    - title: "Worker process"
      detail: "background jobs, run separately from the web server"
  services:
    - "Zarinpal → payments and refunds"
    - "SpotPlayer → per-enrolment video licences"
    - "Melipayamak → SMS"
    - "Liara → hosting"
media:
  - type: image
    src: "projects/aiprofit/1.webp"
    alt: "AIProfit home with the investment-opportunity hero and analysis cards"
  - type: image
    src: "projects/aiprofit/2.webp"
    alt: "AIProfit investor bot page with the plan comparison and signal summary"
  - type: image
    src: "projects/aiprofit/3.webp"
    alt: "AIProfit learning page with course cards and progress"
demoNote: "Persian UI · static snapshot"
---

## 01 Overview

AIProfit is a Persian, right-to-left platform for Iranian retail investors. Each market opportunity is published with an entry level, targets and a stop level, so readers see the analysis and make their own decision. Around that sit courses and short videos, articles, a paid investment-bot subscription, paid one-to-one consultation and a user panel.

I designed and built it alone: design, frontend and backend. The demo on this site is a static snapshot of the public marketing pages, crawled from the running app.

## 02 Architecture

## 03 Key decisions

**A design handoff as the specification.** The repository treats a read-only design export as the source of truth for 28 screens; when the code and the handoff disagree, the code is the bug.

**Real payment and video integrations.** Checkout goes through Zarinpal with a refund script, lesson video is licensed per enrolment through SpotPlayer, and SMS goes through Melipayamak, each with a smoke script.

**Tested against a real database.** Unit tests run on Vitest; end-to-end tests run on Playwright with an in-process PGlite Postgres, plus accessibility checks with axe and a separate empty-database run.

## 04 Result

The app is in its hardening and launch phases, with the Liara deploy path prepared. [placeholder] launch date.
