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

/* ---------- shared: profile header ---------- */
function renderProfile(profile) {
  const name = $("#profile-name");
  if (name) name.textContent = isPlaceholder(profile.name) ? "Your Name" : profile.name;

  const title = $("#profile-title");
  if (title) title.textContent = profile.title;

  const bio = $("#profile-bio");
  if (bio) bio.textContent = isPlaceholder(profile.bio)
    ? profile.bio.replace(/^EDIT ME — /, "")
    : profile.bio;

  const links = $("#profile-links");
  if (links) {
    const { github, linkedin, email } = profile.links;
    if (github) links.append(el("a", "GitHub", { href: github, target: "_blank", rel: "noopener" }));
    if (linkedin && !isPlaceholder(linkedin))
      links.append(el("a", "LinkedIn", { href: linkedin, target: "_blank", rel: "noopener" }));
    if (email) links.append(el("a", "Email", { href: `mailto:${email}` }));
  }

  const footer = $("#footer-line");
  if (footer) {
    const displayName = isPlaceholder(profile.name) ? "R3za22" : profile.name;
    footer.textContent = `© ${new Date().getFullYear()} ${displayName}`;
  }
}

/* ---------- shared: card link row ---------- */
function renderLinks(nav, project) {
  if (project.repo) nav.append(el("a", "Repository", { href: project.repo, target: "_blank", rel: "noopener" }));
  else if (project.repoNote) nav.append(el("span", project.repoNote, { class: "repo-note" }));
  if (project.demo) nav.append(el("a", "Live demo", { href: project.demo, target: "_blank", rel: "noopener" }));
  if (project.playStore) nav.append(el("a", "Play Store", { href: project.playStore, target: "_blank", rel: "noopener" }));
  if (project.apk) nav.append(el("a", "Download APK", { href: project.apk, target: "_blank", rel: "noopener" }));
}

function renderList(ul, items) {
  for (const item of items) ul.append(el("li", item));
}

/* ---------- index: projects ---------- */
function renderProjects(projects) {
  const grid = $("#project-grid");
  if (!grid) return;
  const tpl = $("#tpl-project-card");

  for (const p of projects) {
    const card = tpl.content.cloneNode(true);
    $(".pc-name", card).textContent = p.name;
    $(".pc-tagline", card).textContent = p.tagline;
    $(".pc-desc", card).textContent = p.description;
    renderList($(".pc-highlights", card), p.highlights);
    renderList($(".pc-tech", card), p.tech);
    renderLinks($(".pc-links", card), p);

    const article = card.querySelector("article");
    article.dataset.projectId = p.id;
    grid.append(card);

    if (p.githubStatsRepo) applyStats(article, p);
  }
}

/* Live stats with hardcoded fallback. */
async function applyStats(article, project) {
  const statsEl = $(".pc-stats", article);
  const show = (stars, language) => {
    $(".pc-stars", article).textContent = `★ ${stars}`;
    $(".pc-lang", article).textContent = language || "";
    statsEl.hidden = false;
  };
  try {
    const res = await fetch(`https://api.github.com/repos/${project.githubStatsRepo}`);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    show(data.stargazers_count, data.language);
  } catch {
    if (project.fallbackStats) show(project.fallbackStats.stars, project.fallbackStats.language);
  }
}

/* ---------- index: android apps ---------- */
function renderAndroidApps(projects) {
  const list = $("#android-list");
  if (!list) return;
  const tpl = $("#tpl-android-card");

  for (const p of projects.filter((x) => x.category === "android")) {
    const card = tpl.content.cloneNode(true);
    $(".ac-name", card).textContent = p.name;
    $(".ac-tagline", card).textContent = p.tagline;
    $(".ac-desc", card).textContent = p.description;
    renderList($(".ac-highlights", card), p.highlights);
    renderList($(".ac-tech", card), p.tech);
    renderLinks($(".ac-links", card), p);

    const strip = $(".ac-screenshots", card);
    for (const src of p.screenshots) {
      const img = el("img", null, { src, alt: `${p.name} screenshot`, loading: "lazy" });
      // Until real screenshots are added, show a labeled placeholder box instead
      img.addEventListener("error", () => {
        const box = el("div", "screenshot placeholder", { class: "screenshot-placeholder" });
        img.replaceWith(box);
      });
      strip.append(img);
    }

    card.querySelector("article").dataset.projectId = p.id;
    list.append(card);
  }
}

/* ---------- shared: skills ---------- */
function renderSkills(skills) {
  const wrap = $("#skills-groups");
  if (!wrap) return;
  for (const group of skills) {
    const section = el("section", null, { class: "skill-group" });
    section.append(el("h3", group.category));
    const ul = el("ul");
    renderList(ul, group.items);
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
      if (points) renderList(ul, points.map((pt) => pt.replace(/^EDIT ME — /, "")));
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
    for (const lang of resume.languages) {
      const li = el("li", `${lang.name} — ${lang.level}`);
      langs.append(li);
    }
  }

  const pdfLink = $("#resume-pdf-link");
  if (pdfLink) pdfLink.href = resume.pdf;
}

/* ---------- boot ---------- */
loadContent()
  .then((content) => {
    renderProfile(content.profile);
    renderProjects(content.projects);
    renderAndroidApps(content.projects);
    renderSkills(content.skills);
    renderResume(content.resume);
  })
  .catch((err) => {
    console.error(err);
    const main = document.querySelector("main");
    if (main) main.prepend(el("p", "Failed to load site content.", { role: "alert" }));
  });
