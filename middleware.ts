import { NextRequest, NextResponse } from "next/server";

// Middleware runs BEFORE pages load - it's perfect for authentication!
export function middleware(request: NextRequest) {
    // 1. Get the auth token from cookies
    const authToken = request.cookies.get("auth_token")?.value;

    // 2. Get the current path
    const { pathname } = request.nextUrl;

    // 3. Check if user is trying to access login page
    if (pathname === "/login") {
        // If user is already logged in, redirect to products
        if (authToken) {
            return NextResponse.redirect(new URL("/products", request.url));
        }
        // If not logged in, allow access to login page
        return NextResponse.next();
    }

    // 4. Check if user is trying to access protected routes
    if (pathname.startsWith("/products") || pathname.startsWith("/cart")) {
        // If user is NOT logged in, redirect to login
        if (!authToken) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        // If logged in, allow access
        return NextResponse.next();
    }

    // 5. For all other routes, allow access
    return NextResponse.next();
}

// Configure which routes should run the middleware
export const config = {
    matcher: [
        "/login",
        "/products/:path*", // Protects /products and all sub-routes
        "/cart/:path*", // Protects /cart and all sub-routes
    ],
};
