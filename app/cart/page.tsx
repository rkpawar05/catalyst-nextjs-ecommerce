"use client";

import { useSelector } from "react-redux";
import {
    selectCartItems,
    selectCartSubtotal,
    selectCartTotalItems,
} from "@/store/cartSlice";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import Link from "next/link";
import styles from "./cart.module.css";

export default function CartPage() {
    const cartItems = useSelector(selectCartItems);
    const subtotal = useSelector(selectCartSubtotal);
    const totalItems = useSelector(selectCartTotalItems);

    if (cartItems.length === 0) {
        return (
            <div className={styles.pageWrapper}>
                <div className={styles.emptyCart}>
                    <div className={styles.emptyContent}>
                        <div className={styles.emptyIcon}>🛒</div>
                        <h1 className={styles.emptyTitle}>Your cart is empty</h1>
                        <p className={styles.emptySubtitle}>
                            Add some products to get started!
                        </p>
                        <Link href="/products" className={styles.continueBtn}>
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Shopping Cart</h1>
                    <Link href="/products" className={styles.backLink}>
                        ← Continue Shopping
                    </Link>
                </div>

                <div className={styles.cartLayout}>
                    <div className={styles.cartItems}>
                        {cartItems.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>

                    <div className={styles.cartSummaryContainer}>
                        <CartSummary subtotal={subtotal} totalItems={totalItems} />
                    </div>
                </div>
            </div>
        </div>
    );
}
