import { NextResponse } from "next/server";
import { register } from "@/app/controllers/authController";
export const POST = async(req: Request) => {
    try{
        const {username, email, password} = await req.json();
        const user = await register({username, email, password})
        return NextResponse.json({message: "Success", 
        data: user
    });
    } catch(e){
        return NextResponse.json(
            {message: (e as Error).message},
            {status: 400}
        );
    }
        
    
}
