'use client'

import { useDispatch } from "react-redux"
import { setSortedTodos } from "@/app/state/todoSlice"
import { useState, useEffect, useRef } from "react";
import { FaArrowDownZA } from "react-icons/fa6";
import { FaArrowUpAZ } from "react-icons/fa6";


export default function TodoSorter(){
    const dispatch = useDispatch();

    const [open, setOpen] = useState<boolean>(false);
    const [order, setOrder] = useState<string>("newest");

    const handleSort = (order: string) => {
        setOrder(order);
        dispatch(setSortedTodos({order}));
        setOpen(false);
    }



    const dropdownRef = useRef<HTMLDivElement>(null);

    
    const handleClickOutside = (event: MouseEvent) => {
        if(dropdownRef.current && dropdownRef.current.contains(event.target as Node)){
            return
        }
        setOpen(false);
        
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    })

    
    return (
        <div ref={dropdownRef} className="border rounded-xl p-1 w-[120px] relative">
        <div className="cursor-pointer flex justify-between items-center gap-2" onClick={() => setOpen(prev => !prev)}>
            <span>{order}</span>
            { open ?  <FaArrowUpAZ/> : <FaArrowDownZA/> }
            </div>
        { open &&
        <ul className="flex flex-col p-1 gap-2 absolute top-10 bg-background border roundex-xl z-50">
            <li className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('newest')}>newest</li>
            <li className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('oldest')}>oldest</li>
            <li className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('a-z')}>a-z</li>
            <li className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('z-a')}>z-a</li>
            <li className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('important')}>important</li>
            <li className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('due-soon')}>due-soon</li>
        </ul>
        }
        </div>
    )
}