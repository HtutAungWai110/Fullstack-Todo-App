import { NextResponse, NextRequest } from "next/server";
import getUser from "@/app/lib/getUserInfo";
import { markDone } from "@/app/controllers/todoController";

export async function PUT(
    req: NextRequest,
    {params} : {params:  {listId: string}}
){
    const {listId} = await params;
    const {id, mark} = await req.json() as {id: string, mark: boolean};
    const {id: userId} = await getUser() as {id: string};

    try {
        const data = await markDone({id, listId, userId, mark});
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