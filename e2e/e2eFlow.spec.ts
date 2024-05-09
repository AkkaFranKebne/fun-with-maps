import { chromium, test, expect } from '@playwright/test';

test('opens and closes menu', async ({ page }) => {
  await page.goto('http://localhost:5173/'); // @todo use variable
  await expect(page).toHaveTitle('Vite + React + TS');
  await expect(page.getByText('Check our locations:')).toBeVisible();
  await expect(page.getByTestId('close')).toBeVisible();
  await page.getByTestId('close').click();
  await expect(page.getByRole('caption', { name: 'Check our locations:' })).toBeHidden();
  await expect(page.getByTestId('open')).toBeVisible();
  await page.getByTestId('open').click();
  await expect(page.getByRole('caption', { name: 'Check our locations:' })).toBeHidden();
});

test('opens and closes popup', async ({ page }) => {
  await page.goto('http://localhost:5173/'); // @todo use variable
  await expect(page.getByTestId('map-point-1')).toBeVisible();
  await page.getByTestId('map-point-1').click();
  await expect(page.locator('H_ib_body')).toBeVisible();
  await expect(page.locator('H_ib_close H_btn')).toBeVisible();
  await expect(page.locator('H_ib_content')).toBeVisible();
  await expect(page.locator('H_ib_content')).toHaveText('11, Framnesvegur, Vesturbær, Reykjavik, Capital Region, 101, Iceland');
  await page.locator('H_ib_close H_btn').click();
  await expect(page.locator('H_ib_body')).toBeHidden();
});
