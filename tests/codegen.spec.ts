import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic');
  await expect(page.locator('h1')).toContainText('Interactive Playwright Sandbox Basic');
  await page.getByTestId('single-click-btn').click();
  await expect(page.getByTestId('single-click-status')).toContainText('Single click completed.');
  await page.getByTestId('double-click-btn').dblclick();
  await expect(page.getByTestId('double-click-status')).toContainText('Double click completed wrong.');
});


// console.log()
// debug
// pause()
// vs code
// trace viewer