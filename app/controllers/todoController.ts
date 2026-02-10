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
    title: string
}) => {
    const {userId, listId, title} = payload;
    const listExist = await prisma.list.findUnique({
        where: {id: listId, creator: userId}
    })

    if(!listExist) throw new Error("Cannot add to unexisting list!");

    const newTodo = await prisma.todoItem.create({
        data: {
            listId: listId,
            creator: userId,
            title: title
        }
    })

    return newTodo;
}