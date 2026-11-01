// All UI copy. Source: brand/design/Home.dc.html (EN), HomeFa.dc.html (FA),
// CaseStudy.dc.html (EN case-study chrome). Any FA string with no Persian
// copy in the design files is `[جانگهدار]` and is listed in CONTENT-TODO.md.
// Arrow glyphs: use `arrow` in templates instead of hard-coding the direction.

export const en = {
  brand: 'reza.ghamar',
  nav_work: '/work',
  nav_skills: '/skills',
  nav_experience: '/experience',
  nav_contact: '/contact',
  lang_switch: 'EN · FA',
  arrow: '→',

  hero_status: 'Open to full-time roles · remote or on-site',
  hero_title: 'Mobile & Full-Stack Developer.',
  hero_subtitle: 'I ship complete apps — Android, web and backend.',
  cta_resume: 'Download resume',
  cta_work: 'See my work',

  whoami_cmd: '$ whoami',
  whoami_name: 'name',
  whoami_based: 'based',
  whoami_in_prod: 'in prod',
  whoami_shipped: 'shipped',
  whoami_stack: 'stack',
  whoami_languages: 'languages',
  val_name: 'Reza Ghamar',
  val_based: 'Ahvaz, Iran',
  val_in_prod: 'Mangaro ●',
  val_shipped: '6 projects',
  val_stack: 'Kotlin · RN · Next · Django',
  val_languages: 'FA · EN · AR',

  work_title: 'Selected work',
  work_meta: '01 / case studies',
  work_mangaro_status: '● production · solo',
  read_case_study: 'Read case study',
  case_study: 'Case study',
  shot_mangaro: '[Mangaro — app screenshots in phone frames]',
  shot_zaboon: '[Zaboon — screenshots]',
  shot_profit: '[Profit — screenshots]',

  more_title: 'More projects',
  more_meta: '02 / demos & code',
  link_live_demo: 'live demo',
  link_github: 'github',
  link_download_apk: 'Download APK',

  skills_title: 'Skills, with proof',
  skills_meta: '03 / stack',
  proof_label: 'proof',

  timeline_title: 'Experience & education',
  timeline_meta: '04 / timeline',

  contact_title: "Let's talk.",
  contact_text: 'Hiring for mobile or full-stack? I reply within a day.',
  contact_email: 'email',
  contact_linkedin: 'linkedin',
  contact_telegram: 'telegram',
  contact_github: 'github',

  footer_copyright: '© 2026 Reza Ghamar',
  footer_built: 'built with Astro · hosted on GitHub Pages',
  footer_military: 'military status: [placeholder]',

  cs_back: '← all work',
  cs_next: 'Next:',
  cs_fact_role: 'role',
  cs_fact_platform: 'platform',
  cs_fact_hosting: 'hosting',
  cs_fact_links: 'links',
  cs_overview: '01 / overview',
  cs_architecture: '02 / architecture',
  cs_decisions: '03 / key decisions',
  cs_result: '04 / result',
  cs_stack: '05 / stack',
  cs_differently: "What I'd do differently:",
} as const;

export const fa = {
  brand: 'رضا قمر',
  nav_work: 'نمونه‌کارها',
  nav_skills: 'مهارت‌ها',
  nav_experience: 'سوابق',
  nav_contact: 'تماس',
  lang_switch: 'FA · EN',
  arrow: '←',

  hero_status: 'آماده همکاری تمام‌وقت · دورکاری یا حضوری',
  hero_title: 'توسعه‌دهنده موبایل و فول‌استک.',
  hero_subtitle: 'اپلیکیشن کامل می‌سازم و منتشر می‌کنم — اندروید، وب و بک‌اند.',
  cta_resume: 'دانلود رزومه',
  cta_work: 'دیدن نمونه‌کارها',

  // The FA canvas has no languages row in the whoami panel; the EN value is
  // kept here so both dictionaries stay in parity. See CONTENT-TODO.md.
  whoami_cmd: '$ whoami',
  whoami_name: 'name',
  whoami_based: 'based',
  whoami_in_prod: 'in prod',
  whoami_shipped: 'shipped',
  whoami_stack: 'stack',
  whoami_languages: 'languages',
  val_name: 'Reza Ghamar',
  val_based: 'Ahvaz, Iran',
  val_in_prod: 'Mangaro ●',
  val_shipped: '6 projects',
  val_stack: 'Kotlin · RN · Next · Django',
  val_languages: 'FA · EN · AR',

  work_title: 'نمونه‌کارهای منتخب',
  work_meta: '۰۱ / مطالعه موردی',
  work_mangaro_status: '● در حال اجرا · انفرادی',
  read_case_study: 'مطالعه موردی',
  case_study: 'مطالعه موردی',
  shot_mangaro: '[تصاویر اپلیکیشن مانگارو]',
  shot_zaboon: '[تصاویر زبون]',
  shot_profit: '[تصاویر پرافیت]',

  more_title: '[جانگهدار]',
  more_meta: '[جانگهدار]',
  link_live_demo: '[جانگهدار]',
  link_github: 'github',
  link_download_apk: '[جانگهدار]',

  skills_title: 'مهارت‌ها، با مدرک',
  skills_meta: '۰۲ / تکنولوژی‌ها',
  proof_label: 'نمونه',

  timeline_title: 'سوابق و تحصیلات',
  timeline_meta: '۰۳ / خط زمانی',

  contact_title: 'در تماس باشیم.',
  contact_text: 'به دنبال توسعه‌دهنده موبایل یا فول‌استک هستید؟ ظرف یک روز پاسخ می‌دهم.',
  contact_email: 'email',
  contact_linkedin: 'linkedin',
  contact_telegram: 'telegram',
  contact_github: 'github',

  footer_copyright: '© ۱۴۰۵ رضا قمر',
  footer_built: '[جانگهدار]',
  footer_military: 'وضعیت نظام وظیفه: [وارد کنید]',

  cs_back: '[جانگهدار]',
  cs_next: '[جانگهدار]',
  cs_fact_role: '[جانگهدار]',
  cs_fact_platform: '[جانگهدار]',
  cs_fact_hosting: '[جانگهدار]',
  cs_fact_links: '[جانگهدار]',
  cs_overview: '[جانگهدار]',
  cs_architecture: '[جانگهدار]',
  cs_decisions: '[جانگهدار]',
  cs_result: '[جانگهدار]',
  cs_stack: '[جانگهدار]',
  cs_differently: '[جانگهدار]',
} satisfies Record<keyof typeof en, string>;

export const ui = { en, fa } as const;

export type Lang = 'en' | 'fa';
export type UiKey = keyof typeof en;

export function t(lang: Lang, key: UiKey): string {
  return ui[lang][key];
}
