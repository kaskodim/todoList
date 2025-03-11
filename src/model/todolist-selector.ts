import {RootState} from '../app/store';
import {TodoListsType} from '../app/App';

export const selectTodolists = (state: RootState): TodoListsType[]=> state.todolists
