import fs from 'node:fs';
import path from 'node:path';

// A demo link is shown only when that demo's built files exist at build time,
// so a demo the deploy could not build never renders as a broken link.
export function availableDemo(href: string | undefined, root: string = process.cwd()): string | undefined {
  if (!href) return undefined;
  if (!href.startsWith('/demos/')) return href;
  const dir = href.replace(/^\/+/, '').replace(/\/?$/, '/');
  return fs.existsSync(path.join(root, 'public', dir, 'index.html')) ? href : undefined;
}
