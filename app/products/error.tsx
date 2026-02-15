"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Products page error:", error);
    }, [error]);

    return (
        <div
            style={{
                maxWidth: "600px",
                margin: "100px auto",
                padding: "40px",
                textAlign: "center",
            }}
        >
            <div
                style={{
                    fontSize: "64px",
                    marginBottom: "20px",
                }}
            >
                😞
            </div>
            <h2
                style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    color: "#1a202c",
                    marginBottom: "12px",
                }}
            >
                Oops! Something went wrong
            </h2>
            <p
                style={{
                    fontSize: "16px",
                    color: "#718096",
                    marginBottom: "32px",
                }}
            >
                We couldn't load the products. Please try again.
            </p>
            <button
                onClick={reset}
                style={{
                    padding: "12px 32px",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                }}
            >
                Try Again
            </button>
            <p
                style={{
                    fontSize: "13px",
                    color: "#a0aec0",
                    marginTop: "24px",
                }}
            >
                Error: {error.message}
            </p>
        </div>
    );
}
