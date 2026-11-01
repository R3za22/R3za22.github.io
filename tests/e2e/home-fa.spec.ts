import { test, expect } from '@playwright/test';

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 375, height: 812 };

// Copy from src/i18n/ui.ts (fa) and src/data/timeline.fa.json.
const HERO_TITLE = 'توسعه‌دهنده موبایل و فول‌استک';
const FIRST_PERIOD = '۱۴۰۱ — اکنون';
const MILITARY_STATUS = 'وضعیت نظام وظیفه';

test.describe('FA home at 1440x900', () => {
  test.use({ viewport: DESKTOP });

  test('html is rtl and fa', async ({ page }) => {
    await page.goto('/fa/');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
  });

  test('h1 carries the hero title', async ({ page }) => {
    await page.goto('/fa/');
    await expect(page.locator('h1')).toContainText(HERO_TITLE);
  });

  test('$ whoami panel is ltr', async ({ page }) => {
    await page.goto('/fa/');
    await expect(page.locator('[data-whoami]')).toHaveAttribute('dir', 'ltr');
    await expect(page.locator('[data-whoami]')).toContainText('$ whoami');
  });

  test('contact links container is ltr', async ({ page }) => {
    await page.goto('/fa/');
    await expect(page.locator('#contact [data-contact-links]')).toHaveAttribute('dir', 'ltr');
  });

  test('every skills items element is ltr', async ({ page }) => {
    await page.goto('/fa/');
    const items = page.locator('#skills [data-skill-items]');
    await expect(items).toHaveCount(6);
    for (let i = 0; i < 6; i++) {
      await expect(items.nth(i)).toHaveAttribute('dir', 'ltr');
    }
  });

  test('timeline starts with the Persian period and has no ASCII digits', async ({ page }) => {
    await page.goto('/fa/');
    const rows = page.locator('#experience [data-timeline-row]');
    await expect(rows).toHaveCount(5);
    await expect(rows.nth(0).locator('.period')).toHaveText(FIRST_PERIOD);
    for (let i = 0; i < 5; i++) {
      const period = await rows.nth(i).locator('.period').innerText();
      expect(period).not.toMatch(/[0-9]/);
    }
  });

  test('footer shows the military service status', async ({ page }) => {
    await page.goto('/fa/');
    await expect(page.locator('footer')).toContainText(MILITARY_STATUS);
  });

  test('first featured card links to the FA case study', async ({ page }) => {
    await page.goto('/fa/');
    const first = page.locator('#work [data-project]').first();
    await expect(first).toHaveAttribute('data-project', 'mangaro');
    await expect(first.locator('a').first()).toHaveAttribute('href', '/fa/work/mangaro');
  });
});

test.describe('language toggle', () => {
  test.use({ viewport: DESKTOP });

  test('on /fa/ the toggle points to the EN home', async ({ page }) => {
    await page.goto('/fa/');
    await expect(page.locator('header a.lang')).toHaveAttribute('href', '/');
  });

  test('on / the toggle points to the FA home', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header a.lang')).toHaveAttribute('href', '/fa/');
  });
});

test.describe('no horizontal scroll at 375x812', () => {
  test.use({ viewport: MOBILE });

  for (const path of ['/fa/', '/']) {
    test(`${path} fits the viewport`, async ({ page }) => {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});
