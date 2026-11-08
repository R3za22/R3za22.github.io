import { test, expect } from '@playwright/test';
import fs from 'node:fs';

// Demos are copied into public/demos by scripts/fetch-demos.mjs (gitignored),
// so the page checks only run where those copies exist.
const config = JSON.parse(fs.readFileSync('demos.config.json', 'utf8')) as { slug: string }[];
const present = config.map((c) => c.slug).filter((slug) => fs.existsSync(`public/demos/${slug}/index.html`));

// Project card slug -> demo slug.
const CARDS: Record<string, string> = {
  mizan: 'mizan', zaboon: 'zaboon', mangaro: 'mangaro', aiprofit: 'aiprofit', profit: 'profit-app', trapclub: 'trapclub',
  shahcontract: 'shahnameh', 'sofia-shop': 'sofia-shop', 'tic-tac-toe': 'tic-tac-toe',
  evently: 'evently', 'employee-manager': 'employee-manager', foodapp: 'foodapp',
};

test.describe('demo routes', () => {
  for (const slug of present) {
    test(`/demos/${slug}/ and no-slash variant load`, async ({ page }) => {
      const a = await page.goto(`/demos/${slug}/`);
      expect(a?.status()).toBe(200);
      const b = await page.goto(`/demos/${slug}`);
      expect(b?.status()).toBe(200);
    });
  }
});

test.describe('demo links on cards', () => {
  for (const [card, demo] of Object.entries(CARDS)) {
    for (const [path, label] of [['/', 'Live demo ↗'], ['/fa/', 'دموی زنده ↗']] as const) {
      const built = present.includes(demo);
      test(`${path} ${card} ${built ? 'links to' : 'hides missing'} /demos/${demo}/`, async ({ page }) => {
        await page.goto(path);
        const link = page.locator(`[data-project="${card}"] a[href="/demos/${demo}/"]`);
        // A demo the build did not produce must not render as a broken link.
        await expect(link).toHaveCount(built ? 1 : 0);
        if (built) await expect(link).toHaveText(label);
      });
    }
  }

  test('profit card also links to the admin demo when it was built', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('[data-project="profit"] a[href="/demos/profit-admin/"]');
    await expect(link).toHaveCount(present.includes('profit-admin') ? 1 : 0);
  });

  test('early work is a separate list', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#early h3')).toHaveText('Early work');
    await expect(page.locator('#early [data-project]')).toHaveCount(5);
    await page.goto('/fa/');
    await expect(page.locator('#early h3')).toHaveText('کارهای اولیه');
  });

  test('aiprofit case study shows four screenshots and the note', async ({ page }) => {
    await page.goto('/work/aiprofit');
    await expect(page.locator('[data-media] img')).toHaveCount(4);
    await expect(page.locator('.demo-note')).toHaveText('Persian UI · static snapshot');
  });
});
