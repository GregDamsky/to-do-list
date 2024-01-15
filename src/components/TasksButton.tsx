interface TasksButtonProps {
    buttonStyle: string;
    onClick: () => void;
    iconSrc: string;
    iconStyle: string;
    buttonText: string;
}

function TasksButton(props: TasksButtonProps) {
    return (
        <button className={props.buttonStyle} onClick={props.onClick}>
            <img src={props.iconSrc} className={props.iconStyle} />
            {props.buttonText}
        </button>
    );
}

export default TasksButton;
