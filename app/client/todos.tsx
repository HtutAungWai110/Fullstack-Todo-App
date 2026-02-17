"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/state";
import { TodoState } from "../lib/types";
import { useEffect } from "react";
import { setTodos } from "../state/todoSlice";
import TodoAdder from "@/components/todoAdder";
import TodoCard from "./todoCard";

export default function Todos({initialState, listId}: {initialState: TodoState[], listId: string}){
    const todos = useSelector((state: RootState) => state.todo);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTodos(initialState))
    }, [dispatch, initialState])

    return (
        <>
        <TodoAdder listId={listId}/>
        <div className="mt-5">
            {todos.map((todo, index) => {
                return <TodoCard key={index} todo={todo} listId={listId}/>
            })}
        </div>
        </>
    )
}