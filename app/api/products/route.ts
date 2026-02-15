import { NextRequest, NextResponse } from "next/server";

// GET /api/products
// This route handles product listing with pagination, sorting, and search
export async function GET(request: NextRequest) {
    try {
        // 1. Get query parameters from the URL
        const searchParams = request.nextUrl.searchParams;
        const limit = searchParams.get("limit") || "12"; // Default 12 products per page
        const skip = searchParams.get("skip") || "0"; // Default start from 0
        const sortBy = searchParams.get("sortBy") || ""; // Field to sort by
        const order = searchParams.get("order") || "asc"; // Sort order
        const search = searchParams.get("q") || ""; // Search query
        const category = searchParams.get("category") || ""; // Category filter

        // 2. Build DummyJSON URL with query parameters
        let apiUrl = "https://dummyjson.com/products";

        // If there's a category, use the category endpoint
        if (category) {
            apiUrl = `https://dummyjson.com/products/category/${encodeURIComponent(category)}`;
        }
        // If there's a search query, use the search endpoint
        else if (search) {
            apiUrl = `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}`;
        }

        // Add pagination parameters
        const urlParams = new URLSearchParams();
        urlParams.append("limit", limit);
        urlParams.append("skip", skip);

        // Add sorting if specified
        if (sortBy) {
            urlParams.append("sortBy", sortBy);
            urlParams.append("order", order);
        }

        // Combine URL with parameters
        // Category and search endpoints don't have query params, so use '?'
        // Only the base products endpoint might already have params
        const finalUrl = `${apiUrl}?${urlParams.toString()}`;

        // 3. Call DummyJSON API
        const response = await fetch(finalUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // 4. Check if request was successful
        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch products" },
                { status: response.status }
            );
        }

        // 5. Return products data
        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Products API error:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching products" },
            { status: 500 }
        );
    }
}
