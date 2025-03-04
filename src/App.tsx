import React, {useState} from 'react';
import {TaskType, TodoList} from './todoList/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './addItemForm/AddItemForm';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import {containerSx} from './todoList/TodoList.styles';
import {NavButton} from './NavButton';
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {Box} from '@mui/material';

type ThemeMode = 'dark' | 'light'

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodoListsType = {
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

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })
    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
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
    const changeTodoListTitle = (todoListID: string, newTitle: string) => {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }
    const changeFilter = (value: FilterValuesType, todoListID: string) => {
        const totoList = todoLists.find(tl => tl.id === todoListID)
        if (totoList) {
            totoList.filter = value
            setTodoLists([...todoLists])
        }
    }


    const removeTask = (todoListID: string, id: string) => {

        const tasks = tasksObj[todoListID];
        const filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todoListID] = filteredTasks;
        setTasksObj({...tasksObj})
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
    const changeTaskTitle = (todoListID: string, taskId: string, newTitle: string) => {

        const tasks = tasksObj[todoListID];
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasksObj({...tasksObj})
        }
    }


    return (
        <div className={'App'}>


            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Box sx={{flexGrow: 1, paddingBottom: '80px'}}>
                    <AppBar position="fixed" sx={{mb: '30px'}}>
                        <Toolbar>
                            <Container maxWidth={'lg'} sx={containerSx}>
                                <IconButton color="inherit">
                                    <MenuIcon/>
                                </IconButton>
                                <div>
                                    <NavButton>Sign in</NavButton>
                                    <NavButton>Sign up</NavButton>
                                    <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                    <Switch color={'default'} onChange={changeMode}/>
                                </div>

                            </Container>
                        </Toolbar>
                    </AppBar>
                </Box>


                <Container maxWidth={'lg'}>
                    <Grid container sx={{mb: '30px'}}>
                        <AddItemForm addItem={addTodoLIst}/>
                    </Grid>


                    <Grid container spacing={4}>
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
                                    <Grid key={tl.id}>
                                        <Paper sx={{p: '0 20px 20px 20px'}}>
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
                                        </Paper>

                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Container>

            </ThemeProvider>


        </div>
    )
}

export default App;
