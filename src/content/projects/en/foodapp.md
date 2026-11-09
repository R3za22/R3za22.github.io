---
name: "FoodApp"
tagline: "Django REST recipe API with a new React client that runs on a mock adapter or the live API."
role: "Solo"
status: "shipped"
team: false
stack: ["Django", "DRF", "React", "TypeScript", "Vite"]
links:
  demo: "/demos/foodapp/"
order: 24
featured: false
media:
  - type: image
    src: "projects/foodapp/1.webp"
    alt: "FoodApp recipe list with tag and ingredient filters"
  - type: image
    src: "projects/foodapp/2.webp"
    alt: "FoodApp recipe detail with photo, ingredients and method"
  - type: image
    src: "projects/foodapp/3.webp"
    alt: "Tags and ingredients manager with usage counts and rename actions"
  - type: image
    src: "projects/foodapp/4.webp"
    alt: "New recipe form with basics, photo upload and tags"
early: true
---

## 01 Overview

FoodApp is a recipe app in two parts: a Django REST API (recipes, tags, ingredients, image upload, token auth) and a React and TypeScript client added in a web folder. The API follows the structure of a public Advanced Django REST API course and was then extended and hardened.

## 02 Architecture

The client runs against a mock adapter (sample data in localStorage, a demo login) or the live API with token auth, picked by VITE_API_MODE. The API schema is committed as OpenAPI and the client types are generated from it.

## 03 Key decisions

**API hygiene.** The secret key comes from the environment, debug is off by default, the database and bytecode files were untracked, and create endpoints for tags and ingredients, ingredients on recipe detail and write, and a recipe count were added.

**Screens.** Sign up and log in, my recipes with tag, ingredient and title filters, recipe detail, create and edit with photo, a tags and ingredients manager, and a profile with the API token, in English and Persian with RTL.

## 04 Result

The API has 57 Django tests. The client has Vitest tests for both adapters, validation and translation parity, and Playwright flows including a 360px layout and the demo build. Not done: pagination, CORS headers, Docker and CI.
