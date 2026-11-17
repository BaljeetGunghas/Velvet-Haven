"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Shimla from "@/asset/destination/Shimla.svg";
import Agra from "@/asset/destination/Agra.svg";
import Jaipur from "@/asset/destination/Jaipur.svg";
import Mumbai from "@/asset/destination/Mumbai.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, Star, ArrowRight } from "lucide-react";

const TopDestinationHotel = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const topDestinationsDetails = [
    {
      id: 1,
      name: "Mumbai",
      image: Mumbai,
      description: "Experience the vibrant energy and coastal charm",
      hotels: 42,
      rating: 4.8,
      reviews: 1250,
      highlights: ["Beachfront hotels", "Modern luxury", "City views"],
    },
    {
      id: 2,
      name: "Jaipur",
      image: Jaipur,
      description: "Discover the pink city's architectural wonders",
      hotels: 38,
      rating: 4.7,
      reviews: 980,
      highlights: ["Heritage resorts", "Palace stays", "Royal experience"],
    },
    {
      id: 3,
      name: "Shimla",
      image: Shimla,
      description: "Escape to the misty mountains and serene valleys",
      hotels: 35,
      rating: 4.9,
      reviews: 1120,
      highlights: ["Mountain views", "Adventure ready", "Peaceful retreat"],
    },
    {
      id: 4,
      name: "Agra",
      image: Agra,
      description: "Marvel at timeless beauty and historic grandeur",
      hotels: 40,
      rating: 4.6,
      reviews: 1050,
      highlights: ["Taj Mahal view", "Luxury stays", "Cultural tours"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-16 xl:px-24 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-12 sm:mb-16 lg:mb-20">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <div className="h-0.5 w-8 bg-gradient-to-r from-accent-gold/30 to-accent-gold"></div>
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[2.5px] text-accent-gold">
            Explore Now
          </span>
          <div className="h-0.5 w-8 bg-gradient-to-l from-accent-gold/30 to-accent-gold"></div>
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-semibold text-center text-primary-green dark:text-white mb-4"
        >
          Book Hotels at
          <span className="block text-accent-gold">Popular Destinations</span>
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto"
        >
          Discover extraordinary luxury stays across India's most enchanting destinations
        </motion.p>
      </div>

      {/* Destination Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-5 lg:gap-6"
      >
        {topDestinationsDetails.map((destination) => (
          <motion.div
            key={destination.id}
            variants={itemVariants}
            onMouseEnter={() => setHoveredId(destination.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative h-80 sm:h-72 lg:h-80 rounded-2xl overflow-hidden cursor-pointer"
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/50 group-hover:to-black/30 transition-all duration-300" />
            </div>

            {/* Content Container */}
            <div className="relative h-full p-5 sm:p-6 lg:p-6 flex flex-col justify-end">
              {/* Bottom Content - Always Visible */}
              <div className="space-y-3">
                {/* Destination Name & Location */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={16} className="text-accent-gold flex-shrink-0" />
                    <h3 className="text-2xl sm:text-xl lg:text-2xl font-playfair font-semibold text-white">
                      {destination.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-200 line-clamp-1">
                    {destination.description}
                  </p>
                </div>

                {/* Rating & Hotel Count */}
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < Math.floor(destination.rating)
                              ? "fill-accent-gold text-accent-gold"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-300">
                      {destination.rating} ({destination.reviews})
                    </span>
                  </div>
                  <span className="text-accent-gold font-semibold">
                    {destination.hotels}+ Hotels
                  </span>
                </div>

                {/* Hover Content - Highlights */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: hoveredId === destination.id ? 1 : 0,
                    height: hoveredId === destination.id ? "auto" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 border-t border-white/20 space-y-2">
                    <p className="text-xs text-gray-300 font-medium">
                      Popular highlights:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {destination.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="inline-block text-xs px-2.5 py-1 bg-accent-gold/20 text-accent-gold rounded-full font-medium whitespace-nowrap"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Hover Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: hoveredId === destination.id ? 1 : 0,
                  y: hoveredId === destination.id ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent-gold to-accent-gold/80 hover:from-accent-gold/90 hover:to-accent-gold/70 text-primary-green font-semibold py-2.5 rounded-lg transition-all duration-300 text-sm"
              >
                Explore Stays
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 sm:mt-20 lg:mt-24 max-w-3xl mx-auto text-center"
      >
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-6">
          Can't find your destination? Explore all available hotels and resorts across India.
        </p>
        <Button className="bg-gradient-to-r from-primary-green to-accent-gold hover:from-primary-green/90 hover:to-accent-gold/90 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          View All Destinations
          <ArrowRight size={18} className="ml-2" />
        </Button>
      </motion.div>
    </motion.section>
  );
};

export default TopDestinationHotel;
