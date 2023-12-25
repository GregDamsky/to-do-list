import { Locator, Page } from 'playwright';
import { generateRandomSentence } from './helpers';

export class ToDoList {
    constructor(private page: Page) {}

    async getAllListItems() {
        return this.page.getByRole('listitem').all();
    }

    async getAllListItemTitles() {
        return this.page.locator('.list--added-task').allTextContents();
    }

    async getTaskLocatorByTitle(title: string) {
        const taskIndex = await this.getTaskIndexFromList(title);
        return this.page.getByRole('listitem').nth(taskIndex);
    }

    async getLocatorsByRole(listItems: Locator[], role: 'heading' | 'button') {
        return listItems.map((listItem) => listItem.getByRole(role));
    }

    async getNumberOfItemsInList() {
        return (await this.getAllListItems()).length;
    }

    async getTaskFromListByIndex(taskIndex: number) {
        const tasks = await this.getLocatorsByRole(await this.getAllListItems(), 'heading');
        if (taskIndex <= tasks.length)
            return this.page
                .getByRole('listitem')
                .getByRole('heading')
                .nth(taskIndex)
                .textContent();
        else {
            console.log(`No such id (${taskIndex}) in ToDoList`);
            return '';
        }
    }

    async getTaskIndexFromList(task: string) {
        const titles = await this.getAllListItemTitles();
        return titles.indexOf(task) ? titles.indexOf(task) : -1;
    }

    async isTaskListEqualsArrayItems(arr: string[]) {
        let isIdentical = true;
        if ((await this.getNumberOfItemsInList()) !== arr.length) {
            isIdentical = false;
            console.log(
                "Amount of items in array isn't identical to amount of items in the task list"
            );
        }
        for (const item of arr) {
            if (!(await this.isTaskInList(item))) {
                isIdentical = false;
                console.log(`Item "${item}" isn't part of the task list`);
                break;
            }
        }
        return isIdentical;
    }

    async isTaskInList(task: string) {
        // console.log(`searching ${task} in the list...`);
        // const titles = await this.getAllListItemTitles();
        // const isFound = titles.includes(task);
        // isFound
        //     ? console.log(`task: ${task} was found in the list...`)
        //     : console.log(`task: ${task} is not in the list...`);
        // return isFound;

        let isFound = false;
        if (task !== undefined && task !== null) {
            for (const row of await this.getLocatorsByRole(
                await this.getAllListItems(),
                'heading'
            )) {
                if (task === (await row.textContent())) {
                    console.log(`task: ${task} was found in the list...`);
                    isFound = true;
                    return isFound;
                }
            }
            console.log(`task: ${task} is not in the list...`);
            return isFound;
        } else {
            console.log(`task: ${task} is not of type string`);
            return isFound;
        }
    }

    async deleteTaskFromList(task?: string) {
        if (task === undefined) task = '';
        const isFound = await this.isTaskInList(task);
        if (isFound) {
            const mytask = await this.getTaskLocatorByTitle(task);
            console.log(`deleting task: ${task}`);
            const deleteButton = mytask.locator('button');
            await deleteButton.click();
            console.log(`Task: ${task} successfully deleted`);
        } else console.log(`Couldn't find task: "${task}" in list... No tasks to delete`);
    }

    async addTask(task?: string) {
        console.log(`Adding a new task "${task}" to the list`);
        await this.page.getByPlaceholder('Type your task here').fill(`${task}`);
    }

    async generateTask() {
        console.log('I\'m using a "funny generator" to generate an auto generated task to add...');
        const task = generateRandomSentence();
        this.addTask(task);
        return task;
    }
}
