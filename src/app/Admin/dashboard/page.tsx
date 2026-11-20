"use client";

import { useEffect, useState } from "react";
import HotelTable, { HotelIF } from "../Components/Tabels/HotelTabel";
import Image from "next/image";
import Arrow from "@/asset/icon/Arrow.svg";
import Link from "next/link";
import axios from "axios";
import { authHeader } from "@/app/Auth/AuthHeader/authHeader";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Hotel,
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  Users,
  Heart,
  ArrowRight,
  Edit2,
  Trash2,
  Eye,
  Plus,
  RefreshCw,
} from "lucide-react";

export interface JsonResponseIF {
  hotelCount: number;
  avgRating: number;
  hotels: HotelIF[];
}

export interface ApiResponseIF {
  output: number;
  message: string;
  jsonResponse: JsonResponseIF;
}

const StatCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  trend,
  delay,
}: {
  icon: any;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(201, 166, 107, 0.15)" }}
    className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg transition-all duration-300 group"
  >
    {/* Gradient Background Accent */}
    <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-primary-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    {/* Icon Container */}
    <div className="relative z-10 flex items-start justify-between mb-4">
      <div className="p-3 rounded-lg bg-gradient-to-br from-accent-gold/20 to-accent-gold/10 group-hover:from-accent-gold/30 group-hover:to-accent-gold/20 transition-all duration-300">
        <Icon className="w-6 h-6 text-accent-gold" />
      </div>
      {trend && (
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-green-50 dark:bg-green-900/20">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="text-xs font-semibold text-green-600">{trend}</span>
        </div>
      )}
    </div>

    {/* Content */}
    <div className="relative z-10">
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
        {title}
      </p>
      <h3 className="text-3xl md:text-4xl font-bold text-primary-green dark:text-white mb-1">
        {value}
      </h3>
      {subtitle && (
        <p className="text-xs text-gray-500 dark:text-gray-500">{subtitle}</p>
      )}
    </div>

    {/* Border Glow */}
    <div className="absolute inset-0 rounded-2xl border border-accent-gold/0 group-hover:border-accent-gold/30 transition-all duration-300 pointer-events-none" />
  </motion.div>
);

export default function AdminDashboard() {
  const { user, role, userRole } = useSelector(
    (state: RootState) =>
      state.auth as RootState["auth"] & { role?: string; userRole?: string }
  );
  const [dashBoardData, setDashBoardData] = useState<ApiResponseIF | null>(null);
  const [isDashBoardLoading, setIsDashBoardLoading] = useState<boolean>(false);
  const currentRole = userRole ?? role;
  const isHost = currentRole?.toLowerCase() === "host" || currentRole?.toLowerCase() === "admin";

  const getDashBoardResponse = async () => {
    try {
      setIsDashBoardLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/host/host-dashboard`,
        { hostId: user?.id },
        {
          headers: authHeader(),
        }
      );

      const responseData = response.data;
      if (responseData.output === 1) {
        setDashBoardData(responseData);
      } else {
        console.warn("Dashboard API returned non-success output:", responseData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsDashBoardLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    user?.id && getDashBoardResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const [bookings] = useState([
    {
      id: 101,
      guest: "John Doe",
      hotel: "Grand Palace",
      checkIn: "2025-02-10",
      checkOut: "2025-02-15",
      price: "$250",
      status: "Confirmed",
    },
    {
      id: 102,
      guest: "Jane Smith",
      hotel: "Sunset Resort",
      checkIn: "2025-03-01",
      checkOut: "2025-03-05",
      price: "$180",
      status: "Pending",
    },
  ]);

  if (isDashBoardLoading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-12 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-gray-200 dark:bg-slate-700 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-primary-green dark:text-white mb-2">
              {isHost ? "🏨 Host Dashboard" : "👤 Customer Dashboard"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {isHost
                ? "Manage your hotels, bookings, and revenue"
                : "View your bookings and manage your stays"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full sm:w-auto">
            {isHost && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={getDashBoardResponse}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-accent-gold to-accent-gold/90 hover:from-accent-gold/95 hover:to-accent-gold/85 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <RefreshCw className="w-5 h-5" />
                <span className="hidden sm:inline">Refresh</span>
              </motion.button>
            )}
            {isHost && (
              <Link href="/Admin/hotel">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-green hover:bg-primary-green/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">Add Hotel</span>
                </motion.button>
              </Link>
            )}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {isHost ? (
            <>
              <StatCard
                icon={Hotel}
                title="Total Hotels"
                value={dashBoardData?.jsonResponse?.hotelCount ?? 0}
                subtitle="Active properties"
                trend="+12%"
                delay={0}
              />
              <StatCard
                icon={Calendar}
                title="Total Bookings"
                value={bookings.length}
                subtitle="This month"
                trend="+8%"
                delay={0.1}
              />
              <StatCard
                icon={DollarSign}
                title="Revenue"
                value="$1,230"
                subtitle="Total earnings"
                trend="+25%"
                delay={0.2}
              />
              <StatCard
                icon={Star}
                title="Avg. Rating"
                value={`${dashBoardData?.jsonResponse.avgRating || 4.8}⭐`}
                subtitle="Guest satisfaction"
                delay={0.3}
              />
            </>
          ) : (
            <>
              <StatCard
                icon={Calendar}
                title="My Bookings"
                value="3"
                subtitle="Total bookings"
                trend="+1"
                delay={0}
              />
              <StatCard
                icon={TrendingUp}
                title="Upcoming Trips"
                value="1"
                subtitle="Next 30 days"
                delay={0.1}
              />
              <StatCard
                icon={DollarSign}
                title="Total Spent"
                value="$2,450"
                subtitle="All time"
                trend="+15%"
                delay={0.2}
              />
              <StatCard
                icon={Heart}
                title="Wishlist"
                value="5"
                subtitle="Saved hotels"
                delay={0.3}
              />
            </>
          )}
        </div>

        {/* Host Dashboard Sections */}
        {isHost && (
          <>
            {/* Recent Bookings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            >
              <div className="bg-gradient-to-r from-primary-green/10 to-accent-gold/10 px-8 py-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-primary-green dark:text-white flex items-center gap-3">
                  <Calendar className="w-7 h-7 text-accent-gold" />
                  Recent Bookings
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Guest
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Hotel
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Check-in
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Check-out
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, idx) => (
                      <motion.tr
                        key={booking.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 * idx }}
                        className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors duration-300"
                      >
                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 font-medium">
                          {booking.guest}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                          {booking.hotel}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {booking.checkIn}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {booking.checkOut}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-accent-gold">
                          {booking.price}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                              booking.status === "Confirmed"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Your Hotels Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            >
              <div className="bg-gradient-to-r from-primary-green/10 to-accent-gold/10 px-8 py-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary-green dark:text-white flex items-center gap-3">
                  <Hotel className="w-7 h-7 text-accent-gold" />
                  Your Hotels
                </h2>
                <Link href="/Admin/hotel">
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-accent-gold hover:text-accent-gold/80 font-semibold transition-colors"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>

              <div className="p-8">
                <HotelTable
                  hotelData={dashBoardData?.jsonResponse.hotels ?? null}
                  loading={isDashBoardLoading}
                  handleRefress={getDashBoardResponse}
                />
              </div>
            </motion.div>
          </>
        )}

        {/* Customer Dashboard Sections */}
        {!isHost && (
          <>
            {/* My Bookings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            >
              <div className="bg-gradient-to-r from-primary-green/10 to-accent-gold/10 px-8 py-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-primary-green dark:text-white flex items-center gap-3">
                  <Calendar className="w-7 h-7 text-accent-gold" />
                  My Bookings
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Hotel
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Check-in
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Check-out
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, idx) => (
                      <motion.tr
                        key={booking.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 * idx }}
                        className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors duration-300"
                      >
                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 font-medium">
                          {booking.hotel}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {booking.checkIn}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {booking.checkOut}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-accent-gold">
                          {booking.price}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                              booking.status === "Confirmed"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-gold/10 hover:bg-accent-gold/20 text-accent-gold font-semibold transition-all duration-300"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View</span>
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Wishlist Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary-green dark:text-white flex items-center gap-3">
                  <Heart className="w-7 h-7 text-accent-gold" />
                  My Wishlist
                </h2>
                <span className="px-4 py-2 rounded-full bg-accent-gold text-white font-semibold text-sm">
                  5 Hotels
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-400">
                You have 5 hotels in your wishlist. Start planning your next getaway!
              </p>

              <motion.button
                whileHover={{ x: 5 }}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-accent-gold to-accent-gold/90 hover:from-accent-gold/95 hover:to-accent-gold/85 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>View Wishlist</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
