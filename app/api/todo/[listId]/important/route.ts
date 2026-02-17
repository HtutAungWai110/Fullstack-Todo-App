import { NextResponse, NextRequest } from "next/server";
import getUser from "@/app/lib/getUserInfo";
import { markImportant } from "@/app/controllers/todoController";

export async function PUT(
    req: NextRequest,
    {params} : {params:  {listId: string}}
){
    const {listId} = await params;
    const {id, important} = await req.json() as {id: string, important: boolean};
    const {id: userId} = await getUser() as {id: string};

    try {
        const data = await markImportant({id, listId, userId, important});
        return NextResponse.json({
            message: "done",
            data: data
        }, {status: 200})
    } catch (e){
        return NextResponse.json({
            message: (e as Error).message
        }, {status: 400})
    }
    
    
}