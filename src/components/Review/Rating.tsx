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
        <div className="w-full bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-4 md:p-5 rounded-lg md:rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 space-y-4">
            {/* Header */}
            <div className="border-b border-gray-200 dark:border-slate-700 pb-3">
                <h2 className="text-sm md:text-base font-playfair font-bold text-primary-green dark:text-white">Add Your Review</h2>
            </div>

            {/* Rating Section */}
            <div className="space-y-3">
                <label className="block text-xs uppercase tracking-widest font-semibold text-gray-600 dark:text-gray-400">Your Rating</label>
                <div className="flex gap-2 text-2xl md:text-3xl">
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
                                className="cursor-pointer transition-transform duration-200 hover:scale-110"
                            >
                                {displayRating >= ratingValue ? (
                                    <FaStar className="text-accent-gold drop-shadow-sm" />
                                ) : displayRating >= ratingValue - 0.5 ? (
                                    <FaStarHalfAlt className="text-accent-gold drop-shadow-sm" />
                                ) : (
                                    <FaRegStar className="text-gray-300 dark:text-gray-600" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Review Text Area */}
            <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest font-semibold text-gray-600 dark:text-gray-400">Your Review</label>
                <textarea
                    className="w-full h-20 p-3 md:p-3 border border-gray-200 dark:border-slate-600 rounded-lg md:rounded-xl outline-none focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/20 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-xs md:text-sm placeholder-gray-400 dark:placeholder-gray-500 resize-none transition-all duration-300"
                    placeholder="Share your experience..."
                    value={newReview}
                    required={true}
                    minLength={10}
                    maxLength={500}
                    onChange={(e) => setNewReview(e.target.value)}
                />
                {newReview.length > 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
                        {500 - newReview.length} characters left
                    </p>
                )}
            </div>

            {/* Error Message */}
            {error && <Error error={error} />}

            {/* Submit Button */}
            <button
                className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-accent-gold to-accent-gold/90 hover:from-accent-gold/90 hover:to-accent-gold text-white px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl font-semibold text-sm md:text-base transition-all duration-300 hover:shadow-lg hover:shadow-accent-gold/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleUpdateReview}
                type="button"
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <ButtonLoading />
                        Submitting...
                    </>
                ) : (
                    <>
                        Submit Review
                    </>
                )}
            </button>
        </div>
    );
};

export default StarRating;
