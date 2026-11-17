"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import noResult from "@/asset/no-result-found.svg";
import Link from "next/link";

export default function NoResultFound() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 items-center justify-center py-20"
        >
            {/* Icon Container */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 to-primary-green/20 rounded-full blur-3xl w-48 h-48 mx-auto" />
                <Image
                    height={120}
                    width={120}
                    className="h-32 w-32 relative z-10 opacity-80"
                    src={noResult}
                    alt="No results found"
                />
            </motion.div>

            {/* Heading */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-semibold text-primary-green dark:text-white text-center"
            >
                No Available <span className="text-accent-gold">Stays</span>
            </motion.h2>

            {/* Description */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-base sm:text-lg text-gray-600 dark:text-gray-400 text-center max-w-md"
            >
                We couldn’t find properties matching your search criteria.
            </motion.p>

            {/* Suggestions */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-accent-gold/10 to-primary-green/10 dark:from-slate-800/50 dark:to-slate-700/50 rounded-2xl border border-accent-gold/20 dark:border-slate-700 p-6 max-w-md"
            >
                <p className="text-sm font-semibold text-primary-green dark:text-white mb-3">Try adjusting:</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>✓ Your check-in and check-out dates</li>
                    <li>✓ The destination or nearby locations</li>
                    <li>✓ Your budget or price range</li>
                    <li>✓ Number of guests or rooms</li>
                </ul>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
            >
                <Button
                    onClick={() => window.location.reload()}
                    className="bg-accent-gold text-white hover:bg-accent-gold/90 px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-accent-gold/30"
                >
                    Try New Search
                </Button>
                <Link href="/">
                    <Button
                        className="border-2 border-accent-gold text-accent-gold bg-transparent hover:bg-accent-gold/5 px-8 py-3 rounded-lg font-semibold transition-all"
                    >
                        Browse All Destinations
                    </Button>
                </Link>
            </motion.div>
        </motion.div>
    );
}
