"use client";

import { authHeader } from "@/app/Auth/AuthHeader/authHeader";
import axios from "axios";

export const useHandleGetHotelRoomDetails = async (roomId: string) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel-room/get-specific-room-details`,
        { roomId },
        {
            headers: authHeader(),
        }
    )
    const responseData = response.data;
    return responseData;
};


export const useHandleDeleteRoom = async (hotelId: string) => {
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
