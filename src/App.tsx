import React, {useState} from 'react';
import {TaskType, TodoList} from './todoList/TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active';
type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListsType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'Movies', filter: 'all'},
    ])

    const [tasksObj, setTasksObj] = useState({
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

    function removeTask(todoListID: string, id: string) {

        const tasks = tasksObj[todoListID];
        const filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todoListID] = filteredTasks;
        setTasksObj({...tasksObj})
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        const totoList = todoLists.find(tl => tl.id === todoListID)
        if (totoList) {
            totoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function addTask(todoListID: string, title: string) {
        const newTask = {id: v1(), title: title, isDone: false};
        const tasks = tasksObj[todoListID];
        const newTasks = [newTask, ...tasks];
        tasksObj[todoListID] = newTasks;
        setTasksObj({...tasksObj})


    }

    function changeStatus(todoListID: string, taskId: string, isDone: boolean) {

        const tasks = tasksObj[todoListID];
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    function removeTodoList(todoListID: string) {
        const filteredTodolists = todoLists.filter(tl => tl.id !== todoListID)
        setTodoLists(filteredTodolists)
        delete tasksObj[todoListID]
        setTasksObj({...tasksObj})
    }

    return (
        <div className={'App'}>

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
                        />


                    )
                })
            }


        </div>
    )
}

export default App;
