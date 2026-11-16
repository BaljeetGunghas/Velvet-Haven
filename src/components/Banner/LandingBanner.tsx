import React from "react";
import Image from "next/image";
import LandingSearchForm from "../Form/LandingSearchForm";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// High-quality luxury hotel architecture image from Unsplash
// Configurable URL for easy replacement
const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop";

const LandingBanner = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center mt-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={HERO_IMAGE_URL}
          alt="Luxury Hotel Architecture"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Sophisticated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-green/70 via-primary-green/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-green/40"></div>
      </div>

      {/* Hero Content Container */}
      <div className="w-full px-mainPading max-sm:px-4 max-md:px-8 flex flex-col justify-center items-start min-h-screen relative z-10 pt-32 sm:pt-24 pb-80 sm:pb-96 lg:pb-60">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-3xl"
        >
          {/* Eyebrow Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-4 lg:mb-6 flex items-center gap-2"
          >
            <span className="text-accent-gold text-xs lg:text-sm font-semibold tracking-[2px] lg:tracking-[3px] uppercase">
              ✨ Experience The Art of Hospitality
            </span>
          </motion.div>

          {/* Main Headline - Refined */}
          <h1 className="font-playfair text-white font-bold leading-tight lg:leading-tight mb-8 drop-shadow-2xl max-w-4xl"
            style={{
              fontSize: 'clamp(2rem, 8vw, 5rem)',
            }}>
            Your Escape to Extraordinary<span className="text-accent-gold">.</span>
          </h1>

          {/* Description - Better Readability */}
          <p className="text-slate-50 text-base lg:text-lg max-sm:text-sm font-light mb-8 lg:mb-10 max-w-2xl leading-relaxed drop-shadow-lg">
            Discover exceptional stays, thoughtfully designed spaces, and unforgettable experiences. Your next extraordinary getaway begins here.
          </p>

          {/* CTA Link */}
          <motion.a
            href="#explore"
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-3 text-accent-gold font-semibold text-sm tracking-wide hover:text-white transition-all duration-300 group"
          >
            <span className="inline-block w-8 h-px bg-accent-gold"></span>
            Explore Our Stays
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </motion.a>
        </motion.div>
      </div>

      {/* Search Panel - Premium Floating Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative w-11/12 max-w-4xl mx-auto z-20 -mt-32 sm:-mt-40 lg:-mt-48"
      >
        {/* Card Container with Premium Styling */}
        <div className="bg-white/95 dark:bg-primary-green/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-primary-green/30 p-4 sm:p-6 lg:p-8 border border-border-light dark:border-accent-gold/30">
          <LandingSearchForm />
        </div>
      </motion.div>
    </div>
  );
};

export default LandingBanner;
