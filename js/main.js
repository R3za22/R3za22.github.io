/* Renders the whole site from content.json.
   Runs on both index.html and resume.html — sections that don't exist on the
   current page are skipped. Live GitHub stats are fetched client-side for
   projects with `githubStatsRepo`, falling back to `fallbackStats`. */

const $ = (sel, root = document) => root.querySelector(sel);

async function loadContent() {
  const res = await fetch("content.json");
  if (!res.ok) throw new Error(`content.json failed: ${res.status}`);
  return res.json();
}

function el(tag, text, attrs = {}) {
  const node = document.createElement(tag);
  if (text != null) node.textContent = text;
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

function isPlaceholder(value) {
  return typeof value === "string" && value.startsWith("EDIT ME");
}

/* ---------- shared: profile / hero ---------- */
function renderProfile(profile) {
  const name = isPlaceholder(profile.name) ? "Your Name" : profile.name;
  const [first, ...restWords] = name.split(" ");
  const rest = restWords.join(" ");

  const heroFirst = $("#hero-first");
  if (heroFirst) heroFirst.textContent = first.toUpperCase();
  const heroRest = $("#hero-rest");
  if (heroRest && rest) {
    const dot = heroRest.querySelector(".dot");
    heroRest.textContent = rest.toUpperCase();
    if (dot) heroRest.append(dot);
  }

  const title = $("#profile-title");
  if (title) title.textContent = profile.title;

  const bio = $("#profile-bio");
  if (bio) bio.textContent = isPlaceholder(profile.bio)
    ? profile.bio.replace(/^EDIT ME — /, "")
    : profile.bio;

  const locale = $("#hero-locale");
  if (locale && (profile.location || profile.coordinates || profile.motto)) {
    const line1 = [profile.location, profile.coordinates].filter(Boolean).join(" — ").toUpperCase();
    locale.textContent = "";
    if (line1) locale.append(document.createTextNode(line1));
    if (profile.motto) {
      if (line1) locale.append(document.createElement("br"));
      const fa = el("span", profile.motto.local, { class: "fa" });
      locale.append(fa, document.createTextNode(` · ${profile.motto.en}`));
    }
  }

  const marquee = $("#marquee-track");
  if (marquee && profile.marquee?.length) {
    const words = profile.marquee.map((w) => w.toUpperCase());
    const loop = [...words, ...words]; // duplicated for seamless CSS marquee
    marquee.textContent = "";
    loop.forEach((word, i) => {
      marquee.append(el("span", word));
      if (i < loop.length - 1) marquee.append(el("span", "✦", { class: "sep" }));
    });
  }

  const headshot = $("#headshot");
  // Reveal the headshot slot only once a real image is provided
  if (headshot) headshot.addEventListener("load", () => headshot.removeAttribute("hidden"));

  const footerLinks = $("#footer-links");
  if (footerLinks) {
    const { github, linkedin, email } = profile.links;
    if (github) footerLinks.append(el("a", "GITHUB", { href: github, target: "_blank", rel: "noopener" }));
    if (linkedin && !isPlaceholder(linkedin))
      footerLinks.append(el("a", "LINKEDIN", { href: linkedin, target: "_blank", rel: "noopener" }));
    if (email) footerLinks.append(el("a", "EMAIL", { href: `mailto:${email}` }));
  }

  const footer = $("#footer-line");
  if (footer) footer.textContent = `© ${new Date().getFullYear()} ${name.toUpperCase()} — BUILT BY HAND, NO FRAMEWORK`;

  // resume.html header
  const resumeName = $(".resume-header #profile-name");
  if (resumeName) resumeName.textContent = name;
  const resumeTitle = $(".resume-header #profile-title");
  if (resumeTitle) resumeTitle.textContent = profile.title.toUpperCase();
}

/* ---------- index: projects ---------- */
function projectHref(p, githubProfile) {
  if (p.demo) return p.demo;
  if (p.repo) return p.repo;
  if (p.playStore) return p.playStore;
  if (p.flagship && p.category === "android") return "#android-apps";
  return githubProfile || "#projects";
}

function renderProjects(projects, githubProfile) {
  const grid = $("#project-grid");
  if (!grid) return;
  const tpl = $("#tpl-project-row");

  projects.forEach((p, i) => {
    const row = tpl.content.cloneNode(true);
    const anchor = row.querySelector(".pc-row");
    const href = projectHref(p, githubProfile);
    anchor.href = href;
    if (/^https?:\/\//.test(href)) {
      anchor.target = "_blank";
      anchor.rel = "noopener";
    }
    if (p.flagship) anchor.classList.add("flagship");
    anchor.dataset.projectId = p.id;

    $(".pc-index", row).textContent = String(i + 1).padStart(3, "0");
    $(".pc-name-text", row).textContent = p.name.toUpperCase();
    const flag = $(".pc-flag", row);
    if (p.flagship) flag.hidden = false;
    $(".pc-tagline", row).textContent = p.tagline;
    $(".pc-tag", row).textContent = (p.displayTag || p.category || "").toUpperCase();

    grid.append(row);
  });
}

/* ---------- index: android apps (phone frames + copy) ---------- */
function renderAndroidApps(projects, androidSection) {
  const list = $("#android-list");
  if (!list) return;
  const tpl = $("#tpl-android-frame");
  const androidProjects = projects.filter((p) => p.category === "android");

  for (const p of androidProjects) {
    for (const src of p.screenshots) {
      const frame = tpl.content.cloneNode(true);
      const screen = $(".ac-screen", frame);
      const img = el("img", null, { src, alt: `${p.name} screenshot`, loading: "lazy" });
      img.addEventListener("error", () => {
        img.replaceWith(el("div", `${p.name} — screenshot`, { class: "screenshot-placeholder" }));
      });
      screen.append(img);
      list.append(frame);
    }
  }

  if (!androidSection) return;
  const copy = el("div", null, { id: "android-copy" });
  copy.dataset.reveal = "";
  copy.append(el("h3", androidSection.heading));
  copy.append(el("p", androidSection.description));

  const ctaTarget = androidProjects.find((p) => p.apk || p.playStore);
  const ctaHref = ctaTarget ? (ctaTarget.apk || ctaTarget.playStore) : "#projects";
  const cta = el("a", `${androidSection.ctaLabel} ↗`, { id: "android-cta", href: ctaHref });
  if (/^https?:\/\//.test(ctaHref)) { cta.target = "_blank"; cta.rel = "noopener"; }
  copy.append(cta);

  list.append(copy);
}

/* ---------- shared: skills ---------- */
function renderSkills(skills) {
  const wrap = $("#skills-groups");
  if (!wrap) return;
  for (const group of skills) {
    const section = el("section", null, { class: "skill-group" });
    section.append(el("h3", group.category));
    const ul = el("ul");
    for (const item of group.items) ul.append(el("li", item));
    section.append(ul);
    wrap.append(section);
  }
}

/* ---------- resume page ---------- */
function renderResume(resume) {
  const summary = $("#resume-summary-text");
  if (!summary) return; // not on resume page
  summary.textContent = resume.summary.replace(/^EDIT ME — /, "");

  const tpl = $("#tpl-resume-entry");
  const addEntries = (containerSel, entries, headingOf, periodOf, pointsOf) => {
    const container = $(containerSel);
    for (const entry of entries) {
      const node = tpl.content.cloneNode(true);
      $(".re-heading", node).textContent = headingOf(entry).replace(/EDIT ME — /g, "");
      $(".re-period", node).textContent = periodOf(entry).replace(/^EDIT ME — /, "");
      const ul = $(".re-points", node);
      const points = pointsOf(entry);
      if (points) points.forEach((pt) => ul.append(el("li", pt.replace(/^EDIT ME — /, ""))));
      else ul.remove();
      container.append(node);
    }
  };

  addEntries("#experience-list", resume.experience,
    (e) => `${e.role} — ${e.company}`, (e) => e.period, (e) => e.points);
  addEntries("#education-list", resume.education,
    (e) => `${e.degree} — ${e.school}`, (e) => e.period, () => null);

  const langs = $("#languages-list");
  if (langs && resume.languages) {
    for (const lang of resume.languages) langs.append(el("li", `${lang.name} — ${lang.level}`));
  }

  const pdfLink = $("#resume-pdf-link");
  if (pdfLink) pdfLink.href = resume.pdf;
}

/* ---------- reveal-on-scroll ---------- */
function initReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const targets = Array.from(document.querySelectorAll("[data-reveal]"));
  if (!targets.length) return;

  let pending = new Set(targets);
  const reveal = (el) => { el.classList.add("rg-in"); pending.delete(el); };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          reveal(entry.target);
          obs.unobserve(entry.target);
        }
      }
    },
    { threshold: 0, rootMargin: "0px 0px -12% 0px" }
  );
  targets.forEach((t, i) => {
    t.style.transitionDelay = `${(i % 5) * 70}ms`;
    observer.observe(t);
  });

  // Safety net: never leave content permanently hidden if IntersectionObserver
  // never fires (e.g. throttled background tab, unsupported environment).
  setTimeout(() => {
    pending.forEach(reveal);
    observer.disconnect();
  }, 4000);
}

/* ---------- boot ---------- */
loadContent()
  .then((content) => {
    renderProfile(content.profile);
    renderProjects(content.projects, content.profile.links.github);
    renderAndroidApps(content.projects, content.androidSection);
    renderSkills(content.skills);
    renderResume(content.resume);
    initReveal();
  })
  .catch((err) => {
    console.error(err);
    const main = document.querySelector("main");
    if (main) main.prepend(el("p", "Failed to load site content.", { role: "alert" }));
  });
