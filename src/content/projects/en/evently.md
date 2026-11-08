---
name: "Evently"
tagline: "Event platform based on the JS Mastery tutorial (2024), now with hardened server actions and a mock mode."
role: "Solo"
status: "shipped"
team: false
stack: ["Next.js", "TypeScript", "Clerk", "MongoDB", "Stripe", "Tailwind"]
links:
  demo: "/demos/evently/"
order: 22
featured: false
images: []
early: true
---

## 01 Overview

Evently is an event platform with discovery, event pages, ticket checkout and an organiser area. It started as the JS Mastery tutorial in 2024 and was left unfinished; the credit stays in the README and footer.

## 02 Architecture

Every page calls an Api facade with two adapters. The live adapter wraps the server actions (Clerk, MongoDB, Stripe, uploadthing). The mock adapter seeds events, categories and orders in localStorage with a mock signed-in user, simulated Stripe and mocked upload. All pages are client components with query-parameter routes, so the site exports statically.

## 03 Key decisions

**Server actions hardened.** The user id comes from the session, the price comes from the database, regex input is escaped, update and delete check ownership, inputs are validated with zod, and the Stripe webhook verifies its signature.

**Auth mode by a build-time constant**, so the unused branch is eliminated from each build.

## 04 Result

Next 14 with zod validation shared by both adapters. Validation, the mock store, payment simulation and the hardened actions have Vitest tests; Playwright runs the mock-mode flows. The declined test card 4000 0000 0000 0002 is simulated.
