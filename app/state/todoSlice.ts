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
        }
    }
})

export const {setTodos} = todoSlice.actions;

export default todoSlice.reducer;