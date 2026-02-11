import { prisma } from "../lib/db";

export const getTodos = async (listId : string) =>{
    const todos = await prisma.todoItem.findMany({
        where : {listId: listId}
    })

    if (!todos) throw new Error("Todos not found!");

    return todos;
}

export const createTodo = async (payload: {
    userId: string,
    listId: string,
    title: string,
    due: string
}) => {
    const {userId, listId, title, due} = payload;
    const listExist = await prisma.list.findUnique({
        where: {id: listId, creator: userId}
    })

    if(!listExist) throw new Error("Cannot add to unexisting list!");

    const newTodo = await prisma.todoItem.create({
        data: {
            listId: listId,
            creator: userId,
            title: title,
            due: new Date(due)
        }
    })

    return newTodo;
}

export const deleteTodo = async (payload: {
    userId: string,
    listId: string,
    todoId: string
}) => {
    const {userId, listId, todoId} = payload;
    const todoExist = await prisma.todoItem.findFirst({
        where: {
            id: todoId,
            listId: listId,
            creator: userId
        }
    })

    if (!todoExist) throw new Error("Todo not found!");

    const deletedTodo = await prisma.todoItem.delete({
        where: {
            id: todoId
        }
    })
    
    return deletedTodo;
}