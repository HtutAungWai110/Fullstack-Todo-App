'use client'

import { useEffect } from "react";
import { QueryList } from "../lib/queryList"
import { ThreeDotsLoader } from "@/components/Loader";

import ListCard from "./listCard";

import { ListItemType } from "../lib/types";

export default function Todos({ initData, userId }: { initData: ListItemType[]; userId: string }){
   
    const {data, isLoading, isPending, error} = QueryList({ initData, userId });

    useEffect(() => {
        console.log(data);
    }, [data])

    

    if (isLoading || isPending){
        return(
            <div className="w-full h-[100vh] fixed top-0 flex justify-center items-center">
                <ThreeDotsLoader label={""}/>
            </div>
        )
    }
    return(
        <>
        <section>
            <div className="flex justify-center gap-5 flex-wrap p-5">
                {(data ?? []).sort((a, b) => {
                    const oldest = new Date(a.createdAt).getTime()
                    const latest = new Date(b.createdAt).getTime()
                    return oldest - latest
                }).map((list) => <ListCard key={list.id} list={list} userId={userId}/>)}
            </div>
        </section>
            
            
            
        </>
        
    )
}