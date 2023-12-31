import { Locator, Page } from 'playwright';
import { generateRandomSentence } from './helpers';

export class ToDoList {
    constructor(private page: Page) {}

    async getAllListItems() {
        return this.page.getByRole('listitem').all();
    }

    async getAllListItemTitles() {
        return this.page.locator('[data-task-title]').allTextContents();
    }

    async getTaskLocatorByTitle(title: string) {
        return this.page.locator(`[data-task="${title}"]`);
    }

    async getLocatorsByRole(listItems: Locator[], role: 'heading' | 'button') {
        return listItems.map((listItem) => listItem.getByRole(role));
    }

    async getNumberOfItemsInList() {
        return (await this.getAllListItems()).length;
    }

    async getTaskFromListByIndex(taskIndex: number) {
        const taskTitle = await this.page
            .getByRole('listitem')
            .getByRole('heading')
            .nth(taskIndex)
            .textContent();

        if (!taskTitle) {
            throw new Error(`No such id (${taskIndex}) in ToDoList`);
        }

        return taskTitle;
    }

    async getTaskIndexFromList(task: string) {
        const titles = await this.getAllListItemTitles();
        return titles.indexOf(task);
    }

    async isTaskInList(task: string) {
        console.log(`searching ${task} in the list...`);
        const titles = await this.getAllListItemTitles();
        const isFound = titles.includes(task);
        isFound
            ? console.log(`task: ${task} was found in the list...`)
            : console.log(`task: ${task} is not in the list...`);
        return isFound;
    }

    async deleteTaskFromList(task: string) {
        if (!(await this.isTaskInList(task))) {
            throw new Error(`Couldn't find task: "${task}" in list... No tasks to delete`);
        }

        const mytask = await this.getTaskLocatorByTitle(task);
        console.log(`deleting task: ${task}`);
        const deleteButton = mytask.locator('button', { hasText: 'Delete' });
        await deleteButton.click();
        console.log(`Task: ${task} successfully deleted`);
    }

    async addTask(task: string) {
        console.log(`Adding a new task "${task}" to the list`);
        await this.page.getByPlaceholder('Type your task here').fill(task);
    }

    async generateTask() {
        console.log('I\'m using a "funny generator" to generate an auto generated task to add...');
        const task = generateRandomSentence();
        this.addTask(task);
        return task;
    }
}
