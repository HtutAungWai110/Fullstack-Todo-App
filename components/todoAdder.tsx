import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function TodoAdder({listId}: {listId: string}){
    const [title, setTitle] = useState<string>("");

    const addMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch(`/api/todo/${listId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({title})
            })

            const data = await res.json();
            console.log(data)
        }
    })

    function handleAdd(){
        addMutation.mutate();
    }

    return (
        <>
            <div className="flex">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <button onClick={handleAdd}>+</button>
            </div>
        </>
    )
}