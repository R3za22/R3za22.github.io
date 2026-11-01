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

## Case-study pages (Task 5)

Placeholders added by the case-study pages. The page renders each one as visible text.

### Project fields (`pitch`, `platform`, `hosting`, `period`)
- `en/mangaro.md`: all four from the design. `pitch` is the design's one-line pitch.
  `fa/mangaro.md`: `pitch` reuses the FA card sentence (the Mangaro tagline). Confirm
  it, or replace it with a real one-line pitch. `platform`, `hosting`, `period` are `[جانگهدار]`.
- `en/zaboon.md`: `platform` "React Native (Expo) + Python API" is taken from the overview
  body. `pitch`, `hosting`, `period` are `[placeholder]`.
- `en/profit.md`: `platform` "React Native app + Next.js web" is taken from the tagline.
  `pitch`, `hosting`, `period` are `[placeholder]`.
- `fa/zaboon.md`, `fa/profit.md`: `pitch`, `platform`, `hosting`, `period` are `[جانگهدار]`.

### Mangaro case-study chrome (EN from the design, FA not yet written)
- Phone frame labels, `cs_shot_library`, `cs_shot_reader`, `cs_shot_plus`: EN from the design
  (`[Library screen video]`, `[Reader screen]`, `[Plus subscription]`). FA `[جانگهدار]`.
- Frames for Zaboon and Profit are `[placeholder]` (EN) / `[جانگهدار]` (FA) until screenshots exist.
- `cs_team_project` ("team project"): FA `[جانگهدار]`.
- `cs_challenge` ("challenge", the decision-card label): FA `[جانگهدار]`.
- `cs_back` FA is `← [جانگهدار]`; the arrow is kept, the words are not yet written.

### Facts and links
- The links item shows `[placeholder]` / `[جانگهدار]` while `links.apk`, `links.github`
  and `links.demo` are unset (see the MUST FIX list above).

### Not yet built
- Case-study pages do not render `images` yet. Frames are placeholders only.
- The design's bottom nav ("← all work") is replaced by previous/next links. The
  "all work" link stays in the header.
- The site footer is not on case-study pages (the design has none).

## Resume, 404 and SEO (Task 6)

### Placeholders
- `public/resume-en.pdf` and `public/resume-fa.pdf` are placeholder one-page PDFs
  that read "Resume PDF placeholder - export from the resume doc". Replace both with
  the exported resume before launch. The Hero and resume pages link to these paths.
- `public/og.png` is placeholder art: the wordmark `reza.ghamar_` on `#0B0D10`.
  Replace it with the designed share image when there is one.
- FA resume summary (`resume_summary_text` in `src/i18n/ui.ts`) is `[جانگهدار]`. The
  EN summary is the profile bio from the old `content.json`. No Persian copy exists.

### Decisions to confirm
- The resume languages line is taken from the earlier resume notes in this file:
  Persian (native), English (fluent), Arabic (advanced), Japanese (basic). The FA
  whoami panel says "FA · EN · AR" and does not list Japanese. Pick one list.
- The FA languages line is a translation of the EN line and is not from the design.
- Resume experience and education are split by position in `timeline.*.json`:
  experience is items 0 and 4 (product work and freelance design); education is items
  1, 2 and 3 (B.Sc., self-study, associate degree). Self-study sits under education.
- The 404 page is EN only, as in the design brief. Its FA dictionary entries exist for
  parity but no FA 404 page is built. It is `noindex`, so it has no canonical or
  hreflang links.
