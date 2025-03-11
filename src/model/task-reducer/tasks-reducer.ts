import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';
import {TasksStateType} from '../../app/App';
import {TaskType} from '../../todoList/TodoList';
import {createTodolistAC, deleteTodolistAC} from '../todolist-reducer/todolists-reducer';

const initialState: TasksStateType = {};

export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>('tasks/deleteTask');
export const createTaskAC = createAction('tasks/createTask', (todolistId: string, title: string) => {
    return {
        payload: {
            todolistId,
            title,
            id: nanoid()
        }
    };
});
export const changeTaskStatusAC = createAction<{ todolistId: string, taskId: string, isDone: boolean }>('tasks/changeTaskStatus');
export const changeTaskTitleAC = createAction<{ todolistId: string, taskId: string, title: string }>('tasks/changeTaskTitle');

export const tasksReducer = createReducer(
    initialState, builder => {
        builder
            .addCase(deleteTodolistAC, (state, action) => {
                delete state[action.payload.id];
            })
            .addCase(createTodolistAC, (state, action) => {
                state[action.payload.id] = [];
            })
            .addCase(deleteTaskAC, (state, action) => {
                const {todolistId, taskId} = action.payload;
                const tasks = state[todolistId];
                const taskIndex = tasks.findIndex(task => task.id === taskId);
                if (taskIndex !== -1) {
                    tasks.splice(taskIndex, 1);
                }
            })
            .addCase(createTaskAC, (state, action) => {
                const {todolistId, title, id} = action.payload;
                const newTask: TaskType = {
                    id,
                    title,
                    isDone: false
                };
                if (state[todolistId]) {
                    state[todolistId].unshift(newTask);
                }
            })
            .addCase(changeTaskStatusAC, (state, action) => {
                const {todolistId, taskId, isDone} = action.payload;
                const tasks = state[todolistId];
                const task = tasks.find(t => t.id === taskId);
                if (task) {
                    task.isDone = isDone;
                }
            })
            .addCase(changeTaskTitleAC, (state, action) => {
                const {todolistId, taskId, title} = action.payload;
                const tasks = state[todolistId];
                const task = tasks.find(t => t.id === taskId);
                if (task) {
                    task.title = title;
                }
            });
    }
);
