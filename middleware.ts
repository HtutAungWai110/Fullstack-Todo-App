import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ['/', '/login', '/signup'];
const AUTH_PATHS = ['/dashboard', '/profile'];

export default async function middleware(req: NextRequest){
    const {pathname} = req.nextUrl;

    const token = req.cookies.get('token')?.value;

    const isPublicPath = PUBLIC_PATHS.includes(pathname);
    const isProtectedPath = AUTH_PATHS.includes(pathname);

    if(!token && isProtectedPath){
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if(token && isPublicPath){
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    
    
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/dashboard/:path*',
    '/profile/:path*',
  ],
}
