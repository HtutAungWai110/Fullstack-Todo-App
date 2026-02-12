import { TodoState } from "../lib/types";
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteTodo, renameTodo, dueTodo } from "@/app/state/todoSlice";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";

export default function TodoCard({todo, listId} : {todo: TodoState, listId: string}){
    const dispatch = useDispatch();
    const [todoState, setTodoState] = useState<TodoState>(todo);
    const deleteMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch(`/api/todo/${listId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: todo.id})  
            })
            const data = await res.json();
            console.log(data)
            return data.data;
        },
        onSuccess: (data) => {
            dispatch(deleteTodo(data.id));
        }
    });


    const updateMutation = useMutation({
        mutationFn: async () => {
            dispatch(renameTodo({id: todo.id, newTitle: todoState.title}));
            const res = await fetch(`/api/todo/${listId}/rename`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: todo.id, rename: todoState.title, oldname: todo.title})
            })
            if(!res.ok) {
                const error = await res.json();
                throw new Error(error.title);
            }

            const data = await res.json();
            return data;
        },
        onError: (error) => {
            dispatch(renameTodo({id: todo.id, newTitle: error.message}));
            setTodoState(prev => ({...prev, title: error.message}));
        }
    })

    const handleDelete = () => {
        deleteMutation.mutate();
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoState(prev => ({...prev, title: e.target.value}));
    }

    useEffect(() => {
        console.log(todoState.title, todo.title)
    }, [todoState.title, todo.title])


    const handleDueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.trim() == "") return;
        setTodoState(prev => ({...prev, due: e.target.value}));
        console.log(e.target.value);
    }

    const getLocalTime = () => {
        const iso = todoState.due;
        const date = new Date(iso);
        const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
        return local;
    }

    const updateDueMutation = useMutation({
        mutationFn: async () => {
            dispatch(dueTodo({id: todo.id, newDue: todoState.due}));
            const res = await fetch(`/api/todo/${listId}/due`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: todo.id, due: todoState.due, oldDue: todo.due})
            })
            if(!res.ok) {
                const error = await res.json();
                throw new Error(error.due);
            }
            const data = await res.json();
            return data;
        }, onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            dispatch(dueTodo({id: todo.id, newDue: error.message}));
            setTodoState(prev => ({...prev, due: error.message}));
        }
    })

    const updateDue = () => {
        updateDueMutation.mutate();
    }

    const updatename = () => {
        updateMutation.mutate();
    }

    return (
        <div className="border p-4 rounded-4xl shadow-md md:m-5 m-2 flex items-center justify-between">
            <div className="flex gap-2">
                <input type="text" className="rounded-2xl border-none" value={todoState.title} onChange={handleTitleChange}/>
                {todoState.title.trim() !== todo.title.trim() && 
                    <button onClick={updatename}><FaCheck/></button>
                }
            </div>
            
            <div className="flex items-center gap-2">
                <input type="datetime-local"  onChange={handleDueChange} value={getLocalTime()} onBlur={updateDue}/>
                <button>{todo.important ? <FaStar/> : <FaRegStar/>}</button>
                <button onClick={handleDelete} className="text-red-500 active:scale-3d"><FaTrash/></button>
            </div>
        </div>
    )
}