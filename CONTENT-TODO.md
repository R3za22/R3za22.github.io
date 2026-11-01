# Content TODO

Every visible placeholder in the site source, and every decision that needs a
human check. Placeholders are rendered as text so a draft build cannot be
mistaken for a finished one. EN placeholders use `[placeholder]`. FA
placeholders use `[جانگهدار]`, except the military-status line, which keeps the
design's own `[وارد کنید]`.

## MUST FIX before launch

- **MangaTranslator credit URL** (`links.credit.url` in `src/content/projects/{en,fa}/mangaro-factory.md`).
  The design only says "built on the open-source MangaTranslator". No URL exists
  in the design files, so the value is `https://example.com/TODO-mangatranslator`.
  Replace with the real repository URL.
- **Mangaro APK link.** The design has "Download APK" with `href="#"`. No URL exists,
  so `links.apk` is omitted from `en/mangaro.md` and `fa/mangaro.md`. Add the URL
  there, or drop the link.
- **Mangaro Factory GitHub link.** The design has "github ↗" with `href="#"`. Omitted.
- **TrapClub live demo.** The design has "live demo ↗" with `href="#"`. Omitted.
- **ShahContract live demo and GitHub.** Both are `href="#"` in the design. Omitted.
  The design card combines ShahContract with the ETH Wallet, whose repository is
  `https://github.com/R3za22/basic-eth-wallet` (from the old `content.json`). Confirm
  which link belongs to ShahContract before adding it.
- **LinkedIn handle** (contact panel, EN and FA). The design says `[your handle]`.
  The old `content.json` says `EDIT ME — https://linkedin.com/in/your-handle`.
  Not stored in the collection. Task 5 contact panel.
- **Telegram handle** (contact panel, EN and FA). `[your handle]` in the design.
- **Military status** (FA footer only). The design says `[وارد کنید]`. The EN
  footer has a `military status: [placeholder]` key only for parity; the EN
  design has no such line. Decide whether EN renders it.

## Placeholders in project content

### `en/mangaro.md`
- `## 04 Result`: "[placeholder] real numbers (users, subscribers, chapters), if available."
- `## 04 Result`: "**What I'd do differently:** [placeholder] reflection, one or two sentences."

### `en/zaboon.md`, `en/profit.md`
- `## 02 Architecture`, `## 03 Key decisions`, `## 04 Result`: all `[placeholder]`.
  Only the overview is from the old `content.json` description.

### `en/trapclub.md`, `en/shahcontract.md`, `en/mangaro-factory.md`
- `role`: `[placeholder]`.
- Body: `[placeholder] overview of ...`. The old `content.json` has no description
  for these projects (ShahContract's ETH Wallet description is archived below).

### `fa/*.md`
- `fa/mangaro.md`: `name` is "مانگارو" (from design); `role` is `[جانگهدار]`; the
  tagline is the Persian teaser from `HomeFa.dc.html`. The whole case study body
  is `[جانگهدار]`, including section titles (headings use Persian digits, see
  decisions below). `architecture` has `[جانگهدار]` for all 3 node titles, 3 node
  details and 3 services.
- `fa/zaboon.md`, `fa/profit.md`: `name`, tagline and role are from the FA
  design; body sections are `[جانگهدار]`.
- `fa/trapclub.md`, `fa/shahcontract.md`: `tagline`, `role` and body `[جانگهدار]`.
  `name` is "ترپ‌کلاب" and "شاه‌کانترکت" (from FA skills copy).
- `fa/mangaro-factory.md`: `name`, `tagline`, `role` and body all `[جانگهدار]`.

### `src/i18n/ui.ts` (FA dictionary)
- No FA copy in the design for: `more_title`, `more_meta`, `link_live_demo`,
  `link_download_apk`, `footer_built`, and every `cs_*` key (case-study chrome).
- `FA` "More projects" section does not exist in `HomeFa.dc.html`. Decide whether
  FA gets the section.

## Decisions to confirm (not placeholders, but chosen without a source)

- **Status values.** Sources only say Mangaro is "production". Zaboon, Profit,
  TrapClub, ShahContract and Mangaro Factory are set to `shipped`.
  Profit's old `content.json` tagline says "Production fintech-style mobile app",
  so `production` may be right for Profit.
- **`team` flags.** Profit is `true` (design: "team"). Everything else is `false`,
  because none is labelled team in the sources. Zaboon and Mangaro are solo.
- **Profit tagline.** EN uses the design card ("Persian investment platform. React
  Native app, admin app, Next.js web."). The old `content.json` tagline was "Production
  fintech-style mobile app, built with a team". The FA tagline matches the design card.
- **Mangaro and Zaboon taglines.** EN uses `content.json` (the designated tagline),
  FA uses the Persian card sentence from the design. These are not
  word-for-word equivalents.
- **Composed FA role lines.** `fa/zaboon.md`: "موبایل · انفرادی". `fa/profit.md`:
  "موبایل + وب · تیمی". Built from words in the design ("موبایل", "انفرادی", "تیمی"),
  not copied verbatim.
- **Profit stack includes Next.js.** From the design card, not from `content.json`.
- **ShahContract stack includes Hardhat.** The Web3 skill row lists Hardhat, and
  ETH Wallet (from `content.json`) uses it. Confirm it belongs to ShahContract.
- **Mangaro Factory `stack` is empty.** The design names no stack.
- **FA whoami panel has no `languages` row** in `HomeFa.dc.html`. The keys
  `whoami_languages` and `val_languages` are kept in FA (value "FA · EN · AR") for
  key parity. Remove the FA row or keep it.
- **FA skills differ from EN.** EN "Web frontend" lists `Vue.js` and the FA
  design does not. The FA skill arrays are the FA design's own items.
- **FA numbering.** Section numbers use Persian digits (`۰۱`, `۰۲`...), as in the
  FA design. Headings are `## ۰۱ ...`, not `## 01 ...`. Task 5 must not parse
  `## 01` literally.
- **Architecture labels.** Mangaro `architecture` node titles, details and services
  are EN-only. FA is `[جانگهدار]` throughout, because there is no FA copy.
- **Missing or unclear items from the design.** `TrapClub`, `ShahContract` and
  `Mangaro Factory` are not separate cards in the design. They appear in "More projects"
  (EN only), so `role`, `team`, and `status` for them are guesses marked above.
- **`images: []`** for all projects. Screenshots are not in the repo yet
  (`assets/screenshots/` has a README listing the expected names).

## Not migrated into the collections

The old `content.json` is removed from the working tree. Its full text is in git
history (`git show 91f106b:content.json`, or any earlier commit that has it).
Facts that have no home in the new collections, for later use:

- Profile bio: "Self-taught developer from Ahvaz, Iran, shipping production apps
  end-to-end: native Android (Kotlin + Jetpack Compose), React Native, and web
  frontends backed by Django REST APIs — including billing, OTP auth, and deployment."
- Evently (not on the design canvas): Next.js + TypeScript event platform,
  repo `https://github.com/R3za22/Evently-2024`, demo `https://evently-2024-ochre.vercel.app`.
- Basic ETH Wallet: multi-sig Solidity wallet with guardian recovery, repo
  `https://github.com/R3za22/basic-eth-wallet`. See the ShahContract item above.
- Resume (for `/resume`): summary, experience (2022 – Present, 2014 – 2019), education
  (B.Sc. in progress; Associate Degree), and languages (Persian native, English
  fluent, Arabic advanced, Japanese basic). Source for the resume page is the
  Claude Doc, not this file.
- Screenshot file names: `assets/screenshots/mangaro-{1,2,3}.png`,
  `zaboon-{1,2}.png`, `profit-1.png`.
- Project highlights and tech lists from `content.json` (superseded by the design
  copy and the collection stack lists).

## Stale references

`README.md`, `DESIGN_HANDOFF.md` and `assets/screenshots/README.md` still describe the
old vanilla site and say that copy lives in `content.json`. Update them when the
Astro rebuild lands.
