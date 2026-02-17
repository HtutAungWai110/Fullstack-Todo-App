import { getTodos } from "@/app/controllers/todoController";

import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  {params} : {params: {listId: string, userId: string}}
) {
    const {listId, userId} = await params;

    try {
        const todos = await getTodos(listId, userId);
        return NextResponse.json({
            message: "Success",
            data: todos
        }, {status: 200})

    }catch(e){
        return NextResponse.json({
            message: (e as Error).message
        }, {status: 500})
    }
}