// This is a SERVER COMPONENT (NO "use client")
// It fetches data on the server before rendering

import type { ProductsResponse, Category } from "@/types/product";
import type { Metadata } from "next";
import Link from "next/link";
import Filter from "./components/Filter";
import SortSelect from "./components/SortSelect";
import Pagination from "./components/Pagination";
import LogoutButton from "./components/LogoutButton";
import AddToCartButton from "./components/AddToCartButton";
import CartBadge from "./components/CartBadge";
import styles from "./products.module.css";

// Define the shape of searchParams
interface ProductsPageProps {
    searchParams: {
        category?: string;
        sortBy?: string;
        order?: string;
        skip?: string;
        limit?: string;
        q?: string;
    };
}

// Generate metadata for SEO
export async function generateMetadata({
    searchParams,
}: {
    searchParams: ProductsPageProps["searchParams"];
}): Promise<Metadata> {
    const params = await searchParams;
    const category = params.category || "all";
    const page = params.skip ? Math.floor(Number(params.skip) / 12) + 1 : 1;

    let title = "Products";
    if (category !== "all") {
        title = `${category.charAt(0).toUpperCase() + category.slice(1)} Products`;
    }
    if (page > 1) {
        title += ` - Page ${page}`;
    }

    return {
        title,
        description: `Browse our collection of ${category !== "all" ? category : ""} products. Shop quality items with secure checkout and fast shipping.`,
        openGraph: {
            title,
            description: `Browse ${category} products on Catalyst E-Commerce`,
            images: ["/og-products.png"],
        },
    };
}


// Helper function to fetch products
async function getProducts(searchParams: ProductsPageProps["searchParams"]) {
    const {
        category,
        sortBy,
        order,
        skip = "0",
        limit = "12",
        q,
    } = searchParams;

    // ✅ CORRECT: Use API route handlers (not direct DummyJSON calls)
    // Server components during SSR need absolute URL to call API routes
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    let apiUrl = "";

    if (category) {
        // Category filtering via API route
        const params = new URLSearchParams({
            category,
            limit,
            skip
        });
        if (sortBy) params.append("sortBy", sortBy);
        if (order) params.append("order", order);
        apiUrl = `${baseUrl}/api/products?${params.toString()}`;
    } else if (q) {
        // Search via API route
        const params = new URLSearchParams({
            q,
            limit,
            skip
        });
        if (sortBy) params.append("sortBy", sortBy);
        if (order) params.append("order", order);
        apiUrl = `${baseUrl}/api/products?${params.toString()}`;
    } else {
        // All products with pagination/sorting via API route
        const params = new URLSearchParams({
            limit,
            skip
        });
        if (sortBy) params.append("sortBy", sortBy);
        if (order) params.append("order", order);
        apiUrl = `${baseUrl}/api/products?${params.toString()}`;
    }

    const response = await fetch(apiUrl, {
        cache: "no-store", // Disable cache for fresh data
    });

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    const data: ProductsResponse = await response.json();
    return data;
}

// Helper function to fetch categories
async function getCategories() {
    // Fetch categories via API route
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/categories`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }

    return response.json();
}

// Main Products Page Component (SERVER COMPONENT)
export default async function ProductsPage({
    searchParams,
}: ProductsPageProps) {
    // Await searchParams since it's a Promise in Next.js 15+
    const params = await searchParams;

    // Fetch data on the server
    const productsData: ProductsResponse = await getProducts(params);
    const categoriesData: Category[] = await getCategories();

    const currentSkip = parseInt(params.skip || "0");
    const currentLimit = parseInt(params.limit || "12");

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Products</h1>
                    <p className={styles.subtitle}>
                        Showing {productsData.products.length} of {productsData.total}{" "}
                        products
                    </p>
                </div>
                <div className={styles.headerActions}>
                    <CartBadge />
                    <LogoutButton />
                </div>
            </div>

            {/* Controls: Filter and Sort */}
            <div className={styles.controls}>
                <Filter categories={categoriesData} />
                <SortSelect />
            </div>

            {/* Products Grid */}
            <div className={styles.grid}>
                {productsData.products.map((product) => (
                    <div key={product.id} className={styles.card}>
                        <Link href={`/products/${product.id}`} className={styles.cardLink}>
                            <div className={styles.imageContainer}>
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className={styles.productImage}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.productTitle}>{product.title}</h3>
                                <p className={styles.productBrand}>{product.brand}</p>
                                <div className={styles.priceContainer}>
                                    <span className={styles.price}>${product.price.toFixed(2)}</span>
                                    {product.discountPercentage > 0 && (
                                        <span className={styles.discount}>
                                            -{product.discountPercentage.toFixed(0)}%
                                        </span>
                                    )}
                                </div>
                                <div className={styles.rating}>
                                    ⭐ {product.rating.toFixed(1)}
                                </div>
                            </div>
                        </Link>
                        <div className={styles.cardActions}>
                            <AddToCartButton product={product} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <Pagination
                total={productsData.total}
                limit={currentLimit}
                currentSkip={currentSkip}
            />
        </div>
    );
}
