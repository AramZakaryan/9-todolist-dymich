import {allTasksType, CondType, todolistType} from "../App";
import {v1} from "uuid";
import {addTodolistActionType, remTodolistActionType} from "./todolistsReduser";

export type tasksActionType = removeTaskActionType
    | addTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | addTodolistActionType
    | remTodolistActionType

type removeTaskActionType = {
    type: "REMOVE-TASK"
    todolistId: string
    taskId: string
}
type addTaskActionType = {
    type: "ADD-TASK"
    todolistId: string
    taskTitle: string
}
type changeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    todolistId: string
    taskId: string
    taskIsDone: boolean
}
type changeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    todolistId: string
    id: string
    title: string
}

export const removeTaskAC = (todolistId: string, id: string): removeTaskActionType => ({
    type: "REMOVE-TASK",
    todolistId,
    taskId: id
})

export const addTaskAC = (todolistId: string, title: string): addTaskActionType => ({
    type: "ADD-TASK",
    todolistId,
    taskTitle: title
})

export const changeTaskStatuskAC = (todolistId: string, id: string, isDone: boolean): changeTaskStatusActionType => ({
    type: "CHANGE-TASK-STATUS",
    todolistId: todolistId,
    taskId: id,
    taskIsDone: isDone
})

export const changeTaskTitleAC = (todolistId: string, id: string, title: string): changeTaskTitleActionType => ({
    type: "CHANGE-TASK-TITLE",
    todolistId,
    id,
    title
})


export const tasksReducer = (state: allTasksType, action: tasksActionType): allTasksType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t =>
                    t.id !== action.taskId
                )
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [
                    {id: v1(), title: action.taskTitle, isDone: false},
                    ...state[action.todolistId]
                ]
            }
        case "CHANGE-TASK-STATUS":
            return {

                ...state,
                [action.todolistId]: state[action.todolistId].map(t =>
                    t.id === action.taskId
                        ? {
                            ...t,
                            isDone: action.taskIsDone
                        }
                        : t
                )
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t =>
                    t.id === action.id
                        ? {
                            ...t,
                            title: action.title
                        }
                        : t
                )
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]: []
            }
        case "REMOVE-TODOLIST":
            let stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        default:
            throw new Error("action.type is not correct")
    }
}