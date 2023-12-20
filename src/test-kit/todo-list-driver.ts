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

    async getRandomIndex (){
        const maxIndex = (await this.getAllListItems()).length
        return Math.floor(Math.random() * maxIndex)
        
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
        if ( task !== undefined && task !== null) {
            console.log(`searching ${task} in the list...`)
            for (const row of await this.getDataByElementWithinListItems(this.getAllListItems(), 'heading'))
            {
                if (task === await (await row).textContent()) {
                    console.log (`task: ${task} was found in the list...`)
                    return true
                }
            }
            console.log (`task: ${task} is not in the list...`)
            return false
        }
        else {
            console.log (`task: ${task} is not of type string`)
            return false
        }
    }

}

