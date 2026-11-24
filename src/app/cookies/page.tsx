"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 py-20 sm:py-28 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-primary-green dark:text-white mb-8">
            Cookie <span className="text-accent-gold">Policy</span>
          </h1>

          <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-primary-green dark:text-white mb-3">
                What Are Cookies?
              </h2>
              <p>
                Cookies are small text files stored on your device to enhance your browsing experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary-green dark:text-white mb-3">
                Types of Cookies We Use
              </h2>
              <p>
                We use essential cookies for website functionality, analytics cookies to improve services, and marketing cookies for personalization.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary-green dark:text-white mb-3">
                Your Cookie Choices
              </h2>
              <p>
                You can control cookie preferences through your browser settings or our cookie consent banner.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary-green dark:text-white mb-3">
                Third-Party Cookies
              </h2>
              <p>
                Some cookies may be set by third-party services. We encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary-green dark:text-white mb-3">
                Contact Us
              </h2>
              <p>
                For cookie-related questions, contact us at baljeetgunghas5@gmail.com
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
