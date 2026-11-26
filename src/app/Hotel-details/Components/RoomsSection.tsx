"use client";

import { motion } from "framer-motion";
import SearchCard from "@/components/Card/SearchCard";

interface RoomsSectionProps {
  rooms: any[];
  hotelName: string;
}

export default function RoomsSection({ rooms, hotelName }: RoomsSectionProps) {
  if (!rooms || rooms.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-3xl font-playfair font-bold text-primary-green dark:text-white mb-10">
        Available Room Types
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {rooms.slice(0, 5).map((room: any, i: number) => (
          <motion.div
            key={room._id || i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="w-full"
          >
            <SearchCard room={room} />
          </motion.div>
        ))}
      </div>

      {rooms.length > 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-12 p-6 bg-gradient-to-r from-accent-gold/5 to-primary-green/5 dark:from-slate-800/30 dark:to-slate-800/20 rounded-2xl border border-accent-gold/20 dark:border-slate-700/30"
        >
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            Showing <span className="font-bold text-accent-gold">5 of {rooms.length}</span> available rooms
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Explore all rooms to find your perfect match</p>
        </motion.div>
      )}
    </div>
  );
}
