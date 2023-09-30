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

let initialState: allTasksType
let todolistId1: string
let todolistId2: string
let taskId1_1: string
let taskId1_2: string

beforeEach(() => {

    todolistId1 = v1()
    todolistId2 = v1()

    taskId1_1 = v1()
    taskId1_2 = v1()

    initialState = {
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

test("Correct task should be removed", () => {

    //data
    const action:tasksActionType = removeTaskAC(todolistId1, taskId1_1)

    // action
    const updatedState: allTasksType = tasksReducer(initialState, action)

    // expectation
    expect(updatedState[todolistId1].length).toBe(3)
    expect(updatedState[todolistId2].length).toBe(2)
    expect(updatedState[todolistId1].every(t=>t.id!==taskId1_1)).toBeTruthy()

})

test("Correct task should be added", () => {
    // data
    const newTaskTitle: string = "Newly Added Task"
    const action: tasksActionType = addTaskAC(todolistId2,newTaskTitle)
    // action
    const updatedState = tasksReducer(initialState, action)
    // expectation
    expect(updatedState[todolistId1].length).toBe(4)
    expect(updatedState[todolistId2].length).toBe(3)
    expect(updatedState[todolistId2][0].id).toBeDefined()
    expect(updatedState[todolistId2][0].title).toBe(newTaskTitle)
    expect(updatedState[todolistId2][0].isDone).toBe(false)

})

test("Correct task status should be changed", () => {

    // data
    const action: tasksActionType = changeTaskStatuskAC(todolistId1, taskId1_2, true)

    // action
    const updatedState = tasksReducer(initialState, action)

    // expectation
    expect(updatedState[todolistId1][2].isDone).toBeTruthy()

})

test("Correct task title should be changed", () => {

    // data
    const newTitle = "New Title"
    const action: tasksActionType = changeTaskTitleAC(todolistId1, taskId1_2, newTitle)

    // action
    const updatedState = tasksReducer(initialState, action)

    // expectation
    expect(updatedState[todolistId1][2].title).toBe(newTitle)

})

