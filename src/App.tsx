import { useState } from 'react';
import styles from './App.module.scss';
import Classnames from 'classnames';
import TaskItem from './TaskItem'

function App() {
    const [tasksArray, setTasksArray] = useState(["Buy Milk", "Go Run", "Make Dinner", "Bake Cake"]);
    
    function AddItem (){
        console.log("Add Item")
        // console.log(event.target?.addEventListener)
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
                            <li className={styles['list--item']}>
                                <h3 className={styles['list--added-task']}>{task}</h3>
                                <button className={styles['delete--task-button']}>Delete</button>
                            </li>
                        )
                    }

                    {/* <TaskItem /> */}
                </ul>
                <button className={styles['clear--all-button']} onClick={ClearTasksList}>Clear All</button>
            </div>
            <footer className={styles['footer--task']}>
                <input type="text" className={styles['footer--input']} placeholder="Type your task here"/>
                <button className={Classnames(styles['footer--task'], styles['footer--add-button'])} onClick={AddItem}>Add</button>
            </footer>
        </main>
    );
}

export default App;
