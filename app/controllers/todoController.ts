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

export const getLists = async (id: string) => {

    const lists = await prisma.list.findMany({
        where: {creator: id}
    })

    return lists;
}