"use client";

import { motion } from "framer-motion";

interface HotelHighlightsProps {
  hotel: any;
}

export default function HotelHighlights({ hotel }: HotelHighlightsProps) {
  const highlights = [
    { label: "Total Rooms", value: hotel.total_rooms || "100+", icon: "🏨" },
    { label: "Restaurants", value: hotel.restaurant_count || "3+", icon: "🍽️" },
    { label: "Amenities", value: hotel.amenities?.length || "20+", icon: "✨" },
    { label: "Rating", value: `${(hotel.hotelRating || 0).toFixed(1)}/5`, icon: "⭐" },
  ];

  return (
    <div>
      <h3 className="text-3xl font-playfair font-bold text-primary-green dark:text-white mb-8">
        Hotel Highlights
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
        {highlights.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -8, borderColor: '#C9A568' }}
            className="group bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl p-7 md:p-8 text-center hover:shadow-xl hover:shadow-accent-gold/20 transition-all duration-300"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
              {item.label}
            </p>
            <p className="text-3xl font-playfair font-bold text-primary-green dark:text-white">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
