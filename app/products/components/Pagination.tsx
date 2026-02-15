"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "../products.module.css";

interface PaginationProps {
    total: number;
    limit: number;
    currentSkip: number;
}

export default function Pagination({
    total,
    limit,
    currentSkip,
}: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = Math.floor(currentSkip / limit) + 1;
    const totalPages = Math.ceil(total / limit);

    const handlePageChange = (newSkip: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("skip", newSkip.toString());
        params.set("limit", limit.toString());
        router.push(`/products?${params.toString()}`);
    };

    const handlePrevious = () => {
        const newSkip = Math.max(0, currentSkip - limit);
        handlePageChange(newSkip);
    };

    const handleNext = () => {
        const newSkip = currentSkip + limit;
        if (newSkip < total) {
            handlePageChange(newSkip);
        }
    };

    return (
        <div className={styles.paginationContainer}>
            <button
                onClick={handlePrevious}
                disabled={currentSkip === 0}
                className={styles.paginationButton}
            >
                ← Previous
            </button>

            <span className={styles.paginationInfo}>
                Page {currentPage} of {totalPages}
            </span>

            <button
                onClick={handleNext}
                disabled={currentSkip + limit >= total}
                className={styles.paginationButton}
            >
                Next →
            </button>
        </div>
    );
}
