---
name: "Tic-Tac-Toe"
tagline: "Tic-tac-toe with three AI levels, history and stats. Began as a 2024 React course project."
role: "Solo"
status: "shipped"
team: false
stack: ["React", "Vite", "Vitest", "Playwright"]
links:
  github: "https://github.com/R3za22/Tic-Tac-Toe-2024"
  demo: "/demos/tic-tac-toe/"
order: 21
featured: false
images: []
media:
  - type: image
    src: "projects/tic-tac-toe/1.webp"
    alt: "Tic-Tac-Toe game board"
early: true
---

## 01 Overview

Tic-Tac-Toe began in 2024 as a two-player board from a React course. It now has a mode select (two players, or against the computer at easy, medium or unbeatable), a move log, a results screen, settings, and history with stats.

## 02 Architecture

Game rules and the AI are pure modules with no React, a storage module wraps localStorage behind an injectable backend, and the UI is split into setup, game, result, stats and settings views.

## 03 Key decisions

**An AI that is tested, not trusted.** The unbeatable level is checked exhaustively: over every sequence of human replies it never loses. Medium takes an immediate win and blocks; easy plays legal moves only.

**Storage that can fail.** Corrupted saved JSON falls back to defaults, and when localStorage throws, an in-memory copy is kept and a banner explains it. History is capped at 100 games.

## 04 Result

English and Persian with RTL, light and night themes, and no external requests. Logic, AI and storage have Vitest tests; Playwright plays a full game against the unbeatable level and checks the stats and the Persian toggle.
