---
name: "TrapClub"
tagline: "Shop frontend for a club platform: catalogue, cart, checkout, orders and an admin area."
role: "Frontend"
status: "shipped"
team: false
stack: ["Next.js", "TypeScript", "Tailwind", "Zustand", "NextAuth"]
links:
  demo: "/demos/trapclub/"
order: 4
featured: false
images: []
---

## 01 Overview

TrapClub is the web frontend for a club platform's shop. The completion pass added a catalogue with filters, search and pagination, product detail, a persisted cart, checkout with simulated payment, a customer orders area, and an admin area for products, orders, users and categories.

## 02 Architecture

Pages talk to one typed API facade. Mock mode serves a localStorage-persisted store seeded with Persian and English fixtures, with latency and optional error injection; live mode calls the existing backend with axios and handles 401 by signing out. Route access is decided by a pure role-to-route function used in the middleware, so admin pages are admin-only.

## 03 Key decisions

**Mock and live behind one switch.** NEXT_PUBLIC_API_MODE picks the adapter and the demo build forces mock, so the demo makes no external requests and fonts are self-hosted.

**Security clean-up.** Debug logging was removed from the auth options and the secrets are documented in an example env file.

## 04 Result

Next 14 with Tailwind, Zustand and NextAuth. Pricing, validation and role rules are unit-tested with Vitest; browse-to-order and admin order-status flows are covered by Playwright. The live backend must implement the order endpoints the mock assumes.
