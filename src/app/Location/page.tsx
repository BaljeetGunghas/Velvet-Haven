"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Navigation, Clock, Star, Wifi, Utensils, Dumbbell, Sparkles } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Location() {
  const locations = [
    {
      id: 1,
      name: "Velvet Haven - Mumbai",
      address: "123 Luxury Lane, Mumbai, India 400001",
      phone: "+91 (22) 1234-5678",
      email: "mumbai@velvethaven.com",
      coordinates: { lat: 19.0760, lng: 72.8777 },
      rating: 4.9,
      reviews: 1250,
      description: "Our flagship luxury property nestled in the heart of Mumbai's premium district",
      highlights: [
        "Beachfront location with Arabian Sea views",
        "200+ premium rooms and suites",
        "3 Michelin-inspired restaurants",
        "Full-service spa and wellness center",
      ],
      amenities: ["WiFi", "Dining", "Fitness", "Spa"],
      directions: "https://maps.google.com/?q=19.0760,72.8777",
    },
    {
      id: 2,
      name: "Velvet Haven - Delhi",
      address: "456 Royal Avenue, New Delhi, India 110001",
      phone: "+91 (11) 9876-5432",
      email: "delhi@velvethaven.com",
      coordinates: { lat: 28.5244, lng: 77.1855 },
      rating: 4.8,
      reviews: 980,
      description: "An epitome of grandeur in India's capital city with stunning heritage charm",
      highlights: [
        "Heritage property with modern luxury",
        "180+ elegantly designed rooms",
        "2 award-winning restaurants",
        "State-of-the-art conference facilities",
      ],
      amenities: ["WiFi", "Dining", "Fitness", "Business Center"],
      directions: "https://maps.google.com/?q=28.5244,77.1855",
    },
    {
      id: 3,
      name: "Velvet Haven - Bangalore",
      address: "789 Tech Park, Bangalore, India 560001",
      phone: "+91 (80) 5432-1098",
      email: "bangalore@velvethaven.com",
      coordinates: { lat: 12.9716, lng: 77.5946 },
      rating: 4.7,
      reviews: 850,
      description: "A contemporary luxury retreat perfect for business travelers and leisure seekers",
      highlights: [
        "IT hub location in Bangalore",
        "150+ modern suites with tech amenities",
        "2 contemporary restaurants",
        "24-hour business center",
      ],
      amenities: ["WiFi", "Dining", "Fitness", "Business Center"],
      directions: "https://maps.google.com/?q=12.9716,77.5946",
    },
    {
      id: 4,
      name: "Velvet Haven - Goa",
      address: "321 Palm Beach, Goa, India 403001",
      phone: "+91 (832) 234-5678",
      email: "goa@velvethaven.com",
      coordinates: { lat: 15.4909, lng: 73.8278 },
      rating: 4.9,
      reviews: 1120,
      description: "A tropical paradise offering unparalleled luxury on Goa's pristine beaches",
      highlights: [
        "Private beach access",
        "160+ oceanfront villas and suites",
        "Beachfront dining and bars",
        "Water sports facilities",
      ],
      amenities: ["WiFi", "Dining", "Fitness", "Water Sports"],
      directions: "https://maps.google.com/?q=15.4909,73.8278",
    },
  ];

  const amenityIcons = {
    WiFi: <Wifi className="w-5 h-5" />,
    Dining: <Utensils className="w-5 h-5" />,
    Fitness: <Dumbbell className="w-5 h-5" />,
    Spa: <Sparkles className="w-5 h-5" />,
    "Business Center": <MapPin className="w-5 h-5" />,
    "Water Sports": <Navigation className="w-5 h-5" />,
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 pt-20 sm:pt-24 lg:pt-28">
      {/* Hero Section */}
      <section className="relative w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-primary-green/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="h-0.5 w-8 bg-gradient-to-r from-accent-gold/30 to-accent-gold"></div>
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[2.5px] text-accent-gold">
              Find Us
            </span>
            <div className="h-0.5 w-8 bg-gradient-to-l from-accent-gold/30 to-accent-gold"></div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-semibold text-center text-primary-green dark:text-white mb-6 leading-tight"
          >
            Our Premium{' '}
            <span className="text-accent-gold">Locations</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-3xl mx-auto"
          >
            Discover our exclusive luxury hotels across India's most coveted destinations
          </motion.p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="relative w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="visible"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-12 lg:space-y-16"
          >
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                variants={itemVariants}
                className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-slate-700 hover:border-accent-gold/50 dark:hover:border-accent-gold/40"
              >
                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-8 sm:p-10 lg:p-12">
                  {/* Left: Location Info */}
                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-semibold uppercase tracking-widest text-accent-gold">
                          Location {location.id}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-primary-green dark:text-white mb-3">
                        {location.name}
                      </h2>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={`${
                                i < Math.floor(location.rating)
                                  ? "fill-accent-gold text-accent-gold"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {location.rating} ({location.reviews} reviews)
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {location.description}
                    </p>

                    {/* Contact Information */}
                    <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                      {/* Address */}
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-accent-gold flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Address</p>
                          <p className="text-sm text-gray-900 dark:text-white">{location.address}</p>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-accent-gold flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Phone</p>
                          <a href={`tel:${location.phone}`} className="text-sm text-gray-900 dark:text-white hover:text-accent-gold transition-colors">
                            {location.phone}
                          </a>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-accent-gold flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Email</p>
                          <a href={`mailto:${location.email}`} className="text-sm text-gray-900 dark:text-white hover:text-accent-gold transition-colors">
                            {location.email}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <a
                        href={location.directions}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-gold to-accent-gold/80 hover:from-accent-gold/90 hover:to-accent-gold/70 text-primary-green font-semibold rounded-lg transition-all duration-300 text-sm"
                      >
                        <Navigation size={18} />
                        Get Directions
                      </a>
                      <a
                        href="#"
                        className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary-green dark:border-accent-gold text-primary-green dark:text-accent-gold font-semibold rounded-lg hover:bg-primary-green/10 dark:hover:bg-accent-gold/10 transition-all duration-300 text-sm"
                      >
                        <Phone size={18} />
                        Call Now
                      </a>
                    </div>
                  </div>

                  {/* Right: Highlights & Amenities */}
                  <div className="space-y-8">
                    {/* Highlights */}
                    <div>
                      <h3 className="text-lg font-playfair font-semibold text-primary-green dark:text-white mb-4">
                        Location Highlights
                      </h3>
                      <ul className="space-y-3">
                        {location.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-accent-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="w-2 h-2 rounded-full bg-accent-gold"></span>
                            </span>
                            <span className="text-sm text-gray-700 dark:text-gray-300">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Amenities */}
                    <div>
                      <h3 className="text-lg font-playfair font-semibold text-primary-green dark:text-white mb-4">
                        Available Amenities
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {location.amenities.map((amenity, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 p-3 rounded-lg bg-accent-gold/10 dark:bg-accent-gold/5 border border-accent-gold/20 dark:border-accent-gold/10"
                          >
                            <span className="text-accent-gold">
                              {amenityIcons[amenity as keyof typeof amenityIcons]}
                            </span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {amenity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Hours Section */}
      <section className="relative w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-transparent via-accent-gold/2 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-primary-green dark:text-white mb-4">
              24/7 Service Available
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Our concierge teams are always ready to assist you with any inquiries or bookings
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={itemVariants}
              className="text-center p-8 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-accent-gold/50 dark:hover:border-accent-gold/40 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-accent-gold/20 flex items-center justify-center mb-4 mx-auto border border-accent-gold/30">
                <Clock className="w-8 h-8 text-accent-gold" />
              </div>
              <h3 className="text-2xl font-semibold text-primary-green dark:text-white mb-2">
                Round the Clock
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Our reception and concierge available 24 hours every day
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-center p-8 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-accent-gold/50 dark:hover:border-accent-gold/40 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-accent-gold/20 flex items-center justify-center mb-4 mx-auto border border-accent-gold/30">
                <Phone className="w-8 h-8 text-accent-gold" />
              </div>
              <h3 className="text-2xl font-semibold text-primary-green dark:text-white mb-2">
                Quick Response
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Get immediate assistance with reservations and special requests
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-center p-8 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-accent-gold/50 dark:hover:border-accent-gold/40 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-accent-gold/20 flex items-center justify-center mb-4 mx-auto border border-accent-gold/30">
                <MapPin className="w-8 h-8 text-accent-gold" />
              </div>
              <h3 className="text-2xl font-semibold text-primary-green dark:text-white mb-2">
                Easy Access
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Prime locations across India's most coveted destinations
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-semibold text-primary-green dark:text-white mb-4">
                Plan Your Visit Today
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Choose your preferred location and experience luxury hospitality
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 sm:px-12 py-4 bg-gradient-to-r from-primary-green to-primary-green/80 hover:from-primary-green/90 hover:to-primary-green/70 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Book Now
                </motion.button>
              </a>

              <a href="/Contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 sm:px-12 py-4 border-2 border-accent-gold hover:bg-accent-gold/10 text-accent-gold font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Contact Us
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
