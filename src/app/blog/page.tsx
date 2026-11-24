"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, MapPin, TrendingUp, Heart, Camera } from "lucide-react";

const blogCategories = [
  {
    icon: BookOpen,
    title: "Travel Tips",
    description: "Expert advice for your next luxury getaway",
    posts: 15,
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Sparkles,
    title: "Wellness",
    description: "Discover relaxation and wellness at our properties",
    posts: 12,
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: MapPin,
    title: "Destinations",
    description: "Explore hidden gems and must-visit locations",
    posts: 20,
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Stunning moments from our guests and locations",
    posts: 25,
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Heart,
    title: "Lifestyle",
    description: "Luxury living and lifestyle inspiration",
    posts: 18,
    color: "from-red-500 to-red-600",
  },
  {
    icon: TrendingUp,
    title: "News & Updates",
    description: "Latest news and updates from Velvet Haven",
    posts: 10,
    color: "from-green-500 to-green-600",
  },
];

const latestPosts = [
  {
    id: 1,
    title: "Top 10 Luxury Hotels in India",
    excerpt: "Discover the most luxurious and exclusive hotels across India...",
    date: "Nov 20, 2026",
    category: "Destinations",
    image: "🏨",
  },
  {
    id: 2,
    title: "Wellness Retreats for the Modern Traveler",
    excerpt: "Find peace and rejuvenation at our premium wellness packages...",
    date: "Nov 18, 2026",
    category: "Wellness",
    image: "🧘",
  },
  {
    id: 3,
    title: "Travel on a Budget Without Compromising Luxury",
    excerpt: "Learn how to enjoy premium stays at affordable rates...",
    date: "Nov 15, 2026",
    category: "Travel Tips",
    image: "💰",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-28 lg:pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-primary-green dark:text-white mb-4">
              Our <span className="text-accent-gold">Blog</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Travel tips, luxury insights, destination guides, and exclusive stories from around the world
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {blogCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${category.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-primary-green dark:text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {category.description}
                </p>
                <p className="text-xs font-semibold text-accent-gold">
                  {category.posts} articles
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Latest Posts */}
      <section className="bg-gradient-to-r from-primary-green/5 to-accent-gold/5 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-playfair font-semibold text-primary-green dark:text-white mb-8">
              Latest Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  <div className="p-6 md:p-8">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                      {post.image}
                    </div>
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-accent-gold/20 dark:bg-accent-gold/10 text-accent-gold text-xs font-semibold rounded-full mb-3">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-semibold text-primary-green dark:text-white mb-2 group-hover:text-accent-gold transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {post.excerpt}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {post.date}
                      </p>
                    </div>
                    <button className="text-sm font-semibold text-accent-gold hover:text-accent-gold/80 transition-colors">
                      Read More →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary-green/10 to-accent-gold/10 dark:from-primary-green/5 dark:to-accent-gold/5 rounded-3xl p-8 md:p-12 border border-accent-gold/20 text-center"
        >
          <h2 className="text-3xl font-playfair font-semibold text-primary-green dark:text-white mb-4">
            Subscribe to Our Blog
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
            Get the latest travel tips, exclusive offers, and luxury insights delivered to your inbox
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-accent-gold hover:bg-accent-gold/90 text-primary-green font-semibold rounded-lg transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  );
}
