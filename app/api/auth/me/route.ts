import { NextRequest, NextResponse } from "next/server";

// GET /api/auth/me
// This route gets the current authenticated user's information
export async function GET(request: NextRequest) {
    try {
        // 1. Get the auth token from HTTP-only cookie
        const authToken = request.cookies.get("auth_token")?.value;

        // 2. Check if user is authenticated
        if (!authToken) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // 3. Call DummyJSON /auth/me endpoint with the token
        // This verifies the token is valid and gets user data
        const response = await fetch("https://dummyjson.com/auth/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${authToken}`, // Send token in Authorization header
            },
        });

        // 4. Check if request was successful
        if (!response.ok) {
            // Token is invalid or expired
            return NextResponse.json(
                { error: "Invalid or expired token" },
                { status: 401 }
            );
        }

        // 5. Return user data
        const userData = await response.json();
        return NextResponse.json(userData, { status: 200 });
    } catch (error) {
        console.error("Get user error:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching user data" },
            { status: 500 }
        );
    }
}
