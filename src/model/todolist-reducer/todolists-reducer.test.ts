import {v1} from 'uuid'
import {FilterValuesType, TodoListsType} from '../../App';
import {addTodolistAC, changeFilterTodolistAC, changeTitleTodolistAC, removeTodolistAC, todolistsReducer} from './todolists-reducer';


// 1.  старт для всех тестов
let todolistId1: string;
let todolistId2: string;
let startState: TodoListsType[];

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
})



test('correct todolist should be deleted', () => {

    // 2. Действие
    const action = removeTodolistAC(todolistId1)
    const endState = todolistsReducer(startState, action)

    // 3. Проверка
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {

    const newTitle: string = 'New Title Todolist'

    // 2. Действие
    const action = addTodolistAC(newTitle)
    const endState = todolistsReducer(startState, action)

    // 3. Проверка
    expect(endState.length).toBe(3)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('What to buy')
    expect(endState[2].title).toBe('New Title Todolist')

    expect(endState[2].filter).toBe('all')
})
test('correct change of the todolist title', () => {

    const newTitle: string = 'Change Title Todolist'

    // 2. Действие
    const action = changeTitleTodolistAC(todolistId2, newTitle)
    const endState = todolistsReducer(startState, action)

    // 3. Проверка
    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('Change Title Todolist')
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('all')
})
test('correct filter change todolist', () => {

    const newFilter: FilterValuesType = 'completed'

    // 2. Действие
    const action = changeFilterTodolistAC(todolistId2, newFilter)
    const endState = todolistsReducer(startState, action)

    // 3. Проверка
    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('What to buy')
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})