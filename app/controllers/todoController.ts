import { prisma } from "../lib/db";
import z from "zod";


export const getTodos = async (listId : string, userId: string) =>{

    const listExist = await prisma.list.findUnique({
        where: {id: listId, creator: userId}
    })


    if (!listExist) throw new Error("Not found!");

    const todos = await prisma.todoItem.findMany({
        where : {listId: listId, creator: userId}
    })

    if (!todos) throw new Error("Not found!");

    return todos;
}

export const createTodo = async (payload: {
    userId: string,
    listId: string,
    title: string,
    due: string
}) => {

    const todoSchema = z.object({
        userId: z.string(),
        listId: z.string(),
        title: z.string(),
        due: z.string()
    })
    const result = todoSchema.safeParse(payload);
    if(!result.success){
        throw new Error("Validation Error")
    }
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

export const renameTodo = async (payload: {
    id: string,
    listId: string,
    userId: string,
    rename: string,
}) => {
    const {id, listId, userId, rename} = payload;
    const todoExist = await prisma.todoItem.findFirst({
        where: {
            id: id,
            listId: listId,
            creator: userId
        }
    });
    if(!todoExist) throw new Error("Todo not found!");

    const renamed = await prisma.todoItem.update({
        where: {id: id, listId: listId, creator: userId},
        data: {title: rename, lastUpdated: new Date()}
    })
    return renamed;
}

export const updateDue = async (payload: {
    id: string,
    listId: string,
    userId: string,
    due: string
}) => {
    const {id, listId, userId, due} = payload;
    const todoExist = await prisma.todoItem.findFirst({
        where: {
            id: id,
            listId: listId,
            creator: userId
        }
    });
    if(!todoExist) throw new Error("Todo not found!");

    const updatedDue = await prisma.todoItem.update({
        where: {id: id, listId: listId, creator: userId},
        data: {due: new Date(due), lastUpdated: new Date()}
    })
    return updatedDue;
}

export const markDone = async (payload: {
    id: string,
    listId: string,
    userId: string,
    mark: boolean
}) => {
    const {id, listId, userId, mark} = payload;
    const todoExist = await prisma.todoItem.findFirst({
        where: {
            id: id,
            listId: listId,
            creator: userId
        }
    });
    if(!todoExist) throw new Error("Todo not found!");

    const todo = await prisma.todoItem.update({
        where: {id: id, listId: listId, creator: userId},
        data: {
            completed: mark,
            lastUpdated: new Date()
        }
    })

    return todo;

}

export const markImportant = async (payload: {
    id: string,
    listId: string,
    userId: string,
    important: boolean
}) => {
    const {id, listId, userId, important} = payload;
    const todoExist = await prisma.todoItem.findFirst({
        where: {
            id: id,
            listId: listId,
            creator: userId
        }
    });
    if(!todoExist) throw new Error("Todo not found!");

    const todo = await prisma.todoItem.update({
        where: {id: id, listId: listId, creator: userId},
        data: {
            important: important,
            lastUpdated: new Date()
        }
    })

    return todo;
}