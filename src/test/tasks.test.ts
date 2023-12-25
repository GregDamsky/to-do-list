import { closePage, setupPage } from '../test-kit/setup-page';
import { Browser, BrowserContext, Page } from 'playwright';
import { ToDoList } from '../test-kit/todo-list-driver';
import { test, expect } from 'playwright/test';
import { after } from 'mocha';
import { getRandomIndex } from '../test-kit/helpers';

describe('My ToDo List Page Tests', () => {
    let page: Page, context: BrowserContext, browser: Browser;

    before(async function () {
        const { page: newPage, context: newContext, browser: newBrowser } = await setupPage();
        page = newPage;
        context = newContext;
        browser = newBrowser;
    });

    beforeEach(async () => {
        page = await context.newPage();
        await page.goto('localhost:3000');
    });

    afterEach(async () => {
        await page.close();
    });

    after(async () => {
        await closePage(context, browser);
    });

    it('has all items in the list', async () => {
        const myToDoList = new ToDoList(page);
        const myFullArrayOfTasks = ['Bake Cake', 'Buy Milk', 'Make Dinner', 'Go Run'];
        const myPartialArrayOfTasks = ['Bake Cake', 'Go Run'];
        const myArrayOfPartiallyDiffTasks = ['Bake Cake', 'Sell Milk', 'Eat Dinner', 'Go Run'];
        expect(await myToDoList.isTaskListEqualsArrayItems(myPartialArrayOfTasks)).toBe(false);
        expect(await myToDoList.isTaskListEqualsArrayItems(myArrayOfPartiallyDiffTasks)).toBe(
            false
        );
        expect(await myToDoList.isTaskListEqualsArrayItems(myFullArrayOfTasks)).toBe(true);
    });

    it('deletes predefined task from the list', async () => {
        const taskToRemove = 'Bake Cake';

        const myToDoList = new ToDoList(page);
        const itemsInListBeforeDeletion = await myToDoList.getNumberOfItemsInList();
        const isFound1 = await myToDoList.isTaskInList(taskToRemove);
        if (isFound1) {
            await myToDoList.deleteTaskFromList(taskToRemove);

            // expect(getAllItemsTitles).to.not.include(taskToRemove);

            //run same test to check if task indeed deleted from the list
            const isFound2 = await myToDoList.isTaskInList(taskToRemove);
            expect(
                isFound2,
                `task ${taskToRemove} was not expected in the list, although it still exists`
            ).toBe(false);

            const itemsInListAfterDeletion = await myToDoList.getNumberOfItemsInList();
            //number of list items after deletion should decrease by one
            expect(itemsInListAfterDeletion).toEqual(itemsInListBeforeDeletion - 1);
        } else {
            console.log(`task ${taskToRemove} not found in the list, nothing to remove!`);
            test.fail();
        }
    });

    it('deletes all tasks in the list using the "clear all" button', async () => {
        const myToDoList = new ToDoList(page);
        await page.getByRole('button', { name: 'Clear All' }).click();
        expect(await myToDoList.getNumberOfItemsInList(), '').toBe(0);
    });

    it('adds a predefined task to the list', async () => {
        const taskToAdd = 'Travel to a new country';

        const myToDoList = new ToDoList(page);
        await myToDoList.addTask(taskToAdd);
        await page.getByRole('button', { name: 'Add' }).click();
        const isFound = await myToDoList.isTaskInList(taskToAdd);
        expect(isFound).toBe(true);
    });

    it('adds a randomly generated task to the list', async () => {
        const myToDoList = new ToDoList(page);
        const task = await myToDoList.generateTask();
        await page.getByRole('button', { name: 'Add' }).click();
        const isFound = await myToDoList.isTaskInList(task);
        expect(isFound).toBe(true);
    });
});
