"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
// Import professional service images
import services1 from "@/asset/service/01-luxurious-rooms.png";
import services2 from "@/asset/service/02-gourmet-dining.png";
import services3 from "@/asset/service/03-premium-wellness.png";
import services4 from "@/asset/service/04-personal-concierge.png";
import services5 from "@/asset/service/05-recreation-entertainment.png";
import services6 from "@/asset/service/06-curated-experiences.png";
import services7 from "@/asset/service/07-business-facilities.png";
import services8 from "@/asset/service/08-luxury-transportation.png";

const OurServices = () => {
  const router = useRouter();

  // Featured services (large showcase blocks)
  const featuredServices = [
    {
      id: 1,
      icon: "🏨",
      title: "Luxurious Rooms & Suites",
      description:
        "Handpicked furniture, smart room technology, spa-like bathrooms, and stunning views with private balconies for an unforgettable stay.",
      image: services1,
    },
    {
      id: 2,
      icon: "🍽️",
      title: "Gourmet Dining Experiences",
      description:
        "Michelin-inspired cuisine from master chefs, multiple on-site restaurants, and room service 24/7 with curated menus.",
      image: services2,
    },
    {
      id: 3,
      icon: "🧖",
      title: "Premium Wellness & Spa",
      description:
        "Full-service spa with signature treatments, heated pools, sauna, steam room, and yoga classes for ultimate relaxation.",
      image: services3,
    },
    {
      id: 4,
      icon: "🎩",
      title: "Personal Concierge Service",
      description:
        "24/7 dedicated concierge team for personalized itineraries, reservations, and VIP treatment with exclusive access.",
      image: services4,
    },
  ];

  // Regular services (grid)
  const regularServices = [
    {
      id: 5,
      icon: "💪",
      title: "Recreation & Entertainment",
      description: "State-of-the-art fitness center, water sports, and live entertainment.",
    },
    {
      id: 6,
      icon: "🎭",
      title: "Curated Experiences",
      description: "Guided local tours, adventure activities, and cultural workshops.",
    },
    {
      id: 7,
      icon: "💼",
      title: "Business Facilities",
      description: "Modern business center, high-speed internet, and conference rooms.",
    },
    {
      id: 8,
      icon: "🚗",
      title: "Luxury Transportation",
      description: "Airport transfers, limousine service, and yacht/helicopter charters.",
    },
    {
      id: 9,
      icon: "👑",
      title: "Exclusive Loyalty Program",
      description: "VIP rewards, priority bookings, exclusive events, and special treats.",
    },
    {
      id: 10,
      icon: "🌱",
      title: "Sustainable Luxury",
      description: "Eco-friendly practices, locally-sourced products, and carbon-neutral certifications.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const blockVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.section
      className="relative w-full bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-16 xl:px-24 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-primary-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.span
            className="inline-block text-accent-gold font-semibold text-sm md:text-base tracking-widest uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
          >
            ✨ Exceptional Services
          </motion.span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-semibold text-primary-green dark:text-white mb-6 leading-tight">
            Experience{" "}
            <span className="text-accent-gold">Luxury & Excellence</span>
          </h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover our world-class amenities and personalized services designed to make your stay
            truly unforgettable.
          </p>
        </motion.div>

        {/* Featured Blocks */}
        <motion.div
          className="w-full mb-12 sm:mb-16 lg:mb-20 space-y-12 md:space-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id}
              variants={blockVariants}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 md:gap-12 lg:gap-16 items-center`}
            >
              {/* Image Section */}
              <motion.div
                className="w-full lg:w-1/2 relative h-64 md:h-80 lg:h-96"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: false }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Gradient Overlay Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 via-transparent to-primary-green/20 rounded-3xl blur-2xl" />

                {/* Image */}
                <Image
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover rounded-3xl shadow-2xl shadow-primary-green/40"
                />

                {/* Accent Glow */}
                <div className="absolute inset-0 rounded-3xl border-2 border-accent-gold/30 shadow-lg shadow-accent-gold/20" />
              </motion.div>

              {/* Content Section */}
              <motion.div
                className="w-full lg:w-1/2 space-y-6"
                initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: false }}
              >
                {/* Icon & Title */}
                <div className="space-y-3">
                  <div className="text-5xl md:text-6xl">{service.icon}</div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-playfair font-semibold text-primary-green dark:text-white">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {service.description}
                </p>

                {/* Call to Action */}
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push(`/Services?service=${service.id}`)}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-accent-gold/20 hover:bg-accent-gold/30 text-accent-gold font-semibold rounded-xl transition-all duration-300 border border-accent-gold/40 hover:border-accent-gold/60 group"
                >
                  <span>Explore Service</span>
                  <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Grid Title */}
          <h3 className="text-2xl md:text-3xl font-playfair font-semibold text-primary-green dark:text-white mb-12 text-center">
            More Premium Services
          </h3>

          {/* Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            {regularServices.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group relative p-8 md:p-6 lg:p-8 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-accent-gold/50 dark:hover:border-accent-gold/40 shadow-lg hover:shadow-2xl hover:shadow-accent-gold/20 transition-all duration-300 cursor-default overflow-hidden"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-primary-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  {/* Icon with animated background */}
                  <motion.div
                    className="w-16 h-16 rounded-full bg-accent-gold/15 flex items-center justify-center text-3xl group-hover:bg-accent-gold/25 transition-all duration-300"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {service.icon}
                  </motion.div>

                  {/* Title */}
                  <h4 className="text-lg md:text-xl font-semibold text-primary-green dark:text-white group-hover:text-accent-gold transition-colors duration-300">
                    {service.title}
                  </h4>

                  {/* Description */}
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover Indicator */}
                  <motion.div
                    className="h-1 bg-gradient-to-r from-accent-gold/50 to-transparent rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default OurServices;
