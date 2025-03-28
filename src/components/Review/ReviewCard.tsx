"use client";

import Image from 'next/image';
import React, { FC, useState } from 'react';
import { FaRegStar, FaStar, FaThumbsDown, FaThumbsUp } from 'react-icons/fa6';
import noImage from "@/asset/no-image.jpg";
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import ModalLayout from '../ModelLayout/Modellayout';
import LoginRegistrationModel from '../LoginRegModel/LoginRegistrationModel';
import { authHeader } from '@/app/Auth/AuthHeader/authHeader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RoomReview } from '@/app/Room-details/page';
import { FaStarHalfAlt } from 'react-icons/fa';

interface ReviewCardProps {
    review: RoomReview;
}

const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [isRegistrationModelOpen, setIsRegistrationModelOpen] = useState(false);
    const [likes, setLikes] = useState(review.likes.length);
    const [dislikes, setDislikes] = useState(review.dislikes.length);
    const [userAction, setUserAction] = useState<"like" | "dislike" | null>(review.isLiked ? "like" : review.isDisliked ? "dislike" : null);

    const handleLikeDislike = async (action: "like" | "dislike") => {
        if (!user?.id) {
            setIsRegistrationModelOpen(true);
            return;
        }

        try {
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel-room/likeDislikeReview`,
                { reviewId: review._id, action },
                { headers: authHeader() }
            );

            if (data.output !== 1) return toast.error(data.message);

            setLikes(data.jsonResponse.likes.length);
            setDislikes(data.jsonResponse.dislikes.length);
            console.log(action === userAction ? null : action);
            
            setUserAction(action === userAction ? null : action);
        } catch (err) {
            console.error("Error fetching room details:", err);
        }
    };

    return (
        <>
            <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-bannerbg relative">
                {/* User Info */}
                <div className="flex items-center gap-3">
                    <Image
                        width={40}
                        height={40}
                        src={review.user_id.profile_picture
                            ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${review.user_id.profile_picture}`
                            : noImage}
                        alt="User Profile"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                        <p className="text-sm font-semibold capitalize dark:text-white text-gray-800">{review.user_id.name}</p>
                        <p className="text-xs text-gray-500 dark:text-stone-400">{new Date(review.created_at).toDateString()}</p>
                    </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mt-2 text-yellow-400">
                    {Array.from({ length: 5 }, (_, index) =>
                        index + 1 <= Math.floor(review.rating) ? (
                            <FaStar key={index} />
                        ) : index + 0.5 === review.rating ? (
                            <FaStarHalfAlt key={index} />
                        ) : (
                            <FaRegStar key={index} className="text-gray-300" />
                        )
                    )}
                </div>

                {/* Comment */}
                <p className="mt-2 text-xs text-gray-700 dark:text-slate-200">{review.comment}</p>

                {/* Like & Dislike Buttons */}
                <div className="flex items-center gap-4 mt-3 text-gray-500 dark:text-white absolute top-3 right-3">
                    <button
                        onClick={() => handleLikeDislike("like")}
                        className={`flex items-center gap-1 hover:text-blue-600 ${userAction === "like" && "text-blue-600"}`}
                    >
                        <FaThumbsUp /> {likes}
                    </button>
                    <button
                        onClick={() => handleLikeDislike("dislike")}
                        className={`flex items-center gap-1 hover:text-red-600 ${userAction === "dislike" && "text-red-600"}`}
                    >
                        <FaThumbsDown /> {dislikes}
                    </button>
                </div>
            </div>

            {/* Login Modal */}
            <ModalLayout isOpen={isRegistrationModelOpen} onClose={setIsRegistrationModelOpen}>
                <LoginRegistrationModel />
            </ModalLayout>
        </>
    );
};

export default ReviewCard;
