import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../../App';
import {addTodolistAC, removeTodolistAC} from '../todolist-reducer/todolists-reducer';


// 1.  старт для всех тестов
let startState: TasksStateType;

beforeEach(() => {
    startState = {
        'todoListId1': [
            {id: '1', title: 'CSS&HTML', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
        ],
        'todoListId2': [
            {id: '1', title: 'Terminator', isDone: true},
            {id: '2', title: 'xxx', isDone: true},
            {id: '3', title: 'Terminator2', isDone: false},
        ]
    }
})


test('correct task deletion', () => {
// действие
    const action = removeTaskAC('todoListId2', '2')
    const endState = tasksReducer(startState, action)

// проверка
    expect(endState['todoListId1'].length).toBe(4)
    expect(endState['todoListId2'].length).toBe(2)
    expect(endState['todoListId2'].every((t) => t.id !== '2')).toBeTruthy()
    expect(endState['todoListId2'][0].id).toBe('1')
    expect(endState['todoListId2'][1].id).toBe('3')
})
test('adding a task correctly', () => {
// действие
    const action = addTaskAC('todoListId2', 'new title task')
    const endState = tasksReducer(startState, action)

// проверка
    expect(endState['todoListId1'].length).toBe(4)

    expect(endState['todoListId2'].length).toBe(4)
    expect(endState['todoListId2'][0].id).toBeDefined()
    expect(endState['todoListId2'][0].title).toBe('new title task')
    expect(endState['todoListId2'][0].isDone).toBeFalsy()

})
test('adding the task status correctly', () => {
// действие
    const action = changeStatusTaskAC('todoListId1', '3', true)
    const endState = tasksReducer(startState, action)

// проверка
    expect(endState['todoListId1'].length).toBe(4)
    expect(endState['todoListId1'][2].isDone).toBeTruthy()
    expect(endState['todoListId1'][2].id).toBe('3')
    expect(endState['todoListId1'][2].title).toBe('React')

    expect(endState['todoListId2'].length).toBe(3)
    expect(endState['todoListId2'][2].isDone).toBeFalsy()

})
test('correct task name change', () => {
// действие
    const action = changeTitleTaskAC('todoListId2', '2', 'new title task')
    const endState = tasksReducer(startState, action)

// проверка
    expect(endState['todoListId2'].length).toBe(3)
    expect(endState['todoListId2'][1].title).toBe('new title task')
    expect(endState['todoListId1'][1].title).toBe('JS')
})
test('new property new array shoulg be added when new todolist is added', () => {
// действие
    const action = addTodolistAC('The name doesn\'t matter.')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todoListId1' && k !== 'todoListId2')
    if (!newKey) {
        throw Error('No todolist')
    }

// проверка
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolist should be deleted', () => {
// действие
    const action = removeTodolistAC('todoListId2')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

// проверка
    expect(keys.length).toBe(1)
    expect(endState['todoListId2']).toBeUndefined()
})
