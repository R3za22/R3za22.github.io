---
name: "Zaboon"
tagline: "Gamified English-learning app for Persian speakers. Expo app with a mock/live API client."
pitch: "An English course for Persian speakers: a lesson path with hearts, streaks and a leaderboard, built Persian-first and right-to-left on Expo."
platform: "React Native (Expo 53) + Python API"
role: "mobile · solo"
status: "shipped"
team: false
stack: ["React Native", "Expo", "TypeScript", "Zustand", "Python", "Django"]
links:
  demo: "/demos/zaboon/"
order: 2
featured: true
images: []
media:
  - type: image
    src: "projects/zaboon/1.webp"
    alt: "Zaboon home screen on a phone"
  - type: image
    src: "projects/zaboon/2.webp"
    alt: "Zaboon learning path on a phone"
  - type: image
    src: "projects/zaboon/3.webp"
    alt: "Zaboon profile screen on a phone"
architecture:
  nodes:
    - title: "Expo app"
      detail: "expo-router screens · Zustand stores · Persian-first RTL"
    - title: "Typed API client"
      detail: "mock adapter (AsyncStorage) or live adapter (axios)"
    - title: "Python API"
      detail: "ZaboonAPI · security-only changes"
  services:
    - "Phone OTP → sign-in (code shown in mock mode)"
    - "EXPO_PUBLIC_API_MODE → mock or live"
demoNote: "Persian UI · demo data, no backend"
---

## 01 Overview

Zaboon is a game-like English-learning app for Persian speakers, built solo with Expo and TypeScript on top of my own Python API. Learners follow a path of sections, units and lessons; each lesson is a quiz of sentence-building and word-matching exercises, with hearts, a daily streak and a leaderboard.

The app also has onboarding (welcome, level, daily goal, phone, OTP), alphabet training, profile and settings, an out-of-hearts screen with a regeneration timer, and an offline and error state.

## 02 Architecture

## 03 Key decisions

**A typed client with mock and live adapters.** All screens call one API contract. The mock adapter persists to AsyncStorage and ships 3 sections, 9 units and 30+ lessons generated from vocabulary banks, with a seeded leaderboard, latency and error injection. The live adapter sends an Authorization header only when a token exists.

**Game rules as pure, tested functions.** Scoring, streaks, hearts, path progress and quiz generation live in a separate logic layer with Jest tests written before the code.

**Persian first.** Persian is the default language with full RTL layout; English is the alternate.

## 04 Result

The demo on this site runs the whole app on the mock adapter. The API repository received security-only changes, and the committed adb binaries were removed from the app repository.
