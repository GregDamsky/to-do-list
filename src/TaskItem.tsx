import React from 'react';
import styles from './App.module.scss';


function TaskItem() {
    return (
        <div>
            <li className={styles['list--item']}>
                <h3 className={styles['list--added-task']}>Coming From TaskItem File</h3>
                <button className={styles['delete--task-button']}>Delete</button>
            </li>
        </div>
    );
}

export default TaskItem