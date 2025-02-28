"use client";

import { logout } from "@/app/store/Auth/authSlice";
import { AppDispatch } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export const useHandleLogout = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    return() =>{
        router.push("/");
        dispatch(logout());
    }
};