"use client"; // ← CRITICAL! This makes it a Client Component

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./login.module.css";

// TypeScript interface for form data
interface LoginFormData {
    username: string;
    password: string;
}

export default function LoginPage() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // React Hook Form setup
    const {
        register, // Register inputs with validation rules
        handleSubmit, // Handle form submission
        formState: { errors }, // Get validation errors
    } = useForm<LoginFormData>();

    // This function runs when form is submitted
    const onSubmit = async (data: LoginFormData) => {
        try {
            setIsLoading(true);
            setErrorMessage("");

            // Call our API route (NOT DummyJSON directly!)
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                // Login failed
                setErrorMessage(result.error || "Login failed");
                setIsLoading(false);
                return;
            }

            // Login successful! Cookie is automatically set by the API route
            // Redirect to products page
            router.push("/products");
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("An error occurred. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>Login to your account</p>

                {/* Show error message if login fails */}
                {errorMessage && (
                    <div className={styles.errorAlert}>{errorMessage}</div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    {/* Username Field */}
                    <div className={styles.formGroup}>
                        <label htmlFor="username" className={styles.label}>
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            className={`${styles.input} ${errors.username ? styles.inputError : ""}`}
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 3,
                                    message: "Username must be at least 3 characters",
                                },
                            })}
                            placeholder="Enter your username"
                            disabled={isLoading}
                        />
                        {/* Show validation error */}
                        {errors.username && (
                            <span className={styles.errorText}>{errors.username.message}</span>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            placeholder="Enter your password"
                            disabled={isLoading}
                        />
                        {/* Show validation error */}
                        {errors.password && (
                            <span className={styles.errorText}>{errors.password.message}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Test Credentials Helper */}
                <div className={styles.testCredentials}>
                    <p className={styles.testTitle}>Test Credentials:</p>
                    <p className={styles.testInfo}>
                        Username: <strong>emilys</strong>
                    </p>
                    <p className={styles.testInfo}>
                        Password: <strong>emilyspass</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}
