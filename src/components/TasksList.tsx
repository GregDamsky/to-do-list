import React from 'react';
import { ChangeEvent } from 'react';
import styles from '../App.module.scss';
import { Item } from '../types';
import { Button as MaterialButton} from '@mui/material';


function TasksList( props: {item: string, itemsArr: Item[], editedTaskId: number, onDelete: (id: number) => void, onEdit: (id: number) => void, onSave: (id: number, taskToSave: string) => void, clearAll: () => void , typeTextToEdit: (event: ChangeEvent<HTMLInputElement>) => void}) {
        { 
            return (
                <div className={styles.tasks}>
                <ul className={styles['ul--tasks--list']}>
                    {
                        (props.itemsArr.length !== 0)? 
                            props.itemsArr.map((task) =>
                            <li data-task={task.item} className={styles['list--item']} key={task.id}>
                                { props.editedTaskId !== task.id ? 
                                    <>
                                        <h3 data-task-title={task.item} title={task.item} className={styles['list--added-task']} >{task.item}</h3>
                                        <button className={styles['delete--task-button']} onClick={() => props.onDelete(task.id)}>
                                            <img src="../src/icons/delete.png" className={styles['delete--task-button']} height="20px" alt="" />Delete</button>
                                        <button className={styles['edit--task-button']} onClick={() => props.onEdit(task.id)}>    
                                            <img src="../src/icons/edit.png" className={styles['edit--task-button']} height="20px" alt="" />Edit</button>
                                    </>
                                    : 
                                    <>
                                        <input type="text" name="edit-task-text" placeholder={task.item} onChange={props.typeTextToEdit} className={styles['list--added-task']} value={props.item}/>
                                        <button className={styles['delete--task-button']} onClick={() => props.onSave(task.id, props.item)}>
                                            <img src="../src/icons/save.png" className={styles['save--task-button']} height="20px" alt="" />Save</button>
                                        <button className={styles['edit--task-button']} onClick={() => props.onEdit(task.id)}>    
                                            <img src="../src/icons/edit.png" className={styles['edit--task-button']} height="20px" alt="" />Edit</button>
                                    </>
                                    }
                            </li>                             
                        ) : <h3>List is empty!</h3>
                    } 
                </ul>
                <MaterialButton variant="contained" sx={{fontSize:16, width: 350, padding: 1, margin: 1.5, borderRadius: 3}} onClick={props.clearAll} color="error" size="large" disabled={props.itemsArr.length === 0}>Clear All</MaterialButton>
            </div>
            );
        }         
}

export default TasksList