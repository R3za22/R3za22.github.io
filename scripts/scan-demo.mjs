import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const EXTENSIONS = new Set(['.html', '.js', '.css', '.json', '.txt', '.map', '.webmanifest']);
const ENV_LINE = /^[A-Z][A-Z0-9_]{2,}=\S+/gm;
const PRIVATE_KEY = /-----BEGIN [A-Z ]*PRIVATE KEY-----/g;
const TOKENS = [/sk_live_[0-9A-Za-z]+/g, /AKIA[0-9A-Z]{16}/g, /AIza[0-9A-Za-z_-]{35}/g];
// Only plausible hostnames (a dotted name or localhost). Fragments such as
// `https://${host}` or a lone `http://a@b` in library code are not hosts.
const URL_RE = /https?:\/\/((?:[a-z0-9-]+\.)+[a-z0-9-]+|localhost)(?![a-z0-9.-])/gi;
const URL_TEXT_RE = /https?:\/\/[^\s"'<>]*/gi;

// Library and documentation hosts that appear as plain strings in bundled
// framework code (never requested at runtime). Matches the host or a subdomain.
export const DEFAULT_ALLOW_HOSTS = [
  'rezaghamar.ir', 'r3za22.github.io', 'w3.org', 'react.dev', 'reactjs.org', 'nextjs.org', 'reactrouter.com', 'redux.js.org',
  'redux-toolkit.js.org', 'tailwindcss.com', 'github.com', 'bit.ly', 'tinyurl.com',
  'reactnavigation.org', 'expo.dev', 'docs.expo.dev', 'feross.org', 'unpkg.com',
  'cdn.jsdelivr.net', 'dev.to', 'fonts.googleapis.com', 'typekit.net', 'localhost',
];

const isAllowed = (host, allow) => allow.some((a) => host === a || host.endsWith(`.${a}`));

const redact = (value) => `${value.slice(0, 4)}***`;

function scanText(text, allow) {
  const found = [];

  for (const m of text.matchAll(ENV_LINE)) {
    const name = m[0].slice(0, m[0].indexOf('='));
    found.push({ rule: 'env-line', raw: name, match: `${name}=***` });
  }

  for (const m of text.matchAll(PRIVATE_KEY)) {
    found.push({ rule: 'private-key', raw: m[0], match: m[0] });
  }

  for (const re of TOKENS) {
    for (const m of text.matchAll(re)) {
      found.push({ rule: 'secret', raw: m[0], match: redact(m[0]) });
    }
  }

  // A bare liara.run only counts when it is outside an http(s) URL; URLs are
  // already reported by the host rule.
  const outsideUrls = text.replace(URL_TEXT_RE, ' ');
  for (const m of outsideUrls.matchAll(/liara\.run/gi)) {
    found.push({ rule: 'secret', raw: m[0], match: redact(m[0]) });
  }

  for (const m of text.matchAll(URL_RE)) {
    const host = m[1].toLowerCase();
    if (!isAllowed(host, allow)) found.push({ rule: 'host', raw: host, match: host });
  }

  return found;
}

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.isFile() && EXTENSIONS.has(path.extname(entry.name).toLowerCase())) files.push(full);
  }
  return files.sort();
}

export function scanDemo(dir, allowHosts = []) {
  const allow = [...DEFAULT_ALLOW_HOSTS, ...allowHosts].map((h) => h.toLowerCase());
  const findings = [];

  for (const full of walk(dir)) {
    const file = path.relative(dir, full).split(path.sep).join('/');
    const text = fs.readFileSync(full, 'utf8');
    const seen = new Set();
    for (const hit of scanText(text, allow)) {
      const key = `${hit.rule}\u0000${hit.raw}`;
      if (seen.has(key)) continue;
      seen.add(key);
      findings.push({ file, rule: hit.rule, match: hit.match });
    }
  }

  return findings;
}

const isMain = process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  const args = process.argv.slice(2);
  const [dir] = args;
  const allowIdx = args.indexOf('--allow');
  const allow = allowIdx >= 0 ? (args[allowIdx + 1] ?? '').split(',').filter(Boolean) : [];

  if (!dir) {
    console.error('usage: node scripts/scan-demo.mjs <dir> [--allow host,host]');
    process.exit(2);
  }

  const findings = scanDemo(dir, allow);
  if (findings.length === 0) {
    console.log('scan clean');
  } else {
    for (const f of findings) console.log(`${f.file}  ${f.rule}  ${f.match}`);
    process.exitCode = 1;
  }
}
