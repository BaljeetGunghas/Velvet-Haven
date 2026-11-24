"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CancellationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 py-20 sm:py-28 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-primary-green dark:text-white mb-8">
            Cancellation <span className="text-accent-gold">Policy</span>
          </h1>

          <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-primary-green dark:text-white mb-3">
                Free Cancellation
              </h2>
              <p>
                Bookings can be cancelled free of charge up to 7 days before your arrival date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary-green dark:text-white mb-3">
                Cancellation Fees
              </h2>
              <p>
                Cancellations within 7 days of arrival may incur a fee of one night's accommodation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary-green dark:text-white mb-3">
                Non-Refundable Rates
              </h2>
              <p>
                Special promotional rates may be non-refundable. Please check the terms when booking.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary-green dark:text-white mb-3">
                How to Cancel
              </h2>
              <p>
                Contact our reservations team at baljeetgunghas5@gmail.com to process your cancellation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary-green dark:text-white mb-3">
                Refund Process
              </h2>
              <p>
                Refunds will be processed within 5-7 business days after cancellation confirmation.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
