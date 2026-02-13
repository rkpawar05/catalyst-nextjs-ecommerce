import { NextRequest, NextResponse } from "next/server";
import type { RefreshResponse } from "@/types/auth";

// POST /api/auth/refresh
// This route refreshes the access token using the refresh token
export async function POST(request: NextRequest) {
    try {
        // 1. Get refresh token from cookie
        const refreshToken = request.cookies.get("refresh_token")?.value;

        // 2. Check if refresh token exists
        if (!refreshToken) {
            return NextResponse.json(
                { error: "No refresh token found" },
                { status: 401 }
            );
        }

        // 3. Call DummyJSON refresh endpoint
        const response = await fetch("https://dummyjson.com/auth/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refreshToken,
                expiresInMins: 60, // New token expires in 60 minutes
            }),
        });

        // 4. Check if refresh was successful
        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to refresh token" },
                { status: 401 }
            );
        }

        // 5. Get new tokens
        const data: RefreshResponse = await response.json();

        // 6. Update cookies with new tokens
        const nextResponse = NextResponse.json(
            { success: true, message: "Token refreshed successfully" },
            { status: 200 }
        );

        // Update access token cookie
        nextResponse.cookies.set("auth_token", data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60, // 1 hour
            path: "/",
        });

        // Update refresh token cookie
        nextResponse.cookies.set("refresh_token", data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });

        return nextResponse;
    } catch (error) {
        console.error("Token refresh error:", error);
        return NextResponse.json(
            { error: "An error occurred while refreshing token" },
            { status: 500 }
        );
    }
}
