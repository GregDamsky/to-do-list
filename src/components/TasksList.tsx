import { ChangeEvent } from 'react';
import styles from './TaskList.module.scss';
import { TaskItem } from '../types';
import { Button as MaterialButton } from '@mui/material';
import TasksButton from './TasksButton';

interface TasksListProps {
    item: string;
    itemsArr: TaskItem[];
    editedTaskId?: number;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
    onSave: (id: number, taskToSave: string) => void;
    clearAll: () => void;
    handleTextToEdit: (event: ChangeEvent<HTMLInputElement>) => void;
}

function TasksList(props: TasksListProps) {
    {
        return (
            <div className={styles.tasks}>
                <ul className={styles['ul--tasks--list']}>
                    {props.itemsArr.length !== 0 ? (
                        props.itemsArr.map((task) => (
                            <li data-task={task.item} className={styles['list--item']} key={task.id}>
                                {props.editedTaskId !== task.id ? (
                                    <>
                                        <h3 data-task-title={task.item} title={task.item} className={styles['list--added-task']}>
                                            {task.item}
                                        </h3>
                                        <TasksButton
                                            buttonStyle={styles['delete--task-button']}
                                            onClick={() => props.onDelete(task.id)}
                                            iconSrc="../src/icons/delete.png"
                                            iconStyle={styles['icon--task-button']}
                                            buttonText="Delete"
                                        ></TasksButton>
                                        <TasksButton
                                            buttonStyle={styles['edit--task-button']}
                                            onClick={() => props.onEdit(task.id)}
                                            iconSrc="../src/icons/edit.png"
                                            iconStyle={styles['icon--task-button']}
                                            buttonText="Edit"
                                        ></TasksButton>
                                    </>
                                ) : (
                                    <>
                                        <input type="text" name="edit-task-text" placeholder={task.item} onChange={props.handleTextToEdit} className={styles['list--added-task']} value={props.item} />
                                        <TasksButton
                                            buttonStyle={styles['save--task-button']}
                                            onClick={() => props.onSave(task.id, props.item)}
                                            iconSrc="../src/icons/save.png"
                                            iconStyle={styles['icon--task-button']}
                                            buttonText="Save"
                                        ></TasksButton>
                                        <TasksButton
                                            buttonStyle={styles['edit--task-button']}
                                            onClick={() => props.onEdit(task.id)}
                                            iconSrc="../src/icons/edit.png"
                                            iconStyle={styles['icon--task-button']}
                                            buttonText="Edit"
                                        ></TasksButton>
                                    </>
                                )}
                            </li>
                        ))
                    ) : (
                        <h3>List is empty!</h3>
                    )}
                </ul>
                <MaterialButton
                    variant="contained"
                    sx={{ fontSize: 16, width: 350, padding: 1, margin: 1.5, borderRadius: 3 }}
                    onClick={props.clearAll}
                    color="error"
                    size="large"
                    disabled={props.itemsArr.length === 0}
                >
                    Clear All
                </MaterialButton>
            </div>
        );
    }
}

export default TasksList;
