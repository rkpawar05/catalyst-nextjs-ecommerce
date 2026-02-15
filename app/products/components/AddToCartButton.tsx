"use client";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { addToCart } from "@/store/cartSlice";
import type { Product } from "@/types/product";
import type { AppDispatch } from "@/store/store";
import styles from "./AddToCartButton.module.css";

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [isAdding, setIsAdding] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        dispatch(addToCart(product));

        // Show success feedback
        setTimeout(() => {
            setIsAdding(false);
            setShowSuccess(true);

            // Hide success message after 2 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 2000);
        }, 300);
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdding || showSuccess}
            className={`${styles.addButton} ${showSuccess ? styles.success : ""}`}
        >
            {showSuccess ? "✓ Added!" : isAdding ? "Adding..." : "Add to Cart"}
        </button>
    );
}
