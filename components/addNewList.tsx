'use client'
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
    setLoad: (value: boolean | ((prev: boolean) => boolean)) => void;
    onAddError: (message: string) => void
}

export default function NewlistInput({setLoad, onAddError}: Props) {
    const [input, setInput] = useState("");
    const queryClient = useQueryClient();

    const mutation  = useMutation({
        mutationFn: async () => {
            setLoad(true);
            const res = await fetch('/api/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({input})
            })

            if(!res.ok){
                const error = await res.json();
                throw new Error(error.message)
            }
            const data = await res.json();
            console.log(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["list"] })
            setLoad(false);
        },
        onError: (error: Error) => {
            setLoad(false)
            onAddError(error.message);
        }
    })

    const handleAdd = () => {
        if(input.trim() == "") return;
        mutation.mutate();
        setInput("");
    }

    return (
        <div className="fixed bottom-0 bg-stone-100 p-[10px] w-full flex justify-center rounded-t-3xl">
            <div className="flex items-center justify-between bg-white border-[1px] border-stone-300 sm:w-[400px] p-[5px_10px] rounded-2xl">
                <input type="text" placeholder="Create new list" value={input} onChange={(e) => setInput(e.target.value)}
                className="p-[5px_10px] w-[90%] rounded-none border-none outline-none"/>
                <button onClick={handleAdd} 
                className="
                green-gradient text-3xl active:opacity-50 text-white 
                cursor-pointer w-[10%] rounded-2xl
                "
                >+</button>
            </div>
            
        </div>
    )
}