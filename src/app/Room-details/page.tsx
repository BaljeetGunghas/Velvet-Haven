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
            // ✅ UPDATED: New RESTful endpoint
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel-room/${roomDetails?._id}/shortlist`,
                {},
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
                roomReviews: [responseData.jsonResponse, ...prev.roomReviews || []]
            }));
            return toast.success(responseData.message);
        } else {
            return toast.error(responseData.message || "Failed to submit review")
        }
    }


    return (
        <>
            <main className="min-h-screen w-full bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 pt-20 sm:pt-24 lg:pt-28">
                {/* Two-Column Layout Section */}
                <section className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16">
                    <div className="w-full max-w-7xl mx-auto">
                        {/* Two Column Grid: Gallery (Left) + Details (Right) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                            {/* LEFT COLUMN: Gallery */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="flex flex-col"
                            >
                                {/* Premium Section Heading */}
                                <div className="mb-6 sm:mb-8">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="h-1 w-8 bg-gradient-to-r from-accent-gold to-accent-gold/50 rounded-full"></div>
                                        <span className="text-xs uppercase tracking-widest font-semibold text-accent-gold">Premium Gallery</span>
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-primary-green dark:text-white mb-2">
                                        Room Gallery
                                    </h2>
                                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                        Explore the elegance and luxury of our exquisitely designed rooms
                                    </p>
                                </div>
                                {/* Gallery Component */}
                                <Gallary images={roomDetails?.room_images} />
                            </motion.div>

                            {/* RIGHT COLUMN: Room Details */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="flex flex-col"
                            >
                                {/* Header with Title and Shortlist Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="flex justify-between items-start mb-8 gap-4"
                                >
                                    <div>
                                        <h1 className="text-2xl sm:text-3xl font-playfair font-bold text-primary-green dark:text-white mb-2 break-words">
                                            {hotelDetails?.hotel_name || "Room Details"}
                                        </h1>
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words">{hotelDetails?.hotelAddress || "Address not available"}</p>
                                    </div>
                                    <motion.button
                                        onClick={handleSaveRoomCart}
                                        whileHover={{ scale: 1.1 }}
                                        className="flex-shrink-0 bg-gradient-to-br from-accent-gold/15 to-accent-gold/5 p-3 rounded-full hover:from-accent-gold/30 hover:to-accent-gold/15 transition-all duration-300 border border-accent-gold/40 hover:border-accent-gold/60 hover:shadow-lg hover:shadow-accent-gold/30"
                                    >
                                        <FaHeart className={`w-5 h-5 transition-all duration-300 ${isRoomShortlisted ? 'text-accent-gold fill-accent-gold' : 'text-gray-400 dark:text-gray-500'}`} />
                                    </motion.button>
                                </motion.div>

                                {/* Price and Rating Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-12 border-b border-gray-200 dark:border-slate-700"
                                >
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Price per night</p>
                                        <h2 className="text-5xl md:text-6xl font-playfair font-bold text-accent-gold mb-1">
                                            ₹{roomDetails?.price_per_night?.toLocaleString('en-IN')}
                                        </h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Available for booking</p>
                                    </div>

                                    <div className="flex flex-col items-start md:items-end gap-3 bg-gradient-to-r from-yellow-50 to-yellow-50/50 dark:from-slate-700/40 dark:to-slate-700/20 px-6 py-4 rounded-xl border border-yellow-100 dark:border-slate-600/30">
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-1">
                                                {Array.from({ length: 5 }).map((_, index) => {
                                                    const ratingValue = roomDetails.rating || 0;
                                                    return index + 1 <= Math.floor(ratingValue) ? (
                                                        <FaStar key={index} className="text-yellow-400 w-5 h-5" />
                                                    ) : index < ratingValue && ratingValue % 1 !== 0 ? (
                                                        <FaStarHalfAlt key={index} className="text-yellow-400 w-5 h-5" />
                                                    ) : (
                                                        <FaRegStar key={index} className="text-gray-300 dark:text-gray-600 w-5 h-5" />
                                                    );
                                                })}
                                            </div>
                                            <span className="text-lg font-bold text-primary-green dark:text-white">{roomDetails.rating?.toFixed(1) || '0'}/5</span>
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Based on {roomDetails.reviews.length} reviews</p>
                                    </div>
                                </motion.div>

                                {/* Room Features Grid */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="mb-12"
                                >
                                    <h3 className="text-xl font-playfair font-bold text-primary-green dark:text-white mb-6">Room Features</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {/* Room Number */}
                                        <motion.div
                                            whileHover={{ y: -4 }}
                                            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 text-center hover:shadow-lg hover:shadow-accent-gold/20 transition-all duration-300"
                                        >
                                            <div className="text-3xl mb-2">🔑</div>
                                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">Room</p>
                                            <p className="text-lg font-bold text-primary-green dark:text-white">{roomDetails.room_number}</p>
                                        </motion.div>

                                        {/* Bed Type */}
                                        <motion.div
                                            whileHover={{ y: -4 }}
                                            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 text-center hover:shadow-lg hover:shadow-accent-gold/20 transition-all duration-300"
                                        >
                                            <div className="text-3xl mb-2">🛌</div>
                                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">Bed Type</p>
                                            <p className="text-sm font-bold text-primary-green dark:text-white capitalize">{roomDetails.bed_type}</p>
                                        </motion.div>

                                        {/* Room Type */}
                                        <motion.div
                                            whileHover={{ y: -4 }}
                                            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 text-center hover:shadow-lg hover:shadow-accent-gold/20 transition-all duration-300"
                                        >
                                            <div className="text-3xl mb-2">🚪</div>
                                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">Type</p>
                                            <p className="text-sm font-bold text-primary-green dark:text-white capitalize">{roomDetails.room_type}</p>
                                        </motion.div>

                                        {/* Max Occupancy */}
                                        <motion.div
                                            whileHover={{ y: -4 }}
                                            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 text-center hover:shadow-lg hover:shadow-accent-gold/20 transition-all duration-300"
                                        >
                                            <div className="text-3xl mb-2">👨‍👩‍👧</div>
                                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">Guests</p>
                                            <p className="text-lg font-bold text-primary-green dark:text-white">{roomDetails.max_occupancy}</p>
                                        </motion.div>

                                        {/* Floor Number */}
                                        <motion.div
                                            whileHover={{ y: -4 }}
                                            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 text-center hover:shadow-lg hover:shadow-accent-gold/20 transition-all duration-300"
                                        >
                                            <div className="text-3xl mb-2">📊</div>
                                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">Floor</p>
                                            <p className="text-lg font-bold text-primary-green dark:text-white">{roomDetails.floor_number}</p>
                                        </motion.div>

                                        {/* Check-in Time */}
                                        <motion.div
                                            whileHover={{ y: -4 }}
                                            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 text-center hover:shadow-lg hover:shadow-accent-gold/20 transition-all duration-300"
                                        >
                                            <div className="text-3xl mb-2">📥</div>
                                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">Check-in</p>
                                            <p className="text-sm font-bold text-primary-green dark:text-white">{roomDetails.check_in_time}</p>
                                        </motion.div>

                                        {/* Check-out Time */}
                                        <motion.div
                                            whileHover={{ y: -4 }}
                                            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 text-center hover:shadow-lg hover:shadow-accent-gold/20 transition-all duration-300"
                                        >
                                            <div className="text-3xl mb-2">📤</div>
                                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">Check-out</p>
                                            <p className="text-sm font-bold text-primary-green dark:text-white">{roomDetails.check_out_time}</p>
                                        </motion.div>

                                        {/* Availability */}
                                        <motion.div
                                            whileHover={{ y: -4 }}
                                            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 text-center hover:shadow-lg hover:shadow-accent-gold/20 transition-all duration-300"
                                        >
                                            <div className="text-3xl mb-2">⭐</div>
                                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">Status</p>
                                            <p className="text-sm font-bold text-accent-gold capitalize">{roomDetails.availability_status}</p>
                                        </motion.div>
                                    </div>
                                </motion.div>

                                {/* Description Section */}
                                {roomDetails?.description && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        className="mb-12 bg-gradient-to-r from-accent-gold/5 to-accent-gold/10 dark:from-slate-800/50 dark:to-slate-700/50 rounded-2xl border border-accent-gold/20 dark:border-slate-600/50 p-6 md:p-8"
                                    >
                                        <h3 className="text-xl font-playfair font-bold text-primary-green dark:text-white mb-4">Description</h3>
                                        <motion.div
                                            initial={{ height: "4rem", opacity: 0.8 }}
                                            animate={{ height: showFullDescription ? "auto" : "5rem", opacity: 1 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{roomDetails.description}</p>
                                        </motion.div>
                                        <motion.button
                                            onClick={() => setShowFullDescription(!showFullDescription)}
                                            whileHover={{ scale: 1.05 }}
                                            className="text-accent-gold hover:text-accent-gold/80 font-semibold mt-4 transition-colors"
                                        >
                                            {showFullDescription ? "Read less" : "Read more"}
                                        </motion.button>
                                    </motion.div>
                                )}

                                {/* Amenities Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    className="mb-12"
                                >
                                    <h3 className="text-xl font-playfair font-bold text-primary-green dark:text-white mb-6">Amenities</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {roomDetails?.amenities?.length > 0 ? (
                                            roomDetails?.amenities?.map((amenity) => (
                                                <motion.div
                                                    key={amenity}
                                                    whileHover={{ scale: 1.05 }}
                                                    className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-4 py-3 rounded-lg hover:border-accent-gold/50 hover:shadow-md hover:shadow-accent-gold/20 transition-all duration-300"
                                                >
                                                    <span className="text-lg flex-shrink-0">{amenitiesIcons[amenity as keyof typeof amenitiesIcons] || '✓'}</span>
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{amenity.replace(/_/g, " ")}</span>
                                                </motion.div>
                                            ))
                                        ) : (
                                            <p className="text-gray-600 dark:text-gray-400">No amenities listed</p>
                                        )}
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Booking Form - Full Width */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="w-full max-w-7xl mx-auto"
                    >
                        <BookingForm room={roomDetails} />
                    </motion.div>

                    {/* Hotel Details Card - Full Width */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="w-full max-w-7xl mx-auto"
                    >
                        <div className="my-12 bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-2xl hover:shadow-accent-gold/20 transition-all duration-300 p-6 md:p-8 overflow-hidden">
                            <h3 className="text-xl font-playfair font-bold text-primary-green dark:text-white mb-6">About this Hotel</h3>
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <Image
                                    src={hotelDetails?.hotelImage ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${hotelDetails?.hotelImage}` : noImage}
                                    alt="hotel"
                                    className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover flex-shrink-0 shadow-lg"
                                    loading="lazy"
                                    width={200 as unknown as number}
                                    height={200 as unknown as number}
                                />
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-primary-green dark:text-white mb-2">{hotelDetails?.hotel_name}</h2>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{hotelDetails?.hotelAddress}</p>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex gap-1">
                                            {Array.from({ length: 5 }).map((_, index) => {
                                                const ratingValue = hotelDetails?.hotelRating || 0;
                                                return index + 1 <= Math.floor(ratingValue) ? (
                                                    <FaStar key={index} className="text-yellow-400 w-4 h-4" />
                                                ) : index < ratingValue && ratingValue % 1 !== 0 ? (
                                                    <FaStarHalfAlt key={index} className="text-yellow-400 w-4 h-4" />
                                                ) : (
                                                    <FaRegStar key={index} className="text-gray-300 dark:text-gray-600 w-4 h-4" />
                                                );
                                            })}
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{hotelDetails?.hotelRating?.toFixed(1) || 'N/A'}/5</span>
                                    </div>
                                    <Link href={`/Hotel-details?hotel_id=${hotelDetails?.hotelId}`} className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-gold to-accent-gold/90 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-accent-gold/30 transition-all font-semibold text-sm">
                                        View Hotel Details
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Reviews Section - Full Width & Compact */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="w-full max-w-7xl mx-auto mb-12"
                    >
                        {/* Reviews Header - Premium */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-1 w-8 bg-gradient-to-r from-accent-gold to-accent-gold/50 rounded-full"></div>
                                <span className="text-xs uppercase tracking-widest font-semibold text-accent-gold">Verified Reviews</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-primary-green dark:text-white">Guest Reviews</h3>
                                <div className="flex items-center gap-3 bg-gradient-to-r from-accent-gold/10 to-accent-gold/5 dark:from-slate-700/50 dark:to-slate-700/30 px-4 py-2 rounded-xl border border-accent-gold/30 dark:border-slate-600/50 shadow-sm hover:shadow-md hover:shadow-accent-gold/20 transition-all duration-300 w-fit">
                                    <span className="text-2xl font-playfair font-bold text-accent-gold">{roomDetails.rating?.toFixed(1) || '0'}</span>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">out of 5</span>
                                        <div className="flex gap-0.5">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < Math.round(roomDetails.rating || 0) ? 'bg-accent-gold' : 'bg-gray-300 dark:bg-slate-600'}`}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reviews Content - 2 Column */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {/* Left: Reviews List - 2 columns on desktop */}
                            <div className="md:col-span-2">
                                <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 md:pr-4">
                                    {roomReviews?.length > 0 ? (
                                        roomReviews.map((review: RoomReview) => (
                                            <motion.div
                                                key={review._id}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-5 border border-gray-200 dark:border-slate-700 hover:border-accent-gold/30 hover:shadow-md hover:shadow-accent-gold/10 transition-all duration-300"
                                            >
                                                <ReviewCard review={review} />
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center w-full py-12 bg-gradient-to-br from-accent-gold/5 to-accent-gold/0 dark:from-slate-800/50 dark:to-slate-900/50 rounded-2xl border-2 border-dashed border-accent-gold/20 dark:border-slate-700/50 px-4">
                                            <div className="text-5xl mb-3">✨</div>
                                            <p className="text-gray-800 dark:text-gray-200 font-semibold text-center">No reviews yet</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">Be the first to share your experience</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right: Review Form - 1 column on desktop */}
                            <div className="md:col-span-1">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                    className="sticky top-40 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl md:rounded-3xl border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl hover:shadow-accent-gold/20 transition-all duration-300 p-5 md:p-6 overflow-hidden"
                                >
                                    {/* Premium Header */}
                                    <div className="border-b border-gray-200 dark:border-slate-700 pb-4 mb-4">
                                        <h4 className="text-base md:text-lg font-playfair font-bold text-primary-green dark:text-white">Share Your Experience</h4>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Help other guests with your feedback</p>
                                    </div>

                                    {/* Review Form */}
                                    <StarRating handleSubmit={handleReviewSubmit} />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </main>

            <ModalLayout
                isOpen={isRegistrationModelOpen && !user?.id}
                onClose={setIsRegistrationModelOpen}
            >
                <LoginRegistrationModel onClose={() => setIsRegistrationModelOpen(false)} />
            </ModalLayout>
        </>
    );
};

export default Page;
