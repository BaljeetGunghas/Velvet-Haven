"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 py-20 sm:py-28 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-primary-green dark:text-white mb-8">
            Terms & <span className="text-accent-gold">Conditions</span>
          </h1>

          <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-primary-green dark:text-white mb-3">
                Use of Service
              </h2>
              <p>
                By using our website and services, you agree to comply with these terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary-green dark:text-white mb-3">
                Booking & Reservations
              </h2>
              <p>
                All bookings are subject to availability and confirmation. Prices are subject to change without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary-green dark:text-white mb-3">
                Payment Terms
              </h2>
              <p>
                Payment must be made in full at the time of booking unless other arrangements are made.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary-green dark:text-white mb-3">
                Limitation of Liability
              </h2>
              <p>
                We are not liable for any indirect or consequential damages arising from your use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary-green dark:text-white mb-3">
                Contact Us
              </h2>
              <p>
                For questions regarding our terms, please contact us at baljeetgunghas5@gmail.com
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
