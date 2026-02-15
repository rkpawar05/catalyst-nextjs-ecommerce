"use client";

import { useSelector } from "react-redux";
import { selectCartTotalItems } from "@/store/cartSlice";
import Link from "next/link";
import styles from "./CartBadge.module.css";

export default function CartBadge() {
    const totalItems = useSelector(selectCartTotalItems);

    return (
        <Link href="/cart" className={styles.cartLink}>
            <div className={styles.cartIcon}>
                🛒
                {totalItems > 0 && (
                    <span className={styles.badge}>{totalItems}</span>
                )}
            </div>
        </Link>
    );
}
