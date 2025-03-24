"use client";

import { useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = () => {
    const [newRating, setNewRating] = useState(0); // Final selected rating
    const [hoverRating, setHoverRating] = useState(0); // Hovered rating
    const [newReview, setNewReview] = useState(""); // Review text
    const handleClick = (value: number) => {
        setNewRating(value);
    };

    const handleMouseMove = (event: React.MouseEvent, value: number) => {
        const { clientX, currentTarget } = event;
        const rect = currentTarget.getBoundingClientRect();
        const isHalf = clientX - rect.left < rect.width / 2;
        setHoverRating(isHalf ? value - 0.5 : value);
    };

    const handleUpdateReview = () => {
        console.log("Rating: ", newRating);
        console.log("Review: ", newReview);
    };


    return (
        <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
            <h2 className="text-lg text-left font-semibold text-gray-800 mb-3">📝 Add Your Review</h2>
            <p className="text-base text-left text-gray-600 font-semibold">Rating</p>
            <div className="flex gap-1 text-xl text-yellow-400">
                {Array.from({ length: 5 }).map((_, index) => {
                    const ratingValue = index + 1;
                    const displayRating = hoverRating || newRating;

                    return (
                        <button
                            key={index}
                            onMouseMove={(event) => handleMouseMove(event, ratingValue)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => handleClick(displayRating)}
                            onTouchStart={() => handleClick(ratingValue)}
                            className="cursor-pointer"
                        >
                            {displayRating >= ratingValue ? (
                                <FaStar />
                            ) : displayRating >= ratingValue - 0.5 ? (
                                <FaStarHalfAlt />
                            ) : (
                                <FaRegStar className="text-gray-300" />
                            )}
                        </button>
                    );
                })}
            </div>
            <textarea
                className="w-full h-24 p-2 mt-3 border rounded-md outline-none focus:border-blue-600 text-xs"
                placeholder="Write your review here..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
            />

            <button
                className="w-1/2 mx-auto bg-primaryblue text-white px-4 py-2 mt-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                onClick={() => { handleUpdateReview() }}
            >
                Submit Review
            </button>
        </div>
    );
};

export default StarRating;
