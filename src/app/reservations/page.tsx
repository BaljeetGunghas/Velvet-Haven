"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Info } from "lucide-react";

export default function ReservationsRedirect() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-20 sm:py-28 lg:py-32 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-slate-700 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 rounded-full bg-accent-gold/20 flex items-center justify-center mx-auto mb-6">
            <Info className="w-8 h-8 text-accent-gold" />
          </div>
          <h1 className="text-3xl font-playfair font-semibold text-primary-green dark:text-white mb-3">
            Page Moved
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The guest reviews page has been moved to a new location for better accessibility.
          </p>

          <div className="space-y-3">
            <Link href="/reviews">
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent-gold hover:bg-accent-gold/90 text-primary-green font-semibold rounded-lg transition-all duration-300">
                <Calendar className="w-5 h-5" />
                Go to Guest Reviews
              </button>
            </Link>

            <Link href="/">
              <button className="w-full px-6 py-3 border-2 border-accent-gold text-accent-gold hover:bg-accent-gold/10 font-semibold rounded-lg transition-all duration-300">
                Return to Home
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
