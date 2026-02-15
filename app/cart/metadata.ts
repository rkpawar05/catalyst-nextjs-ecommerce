import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shopping Cart",
    description: "View and manage your shopping cart items",
    robots: {
        index: false, // Don't index cart page
        follow: false,
    },
};
