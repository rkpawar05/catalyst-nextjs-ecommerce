import { NextResponse } from "next/server";

// GET /api/categories
// This route gets all product categories
export async function GET() {
    try {
        // Call DummyJSON to get categories
        const response = await fetch("https://dummyjson.com/products/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch categories" },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Categories API error:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching categories" },
            { status: 500 }
        );
    }
}
