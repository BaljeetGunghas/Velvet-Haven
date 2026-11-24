"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, MapPin, Calendar, Users, ThumbsUp } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Priya Singh",
    rating: 5,
    location: "Mumbai",
    date: "Nov 2026",
    hotel: "Velvet Haven Mumbai",
    roomType: "Premium Suite",
    review: "Absolutely exceptional experience! The staff was incredibly attentive and the room was impeccably decorated. Highly recommend for anyone looking for luxury at its finest.",
    verified: true,
    helpful: 234,
    image: "👩‍🦰",
    days: 3,
  },
  {
    id: 2,
    name: "Rajesh Patel",
    rating: 5,
    location: "Jaipur",
    date: "Oct 2026",
    hotel: "Velvet Haven Jaipur",
    roomType: "Deluxe Room",
    review: "The ambiance is magical! Perfect blend of luxury and comfort. The dining experience was world-class and the view from the balcony was breathtaking.",
    verified: true,
    helpful: 189,
    image: "👨‍💼",
    days: 2,
  },
  {
    id: 3,
    name: "Anjali Verma",
    rating: 5,
    location: "Shimla",
    date: "Sep 2026",
    hotel: "Velvet Haven Shimla",
    roomType: "Luxury Penthouse",
    review: "Best vacation ever! The concierge helped us plan amazing activities. The spa services were rejuvenating and the breakfast was a highlight every morning.",
    verified: true,
    helpful: 312,
    image: "👩",
    days: 5,
  },
  {
    id: 4,
    name: "Amit Kumar",
    rating: 4,
    location: "Delhi",
    date: "Aug 2026",
    hotel: "Velvet Haven Delhi",
    roomType: "Deluxe Room",
    review: "Very good stay! The hotel is well-maintained and the service is excellent. Would have loved a better view from the room, but overall very satisfied.",
    verified: true,
    helpful: 156,
    image: "👨",
    days: 2,
  },
  {
    id: 5,
    name: "Sana Khan",
    rating: 5,
    location: "Bangalore",
    date: "Jul 2026",
    hotel: "Velvet Haven Bangalore",
    roomType: "Premium Suite",
    review: "Luxury redefined! Every detail is carefully thought out. The fitness center is top-notch and the WiFi is super fast. Perfect for business travelers.",
    verified: true,
    helpful: 278,
    image: "👩‍🦱",
    days: 4,
  },
  {
    id: 6,
    name: "Vikram Singh",
    rating: 5,
    location: "Hyderabad",
    date: "Jun 2026",
    hotel: "Velvet Haven Hyderabad",
    roomType: "Luxury Penthouse",
    review: "Outstanding service and incredible views! The staff remembered our preferences. Definitely coming back for our anniversary next year!",
    verified: true,
    helpful: 401,
    image: "👨‍💻",
    days: 3,
  },
];

const stats = [
  { label: "Guest Reviews", value: "2,847", icon: Star },
  { label: "Average Rating", value: "4.8", icon: Star },
  { label: "Verified Guests", value: "98%", icon: "✓" },
  { label: "Recommend Rate", value: "96%", icon: "👍" },
];

export default function ReviewsPage() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("recent");

  const filteredReviews = selectedRating
    ? reviews.filter((r) => r.rating === selectedRating)
    : reviews;

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "recent") return 0;
    if (sortBy === "helpful") return b.helpful - a.helpful;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-28 lg:pt-32 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-primary-green dark:text-white mb-4">
              Guest <span className="text-accent-gold">Reviews</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Hear from our valued guests about their unforgettable experiences at Velvet Haven
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary-green/10 to-accent-gold/10 py-12 mb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center border border-gray-200 dark:border-slate-700"
              >
                <p className="text-3xl md:text-4xl font-bold text-accent-gold mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Sort */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 pb-12">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          {/* Rating Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedRating(null)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedRating === null
                  ? "bg-accent-gold text-primary-green"
                  : "bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600"
              }`}
            >
              All Reviews
            </button>
            {[5, 4, 3].map((rating) => (
              <button
                key={rating}
                onClick={() => setSelectedRating(rating)}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-1 ${
                  selectedRating === rating
                    ? "bg-accent-gold text-primary-green"
                    : "bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600"
                }`}
              >
                {rating}
                <Star className="w-4 h-4 fill-current" />
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-white font-semibold focus:outline-none focus:border-accent-gold"
          >
            <option value="recent">Most Recent</option>
            <option value="helpful">Most Helpful</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>

        {/* Reviews Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {sortedReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              layoutId={`review-${review.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{review.image}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {review.name}
                    </h3>
                    {review.verified && (
                      <p className="text-xs text-green-600 dark:text-green-400 font-semibold">
                        ✓ Verified Guest
                      </p>
                    )}
                  </div>
                </div>
                <Quote className="w-6 h-6 text-accent-gold/30" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? "fill-accent-gold text-accent-gold"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  {review.rating}.0
                </span>
              </div>

              {/* Review Info */}
              <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {review.hotel}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {review.roomType}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {review.days} days
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {review.date}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                &quot;{review.review}&quot;
              </p>

              {/* Helpful Button */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-slate-700">
                <button className="flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-sm text-gray-600 dark:text-gray-400">
                  <ThumbsUp className="w-4 h-4" />
                  Helpful ({review.helpful})
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {sortedReviews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No reviews found with selected filters
            </p>
          </motion.div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-green/5 to-accent-gold/5 py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-playfair font-semibold text-primary-green dark:text-white mb-4">
              Ready to Experience Luxury?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied guests who have experienced unforgettable stays at Velvet Haven
            </p>
            <a href="/SearchResult?city=delhi&check_in_date=2026-11-24&check_out_date=2026-11-25&adults=1&page=1">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-accent-gold hover:bg-accent-gold/90 text-primary-green font-semibold rounded-lg transition-all duration-300 text-lg">
                Book Your Stay Now
              </button>
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
