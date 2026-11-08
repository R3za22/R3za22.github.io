---
name: "Sofia-Shop"
tagline: "Bilingual furniture shop frontend: catalogue, cart and simulated checkout. Began as a 2023 course project."
role: "Solo"
status: "shipped"
team: false
stack: ["React", "TypeScript", "Vite", "Vitest", "Playwright"]
links:
  demo: "/demos/sofia-shop/"
order: 20
featured: false
images: []
early: true
---

## 01 Overview

Sofia-Shop began in 2023 as a hand-written JavaScript catalogue from a store-building course, with no checkout and no tests. It was rewritten on Vite, React and TypeScript as a bilingual (English and Persian, RTL) shop for furniture and decor.

## 02 Architecture

A typed ShopApi has a mock adapter (seeded products, cart and orders in localStorage, latency and error injection, simulated payment with test cards) and a live fetch adapter chosen by an environment variable. Pricing and cart rules are pure functions.

## 03 Key decisions

**Original artwork.** Every product image is an SVG illustration drawn in code, so there are no stock photos.

**Checkout validation.** Phone, 10-digit postal code, card Luhn check and expiry are validated, with delivery cost by city and method, a discount code and stock clamping.

## 04 Result

Home, product list with filters, sort and pagination, product detail, cart, checkout, confirmation, account and orders, with empty, loading and error states. Pricing, cart, validation and the mock adapter are unit-tested; Playwright covers browse to order, RTL and the absence of cross-origin requests.
