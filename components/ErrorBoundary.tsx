"use client";

import { Component, ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error caught by boundary:", error, errorInfo);
        // Here you could send to error tracking service like Sentry
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        padding: "2rem",
                    }}
                >
                    <div
                        style={{
                            textAlign: "center",
                            background: "white",
                            padding: "3rem 2rem",
                            borderRadius: "16px",
                            maxWidth: "500px",
                        }}
                    >
                        <h1
                            style={{
                                fontSize: "2rem",
                                fontWeight: "700",
                                color: "#dc2626",
                                marginBottom: "1rem",
                            }}
                        >
                            Oops! Something went wrong
                        </h1>
                        <p
                            style={{
                                fontSize: "1.1rem",
                                color: "#6b7280",
                                marginBottom: "2rem",
                            }}
                        >
                            We're sorry for the inconvenience. Please try refreshing the page.
                        </p>
                        <button
                            onClick={() => this.setState({ hasError: false })}
                            style={{
                                padding: "1rem 2rem",
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "1rem",
                                fontWeight: "600",
                                cursor: "pointer",
                                marginRight: "1rem",
                            }}
                        >
                            Try Again
                        </button>
                        <button
                            onClick={() => window.location.href = "/"}
                            style={{
                                padding: "1rem 2rem",
                                background: "#f3f4f6",
                                color: "#1f2937",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "1rem",
                                fontWeight: "600",
                                cursor: "pointer",
                            }}
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
