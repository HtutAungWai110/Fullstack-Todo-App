import z from "zod";
import hashPassword from "../lib/hashPassword";
import bcrypt from "bcryptjs";

import { prisma } from "../lib/db";

const newUserSchema = z.object({
    username: z.string().min(4),
    email: z.string(),
    password: z.string().min(8)
});

const loginUserSchema = z.object({
    email: z.string(),
    password: z.string().min(8)
})


export const register = async (data: {
    username: string,
    email: string,
    password: string
    }) => {
        const result = newUserSchema.safeParse(data);
        if (!result.success){
            throw new Error("Validation error");
        }

        const userExist = await prisma.user.findUnique({
            where: {email: data.email}
        })

        if (userExist){
            throw new Error("User with this email already exists");
        }

        
        const hashedPw = await hashPassword(data.password);
        data.password = hashedPw;

        const user = await prisma.user.create({
            data: data
        })

        return user;

}

export const login = async (data: {
    email: string,
    password: string
}) => {
    const result = loginUserSchema.safeParse(data);
    if (!result.success){
        throw new Error("Validation error");
    }

    const user = await prisma.user.findUnique({
        where: {email: data.email}
    })

    if(!user){
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if(!isPasswordValid){
        throw new Error("Invalid email or password");
    }

    return {id: user.id, username: user.username, email: user.email};
}