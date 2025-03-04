import {TasksStateType, TodoListsType} from '../App';
import {addTodolistAC, todolistsReducer} from './todolist-reducer/todolists-reducer';
import {tasksReducer} from './task-reducer/tasks-reducer';

test("ids should be equals", () => {
    const startTasksState: TasksStateType = {}
    const startTodolistState: TodoListsType[] = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistState = todolistsReducer(startTodolistState,action )

    const keys =Object.keys(endTasksState)
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistState[0].id;

    expect(idFromTasks).toBe(action.payload.todolistId)
    expect(idFromTodolists).toBe(action.payload.todolistId)
})