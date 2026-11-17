"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface BookingPanelProps {
  hotel: any;
}

export default function BookingPanel({ hotel }: BookingPanelProps) {
  const router = useRouter();
  const [nights, setNights] = useState(1);
  const [checkIn, setCheckIn] = useState(new Date().toISOString().split("T")[0]);
  const [checkOut, setCheckOut] = useState(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  const [guests, setGuests] = useState(1);

  const pricePerNight = hotel.starting_price || 5000;
  const subtotal = pricePerNight * nights;
  const taxes = Math.round(subtotal * 0.18);
  const total = subtotal + taxes;

  const handleSearch = () => {
    router.push(
      `/SearchResult?hotel_id=${hotel._id}&check_in_date=${checkIn}&check_out_date=${checkOut}&adults=${guests}`
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-2xl hover:shadow-accent-gold/20 transition-all p-6 md:p-8"
    >
      <h3 className="text-2xl font-playfair font-bold text-primary-green dark:text-white mb-8">
        Reserve Your Stay
      </h3>

      {/* Two Column Layout on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        {/* Left: Input Fields (3 columns) */}
        <div className="lg:col-span-3 space-y-5">
          {/* Check-in Date */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2.5 block">
              📅 Check-in Date
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold transition-all"
            />
          </div>

          {/* Check-out Date */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2.5 block">
              📅 Check-out Date
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold transition-all"
            />
          </div>

          {/* Guests */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2.5 block">
              👥 Number of Guests
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold transition-all"
            />
          </div>
        </div>

        {/* Right: Price Summary (2 columns) */}
        <div className="lg:col-span-2 lg:border-l border-gray-200 dark:border-slate-700 lg:pl-6 space-y-5">
          {/* Nights Info */}
          <div className="bg-gradient-to-br from-accent-gold/10 to-accent-gold/5 dark:from-slate-700/50 dark:to-slate-700/30 rounded-2xl p-5 border border-accent-gold/20">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-1">
              Duration
            </p>
            <p className="text-3xl font-playfair font-bold text-primary-green dark:text-white">
              {nights} <span className="text-base font-normal">Night{nights !== 1 ? "s" : ""}</span>
            </p>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-4 bg-gray-50 dark:bg-slate-700/30 rounded-2xl p-5 border border-gray-100 dark:border-slate-700">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Base Rate</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ₹{pricePerNight.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">× {nights} night{nights !== 1 ? "s" : ""}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-slate-600 pt-3 flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Taxes (18%)</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ₹{taxes.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-accent-gold/40 pt-4 flex justify-between items-baseline gap-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total</span>
              <span className="text-3xl font-playfair font-bold text-accent-gold">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Button - Full Width */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-8"
      >
        <Button
          onClick={handleSearch}
          className="w-full bg-gradient-to-r from-accent-gold via-accent-gold to-accent-gold/90 text-white hover:shadow-xl hover:shadow-accent-gold/30 px-6 py-4 rounded-2xl font-bold transition-all text-lg shadow-lg"
        >
          Check Available Rooms
        </Button>
      </motion.div>
    </motion.div>
  );
}
