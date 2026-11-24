"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Wifi, Tv, Coffee, Bath, Wind } from "lucide-react";

const roomTypes = [
  {
    id: 1,
    name: "Deluxe Room",
    price: "₹5,000",
    image: "🏨",
    rating: 4.6,
    reviews: 320,
    features: ["King/Twin Beds", "City View", "Marble Bathroom", "Work Desk"],
    amenities: [
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: Tv, label: "Smart TV" },
      { icon: Coffee, label: "Coffee Maker" },
      { icon: Bath, label: "Luxury Bath" },
    ],
    description: "Experience comfort in our spacious deluxe rooms with modern amenities and stunning views.",
    capacity: "2-3 Guests",
  },
  {
    id: 2,
    name: "Premium Suite",
    price: "₹8,500",
    image: "👑",
    rating: 4.8,
    reviews: 420,
    features: ["Living Area", "Separate Bedroom", "Ocean View", "Jacuzzi"],
    amenities: [
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: Tv, label: "Smart TV" },
      { icon: Coffee, label: "Nespresso" },
      { icon: Wind, label: "Air Purifier" },
    ],
    description: "Indulge in luxury with our premium suites featuring separate living areas and premium amenities.",
    capacity: "2-4 Guests",
  },
  {
    id: 3,
    name: "Luxury Penthouse",
    price: "₹15,000",
    image: "✨",
    rating: 4.9,
    reviews: 150,
    features: ["Panoramic View", "Private Terrace", "Executive Lounge", "Butler Service"],
    amenities: [
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: Tv, label: "Cinema System" },
      { icon: Coffee, label: "Espresso Bar" },
      { icon: Bath, label: "Spa Tub" },
    ],
    description: "Experience ultimate luxury in our penthouse suites with personalized butler service.",
    capacity: "2-6 Guests",
  },
];

export default function RoomsPage() {
  const [selectedRoom, setSelectedRoom] = useState(roomTypes[0]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-28 lg:pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-primary-green dark:text-white mb-4">
              Rooms & <span className="text-accent-gold">Suites</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Explore our luxurious collection of premium rooms and suites, each designed with elegance and comfort in mind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Room Gallery */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {roomTypes.map((room) => (
            <motion.div
              key={room.id}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedRoom(room)}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                selectedRoom.id === room.id
                  ? "bg-accent-gold/20 border-accent-gold dark:bg-accent-gold/10"
                  : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:border-accent-gold/50"
              }`}
            >
              <div className="text-4xl mb-3">{room.image}</div>
              <h3 className="text-xl font-semibold text-primary-green dark:text-white mb-2">
                {room.name}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 fill-accent-gold text-accent-gold" />
                <span className="font-semibold">{room.rating}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">({room.reviews})</span>
              </div>
              <p className="text-2xl font-bold text-accent-gold mb-2">{room.price}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">per night</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Selected Room Details */}
        <motion.div
          key={selectedRoom.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/50 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-slate-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center md:text-left">
              <div className="text-7xl mb-6">{selectedRoom.image}</div>
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-primary-green dark:text-white mb-4">
                {selectedRoom.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                {selectedRoom.description}
              </p>

              <div className="mb-8">
                <h3 className="font-semibold text-primary-green dark:text-white mb-4">Room Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedRoom.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent-gold"></span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-primary-green dark:text-white mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedRoom.amenities.map((amenity, idx) => {
                    const Icon = amenity.icon;
                    return (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-accent-gold/10 rounded-lg">
                        <Icon className="w-5 h-5 text-accent-gold flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{amenity.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-accent-gold/10 dark:bg-accent-gold/5 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-primary-green dark:text-white mb-4">
                  Room Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Capacity</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {selectedRoom.capacity}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Room Size</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">45-60 sq.m</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Price Per Night</p>
                    <p className="text-2xl font-bold text-accent-gold">{selectedRoom.price}</p>
                  </div>
                </div>
              </div>

              <Link
                href="/SearchResult?city=delhi&check_in_date=2026-11-24&check_out_date=2026-11-25&adults=1&page=1"
                className="block"
              >
                <button className="w-full bg-accent-gold hover:bg-accent-gold/90 text-primary-green font-semibold py-4 rounded-lg transition-all duration-300">
                  Book This Room
                </button>
              </Link>

              <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
                <h3 className="font-semibold text-primary-green dark:text-white mb-3">
                  What's Included
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-accent-gold">✓</span> Complimentary breakfast
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent-gold">✓</span> Airport transfers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent-gold">✓</span> Gym access
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent-gold">✓</span> Room service (24/7)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
