import { NextRequest, NextResponse } from "next/server";
import { deleteList, renameList } from "@/app/controllers/listController";

export async function PUT(
    req: NextRequest,
    {params} : {params: {userId: string, listId: string}}
){
    const {userId, listId} = await params;
    const {rename} = await req.json();

    

    try{
        const updatedList = await renameList(userId, listId, rename);
        return NextResponse.json({
            message: "Success",
            status: 200,
            data: updatedList
        })
    } catch(e){
        return NextResponse.json({
            message: (e as Error).message,
            status: 400
        })
    }

    



}

export async function DELETE(
    req: NextRequest,
    {params} : {params: {userId: string, listId: string}}
){
    const {userId, listId} = await params;
    

    try{
        const list = await deleteList(userId, listId);
        return NextResponse.json({
            message: "Delete Success",
            data: list,
            status: 200
        })
    } catch(e){
        return NextResponse.json({
            message: (e as Error).message,
            status: 400
        })
    }

    



}