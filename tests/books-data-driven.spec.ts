import { test, expect } from '@playwright/test';
import { readYaml } from '../utils/yaml-reader';
import { LoginPage } from '../pages/LoginPage';
import { BookListPage } from '../pages/BookListPage';
import { ReaderPage } from '../pages/ReaderPage';

// ① 读 YAML（10 组数据）
const books = readYaml<{ book: string; expect_chapter: string }[]>('data/books.yml');

// ② 循环跑 10 次，每本书独立测试
for (const { book, expect_chapter } of books) {
  test(`登录→搜索→阅读《${book}》`, async ({ page }, testInfo) => {
    test.setTimeout(60_000);

    const bookList = new BookListPage(page);
    const reader = new ReaderPage(page);

    // 登录
    await page.goto('http://novel.hctestedu.com');
    

    // 搜索 & 点书
    await bookList.searchBook(book);
    await bookList.clickBook(book);

    // 阅读
    await reader.clickRead();
    await expect(reader.chapterContent).toContainText(expect_chapter);

    // 每本书独立截图（文件名带书名）
    const safeName = book.replace(/[/\\:?*"<>|]/g, '_');
    await page.screenshot({ path: `output/${safeName}.png`, fullPage: true });
  });
}