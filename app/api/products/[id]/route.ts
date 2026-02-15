import { NextRequest, NextResponse } from "next/server";

// GET /api/products/[id]
// This route gets a single product by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // In Next.js 16, params is async and must be awaited
        const { id } = await params;

        // Call DummyJSON API to get single product
        const response = await fetch(`https://dummyjson.com/products/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Product fetch error:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching the product" },
            { status: 500 }
        );
    }
}
