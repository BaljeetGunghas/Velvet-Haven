"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Calendar, Users, MapPin, CreditCard, Phone } from "lucide-react";

const bookingSteps = [
  {
    icon: MapPin,
    title: "Select Destination",
    description: "Choose from 50+ luxury destinations",
  },
  {
    icon: Calendar,
    title: "Pick Dates",
    description: "Select your check-in and check-out dates",
  },
  {
    icon: Users,
    title: "Add Guests",
    description: "Specify number of guests and rooms",
  },
  {
    icon: CreditCard,
    title: "Make Payment",
    description: "Secure payment with multiple options",
  },
];

const bookingTips = [
  "Book 30+ days in advance for better rates",
  "Sign up for our loyalty program for exclusive discounts",
  "Contact our concierge for personalized recommendations",
  "Special offers available on group bookings",
  "Free cancellation up to 7 days before arrival",
  "Complimentary room upgrades for loyalty members",
];

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-28 lg:pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-primary-green dark:text-white mb-4">
              Book Your <span className="text-accent-gold">Perfect Stay</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Find and book your ideal room with our easy-to-use booking system. Secure payment, instant confirmation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Steps */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-playfair font-semibold text-primary-green dark:text-white text-center mb-12">
            4 Simple Steps to Book
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {bookingSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="relative"
                >
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 h-full">
                    <div className="absolute top-0 left-0 w-10 h-10 bg-accent-gold text-white rounded-full flex items-center justify-center font-bold transform -translate-y-1/2 translate-x-6">
                      {idx + 1}
                    </div>
                    <Icon className="w-10 h-10 text-accent-gold mb-4 mt-4" />
                    <h3 className="text-lg font-semibold text-primary-green dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                  {idx < bookingSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 -right-3 w-6 h-0.5 bg-gradient-to-r from-accent-gold to-transparent" />
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mb-16">
            <Link href="/SearchResult?city=delhi&check_in_date=2026-11-24&check_out_date=2026-11-25&adults=1&page=1">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-accent-gold hover:bg-accent-gold/90 text-primary-green font-semibold rounded-lg transition-all duration-300 text-lg">
                Start Booking Now
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Booking Tips */}
      <section className="bg-gradient-to-r from-primary-green/5 to-accent-gold/5 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-playfair font-semibold text-primary-green dark:text-white mb-8 text-center">
              Booking Tips & Benefits
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookingTips.map((tip, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700"
                >
                  <Check className="w-5 h-5 text-accent-gold flex-shrink-0 mt-1" />
                  <p className="text-gray-700 dark:text-gray-300">{tip}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary-green/10 to-accent-gold/10 dark:from-primary-green/5 dark:to-accent-gold/5 rounded-3xl p-8 md:p-12 text-center border border-accent-gold/20"
        >
          <h2 className="text-3xl font-playfair font-semibold text-primary-green dark:text-white mb-4">
            Need Help with Your Booking?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Our dedicated booking team is available 24/7 to assist you with any queries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-accent-gold" />
              <span className="font-semibold text-gray-900 dark:text-white">+91 8685007017</span>
            </div>
            <div className="text-gray-400">•</div>
            <a href="mailto:baljeetgunghas5@gmail.com" className="text-accent-gold font-semibold hover:underline">
              baljeetgunghas5@gmail.com
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
