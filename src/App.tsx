import { ChangeEvent, useState } from 'react';
import styles from './App.module.scss';
import Classnames from 'classnames';
import TaskItem from './TaskItem'

function App() {
    const [tasksArray, setTasksArray] = useState([{id: 0, item: "Buy Milk"}, {id: 1, item: "Go Run"}, {id: 2, item: "Make Dinner"}, {id: 3, item: "Bake Cake"}]);
    const [newTaskItem, setNewTaskItem] = useState('')
    
    function TextTyping (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setNewTaskItem(event.target.value)
    }


    function AddItem() {
        console.log(newTaskItem)
        setTasksArray([...tasksArray, {id: tasksArray.length, item: newTaskItem}])
        setNewTaskItem("")
    }

    function DeleteTask(task) {
        const newTasksArray = tasksArray.filter((item) => { item.id != task.id })
        console.log(newTasksArray)
    }

    function ClearTasksList () {
        console.log("Emptying tasks list")
        setTasksArray([])
    }

    return (
        <main>
            <h2 className={styles.title}>My ToDo List</h2>
            <div className={styles.tasks}>
                <ul className={styles['ul--tasks--list']}>
                    {
                        tasksArray.map((task) =>
                            <li className={styles['list--item']} key={task.id}>
                                <h3 className={styles['list--added-task']}>{task.item}</h3>
                                <button className={styles['delete--task-button']} onClick={() => DeleteTask(task)}>Delete</button>
                            </li>
                        )
                    }

                    {/* <TaskItem /> */}
                </ul>
                <button className={styles['clear--all-button']} onClick={ClearTasksList}>Clear All</button>
            </div>
            <footer className={styles['footer--task']}>
                <input type="text" className={styles['footer--input']} onChange={TextTyping} placeholder="Type your task here" value={newTaskItem}/>
                <button type="button" className={Classnames(styles['footer--task'], styles['footer--add-button'])} onClick={AddItem}>Add</button>
            </footer>
        </main>
    );
}

export default App;
