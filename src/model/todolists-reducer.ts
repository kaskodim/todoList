import {FilterValuesType, TodoListsType} from '../App';
import {v1} from 'uuid';

type RemoveTodolistAT = {
    type: 'REMOVE_TODOLIST',
    payload: {
        id: string,
    },
}
type AddTodolistAT = {
    type: 'ADD_TODOLIST',
    payload: {
        title: string,
    },
}
type ChangeTitleTodolistAT = {
    type: 'CHANGE_TITLE_TODOLIST',
    payload: {
        id: string,
        title: string,
    },
}
type ChangeFilterTodolistAT = {
    type: 'CHANGE_FILTER_TODOLIST',
    payload: {
        id: string,
        filter: FilterValuesType,
    }
}

type ActionsType =
    | RemoveTodolistAT
    | AddTodolistAT
    | ChangeTitleTodolistAT
    | ChangeFilterTodolistAT

export const todolistsReducer = (state: TodoListsType[],
                                 action: ActionsType): TodoListsType[] => {

    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            const copyState = [...state]
            return copyState.filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD_TODOLIST': {
            return [...state, {
                id: v1(),
                title: action.payload.title,
                filter: 'all',
            }]
        }
        case 'CHANGE_TITLE_TODOLIST': {
            const copyState = [...state]
            const todoList = copyState.find(tl => tl.id === action.payload.id)
            if (todoList) {
                todoList.title = action.payload.title
            }
            return [...state]
        }
        case 'CHANGE_FILTER_TODOLIST': {
            const copyState = [...state]
            const totoList = copyState.find(tl => tl.id === action.payload.id)
            if (totoList) {
                totoList.filter = action.payload.filter
            }
            return [...state]
        }
        default:
            return state
    }
}

export const removeTodolistAC = (id: string): RemoveTodolistAT => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            id,
        }
    }
}
export const addTodolistAC = (title: string): AddTodolistAT => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            title,
        }
    }
}
export const changeTitleTodolistAC = (id: string, title: string): ChangeTitleTodolistAT => {
    return {
        type: 'CHANGE_TITLE_TODOLIST',
        payload: {
            id,
            title,
        }
    }
}
export const changeFilterTodolistAC = (id: string, filter: FilterValuesType): ChangeFilterTodolistAT => {
    return {
        type: 'CHANGE_FILTER_TODOLIST',
        payload: {
            id,
            filter,
        }
    }
}