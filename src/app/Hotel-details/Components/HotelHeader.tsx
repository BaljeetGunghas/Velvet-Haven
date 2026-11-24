"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Share2 } from "lucide-react";
import { FaHeart, FaRegStar, FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import axios from "axios";
import { authHeader } from "@/app/Auth/AuthHeader/authHeader";
import { toast } from "react-toastify";

interface HotelHeaderProps {
  hotel: any;
  isShortlisted: boolean;
  onShortlistChange: (state: boolean) => void;
}

export default function HotelHeader({ hotel, isShortlisted, onShortlistChange }: HotelHeaderProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleShortlist = async () => {
    if (!user?.id) {
      toast.info("Please sign in to save favorites");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel/update-shortlist`,
        { hotel_id: hotel._id },
        { headers: authHeader() }
      );

      if (response.data.output === 1) {
        onShortlistChange(!isShortlisted);
        toast.success(isShortlisted ? "Removed from favorites" : "Added to favorites");
      }
    } catch (err) {
      toast.error("Failed to update favorites");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const text = `Check out ${hotel.hotel_name} - ${hotel.hotelAddress}`;
    if (navigator.share) {
      navigator.share({ title: hotel.hotel_name, text });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Title and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-6">
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-primary-green dark:text-white mb-3 leading-tight">
            {hotel.hotel_name}
          </h1>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <MapPin size={20} className="flex-shrink-0" />
            <p className="text-base md:text-lg">{hotel.hotelAddress}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShortlist}
            disabled={loading}
            className="flex-shrink-0 bg-gradient-to-br from-accent-gold/15 to-accent-gold/5 p-3.5 rounded-full hover:from-accent-gold/30 hover:to-accent-gold/15 transition-all border border-accent-gold/40 hover:border-accent-gold/60 hover:shadow-xl hover:shadow-accent-gold/20 disabled:opacity-50"
          >
            <FaHeart
              className={`w-6 h-6 transition-all ${
                isShortlisted ? "text-accent-gold fill-accent-gold" : "text-gray-400"
              }`}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="flex-shrink-0 bg-gradient-to-br from-primary-green/15 to-primary-green/5 p-3.5 rounded-full hover:from-primary-green/30 hover:to-primary-green/15 transition-all border border-primary-green/40 hover:border-primary-green/60 hover:shadow-xl hover:shadow-primary-green/20"
          >
            <Share2 className="w-6 h-6 text-primary-green" />
          </motion.button>
        </div>
      </div>

      {/* Rating and Info Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 pb-6 border-b border-gray-200 dark:border-slate-700">
        {/* Rating Badge */}
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-50/50 dark:from-slate-800/50 dark:to-slate-700/30 rounded-xl px-4 py-3 border border-yellow-200 dark:border-slate-600/50">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => {
                  const rating = hotel.hotelRating || 0;
                  return i + 1 <= Math.floor(rating) ? (
                    <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                  ) : i < rating && rating % 1 !== 0 ? (
                    <FaStarHalfAlt key={i} className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <FaRegStar key={i} className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                  );
                })}
              </div>
              <div>
                <p className="text-xl font-bold text-primary-green dark:text-white">
                  {(hotel.hotelRating || 0).toFixed(1)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">from {hotel.reviews?.length || 0} reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
