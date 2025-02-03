import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from '../App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (todoListID: string, id: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (todoListID: string, title: string) => void
    changeTaskStatus: (todoListID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
}


export const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<null | string>(null);

    const onNewTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter' && e.ctrlKey) {
            props.addTask(props.id, title.trim())
            setTitle('')
        }
    }
    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(props.id, title.trim())
            setTitle('')
        } else {
            setError(' напиши что-нибудь...')
        }
    }
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    return (
        <div>
            <h3> {props.title} <button onClick={removeTodoList}>x</button> </h3>
            <div>
                <input value={title}
                       onChange={onNewTitleHandler}
                       onKeyUp={onKeyUpHandler}
                       className={error ? 'error' : ''}
                       placeholder={error ? error : ''}
                />
                <button onClick={addTask}>+</button>
            </div>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                        const onRemoveHandler = () => props.removeTask(props.id, t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.id, t.id, e.currentTarget.checked)
                        }

                        return (
                            <li key={t.id}
                                className={t.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={onChangeHandler}
                                />
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

