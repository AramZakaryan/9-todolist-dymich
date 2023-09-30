import {CondType, todolistType} from "../App";
import {v1} from "uuid";

export type todolistActionType = remTodolistActionType
    | addTodolistActionType
    | changeTodolistTitleActionType
    | changeFilterCondActionType

export type remTodolistActionType = {
    type: "REMOVE-TODOLIST"
    todolistId: string
}
export type addTodolistActionType = {
    type: "ADD-TODOLIST"
    todolistId: string
    todolistTitle: string
}
type changeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    todolistId: string
    updatedTodolistTitle: string
}
type changeFilterCondActionType = {
    type: "CHANGE-FILTER-COND"
    todolistId: string
    updatedFilterCond: CondType
}

export const remTodolistAC = (todolistId: string): remTodolistActionType => ({
    type: "REMOVE-TODOLIST",
    todolistId
})
export const addTodolistAC = (todolistTitle: string): addTodolistActionType => ({
    type: "ADD-TODOLIST",
    todolistId: v1(),
    todolistTitle
})
export const changeTodolistTitleAC = (todolistId: string, updatedTodolistTitle: string): changeTodolistTitleActionType => ({
    type: "CHANGE-TODOLIST-TITLE",
    todolistId,
    updatedTodolistTitle
})
export const changeFilterCondAC = (todolistId: string, updatedFilterCond: CondType): changeFilterCondActionType => ({
    type: "CHANGE-FILTER-COND",
    todolistId,
    updatedFilterCond
})

export const todolistsReducer = (state: todolistType[], action: todolistActionType): todolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todolistId)
        case "ADD-TODOLIST":
            return [
                ...state,
                {
                    id: action.todolistId,
                    todolistTitle: action.todolistTitle,
                    filterCond: "All"
                }
            ]
        case "CHANGE-TODOLIST-TITLE":
            const updatedTodolist1 = state.find(tl => tl.id === action.todolistId)
            if (updatedTodolist1) {
                updatedTodolist1.todolistTitle = action.updatedTodolistTitle
                return [...state]
            } else {
                throw new Error("todolist.id is not correct, so todolistTitle cannot be changed")
            }
        case "CHANGE-FILTER-COND":
            const updatedTodolist2 = state.find(tl => tl.id === action.todolistId)
            if (updatedTodolist2) {
                updatedTodolist2.filterCond = action.updatedFilterCond
                return [...state]
            } else {
                throw new Error("todolist.id is not correct, so todolist filterCond cannot be changed")
            }
        default:
            throw new Error("action.type is not correct")
    }
}