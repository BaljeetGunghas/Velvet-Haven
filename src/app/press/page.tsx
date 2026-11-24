"use client";

import React from "react";
import { motion } from "framer-motion";
import { Newspaper, Image, Download } from "lucide-react";

export default function PressPage() {
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
            Press <span className="text-accent-gold">Center</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Media resources and press releases
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Newspaper,
              title: "Press Releases",
              desc: "Latest news and announcements from Velvet Haven",
            },
            {
              icon: Image,
              title: "Media Kit",
              desc: "High-resolution images and brand assets",
            },
            {
              icon: Download,
              title: "Downloads",
              desc: "Brochures, fact sheets, and media materials",
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
      </div>
    </main>
  );
}
