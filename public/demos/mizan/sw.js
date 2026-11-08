/* Mizan service worker.
 *
 * Hand-written on purpose: the app is a Next.js static export (output: "export") built with Turbopack,
 * where @serwist/next's webpack plugin does not run. scripts/postbuild-sw.mjs scans out/ after `next build`
 * and replaces the placeholders below with the real file list and a version, so every exported file is
 * precached and the app works fully offline after the first visit.
 */
const VERSION = "c7ece19956";
const PRECACHE = ["/demos/mizan/","/demos/mizan/404.html","/demos/mizan/404/","/demos/mizan/__next.__PAGE__.txt","/demos/mizan/__next._full.txt","/demos/mizan/__next._tree.txt","/demos/mizan/_headers","/demos/mizan/_next/static/UfRdw5XRKt-_itgqbYxiM/_buildManifest.js","/demos/mizan/_next/static/UfRdw5XRKt-_itgqbYxiM/_clientMiddlewareManifest.js","/demos/mizan/_next/static/UfRdw5XRKt-_itgqbYxiM/_ssgManifest.js","/demos/mizan/_next/static/chunks/08xc_exa6qs94.css","/demos/mizan/_next/static/chunks/0cz1d0mv5g_q7.js","/demos/mizan/_next/static/chunks/0dtwnomdrd35l.js","/demos/mizan/_next/static/chunks/0fxpla1swex4q.js","/demos/mizan/_next/static/chunks/0h9nriqzdy9dr.js","/demos/mizan/_next/static/chunks/0z7e5qqv98cow.js","/demos/mizan/_next/static/chunks/170r-j3qc_web.js","/demos/mizan/_next/static/chunks/1fwiavuhqoys3.js","/demos/mizan/_next/static/chunks/1gxjuckv91jw9.js","/demos/mizan/_next/static/chunks/1hdcyshjx4cik.js","/demos/mizan/_next/static/chunks/1ufvmve5290ne.js","/demos/mizan/_next/static/chunks/1vksrbb-v3_y1.js","/demos/mizan/_next/static/chunks/1wnov70f88xjy.js","/demos/mizan/_next/static/chunks/23b63q24fp99m.js","/demos/mizan/_next/static/chunks/23e6jep2anmtk.js","/demos/mizan/_next/static/chunks/2h0g7tp6abq5z.js","/demos/mizan/_next/static/chunks/2vy066wng5s6s.js","/demos/mizan/_next/static/chunks/310vm2bl3xxpt.js","/demos/mizan/_next/static/chunks/3qfy96eoyh-ek.js","/demos/mizan/_next/static/chunks/3u-ql0-s115gb.js","/demos/mizan/_next/static/chunks/3x9wm9f6eqp-a.js","/demos/mizan/_next/static/chunks/44hjpbnz1tjpe.js","/demos/mizan/_next/static/chunks/turbopack-0_-dst-_785r2.js","/demos/mizan/_next/static/media/0b60d5f95c5f3f76-s.2e115y8-hourl.woff2","/demos/mizan/_next/static/media/3146272aa7a4924e-s.p.21se6xk6bxqs6.woff2","/demos/mizan/_next/static/media/413d8ff922cbc3a2-s.p.2avnhkksosb5d.woff2","/demos/mizan/_next/static/media/8056169c9d560660-s.p.41rroleoq1br7.woff2","/demos/mizan/_next/static/media/f13113086225013b-s.10ayu6ka6csf1.woff2","/demos/mizan/_next/static/media/f4b234103afdc32a-s.197tvtifbphtu.woff2","/demos/mizan/_next/static/media/favicon.117ezoe8m31dk.ico","/demos/mizan/_not-found/","/demos/mizan/_not-found/__next._full.txt","/demos/mizan/_not-found/__next._not-found.__PAGE__.txt","/demos/mizan/_not-found/__next._tree.txt","/demos/mizan/_not-found/index.txt","/demos/mizan/about/","/demos/mizan/about/__next._full.txt","/demos/mizan/about/__next._tree.txt","/demos/mizan/about/__next.about.__PAGE__.txt","/demos/mizan/about/index.txt","/demos/mizan/coffee/","/demos/mizan/coffee/__next._full.txt","/demos/mizan/coffee/__next._tree.txt","/demos/mizan/coffee/__next.coffee.__PAGE__.txt","/demos/mizan/coffee/index.txt","/demos/mizan/coffees/","/demos/mizan/coffees/__next._full.txt","/demos/mizan/coffees/__next._tree.txt","/demos/mizan/coffees/__next.coffees.__PAGE__.txt","/demos/mizan/coffees/index.txt","/demos/mizan/equipment/","/demos/mizan/equipment/__next._full.txt","/demos/mizan/equipment/__next._tree.txt","/demos/mizan/equipment/__next.equipment.__PAGE__.txt","/demos/mizan/equipment/index.txt","/demos/mizan/favicon.ico","/demos/mizan/file.svg","/demos/mizan/globe.svg","/demos/mizan/icons/apple-touch-icon.png","/demos/mizan/icons/icon-192.png","/demos/mizan/icons/icon-512.png","/demos/mizan/icons/icon-maskable-512.png","/demos/mizan/icons/icon.svg","/demos/mizan/index.txt","/demos/mizan/learn/","/demos/mizan/learn/__next._full.txt","/demos/mizan/learn/__next._tree.txt","/demos/mizan/learn/__next.learn.__PAGE__.txt","/demos/mizan/learn/index.txt","/demos/mizan/manifest.webmanifest","/demos/mizan/next.svg","/demos/mizan/session/","/demos/mizan/session/__next._full.txt","/demos/mizan/session/__next._tree.txt","/demos/mizan/session/__next.session.__PAGE__.txt","/demos/mizan/session/index.txt","/demos/mizan/settings/","/demos/mizan/settings/__next._full.txt","/demos/mizan/settings/__next._tree.txt","/demos/mizan/settings/__next.settings.__PAGE__.txt","/demos/mizan/settings/index.txt","/demos/mizan/setup/","/demos/mizan/setup/__next._full.txt","/demos/mizan/setup/__next._tree.txt","/demos/mizan/setup/__next.setup.__PAGE__.txt","/demos/mizan/setup/index.txt","/demos/mizan/vercel.svg","/demos/mizan/window.svg"];
// URL prefix of the deployed app: "" at the site root, "/demos/mizan" for the demo build.
// scripts/postbuild-sw.mjs replaces the placeholder.
const BASE = "/demos/mizan";
const CACHE = "mizan-" + VERSION;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("mizan-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

async function fromCache(request) {
  const url = new URL(request.url);
  // Query strings (e.g. /session/?mode=quick) never change the exported file.
  let hit = await caches.match(url.pathname, { ignoreSearch: true });
  if (!hit && !url.pathname.endsWith("/") && !/\.[a-z0-9]+$/i.test(url.pathname)) {
    hit = await caches.match(url.pathname + "/", { ignoreSearch: true });
  }
  return hit;
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const hit = await fromCache(req);
      if (hit) return hit;
      try {
        return await fetch(req);
      } catch (err) {
        if (req.mode === "navigate") {
          const shell = await caches.match(BASE + "/");
          if (shell) return shell;
        }
        throw err;
      }
    })(),
  );
});
