import { test, expect } from '@playwright/test';

const SITE = 'https://r3za22.github.io';

const ROUTES = [
  '/',
  '/fa/',
  '/work/mangaro',
  '/work/zaboon',
  '/work/aiprofit',
  '/work/profit',
  '/fa/work/mangaro',
  '/fa/work/zaboon',
  '/fa/work/aiprofit',
  '/fa/work/profit',
  '/resume',
  '/fa/resume',
];

const HOME_PAGES = ['/', '/fa/'];

// Canonical and sitemap URLs carry a trailing slash (the build writes directories).
const withSlash = (path: string) => (path.endsWith('/') ? path : `${path}/`);

const RESUME_PAGES = [
  { route: '/resume', pdf: '/resume-en.pdf' },
  { route: '/fa/resume', pdf: '/resume-fa.pdf' },
];

test.describe('resume pages', () => {
  for (const { route, pdf } of RESUME_PAGES) {
    test(`${route} returns 200, links to ${pdf}, and the PDF is served`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator(`a[href="${pdf}"]`).first()).toBeVisible();

      const pdfResponse = await page.request.get(pdf);
      expect(pdfResponse.status()).toBe(200);
      expect(pdfResponse.headers()['content-type']).toContain('pdf');
    });
  }
});

test.describe('404 page', () => {
  test('unknown paths render the 404 page with home and FA links', async ({ page, request }) => {
    const response = await request.get('/definitely-not-here');
    expect(response.status()).toBe(404);

    const navigation = await page.goto('/definitely-not-here');
    expect(navigation?.status()).toBe(404);
    await expect(page.locator('h1')).toHaveText('Page not found');
    await expect(page.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/');
    await expect(page.locator('a.lang')).toHaveAttribute('href', '/fa/');
    await expect(page.locator('main a[href="/fa/"]')).toHaveCount(1);
  });
});

test.describe('SEO head', () => {
  test('titles are non-empty and unique across all routes', async ({ page }) => {
    const titles: string[] = [];
    for (const route of ROUTES) {
      await page.goto(route);
      const title = (await page.title()).trim();
      expect(title, route).not.toBe('');
      titles.push(title);
    }
    expect(new Set(titles).size, titles.join(' | ')).toBe(ROUTES.length);
  });

  for (const route of ROUTES) {
    test(`${route} has one description, absolute canonical and hreflang en/fa`, async ({ page }) => {
      await page.goto(route);

      await expect(page.locator('meta[name="description"]')).toHaveCount(1);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);

      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);
      expect(await canonical.getAttribute('href')).toBe(`${SITE}${withSlash(route)}`);

      for (const lang of ['en', 'fa']) {
        const alternate = page.locator(`link[rel="alternate"][hreflang="${lang}"]`);
        await expect(alternate, `hreflang ${lang}`).toHaveCount(1);
        expect(await alternate.getAttribute('href')).toMatch(/^https:\/\/r3za22\.github\.io\//);
      }

      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        `${SITE}/og.png`,
      );
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
        'content',
        'summary_large_image',
      );
    });
  }

  test('sitemap index lists sitemap-0.xml, which lists all routes', async ({ request }) => {
    const index = await request.get('/sitemap-index.xml');
    expect(index.status()).toBe(200);
    const indexText = await index.text();
    expect(indexText).toContain('sitemap-0.xml');

    const pages = new Set<string>();
    for (const match of indexText.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const sitemap = await request.get(new URL(match[1]).pathname);
      expect(sitemap.status()).toBe(200);
      for (const loc of (await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)) {
        pages.add(loc[1]);
      }
    }

    for (const route of ROUTES) {
      expect(pages, route).toContain(`${SITE}${withSlash(route)}`);
    }
  });

  test('home pages carry Person JSON-LD', async ({ page }) => {
    for (const route of HOME_PAGES) {
      await page.goto(route);
      const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
      const types = blocks.map((block) => JSON.parse(block)['@type']);
      expect(types, route).toContain('Person');
    }
  });

  test('case-study pages have no JSON-LD', async ({ page }) => {
    await page.goto('/work/mangaro');
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
  });

  test('robots.txt is served and names the sitemap', async ({ request }) => {
    const robots = await request.get('/robots.txt');
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain(`${SITE}/sitemap-index.xml`);
  });

  test('og.png is served as an image', async ({ request }) => {
    const og = await request.get('/og.png');
    expect(og.status()).toBe(200);
    expect(og.headers()['content-type']).toContain('image/png');
  });
});
