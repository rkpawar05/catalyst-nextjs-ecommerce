import { NextRequest, NextResponse } from "next/server";
import type { LoginCredentials, AuthResponse } from "@/types/auth";

// POST /api/auth/login
// This API route handles user login
export async function POST(request: NextRequest) {
    try {
        // 1. Get login credentials from request body
        const body: LoginCredentials = await request.json();
        const { username, password } = body;

        // 2. Validate inputs
        if (!username || !password) {
            return NextResponse.json(
                { error: "Username and password are required" },
                { status: 400 }
            );
        }

        // 3. Call DummyJSON auth endpoint
        // This happens on the SERVER, not client - keeps API secure
        const response = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                expiresInMins: 60, // Token expires in 60 minutes
            }),
        });

        // 4. Check if login was successful
        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { error: errorData.message || "Invalid credentials" },
                { status: 401 }
            );
        }

        // 5. Get auth data from DummyJSON
        const data: AuthResponse = await response.json();

        // 6. Create response with user data (but NOT the tokens!)
        const responseData = {
            success: true,
            user: {
                id: data.id,
                username: data.username,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                image: data.image,
            },
        };

        // 7. Set HTTP-only cookie with access token
        // This is CRITICAL for security!
        const nextResponse = NextResponse.json(responseData, { status: 200 });

        // Set the access token cookie
        nextResponse.cookies.set("auth_token", data.accessToken, {
            httpOnly: true, // JavaScript cannot access this cookie (XSS protection)
            secure: process.env.NODE_ENV === "production", // HTTPS only in production
            sameSite: "lax", // CSRF protection
            maxAge: 60 * 60, // 1 hour (60 minutes * 60 seconds)
            path: "/", // Cookie available for all routes
        });

        // Set the refresh token cookie (for token refresh functionality)
        nextResponse.cookies.set("refresh_token", data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });

        return nextResponse;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "An error occurred during login" },
            { status: 500 }
        );
    }
}
