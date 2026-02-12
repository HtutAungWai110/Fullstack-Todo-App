import { NextRequest, NextResponse } from "next/server";
import getUser from "@/app/lib/getUserInfo";
import { updateDue } from "@/app/controllers/todoController";

export async function PUT(
    req: NextRequest,
    {params} : {params: {listId: string}}
) {
    const {listId} = await params;
    const {id, due, oldDue} = await req.json();
    const {id: userId} = await getUser() as {id: string};

    try {
        const updatedDue = await updateDue({id, listId, userId, due});
        return NextResponse.json({
            message: "Due date updated successfully",
            data: updatedDue}, {status: 200});
    } catch(e){
        return NextResponse.json({
            message: "faild to update due date",
            due: oldDue
        }, {status: 500
        })
    }

}