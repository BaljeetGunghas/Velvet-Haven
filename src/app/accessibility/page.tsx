"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, Ear, Hand } from "lucide-react";

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-20 sm:py-28 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-primary-green dark:text-white mb-4">
            Accessibility <span className="text-accent-gold">Statement</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We are committed to providing an accessible experience for all users
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {[
            {
              icon: Eye,
              title: "Visual Accessibility",
              desc: "High contrast options and screen reader compatibility",
            },
            {
              icon: Ear,
              title: "Audio Content",
              desc: "Captions and transcripts for multimedia content",
            },
            {
              icon: Hand,
              title: "Navigation",
              desc: "Full keyboard navigation and mobile-friendly design",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/50 border border-gray-200 dark:border-slate-700"
              >
                <Icon className="w-12 h-12 text-accent-gold mb-4" />
                <h3 className="text-xl font-semibold text-primary-green dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-accent-gold/10 dark:bg-accent-gold/5 rounded-2xl p-8 text-center"
        >
          <p className="text-gray-700 dark:text-gray-300">
            If you experience any accessibility issues, please contact us at{" "}
            <span className="font-semibold">baljeetgunghas5@gmail.com</span>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
