import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly userInput: Locator;
  readonly pwdInput: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userInput = page.locator('#txtUName');
    this.pwdInput  = page.locator('#txtPassword');
    this.loginBtn  = page.locator('#btnLogin');
  }

  async goto() {
    await this.page.goto('http://novel.hctestedu.com/user/login.html');
  }

  async login(username: string, password: string) {
    await this.userInput.fill(username);
    await this.pwdInput.fill(password);
    await this.loginBtn.click();
    // 等待跳转（特征 URL 或元素）
    //await this.page.waitForURL('**/');
    // ✅ 等跳转 + 元素出现（确保 Session 有效）
    //await this.page.waitForURL('http://novel.hctestedu.com/');
   // await expect(this.page.getByText(username)).toBeVisible({ timeout: 15000 });
  }
  //可选：给 LoginPage 加个「快速检查」方法
  async isLoggedIn(): Promise<boolean> {
  return await this.page.getByText('13687300222').isVisible();
}
}