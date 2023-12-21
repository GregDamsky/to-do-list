import { closePage, setupPage } from '../test-kit/setup-page';
import { Browser, BrowserContext, Page } from 'playwright';
import { ToDoList } from '../test-kit/todo-list-driver';
import { assert } from 'console';
import { expect } from 'playwright/test';

describe('My ToDo List Page Tests', () => {
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

    it('Find existing task in the list', async () => {
        const myToDoList = new ToDoList(page)
        const taskRandomIndex = await myToDoList.getRandomIndex(await myToDoList.getNumberOfItemsInList())
        const taskText = await myToDoList.getTaskFromList(taskRandomIndex)
        const {isFound, taskIndex} = await myToDoList.isTaskInList(taskText)
        expect(isFound).toBe(true)

    });

    it('Delete existing task from the list', async () => {       
        
        const taskToRemove = "Bake Cake"

        const myToDoList = new ToDoList(page)
        const itemsInListBeforeDeletion = await myToDoList.getNumberOfItemsInList()
        const { isFound: isFound1, taskIndex: taskIndex1 } = await myToDoList.isTaskInList(taskToRemove)
        expect(isFound1).toBe(true)
        await myToDoList.deleteTaskFromList(taskToRemove)    
        
        //run same test to check if task indeed deleted from the list
        const { isFound: isFound2, taskIndex: taskIndex2 } = await myToDoList.isTaskInList(taskToRemove)
        expect(isFound2).toBe(false)

        const itemsInListAfterDeletion = await myToDoList.getNumberOfItemsInList()
        //number of list items after deletion should decrease by one 
        expect(itemsInListAfterDeletion).toEqual(itemsInListBeforeDeletion - 1)
        
    });

    it('Delete all tasks in the list using directly clear all button', async () => {       
        
        const myToDoList = new ToDoList(page)
        await page.getByRole('button', { name: 'Clear All' }).click();
        expect(await myToDoList.getNumberOfItemsInList()).toBe(0)

    });


    it('Add a randomly generated task to the list', async () => {       
        
        const myToDoList = new ToDoList(page)
        const task = await myToDoList.typeNewTask()
        await page.getByRole('button', { name: 'Add' }).click()
        const { isFound, taskIndex } = await myToDoList.isTaskInList(task)
        expect(isFound).toBe(true)

    });



});
