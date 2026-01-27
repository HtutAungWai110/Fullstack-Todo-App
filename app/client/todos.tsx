'use client'

import { useEffect } from "react";
import { QueryList } from "../lib/queryList"
import { ThreeDotsLoader } from "@/components/Loader";


type ListItem = {
    id: string,
    title: string,
    creator: string,
    createdAt: string
}

export default function Todos({ initData, userId }: { initData: ListItem[]; userId: string }){
   
    const {data, isLoading, isPending, error} = QueryList({ initData, userId });

    useEffect(() => {
        console.log(data);
    }, [data])

    

    // if (isLoading || isPending){
    //     return(
    //         <div className="w-full h-[100vh] fixed top-0 flex justify-center items-center">
    //             <ThreeDotsLoader label={""}/>
    //         </div>
    //     )
    // }
    return(
        <>
            {(data ?? []).map((list) => <p key={list.id}>{list.title}</p>)}
            
        </>
        
    )
}