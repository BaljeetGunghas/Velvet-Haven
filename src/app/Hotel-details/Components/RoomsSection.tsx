"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
        {rooms.slice(0, 6).map((room: any, i: number) => (
          <motion.div
            key={room._id || i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            whileHover={{ y: -8 }}
            className="group bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-accent-gold/20 hover:border-accent-gold/50 transition-all"
          >
            {/* Room Info */}
            <div className="p-7 md:p-8">
              <div className="mb-5">
                <h3 className="text-xl font-playfair font-bold text-primary-green dark:text-white mb-2 capitalize group-hover:text-accent-gold transition-colors">
                  {room.room_type}
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5">
                  <p className="flex items-center gap-2">
                    <span className="text-base">👥</span>
                    <span>Up to {room.max_occupancy} {room.max_occupancy === 1 ? "guest" : "guests"}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-base">🛏️</span>
                    <span>{room.bed_type}</span>
                  </p>
                  {room.floor_number && (
                    <p className="flex items-center gap-2">
                      <span className="text-base">📍</span>
                      <span>Floor {room.floor_number}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-slate-700 pt-6 mt-6">
                <div className="mb-5">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Starting from</p>
                  <p className="text-3xl font-playfair font-bold text-accent-gold">
                    ₹{room.price_per_night?.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">per night</p>
                </div>

                <Link href={`/Room-details?room_id=${room._id}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="w-full bg-gradient-to-r from-accent-gold to-accent-gold/90 text-white hover:shadow-lg hover:shadow-accent-gold/30 font-bold py-3 rounded-xl transition-all">
                      View Room Details
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {rooms.length > 6 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-12 p-6 bg-gradient-to-r from-accent-gold/5 to-primary-green/5 dark:from-slate-800/30 dark:to-slate-800/20 rounded-2xl border border-accent-gold/20 dark:border-slate-700/30"
        >
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            Showing <span className="font-bold text-accent-gold">6 of {rooms.length}</span> available rooms
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Explore all rooms to find your perfect match</p>
        </motion.div>
      )}
    </div>
  );
}
