"use client";

import { motion } from "framer-motion";
import { FaStar, FaRegStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";

interface ReviewsSectionProps {
  hotel: any;
}

export default function ReviewsSection({ hotel }: ReviewsSectionProps) {
  const reviews = hotel.reviews || [];
  const rating = hotel.hotelRating || 0;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-8 mb-10">
        <h2 className="text-3xl font-playfair font-bold text-primary-green dark:text-white">
          Guest Reviews & Ratings
        </h2>
        <div className="flex items-center gap-4 bg-gradient-to-br from-yellow-50 to-yellow-50/50 dark:from-slate-800/50 dark:to-slate-700/30 px-6 py-4 rounded-2xl border border-yellow-200 dark:border-slate-600/50 whitespace-nowrap">
          <div>
            <p className="text-4xl font-playfair font-bold text-accent-gold">{rating.toFixed(1)}</p>
          </div>
          <div>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} className="w-4 h-4 text-yellow-400" />
              ))}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}</p>
          </div>
        </div>
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-5">
          {reviews.slice(0, 3).map((review: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 md:p-7 hover:shadow-lg hover:shadow-accent-gold/10 hover:border-accent-gold/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, j) =>
                      j + 1 <= Math.floor(review.rating) ? (
                        <FaStar key={j} className="w-4 h-4 text-yellow-400" />
                      ) : j < review.rating && review.rating % 1 !== 0 ? (
                        <FaStarHalfAlt key={j} className="w-4 h-4 text-yellow-400" />
                      ) : (
                        <FaRegStar key={j} className="w-4 h-4 text-gray-300" />
                      )
                    )}
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {review.user_name || "Guest"}
                  </p>
                </div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {review.rating.toFixed(1)} ⭐
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">{review.comment}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-gray-50 to-gray-50/50 dark:from-slate-800/50 dark:to-slate-800/30 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-700">
          <div className="text-6xl mb-4">⭐</div>
          <p className="text-xl font-playfair font-bold text-gray-800 dark:text-gray-200 mb-2">No Reviews Yet</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs text-center">Be the first guest to share your experience at this wonderful hotel</p>
        </div>
      )}
    </div>
  );
}
