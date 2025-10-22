import { type Page, type Locator } from '@playwright/test';

export class ReaderPage {
  readonly page: Page;
  readonly readBtn: Locator;
  readonly chapterContent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.readBtn        = page.locator('#optBtn >> a:has-text("点击阅读")');
    //this.chapterContent = page.locator('#readcontent'); // 根据实际章节容器改
    //.book_title > h1:nth-child(1)
    //this.chapterContent = page.getByRole('book_title >> h1:nth-child(1)'); // 根据实际章节容器改
    this.chapterContent = page.locator('.book_title > h1:nth-child(1)');
    //this.chapterContent = page.getByRole('heading', { level: 1 });
  }

  async clickRead() {
    await this.readBtn.click();
    await this.chapterContent.waitFor();
  }

  async getCurrentChapter() {
    return await this.chapterContent.textContent();
  }
}