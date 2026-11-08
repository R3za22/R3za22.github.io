// All UI copy. EN from the design (Home.dc.html, CaseStudy.dc.html); FA from HomeFa.dc.html
// and FA strings written for the Persian pages. Arrow glyphs: use `arrow` in templates.

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
  status_production: 'production',
  status_shipped: 'shipped',
  status_archived: 'archived',
  read_case_study: 'Read case study',
  case_study: 'Case study',

  more_title: 'More projects',
  more_meta: '02 / demos & code',
  early_title: 'Early work',
  link_live_demo: 'Live demo',
  link_admin_demo: 'Admin demo',
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
  contact_github: 'github',

  footer_copyright: '© 2026 Reza Ghamar',
  footer_built: 'built with Astro · hosted on GitHub Pages',

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
  cs_team_project: 'team project',
  cs_challenge: 'challenge',

  resume_title: 'Resume',
  resume_description: 'Web version of the resume: summary, experience, education and skills. The PDF is linked on the page.',
  resume_download_pdf: 'Download PDF',
  resume_summary: 'Summary',
  resume_experience: 'Experience',
  resume_education: 'Education',
  resume_skills: 'Skills',
  resume_languages: 'Languages',
  resume_summary_text:
    'Self-taught developer from Ahvaz, Iran, shipping production apps end-to-end: native Android (Kotlin + Jetpack Compose), React Native, and web frontends backed by Django REST APIs — including billing, OTP auth, and deployment.',
  resume_languages_value: 'Persian (native) · English (fluent) · Arabic (advanced) · Japanese (basic)',

  not_found_title: 'Page not found',
  not_found_text: 'The page you are looking for does not exist or has moved.',
  not_found_home: 'Back to home',
  not_found_fa: 'Persian version',
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
  status_production: 'در حال اجرا',
  status_shipped: 'منتشر شده',
  status_archived: 'بایگانی شده',
  read_case_study: 'مطالعه موردی',
  case_study: 'مطالعه موردی',

  more_title: 'پروژه‌های بیشتر',
  more_meta: '۰۲ / دموها و کدها',
  early_title: 'کارهای اولیه',
  link_live_demo: 'دموی زنده',
  link_admin_demo: 'دموی پنل ادمین',
  link_github: 'github',
  link_download_apk: 'دانلود APK',

  skills_title: 'مهارت‌ها، با مدرک',
  skills_meta: '۰۲ / تکنولوژی‌ها',
  proof_label: 'نمونه',

  timeline_title: 'سوابق و تحصیلات',
  timeline_meta: '۰۳ / خط زمانی',

  contact_title: 'در تماس باشیم.',
  contact_text: 'به دنبال توسعه‌دهنده موبایل یا فول‌استک هستید؟ ظرف یک روز پاسخ می‌دهم.',
  contact_email: 'email',
  contact_github: 'github',

  footer_copyright: '© ۱۴۰۵ رضا قمر',
  footer_built: 'ساخته‌شده با Astro · میزبانی روی GitHub Pages',

  cs_back: '← همه کارها',
  cs_next: 'بعدی:',
  cs_fact_role: 'نقش',
  cs_fact_platform: 'پلتفرم',
  cs_fact_hosting: 'میزبانی',
  cs_fact_links: 'پیوندها',
  cs_overview: '۰۱ / نمای کلی',
  cs_architecture: '۰۲ / معماری',
  cs_decisions: '۰۳ / تصمیم‌های کلیدی',
  cs_result: '۰۴ / نتیجه',
  cs_stack: '۰۵ / تکنولوژی‌ها',
  cs_differently: 'اگر دوباره می‌ساختم:',
  cs_team_project: 'پروژه تیمی',
  cs_challenge: 'چالش',

  resume_title: 'رزومه',
  resume_description: 'نسخه وب رزومه: خلاصه، تجربه، تحصیلات و مهارت‌ها. نسخه PDF هم در صفحه قرار دارد.',
  resume_download_pdf: 'دانلود PDF',
  resume_summary: 'خلاصه',
  resume_experience: 'تجربه',
  resume_education: 'تحصیلات',
  resume_skills: 'مهارت‌ها',
  resume_languages: 'زبان‌ها',
  resume_summary_text:
    'توسعه‌دهنده خودآموخته اهل اهواز، ایران، که اپلیکیشن‌های واقعی را از ابتدا تا انتها منتشر می‌کند: اندروید بومی با Kotlin و Jetpack Compose، React Native، و فرانت‌اندهای وب با APIهای Django REST، از جمله پرداخت، احراز هویت با کد یک‌بارمصرف و استقرار.',
  resume_languages_value: 'فارسی (مادری) · انگلیسی (مسلط) · عربی (پیشرفته) · ژاپنی (مقدماتی)',

  not_found_title: 'صفحه پیدا نشد',
  not_found_text: 'صفحه‌ای که دنبالش هستید وجود ندارد یا جابه‌جا شده است.',
  not_found_home: 'بازگشت به خانه',
  not_found_fa: 'نسخه فارسی',
} satisfies Record<keyof typeof en, string>;

export const ui = { en, fa } as const;

export type Lang = 'en' | 'fa';
export type UiKey = keyof typeof en;

export function t(lang: Lang, key: UiKey): string {
  return ui[lang][key];
}
