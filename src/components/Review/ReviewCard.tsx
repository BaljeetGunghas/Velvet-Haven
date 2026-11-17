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
            <div className="p-4 md:p-5 border border-gray-200 dark:border-slate-700 rounded-lg md:rounded-xl shadow-sm hover:shadow-md hover:shadow-accent-gold/10 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 transition-all duration-300 relative group">
                {/* User Info - Premium Header */}
                <div className="flex items-start justify-between gap-3 mb-3 pb-3 border-b border-gray-100 dark:border-slate-700">
                    <div className="flex items-center gap-3 flex-1">
                        <div className="relative">
                            <Image
                                width={44}
                                height={44}
                                src={review.user_id.profile_picture
                                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${review.user_id.profile_picture}`
                                    : noImage}
                                alt="User Profile"
                                className="w-11 h-11 rounded-full object-cover border-2 border-accent-gold/20 shadow-sm"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold capitalize text-primary-green dark:text-white">{review.user_id.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                        </div>
                    </div>

                    {/* Star Rating - Premium */}
                    <div className="flex items-center gap-0.5 bg-gradient-to-r from-yellow-50 to-yellow-50/50 dark:from-slate-700/30 dark:to-slate-700/10 px-2.5 py-1.5 rounded-lg">
                        {Array.from({ length: 5 }, (_, index) =>
                            index + 1 <= Math.floor(review.rating) ? (
                                <FaStar key={index} className="text-accent-gold text-sm" />
                            ) : index + 0.5 === review.rating ? (
                                <FaStarHalfAlt key={index} className="text-accent-gold text-sm" />
                            ) : (
                                <FaRegStar key={index} className="text-gray-300 dark:text-gray-600 text-sm" />
                            )
                        )}
                    </div>
                </div>

                {/* Comment - Premium Text */}
                <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300 font-normal">{review.comment}</p>

                {/* Like & Dislike Buttons - Premium */}
                <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100 dark:border-slate-700">
                    <button
                        onClick={() => handleLikeDislike("like")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                            userAction === "like"
                                ? "bg-accent-gold/20 dark:bg-accent-gold/10 text-accent-gold border border-accent-gold/30"
                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700/50 border border-gray-200 dark:border-slate-700"
                        }`}
                    >
                        <FaThumbsUp className="w-3.5 h-3.5" />
                        <span>{likes}</span>
                    </button>
                    <button
                        onClick={() => handleLikeDislike("dislike")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                            userAction === "dislike"
                                ? "bg-red-100/50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/30"
                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700/50 border border-gray-200 dark:border-slate-700"
                        }`}
                    >
                        <FaThumbsDown className="w-3.5 h-3.5" />
                        <span>{dislikes}</span>
                    </button>
                </div>
            </div>

            {/* Login Modal */}
            <ModalLayout isOpen={isRegistrationModelOpen} onClose={setIsRegistrationModelOpen}>
                <LoginRegistrationModel onClose={() => setIsRegistrationModelOpen(false)} />
            </ModalLayout>
        </>
    );
};

export default ReviewCard;
