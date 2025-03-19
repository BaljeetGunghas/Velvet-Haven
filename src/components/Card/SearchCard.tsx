"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
// import { Heart } from "lucide-react";
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
import noImage from "@/asset/no-pictures.png";
import axios from "axios";
import { authHeader } from "@/app/Auth/AuthHeader/authHeader";
import { toast } from "react-toastify";
interface ComponentProps {
    room: SearchRoomIF
}

const SearchCard: React.FC<ComponentProps> = ({
    room
}) => {
    const [isRegistrationModelOpen, setIsRegistrationModelOpen] =
        useState<boolean>(false);
    const { user } = useSelector(
        (state: RootState) => state.auth
    );
    const [isRoomShortlisted, setIsRoomShortlisted] = useState<boolean>(room.is_shortlisted);
    const handleSaveRoomCart = async () => {
        if (user?.id) {
            setIsRoomShortlisted((pre) => !pre)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel-room/update-room-shortlist`,
                {
                    "hotel_id": room.hotel_id,
                    "room_id": room._id,
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
    return (
        <>
            <Card className="shadow-lg rounded-2xl overflow-hidden bg-lightGray dark:bg-bannerbg">
                {/* Image */}
                <div className="relative">
                    <Image
                        src={room.image ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${room.image}` : noImage}
                        alt={room._id || "Hotel Room"}
                        width={320}
                        height={150}
                        className={`w-full h-48 object-contain shadow-sm ${room.image && 'object-cover'}`}
                        loading="lazy"
                    />
                    <Link href={`/room-details/${room._id}`} className="absolute bottom-3 right-3 bg-white p-1 rounded-full shadow-md">
                        <IoIosArrowRoundForward className="w-5 h-5 text-black font-semibold" />
                    </Link>
                </div>

                {/* Content */}
                <CardContent className="py-4 px-2 relative">
                    <p className="text-xl font-bold dark:text-white">₹{room.price_per_night}</p>
                    <div className="flex justify-between items-center">
                        <p className="text-md font-semibold mt-1 dark:text-white capitalize m-0">{room.room_type}</p>
                        <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, index) => {
                                const ratingValue = room.rating || 0;
                                if (index + 1 <= Math.floor(ratingValue)) {
                                    return <FaStar key={index} className="text-yellow-400" />;
                                } else if (index < ratingValue && ratingValue % 1 !== 0) {
                                    return <FaStarHalfAlt key={index} className="text-yellow-400" />;
                                } else {
                                    return <FaRegStar key={index} className="text-gray-400" />;
                                }
                            })}
                        </div>
                    </div>
                    <button onClick={handleSaveRoomCart} className="absolute top-3 right-3 bg-white p-1 rounded-full ">
                        <FaHeart className={`w-4 h-4 ${isRoomShortlisted ? "text-red-600" : "text-black"} `} />
                    </button>
                    {/* Amenities Section */}
                    <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-600">
                        {room.amenities?.slice(0, 5)?.map((amenity) => (
                            <div key={amenity} className="flex items-center gap-1 rounded-md dark:text-white ">
                                {amenitiesIcons[amenity as keyof typeof amenitiesIcons] || "🔹"} {/* Default icon if not found */}
                                <span className="capitalize text-xs">{amenity.replace(/_/g, " ")}</span>
                            </div>
                        ))}
                    </div>

                </CardContent>
            </Card>
            <ModalLayout
                isOpen={isRegistrationModelOpen && !user?.id}
                onClose={setIsRegistrationModelOpen}
            >
                <LoginRegistrationModel />
            </ModalLayout>
        </>
    );
};

export default SearchCard;
