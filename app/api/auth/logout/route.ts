import { NextRequest, NextResponse } from "next/server";

// POST /api/auth/logout
// This route logs out the user by clearing auth cookies
export async function POST(request: NextRequest) {
    try {
        // Create response
        const response = NextResponse.json(
            { success: true, message: "Logged out successfully" },
            { status: 200 }
        );

        // Clear the auth_token cookie by setting maxAge to 0
        response.cookies.set("auth_token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 0, // Setting maxAge to 0 deletes the cookie
            path: "/",
        });

        // Clear the refresh_token cookie
        response.cookies.set("refresh_token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 0,
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json(
            { error: "An error occurred during logout" },
            { status: 500 }
        );
    }
}
