"use client";

import { authHeader } from "@/app/Auth/AuthHeader/authHeader";
import axios from "axios";

export const useHandleGetHotelDetails = async (hotelId: string) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel/get-specific-hotel-details`,
        { hotelId },
        {
            headers: authHeader(),
        }
    )
    const responseData = response.data;
    return responseData;
};


export const useHandleDeleteHotel = async (hotelId: string) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel/delete-hotel`,
        { hotelId },
        {
            headers: authHeader(),
        }

    );
    const responseData = response.data;
    return responseData;
};
