import { ChangeEvent } from 'react';
import styles from '../App.module.scss';
import Classnames from 'classnames';


function NewTask( props: {item: string, onAdd: () => void, typeText: (event: ChangeEvent<HTMLInputElement>) => void}) {
    return (
        <footer className={styles['footer--task']}>
            <input type="text" className={styles['footer--input']} onChange={props.typeText} placeholder="Type your task here" value={props.item}/>
            <button type="button" className={Classnames(styles['footer--task'], styles['footer--add-button'])} onClick={props.onAdd}>Add</button>
        </footer>

    );
}

export default NewTask