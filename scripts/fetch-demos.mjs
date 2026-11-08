import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { scanDemo } from './scan-demo.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'demos.config.json'), 'utf8'));

for (const entry of config) {
  const src = path.join(root, 'dist-demos', entry.slug);
  const dest = path.join(root, 'public', 'demos', entry.slug);

  if (!fs.existsSync(src)) {
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
  console.log(`copied ${entry.slug} to public/demos/${entry.slug}`);
}
