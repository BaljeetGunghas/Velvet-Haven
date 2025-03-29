"use client"

import Image from 'next/image'
import React, { Suspense, useEffect, useState } from 'react'
import successfull from "@/asset/success.svg";
import SearchCard from '@/components/Card/SearchCard';
import LoadingComponent from '@/components/Loading/LoadingComponent';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { authHeader } from '../Auth/AuthHeader/authHeader';
import { SearchRoomIF } from '../SearchResult/page';
import dayjs from 'dayjs';
import ComponentError from '@/components/Error/ComponentError';

export interface BookingIF {
    _id: string;
    customer_id: string;
    room_id: string;
    hotel_id: string;
    check_in_date: string; // ISO string format
    check_out_date: string; // ISO string format
    total_guests: number;
    total_price: number;
    razorpay_order_id: string;
    payment_status: "pending" | "paid" | "failed"; // Enum for clarity
    booking_status: "pending" | "confirmed" | "cancelled"; // Enum for clarity
    special_requests?: string; // Optional field
    cancellation_reason?: string; // Optional field
    createdAt: string; // ISO string format
    updatedAt: string; // ISO string format
}

const page = () => {
    return <>
        <Suspense fallback={<LoadingComponent />}>
            <Successfull_Component />
        </Suspense>
    </>
}

export default page

const Successfull_Component = () => {

    const pageParams = useSearchParams();
    const booking_id = pageParams.get("booking_id");
    const [bookingResponse, setBookingResponse] = React.useState<BookingIF | null>(null);
    const [room, setRooms] = useState<SearchRoomIF | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>("");

    const getRoomDetails = async (id: string) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel-room/getSingleSearchRoom`, {
            roomId: id
        }, {
            headers: authHeader()
        })
        const responseData = response.data;
        return responseData;
    }


    const getBoookingDetails = async () => {
        if (booking_id) {
            setLoading(true);
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/booking/get-bookingbyId`, {
                    bookingId: booking_id
                }, {
                    headers: authHeader()
                })
                const responseData = response.data;
                if (responseData.output === 1) {
                    const bookingData: BookingIF = responseData.jsonResponse;
                    setBookingResponse(bookingData);
                    const roomData = await getRoomDetails(bookingData.room_id);
                    if (roomData.output === 1) {
                        setRooms(roomData.jsonResponse);
                    }
                    else {
                        setRooms(null);
                        setLoading(false);
                    }
                } else {
                    setLoading(false);
                    setBookingResponse(null);
                }
            } catch (error) {
                setError("Failed to fetch booking details");
                console.error(error);
                setBookingResponse(null);
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        if (!booking_id) {
            return;
        }
        getBoookingDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [booking_id]);

    return (
        <div className="container mx-auto w-full md:w-10/12 mt-16 mb-10">
            <div className="flex flex-col justify-center items-center gap-2 p-4 md:p-8">
                <h1 className='font-bold text-2xl m-0'>Payment Successfull</h1>
                <Image src={successfull} alt='successfull-image' width={72} height={72} className='w-40 h-40 object-cover' />
                <h2 className='font-semibold text-xl m-0'>Payment Success!</h2>
                <p className='text-sm text-gray-400 font-normal'> Your payment has been successfully done.</p>

                {loading && <LoadingComponent />}
                {error && !loading && <ComponentError error={error} reload={() => getBoookingDetails()} />}
                {!error && !loading && <div className='flex flex-col md:flex-row gap-12  md:gap-8 w-full lg:w-4/5 mx-auto mt-5 p-0 md:p-4 rounded-md  md:border border-[#8C9B97]  '>
                    <div className='w-full md:w-[55%]'>
                        <SearchCard key={room?._id} room={room} />
                    </div>
                    <div className='flex flex-col w-full gap-5'>
                        <h2 className='font-semibold text-xl m-0 text-center'>Booking Details</h2>
                        <div className='flex justify-between items-center'>
                            <p className='text-sm font-semibold m-0'>Booking id :</p>
                            <p className='text-sm font-normal m-0'>{bookingResponse?._id}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-sm font-semibold m-0'>Payment id :</p>
                            <p className='text-sm font-normal m-0'>{bookingResponse?.razorpay_order_id}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-sm font-semibold m-0'>Payment Status :</p>
                            <p className='text-sm font-normal m-0'>{bookingResponse?.payment_status}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-sm font-semibold m-0'>Booking Status :</p>
                            <p className='text-sm font-semibold m-0 text-green-400'>{bookingResponse?.booking_status}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-sm font-semibold m-0'>Total Guests :</p>
                            <p className='text-sm font-normal m-0'>{bookingResponse?.total_guests}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-sm font-semibold m-0'>Total Paid Amount :</p>
                            <p className='text-sm font-normal m-0'>{bookingResponse?.total_price}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-sm font-semibold m-0'>Check In Date :</p>
                            <p className='text-sm font-normal m-0'>{dayjs(bookingResponse?.check_in_date).format("DD-MMM-YYYY")}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-sm font-semibold m-0'>Check Out Date :</p>
                            <p className='text-sm font-normal m-0'> {dayjs(bookingResponse?.check_out_date).format("DD-MMM-YYYY")}</p>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}