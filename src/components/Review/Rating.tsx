"use client";

import { useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import ButtonLoading from "../Loading/ButtonLoading";
import Error from "../Error/Error";

interface ComponentProps {
    handleSubmit: (rating: number, review: string) => void;
}

const StarRating = ({ handleSubmit }: ComponentProps) => {
    const [newRating, setNewRating] = useState(0); // Final selected rating
    const [hoverRating, setHoverRating] = useState(0); // Hovered rating
    const [newReview, setNewReview] = useState(""); // Review text
    const [isLoading, setIsLoading] = useState(false); // Start as false
    const [error, setError] = useState<string>("");;
    const handleClick = (value: number) => {
        setNewRating(value);
    };

    const handleMouseMove = (event: React.MouseEvent, value: number) => {
        const { clientX, currentTarget } = event;
        const rect = currentTarget.getBoundingClientRect();
        const isHalf = clientX - rect.left < rect.width / 2;
        setHoverRating(isHalf ? value - 0.5 : value);
    };

    const handleUpdateReview = async () => {
        if (newRating === 0 || isLoading) {
            setError("Please select a rating");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        };
        if (newReview.length < 10) {
            setError("Review must be atleast 10 characters long");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }

        setIsLoading(true);

        await handleSubmit(newRating, newReview);

        // Reset form after successful submission
        setNewRating(0);
        setNewReview("");
        setHoverRating(0);

        setIsLoading(false);
    };

    return (
        <div className="w-full bg-white dark:bg-bannerbg p-4 rounded-lg shadow-sm border border-gray-200 text-center">
            <h2 className="text-lg text-left font-semibold text-gray-800 dark:text-white mb-3">📝 Add Your Review</h2>
            <p className="text-base text-left text-gray-600 dark:text-slate-200 font-semibold">Rating</p>
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
                required={true}
                minLength={10}
                maxLength={500}
                onChange={(e) => setNewReview(e.target.value)}
            />
            {newReview.length > 0 && (
                <p className="text-xs text-gray-400 text-right -mt-1">
                    Characters left: {500 - newReview.length}/500
                </p>
            )}
            {error && <Error error={error} />}
            <button
                className="w-1/2 flex justify-center mx-auto bg-primaryblue text-white px-4 py-2 mt-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleUpdateReview}
                type="button"
                disabled={isLoading}
            >
                {isLoading ? <ButtonLoading /> : "Submit Review"}
            </button>
        </div>
    );
};

export default StarRating;
