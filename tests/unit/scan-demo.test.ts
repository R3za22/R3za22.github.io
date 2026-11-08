import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { scanDemo } from '../../scripts/scan-demo.mjs';

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
});
