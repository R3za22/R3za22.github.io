import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { scanDemo } from './scan-demo.mjs';
import { vendorizeAssets, fixRootAssetRefs } from './vendor-assets.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'demos.config.json'), 'utf8'));

// A ref that is not pushed yet (owner review pending) must not fail the run.
// Returns false only when git positively reports the ref missing; an
// unreachable remote (offline, private repo without a token) counts as unknown.
function refMissing(entry) {
  const token = process.env.DEMOS_READ_TOKEN;
  const auth = token ? `x-access-token:${token}@` : '';
  const r = spawnSync('git', ['ls-remote', '--exit-code', `https://${auth}github.com/${entry.repo}.git`, entry.ref], {
    stdio: 'ignore',
    timeout: 20000,
    env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
  });
  return r.status === 2;
}

for (const entry of config) {
  const src = path.join(root, 'dist-demos', entry.slug);
  const dest = path.join(root, 'public', 'demos', entry.slug);

  if (!fs.existsSync(src)) {
    if (refMissing(entry)) {
      console.log(`::warning::skipping ${entry.slug}: ${entry.repo}@${entry.ref} not found`);
      continue;
    }
    console.log(`skip ${entry.slug}: dist-demos/${entry.slug} not found, keeping existing public/demos copy`);
    continue;
  }

  const findings = scanDemo(src, entry.allowHosts ?? []);
  if (findings.length > 0) {
    for (const f of findings) console.log(`${entry.slug}: ${f.file}  ${f.rule}  ${f.match}`);
    console.log(`blocked ${entry.slug}: ${findings.length} finding(s), not copied`);
    process.exitCode = 1;
    continue;
  }

  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
  vendorizeAssets(dest);
  fixRootAssetRefs(dest, entry.slug);
  console.log(`copied ${entry.slug} to public/demos/${entry.slug}`);
}
