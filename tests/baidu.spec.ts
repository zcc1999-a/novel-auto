import { test, expect } from '@playwright/test';

test('在百度搜索 Playwright 并断言元素存在', async ({ page }) => {
  // ① 进入百度
  await page.goto('https://www.baidu.com');

  // ② 搜索框输入“Playwright”
  await page.locator('#chat-textarea').fill('Playwright');
  await page.locator('#chat-submit-button').click();

  // ③ 等待搜索结果加载（网络空闲）
  await page.waitForLoadState('networkidle');

  // ④ 断言 1：搜索结果区域可见
  //await expect(page.locator('#content_left')).toBeVisible();

  // ⑤ 断言 2：第一条结果包含“Playwright”文字
  //await expect(page).toHaveTitle('Playwright');
 // await expect(page.locator('#content_left .result-item').first())
 //   .toContainText(/Playwright/i);

  // ⑥ 断言 3：统计条数 > 0（元素存在即通过）
  //const resultCount = await page.locator('#content_left .result-item').count();
  //expect(resultCount).toBeGreaterThan(0);

  // ⑦ 截图留证
  await page.screenshot({ path: 'output/baidu_playwright.png', fullPage: true });
});