'use client'

import { useEffect, useState, useRef } from "react";
import { QueryList } from "../lib/queryList"
import { ThreeDotsLoader } from "@/components/Loader";
import NewlistInput from "@/components/addNewList";

import ListCard from "./listCard";

import { ListItemType } from "../lib/types";
export default function Lists({ initData, userId }: { initData: ListItemType[]; userId: string }){
   
    const {data, isLoading, isPending, error} = QueryList({ initData, userId });

    const [isError, setError] = useState<string | null>(null)

    const [loader, setLoader] = useState<boolean>(false);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setError(null);
        }, 2000)


        return () => {
            if (timeoutRef.current){
                clearTimeout(timeoutRef.current)
            }
        }
    
    }, [isError])



    

    if (isLoading || isPending){
        return(
            <div className="w-full h-[100vh] fixed top-0 flex justify-center items-center">
                <ThreeDotsLoader label={""}/>
            </div>
        )
    }

    if (error){
        return (
            <div className="fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
                <p>{error.message}</p>
            </div>
        )
    }


    return(
        <>
            {loader && 
            <div className="w-full h-[100vh] fixed top-0 flex justify-center items-center">
                <ThreeDotsLoader label={""}/>
            </div>
            }
            <div className="flex justify-center gap-5 flex-wrap p-5 mb-15">
                {(data ?? []).sort((a, b) => {
                    const oldest = new Date(a.createdAt).getTime()
                    const latest = new Date(b.createdAt).getTime()
                    return oldest - latest
                }).map((list) => <ListCard key={list.id} list={list} userId={userId} onError={setError}  setLoad={setLoader}/>)}
            </div>

            {isError && 
                <div className="fixed bottom-20 left-[50%] -translate-x-[50%]">
                    <p className="p-2 border rounded-2xl">{isError}</p>
                </div>
            }
            
            <NewlistInput setLoad={setLoader} onAddError={setError}/>
            
        </>
        
    )
}