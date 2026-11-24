"use client";

import React from "react";
import { motion } from "framer-motion";
import { Handshake, Globe, Zap } from "lucide-react";

export default function PartnersPage() {
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
            Our <span className="text-accent-gold">Partners</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Building excellence through strategic partnerships
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
              icon: Handshake,
              title: "Strategic Partners",
              desc: "Collaborate with industry leaders worldwide",
            },
            {
              icon: Globe,
              title: "Global Network",
              desc: "Connected with hotels and resorts across continents",
            },
            {
              icon: Zap,
              title: "Synergies",
              desc: "Creating value through collaborative innovation",
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
          className="text-center"
        >
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-accent-gold hover:bg-accent-gold/90 text-primary-green font-semibold rounded-lg transition-all duration-300">
            Become a Partner
          </button>
        </motion.div>
      </div>
    </main>
  );
}
