import { NextResponse, type NextRequest } from 'next/server'

export const config = {
    matcher: [`/((?!api|_next/static|_next/image|.*\\/api|.*\\.png$|.*\\.jpg$|.*\\.ico$|.*\\.svg$).*)`]
}


export async function middleware(request: NextRequest) {
    if(process.env.NEXT_PUBLIC_HOST != request.nextUrl.host) {
        console.log(process.env.NEXT_PUBLIC_HOST, request.nextUrl.host)
        throw new Error('Invalid Host')
    }
}

