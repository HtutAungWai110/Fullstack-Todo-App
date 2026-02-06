'use client'

import { useEffect, useState } from "react";
import { QueryList } from "../lib/queryList"
import { ThreeDotsLoader } from "@/components/Loader";
import NewlistInput from "@/components/addNewList";

import ListCard from "./listCard";

import { ListItemType } from "../lib/types";

interface ErrorObj {
    fetchError: string | null;
    addError: string | null;
    renameError: string | null;
    deleteError: string | null;
}

export default function Todos({ initData, userId }: { initData: ListItemType[]; userId: string }){
   
    const {data, isLoading, isPending, error} = QueryList({ initData, userId });

    const [isError, setError] = useState<ErrorObj>({
        fetchError: null,
        addError: null,
        renameError: null,
        deleteError: null
    })

    const [loader, setLoader] = useState<boolean>(false);

    useEffect(() => {
        console.log(data);
    }, [data])

    useEffect(() => {
        console.log(isError)
    }, [isError])


    const onAddError = (message: string) => {
        setError(prev => ({...prev, addError: message}))
    }

    const onRenameError = (message: string) => {
        setError(prev => ({...prev, renameError: message}))
    }

    const onDeleteError = (message: string) => {
        setError(prev => ({...prev, deleteError: message}))
    }
    

    if (isLoading || isPending){
        return(
            <div className="w-full h-[100vh] fixed top-0 flex justify-center items-center">
                <ThreeDotsLoader label={""}/>
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
                }).map((list) => <ListCard key={list.id} list={list} userId={userId} onRenameError={onRenameError} onDeleteError={onDeleteError} setLoad={setLoader}/>)}
            </div>
            
            <NewlistInput setLoad={setLoader} onAddError={onAddError}/>
            
        </>
        
    )
}