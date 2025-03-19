import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';

import {createTaskAC} from '@/features/todolists/model/tasks-reducer.ts';
import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm.tsx';
import {TodolistTitle} from '@/features/todolists/ui/Todolists/TodolistTitle/TodolistTitle.tsx';
import {FilretButtons} from '@/features/todolists/ui/Todolists/TodolistItem/FilretButtons/FilretButtons.tsx';
import {Todolist} from '@/features/todolists/model/todolists-reducer.ts';
import {Tasks} from '@/Tasks.tsx';
type Props = {
    todolist: Todolist
}

export const TodolistItem = ({todolist}: Props) => {

    const dispatch = useAppDispatch()

    const createTask = (title: string) => {
        dispatch(createTaskAC({todolistId: todolist.id, title}))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm onCreateItem={createTask}/>
            <Tasks todolist={todolist}/>
            <FilretButtons todolist={todolist}/>

        </div>
    )
}
