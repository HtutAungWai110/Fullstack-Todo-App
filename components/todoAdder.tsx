import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "@/app/state/todoSlice";

export default function TodoAdder({listId}: {listId: string}){
    const [title, setTitle] = useState<string>("");
    const [due, setDue] = useState<string>("");
    const dispatch = useDispatch();

    const addMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch(`/api/todo/${listId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({title, due})
            })

            const data = await res.json();
            return data.data;
        },
        onSuccess: (data) => {
            setTitle("");
            setDue("");
            dispatch(addTodo(data))
        }
    })

    function handleAdd(){
        if (title.trim() == "" || due.trim() == "") return;
        addMutation.mutate();
    }

    return (
        <>
            <div className="flex border rounded-2xl justify-between items-center md:w-1/2 w-[90%] m-auto h-[40px] overflow-hidden">
            <div className="flex items-center w-[90%] justify-between">
                <input type="text" placeholder="Todo name" value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-none border-none outline-none w-[70%]"/>
                <input value={due} onChange={(e) => setDue(e.target.value)} type="datetime-local"  className="rounded-none border-none outline-none w-[30%]"/>
            </div>
                <button className="w-[10%] bg-foreground text-background h-full" onClick={handleAdd}>+</button>
            </div>
        </>
    )
}