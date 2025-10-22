import { type Page, type Locator } from '@playwright/test';

export class BookListPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchBtn: Locator;
  readonly bookTable: Locator;

  constructor(page: Page) {
    this.page = page;
  
    this.searchInput = page.locator('#searchKey');
    this.searchBtn   = page.locator('#btnSearch');
    
    //this.bookTable   = page.locator('#bookList');
    // 第一行 tr 的下标是 0
    this.bookTable=page.locator('#bookList tr').nth(0).locator('td.name ');
  }

  async searchBook(bookName: string) {
    await this.searchInput.fill(bookName);
    await this.searchBtn.click();
    await this.bookTable.waitFor();           // 等列表刷新
  }

  async clickBook(bookName: string) {
    await this.bookTable.locator('a', { hasText: bookName }).click();
    await this.page.waitForLoadState('networkidle');
  }
}