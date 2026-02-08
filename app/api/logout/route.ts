import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const POST = async () => {
    const cookieStore = await cookies();
    try{
        cookieStore.set('token', '', {
            httpOnly: true,
            expires: new Date(0),
            path: "/"
        })
        return NextResponse.json({
        message: "Logged out"
        }, {status: 200})
    }catch(e){
        return NextResponse.json({
            message: "Something went wrong!"
        }, {status: 400})
    }

    
}