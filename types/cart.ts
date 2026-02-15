// Type definitions for cart
export interface CartItem {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    quantity: number;
    brand?: string;
    discountPercentage?: number;
}

export interface CartState {
    items: CartItem[];
}
