import { load } from 'redux-localstorage-simple';

let TASKS = load({namespace: 'todo-app'})

if (!TASKS || !TASKS.tasks || !TASKS.tasks.length){
    TASKS = {
        tasks:[]
    }
}

const tasks = (state = TASKS.tasks, { type, id, text, isCompleted }) => {
    switch (type) {
        case ADD_TASK: return [...state, {
            id: id,
            text: text,
            isCompleted: isCompleted
        }];

        case DELETE_TASK: return [...state].filter((task) => task.id !== id);

        case COMPLETE_TASK: return [...state].map((task) => {
            if (task.id === id){
                task.isCompleted = !task.isCompleted;
            }
            return task;
        });

        case DELETE_COMPLETED: return [...state].filter((task) => !task.isCompleted);

        case CHECK_ALL_TASKS: return [...state].map((task) => {
            if (task.isCompleted === false){
                task.isCompleted = true;
            }
            return task;
        });

        case UNCHECK_ALL_TASKS: return [...state].map((task) => {
            if (task.isCompleted === true){
                task.isCompleted = false;
            }
            return task;
        });

        case UPDATE_TASK: return [...state].map((task) => {
            if (task.id === id){
                task.text = text;
            }
            return task;
        });

        default: return state;
    }
}

export default tasks;


// CONSTANTS
const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';
const COMPLETE_TASK = 'COMPLETE_TASK';
const DELETE_COMPLETED = 'DELETE_COMPLETED';
const CHECK_ALL_TASKS = 'CHECK_ALL_TASKS';
const UNCHECK_ALL_TASKS = 'UNCHECK_ALL_TASKS';
const UPDATE_TASK = 'UPDATE_TASK';

// ACTION CREATORS
export const addTask = (id, text, isCompleted) => ({
    type: ADD_TASK,
    id,
    text,
    isCompleted
})

export const deleteTask = id => ({
    type: DELETE_TASK,
    id
})

export const deleteCompleted = (id, text, isCompleted) => ({
    type: DELETE_COMPLETED,
    id,
    text,
    isCompleted
})

export const completeTask = id => ({
    type: COMPLETE_TASK,
    id
})

export const checkAllTasks = (id, text, isCompleted) => ({
    type: CHECK_ALL_TASKS,
    id,
    text,
    isCompleted
})

export const uncheckAllTasks = (id, text, isCompleted) => ({
    type: UNCHECK_ALL_TASKS,
    id,
    text,
    isCompleted
})

export const updateTask = (id, text) => ({
    type: UPDATE_TASK,
    id,
    text
})