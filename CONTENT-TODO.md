# Content TODO

Only the items that need the owner. Everything else on the site is written from
the repositories, the design files and the plans in `My Profile/docs/`.

## Before launch (owner)

- **Resume files.** `public/resume-en.pdf` and `public/resume-fa.pdf` are still
  one-page placeholders. Export the real resume (Claude Doc) and replace both.
- **Share image.** `public/og.png` is generated wordmark art. Replace it with a
  designed 1200x630 image when one exists.
- **Persian copy review.** All FA case studies, the FA UI strings and the FA resume
  summary are drafts written for natural reading. A native editor should read them.
- **Languages line.** The EN resume lists Persian, English, Arabic and Japanese
  (basic). The FA whoami panel says "FA · EN · AR". Pick one list.
- **Mangaro period.** The site says "2024 — now". The Mangaro repository's first
  commit is dated 2026-06, so confirm the start year.
- **Old Profit credit.** Confirm the backend credit (Ali Sabet Imani,
  github.com/Ali1375SI). Role set to programming team lead, full-time, 2024–25.
- **ShahContract credit.** The Adventureum credit line is in the EN and FA files;
  keep or remove it.
- **TrapClub role.** Set to "Frontend" as an assumption. Confirm.

## Links left out on purpose

- **GitHub links** appear only for public repositories. Mangaro, Mizan (BaristaSho),
  Zaboon, TrapClub, old Profit, profit_app_main and AIProfit (R3za22/profit) are
  private, so their cards show only the live demo. Make a repo public and add its
  `links.github` to show the link.
- **Mangaro APK and Mangaro Factory** are not on the site (private and excluded).
  The Mangaro Factory entry was removed. Restore it from git history if it goes public.

## Domain (later)

- Buy `rezaghamar.ir` when ready. Then set `site` in `astro.config.mjs`, the SEO
  base URL in `src/components/Seo.astro`, `robots.txt` and the person JSON-LD in
  `src/lib/schema.ts`, and update the demo banners' "back to site" link.
