import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<null | string>(null);

    const onNewTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter' && e.ctrlKey) {
            props.addItem(title.trim())
            setTitle('')
        }
    }
    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError(' напиши что-нибудь...')
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={onNewTitleHandler}
                   onKeyUp={onKeyUpHandler}
                   className={error ? 'error' : ''}
                   placeholder={error ? error : ''}
            />
            <button onClick={addTask}>+</button>
        </div>
    );
};