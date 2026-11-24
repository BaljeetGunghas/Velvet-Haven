"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Zap, Calendar, TrendingUp, Clock, Users } from "lucide-react";
import Link from "next/link";

const offers = [
  {
    id: 1,
    icon: Gift,
    title: "Early Bird Discount",
    description: "Book 30 days in advance and save up to 20%",
    discount: "20%",
    code: "EARLYBIRD20",
    validTill: "30 Dec 2026",
    rooms: "All room types",
  },
  {
    id: 2,
    icon: Zap,
    title: "Last Minute Deals",
    description: "Get exclusive discounts on last-minute bookings",
    discount: "15%",
    code: "LASTMIN15",
    validTill: "31 Dec 2026",
    rooms: "Selected rooms",
  },
  {
    id: 3,
    icon: Calendar,
    title: "Long Stay Offers",
    description: "Special rates for stays of 7+ nights",
    discount: "25%",
    code: "LONGSTAY25",
    validTill: "30 Mar 2027",
    rooms: "All room types",
  },
  {
    id: 4,
    icon: TrendingUp,
    title: "Loyalty Bonus",
    description: "Get extra 10% off on your next booking",
    discount: "10%",
    code: "LOYALTY10",
    validTill: "31 Dec 2027",
    rooms: "Members only",
  },
  {
    id: 5,
    icon: Users,
    title: "Group Bookings",
    description: "Special rates for group bookings of 10+",
    discount: "30%",
    code: "GROUP30",
    validTill: "30 Jun 2027",
    rooms: "All room types",
  },
  {
    id: 6,
    icon: Clock,
    title: "Weekend Getaway",
    description: "Perfect rates for weekend stays (Fri-Sun)",
    discount: "18%",
    code: "WEEKEND18",
    validTill: "31 Dec 2026",
    rooms: "All room types",
  },
];

export default function OffersPage() {
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);

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
              Special <span className="text-accent-gold">Offers</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover amazing deals and exclusive offers to make your stay more affordable
            </p>
          </motion.div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={offer.id}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setSelectedOffer(selectedOffer === offer.id ? null : offer.id)}
                className={`p-6 md:p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                  selectedOffer === offer.id
                    ? "bg-gradient-to-br from-accent-gold/20 to-primary-green/10 border-accent-gold dark:from-accent-gold/10 dark:to-primary-green/5"
                    : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:border-accent-gold/50"
                }`}
              >
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent-gold/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="w-10 h-10 text-accent-gold flex-shrink-0" />
                    <span className="text-2xl font-bold text-accent-gold">
                      {offer.discount}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary-green dark:text-white mb-2">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {offer.description}
                  </p>

                  {selectedOffer === offer.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-4 border-t border-gray-200 dark:border-slate-700 mt-4 space-y-2 text-sm"
                    >
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 mb-1">Promo Code</p>
                        <div className="flex items-center gap-2">
                          <code className="bg-accent-gold/20 dark:bg-accent-gold/10 px-3 py-1 rounded font-mono font-semibold text-accent-gold">
                            {offer.code}
                          </code>
                          <button className="text-xs bg-accent-gold text-primary-green px-2 py-1 rounded font-semibold hover:bg-accent-gold/90 transition-colors">
                            Copy
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 mb-1">Valid Till</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {offer.validTill}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 mb-1">Applicable For</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {offer.rooms}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/SearchResult?city=delhi&check_in_date=2026-11-24&check_out_date=2026-11-25&adults=1&page=1">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-accent-gold hover:bg-accent-gold/90 text-primary-green font-semibold rounded-lg transition-all duration-300 text-lg">
              Explore Deals Now
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Terms Section */}
      <section className="bg-gradient-to-r from-primary-green/5 to-accent-gold/5 py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-slate-700"
          >
            <h2 className="text-2xl font-playfair font-semibold text-primary-green dark:text-white mb-4">
              Terms & Conditions
            </h2>
            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold mt-1">•</span>
                <span>Offers are subject to availability and cannot be combined with other promotions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold mt-1">•</span>
                <span>Promo codes must be entered at the time of booking</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold mt-1">•</span>
                <span>Special conditions apply for group and corporate bookings</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold mt-1">•</span>
                <span>Loyalty program members get additional benefits on these offers</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
