import { useState } from 'react';
import styles from './App.module.scss';
import Classnames from 'classnames';

function App() {
    const [count, setCount] = useState(0);

    return (
        <main>
            <h2 className={styles.title}>My ToDo List</h2>
            <div className={styles.tasks}>
                <ul className={styles['ul--tasks--list']}>
                    <li className={styles['list--item']}>
                        <h3 className={styles['list--added-task']}>Task 1</h3>
                        <button className={styles['delete--task-button']}>Delete</button>
                    </li>
                    <li className={styles['list--item']}>
                        <h3 className={styles['list--added-task']}>Task 2</h3>
                        <button className={styles['delete--task-button']}>Delete</button>
                    </li>
                    <li className={styles['list--item']}>
                        <h3 className={styles['list--added-task']}>Task 3</h3>
                        <button className={styles['delete--task-button']}>Delete</button>
                    </li>
                </ul>
                <button className={styles['clear--all-button']}>Clear All</button>
            </div>
            <footer className={styles['footer--task']}>
                <input className={styles['footer--input']} placeholder="Type your task here"/>
                <button className={Classnames(styles['footer--task'], styles['footer--add-button'])}>Add</button>
            </footer>
        </main>
    );
}

export default App;
