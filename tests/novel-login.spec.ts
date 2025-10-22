import { test, expect } from '@playwright/test';
test('小说站点登录-搜索-阅读',async({page})=>{

    test.setTimeout(60_000)//防超时
    //进入登入
    await page.goto('http://novel.hctestedu.com/user/login.html')

    // ② 填账号、密码、点击登录（用 ID 定位）
    await page.locator('#txtUName').fill('13687300222');
    await page.locator('#txtPassword').fill('123456');
    //await page.locator('#btnLogin').click();
    await page.getByRole('button',{name : '登录'}).click();

    // ③ 等待跳转（网络空闲）
    await page.waitForLoadState('networkidle');

    // ④ 断言：页面包含登录手机号
    //await expect(page.locator('body')).toContainText('13687300222');
     // ② 断言手机号出现（精确到元素，避免整页扫描）
    await expect(page.getByText('13687300222')).toBeVisible();

     // ⑤ 截图留证
    //await page.screenshot({ path: 'output/novel_logged_in.png', fullPage: true });

    //在搜索框输入内容
    await page.locator('#searchKey').fill('娇女攻略');
    //点击搜索按钮
    await page.locator('#btnSearch').click();
    //  等待跳转（网络空闲）
    await page.waitForLoadState('networkidle');

    // 等待列表加载
    //await page.waitForSelector('.table');
    // ④ 等列表+点击第一条含书名卡片
    await page.locator('#bookList >> a:has-text("娇女攻略")').click();

    // 点包含“娇女攻略”的链接/卡片
    //await page.locator('.table-tbody >> name=娇女攻略').click();

    // ③ 跳转到详情页
    //await page.waitForLoadState('networkidle');
    //点击阅读按钮
    //文字+父级组合（语义清晰，推荐）
    //await page.locator('#optBtn >> a:has-text("点击阅读")').click();
    //CSS 类组合（颜色按钮唯一）
    //await page.locator('#optBtn .btn_ora').click();
    // 等待详情页按钮区域出现
    await expect(page.locator('#optBtn')).toBeVisible();

    // 点「点击阅读」
    await page.locator('#optBtn >> a:has-text("点击阅读")').click();
    //断言
    await expect(page.locator('body')).toContainText('第一章 迷香');

    //截图
    await page.screenshot({ path: 'output/reading.png', fullPage: true });

})