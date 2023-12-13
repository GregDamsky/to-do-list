import { ChangeEvent, useState } from 'react';
import styles from './App.module.scss';
import TasksList from './components/TasksList';
import { Item } from './types';
import NewTask from './components/NewTask';



function App() {
    const [tasksArray, setTasksArray] = useState([{ id: 0, item: "Buy Milk" }, { id: 1, item: "Go Run" }, { id: 2, item: "Make Dinner" }, { id: 3, item: "Bake Cake" }]);
    const [newTaskItem, setNewTaskItem] = useState('')

    function TextTyping(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setNewTaskItem(event.target.value)
    }

    function AddItem() {
        setTasksArray([...tasksArray, { id: tasksArray.slice(-1)[0].id + 1, item: newTaskItem }])
        setNewTaskItem("")
    }

    function DeleteTask(id: number) {
        const newTasksArray = tasksArray.filter((item) =>  item.id !== id) 
        setTasksArray(newTasksArray)
    }

    function ClearTasksList() {
        setTasksArray([])
    }

    return (
         <main>
             <h2 className={styles.title}>My ToDo List</h2>
             <TasksList items={tasksArray} onDetele={DeleteTask} clearAll={ClearTasksList} />

             <NewTask item={newTaskItem} typeText={TextTyping} onAdd={AddItem}/>
            
        </main>
    );
}

export default App;

