"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/state";
import { TodoState } from "../lib/types";
import { useEffect } from "react";
import { setTodos } from "../state/todoSlice";
import TodoAdder from "@/components/todoAdder";

export default function Todos({initialState, listId}: {initialState: TodoState[], listId: string}){
    const todos = useSelector((state: RootState) => state.todo);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTodos(initialState))
    }, [dispatch, initialState])

    useEffect(() => {
        console.log(todos)
    }, [todos])

    return (
        <>
        <TodoAdder listId={listId}/>
        <h1>Todos</h1>
        </>
    )
}