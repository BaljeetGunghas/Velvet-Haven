import Link from "next/link";
import Image from "next/image";
import pageNotFound from "@/asset/404.svg";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 flex items-center justify-center px-4 py-12">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary-green/5 rounded-full blur-3xl opacity-40"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl w-full text-center"
      >
        {/* 404 Image */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 to-primary-green/20 rounded-full blur-3xl w-96 h-96 mx-auto"></div>
            <Image
              src={pageNotFound}
              alt="Page Not Found"
              className="relative z-10 h-64 w-auto"
            />
          </div>
        </motion.div>

        {/* Error Code */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-7xl md:text-8xl font-playfair font-bold text-accent-gold drop-shadow-lg">
            404
          </h2>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-5xl font-playfair font-bold text-primary-green dark:text-white mb-4"
        >
          Page Not Found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto leading-relaxed font-light"
        >
          We couldn’t find the page you’re looking for. This page either doesn’t exist, was removed, or the URL might be incorrect. Don’t worry, let’s get you back on track.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-gold to-accent-gold/90 hover:from-accent-gold/95 hover:to-accent-gold/85 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-accent-gold/30 hover:scale-105 transform"
          >
            <Home size={20} />
            <span>Back to Home</span>
          </Link>

          {/* Explore Button */}
          <Link
            href="/SearchResult?city=delhi&check_in_date=2025-03-19&check_out_date=2025-03-20&adults=1&page=1"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-accent-gold text-accent-gold hover:bg-accent-gold/10 font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent-gold/20"
          >
            <span>Browse Hotels</span>
            <ArrowLeft size={20} className="rotate-180" />
          </Link>
        </motion.div>

        {/* Helpful Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-xs md:text-sm text-gray-500 dark:text-gray-500 mt-8 font-light"
        >
          If you believe this is an error, please{" "}
          <Link href="/Contact" className="text-accent-gold hover:underline font-semibold">
            contact us
          </Link>
        </motion.p>
      </motion.div>
    </main>
  );
}
