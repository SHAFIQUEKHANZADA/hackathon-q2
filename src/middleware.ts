import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;  

    const isProtectedPath = path === '/account/profile';  
    const token = request.cookies.get('token')?.value;  


    if (isProtectedPath && !token) {
        return NextResponse.redirect(new URL('/account/login', request.url));
    }
}

export const config = {
    matcher: ['/account/profile'],  
};
