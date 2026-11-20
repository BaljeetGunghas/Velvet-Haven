"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Star,
  Users,
  DollarSign,
  Trash2,
  Eye,
  ArrowRight,
  Search,
  Filter,
  TrendingUp,
  BookMarked,
  MessageSquare,
  Plus,
  BarChart3,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

interface CompetitorHotel {
  id: number;
  name: string;
  location: string;
  image: string;
  pricePerNight: number;
  rating: number;
  reviews: number;
  amenities: string[];
  maxGuests: number;
  rooms: number;
  savedDate: string;
  notes?: string;
  competitorStrength: "High" | "Medium" | "Low";
  lastUpdated: string;
}

const CompetitorCard = ({
  hotel,
  onRemove,
  delay,
}: {
  hotel: CompetitorHotel;
  onRemove: (id: number) => void;
  delay: number;
}) => {
  const strengthConfig = {
    High: {
      bg: "from-red-50/60 to-red-50/30 dark:from-red-950/40 dark:to-red-950/20",
      border: "border-red-200/40 dark:border-red-900/40 hover:border-red-300/60 dark:hover:border-red-800/60",
      badge: "bg-red-100/80 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200/50 dark:border-red-800/50",
      icon: "text-red-600 dark:text-red-400",
    },
    Medium: {
      bg: "from-amber-50/60 to-amber-50/30 dark:from-amber-950/40 dark:to-amber-950/20",
      border: "border-amber-200/40 dark:border-amber-900/40 hover:border-amber-300/60 dark:hover:border-amber-800/60",
      badge: "bg-amber-100/80 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/50",
      icon: "text-amber-600 dark:text-amber-400",
    },
    Low: {
      bg: "from-emerald-50/60 to-emerald-50/30 dark:from-emerald-950/40 dark:to-emerald-950/20",
      border: "border-emerald-200/40 dark:border-emerald-900/40 hover:border-emerald-300/60 dark:hover:border-emerald-800/60",
      badge: "bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50",
      icon: "text-emerald-600 dark:text-emerald-400",
    },
  };

  const config = strengthConfig[hotel.competitorStrength];
  const strengthLabel =
    hotel.competitorStrength === "High"
      ? "High Competition"
      : hotel.competitorStrength === "Medium"
      ? "Medium Competition"
      : "Low Competition";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -8 }}
      className={`group rounded-2xl overflow-hidden border-2 ${config.border} bg-gradient-to-br ${config.bg} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 relative`}
    >
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Image Section */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-200/50 to-slate-300/50 dark:from-slate-700/50 dark:to-slate-800/50">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />

        {/* Competition Badge */}
        <div className={`absolute top-4 right-4 z-20 px-4 py-2 rounded-full text-xs font-bold ${config.badge} backdrop-blur-sm shadow-md`}>
          {strengthLabel}
        </div>

        {/* Quick Stats Overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex gap-3">
          <div className="inline-flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md border border-white/30 dark:border-slate-800/30">
            <Star className="w-4 h-4 fill-accent-gold text-accent-gold flex-shrink-0" />
            <span className="font-bold text-sm text-gray-900 dark:text-white">
              {hotel.rating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              ({hotel.reviews})
            </span>
          </div>

          <div className="inline-flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md border border-white/30 dark:border-slate-800/30">
            <DollarSign className="w-4 h-4 text-accent-gold flex-shrink-0" />
            <span className="font-bold text-sm text-gray-900 dark:text-white">
              {hotel.pricePerNight}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 relative z-10">
        {/* Header */}
        <div className="mb-5">
          <h3 className="text-xl md:text-2xl font-playfair font-bold text-primary-green dark:text-white mb-2 group-hover:text-accent-gold transition-colors line-clamp-1">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
            <MapPin className="w-4 h-4 text-accent-gold flex-shrink-0" />
            <span className="text-sm font-medium line-clamp-1">{hotel.location}</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Last updated: {new Date(hotel.lastUpdated).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-accent-gold/10 via-accent-gold/30 to-accent-gold/10 mb-5" />

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-3 rounded-lg bg-gradient-to-br from-white/40 to-white/20 dark:from-slate-700/40 dark:to-slate-700/20 border border-slate-200/40 dark:border-slate-700/40 hover:border-accent-gold/30 transition-all">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-primary-green dark:text-accent-gold flex-shrink-0" />
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                Capacity
              </p>
            </div>
            <p className="text-xl font-playfair font-bold text-gray-800 dark:text-white">
              {hotel.maxGuests}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-gradient-to-br from-white/40 to-white/20 dark:from-slate-700/40 dark:to-slate-700/20 border border-slate-200/40 dark:border-slate-700/40 hover:border-accent-gold/30 transition-all">
            <div className="flex items-center gap-2 mb-1">
              <BookMarked className="w-4 h-4 text-primary-green dark:text-accent-gold flex-shrink-0" />
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                Rooms
              </p>
            </div>
            <p className="text-xl font-playfair font-bold text-gray-800 dark:text-white">
              {hotel.rooms}
            </p>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-5 pb-5 border-b border-slate-200/50 dark:border-slate-700/50">
          <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
            Amenities
          </p>
          <div className="flex gap-2 flex-wrap">
            {hotel.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-md bg-gradient-to-r from-accent-gold/10 to-accent-gold/5 dark:from-accent-gold/20 dark:to-accent-gold/10 text-gray-700 dark:text-gray-300 font-semibold border border-accent-gold/20 dark:border-accent-gold/30"
              >
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100/50 dark:bg-slate-700/30 text-gray-600 dark:text-gray-400 font-semibold border border-slate-200/50 dark:border-slate-700/50">
                +{hotel.amenities.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Notes */}
        {hotel.notes && (
          <div className="mb-5 pb-5 border-b border-slate-200/50 dark:border-slate-700/50">
            <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
              Notes
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
              {hotel.notes}
            </p>
          </div>
        )}

        {/* Analysis Tag */}
        <div className="mb-5 p-3 rounded-lg bg-gradient-to-r from-accent-gold/5 to-accent-gold/0 dark:from-accent-gold/10 dark:to-accent-gold/5 border border-accent-gold/20 dark:border-accent-gold/30">
          <div className="flex items-start gap-2">
            <TrendingUp className="w-4 h-4 text-accent-gold flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-700 dark:text-gray-300">
              {hotel.competitorStrength === "High"
                ? "Strong competitor - Priority monitoring recommended"
                : hotel.competitorStrength === "Medium"
                ? "Moderate competitor - Track strategy changes"
                : "Emerging competitor - Good for market analysis"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-accent-gold/20 to-accent-gold/10 hover:from-accent-gold/30 hover:to-accent-gold/20 text-accent-gold dark:text-accent-gold font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 border border-accent-gold/30 hover:border-accent-gold/50"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">View</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-primary-green/20 to-primary-green/10 hover:from-primary-green/30 hover:to-primary-green/20 text-primary-green dark:text-green-400 font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 border border-primary-green/30 hover:border-primary-green/50"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Notes</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onRemove(hotel.id)}
            className="p-3 rounded-lg bg-red-50/50 dark:bg-red-950/30 hover:bg-red-100/50 dark:hover:bg-red-950/50 text-red-600 dark:text-red-400 font-bold shadow-md hover:shadow-lg transition-all duration-300 border border-red-200/50 dark:border-red-800/50 hover:border-red-300/70 dark:hover:border-red-700/70"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Meta */}
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-3 text-center">
          Saved {new Date(hotel.savedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" })}
        </p>
      </div>
    </motion.div>
  );
};

export default function HostWishlistPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [wishlistItems, setWishlistItems] = useState<CompetitorHotel[]>([]);
  const [filteredItems, setFilteredItems] = useState<CompetitorHotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStrength, setFilterStrength] = useState<"all" | "High" | "Medium" | "Low">("all");

  // Mock competitor data
  const mockWishlist: CompetitorHotel[] = [
    {
      id: 1,
      name: "Grand Palace Hotel",
      location: "New York, USA",
      image: "/hotel1.jpg",
      pricePerNight: 450,
      rating: 4.9,
      reviews: 1240,
      amenities: ["WiFi", "Dining", "Fitness", "Spa", "AC", "Pool"],
      maxGuests: 4,
      rooms: 250,
      savedDate: "2025-11-15",
      notes: "Premium positioning with high-end amenities. Strong luxury brand presence.",
      competitorStrength: "High",
      lastUpdated: "2025-11-20",
    },
    {
      id: 2,
      name: "Sunset Resort",
      location: "Maldives",
      image: "/hotel2.jpg",
      pricePerNight: 380,
      rating: 4.8,
      reviews: 890,
      amenities: ["WiFi", "Dining", "Spa", "AC", "Beach Access"],
      maxGuests: 6,
      rooms: 150,
      savedDate: "2025-11-10",
      notes: "Excellent guest reviews with strong tropical positioning.",
      competitorStrength: "High",
      lastUpdated: "2025-11-20",
    },
    {
      id: 3,
      name: "Mountain View Inn",
      location: "Swiss Alps",
      image: "/hotel3.jpg",
      pricePerNight: 280,
      rating: 4.7,
      reviews: 650,
      amenities: ["WiFi", "Fitness", "Dining", "AC"],
      maxGuests: 5,
      rooms: 80,
      savedDate: "2025-11-08",
      notes: "Niche market positioning with outdoor activity integration.",
      competitorStrength: "Medium",
      lastUpdated: "2025-11-19",
    },
    {
      id: 4,
      name: "City Plaza Hotel",
      location: "London, UK",
      image: "/hotel4.jpg",
      pricePerNight: 350,
      rating: 4.6,
      reviews: 1100,
      amenities: ["WiFi", "Dining", "Fitness", "AC"],
      maxGuests: 4,
      rooms: 200,
      savedDate: "2025-11-05",
      notes: "City center strategy with strong business traveler focus.",
      competitorStrength: "Medium",
      lastUpdated: "2025-11-19",
    },
    {
      id: 5,
      name: "Tropical Haven",
      location: "Bali, Indonesia",
      image: "/hotel5.jpg",
      pricePerNight: 220,
      rating: 4.8,
      reviews: 950,
      amenities: ["WiFi", "Spa", "Dining", "Fitness", "Pool"],
      maxGuests: 5,
      rooms: 120,
      savedDate: "2025-11-03",
      notes: "Budget-friendly luxury with excellent amenities for price point.",
      competitorStrength: "Low",
      lastUpdated: "2025-11-18",
    },
    {
      id: 6,
      name: "Desert Oasis",
      location: "Dubai, UAE",
      image: "/hotel6.jpg",
      pricePerNight: 520,
      rating: 5.0,
      reviews: 2100,
      amenities: ["WiFi", "Spa", "Fitness", "Dining", "Concierge"],
      maxGuests: 6,
      rooms: 300,
      savedDate: "2025-11-01",
      notes: "Ultra-luxury positioning with exclusive amenities and services.",
      competitorStrength: "High",
      lastUpdated: "2025-11-20",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setWishlistItems(mockWishlist);
      setFilteredItems(mockWishlist);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = wishlistItems.filter(
      (item) =>
        (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterStrength === "all" || item.competitorStrength === filterStrength)
    );

    setFilteredItems(filtered);
  }, [searchTerm, filterStrength, wishlistItems]);

  const handleRemove = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const stats = {
    total: wishlistItems.length,
    highCompetition: wishlistItems.filter((item) => item.competitorStrength === "High").length,
    avgPrice:
      wishlistItems.length > 0
        ? (wishlistItems.reduce((sum, item) => sum + item.pricePerNight, 0) / wishlistItems.length).toFixed(0)
        : 0,
    avgRating:
      wishlistItems.length > 0
        ? (wishlistItems.reduce((sum, item) => sum + item.rating, 0) / wishlistItems.length).toFixed(1)
        : 0,
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800/80 dark:to-slate-900">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/3 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-green/3 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-primary-green dark:text-white mb-3">
            Competitor Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-light">
            Monitor and analyze competitor hotels to maintain market advantage
          </p>
        </motion.div>

        {/* Stats Grid */}
        {!isLoading && wishlistItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              {
                label: "Total Tracked",
                value: stats.total,
                icon: "📊",
                bg: "from-slate-100/60 to-slate-100/30 dark:from-slate-800/60 dark:to-slate-800/30",
                border: "border-slate-200/50 dark:border-slate-700/50",
              },
              {
                label: "High Competition",
                value: stats.highCompetition,
                icon: "⚠️",
                bg: "from-red-50/60 to-red-50/30 dark:from-red-950/40 dark:to-red-950/20",
                border: "border-red-200/40 dark:border-red-900/40",
              },
              {
                label: "Avg Price/Night",
                value: `$${stats.avgPrice}`,
                icon: "💰",
                bg: "from-amber-50/60 to-amber-50/30 dark:from-amber-950/40 dark:to-amber-950/20",
                border: "border-amber-200/40 dark:border-amber-900/40",
              },
              {
                label: "Avg Rating",
                value: `${stats.avgRating}⭐`,
                icon: "⭐",
                bg: "from-emerald-50/60 to-emerald-50/30 dark:from-emerald-950/40 dark:to-emerald-950/20",
                border: "border-emerald-200/40 dark:border-emerald-900/40",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className={`rounded-xl p-6 bg-gradient-to-br ${stat.bg} border-2 ${stat.border} shadow-md hover:shadow-lg transition-all duration-300`}
              >
                <p className="text-3xl mb-3">{stat.icon}</p>
                <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                  {stat.label}
                </p>
                <p className="text-3xl font-playfair font-bold text-primary-green dark:text-white">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Search & Filter Bar */}
        {!isLoading && wishlistItems.length > 0 && (
          <div className="mb-10 flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by hotel name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-3 rounded-lg bg-white dark:bg-slate-800 border-2 border-slate-200/50 dark:border-slate-700/50 hover:border-accent-gold/30 focus:border-accent-gold/60 focus:outline-none transition-all duration-300 text-gray-800 dark:text-white placeholder-gray-400 text-sm font-medium"
              />
            </div>

            {/* Filter */}
            <select
              value={filterStrength}
              onChange={(e) => setFilterStrength(e.target.value as any)}
              className="px-6 py-3 rounded-lg bg-white dark:bg-slate-800 border-2 border-slate-200/50 dark:border-slate-700/50 hover:border-accent-gold/30 focus:border-accent-gold/60 focus:outline-none transition-all duration-300 text-gray-700 dark:text-gray-300 font-semibold cursor-pointer text-sm"
            >
              <option value="all">All Competitors</option>
              <option value="High">High Competition</option>
              <option value="Medium">Medium Competition</option>
              <option value="Low">Low Competition</option>
            </select>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="h-80 bg-gradient-to-r from-slate-200/50 to-slate-300/50 dark:from-slate-700/50 dark:to-slate-800/50 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Competitor Grid */}
        {!isLoading && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((hotel, idx) => (
              <CompetitorCard key={hotel.id} hotel={hotel} onRemove={handleRemove} delay={idx * 0.1} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-32 px-8"
          >
            <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-slate-100/60 to-slate-100/30 dark:from-slate-800/60 dark:to-slate-800/30 border-2 border-slate-200/50 dark:border-slate-700/50 mb-8">
              <BarChart3 className="w-24 h-24 text-gray-300 dark:text-gray-600" />
            </div>
            <h3 className="text-3xl font-playfair font-bold text-gray-700 dark:text-gray-300 mb-3">
              {searchTerm ? "No competitors found" : "No competitors tracked yet"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto mb-8">
              {searchTerm
                ? `No results for "${searchTerm}". Try a different search.`
                : "Start adding competitors to monitor market trends and improve your competitive strategy."}
            </p>

            {!searchTerm && (
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-gradient-to-r from-accent-gold/80 to-accent-gold/60 hover:from-accent-gold hover:to-accent-gold/80 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                <span>Add First Competitor</span>
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Tips Section */}
        {!isLoading && wishlistItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-accent-gold/5 to-primary-green/5 dark:from-accent-gold/10 dark:to-primary-green/10 border-2 border-accent-gold/20 dark:border-accent-gold/30"
          >
            <h4 className="text-2xl font-playfair font-bold text-primary-green dark:text-white mb-6">
              💡 Strategic Insights
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <span className="text-2xl flex-shrink-0">📈</span>
                <div>
                  <strong className="text-gray-800 dark:text-white block mb-1">Track Pricing Trends</strong>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Monitor rates to ensure competitive positioning</span>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl flex-shrink-0">⭐</span>
                <div>
                  <strong className="text-gray-800 dark:text-white block mb-1">Analyze Reviews</strong>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Identify guest satisfaction and improvement areas</span>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl flex-shrink-0">✨</span>
                <div>
                  <strong className="text-gray-800 dark:text-white block mb-1">Benchmark Amenities</strong>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Compare features to maintain market leadership</span>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl flex-shrink-0">📝</span>
                <div>
                  <strong className="text-gray-800 dark:text-white block mb-1">Document Insights</strong>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Save notes for strategic decision-making</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
