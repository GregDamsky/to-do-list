import { closePage, setupPage } from '../test-kit/setup-page';
import { Browser, BrowserContext, Page } from 'playwright';

describe('name of the suite', () => {
    let page: Page, context: BrowserContext, browser: Browser;

    before(async function () {
        const { page: newPage, context: newContext, browser: newBrowser} = await setupPage();
        page = newPage;
        context = newContext;
        browser = newBrowser;
    });

    beforeEach(async () => {
        await page.goto('localhost:3000');
    });

    afterEach(async () => {
        await page.close();
    });

    after(async () => {
        await closePage(context, browser);
    });

    it('name of the test', async () => {
        console.log('hello');

    });
});
