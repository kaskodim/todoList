import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'

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
            <TextField label="Enter a title"
                       variant="outlined"
                       size={'small'}
                       className={error ? 'error' : ''}
                       value={title}
                       onChange={onNewTitleHandler}
                       onKeyUp={onKeyUpHandler}
                       error={!!error}
                       helperText={error}
            />

            <IconButton onClick={addTask} color={'primary'}>
                <AddBoxIcon/>
            </IconButton>
        </div>
    );
};