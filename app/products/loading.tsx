import styles from "./products.module.css";

export default function Loading() {
    return (
        <div className={styles.container}>
            {/* Header Skeleton */}
            <div className={styles.header}>
                <div
                    style={{
                        width: "200px",
                        height: "36px",
                        backgroundColor: "#e2e8f0",
                        borderRadius: "8px",
                        marginBottom: "8px",
                    }}
                />
                <div
                    style={{
                        width: "150px",
                        height: "20px",
                        backgroundColor: "#e2e8f0",
                        borderRadius: "4px",
                    }}
                />
            </div>

            {/* Controls Skeleton */}
            <div className={styles.controls}>
                <div
                    style={{
                        width: "250px",
                        height: "42px",
                        backgroundColor: "#e2e8f0",
                        borderRadius: "8px",
                    }}
                />
                <div
                    style={{
                        width: "250px",
                        height: "42px",
                        backgroundColor: "#e2e8f0",
                        borderRadius: "8px",
                    }}
                />
            </div>

            {/* Products Grid Skeleton */}
            <div className={styles.grid}>
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        style={{
                            background: "white",
                            borderRadius: "12px",
                            overflow: "hidden",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        {/* Image Skeleton */}
                        <div
                            style={{
                                width: "100%",
                                height: "220px",
                                backgroundColor: "#e2e8f0",
                            }}
                        />
                        {/* Content Skeleton */}
                        <div style={{ padding: "16px" }}>
                            <div
                                style={{
                                    width: "80%",
                                    height: "20px",
                                    backgroundColor: "#e2e8f0",
                                    borderRadius: "4px",
                                    marginBottom: "8px",
                                }}
                            />
                            <div
                                style={{
                                    width: "50%",
                                    height: "16px",
                                    backgroundColor: "#e2e8f0",
                                    borderRadius: "4px",
                                    marginBottom: "12px",
                                }}
                            />
                            <div
                                style={{
                                    width: "60%",
                                    height: "24px",
                                    backgroundColor: "#e2e8f0",
                                    borderRadius: "4px",
                                    marginBottom: "8px",
                                }}
                            />
                            <div
                                style={{
                                    width: "40%",
                                    height: "16px",
                                    backgroundColor: "#e2e8f0",
                                    borderRadius: "4px",
                                    marginBottom: "12px",
                                }}
                            />
                            <div
                                style={{
                                    width: "100%",
                                    height: "40px",
                                    backgroundColor: "#e2e8f0",
                                    borderRadius: "8px",
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <p style={{ textAlign: "center", color: "#718096", fontSize: "14px" }}>
                Loading products...
            </p>
        </div>
    );
}
