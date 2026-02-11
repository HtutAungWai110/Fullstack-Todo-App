"use client";

import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { TodoState } from "../lib/types";

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
        }
    }
})

export const {setTodos, addTodo, deleteTodo} = todoSlice.actions;

export default todoSlice.reducer;