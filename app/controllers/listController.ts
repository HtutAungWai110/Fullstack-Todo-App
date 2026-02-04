import { prisma } from "../lib/db";
import z from "zod";

const listSchema = z.object({
    id: z.string(),
    input: z.string().trim().min(1, "Input cannot be empty")
})

export const createNewList = async (id: string, input: string) => {
    const result = listSchema.safeParse({id, input});
    if (!result.success){
        throw new Error ("Something went wrong")
    }
    const exist = await prisma.user.findUnique({
        where: {id: id}
    })

    if(!exist) throw new Error ("User doesn't exist");

    const newList = await prisma.list.create({
        data: {
            title: input,
            creator: id
        }
    })

    return {newList}
}

export const getLists = async (userId: string) => {

    const lists = await prisma.list.findMany({
        where: {creator: userId}
    })

    return lists;
}

export const renameList = async (userId: string, listId: string, rename: string) => {
    const list = await prisma.list.update({
        where: {id: listId, creator: userId},
        data: {
            title: rename
        }
    })

    if(!list) throw new Error("LIST NOT FOUND!")

    return list;
    
}

export const deleteList = async (userId: string, listId:string) => {
    const list = await prisma.list.delete({
        where: {id: listId, creator: userId}
    })

    if(!list) throw new Error("LIST NOT FOUND!")
    
    return list

}