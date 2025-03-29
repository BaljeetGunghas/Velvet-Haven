"use client";

import LoadingComponent from '@/components/Loading/LoadingComponent';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState, useCallback } from 'react';
import { authHeader } from '../Auth/AuthHeader/authHeader';
import { motion } from "framer-motion";
import { amenitiesIcons } from '@/components/Card/amenitiesIcons';
import { FaHeart, FaRegStar, FaStar } from 'react-icons/fa6';
import { FaStarHalfAlt } from 'react-icons/fa';
import Gallary from '@/components/Gallery/Gallary';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toast } from 'react-toastify';
import LoginRegistrationModel from '@/components/LoginRegModel/LoginRegistrationModel';
import ModalLayout from '@/components/ModelLayout/Modellayout';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import StarRating from '@/components/Review/Rating';
import ReviewCard from '@/components/Review/ReviewCard';
import noImage from "@/asset/no-image.jpg";
import BookingForm from '@/components/Payment/BookingForm';
import ComponentError from '@/components/Error/ComponentError';

interface User {
    _id: string;
    name: string;
    profile_picture: string;
}

export interface RoomReview {
    _id: string;
    user_id: User;
    hotel_id: string;
    room_id: string;
    rating: number;
    comment: string;
    created_at: string;
    likes: string[];
    dislikes: string[];
    isLiked: boolean;
    isDisliked: boolean;
}

export interface RoomDetails {
    _id: string;
    hostid: string;
    hotel_id: string;
    room_number: number;
    room_type: string;
    price_per_night: number;
    max_occupancy: number;
    floor_number: number;
    bed_type: string;
    availability_status: string;
    description: string;
    rating: number;
    check_in_time: string;
    check_out_time: string;
    room_images: string[];
    reviews: string[];
    createdAt: string;
    updatedAt: string;
    amenities: string[];
    hotel_name: string;
    is_shortlisted: boolean;
}

interface HotelDetails {
    hotelId: string;
    hotel_name: string;
    hotelAddress: string;
    hotelRating: number;
    hotelImage: string;
}

interface RoomResponse {
    output: number;
    message: string;
    jsonResponse: {
        roomDetails: RoomDetails;
        roomReviews: RoomReview[];
        hotelDetails: HotelDetails;
    };
}

const Page = () => (
    <Suspense fallback={<LoadingComponent />}>
        <RoomDetailsPage />
    </Suspense>
);

const RoomDetailsPage = () => {
    const searchParams = useSearchParams();
    const roomId = searchParams.get("room_id");
    const { user } = useSelector(
        (state: RootState) => state.auth
    );
    const [data, setData] = useState<{
        roomDetails: RoomDetails | null;
        roomReviews: RoomReview[];
        hotelDetails: HotelDetails | null;
    }>({
        roomDetails: null,
        roomReviews: [],
        hotelDetails: null,
    });
    const [isRegistrationModelOpen, setIsRegistrationModelOpen] =
        useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showFullDescription, setShowFullDescription] = useState(false);


    const fetchRoomDetails = useCallback(async () => {
        if (!roomId) return;
        setLoading(true)
        try {
            const response = await axios.post<RoomResponse>(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel-room/get-specific-room-fulldetails`,
                { roomId },
                { headers: authHeader() }
            );

            if (response.data.output === 1) {
                setData({
                    roomDetails: response.data.jsonResponse.roomDetails,
                    roomReviews: response.data.jsonResponse.roomReviews,
                    hotelDetails: response.data.jsonResponse.hotelDetails,
                });
                setIsRoomShortlisted(response.data.jsonResponse.roomDetails.is_shortlisted);
                setError(null);
            } else {
                setError("Room details not found.");
            }
        } catch (err) {
            console.error("Error fetching room details:", err);
            setError("Failed to load room details. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [roomId]);

    useEffect(() => {
        fetchRoomDetails();
    }, [fetchRoomDetails]);

    const { roomDetails, hotelDetails, roomReviews } = data;

    const [isRoomShortlisted, setIsRoomShortlisted] = useState<boolean>(roomDetails?.is_shortlisted ?? false);
    const handleSaveRoomCart = async () => {
        if (user?.id) {
            setIsRoomShortlisted((pre) => !pre)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel-room/update-room-shortlist`,
                {
                    "hotel_id": hotelDetails?.hotelId,
                    "room_id": roomDetails?._id,
                },
                {
                    headers: authHeader()
                }
            )
            const responseData = response.data;
            if (responseData.output === 1) {
                setIsRoomShortlisted(!isRoomShortlisted)
            } else {
                setIsRoomShortlisted(false)
                return toast.error(responseData.message || "Failed to shortlist room")
            }
        } else {
            setIsRegistrationModelOpen(true);
        }
    }


    if (loading) {
        return (
            <div className="container mx-auto mt-20 h-screen flex items-center justify-center">
                <LoadingComponent />
            </div>
        )
    }

    if (error) {
        return <div className="container mx-auto mt-20 h-[60%] md:h-screen flex items-center justify-center">
            <ComponentError error={error} reload={() => { fetchRoomDetails() }} />
        </div>
    }

    if (!roomDetails) {
        return <p className="text-center text-gray-500">No room details available.</p>;
    }


    const handleReviewSubmit = async (rating: number, comment: string) => {
        if (!user?.id) {
            setIsRegistrationModelOpen(true);
            return;
        }
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel-room/add-room-review`,
            {
                "hotelId": hotelDetails?.hotelId,
                "roomId": roomDetails?._id,
                "rating": rating,
                "comment": comment
            },
            {
                headers: authHeader()
            }
        )
        const responseData = response.data;
        if (responseData.output === 1) {
            setData((prev) => ({
                ...prev,
                roomReviews: [responseData.jsonResponse, ...prev.roomReviews]
            }));
            return toast.success(responseData.message);
        } else {
            return toast.error(responseData.message || "Failed to submit review")
        }
    }


    return (
        <>
            <div className="container mx-auto w-10/12 py-20">
                <div className="flex flex-col-reverse md:flex-row gap-10">
                    {/* Left Section */}
                    <div className="md:w-1/2 relative ">
                        <h1 className="text-3xl font-bold">{hotelDetails?.hotel_name || "Room Details"}</h1>
                        <p className="text-gray-500 dark:text-slate-200">{hotelDetails?.hotelAddress || "Address not available"}</p>
                        <Button onClick={handleSaveRoomCart} className="absolute top-3 right-3 bg-white p-1 w-10 h-10 rounded-full ">
                            <FaHeart className={` ${isRoomShortlisted ? "text-red-600" : "text-black"} `} />
                        </Button>
                        <div className='flex justify-between items-start mt-10 w-full'>
                            <h2 className="text-xl md:text-2xl font-semibold m-0">₹ {roomDetails?.price_per_night} per night</h2>
                            <div className="flex flex-col items-center gap-1 md:w-auto">
                                <div className="flex items-center gap-1 text-lg md:text-xl">
                                    {Array.from({ length: 5 }).map((_, index) => {
                                        const ratingValue = roomDetails.rating || 0;
                                        return index + 1 <= Math.floor(ratingValue) ? (
                                            <FaStar key={index} className="text-yellow-400 drop-shadow-lg" />
                                        ) : index < ratingValue && ratingValue % 1 !== 0 ? (
                                            <FaStarHalfAlt key={index} className="text-yellow-400 drop-shadow-lg" />
                                        ) : (
                                            <FaRegStar key={index} className="text-gray-300 drop-shadow-md" />
                                        );
                                    })}
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-200">Based on {roomDetails.reviews.length} reviews</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-10 text-gray-700">
                            {/* Room Number */}
                            <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full text-lg">
                                <span className="text-xl">🏨</span>
                                <p className="text-xs dark:text-white font-semibold">Room {roomDetails.room_number}</p>
                            </div>

                            {/* Bed Type */}
                            <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full text-lg">
                                <span className="text-xl">🛏️</span>
                                <p className="text-xs dark:text-white font-semibold">{roomDetails.bed_type}</p>
                            </div>

                            {/* Room Type */}
                            <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full text-lg">
                                <span className="text-xl">🏠</span>
                                <p className="text-xs dark:text-white font-semibold">{roomDetails.room_type}</p>
                            </div>

                            {/* Max Occupancy */}
                            <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full text-lg">
                                <span className="text-xl">🛁</span>
                                <p className="text-xs dark:text-white font-semibold">{roomDetails.max_occupancy} guests</p>
                            </div>

                            {/* Floor Number */}
                            <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full text-lg">
                                <span className="text-xl">📏</span>
                                <p className="text-xs dark:text-white font-semibold">{roomDetails.floor_number} Floor</p>
                            </div>

                            {/* Check-in Time */}
                            <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full text-lg">
                                <span className="text-xl">🕒</span>
                                <p className="text-xs dark:text-white font-semibold">{roomDetails.check_in_time}</p>
                            </div>

                            {/* Check-out Time */}
                            <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full text-lg">
                                <span className="text-xl">🚪</span>
                                <p className="text-xs dark:text-white font-semibold">{roomDetails.check_out_time}</p>
                            </div>
                        </div>


                        {/* Description with Read More Animation */}
                        {roomDetails?.description && <> <motion.div
                            initial={{ height: "4rem", opacity: 0.8 }}
                            animate={{ height: showFullDescription ? "auto" : "6rem", opacity: 1 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden mt-10"
                        >
                            <h3 className="font-semibold text-lg ">Description</h3>
                            <p className="text-gray-600 text-sm mt-2 dark:text-white font-normal">{roomDetails.description}</p>
                        </motion.div>
                            <p
                                className="text-blue-500 cursor-pointer mt-2 text-center md:text-left"
                                onClick={() => setShowFullDescription(!showFullDescription)}
                            >
                                {showFullDescription ? "Read less" : "Read more"}
                            </p>
                        </>
                        }

                        {/* Amenities */}
                        <h3 className="font-semibold text-lg mt-10">Amenities</h3>
                        <div className="grid grid-cols-2 gap-3 text-gray-700 mt-2">
                            {roomDetails?.amenities?.length > 0 ? roomDetails?.amenities?.map((amenity) => (
                                <div key={amenity} className="flex flex-col border p-4 text-2xl items-center gap-1 rounded-xl dark:text-white">
                                    {amenitiesIcons[amenity as keyof typeof amenitiesIcons] || "🔹"}
                                    <span className="capitalize text-xs">{amenity.replace(/_/g, " ")}</span>
                                </div>
                            ))
                                : (
                                    <div className="flex flex-col items-center justify-center  text-lg">
                                        <span className="text-xl">🔹</span>
                                        <p className="text-xs dark:text-white font-semibold">No Amenities</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    {/* Right Section - Image Gallery */}
                    <div className="md:w-1/2">
                        <Gallary images={roomDetails?.room_images} />
                    </div>


                </div>

                <BookingForm room={roomDetails} />

                <div className="mt-10 border border-gray-200 dark:border-gray-700 p-4 rounded-lg flex gap-4 justify-start">
                    <Image
                        src={hotelDetails?.hotelImage ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${hotelDetails?.hotelImage}` : noImage}
                        alt="hotel"
                        className=" w-20 h-20 rounded-full object-cover shadow-xl"
                        loading="lazy"
                        width={'200'}
                        height={'200'}
                    />
                    <div className='flex flex-col'>
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">{hotelDetails?.hotel_name}</h2>
                        <p className='text-xs '>{hotelDetails?.hotelAddress}</p>
                        <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, index) => {
                                const ratingValue = hotelDetails?.hotelRating || 0;
                                return index + 1 <= Math.floor(ratingValue) ? (
                                    <FaStar key={index} className="text-yellow-400" />
                                ) : index < ratingValue && ratingValue % 1 !== 0 ? (
                                    <FaStarHalfAlt key={index} className="text-yellow-400" />
                                ) : (
                                    <FaRegStar key={index} className="text-gray-400" />
                                );
                            })}
                        </div>
                        <Link href={''} className='text-blue-500 underline px-0'>View Hotel Details</Link>
                    </div>
                </div>

                <div className='mt-10 w-full'>
                    <h3 className="flex gap-4 items-center font-semibold text-lg mt-6">Review <span className='text-lg bg-primaryblue rounded-md p-1 text-white'
                    >{roomDetails.rating}/<span className='text-sm'>5</span> </span>
                        <div className="flex items-center gap-1 text-lg md:text-xl">

                            {Array.from({ length: 5 }).map((_, index) => {
                                const ratingValue = roomDetails?.rating || 0;
                                return index + 1 <= Math.floor(ratingValue) ? (
                                    <FaStar key={index} className="text-yellow-400" />
                                ) : index < ratingValue && ratingValue % 1 !== 0 ? (
                                    <FaStarHalfAlt key={index} className="text-yellow-400" />
                                ) : (
                                    <FaRegStar key={index} className="text-gray-400" />
                                );
                            }
                            )}
                        </div>
                    </h3>

                    <div className="flex flex-col-reverse md:flex-row gap-6 mt-4">
                        {/* Left: Reviews List */}
                        <div className=" overflow-y-auto space-y-3 w-full md:w-2/3">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold dark:text-white text-gray-800">Customer Reviews</h2>
                                {roomReviews?.length > 0 ? (
                                    roomReviews.map((review: RoomReview) => (
                                        <ReviewCard key={review._id} review={review} />
                                    ))
                                ) : (
                                    <div className='flex flex-col items-center justify-center w-full h-40 border border-gray-200 rounded-lg'>
                                        <p className="text-gray-500 text-sm">No reviews yet. Be the first to review!</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right: Add Review */}
                        <div className='w-full md:w-1/3 mt-0 md:mt-10 '>
                            <StarRating handleSubmit={handleReviewSubmit} />
                        </div>
                    </div>


                </div>


            </div>
            <ModalLayout
                isOpen={isRegistrationModelOpen && !user?.id}
                onClose={setIsRegistrationModelOpen}
            >
                <LoginRegistrationModel />
            </ModalLayout>
        </>
    );
};

export default Page;
