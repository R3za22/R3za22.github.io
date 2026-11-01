import { test, expect } from '@playwright/test';

const SYSTEM_FALLBACK = /system-ui, sans-serif$/;

test('en home 200 and ltr', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
});

test('fa home 200 and rtl', async ({ page }) => {
  const response = await page.goto('/fa/');
  expect(response?.status()).toBe(200);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
});

test('font stacks fall back', async ({ page }) => {
  await page.goto('/');
  const en = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
  expect(en).toMatch(SYSTEM_FALLBACK);

  await page.goto('/fa/');
  const fa = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
  expect(fa).toMatch(SYSTEM_FALLBACK);
});

test('no google fonts request', async ({ page }) => {
  const hosts: string[] = [];
  page.on('request', (request) => hosts.push(new URL(request.url()).hostname));
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  expect(hosts.filter((host) => host === 'fonts.googleapis.com')).toEqual([]);
});
