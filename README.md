# novel-auto

基于 Playwright 的自动化测试项目，支持多浏览器并行、失败重试、Allure 报告。

---

## 环境要求

- Node.js ≥ 18
- npm ≥ 8
- Java ≥ 11（生成 Allure 报告）

## 一键运行

```bash
# 1. 安装依赖
npm ci

# 2. 执行测试
npx playwright test books-data-driven.spec.ts

# 3. 查看报告
npx allure generate output/allure -o allure-report --clean
npx allure open allure-report        # 若 Windows 报错，改用 python -m http.server 8080