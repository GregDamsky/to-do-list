import { Locator, Page  } from "playwright";

export class ToDoList{

    page: Page

    constructor (page: Page) {
        this.page = page;
    }

    async getAllListItems() {
        return await this.page.getByRole('listitem').all();
    }
    
    async getDataByElementWithinListItems(listItems: Promise<Locator[]>, element?: string) {
        switch(element !== '') { 
            case (element === 'heading'): { 
                return (await listItems).map(async (listItem) => {
                    return listItem.getByRole('heading');
                });
                break; 
            }
            case (element === 'button'): { 
                return (await listItems).map(async (listItem) => {
                    return listItem.getByRole('button');
                });
                break; 
            }  
            default: { 
               console.log(`Unknown element ${element} to locate in the list`)
               return listItems 
               break; 
            } 
         }
    }

    async getNumberOfItemsInList()
    {
        let maxIndex = (await this.getAllListItems()).length
        if (maxIndex >= 0) return maxIndex
        else {
            console.log("Given list is empty")
            return maxIndex = -1
        } 
    }

    async getRandomIndex (maxIndex: number){
        
        if (maxIndex > -1) { 
            return Math.floor(Math.random() * maxIndex)
        }
        console.log(`Wrong value range for random index ${maxIndex}`)
        return maxIndex
        
    }

    async getTaskFromList (taskIndex: number) {
        const tasks = await this.getDataByElementWithinListItems(this.getAllListItems(), 'heading') 
        if (taskIndex <= tasks.length){
            const task = await tasks[taskIndex];
            return await (task.textContent())
        }
        else{
            console.log(`No such id (${taskIndex}) in the ToDoList`)
            return undefined
        }
    }

    async isTaskInList (task: string | null | undefined){
        let isFound = false
        let taskIndex = -1;
        if ( task !== undefined && task !== null) {
            console.log(`searching ${task} in the list...`)
            taskIndex = 0
            for (const row of await this.getDataByElementWithinListItems(this.getAllListItems(), 'heading'))
            {
                if (task === await (await row).textContent()) {
                    console.log (`task: ${task} was found in the list...`)
                    isFound = true
                    return {isFound, taskIndex}
                }
                taskIndex += 1; 
            }
            taskIndex = -1
            console.log (`task: ${task} is not in the list...`)
            return {isFound, taskIndex}
        }
        else {
            console.log (`task: ${task} is not of type string`)
            return {isFound, taskIndex}
        }
    }

    async deleteTaskFromList (task?: string | null | undefined) {
        if (task === "" || task === null || task === undefined) {
            console.log ("No task is selected... Thus we'll be randomizing a task to delete")
            const taskIndexToDelete = await this.getRandomIndex(await this.getNumberOfItemsInList())
            task = await this.getTaskFromList(taskIndexToDelete)
        }
        const {isFound, taskIndex} = await this.isTaskInList(task)
        if (isFound) {
            console.log(`Deleteing task: ${task}`)
            const allDeleteButtons = await this.getDataByElementWithinListItems(this.getAllListItems(), 'button')
            await (await allDeleteButtons[taskIndex]).getByText("Delete").click()
            console.log(`Task: ${task} successfully deleted`)
        }
        else {
            console.log(`Couldn't find task: ${task} in list... No tasks to delete`)
        }
    }

}

