import { NextResponse, NextRequest } from "next/server"
import getUser from "@/app/lib/getUserInfo";
import { getTodos } from "@/app/controllers/todoController";
import { createTodo } from "@/app/controllers/todoController";
import { deleteTodo } from "@/app/controllers/todoController";

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
    
    const {id: userId} = await getUser() as {id: string};
    const {title, due} = await req.json();

    try {
        const todo = await createTodo({userId, listId, title, due})
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

export async function DELETE(
    req: NextRequest,
    {params} : {params: {listId: string}}
) {
    const {listId} = await params;
    const {id: userId} = await getUser() as {id: string};
    const {id: todoId} = await req.json();

    try {
        const deletedTodo = await deleteTodo({userId, listId, todoId});
        return NextResponse.json({
            message: "Todo deleted successfully",
            data: deletedTodo
        }, {status: 200})
    } catch(e){
        return NextResponse.json({
            message: (e as Error).message
        }, {status: 500})
    }

}