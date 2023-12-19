import { Page  } from "playwright";

export class ToDoList{

    page: Page

    constructor (page: Page) {
        this.page = page;
    }

    async getAllTasks (){
        return await this.page.getByRole('listitem').getByRole('heading').all()
    }

    async getRandomIndex (){
        const maxIndex = (await this.getAllTasks()).length
        console.log(Math.floor(Math.random() * maxIndex))
        
    }

    async getTaskFromList (taskIndex: number) {
        const tasks = await this.getAllTasks() 
        if (taskIndex <= tasks.length){
            return tasks[taskIndex].textContent()
        }
        else{
            console.log(`No such id (${taskIndex}) in the ToDoList`)
            return undefined
        }
    }

    async isTaskInList (task: string){
        console.log(`searching ${task} in the list...`)
        for (const row of await this.getAllTasks())
        {
                if (task === await row.textContent()) {
                console.log (`task: ${task} was found in the list...`)
                return true
            }
        }
        console.log (`task: ${task} is not in the list...`)
        return false
    }

}

