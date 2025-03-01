import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../App';
import {AddItemForm} from '../addItemForm/AddItemForm';
import {EditableSpan} from '../editableSpan/EditableSpan';
import {Box, Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import {containerSx, getListItemSx} from './TodoList.styles'

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
    changeTaskTitle: (todoListID: string, taskId: string, newTitle: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}


export const TodoList = (props: TodoListPropsType) => {

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle}/>

                <IconButton onClick={removeTodoList}>
                    <DeleteIcon/>
                </IconButton>

            </h3>
            <AddItemForm addItem={addTask}/>
            <Box sx={containerSx}>
                <Button variant={props.filter === 'all' ? 'contained' : 'outlined'}
                        color={'primary'}
                        size={'small'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={props.filter === 'active' ? 'contained' : 'outlined'}
                        color={'primary'}
                        size={'small'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                        color={'primary'}
                        size={'small'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </Box>
            <List>
                {
                    props.tasks.map((t) => {
                        const onRemoveHandler = () => props.removeTask(props.id, t.id)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.id, t.id, e.currentTarget.checked)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(props.id, t.id, newValue)
                        }

                        return (
                            <ListItem key={t.id}
                                      sx={getListItemSx(t.isDone)}>
                                <div>
                                    <Checkbox checked={t.isDone} onChange={onChangeStatusHandler}/>
                                    <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                </div>

                                <IconButton onClick={onRemoveHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        )
                    })
                }
            </List>
        </div>
    );
};


