import { describe, it, expect } from 'vitest';
import { alternatePath } from '../../src/i18n/paths';
import { toPersianDigits } from '../../src/i18n/digits';
import { ui } from '../../src/i18n/ui';

const routes = new Set(['/', '/fa/', '/work/mangaro', '/fa/work/mangaro']);

describe('alternatePath', () => {
  it('maps an EN route to its FA twin', () => {
    expect(alternatePath('/work/mangaro', routes)).toBe('/fa/work/mangaro');
  });

  it('maps an FA route to its EN twin', () => {
    expect(alternatePath('/fa/', routes)).toBe('/');
  });

  it('maps the EN home to the FA home', () => {
    expect(alternatePath('/', routes)).toBe('/fa/');
  });

  it('falls back to the FA home when the EN route has no twin', () => {
    expect(alternatePath('/404', routes)).toBe('/fa/');
  });

  it('falls back to the EN home when the FA route has no twin', () => {
    expect(alternatePath('/fa/404', routes)).toBe('/');
  });
});

describe('toPersianDigits', () => {
  it('converts ASCII digits and keeps the rest of the string', () => {
    expect(toPersianDigits('2022 — now')).toBe('۲۰۲۲ — now');
  });
});

describe('ui dictionary', () => {
  it('has the same keys in en and fa', () => {
    expect(Object.keys(ui.fa).sort()).toEqual(Object.keys(ui.en).sort());
  });
});
