"use client";

import { motion } from "framer-motion";
import { amenitiesIcons } from "@/components/Card/amenitiesIcons";

interface AmenitiesGridProps {
  amenities: string[];
}

export default function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  if (!amenities || amenities.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-3xl font-playfair font-bold text-primary-green dark:text-white mb-8">
        Amenities & Facilities
      </h3>
      <div className="flex flex-wrap gap-3 md:gap-4">
        {amenities.map((amenity, index) => (
          <motion.div
            key={amenity}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: (index % 5) * 0.05 }}
            whileHover={{ scale: 1.08, y: -2 }}
            className="flex items-center gap-2.5 bg-gradient-to-br from-accent-gold/10 to-accent-gold/5 dark:from-slate-800/60 dark:to-slate-800/40 border border-accent-gold/30 dark:border-slate-700/50 px-4 py-2.5 rounded-full hover:border-accent-gold/60 hover:shadow-md hover:shadow-accent-gold/20 dark:hover:shadow-accent-gold/10 transition-all group"
          >
            <span className="text-lg flex-shrink-0 group-hover:scale-125 transition-transform">
              {amenitiesIcons[amenity as keyof typeof amenitiesIcons] || "✓"}
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize whitespace-nowrap">
              {amenity.replace(/_/g, " ")}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
