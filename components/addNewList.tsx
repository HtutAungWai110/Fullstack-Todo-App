'use client'
import { useState } from "react"

export default function NewlistInput() {
    const [input, setInput] = useState("");

    return (
        <div className="fixed bottom-0 bg-stone-100 p-[10px] w-full flex justify-center rounded-t-3xl">
            <div className="flex items-center justify-between bg-white border-[1px] border-stone-300 sm:w-[400px] p-[5px_10px] rounded-2xl">
                <input type="text" placeholder="Create new list" value={input} onChange={(e) => setInput(e.target.value)}
                className="p-[5px_10px] w-[90%] outline-none"/>
                <button 
                className="
                green-gradient text-3xl active:opacity-50 text-white 
                cursor-pointer w-[10%] rounded-2xl
                "
                >+</button>
            </div>
            
        </div>
    )
}