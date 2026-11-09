// Expo exports bundled font/icon files under `assets/node_modules/...`. Some hosting
// pipelines drop any directory literally named `node_modules`, which left those
// fonts 404 on the live demos (blank Profit app). Rename it to `assets/vendor` and
// rewrite the references in text files. Returns the number of rewritten text files.
import fs from 'node:fs';
import path from 'node:path';

const TEXT = /\.(js|html|css|json|map)$/;

export function vendorizeAssets(dir) {
  const assets = path.join(dir, 'assets');
  const from = path.join(assets, 'node_modules');
  if (fs.existsSync(from)) {
    const to = path.join(assets, 'vendor');
    fs.rmSync(to, { recursive: true, force: true });
    fs.renameSync(from, to);
  }
  if (!fs.existsSync(path.join(assets, 'vendor'))) return 0;
  let changed = 0;
  const walk = (d) => {
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f);
      if (fs.statSync(p).isDirectory()) { walk(p); continue; }
      if (!TEXT.test(f)) continue;
      const t = fs.readFileSync(p, 'utf8');
      const n = t.replaceAll('assets/node_modules/', 'assets/vendor/');
      if (n !== t) { fs.writeFileSync(p, n); changed++; }
    }
  };
  walk(dir);
  return changed;
}

// Some demo CSS points at fonts that Vite emitted under `assets/`, but the URL is
// written at the demo root (`/demos/<slug>/<file>`), so it 404s. Rewrite those
// references to the real `assets/<file>` path when the file exists there.
export function fixRootAssetRefs(dir, slug) {
  const assets = path.join(dir, 'assets');
  if (!fs.existsSync(assets)) return 0;
  const have = new Set(fs.readdirSync(assets).filter((f) => fs.statSync(path.join(assets, f)).isFile()));
  let changed = 0;
  const re = new RegExp(`/demos/${slug}/([^"'()\\s/]+)`, 'g');
  const walk = (d) => {
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f);
      if (fs.statSync(p).isDirectory()) { walk(p); continue; }
      if (!TEXT.test(f)) continue;
      const t = fs.readFileSync(p, 'utf8');
      const n = t
        .replace(re, (m, name) => (have.has(name) ? `/demos/${slug}/assets/${name}` : m))
        .replace(/url\(\.\/([^)"'\s/]+)\)/g, (m, name) => (have.has(name) ? `url(./assets/${name})` : m));
      if (n !== t) { fs.writeFileSync(p, n); changed++; }
    }
  };
  walk(dir);
  return changed;
}
