"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { Star, ArrowRight, ChevronRight, Zap } from "lucide-react";
// Import professional service images
import serviceImg1 from "@/asset/service/01-luxurious-rooms.png";
import serviceImg2 from "@/asset/service/02-gourmet-dining.png";
import serviceImg3 from "@/asset/service/03-premium-wellness.png";
import serviceImg4 from "@/asset/service/04-personal-concierge.png";
import serviceImg5 from "@/asset/service/05-recreation-entertainment.png";
import serviceImg6 from "@/asset/service/06-curated-experiences.png";
import serviceImg7 from "@/asset/service/07-business-facilities.png";
import serviceImg8 from "@/asset/service/08-luxury-transportation.png";

const ServicesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  // Auto-select service from query parameter
  useEffect(() => {
    const serviceId = searchParams.get("service");
    if (serviceId) {
      setSelectedService(parseInt(serviceId));
    }
  }, [searchParams]);

  // Smooth scroll to details section when service is selected
  useEffect(() => {
    if (selectedService && detailsRef.current) {
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [selectedService]);

  const services = [
    {
      id: 1,
      icon: "🏨",
      title: "Luxurious Rooms & Suites",
      description:
        "Handpicked furniture, smart room technology, spa-like bathrooms, and stunning views with private balconies for an unforgettable stay.",
      fullDescription:
        "Experience ultimate comfort in our meticulously designed rooms and suites. Each space features premium linens, marble bathrooms with rainfall showers, climate control, and panoramic views. Our suites include separate living areas, butler service, and exclusive amenities.",
      image: serviceImg1,
      benefits: [
        "Thread count Egyptian cotton linens",
        "Smart room technology and automation",
        "Premium toiletries and amenities",
        "24/7 room service",
        "Marble bathrooms with spa features",
        "Private balconies with views",
      ],
      price: "Starting from ₹5,000/night",
    },
    {
      id: 2,
      icon: "🍽️",
      title: "Gourmet Dining Experiences",
      description:
        "Michelin-inspired cuisine from master chefs, multiple on-site restaurants, and room service 24/7 with curated menus.",
      fullDescription:
        "Indulge in culinary excellence with our world-class chefs. From fine dining to casual cafes, we offer diverse gastronomic experiences featuring local and international cuisines, dietary accommodations, and wine pairings.",
      image: serviceImg2,
      benefits: [
        "Michelin-starred chef recommendations",
        "Multiple restaurants and bars",
        "24/7 room service with curated menus",
        "Special dietary accommodations",
        "Wine cellar and sommelier service",
        "Cooking classes and culinary events",
      ],
      price: "À la carte pricing available",
    },
    {
      id: 3,
      icon: "🧖",
      title: "Premium Wellness & Spa",
      description:
        "Full-service spa with signature treatments, heated pools, sauna, steam room, and yoga classes for ultimate relaxation.",
      fullDescription:
        "Rejuvenate your body and mind at our award-winning spa. With signature treatments from around the world, state-of-the-art facilities, and experienced therapists, achieve perfect wellness and balance.",
      image: serviceImg3,
      benefits: [
        "Signature wellness treatments",
        "Heated pools and hot tubs",
        "Sauna and steam room",
        "Yoga and meditation classes",
        "Personal wellness consultations",
        "Nutritional counseling",
      ],
      price: "Starting from ₹2,000/treatment",
    },
    {
      id: 4,
      icon: "🎩",
      title: "Personal Concierge Service",
      description:
        "24/7 dedicated concierge team for personalized itineraries, reservations, and VIP treatment with exclusive access.",
      fullDescription:
        "Our dedicated concierge team is available round-the-clock to fulfill your every need. From restaurant reservations to helicopter tours, we arrange exclusive experiences tailored to your preferences.",
      image: serviceImg4,
      benefits: [
        "24/7 concierge availability",
        "Personal itinerary planning",
        "VIP reservations and bookings",
        "Exclusive event access",
        "Personalized shopping assistance",
        "Airport and ground transportation",
      ],
      price: "Complimentary for all guests",
    },
    {
      id: 5,
      icon: "💪",
      title: "Recreation & Entertainment",
      description:
        "State-of-the-art fitness center, water sports, and live entertainment.",
      fullDescription:
        "Stay active and entertained with our comprehensive recreation facilities. From modern gyms to water sports, live shows, and gaming lounges, there's something for everyone.",
      image: serviceImg5,
      benefits: [
        "State-of-the-art fitness center",
        "Water sports facilities",
        "Live entertainment shows",
        "Gaming and recreation lounges",
        "Swimming pools and water parks",
        "Tennis and sports courts",
      ],
      price: "Included in room rate",
    },
    {
      id: 6,
      icon: "🎭",
      title: "Curated Experiences",
      description:
        "Guided local tours, adventure activities, and cultural workshops.",
      fullDescription:
        "Explore like never before with our carefully curated local experiences. Our expert guides lead you through cultural landmarks, adventure trails, and hidden gems.",
      image: serviceImg6,
      benefits: [
        "Expert local guides",
        "Cultural heritage tours",
        "Adventure activities",
        "Photography workshops",
        "Cooking classes",
        "Traditional craft demonstrations",
      ],
      price: "Starting from ₹1,500/person",
    },
    {
      id: 7,
      icon: "💼",
      title: "Business Facilities",
      description:
        "Modern business center, high-speed internet, and conference rooms.",
      fullDescription:
        "Perfect for business travelers, our comprehensive business facilities ensure productivity and seamless operations.",
      image: serviceImg7,
      benefits: [
        "Modern business center",
        "High-speed fiber internet",
        "Conference and meeting rooms",
        "Video conferencing setup",
        "Business printing services",
        "Executive lounge access",
      ],
      price: "Complimentary for business guests",
    },
    {
      id: 8,
      icon: "🚗",
      title: "Luxury Transportation",
      description:
        "Airport transfers, limousine service, and yacht/helicopter charters.",
      fullDescription:
        "Travel in style with our premium transportation options. From luxury vehicles to exclusive charter services, we ensure elegant arrivals and departures.",
      image: serviceImg8,
      benefits: [
        "Airport transfer service",
        "Limousine service 24/7",
        "Yacht charters",
        "Helicopter tours",
        "Private car rentals",
        "Concierge transportation coordination",
      ],
      price: "Starting from ₹2,500/journey",
    },
  ];

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-24 pb-16"
    >
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-primary-green/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-accent-gold font-semibold text-sm md:text-base tracking-widest uppercase mb-4">
            ✨ Our Premium Services
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-primary-green dark:text-white mb-6 leading-tight">
            Discover Exceptional
            <br />
            <span className="text-accent-gold">Luxury Services</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience world-class amenities and personalized services designed to exceed your expectations
            and create unforgettable memories.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              onClick={() => setSelectedService(service.id)}
              whileHover={{ y: -8 }}
              className={`group relative p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                selectedService === service.id
                  ? "bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 border-accent-gold/60 shadow-xl shadow-accent-gold/20"
                  : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:border-accent-gold/40 shadow-lg hover:shadow-2xl"
              }`}
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 via-transparent to-primary-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              {/* Content */}
              <div className="relative z-10 space-y-4">
                {/* Icon */}
                <motion.div className="text-5xl">{service.icon}</motion.div>

                {/* Title */}
                <h3 className="text-xl font-playfair font-semibold text-primary-green dark:text-white group-hover:text-accent-gold transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Price */}
                <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                  <p className="text-sm font-semibold text-accent-gold">{service.price}</p>
                </div>

                {/* Hover Arrow */}
                <motion.div
                  className="flex items-center gap-2 text-accent-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: -10 }}
                  whileHover={{ x: 5 }}
                >
                  <span className="text-sm font-semibold">Learn More</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Service View */}
        {selectedService && (
          <motion.div
            ref={detailsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-20 pb-20"
          >
            {(() => {
              const service = services.find((s) => s.id === selectedService);
              if (!service) return null;

              return (
                <div className="bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-900 rounded-3xl border-2 border-accent-gold/30 dark:border-accent-gold/20 overflow-hidden shadow-2xl">
                  {/* Top Border Accent */}
                  <div className="h-1 bg-gradient-to-r from-transparent via-accent-gold to-transparent" />

                  <div className="p-8 md:p-12 lg:p-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      {/* Left: Premium Image Section */}
                      <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                      >
                        {/* Premium Image with Gradient Overlay */}
                        <div className="relative h-full rounded-3xl overflow-hidden">
                          {/* Gradient Background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/40 via-transparent to-primary-green/40 z-10" />

                          {/* Image */}
                          <Image
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                          />

                          {/* Premium Border */}
                          <div className="absolute inset-0 rounded-3xl border-4 border-accent-gold/50 shadow-2xl shadow-accent-gold/30" />

                          {/* Top Light Effect */}
                          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
                        </div>

                        {/* Premium Stats Cards */}
                        <div className="grid grid-cols-3 gap-4">
                          <motion.div
                            whileHover={{ y: -4 }}
                            className="p-5 bg-gradient-to-br from-accent-gold/15 to-accent-gold/5 rounded-2xl border-2 border-accent-gold/40 hover:border-accent-gold/60 text-center transition-all duration-300 shadow-lg hover:shadow-xl"
                          >
                            <Star className="w-7 h-7 text-accent-gold mx-auto mb-2" />
                            <p className="text-sm font-bold text-primary-green dark:text-white">Premium</p>
                          </motion.div>
                          <motion.div
                            whileHover={{ y: -4 }}
                            className="p-5 bg-gradient-to-br from-primary-green/15 to-primary-green/5 rounded-2xl border-2 border-primary-green/40 hover:border-primary-green/60 text-center transition-all duration-300 shadow-lg hover:shadow-xl"
                          >
                            <Users className="w-7 h-7 text-primary-green mx-auto mb-2" />
                            <p className="text-sm font-bold text-primary-green dark:text-white">Popular</p>
                          </motion.div>
                          <motion.div
                            whileHover={{ y: -4 }}
                            className="p-5 bg-gradient-to-br from-blue-500/15 to-blue-500/5 rounded-2xl border-2 border-blue-500/40 hover:border-blue-500/60 text-center transition-all duration-300 shadow-lg hover:shadow-xl"
                          >
                            <Zap className="w-7 h-7 text-blue-500 mx-auto mb-2" />
                            <p className="text-sm font-bold text-primary-green dark:text-white">24/7</p>
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Right: Details */}
                      <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="space-y-8"
                      >
                        {/* Title */}
                        <div>
                          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary-green dark:text-white mb-4">
                            {service.title}
                          </h2>
                          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            {service.fullDescription}
                          </p>
                        </div>

                        {/* Benefits */}
                        <div>
                          <h3 className="text-2xl font-playfair font-semibold text-primary-green dark:text-white mb-6 flex items-center gap-3">
                            <div className="w-1 h-8 bg-accent-gold rounded-full" />
                            Key Benefits
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {service.benefits.map((benefit, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                                className="flex items-start gap-3 p-3 rounded-lg bg-accent-gold/5 hover:bg-accent-gold/10 transition-colors duration-300"
                              >
                                <div className="mt-1 w-5 h-5 rounded-full bg-accent-gold/30 flex items-center justify-center flex-shrink-0">
                                  <div className="w-2 h-2 rounded-full bg-accent-gold" />
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {benefit}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Price */}
                        <div className="p-6 bg-gradient-to-r from-accent-gold/10 to-primary-green/10 rounded-2xl border-2 border-accent-gold/30 dark:border-accent-gold/20">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Starting Price</p>
                          <p className="text-3xl font-bold text-accent-gold mb-4">{service.price}</p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              const today = dayjs().format("YYYY-MM-DD");
                              const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
                              router.push(`/SearchResult?check_in_date=${today}&check_out_date=${tomorrow}`);
                            }}
                            className="w-full py-4 px-6 bg-gradient-to-r from-primary-green to-primary-green/80 hover:from-primary-green/90 hover:to-primary-green/70 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                          >
                            <span>Book Now & Experience</span>
                            <ArrowRight className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 p-12 md:p-16 bg-gradient-to-r from-primary-green via-primary-green/90 to-primary-green/80 rounded-3xl text-white text-center relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/20 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-6">
              Ready to Experience Luxury?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Book your stay today and unlock access to all our premium services and world-class amenities.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const today = dayjs().format("YYYY-MM-DD");
                const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
                router.push(`/SearchResult?check_in_date=${today}&check_out_date=${tomorrow}`);
              }}
              className="inline-flex items-center gap-3 px-10 py-4 bg-accent-gold text-primary-green font-bold rounded-xl hover:bg-accent-gold/90 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <span>Explore Rooms & Book</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServicesPage;
