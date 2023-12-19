import { closePage, setupPage } from '../test-kit/setup-page';
import { Browser, BrowserContext, Page } from 'playwright';
import { ToDoList } from '../test-kit/todo-list-driver';
import { assert } from 'console';
import { expect } from 'playwright/test';

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

    it('find existing task in the list', async () => {

        const myToDoList = new ToDoList(page)
        const taskIndex = await myToDoList.getRandomIndex()
        const taskText = await myToDoList.getTaskFromList(taskIndex)
        expect(await myToDoList.isTaskInList(taskText)).toBe(true)

    });
});
