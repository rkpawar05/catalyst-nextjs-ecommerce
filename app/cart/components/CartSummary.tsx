"use client";

import { useDispatch } from "react-redux";
import { clearCart } from "@/store/cartSlice";
import type { AppDispatch } from "@/store/store";
import { useState } from "react";
import styles from "./CartSummary.module.css";

interface CartSummaryProps {
    subtotal: number;
    totalItems: number;
}

export default function CartSummary({
    subtotal,
    totalItems,
}: CartSummaryProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [showModal, setShowModal] = useState(false);

    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    const handleClearCart = () => {
        setShowModal(true);
    };

    const confirmClearCart = () => {
        dispatch(clearCart());
        setShowModal(false);
    };

    const cancelClearCart = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className={styles.summary}>
                <h2 className={styles.title}>Order Summary</h2>

                <div className={styles.summaryLine}>
                    <span>Items ({totalItems})</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className={styles.summaryLine}>
                    <span>Estimated Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.totalLine}>
                    <span>Total</span>
                    <span className={styles.totalAmount}>${total.toFixed(2)}</span>
                </div>

                <button className={styles.checkoutBtn}>Proceed to Checkout</button>

                <button onClick={handleClearCart} className={styles.clearBtn}>
                    Clear Cart
                </button>
            </div>

            {showModal && (
                <div className={styles.modalOverlay} onClick={cancelClearCart}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h3 className={styles.modalTitle}>Clear Cart?</h3>
                        <p className={styles.modalMessage}>
                            Are you sure you want to remove all items from your cart?
                        </p>
                        <div className={styles.modalActions}>
                            <button className={styles.modalCancelBtn} onClick={cancelClearCart}>
                                Cancel
                            </button>
                            <button className={styles.modalConfirmBtn} onClick={confirmClearCart}>
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
