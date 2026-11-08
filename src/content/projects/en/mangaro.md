---
name: "Mangaro"
tagline: "Persian-first, self-hosted manga reader for the Iranian market"
pitch: "A Persian-first manga reader for the Iranian market, built and run solo: Android app, API, payments and deployment."
platform: "Android + REST API"
hosting: "Liara (Iran)"
period: "v1.13 · 2024 — now"
role: "Founder, sole developer"
status: "production"
team: false
stack: ["Kotlin", "Jetpack Compose", "SQLDelight", "Django", "DRF", "PostgreSQL", "Zarinpal", "GitHub Actions", "Liara"]
links:
  demo: "/demos/mangaro/"
order: 1
featured: true
images: []
media:
  - type: image
    src: "projects/mangaro/1.webp"
    alt: "Mangaro home screen on a phone"
  - type: image
    src: "projects/mangaro/2.webp"
    alt: "Mangaro home page in a desktop browser"
architecture:
  nodes:
    - title: "Android app"
      detail: "Kotlin · Compose · SQLDelight (offline-first)"
    - title: "Django REST API"
      detail: "catalogue · auth · billing · devices"
    - title: "PostgreSQL + media"
      detail: "content · users · subscriptions"
  services:
    - "SMS gateway → phone-OTP login"
    - "Zarinpal → Free / Plus billing"
    - "GitHub Actions → Liara deploy"
---

## 01 Overview

Iranian manga readers rely on scattered, unreliable sources and apps that ignore Persian and right-to-left text. Mangaro is one curated app talking to one self-hosted backend.

I designed and built the whole system: the Android client, the Django API, phone-OTP login, Free/Plus subscriptions through Zarinpal, and the deploy pipeline to production.

## 02 Architecture

## 03 Key decisions

**Forking instead of starting over.** Started from TachiyomiSY's proven reader, then replaced its extension system with custom auth, a single source and new onboarding.

**Offline-first by design.** The local SQLDelight database is the source of truth and the backend mirrors it, so the app works on unstable connections.

**Built for Iran's stack.** Zarinpal payments, SMS OTP and Liara hosting instead of Google Play billing and global clouds that don't serve Iran.

## 04 Result

Live in production on Liara, currently at version 1.13.
