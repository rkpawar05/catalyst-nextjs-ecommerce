import { NextRequest, NextResponse } from "next/server";

// GET /api/products/category/[category]
// This route gets products filtered by category
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ category: string }> }
) {
    try {
        // In Next.js 16, params is async and must be awaited
        const { category } = await params;
        const searchParams = request.nextUrl.searchParams;
        const limit = searchParams.get("limit") || "12";
        const skip = searchParams.get("skip") || "0";

        // Build URL with pagination
        const apiUrl = `https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;

        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch products for this category" },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Category products API error:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching category products" },
            { status: 500 }
        );
    }
}
