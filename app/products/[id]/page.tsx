import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "../components/AddToCartButton";
import styles from "./product.module.css";

// TypeScript interfaces
interface Dimensions {
    width: number;
    height: number;
    depth: number;
}

interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: Dimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    images: string[];
    thumbnail: string;
}

// Server Component - SSR for SEO
export default async function ProductDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Fetch product from API route
    const response = await fetch(`${baseUrl}/api/products/${id}`, {
        cache: "no-store", // Always get fresh data
    });

    if (!response.ok) {
        notFound(); // Show 404 page if product not found
    }

    const product: Product = await response.json();

    // Calculate average rating from reviews
    const avgRating = product.reviews.length > 0
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
        : product.rating;

    // Format date helper
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // Star rating component
    const StarRating = ({ rating }: { rating: number }) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= Math.round(rating) ? styles.starFilled : styles.starEmpty}>
                    ★
                </span>
            );
        }
        return <div className={styles.stars}>{stars}</div>;
    };

    return (
        <div className={styles.container}>
            {/* Breadcrumb Navigation */}
            <nav className={styles.breadcrumb}>
                <Link href="/products">← Back to Products</Link>
                <span className={styles.separator}>/</span>
                <span>{product.category}</span>
                <span className={styles.separator}>/</span>
                <span>{product.title}</span>
            </nav>

            {/* Main Product Section */}
            <div className={styles.productMain}>
                {/* Image Gallery */}
                <div className={styles.imageSection}>
                    <div className={styles.mainImage}>
                        <img
                            src={product.images[0] || product.thumbnail}
                            alt={product.title}
                        />
                    </div>
                    {product.images.length > 1 && (
                        <div className={styles.thumbnails}>
                            {product.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`${product.title} view ${index + 1}`}
                                    className={styles.thumbnail}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className={styles.detailsSection}>
                    <div className={styles.brandBadge}>{product.brand}</div>
                    <h1 className={styles.title}>{product.title}</h1>

                    <div className={styles.ratingRow}>
                        <StarRating rating={avgRating} />
                        <span className={styles.ratingText}>
                            {avgRating.toFixed(1)} ({product.reviews.length} reviews)
                        </span>
                    </div>

                    <div className={styles.priceSection}>
                        <span className={styles.price}>${product.price.toFixed(2)}</span>
                        {product.discountPercentage > 0 && (
                            <span className={styles.discount}>
                                -{product.discountPercentage.toFixed(0)}% OFF
                            </span>
                        )}
                    </div>

                    <div className={styles.stockStatus}>
                        <span className={product.stock > 0 ? styles.inStock : styles.outOfStock}>
                            {product.availabilityStatus}
                        </span>
                        <span className={styles.stockCount}>
                            {product.stock} units available
                        </span>
                    </div>

                    <p className={styles.description}>{product.description}</p>

                    <div className={styles.tags}>
                        {product.tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className={styles.specs}>
                        <div className={styles.specItem}>
                            <span className={styles.specLabel}>SKU:</span>
                            <span className={styles.specValue}>{product.sku}</span>
                        </div>
                        <div className={styles.specItem}>
                            <span className={styles.specLabel}>Min. Order:</span>
                            <span className={styles.specValue}>
                                {product.minimumOrderQuantity} units
                            </span>
                        </div>
                    </div>

                    {product.stock > 0 ? (
                        <AddToCartButton
                            product={{
                                id: product.id,
                                title: product.title,
                                price: product.price,
                                thumbnail: product.thumbnail,
                                rating: product.rating,
                                stock: product.stock,
                            }}
                        />
                    ) : (
                        <button className={styles.outOfStockButton} disabled>
                            Out of Stock
                        </button>
                    )}
                </div>
            </div>

            {/* Specifications Section */}
            <div className={styles.specificationsSection}>
                <h2>Product Specifications</h2>
                <div className={styles.specsGrid}>
                    <div className={styles.specCard}>
                        <h3>Dimensions</h3>
                        <p>Width: {product.dimensions.width} cm</p>
                        <p>Height: {product.dimensions.height} cm</p>
                        <p>Depth: {product.dimensions.depth} cm</p>
                    </div>
                    <div className={styles.specCard}>
                        <h3>Weight</h3>
                        <p>{product.weight} kg</p>
                    </div>
                    <div className={styles.specCard}>
                        <h3>Warranty</h3>
                        <p>{product.warrantyInformation}</p>
                    </div>
                    <div className={styles.specCard}>
                        <h3>Shipping</h3>
                        <p>{product.shippingInformation}</p>
                    </div>
                    <div className={styles.specCard}>
                        <h3>Return Policy</h3>
                        <p>{product.returnPolicy}</p>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className={styles.reviewsSection}>
                <h2>Customer Reviews ({product.reviews.length})</h2>
                {product.reviews.length > 0 ? (
                    <div className={styles.reviewsList}>
                        {product.reviews.map((review, index) => (
                            <div key={index} className={styles.reviewCard}>
                                <div className={styles.reviewHeader}>
                                    <div>
                                        <StarRating rating={review.rating} />
                                        <p className={styles.reviewerName}>
                                            {review.reviewerName}
                                        </p>
                                    </div>
                                    <span className={styles.reviewDate}>
                                        {formatDate(review.date)}
                                    </span>
                                </div>
                                <p className={styles.reviewComment}>{review.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className={styles.noReviews}>No reviews yet. Be the first to review this product!</p>
                )}
            </div>
        </div>
    );
}
