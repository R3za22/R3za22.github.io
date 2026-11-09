---
name: "Profit"
tagline: "Persian trading-education platform: OTP login, paid video courses and premium mentor chat. Built as programming team lead."
pitch: "A Persian trading-education platform built by a full-time programming team I led: phone-OTP login, paid video courses and premium chat channels run by mentors. I led the team and built the Expo user app, most of the admin app and the user website; the Laravel backend is by Ali Sabet Imani."
platform: "Expo app (Android + web) · Next.js admin and landing sites"
hosting: "Startup-owned (backend on Liara)"
period: "2024 — 25"
role: "Programming team lead · full-time"
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
media:
  - type: image
    src: "projects/profit/1.webp"
    alt: "Profit user app home on a phone: greeting, featured course and channels"
  - type: image
    src: "projects/profit/2.webp"
    alt: "Profit course catalogue on a phone with search and category chips"
  - type: image
    src: "projects/profit/3.webp"
    alt: "Profit premium channel chat on a phone with a sent message"
  - type: image
    src: "projects/profit/4.webp"
    alt: "Profit admin dashboard: user, course and sales KPIs with recent orders"
  - type: image
    src: "projects/profit/5.webp"
    alt: "Profit admin course list with price, status and edit actions"
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

I was the programming team lead, working full-time on the project for about a year, 2024 to 2025, at the Profit startup. The Laravel backend is entirely by Ali Sabet Imani. I led the frontend work, wrote the Expo user app, most of the admin app and the user website, and shared the admin website with Ali.

## 02 Architecture

## 03 Key decisions

**One typed client, two adapters.** Every frontend talks to a typed API client with a mock adapter (seeded fixtures, simulated latency, a simulated chat socket) and a live adapter chosen by an environment variable. The demos on this site run entirely on the mock adapter.

**The backend's response envelope is the contract.** Response shapes were derived from the Laravel resources: a status, message and data envelope, with a paginated variant. The backend itself was left untouched.

**Secrets out of the frontends.** The admin website no longer carries a hard-coded token and uses cookie-based auth with a route guard, and the landing site reads its APK link from an environment variable.

**Investment as an educational path.** The investment screen is a learning path with a risk disclaimer, not a trading screen.

## 04 Result

The completed user app covers phone and OTP sign-in, home, course list and detail, a video player, a simulated purchase sheet, channels with chat, support (chat, tickets, FAQ) and purchase history. The admin website adds a course editor (info, settings, seasons, videos), a channel editor with moderation, and roles and users. Each frontend has unit tests, Playwright end-to-end tests and a CI workflow.

The chat socket server is not in any of the repositories, so the chat contract is assumed. [placeholder] real usage numbers, if the client shares them.
