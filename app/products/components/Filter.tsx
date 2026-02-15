"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import styles from "./CustomDropdown.module.css";

interface FilterProps {
    categories: Array<{ slug: string; name: string }>;
}

export default function Filter({ categories }: FilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category") || "";
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Find current category name
    const currentCategoryName = currentCategory
        ? categories.find(cat => cat.slug === currentCategory)?.name || "All Categories"
        : "All Categories";

    const handleCategoryChange = (slug: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (slug) {
            params.set("category", slug);
        } else {
            params.delete("category");
        }

        // Reset to first page when changing category
        params.delete("skip");

        router.push(`/products?${params.toString()}`);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={styles.container} ref={dropdownRef}>
            <label className={styles.label}>Category:</label>
            <div className={styles.dropdown}>
                <button
                    className={styles.dropdownButton}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                >
                    <span>{currentCategoryName}</span>
                    <svg
                        className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                    >
                        <path
                            d="M1 1L6 6L11 1"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                {isOpen && (
                    <ul className={styles.dropdownList} role="listbox">
                        <li
                            className={`${styles.dropdownItem} ${!currentCategory ? styles.selected : ""}`}
                            onClick={() => handleCategoryChange("")}
                            role="option"
                            aria-selected={!currentCategory}
                        >
                            All Categories
                        </li>
                        {categories.map((cat) => (
                            <li
                                key={cat.slug}
                                className={`${styles.dropdownItem} ${currentCategory === cat.slug ? styles.selected : ""}`}
                                onClick={() => handleCategoryChange(cat.slug)}
                                role="option"
                                aria-selected={currentCategory === cat.slug}
                            >
                                {cat.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
