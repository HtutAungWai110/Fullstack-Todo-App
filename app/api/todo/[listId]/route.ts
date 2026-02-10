import { NextResponse, NextRequest } from "next/server"
import getUser from "@/app/lib/getUserInfo";
import { getTodos } from "@/app/controllers/todoController";
import { createTodo } from "@/app/controllers/todoController";

export async function GET(
  req: NextRequest,
  {params} : {params: {listId: string}}
) {
    const {listId} = await params;

    try {
        const todos = await getTodos(listId);
        return NextResponse.json({
            message: "Success",
            data: todos
        }, {status: 200})

    }catch(e){
        return NextResponse.json({
            message: (e as Error).message
        })
    }
}

export async function POST(
  req: NextRequest,
  {params} : {params: {listId: string}}
) {
    const {listId} = await params;
    const user = await getUser();
    
    if (!user || typeof user === 'string') {
        return NextResponse.json({
            message: "Unauthorized"
        }, {status: 401})
    }
    
    const {id: userId} = user;
    const {title} = await req.json();

    try {
        const todo = await createTodo({userId, listId, title})
        return NextResponse.json({
            message: "Success",
            data: todo
        }, {status: 201})
    }catch(e){
        return NextResponse.json({
            message: (e as Error).message
        }, {status: 500})
    }
}