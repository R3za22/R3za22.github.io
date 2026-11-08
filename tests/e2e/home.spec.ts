import { test, expect, type Page, type Locator } from '@playwright/test';

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 375, height: 812 };

async function isAboveFold(locator: Locator, viewportHeight: number) {
  const box = await locator.boundingBox();
  return box !== null && box.y >= 0 && box.y + box.height <= viewportHeight;
}

test.describe('home at 1440x900', () => {
  test.use({ viewport: DESKTOP });

  test('h1 carries the hero title', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Mobile & Full-Stack Developer.');
  });

  test('hero CTAs are visible above the fold', async ({ page }) => {
    await page.goto('/');
    const resume = page.getByRole('link', { name: 'Download resume' });
    const work = page.getByRole('link', { name: 'See my work' });
    await expect(resume).toBeVisible();
    await expect(resume).toHaveAttribute('href', '/resume-en.pdf');
    await expect(work).toBeVisible();
    await expect(work).toHaveAttribute('href', '#work');
    expect(await isAboveFold(resume, DESKTOP.height)).toBe(true);
    expect(await isAboveFold(work, DESKTOP.height)).toBe(true);
  });

  test('selected work lists Mangaro, Zaboon, AIProfit, Profit in order', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('#work [data-project]');
    await expect(cards).toHaveCount(4);
    await expect(cards.nth(0)).toHaveAttribute('data-project', 'mangaro');
    await expect(cards.nth(0).locator('h3')).toHaveText('Mangaro');
    await expect(cards.nth(0)).toContainText('production');
    await expect(cards.nth(1)).toHaveAttribute('data-project', 'zaboon');
    await expect(cards.nth(1).locator('h3')).toHaveText('Zaboon');
    await expect(cards.nth(2)).toHaveAttribute('data-project', 'aiprofit');
    await expect(cards.nth(2).locator('h3')).toHaveText('AIProfit');
    await expect(page.locator('[data-project="aiprofit"]')).toContainText('team');
    await expect(cards.nth(3)).toHaveAttribute('data-project', 'profit');
    await expect(cards.nth(3).locator('h3')).toHaveText('Profit');
  });

  test('more projects lists the non-featured projects', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('#more article[data-project]');
    await expect(cards).toHaveCount(4);
    await expect(page.locator('#more [data-project="mizan"] h3')).toHaveText('Mizan');
    await expect(page.locator('#more [data-project="mizan"]')).toContainText('Persian UI');
    await expect(page.locator('#more [data-project="trapclub"] h3')).toHaveText('TrapClub');
    // The collection name is "ShahContract"; the design heading adds "+ ETH Wallet".
    await expect(page.locator('#more [data-project="shahcontract"] h3')).toContainText('ShahContract');
    await expect(page.locator('#more [data-project="mangaro-factory"] h3')).toHaveText('Mangaro Factory');
  });

  test('Mangaro Factory card links to MangaTranslator', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('[data-project="mangaro-factory"]');
    const link = card.locator('a', { hasText: 'MangaTranslator' });
    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute('href', /^https:\/\//);
  });

  test('a project without a demo has no live demo link', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('[data-project="mangaro-factory"]');
    await expect(card.getByRole('link', { name: /live demo/i })).toHaveCount(0);
  });

  test('skills section has six cards, each with a proof line', async ({ page }) => {
    await page.goto('/');
    const skills = page.locator('#skills [data-skill]');
    await expect(skills).toHaveCount(6);
    for (let i = 0; i < 6; i++) {
      await expect(skills.nth(i).locator('[data-proof]')).toHaveText(/^proof →/);
    }
  });

  test('timeline has five rows and starts with 2022 — now', async ({ page }) => {
    await page.goto('/');
    const rows = page.locator('#experience [data-timeline-row]');
    await expect(rows).toHaveCount(5);
    await expect(rows.nth(0)).toContainText('2022 — now');
  });

  test('contact has the email and GitHub links', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#contact a[href="mailto:rezaghamar20@gmail.com"]')).toHaveCount(1);
    await expect(page.locator('#contact a[href="https://github.com/R3za22"]')).toHaveCount(1);
  });

  test('page ships no inline or external scripts', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('script:not([type="application/ld+json"])')).toHaveCount(0);
  });
});

test.describe('home at 375x812', () => {
  test.use({ viewport: MOBILE });

  test('hero CTAs are visible above the fold', async ({ page }) => {
    await page.goto('/');
    const resume = page.getByRole('link', { name: 'Download resume' });
    const work = page.getByRole('link', { name: 'See my work' });
    await expect(resume).toBeVisible();
    await expect(work).toBeVisible();
    expect(await isAboveFold(resume, MOBILE.height)).toBe(true);
    expect(await isAboveFold(work, MOBILE.height)).toBe(true);
  });

  test('no horizontal scroll', async ({ page }) => {
    await page.goto('/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe('missing screenshot placeholder', () => {
  async function slotAndPlaceholder(page: Page) {
    const card = page.locator('[data-project="mangaro"]');
    const placeholder = card.locator('[data-placeholder]');
    const slot = card.locator('[data-image-slot]');
    await expect(placeholder).toHaveCount(1);
    const [slotBox, placeholderBox] = await Promise.all([slot.boundingBox(), placeholder.boundingBox()]);
    return { slotHeight: slotBox?.height ?? -1, placeholderHeight: placeholderBox?.height ?? -1 };
  }

  test('placeholder fills the image slot at both widths without layout shift', async ({ page }) => {
    await page.goto('/');
    const heights: number[] = [];
    for (const viewport of [DESKTOP, MOBILE]) {
      await page.setViewportSize(viewport);
      const { slotHeight, placeholderHeight } = await slotAndPlaceholder(page);
      expect(slotHeight).toBeGreaterThan(0);
      expect(placeholderHeight).toBe(slotHeight);
      heights.push(slotHeight);
    }
    expect(heights[0]).toBe(heights[1]);
  });
});
