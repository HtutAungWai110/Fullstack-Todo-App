import { TodoState } from "../lib/types";
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteTodo, renameTodo, dueTodo, markDone, markImportant } from "@/app/state/todoSlice";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { ThreeDotsLoaderSmall } from "@/components/Loader";

export default function TodoCard({todo, listId, setError} : {
    todo: TodoState, 
    listId: string,
    setError: (value: string | null) => void
}){
    const dispatch = useDispatch();
    const [todoState, setTodoState] = useState<TodoState>(todo);
    const [removing, setRemoving] = useState<boolean>(false);

    useEffect(() => {
        setTodoState(todo)
    }, [todo])

    

    const deleteMutation = useMutation({
        mutationFn: async () => {
            setRemoving(true);
            const res = await fetch(`/api/todo/${listId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: todo.id})  
            })
            const data = await res.json();
            return data.data;
        },
        onSuccess: (data) => {
            dispatch(deleteTodo(data.id));
            setRemoving(false);
        },
        onError: (error) => {
            setError(error.message);
            setRemoving(false);
        }
    });


    const renameMutation = useMutation({
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
                const data = await res.json();
                throw new Error(JSON.stringify(data));
            }

            const data = await res.json();
            return data;
        },
        onError: (error) => {
            const {message, title} = JSON.parse(error.message) as {message: string, title: string};
            dispatch(renameTodo({id: todo.id, newTitle: title}));
            setError(message);
        }
    })

    

    useEffect(() => {
        console.log(todoState.title, todo.title)
    }, [todoState.title, todo.title])


    const handleDueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.trim() == "") return;
        setTodoState(prev => ({...prev, due: e.target.value}));
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
                const data = await res.json();
                throw new Error(JSON.stringify(data));
            }
            const data = await res.json();
            return data;
        }, onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            const {message, due} = JSON.parse(error.message) as {message: string, due: string}
            dispatch(dueTodo({id: todo.id, newDue: due}));
            setError(message);
        }
    })

    const markMutation = useMutation({
        mutationFn: async () => {
            dispatch(markDone({id: todo.id}))
            const res = await fetch(`/api/todo/${listId}/mark`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: todo.id, mark: !todo.completed})
            })

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message);
            }

            const data = await res.json();
            return data;
        },
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (e) => {
            dispatch(markDone({id: todo.id}))
            setError(e.message)
        }
    })

    const importantMutation = useMutation({
        mutationFn: async () => {
            dispatch(markImportant({id: todo.id}))
            const res = await fetch(`/api/todo/${listId}/important`, {
                method: "PUT",
                headers: {
                    'Content-Type' : 'application/json'
                }, 
                body: JSON.stringify({id: todo.id, important: !todo.important})
            })
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message);
            }

            const data = await res.json();
            return data
        }, 
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (e) => {
            setError(e.message);
            dispatch(markImportant({id: todo.id}))
        }
    })

    const handleDelete = () => {
        deleteMutation.mutate();
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(removing) return;
        setTodoState(prev => ({...prev, title: e.target.value}));
    }

    const updateDue = () => {
        if (removing) return;
        updateDueMutation.mutate();
    }

    const updatename = () => {
        if (removing) return;
        renameMutation.mutate();
    }

    const handleMark = () => {
        if (removing) return;
        markMutation.mutate();
    }

    const handleImportant = () => {
        if (removing) return;
        importantMutation.mutate();
    }

    return (
        <div className="md:m-5 m-2 border p-4 rounded-4xl  shadow-md flex items-center justify-between">
            <div className="flex gap-2 w-[30%] ">
                <input type="checkbox" checked={todoState.completed} onChange={handleMark}/>
                <input
                style={{textDecoration: `${todo.completed ? "line-through" : "none"}`}}
                type="text" className="rounded-2xl border-none sm:text-[1em] text-[0.8em] w-[70%]"  
                value={todoState.title} onChange={handleTitleChange}/>
                {todoState.title.trim() !== todo.title.trim() && 
                    <button onClick={updatename}><FaCheck/></button>
                }
            </div>
            
            <div className="flex items-center gap-2 w-[0%7] justify-end">
                <input type="datetime-local" className="sm:text-[1em] text-[0.7em]" onChange={handleDueChange} value={getLocalTime()} onBlur={updateDue}/>
                <button onClick={handleImportant}>{todo.important ? <FaStar/> : <FaRegStar/>}</button>
                {!removing && <button onClick={handleDelete} className="text-red-500 active:scale-3d"><FaTrash/></button>}
                {removing && 
                <ThreeDotsLoaderSmall label=""/>
                }
            </div>

            
        </div>
    )
}