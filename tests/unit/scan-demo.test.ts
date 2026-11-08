import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { scanDemo, DEFAULT_ALLOW_HOSTS } from '../../scripts/scan-demo.mjs';

const fixtures = fileURLToPath(new URL('../fixtures/scan', import.meta.url));

describe('scanDemo', () => {
  it('returns no findings for a clean demo', () => {
    expect(scanDemo(path.join(fixtures, 'clean'))).toEqual([]);
  });

  it('reports exactly the three planted issues in the leaky demo', () => {
    const findings = scanDemo(path.join(fixtures, 'leaky'));
    expect(findings).toHaveLength(3);
    expect(findings.map((f) => f.rule).sort()).toEqual(['env-line', 'host', 'private-key']);
  });

  it('redacts env values so only the name is printed', () => {
    const envFinding = scanDemo(path.join(fixtures, 'leaky')).find((f) => f.rule === 'env-line');
    expect(envFinding?.match).toBe('DATABASE_URL=***');
  });

  it('lets hosts in the allowlist pass', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'scan-demo-'));
    fs.writeFileSync(
      path.join(dir, 'index.html'),
      '<link rel="stylesheet" href="https://fonts.example/a.css">',
    );
    try {
      expect(scanDemo(dir, ['fonts.example'])).toEqual([]);
      expect(scanDemo(dir)).toHaveLength(1);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it('passes default library hosts and their subdomains but still blocks deploy hosts', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'scan-demo-'));
    try {
      expect(DEFAULT_ALLOW_HOSTS).toContain('react.dev');
      fs.writeFileSync(
        path.join(dir, 'a.js'),
        'x="https://www.w3.org/2000/svg";y="https://react.dev/errors/1";z="http://localhost:3000/"',
      );
      expect(scanDemo(dir)).toEqual([]);
      fs.writeFileSync(path.join(dir, 'b.js'), 'a="https://app.liara.run/x";b="https://site.vercel.app/y";c="https://evilw3.org/"');
      expect(scanDemo(dir).map((f) => f.match).sort()).toEqual(['app.liara.run', 'evilw3.org', 'site.vercel.app']);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});
