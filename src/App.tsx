import { ChangeEvent, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import styles from './App.module.scss';
import NewTask from './components/NewTask';
import TasksList from './components/TasksList';

function App() {
    const [tasksArray, setTasksArray] = useState([
        { id: 0, item: 'Buy Milk' },
        { id: 1, item: 'Go Run' },
        { id: 2, item: 'Make Dinner' },
        { id: 3, item: 'Bake Cake' },
    ]);
    const [newTaskItem, setNewTaskItem] = useState('');
    const [editedTaskItem, setEditedTaskItem] = useState('');
    const [editTaskId, setEditTaskId] = useState<number | undefined>();

    function textTyping(event: ChangeEvent<HTMLInputElement>) {
        const { name } = event.target;
        name === 'new-task-text' ? setNewTaskItem(event.target.value) : setEditedTaskItem(event.target.value);
    }

    function clearTyping() {
        setNewTaskItem('');
    }

    function addItem() {
        setTasksArray([...tasksArray, { id: tasksArray.length > 0 ? tasksArray.slice(-1)[0].id + 1 : 0, item: newTaskItem }]);
        setNewTaskItem('');
    }

    function deleteTask(id: number) {
        setTasksArray((prev) => prev.filter((item) => item.id !== id));
    }

    function clearTasksList() {
        setTasksArray([]);
        setEditTaskId(undefined);
    }

    function editTask(id: number) {
        setEditTaskId(id);
    }

    function saveItem(idToSave: number, itemToSave: string) {
        tasksArray.splice(idToSave, 1, { id: idToSave, item: itemToSave });

        setTasksArray([...tasksArray]); // clone
        setEditTaskId(undefined);
        setEditedTaskItem('');
    }

    return (
        <main className={styles.main}>
            <h2 className={styles.title}>My ToDo List</h2>
            <TasksList
                item={editedTaskItem}
                itemsArr={tasksArray}
                editedTaskId={editTaskId}
                onDelete={deleteTask}
                onEdit={editTask}
                typeTextToEdit={textTyping}
                onSave={saveItem}
                clearAll={clearTasksList}
            />
            <NewTask item={newTaskItem} typeText={textTyping} onAdd={addItem} onClear={clearTyping} />
        </main>
    );
}

export default App;
