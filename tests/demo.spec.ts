import { test, expect } from '@playwright/test';
test('已登录-直接进首页', async ({ page }) => {
  
  await page.goto('http://novel.hctestedu.com/index.html');

  await expect(page.getByText('13687300222')).toBeVisible();
});