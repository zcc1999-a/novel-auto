import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://novel.hctestedu.com/user/login.html');
  await page.locator('#txtUName').fill('13687300222');
  await page.locator('#txtPassword').fill('123456');
  await page.locator('#btnLogin').click();
  await page.waitForURL('**/');
  // 就是把浏览器当前“登录状态”导出成文件，后续测试直接复用，实现「一次登录，终身免登」！
  //取当前浏览器上下文（一个浏览器实例，所有页签共享 cookies）
  await page.context().storageState({ path: 'output/auth.json' });
  await browser.close();
}
export default globalSetup;