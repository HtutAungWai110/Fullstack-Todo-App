"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/state";
import { TodoState } from "../lib/types";
import { useEffect, useState, useRef } from "react";
import { setTodos } from "../state/todoSlice";
import TodoAdder from "@/components/todoAdder";
import TodoCard from "./todoCard";

export default function Todos({initialState, listId}: {initialState: TodoState[], listId: string}){
    const todos = useSelector((state: RootState) => state.todo);
    const dispatch = useDispatch();

    const [error, setError] = useState<string | null>(null);

    const timeoutRef = useRef<ReturnType <typeof setTimeout> | null>(null);

    useEffect(() => {
        dispatch(setTodos(initialState))
    }, [dispatch, initialState])

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setError(null);
        }, 2000)

        return () => {
            if (timeoutRef.current){
                clearTimeout(timeoutRef.current)
            }
        }
    }, [error])

    return (
        <>
        <TodoAdder listId={listId}/>
        <div className="mt-5">
            {todos.map((todo, index) => {
                return <TodoCard key={index} todo={todo} listId={listId} setError={setError}/>
            })}
        </div>

        {error && 
            <div className="fixed bottom-20 left-[50%] -translate-x-[50%]">
                <p className="p-2 border rounded-2xl">{error}</p>
            </div>
        }
        </>
    )
}