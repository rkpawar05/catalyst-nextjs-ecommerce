"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// Temporary products page for testing auth
export default function ProductsPage() {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            const response = await fetch("/api/auth/logout", {
                method: "POST",
            });

            if (response.ok) {
                router.push("/login");
            }
        } catch (error) {
            console.error("Logout error:", error);
            setIsLoggingOut(false);
        }
    };

    return (
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
            <h1>🎉 Products Page (Protected)</h1>
            <p style={{ fontSize: "18px", marginTop: "20px" }}>
                You are successfully logged in! This page is protected by middleware.
            </p>

            <div
                style={{
                    marginTop: "40px",
                    padding: "20px",
                    backgroundColor: "#f0fdf4",
                    borderRadius: "8px",
                    border: "2px solid #86efac",
                }}
            >
                <h3 style={{ margin: 0, color: "#166534" }}>✅ Authentication Working!</h3>
                <p style={{ color: "#15803d", marginBottom: 0 }}>
                    The middleware verified your auth cookie and allowed you to access this page.
                </p>
            </div>

            <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                style={{
                    marginTop: "30px",
                    padding: "12px 24px",
                    backgroundColor: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: isLoggingOut ? "not-allowed" : "pointer",
                    opacity: isLoggingOut ? 0.6 : 1,
                }}
            >
                {isLoggingOut ? "Logging out..." : "Logout"}
            </button>

            <div
                style={{
                    marginTop: "40px",
                    fontSize: "14px",
                    color: "#6b7280",
                }}
            >
                <p>
                    <strong>Note:</strong> We'll replace this with the actual products catalog
                    in the next phase.
                </p>
            </div>
        </div>
    );
}
