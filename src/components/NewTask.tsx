import { ChangeEvent } from 'react';
import styles from '../App.module.scss';
import Classnames from 'classnames';
import { Button as SemanticButton} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function NewTask( props: {item: string, onAdd: () => void, onClear: () => void, typeText: (event: ChangeEvent<HTMLInputElement>) => void}) {
    return (
        <footer className={styles['footer--task']}>
            <input type="text" className={styles['footer--input']} onChange={props.typeText} placeholder="Type your task here" value={props.item}/>
            {props.item !== "" ? 
            <SemanticButton.Group>
                <SemanticButton positive onClick={props.onAdd}>Add Task</SemanticButton>
                <SemanticButton.Or />
                <SemanticButton negative onClick={props.onClear}>Clear</SemanticButton>
            </SemanticButton.Group>
            :
            <SemanticButton.Group>
                <SemanticButton basic gray disabled>Add Task</SemanticButton>
                <SemanticButton.name/>
                <SemanticButton basic gray disabled>Clear</SemanticButton>
            </SemanticButton.Group>}
        </footer>
    );
}

export default NewTask