"use client";

import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { TodoState } from "../lib/types";
import { updateDue } from "../controllers/todoController";

const initialState: TodoState[] = [];

const sort = (state: TodoState[], order: string) => {
    switch(order){
                case "newest":
                    return [...state].sort((a, b) => {
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    })
                case "oldest":
                    return [...state].sort((a, b) => {
                        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                    })
                case "a-z":
                    return [...state].sort((a, b) => {
                        return a.title.localeCompare(b.title);
                    })
                case "z-a":                    
                    return [...state].sort((a, b) => {
                        return b.title.localeCompare(a.title);
                    })
                case "important":
                    return [...state].sort((a, b) => {
                        return Number(b.important) - Number(a.important);
                    })
                case "due-soon": 
                    return [...state].sort((a, b) => {
                        return new Date(a.due).getTime() - new Date(b.due).getTime();
                    })
                default: 
                    return state;
                }
}


const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<TodoState[]>) => {
            return sort(action.payload, "newest");
        },
        addTodo: (state, action: PayloadAction<TodoState>) => {
            return [...state, action.payload];
        },
        deleteTodo: (state, action: PayloadAction<string>) => { 
            return state.filter(todo => todo.id !== action.payload);
        },
        renameTodo: (state, action: PayloadAction<{id: string, newTitle: string}>) => {
            const {id, newTitle} = action.payload;
            return state.map(todo => {
                if (todo.id == id){
                    return {...todo, title: newTitle};
                }
                return todo;
            })
        },
        dueTodo: (state, action: PayloadAction<{id: string, newDue: string}>) => {
            const {id, newDue} = action.payload;
            return state.map(todo => {
                if (todo.id == id){
                    return {...todo, due: newDue};
                }
                return todo;
            })
        },
        markDone: (state, action: PayloadAction<{id: string}>) => {
            const {id} = action.payload;
            return state.map(todo => {
                if(todo.id == id){
                    return {...todo, completed: !todo.completed}
                }
                return todo;
            })
        },
        markImportant: (state, action: PayloadAction<{id: string}>) => {
            const {id} = action.payload;
            return state.map(todo => {
                if (todo.id === id){
                    return {...todo, important: !todo.important}
                }
                return todo;
            })
        },
        setSortedTodos: (state, action: PayloadAction<{order: string}>) => {
            const {order} = action.payload;
            return sort(state, order);
        }
    }
})



export const {setTodos, addTodo, deleteTodo, renameTodo, dueTodo, markDone, markImportant, setSortedTodos} = todoSlice.actions;

export default todoSlice.reducer;