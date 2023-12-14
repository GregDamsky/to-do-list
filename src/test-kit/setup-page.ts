import { Browser, BrowserContext, Page, chromium } from 'playwright';

export async function setupPage() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://localhost:5173');
    
    return {page, context, browser}
}

export async function closePage(page: Page, context: BrowserContext , browser: Browser) {
    await page.close()
    await context.close()
    await browser.close()
}
