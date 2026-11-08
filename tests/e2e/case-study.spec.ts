import { test, expect, type Page } from '@playwright/test';

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 375, height: 812 };

const EN_ROUTES = ['/work/mangaro', '/work/zaboon', '/work/aiprofit', '/work/profit'];
const FA_ROUTES = ['/fa/work/mangaro', '/fa/work/zaboon', '/fa/work/aiprofit', '/fa/work/profit'];
const ALL_ROUTES = [...EN_ROUTES, ...FA_ROUTES];

const SECTION_LABELS = [
  '01 / overview',
  '02 / architecture',
  '03 / key decisions',
  '04 / result',
  '05 / stack',
];

async function horizontalOverflow(page: Page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
}

test.describe('case study routes', () => {
  for (const route of ALL_ROUTES) {
    test(`${route} returns 200`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
    });
  }

  for (const route of FA_ROUTES) {
    test(`${route} is rtl`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
      await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
    });
  }

  for (const route of EN_ROUTES) {
    test(`${route} ships no scripts`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator('script:not([type="application/ld+json"])')).toHaveCount(0);
    });
  }
});

test.describe('mangaro case study at 1440x900', () => {
  test.use({ viewport: DESKTOP });

  test('status line says production', async ({ page }) => {
    await page.goto('/work/mangaro');
    await expect(page.locator('[data-status]')).toContainText('production');
  });

  test('facts bar has four items', async ({ page }) => {
    await page.goto('/work/mangaro');
    await expect(page.locator('[data-fact]')).toHaveCount(4);
  });

  test('two screenshot frames for mangaro', async ({ page }) => {
    await page.goto('/work/mangaro');
    await expect(page.locator('[data-phone-frame]')).toHaveCount(2);
  });

  test('section labels appear in order', async ({ page }) => {
    await page.goto('/work/mangaro');
    await expect(page.locator('[data-section-label]')).toHaveText(SECTION_LABELS);
  });

  test('architecture shows the three nodes', async ({ page }) => {
    await page.goto('/work/mangaro');
    const diagram = page.locator('[data-architecture]');
    await expect(diagram).toContainText('Android app');
    await expect(diagram).toContainText('Django REST API');
    await expect(diagram).toContainText('PostgreSQL + media');
  });

  test('next link goes to zaboon', async ({ page }) => {
    await page.goto('/work/mangaro');
    await expect(page.locator('[data-next]')).toHaveAttribute('href', '/work/zaboon');
  });

  test('fa next link goes to fa zaboon', async ({ page }) => {
    await page.goto('/fa/work/mangaro');
    await expect(page.locator('[data-next]')).toHaveAttribute('href', '/fa/work/zaboon');
  });

  test('home "Read case study" resolves to the mangaro case study', async ({ page }) => {
    await page.goto('/');
    const link = page.getByRole('link', { name: 'Read case study' });
    await expect(link).toHaveAttribute('href', '/work/mangaro');
    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().endsWith('/work/mangaro') && r.request().isNavigationRequest()),
      link.click(),
    ]);
    expect(response.status()).toBe(200);
    await expect(page).toHaveURL(/\/work\/mangaro$/);
  });
});

test.describe('aiprofit case study', () => {
  test.use({ viewport: DESKTOP });

  test('is a solo product, not labelled team project', async ({ page }) => {
    await page.goto('/work/aiprofit');
    await expect(page.locator('[data-status]')).not.toContainText('team project');
  });
});

test.describe('profit case study', () => {
  test.use({ viewport: DESKTOP });

  test('credits the backend author and is labelled team work', async ({ page }) => {
    await page.goto('/work/profit');
    await expect(page.locator('[data-status]')).toContainText('team project');
    await expect(page.getByRole('link', { name: /Ali Sabet Imani/ })).toHaveAttribute(
      'href',
      'https://github.com/Ali1375SI',
    );
    await page.goto('/fa/work/profit');
    await expect(page.locator('[data-status]')).toContainText('پروژه تیمی');
  });
});

test.describe('case study at 375x812', () => {
  test.use({ viewport: MOBILE });

  for (const route of ALL_ROUTES) {
    test(`${route} has no horizontal scroll`, async ({ page }) => {
      await page.goto(route);
      expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
    });
  }
});
