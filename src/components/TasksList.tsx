import React from 'react';
import styles from '../App.module.scss';
import { Item } from '../types';


function TasksList( props: {items: Item[], onDelete: (id: number) => void, clearAll: () => void}) {
        { 
            return (
                <div className={styles.tasks}>
                <ul className={styles['ul--tasks--list']}>
                    {
                        (props.items.length !== 0)? 
                            props.items.map((task) =>
                            <li data-task={task.item} className={styles['list--item']} key={task.id}>
                                <h3 data-task-title={task.item} title={task.item} className={styles['list--added-task']} >{task.item}</h3>
                                <button className={styles['delete--task-button']} onClick={() => props.onDelete(task.id)}>
                                    <img src="../src/icons/delete.png" className={styles['delete--task-button']} height="20px" alt="" />Delete</button>
                            </li>                             
                        ) : <h3>List is empty!</h3>
                    } 
                </ul>
                <button className={styles['clear--all-button']} onClick={props.clearAll}>Clear All</button>
            </div>
            );
        }         
}

export default TasksList