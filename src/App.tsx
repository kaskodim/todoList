import React, {useState} from 'react';
import {TaskType, TodoList} from './todoList/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './addItemForm/AddItemForm';

export type FilterValuesType = 'all' | 'completed' | 'active';
type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListsType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'Movies', filter: 'all'},
    ])
    const [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'CSS&HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],

        [todoListId2]: [{id: v1(), title: 'Terminator', isDone: true},
            {id: v1(), title: 'xxx', isDone: true},
            {id: v1(), title: 'Terminator2', isDone: false},
        ]
    });

    const removeTask = (todoListID: string, id: string) => {

        const tasks = tasksObj[todoListID];
        const filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todoListID] = filteredTasks;
        setTasksObj({...tasksObj})
    }
    const changeFilter = (value: FilterValuesType, todoListID: string) => {
        const totoList = todoLists.find(tl => tl.id === todoListID)
        if (totoList) {
            totoList.filter = value
            setTodoLists([...todoLists])
        }
    }
    const addTask = (todoListID: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false};
        const tasks = tasksObj[todoListID];
        const newTasks = [newTask, ...tasks];
        tasksObj[todoListID] = newTasks;
        setTasksObj({...tasksObj})
    }
    const changeStatus = (todoListID: string, taskId: string, isDone: boolean) => {

        const tasks = tasksObj[todoListID];
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }
    const removeTodoList = (todoListID: string) => {
        const filteredTodolists = todoLists.filter(tl => tl.id !== todoListID)
        setTodoLists(filteredTodolists)
        delete tasksObj[todoListID]
        setTasksObj({...tasksObj})
    }
    const addTodoLIst = (title: string) => {
        const todoList: TodoListsType = {id: v1(), title: title, filter: 'all'};
        setTodoLists([todoList, ...todoLists])
        setTasksObj({
            ...tasksObj,
            [todoList.id]: []
        })
    }
    const changeTaskTitle = (todoListID: string, taskId: string, newTitle: string) => {

        const tasks = tasksObj[todoListID];
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasksObj({...tasksObj})
        }
    }
    const changeTodoListTitle = (todoListID: string, newTitle: string) => {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className={'App'}>

            <AddItemForm addItem={addTodoLIst}/>
            {
                todoLists.map((tl) => {
                    let tasksForTodolist = tasksObj[tl.id]
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                    }
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                    }

                    return (
                        <TodoList key={tl.id}
                                  id={tl.id}
                                  title={tl.title}
                                  tasks={tasksForTodolist}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeStatus}
                                  filter={tl.filter}
                                  removeTodoList={removeTodoList}
                                  changeTaskTitle={changeTaskTitle}
                                  changeTodoListTitle={changeTodoListTitle}
                        />
                    )
                })
            }
        </div>
    )
}

export default App;
