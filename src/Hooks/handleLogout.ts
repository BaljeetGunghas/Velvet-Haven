"use client";

import { logout } from "@/app/store/Auth/authSlice";
import { AppDispatch } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const useHandleLogout = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    return () => {
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
            document.cookie.split(";").forEach((c) => {
                document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
            });

            // Show logout message
            toast.info("Session expired. Please login again.", {
                position: "top-right",
                autoClose: 3000,
            });

            // Redirect to home
            router.push("/");
        } catch (error) {
            console.error("Error during logout:", error);
            // Force redirect even if error occurs
            window.location.href = "/";
        }
    };
};
