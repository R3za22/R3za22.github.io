---
name: "Employee-Manager"
tagline: "Employee records tool with validation, CSV import and export, and Jalali dates. Built in 2023 for a friend's university project."
role: "Solo"
status: "shipped"
team: false
stack: ["React", "TypeScript", "Vite", "Vitest", "Playwright"]
links:
  demo: "/demos/employee-manager/"
order: 23
featured: false
images: []
early: true
---

## 01 Overview

Employee-Manager began in 2023 as a 763-line vanilla JavaScript page with an in-memory array, built for a friend's university project. It is now a Vite, React and TypeScript app with a dashboard, an employee list with search, filter, sort and pagination, profiles, add and edit, departments, import and export, and a printable schedule.

## 02 Architecture

Pure logic sits in a domain folder (validators, Jalali calendar, digits, CSV, query, shifts). A typed data layer has a mock adapter over an injectable Storage with fictional seed data, and a live REST adapter whose base URL comes from the environment. The router uses hash routing so any static host works.

## 03 Key decisions

**Real validation.** National-ID checksum, personnel-number format and uniqueness, real and non-future dates, and required fields.

**Safe import and export.** CSV follows RFC 4180, guards against spreadsheet formula injection and reports each bad row; delete has confirm and undo.

## 04 Result

English and Persian with RTL, Jalali dates and Persian digits in Persian. Domain logic and both adapters have Vitest tests, including Jalali round-trips cross-checked against Intl; Playwright covers add with errors, search, delete and undo, import with bad rows, and the Persian toggle. The demo has no external requests.
