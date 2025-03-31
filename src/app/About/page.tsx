'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-bannerbg flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl bg-white dark:bg-foreground shadow-lg rounded-2xl p-8 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">About Velvet-Haven</h1>
        <p className="text-gray-600 dark:text-slate-200 text-lg">
          At <span className="text-indigo-600 font-semibold">Velvet-Haven</span>, your satisfaction is our top priority. We strive to
          provide a seamless and luxurious hotel booking experience, ensuring comfort, convenience, and the best prices
          for our valued guests.
        </p>
        <p className="mt-4 text-gray-600 dark:text-slate-200">
          Whether you&apos;re traveling for business, leisure, or a special getaway, we are dedicated to offering you the
          finest accommodations, exclusive deals, and a stress-free booking process. Stay connected to receive the
          latest updates, special offers, and personalized recommendations.
        </p>
        <div className="mt-6">
          <Link href="/Contact">
            <button className="bg-primaryblue dark:bg-white hover:bg-indigo-700 text-white dark:text-black font-semibold px-6 py-3 rounded-xl shadow-lg transition">
              Contact Us
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
