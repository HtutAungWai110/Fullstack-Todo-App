import { NextRequest, NextResponse } from "next/server";
import getUser from "@/app/lib/getUserInfo";
import { renameTodo } from "@/app/controllers/todoController";

export async function PUT(
    req: NextRequest,
    {params} : {params: {listId: string}}
) {
    const {listId} = await params;
    const {id, rename, oldname} = await req.json();
    const {id: userId} = await getUser() as {id: string};

    try {
        const renamed = await renameTodo({id, listId, userId, rename});
        return NextResponse.json({
            message: "Todo renamed successfully",
            title: renamed.title
        }, {status: 200})
    } catch(e){
        return NextResponse.json({
            message: `Failed to rename ${oldname} to ${rename}`,
            title: oldname
        }, {status: 500})
    }

}