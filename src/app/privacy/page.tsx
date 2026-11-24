"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 py-20 sm:py-28 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-primary-green dark:text-white mb-8">
            Privacy <span className="text-accent-gold">Policy</span>
          </h1>

          <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-primary-green dark:text-white mb-3">
                Introduction
              </h2>
              <p>
                At Velvet Haven, we are committed to protecting your privacy and ensuring you have a positive experience on our website and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary-green dark:text-white mb-3">
                Information We Collect
              </h2>
              <p>
                We collect information you provide directly, including your name, email address, phone number, and booking details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary-green dark:text-white mb-3">
                How We Use Your Information
              </h2>
              <p>
                We use the information to process bookings, communicate with you, and improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary-green dark:text-white mb-3">
                Your Rights
              </h2>
              <p>
                You have the right to access, modify, or delete your personal information at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary-green dark:text-white mb-3">
                Contact Us
              </h2>
              <p>
                If you have any privacy concerns, please contact us at baljeetgunghas5@gmail.com
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
