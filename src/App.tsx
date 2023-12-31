import { ChangeEvent, useState } from 'react';
import styles from './App.module.scss';
import TasksList from './components/TasksList';
import NewTask from './components/NewTask';



function App() {
    const [tasksArray, setTasksArray] = useState([{ id: 0, item: "Buy Milk" }, { id: 1, item: "Go Run" }, { id: 2, item: "Make Dinner" }, { id: 3, item: "Bake Cake" }]);
    const [newTaskItem, setNewTaskItem] = useState('')

    function textTyping(event: ChangeEvent<HTMLInputElement>) {
        setNewTaskItem(event.target.value)
    }

    function clearTyping(){
        setNewTaskItem("")
    }

    function addItem() {
        setTasksArray([...tasksArray, { id: (tasksArray.length > 0 ) ? tasksArray.slice(-1)[0].id + 1 : 0, item: newTaskItem }])
        setNewTaskItem("")
     }

    function deleteTask(id: number) {
        const newTasksArray = tasksArray.filter((item) => item.id !== id)
        setTasksArray(newTasksArray)
    }

    function clearTasksList() {
        setTasksArray([])
    }

    return (
        <main className={styles.main}>
            <h2 className={styles.title}>My ToDo List</h2>
            <TasksList items={tasksArray} onDelete={deleteTask} clearAll={clearTasksList} />
            <NewTask item={newTaskItem} typeText={textTyping} onAdd={addItem} onClear={clearTyping} />
        </main>
    );
}

export default App;

