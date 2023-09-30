import {allTasksType, CondType, todolistType} from "../App";
import {v1} from "uuid";
import {
    tasksActionType,
    addTaskAC,
    changeTaskStatuskAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./tasksReduser";
import {addTodolistAC, remTodolistAC, todolistsReducer} from "./todolistsReduser";

let initialtodolistState: todolistType[]
let initialTasksState: allTasksType
let todolistId1: string
let todolistId2: string
let taskId1_1: string
let taskId1_2: string

beforeEach(() => {

    todolistId1 = v1()
    todolistId2 = v1()

    taskId1_1 = v1()
    taskId1_2 = v1()

    initialtodolistState = [
        {id: todolistId1, todolistTitle: "What to learn?", filterCond: "All"},
        {id: todolistId2, todolistTitle: "What to buy?", filterCond: "All"}
    ]

    initialTasksState = {
        [todolistId1]: [
            {id: v1(), title: "CSS & HTML", isDone: false},
            {id: taskId1_1, title: "JS", isDone: false},
            {id: taskId1_2, title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
        ],
    }


})

test("Correct todolist (with corresponding tasks) should be added", () => {
    // data
    const newTodolistTitle: string = "New Todolist"
    // const action: actionType = {type: "addTodolist", todolistTitle: newTodolistTitle}
    const action: tasksActionType = addTodolistAC(newTodolistTitle)

    // action
    const updatedTodolistsState = todolistsReducer(initialtodolistState, action)
    const updatedTasksState = tasksReducer(initialTasksState, action)

    // expectation
    expect(updatedTodolistsState.length).toBe(3)
    expect(Object.keys(updatedTasksState).length).toBe(3)
    expect(updatedTodolistsState[2].id).toBe(Object.keys(updatedTasksState)[2])

})

test("Correct todolist (with corresponding tasks) should be deleted", () => {
    // data
    const action: tasksActionType = remTodolistAC(todolistId2)

    // action
    const updatedTodolistsState = todolistsReducer(initialtodolistState, action)
    const updatedTasksState = tasksReducer(initialTasksState, action)

    // expectation
    expect(updatedTodolistsState.length).toBe(1)
    expect(Object.keys(updatedTasksState).length).toBe(1)
    expect(updatedTasksState[todolistId1]).toBeDefined()
    expect(updatedTasksState[todolistId2]).not.toBeDefined()

})