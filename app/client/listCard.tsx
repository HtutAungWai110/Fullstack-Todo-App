import { ListItemType } from "../lib/types"
import { FaClock } from "react-icons/fa6"
import { FaPen } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function getColorCode(id: string){
    return id.split("").splice(0, 6).join("")
}

function parseDate(isoString: string){
    const date = new Date(isoString);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")} 
    ${date.getHours() % 12 || 12}:${String(date.getMinutes()).padStart(2,"0")} ${date.getHours() % 12 ? "PM": "AM"}`
}


export default function ListCard({list, userId} : {list: ListItemType, userId: String}) {

    const [isEditing, setEditing] = useState<boolean>(false);
    const [isRenaming, setRenaming] = useState<boolean>(false);
    const [rename, setRename] = useState<string>(list.title);
    const elipsisRef = useRef(null);
    const dropDownRef = useRef(null);
    const optionRef = useRef(null);

    const queryClient = useQueryClient();

    function handleInputClick(e: React.MouseEvent){
        e.preventDefault();
        
    }

    function toggleDropDown(e: React.MouseEvent){
        e.preventDefault();
        setEditing(prev => !prev);
    }

    function hideDropDown(e: MouseEvent) {
    const target = e.target as Node;

    if (
        dropDownRef.current?.contains(target) ||
        elipsisRef.current?.contains(target) ||
        optionRef.current?.contains(target)
    ) {
        return;
    }

        setEditing(false); // outside click → close dropdown
    }

    useEffect(() => {
        document.addEventListener('click', hideDropDown);

        return() => document.removeEventListener('click', hideDropDown);
    })



    const renameMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch(`api/list/${userId}/${list.id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json' 
                },
                body: JSON.stringify({rename})
            })
            const data = await res.json();
            console.log(data);
            return data;
        },
        onSuccess: () => {
            setRenaming(false);
            queryClient.invalidateQueries({queryKey: ["list"]})
        }
    })


    function handleRename(e: React.MouseEvent){
        e.preventDefault();
        if (list.title === rename.trim()) {
            setRename(prev => prev.trim());
            setRenaming(false); 
            return;
        }
        renameMutation.mutate();
    }

    function cancleRename(e: React.MouseEvent){
        e.preventDefault();
        setRenaming(false);
        setRename(list.title);
    }

    return (
        <div className="relative">
        <Link href={`list/${list.id}`}>
        <div className="w-[250px] border rounded-[5px] p-1 border-r-30 opacity-80 relative"
            style={{borderRightColor: `#${getColorCode(list.id)}`}}
        >

            <div className="flex justify-between items-center">
                { isRenaming ? 
                <input onClick={handleInputClick} onChange={(e) => setRename(e.target.value)} type="text" value={rename} readOnly={!isRenaming} className="w-full truncate rounded-none border-none" /> 
                : 
                <p>{list.title}</p> }
                { isRenaming && <div className="flex items-center gap-1"><FaCheck onClick={handleRename}/><FaXmark onClick={cancleRename}/></div> }
                <button ref={elipsisRef} onClick={toggleDropDown} className="p-2 hover:opacity-50"><FaEllipsisVertical/></button>
            </div>
            
            
            <div className="flex items-center gap-1 opacity-70">
                <FaClock/>
                <p>{parseDate(list.createdAt)}</p>    
            </div>

            
        
        </div>
        </Link>
        {
            isEditing && 
            <ul ref={dropDownRef} className="absolute right-7 top-8 z-50 bg-background border rounded-xl p-2">
                <li ref={optionRef} onClick={() => {
                    setEditing(false);
                    setRenaming(true);
                }} className="m-1 hover:opacity-50 flex items-center gap-1 cursor-pointer"><span>rename</span><FaPen className="text-[0.8em]"/></li>
                <li ref={optionRef} className="m-1 hover:opacity-50 flex items-center gap-1 cursor-pointer"><span>delete</span><FaPen className="text-[0.8em]"/></li>
            </ul>
        }
        
        </div>
    )
}