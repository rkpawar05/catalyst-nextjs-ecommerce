"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./LogoutButton.module.css";

export default function LogoutButton() {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
            });

            if (response.ok) {
                // Redirect to login page after successful logout
                router.push("/login");
            } else {
                console.error("Logout failed");
                setIsLoggingOut(false);
            }
        } catch (error) {
            console.error("Error during logout:", error);
            setIsLoggingOut(false);
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={styles.logoutButton}
        >
            {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
    );
}
