import { after } from 'mocha';
import { Browser, BrowserContext, Page } from 'playwright';
import { expect, test } from 'playwright/test';
import { buttonActions } from '../test-kit/helpers';
import { closePage, setupPage } from '../test-kit/setup-page';
import { ToDoList } from '../test-kit/todo-list-driver';

describe('My ToDo List Page Tests', () => {
    let page: Page, context: BrowserContext, browser: Browser;
    let myToDoList: ToDoList;
    const myInitialArrayOfTasks = ['Buy Milk', 'Go Run', 'Make Dinner', 'Bake Cake'];

    before(async function () {
        const { page: newPage, context: newContext, browser: newBrowser } = await setupPage();
        page = newPage;
        context = newContext;
        browser = newBrowser;
    });

    beforeEach(async () => {
        page = await context.newPage();
        myToDoList = new ToDoList(page);
        await page.goto('localhost:3000');
    });

    afterEach(async () => {
        await page.close();
    });

    after(async () => {
        await closePage(context, browser);
    });

    it('has all existing items in the list', async () => {
        expect(await myToDoList.getAllListItemTitles()).toStrictEqual(myInitialArrayOfTasks);
    });

    it('deletes task from the list', async () => {
        const taskToRemove = 'Bake Cake';
        const itemsInListBeforeDeletion = await myToDoList.getNumberOfItemsInList();
        if (!(await myToDoList.isTaskInList(taskToRemove))) {
            console.log(`task ${taskToRemove} not found in the list, nothing to remove!`);
            test.fail();
        }
        await myToDoList.performActionOnTaskFromList(buttonActions.delete, taskToRemove);
        expect(await myToDoList.isTaskInList(taskToRemove), `task ${taskToRemove} was not expected in the list, although it still exists`).toBe(false);
        const itemsInListAfterDeletion = await myToDoList.getNumberOfItemsInList();
        expect(itemsInListAfterDeletion).toEqual(itemsInListBeforeDeletion - 1);
    });

    it('deletes all tasks in the list using the "clear all" button', async () => {
        await myToDoList.clickOnButton(buttonActions.clearAll);
        expect(await myToDoList.getNumberOfItemsInList(), '').toBe(0);
    });

    it('adds a predefined task to the list', async () => {
        const taskToAdd = 'Travel to a new country';
        await myToDoList.addTask(taskToAdd);
        await myToDoList.clickOnButton(buttonActions.add);
        const isFound = await myToDoList.isTaskInList(taskToAdd);
        expect(isFound).toBe(true);
    });

    it('adds a randomly generated task to the list', async () => {
        const task = await myToDoList.generateTask();
        await myToDoList.clickOnButton(buttonActions.add);
        const isFound = await myToDoList.isTaskInList(task);
        expect(isFound).toBe(true);
    });

    it('edits task in the list', async () => {
        const taskToEdit = 'Make Dinner';
        const taskAfterEdit = 'Make My Favorite Breakfast';
        await myToDoList.performActionOnTaskFromList(buttonActions.edit, taskToEdit);
        await myToDoList.performActionOnTaskFromList(buttonActions.save, taskToEdit, taskAfterEdit);
        const editedArrayOfTasks = myInitialArrayOfTasks.map((x) => x.replace(taskToEdit, taskAfterEdit));
        expect(await myToDoList.getAllListItemTitles()).toStrictEqual(editedArrayOfTasks);
    });
});
