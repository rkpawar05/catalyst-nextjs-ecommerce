"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import styles from "./CustomDropdown.module.css";

const SORT_OPTIONS = [
    { value: "", label: "Default" },
    { value: "title-asc", label: "Name (A-Z)" },
    { value: "title-desc", label: "Name (Z-A)" },
    { value: "price-asc", label: "Price (Low to High)" },
    { value: "price-desc", label: "Price (High to Low)" },
];

export default function SortSelect() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSort = searchParams.get("sortBy") || "";
    const currentOrder = searchParams.get("order") || "asc";
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentValue = currentSort ? `${currentSort}-${currentOrder}` : "";
    const currentLabel = SORT_OPTIONS.find(opt => opt.value === currentValue)?.label || "Default";

    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            const [sortBy, order] = value.split("-");
            params.set("sortBy", sortBy);
            params.set("order", order);
        } else {
            params.delete("sortBy");
            params.delete("order");
        }

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
            <label className={styles.label}>Sort by:</label>
            <div className={styles.dropdown}>
                <button
                    className={styles.dropdownButton}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                >
                    <span>{currentLabel}</span>
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
                        {SORT_OPTIONS.map((option) => (
                            <li
                                key={option.value}
                                className={`${styles.dropdownItem} ${currentValue === option.value ? styles.selected : ""}`}
                                onClick={() => handleSortChange(option.value)}
                                role="option"
                                aria-selected={currentValue === option.value}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
