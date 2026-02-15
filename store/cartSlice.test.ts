import cartReducer, {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    selectCartItems,
    selectCartTotalItems,
    selectCartSubtotal,
} from "./cartSlice";
import type { CartState } from "@/types/cart";
import type { Product } from "@/types/product";

describe("cartSlice", () => {
    const initialState: CartState = {
        items: [],
    };

    const mockProduct: Product = {
        id: 1,
        title: "Test Product",
        price: 99.99,
        thumbnail: "test.jpg",
        brand: "Test Brand",
        description: "Test description",
        discountPercentage: 10,
        rating: 4.5,
        stock: 100,
        category: "test",
        images: ["test.jpg"],
    };

    it("should return the initial state", () => {
        expect(cartReducer(undefined, { type: "unknown" })).toEqual(
            initialState
        );
    });

    describe("addToCart", () => {
        it("should add a new item to cart", () => {
            const actual = cartReducer(initialState, addToCart(mockProduct));
            expect(actual.items).toHaveLength(1);
            expect(actual.items[0]).toEqual({ ...mockProduct, quantity: 1 });
        });

        it("should increment quantity if item already exists", () => {
            const stateWithItem: CartState = {
                items: [{ ...mockProduct, quantity: 1 }],
            };
            const actual = cartReducer(stateWithItem, addToCart(mockProduct));
            expect(actual.items).toHaveLength(1);
            expect(actual.items[0].quantity).toBe(2);
        });
    });

    describe("removeFromCart", () => {
        it("should remove item from cart", () => {
            const stateWithItem: CartState = {
                items: [{ ...mockProduct, quantity: 2 }],
            };
            const actual = cartReducer(stateWithItem, removeFromCart(1));
            expect(actual.items).toHaveLength(0);
        });
    });

    describe("updateQuantity", () => {
        it("should update item quantity", () => {
            const stateWithItem: CartState = {
                items: [{ ...mockProduct, quantity: 1 }],
            };
            const actual = cartReducer(
                stateWithItem,
                updateQuantity({ id: 1, quantity: 5 })
            );
            expect(actual.items[0].quantity).toBe(5);
        });

        it("should not allow quantity less than 1", () => {
            const stateWithItem: CartState = {
                items: [{ ...mockProduct, quantity: 2 }],
            };
            const actual = cartReducer(
                stateWithItem,
                updateQuantity({ id: 1, quantity: 0 })
            );
            expect(actual.items[0].quantity).toBe(1);
        });
    });

    describe("clearCart", () => {
        it("should clear all items from cart", () => {
            const stateWithItems: CartState = {
                items: [
                    { ...mockProduct, quantity: 2 },
                    { ...mockProduct, id: 2, quantity: 1 },
                ],
            };
            const actual = cartReducer(stateWithItems, clearCart());
            expect(actual.items).toHaveLength(0);
        });
    });

    describe("selectors", () => {
        const mockState = {
            cart: {
                items: [
                    { ...mockProduct, quantity: 2 },
                    { ...mockProduct, id: 2, price: 50, quantity: 3 },
                ],
            },
        };

        it("selectCartItems should return all items", () => {
            expect(selectCartItems(mockState as any)).toEqual(mockState.cart.items);
        });

        it("selectCartTotalItems should return total quantity", () => {
            expect(selectCartTotalItems(mockState as any)).toBe(5); // 2 + 3
        });

        it("selectCartSubtotal should return correct subtotal", () => {
            // (99.99 * 2) + (50 * 3) = 199.98 + 150 = 349.98
            expect(selectCartSubtotal(mockState as any)).toBe(349.98);
        });
    });
});
