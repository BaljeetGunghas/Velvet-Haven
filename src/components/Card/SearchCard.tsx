"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { SearchRoomIF } from "@/app/SearchResult/page";
import { amenitiesIcons } from "./amenitiesIcons";
import { IoIosArrowRoundForward } from "react-icons/io";
import Link from "next/link";
import { FaHeart, FaRegStar, FaStar } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import ModalLayout from "../ModelLayout/Modellayout";
import LoginRegistrationModel from "../LoginRegModel/LoginRegistrationModel";
import { FaStarHalfAlt } from "react-icons/fa";
import noImage from "@/asset/no-image.jpg";
import axios from "axios";
import { authHeader } from "@/app/Auth/AuthHeader/authHeader";
import { toast } from "react-toastify";

interface ComponentProps {
    room: SearchRoomIF | null;
}

const SearchCard: React.FC<ComponentProps> = ({ room }) => {
    const [isRegistrationModelOpen, setIsRegistrationModelOpen] = useState<boolean>(false);
    const { user } = useSelector((state: RootState) => state.auth);
    const [isRoomShortlisted, setIsRoomShortlisted] = useState<boolean>(room?.is_shortlisted || false);

    const handleSaveRoomCart = async () => {
        if (user?.id) {
            setIsRoomShortlisted((pre) => !pre);
            // ✅ UPDATED: New RESTful endpoint
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel-room/${room?._id}/shortlist`,
                {},
                { headers: authHeader() }
            );
            const responseData = response.data;
            if (responseData.output === 1) {
                setIsRoomShortlisted(!isRoomShortlisted);
            } else {
                setIsRoomShortlisted(false);
                return toast.error(responseData.message || "Failed to shortlist room");
            }
        } else {
            setIsRegistrationModelOpen(true);
        }
    };

    return (
        <>
            <motion.div
                whileHover={{ y: -12, scale: 1.04 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
            >
                <Card className="shadow-lg hover:shadow-3xl hover:shadow-accent-gold/50 rounded-3xl overflow-hidden bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-accent-gold/70 transition-all duration-300 group flex flex-col h-full">
                    {/* Image Container - Refined 16:10 Aspect Ratio */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 h-64 md:h-72">
                        <Image
                            src={room?.image ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${room?.image}` : noImage}
                            alt={room?._id || "Hotel Room"}
                            width={400}
                            height={250}
                            className={`w-full h-full object-contain transition-transform duration-700 group-hover:scale-115 ${room?.image && 'object-cover'}`}
                            loading="lazy"
                            priority={false}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Luxury Badge - Top Left - Refined */}
                        {room?.rating && room.rating >= 4.5 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className="absolute top-3 left-3 z-20"
                            >
                                <div className="bg-gradient-to-r from-accent-gold via-accent-gold to-accent-gold/90 text-white px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-md backdrop-blur-sm border border-accent-gold/50">
                                    ★ Luxury
                                </div>
                            </motion.div>
                        )}

                        {/* Occupancy Badge - Top Right - Refined */}
                        {room?.max_occupancy && (
                            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-primary-green shadow-md border border-white/40">
                                👥 {room.max_occupancy}
                            </div>
                        )}

                        {/* View Details Button - Image Hover */}
                        <Link
                            href={`/Room-details?room_id=${room?._id}`}
                            className="absolute bottom-3 right-3 bg-accent-gold text-white px-3.5 py-2 rounded-lg shadow-lg hover:shadow-xl hover:bg-accent-gold/90 transition-all duration-300 flex items-center gap-1.5 font-semibold text-xs opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                        >
                            View
                            <IoIosArrowRoundForward className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Premium Header Line */}
                    <div className="h-1 bg-gradient-to-r from-accent-gold/0 via-accent-gold/50 to-accent-gold/0" />

                    {/* Content */}
                    <CardContent className="py-5 px-4 relative flex-grow flex flex-col space-y-3">
                        {/* Price Section - Refined Hierarchy */}
                        <div className="flex items-baseline justify-between gap-3">
                            <div className="flex-1">
                                <div className="flex items-baseline gap-1">
                                    <p className="text-3xl font-playfair font-bold text-accent-gold dark:text-accent-gold">
                                        ₹{room?.price_per_night?.toLocaleString('en-IN')}
                                    </p>
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400"> / night</p>
                                </div>
                            </div>
                            <button
                                onClick={handleSaveRoomCart}
                                className="bg-gradient-to-br from-accent-gold/15 to-accent-gold/5 p-2.5 rounded-full hover:from-accent-gold/30 hover:to-accent-gold/15 transition-all duration-300 border border-accent-gold/40 hover:border-accent-gold/60 hover:shadow-md flex-shrink-0"
                            >
                                <FaHeart
                                    className={`w-4 h-4 transition-all duration-300 ${
                                        isRoomShortlisted
                                            ? 'text-accent-gold fill-accent-gold'
                                            : 'text-gray-400 dark:text-gray-500'
                                    }`}
                                />
                            </button>
                        </div>

                        {/* Room Type with Bed Info */}
                        <div>
                            <p className="text-lg font-bold text-primary-green dark:text-white capitalize">
                                {room?.room_type}
                            </p>
                            {room?.bed_type && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium capitalize mt-0.5">
                                    🛏️ {room.bed_type} Bed
                                </p>
                            )}
                        </div>

                        {/* Rating Display - Compact Single Line */}
                        <div className="flex items-center gap-2 bg-yellow-50 dark:bg-slate-700/40 px-3 py-2 rounded-lg border border-yellow-100 dark:border-slate-600/30 w-fit">
                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, index) => {
                                    const ratingValue = room?.rating || 0;
                                    if (index + 1 <= Math.floor(ratingValue)) {
                                        return <FaStar key={index} className="text-yellow-400 w-3.5 h-3.5" />;
                                    } else if (index < ratingValue && ratingValue % 1 !== 0) {
                                        return <FaStarHalfAlt key={index} className="text-yellow-400 w-3.5 h-3.5" />;
                                    } else {
                                        return <FaRegStar key={index} className="text-gray-300 dark:text-gray-600 w-3.5 h-3.5" />;
                                    }
                                })}
                            </div>
                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                {room?.rating?.toFixed(1) || '0'}
                            </span>
                        </div>

                        {/* Amenities Section - Fixed Wrapping */}
                        <div className="flex-grow">
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2">
                                Amenities
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {room?.amenities?.slice(0, 5)?.map((amenity) => (
                                    <div
                                        key={amenity}
                                        className="flex items-center gap-1.5 bg-gray-100 dark:bg-slate-700/60 px-2.5 py-1.5 rounded-md hover:bg-accent-gold/20 dark:hover:bg-accent-gold/20 transition-all duration-300 border border-gray-200 dark:border-slate-600/50 hover:border-accent-gold/40"
                                    >
                                        <span className="text-sm flex-shrink-0">{amenitiesIcons[amenity as keyof typeof amenitiesIcons] || '🔹'}</span>
                                        <span className="capitalize text-xs font-medium text-gray-700 dark:text-gray-300">
                                            {amenity.replace(/_/g, ' ')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* View Details Button - Card Bottom */}
                        <Link
                            href={`/Room-details?room_id=${room?._id}`}
                            className="w-full bg-gradient-to-r from-accent-gold to-accent-gold/90 text-white px-4 py-2.5 rounded-lg hover:shadow-lg hover:shadow-accent-gold/30 transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm mt-auto"
                        >
                            View Details
                            <IoIosArrowRoundForward className="w-4 h-4" />
                        </Link>
                    </CardContent>
                </Card>
            </motion.div>
            <ModalLayout
                isOpen={isRegistrationModelOpen && !user?.id}
                onClose={setIsRegistrationModelOpen}
            >
                <LoginRegistrationModel onClose={() => setIsRegistrationModelOpen(false)} />
            </ModalLayout>
        </>
    );
};

export default SearchCard;
