import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = React.useState(false);
    const [title, setTitle] = useState('');

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode ?
            <TextField variant={'outlined'}
                       size={'small'}
                       value={title}
                       onChange={onChangeTitleHandler}
                       onBlur={activateViewMode}
                       autoFocus/> :
            <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}

