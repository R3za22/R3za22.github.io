---
name: "Mizan"
tagline: "Offline espresso calibration assistant. Local-first PWA with backup and restore."
role: "Solo"
status: "shipped"
team: false
stack: ["Next.js", "React", "TypeScript", "Dexie", "Tailwind", "PWA"]
links:
  demo: "/demos/mizan/"
order: 7
featured: false
media:
  - type: image
    src: "projects/mizan/1.webp"
    alt: "Mizan home on a phone: current coffee, dial-in settings and recent shots"
  - type: image
    src: "projects/mizan/2.webp"
    alt: "Mizan coffee library with status tags and recent dial-in notes"
  - type: image
    src: "projects/mizan/3.webp"
    alt: "Mizan shot timer on a phone with dose, time, yield and ratio readouts"
  - type: image
    src: "projects/mizan/4.webp"
    alt: "Mizan learning page with short explainers on extraction and grind"
demoNote: "Persian UI"
---

## 01 Overview

Mizan helps a home barista dial in espresso: keep its coffees, grinder and machine, and log each shot. It is a Persian-first installable PWA that works fully offline.

## 02 Architecture

There is no backend. All data lives in IndexedDB through Dexie, behind a data layer that UI code cannot bypass: an ESLint rule forbids importing Dexie outside it. The static demo build adds seeded sample data, a banner and the site base path, and no request leaves the origin.

## 03 Key decisions

**Backup and restore.** Data exports as versioned JSON and is validated on import, with distinct errors for non-JSON, wrong app, unsupported version and malformed files. The app also requests persistent storage.

**Content-security policy and a real feedback link**, privacy and 404 pages, and a CI workflow were added in the completion pass.

## 04 Result

Next 16 static export with React 19 and Tailwind 4, redesigned screen by screen to the Tarazu canvas with a dark theme. Backup parsing, export and the data layer are covered by Vitest with fake-indexeddb, and the flows by Playwright.
