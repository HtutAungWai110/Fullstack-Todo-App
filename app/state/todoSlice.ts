"use client";

import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { TodoState } from "../lib/types";
import { updateDue } from "../controllers/todoController";

const initialState: TodoState[] = [];


const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<TodoState[]>) => {
            return action.payload;
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
        }
    }
})

export const {setTodos, addTodo, deleteTodo, renameTodo, dueTodo, markDone, markImportant} = todoSlice.actions;

export default todoSlice.reducer;