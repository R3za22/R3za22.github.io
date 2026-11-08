import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { availableDemo } from '../../src/lib/demos';

describe('availableDemo', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'demos-'));
  fs.mkdirSync(path.join(root, 'public/demos/mizan'), { recursive: true });
  fs.writeFileSync(path.join(root, 'public/demos/mizan/index.html'), '<!doctype html>');

  it('keeps a demo whose build exists', () => {
    expect(availableDemo('/demos/mizan/', root)).toBe('/demos/mizan/');
    expect(availableDemo('/demos/mizan', root)).toBe('/demos/mizan');
  });
  it('drops a demo whose build is missing', () => {
    expect(availableDemo('/demos/zaboon/', root)).toBeUndefined();
  });
  it('passes through external links and undefined', () => {
    expect(availableDemo('https://example.org/app', root)).toBe('https://example.org/app');
    expect(availableDemo(undefined, root)).toBeUndefined();
  });
});
