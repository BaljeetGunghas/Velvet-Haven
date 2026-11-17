"use client";

import { motion } from "framer-motion";
import { ChefHat, Wine, Flame, Users, Clock, MapPin, Star, UtensilsCrossed } from "lucide-react";

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

export default function Dining() {
  const restaurants = [
    {
      id: 1,
      name: "Elegance",
      type: "Fine Dining",
      cuisine: "Contemporary Indian",
      chef: "Chef Rajesh Verma",
      rating: 4.9,
      reviews: 520,
      description: "An exquisite culinary journey through modern Indian cuisine with a touch of international flavors",
      highlights: [
        "Michelin-inspired tasting menus",
        "Award-winning chef",
        "Ambient lighting & elegant décor",
        "Wine pairing available"
      ],
      hours: "6:30 PM - 11:00 PM",
      dressCode: "Smart Casual",
      capacity: 80,
      avgPrice: "₹2,500 - ₹4,000 per person"
    },
    {
      id: 2,
      name: "Mediterranean Breeze",
      type: "Casual Dining",
      cuisine: "Mediterranean & European",
      chef: "Chef Antonio Rossi",
      rating: 4.8,
      reviews: 680,
      description: "Savor authentic Mediterranean delicacies with fresh seafood and artisanal preparations",
      highlights: [
        "Fresh catch daily",
        "Wood-fired oven pizzas",
        "Terrace seating with views",
        "Extensive wine collection"
      ],
      hours: "12:00 PM - 11:30 PM",
      dressCode: "Casual",
      capacity: 120,
      avgPrice: "₹1,500 - ₹2,500 per person"
    },
    {
      id: 3,
      name: "The Spice Route",
      type: "Premium Casual",
      cuisine: "Asian Fusion",
      chef: "Chef Priya Singh",
      rating: 4.7,
      reviews: 450,
      description: "A fusion of Asian flavors combining Thai, Vietnamese, and Indian spices",
      highlights: [
        "Interactive open kitchen",
        "Live wok cooking",
        "Aromatic spice blends",
        "Specialty cocktails"
      ],
      hours: "11:30 AM - 11:00 PM",
      dressCode: "Smart Casual",
      capacity: 100,
      avgPrice: "₹1,200 - ₹2,000 per person"
    },
    {
      id: 4,
      name: "Dessert Dreams",
      type: "Café & Patisserie",
      cuisine: "International Desserts",
      chef: "Chef Marie Dubois",
      rating: 4.9,
      reviews: 890,
      description: "Indulge in artisanal pastries, decadent desserts, and premium coffee from around the world",
      highlights: [
        "Handcrafted pastries",
        "Artisanal chocolates",
        "Premium coffee selection",
        "Cozy intimate ambiance"
      ],
      hours: "8:00 AM - 10:00 PM",
      dressCode: "Casual",
      capacity: 60,
      avgPrice: "₹400 - ₹1,000 per person"
    }
  ];

  const experiences = [
    {
      icon: ChefHat,
      title: "Chef's Table Experience",
      description: "Exclusive culinary journey with our head chef for up to 6 guests",
      duration: "3 hours"
    },
    {
      icon: Wine,
      title: "Wine Tasting Sessions",
      description: "Curated wine pairings with international and Indian wines",
      duration: "2 hours"
    },
    {
      icon: Flame,
      title: "Private Kitchen Events",
      description: "Host your special event in our exclusive private dining space",
      duration: "Custom"
    },
    {
      icon: Users,
      title: "Group Celebrations",
      description: "Perfect setting for corporate events, weddings, and gatherings",
      duration: "Flexible"
    }
  ];

  const cuisines = [
    {
      name: "Indian",
      description: "Traditional and contemporary Indian cuisine",
      specialties: "Biryani, Tandoori, Curries"
    },
    {
      name: "Mediterranean",
      description: "European delicacies with fresh ingredients",
      specialties: "Pasta, Risotto, Seafood"
    },
    {
      name: "Asian Fusion",
      description: "Blend of Asian flavors and techniques",
      specialties: "Wok dishes, Sushi, Dim Sum"
    },
    {
      name: "Desserts & Pastries",
      description: "Artisanal sweets and international delights",
      specialties: "Cakes, Macarons, Chocolates"
    }
  ];

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
              Culinary Excellence
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
            Exquisite{' '}
            <span className="text-accent-gold">Dining Experiences</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-3xl mx-auto"
          >
            Discover world-class cuisines prepared by renowned chefs in our award-winning restaurants
          </motion.p>
        </div>
      </section>

      {/* Restaurants Grid */}
      <section className="relative w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="visible"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {restaurants.map((restaurant) => (
              <motion.div
                key={restaurant.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-accent-gold/20 transition-all duration-300 border border-gray-200 dark:border-slate-700 hover:border-accent-gold/50 dark:hover:border-accent-gold/40"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-green/10 to-accent-gold/10 dark:from-primary-green/5 dark:to-accent-gold/5 p-6 sm:p-8 border-b border-gray-200 dark:border-slate-700">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-playfair font-semibold text-primary-green dark:text-white">
                        {restaurant.name}
                      </h3>
                      <p className="text-sm text-accent-gold font-semibold mt-1">{restaurant.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-accent-gold text-accent-gold" />
                      <span className="text-lg font-bold text-primary-green dark:text-white">{restaurant.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">({restaurant.reviews} reviews)</p>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Cuisine & Chef */}
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Cuisine</p>
                    <p className="text-lg font-semibold text-primary-green dark:text-white mb-4">{restaurant.cuisine}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Chef</p>
                    <p className="text-base font-medium text-primary-green dark:text-white">{restaurant.chef}</p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {restaurant.description}
                  </p>

                  {/* Highlights */}
                  <div>
                    <p className="text-sm font-semibold text-primary-green dark:text-white mb-3">Highlights</p>
                    <ul className="space-y-2">
                      {restaurant.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold flex-shrink-0 mt-1.5"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Hours</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{restaurant.hours}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Dress Code</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{restaurant.dressCode}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Capacity</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{restaurant.capacity} guests</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Avg Price</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{restaurant.avgPrice}</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-accent-gold to-accent-gold/80 hover:from-accent-gold/90 hover:to-accent-gold/70 text-primary-green font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                    <UtensilsCrossed size={18} />
                    Reserve Table
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experiences Section */}
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
              Special Dining Experiences
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Create unforgettable moments with our curated experiences
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {experiences.map((experience, idx) => {
              const Icon = experience.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-slate-700 hover:border-accent-gold/50 dark:hover:border-accent-gold/40 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-accent-gold/20 flex items-center justify-center mx-auto mb-4 border border-accent-gold/30">
                    <Icon className="w-7 h-7 text-accent-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-green dark:text-white mb-3">
                    {experience.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {experience.description}
                  </p>
                  <p className="text-xs font-semibold text-accent-gold">
                    {experience.duration}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Cuisines Section */}
      <section className="relative w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-primary-green dark:text-white mb-4">
              Our Cuisines
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              A world of flavors at your fingertips
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {cuisines.map((cuisine, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-primary-green/10 to-accent-gold/10 dark:from-primary-green/5 dark:to-accent-gold/5 rounded-2xl p-6 sm:p-8 border border-accent-gold/20 dark:border-accent-gold/10 hover:border-accent-gold/50 dark:hover:border-accent-gold/40 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl md:text-2xl font-playfair font-semibold text-primary-green dark:text-white mb-3">
                  {cuisine.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {cuisine.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 bg-accent-gold/20 dark:bg-accent-gold/10 text-accent-gold text-xs font-medium rounded-full">
                    {cuisine.specialties}
                  </span>
                </div>
              </motion.div>
            ))}
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
                Ready to Dine with Us?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Reserve your table or inquire about our special dining experiences
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 sm:px-12 py-4 bg-gradient-to-r from-primary-green to-primary-green/80 hover:from-primary-green/90 hover:to-primary-green/70 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <UtensilsCrossed size={20} />
                Reserve a Table
              </motion.button>

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
