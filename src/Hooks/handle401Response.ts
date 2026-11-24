"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/app/store/Auth/authSlice";
import { AppDispatch } from "@/app/store/store";
import { toast } from "react-toastify";

/**
 * Hook to handle 401 Unauthorized responses from APIs
 * Automatically logs out user and clears all data
 */
export const useHandle401 = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const handle401 = (errorMessage?: string) => {
        try {
            // Clear Redux state
            dispatch(logout());

            // Clear all localStorage
            const keysToRemove = [
                "auth",
                "token",
                "user",
                "userRole",
                "hotel",
                "room",
                "booking",
                "userData",
                "authToken",
                "refreshToken",
                "redux-persist",
            ];

            keysToRemove.forEach((key) => {
                localStorage.removeItem(key);
            });

            // Clear sessionStorage
            sessionStorage.clear();

            // Clear all cookies
            if (typeof document !== "undefined") {
                document.cookie.split(";").forEach((c) => {
                    document.cookie = c
                        .replace(/^ +/, "")
                        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
                });
            }

            // Show error message
            toast.error(
                errorMessage || "Session expired or unauthorized access. Please login again.",
                {
                    position: "top-right",
                    autoClose: 4000,
                }
            );

            // Redirect to home/login
            router.push("/");
        } catch (error) {
            console.error("Error handling 401 response:", error);
            // Force redirect even if error occurs
            if (typeof window !== "undefined") {
                window.location.href = "/";
            }
        }
    };

    return handle401;
};

/**
 * Utility function to check if response is 401 (can be used outside components)
 */
export const is401Response = (response: any): boolean => {
    return response?.output === -401 || response?.status === 401;
};

/**
 * Utility function to handle 401 without React hooks (for axios interceptors)
 */
export const clear401Session = () => {
    try {
        // Clear localStorage
        const keysToRemove = [
            "auth",
            "token",
            "user",
            "userRole",
            "hotel",
            "room",
            "booking",
            "userData",
            "authToken",
            "refreshToken",
            "redux-persist",
        ];

        keysToRemove.forEach((key) => {
            localStorage.removeItem(key);
        });

        // Clear sessionStorage
        if (typeof window !== "undefined") {
            sessionStorage.clear();
        }

        // Clear cookies
        if (typeof document !== "undefined") {
            document.cookie.split(";").forEach((c) => {
                document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
            });
        }

        // Redirect
        if (typeof window !== "undefined") {
            window.location.href = "/";
        }
    } catch (error) {
        console.error("Error clearing 401 session:", error);
    }
};
