import {instanse} from '@/common/instanse/instanse.ts';
import {Todolist} from '@/features/todolists/api/todolistsApi.types.ts';
import {BaseResponse} from '@/common/types/types.ts';


export const todoListApi = {
    getTodolists(){
        return   instanse.get<Todolist[]>('/todo-lists')
    },
    changeTodolistTitle(id: string, title: string){
        return  instanse.put<BaseResponse>(`/todo-lists/${id}`, {title})
    },
    createTodolist(title: string){
        return  instanse.post<BaseResponse<{ item: Todolist }>>('/todo-lists', {title})
    },
    deleteTodolist(id: string){
        return  instanse.delete<BaseResponse>(`/todo-lists/${id}`)
    }
}