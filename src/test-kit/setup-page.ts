import { Browser, BrowserContext, chromium } from 'playwright';

export async function setupPage() {
    const browser = await chromium.launch({headless: false, timeout: 30_000});
    const context = await browser.newContext();
    const page = await context.newPage();


    return {page, context, browser}
}

export async function closePage(context: BrowserContext , browser: Browser) {
    await context.close()
    await browser.close()
}
