import React, {useState} from 'react';
import {TaskType, TodoList} from '../todoList/TodoList';
import {AddItemForm} from '../addItemForm/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import {containerSx} from '../todoList/TodoList.styles';
import {NavButton} from '../NavButton';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';
import {Box} from '@mui/material';
import {useAppSelector} from '../common/hooks/useAppSelector';
import {useAppDispatch} from '../common/hooks/useAppDispatch';
import {selectTodolists} from '../model/todolist-selector';
import {selectTasks} from '../model/task-selector';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC
} from '../model/todolist-reducer/todolists-reducer';
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from '../model/task-reducer/tasks-reducer';



type ThemeMode = 'dark' | 'light';

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodoListsType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type TasksStateType = {
    [key: string]: TaskType[];
};

function App() {
    const todoLists = useAppSelector(selectTodolists);
    const tasks = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();

    const [themeMode, setThemeMode] = useState<ThemeMode>('light');
    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    });
    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    };

    const removeTodoList = (todoListID: string) => {
        dispatch(deleteTodolistAC({id: todoListID}));
    };
    const addTodoLIst = (title: string) => {
        dispatch(createTodolistAC(title));
    };
    const changeTodoListTitle = (todoListID: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC({id: todoListID, title: newTitle}));
    };
    const changeFilter = (value: FilterValuesType, todoListID: string) => {
        dispatch(changeTodolistFilterAC({id: todoListID, filter: value}));
    };

    const removeTask = (todoListID: string, id: string) => {
        dispatch(deleteTaskAC({todolistId: todoListID, taskId: id}));
    };
    const addTask = (todoListID: string, title: string) => {
        dispatch(createTaskAC(todoListID, title));
    };
    const changeStatus = (todoListID: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todolistId: todoListID, taskId, isDone}));
    };
    const changeTaskTitle = (todoListID: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC({todolistId: todoListID, taskId, title: newTitle}));
    };

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
                                let tasksForTodolist = tasks[tl.id];
                                if (tl.filter === 'completed') {
                                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                                }
                                if (tl.filter === 'active') {
                                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                                }
                                return (
                                    <Grid key={tl.id}>
                                        <Paper sx={{p: '0 20px 20px 20px'}}>
                                            <TodoList
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
                                );
                            })
                        }
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default App;
