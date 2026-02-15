"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useEffect } from "react";
import { loadCartFromStorage } from "@/store/cartSlice";

export default function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Load cart from localStorage on client-side mount
        try {
            const savedCart = localStorage.getItem("catalyst_cart");
            if (savedCart) {
                const cartItems = JSON.parse(savedCart);
                store.dispatch(loadCartFromStorage(cartItems));
            }
        } catch (error) {
            console.error("Failed to load cart from localStorage:", error);
        }

        // Subscribe to store changes and save to localStorage
        const unsubscribe = store.subscribe(() => {
            try {
                const state = store.getState();
                localStorage.setItem(
                    "catalyst_cart",
                    JSON.stringify(state.cart.items)
                );
            } catch (error) {
                console.error("Failed to save cart to localStorage:", error);
            }
        });

        return () => unsubscribe();
    }, []);

    return <Provider store={store}>{children}</Provider>;
}
