import { NextResponse, NextRequest } from "next/server";
import { login } from "@/app/controllers/authController";
import generateToken from "@/app/lib/tokenGenerator";

export const POST = async(req: NextRequest) => {
    try {
        const {email, password} = await req.json();

        const user = await login({email, password});
        const token = generateToken(user);

        const response = NextResponse.json({
            message: "Login endpoint hit", 
            data: user, 
            status: 200});

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        })
        return response;
    } catch(e){
        return NextResponse.json(
            {message: (e as Error).message},
            {status: 400}
        );
    }
    
}
