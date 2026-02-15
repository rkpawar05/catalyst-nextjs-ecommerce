import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartState } from "@/types/cart";
import type { Product } from "@/types/product";

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Add item to cart or increment quantity if it already exists
        addToCart: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            const existingItem = state.items.find((item) => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    quantity: 1,
                    brand: product.brand,
                    discountPercentage: product.discountPercentage,
                });
            }
        },

        // Remove item from cart completely
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },

        // Update quantity of a specific item
        updateQuantity: (
            state,
            action: PayloadAction<{ id: number; quantity: number }>
        ) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((item) => item.id === id);

            if (item) {
                if (quantity <= 0) {
                    // Remove item if quantity is 0 or negative
                    state.items = state.items.filter((item) => item.id !== id);
                } else {
                    item.quantity = quantity;
                }
            }
        },

        // Clear all items from cart
        clearCart: (state) => {
            state.items = [];
        },

        // Load cart from localStorage
        loadCartFromStorage: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCartFromStorage,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const selectCartTotalItems = (state: { cart: CartState }) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state: { cart: CartState }) =>
    state.cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

export default cartSlice.reducer;
