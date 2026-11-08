---
name: "Profit"
tagline: "Persian trading-education platform: OTP login, paid video courses and premium mentor chat. Team and client project."
pitch: "A Persian trading-education platform built with a client team: phone-OTP login, paid video courses and premium chat channels run by mentors. I built the Expo user app, most of the admin app and the user website; the Laravel backend is by Ali Sabet Imani."
platform: "Expo app (Android + web) · Next.js admin and landing sites"
hosting: "Client-owned (backend on Liara)"
period: "2024 — 25"
role: "Mobile + web frontends · team, client work"
status: "shipped"
team: true
stack: ["React Native", "Expo", "TypeScript", "Next.js", "Zustand", "socket.io"]
links:
  demo: "/demos/profit-app/"
  adminDemo: "/demos/profit-admin/"
  credit:
    label: "Laravel backend by Ali Sabet Imani"
    url: "https://github.com/Ali1375SI"
order: 4
featured: true
images: []
media:
  - type: image
    src: "projects/profit/1.webp"
    alt: "Profit user app home on a phone"
  - type: image
    src: "projects/profit/2.webp"
    alt: "Profit admin course list"
  - type: image
    src: "projects/profit/3.webp"
    alt: "Profit admin channel list"
architecture:
  nodes:
    - title: "Expo user app"
      detail: "Android + web export · courses, player, chat, purchases"
    - title: "Next.js admin and landing sites"
      detail: "course and channel editors · roles · download page"
    - title: "Laravel API (Ali Sabet Imani)"
      detail: "~100 endpoints · user and admin guards"
  services:
    - "sms.ir → phone-OTP login"
    - "Zarinpal → course payments"
    - "socket.io server → premium chat"
    - "Liara → backend hosting"
demoNote: "Persian UI · demo data, no backend"
---

## 01 Overview

Profit is a Persian trading-education platform. Users sign in with a phone number and a one-time code, buy video courses, and join paid premium chat channels run by mentors. Admins manage courses, channels, users and roles.

It is team and client work from 2024 to 2025. The Laravel backend is entirely by Ali Sabet Imani; the brand and accounts belong to the client team. I wrote the Expo user app, most of the admin app and the user website, and shared the admin website with Ali.

## 02 Architecture

## 03 Key decisions

**One typed client, two adapters.** Every frontend talks to a typed API client with a mock adapter (seeded fixtures, simulated latency, a simulated chat socket) and a live adapter chosen by an environment variable. The demos on this site run entirely on the mock adapter.

**The backend's response envelope is the contract.** Response shapes were derived from the Laravel resources: a status, message and data envelope, with a paginated variant. The backend itself was left untouched.

**Secrets out of the frontends.** The admin website no longer carries a hard-coded token and uses cookie-based auth with a route guard, and the landing site reads its APK link from an environment variable.

**Investment as an educational path.** The investment screen is a learning path with a risk disclaimer, not a trading screen.

## 04 Result

The completed user app covers phone and OTP sign-in, home, course list and detail, a video player, a simulated purchase sheet, channels with chat, support (chat, tickets, FAQ) and purchase history. The admin website adds a course editor (info, settings, seasons, videos), a channel editor with moderation, and roles and users. Each frontend has unit tests, Playwright end-to-end tests and a CI workflow.

The chat socket server is not in any of the repositories, so the chat contract is assumed.
