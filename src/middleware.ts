import { verifyJwtToken } from "./auth/verifyJwt";
import { NextResponse } from "next/server";

const AUTH_PAGES = [
    '/login',
    '/register',
]

const isAuthPage = (url: string) => AUTH_PAGES.some(page => page.startsWith(url));

export async function middleware(request: any) {
    const { url, nextUrl, cookies } = request;
    const { value: token } = cookies.get('token') ?? { value: null };

    const hasVerifiedToken = token && await verifyJwtToken(token);
    const isAuthPages = isAuthPage(nextUrl.pathname);

    if (isAuthPages) {
        if (!hasVerifiedToken) {
            const response = NextResponse.next();
            return response;
        } else {
            const response = NextResponse.redirect(new URL(`/`, url));
            return response;
        }
    }

    if (!hasVerifiedToken) {
        const searchparams = new URLSearchParams(nextUrl.pathname);
        return NextResponse.redirect(new URL(`/login?${searchparams}`, url))
    } else {
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        '/panel',
        '/login'
    ]
}
