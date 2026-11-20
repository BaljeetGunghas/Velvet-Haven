import React from "react";
import Link from "next/link";
import LandingSearchForm from "../Form/LandingSearchForm";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImage from "@/asset/hero-image.png";

// Local luxury hotel background image
const HERO_IMAGE_URL = heroImage.src;

// List of all supported cities - must match CityOptions exactly
const SUPPORTED_CITIES = [
  // Andhra Pradesh
  "visakhapatnam", "vijayawada", "guntur",
  // Arunachal Pradesh
  "itanagar", "naharlagun",
  // Assam
  "guwahati", "dibrugarh", "silchar",
  // Bihar
  "patna", "gaya", "muzaffarpur",
  // Chhattisgarh
  "raipur", "bhilai", "bilaspur",
  // Goa
  "panaji", "margao",
  // Gujarat
  "ahmedabad", "surat", "vadodara",
  // Haryana
  "gurugram", "faridabad", "panipat",
  // Himachal Pradesh
  "shimla", "dharamshala", "solan",
  // Jharkhand
  "ranchi", "jamshedpur", "dhanbad",
  // Karnataka
  "bangalore", "mysore", "hubli",
  // Kerala
  "thiruvananthapuram", "kochi", "kozhikode",
  // Madhya Pradesh
  "indore", "bhopal", "jabalpur",
  // Maharashtra
  "mumbai", "pune", "nagpur",
  // Manipur
  "imphal", "thoubal",
  // Meghalaya
  "shillong", "tura",
  // Mizoram
  "aizawl", "lunglei",
  // Nagaland
  "kohima", "dimapur",
  // Odisha
  "bhubaneswar", "cuttack", "rourkela",
  // Punjab
  "ludhiana", "amritsar", "jalandhar",
  // Rajasthan
  "jaipur", "jodhpur", "udaipur",
  // Sikkim
  "gangtok", "namchi",
  // Tamil Nadu
  "chennai", "coimbatore", "madurai",
  // Telangana
  "hyderabad", "warangal", "karimnagar",
  // Tripura
  "agartala",
  // Uttar Pradesh
  "lucknow", "kanpur", "varanasi",
  // Uttarakhand
  "dehradun", "haridwar", "haldwani",
  // West Bengal
  "kolkata", "howrah", "durgapur",
  // Union Territory
  "chandigarh", "delhi"
];

// Check if city is supported, otherwise return fallback
const normalizeCityName = (city: string | null): string => {
  if (!city) return "delhi";
  const normalizedCity = city.toLowerCase().trim();
  return SUPPORTED_CITIES.includes(normalizedCity) ? normalizedCity : "delhi";
};

interface LandingBannerProps {
  userCity?: string | null;
}

const LandingBanner = ({ userCity }: LandingBannerProps) => {
  const detectedCity = normalizeCityName(userCity);
  return (
    <section className="relative isolate mt-16 flex w-full min-h-[calc(100svh-4rem)] flex-col overflow-hidden pb-16 sm:pb-20 lg:pb-0">
      {/* Background Image with Premium Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(10, 25, 23, 0.42),
              rgba(10, 25, 23, 0.05)
            ),
            url('${HERO_IMAGE_URL}')
          `,
        }}
      />
      {/* Dark Mode Enhanced Overlay - More Transparent to Show Image */}
      <div className="absolute inset-0 z-0 hidden bg-gradient-to-br from-[#103F38]/60 via-[#0a3d3a]/40 to-[#051f1e]/50 dark:block" />

      {/* Hero Content Container */}
      <div className="relative z-10 flex flex-1 flex-col items-start justify-center px-4 py-8 sm:px-8 sm:py-12 lg:px-16 lg:py-20 xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-3xl"
        >
          {/* Eyebrow Text */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mb-4 flex items-center gap-2 sm:mb-6 lg:mb-8"
          >
            <div className="hidden sm:block h-0.5 w-8 bg-gradient-to-r from-accent-gold to-accent-gold/30 lg:w-10"></div>
            <span className="text-xs font-semibold uppercase tracking-[2.5px] text-accent-gold sm:text-sm lg:tracking-[3px]">
              ✨ Experience The Art of Hospitality
            </span>
          </motion.div>

          {/* Main Headline - Serif typography matching reference */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-4xl font-playfair font-semibold drop-shadow-2xl"
            style={{
              fontSize: 'clamp(2rem, 8vw, 5rem)',
              lineHeight: '1.08',
              letterSpacing: '-0.01em',
            }}>
            <span className="block text-white">Your Escape to</span>
            <span className="text-accent-gold">Extraordinary<span className="text-accent-gold">.</span></span>
          </motion.h1>

          {/* Description - Enhanced */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mb-6 max-w-2xl text-sm font-light leading-relaxed text-slate-100 drop-shadow-lg dark:text-slate-200 sm:mb-8 sm:text-base lg:mb-10 lg:text-lg"
          >
            Discover exceptional stays, thoughtfully designed spaces, and unforgettable experiences. Your next extraordinary getaway begins here.
          </motion.p>

          {/* CTA Button - Gold Pill Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link href={`/SearchResult?city=${detectedCity}&check_in_date=2025-03-19&check_out_date=2025-03-20&adults=1&page=1`}>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-full border-2 border-accent-gold bg-transparent px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-accent-gold/10 hover:shadow-xl hover:shadow-accent-gold/40 group sm:px-8 sm:py-3.5 sm:text-base"
              >
                <span>Explore Our Stays</span>
                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Search Panel - Responsive Flex Layout */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="relative z-20 mx-auto w-full px-3 sm:px-6 flex-shrink-0 lg:absolute lg:bottom-6 lg:left-0 lg:right-0 lg:mx-auto lg:w-full lg:max-w-6xl lg:px-8"
      >
        {/* Search Card */}
        <div className="relative mx-auto w-full max-w-6xl overflow-visible rounded-xl sm:rounded-2xl border border-gray-100 bg-white p-3 sm:p-5 md:p-6 lg:p-7 shadow-2xl shadow-black/15 transition-all duration-500 hover:shadow-black/20 dark:border-slate-700/50 dark:bg-slate-800/95 dark:shadow-primary-green/50 dark:hover:shadow-primary-green/60">
          {/* Gradient Effect */}
          <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-accent-gold/10 via-transparent to-accent-gold/5" />

          {/* Form */}
          <div className="relative z-10 w-full min-w-0">
            <LandingSearchForm />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LandingBanner;
