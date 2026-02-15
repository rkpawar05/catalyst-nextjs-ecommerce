"use client";

import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/store/cartSlice";
import type { CartItem as CartItemType } from "@/types/cart";
import type { AppDispatch } from "@/store/store";
import styles from "./CartItem.module.css";

interface CartItemProps {
    item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
    const dispatch = useDispatch<AppDispatch>();

    const handleIncrement = () => {
        dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
    };

    const handleDecrement = () => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeFromCart(item.id));
        }
    };

    const handleRemove = () => {
        dispatch(removeFromCart(item.id));
    };

    const itemSubtotal = (item.price * item.quantity).toFixed(2);

    return (
        <div className={styles.cartItem}>
            <div className={styles.itemImage}>
                <img src={item.thumbnail} alt={item.title} />
            </div>

            <div className={styles.itemDetails}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                {item.brand && <p className={styles.itemBrand}>{item.brand}</p>}
                <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
            </div>

            <div className={styles.itemQuantity}>
                <button
                    onClick={handleDecrement}
                    className={styles.quantityBtn}
                    aria-label="Decrease quantity"
                >
                    -
                </button>
                <span className={styles.quantity}>{item.quantity}</span>
                <button
                    onClick={handleIncrement}
                    className={styles.quantityBtn}
                    aria-label="Increase quantity"
                >
                    +
                </button>
            </div>

            <div className={styles.itemSubtotal}>
                <p className={styles.subtotalLabel}>Subtotal</p>
                <p className={styles.subtotalAmount}>${itemSubtotal}</p>
            </div>

            <button
                onClick={handleRemove}
                className={styles.removeBtn}
                aria-label="Remove item"
            >
                🗑️
            </button>
        </div>
    );
}
