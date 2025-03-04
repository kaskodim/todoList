import {TasksStateType} from '../../App';
import {v1} from 'uuid';
import {AddTodolistAT, RemoveTodolistAT} from '../todolist-reducer/todolists-reducer';

export type removeTaskAT = {
    type: 'REMOVE_TASK'
    payload: {
        todolistId: string
        taskId: string
    }
}
export type addTaskAT = {
    type: 'ADD_TASK'
    payload: {
        todolistId: string
        title: string
    }
}
export type changeStatusTaskAT = {
    type: 'CHANGE_STATUS_TASK'
    payload: {
        todolistId: string,
        taskId: string,
        isDone: boolean
    }
}
export type changeTitleTaskAT = {
    type: 'CHANGE_TITlE_TASK'
    payload: {
        todolistId: string
        taskId: string
        title: string
    }
}

type ActionsType =
    | removeTaskAT
    | addTaskAT
    | changeStatusTaskAT
    | changeTitleTaskAT
    | AddTodolistAT
    | RemoveTodolistAT

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.payload.todolistId];
            stateCopy[action.payload.todolistId] = tasks.filter(t => t.id !== action.payload.taskId)
            return stateCopy
        }
        case 'ADD_TASK': {
            const stateCopy = {...state}
            const newTask = {id: v1(), title: action.payload.title, isDone: false};
            const tasks = stateCopy[action.payload.todolistId];
            stateCopy[action.payload.todolistId] = [newTask, ...tasks];
            return stateCopy
        }
        case 'CHANGE_STATUS_TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.payload.todolistId];

            const task = tasks.find(t => t.id === action.payload.taskId)
            if (task) {
                task.isDone = action.payload.isDone
            }
            return {...stateCopy}
        }
        case 'CHANGE_TITlE_TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.payload.todolistId];
            const task = tasks.find(t => t.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.title
            }
            return stateCopy
        }
        case 'ADD_TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.payload.todolistId] = []

            return stateCopy
        }
        case 'REMOVE_TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return stateCopy

        }
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): removeTaskAT => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            todolistId,
            taskId
        }
    }
}
export const addTaskAC = (todolistId: string, title: string): addTaskAT => {
    return {
        type: 'ADD_TASK',
        payload: {
            todolistId,
            title
        }
    }
}
export const changeStatusTaskAC = (todolistId: string, taskId: string, isDone: boolean): changeStatusTaskAT => {
    return {
        type: 'CHANGE_STATUS_TASK',
        payload: {
            todolistId,
            taskId,
            isDone
        }
    }
}
export const changeTitleTaskAC = (todolistId: string, taskId: string, title: string): changeTitleTaskAT => {
    return {
        type: 'CHANGE_TITlE_TASK',
        payload: {
            todolistId,
            taskId,
            title
        }
    }
}