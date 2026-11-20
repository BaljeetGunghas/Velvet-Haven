"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Download,
  Eye,
  Trash2,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import axios from "axios";
import { authHeader } from "@/app/Auth/AuthHeader/authHeader";

interface Booking {
  id: number;
  guestName: string;
  hotelName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  children: number;
  price: number;
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  email: string;
  phone: string;
  specialRequests?: string;
  bookingDate: string;
  nights: number;
}

const StatusBadge = ({ status }: { status: Booking["status"] }) => {
  const statusConfig = {
    confirmed: {
      bg: "bg-green-100/80 dark:bg-green-900/40 backdrop-blur-sm",
      text: "text-green-700 dark:text-green-300",
      icon: CheckCircle,
      border: "border-green-200 dark:border-green-800",
    },
    pending: {
      bg: "bg-amber-100/80 dark:bg-amber-900/40 backdrop-blur-sm",
      text: "text-amber-700 dark:text-amber-300",
      icon: Clock,
      border: "border-amber-200 dark:border-amber-800",
    },
    cancelled: {
      bg: "bg-red-100/80 dark:bg-red-900/40 backdrop-blur-sm",
      text: "text-red-700 dark:text-red-300",
      icon: AlertCircle,
      border: "border-red-200 dark:border-red-800",
    },
    completed: {
      bg: "bg-blue-100/80 dark:bg-blue-900/40 backdrop-blur-sm",
      text: "text-blue-700 dark:text-blue-300",
      icon: CheckCircle,
      border: "border-blue-200 dark:border-blue-800",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border ${config.bg} ${config.text} ${config.border} shadow-lg`}>
      <Icon className="w-4 h-4" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};

const BookingCard = ({
  booking,
  isHost,
  delay,
}: {
  booking: Booking;
  isHost: boolean;
  delay: number;
}) => {
  const checkOutDate = new Date(booking.checkOut);
  const today = new Date();
  const isUpcoming = checkOutDate > today;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(201, 166, 107, 0.15)" }}
      className="rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50 bg-white dark:bg-slate-800/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 group relative"
    >
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-gold/20 via-transparent to-primary-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Premium Header Gradient */}
      <div className="h-2 bg-gradient-to-r from-accent-gold via-accent-gold/70 to-primary-green" />

      <div className="p-8 relative z-10">
        {/* Header with Status */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
          <div className="flex-1">
            <h3 className="text-3xl font-playfair font-bold text-primary-green dark:text-white mb-3">
              {booking.hotelName}
            </h3>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MapPin className="w-5 h-5 text-accent-gold flex-shrink-0" />
              <span className="font-medium">{booking.roomType}</span>
            </div>
          </div>
          <StatusBadge status={booking.status} />
        </div>

        {/* Elegant Divider */}
        <div className="h-px bg-gradient-to-r from-accent-gold/20 via-accent-gold/40 to-accent-gold/20 mb-8" />

        {/* Booking Details Grid - Premium Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Check-in */}
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br from-accent-gold/5 to-accent-gold/0 hover:from-accent-gold/10 hover:to-accent-gold/5 transition-all duration-300 border border-accent-gold/10 hover:border-accent-gold/30">
            <div className="p-4 rounded-xl bg-gradient-to-br from-accent-gold/30 to-accent-gold/10 shadow-lg">
              <Calendar className="w-6 h-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                Check-in
              </p>
              <p className="text-xl font-playfair font-bold text-gray-800 dark:text-white mt-1">
                {new Date(booking.checkIn).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </motion.div>

          {/* Check-out */}
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br from-primary-green/5 to-primary-green/0 hover:from-primary-green/10 hover:to-primary-green/5 transition-all duration-300 border border-primary-green/10 hover:border-primary-green/30">
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary-green/30 to-primary-green/10 shadow-lg">
              <Calendar className="w-6 h-6 text-primary-green" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                Check-out
              </p>
              <p className="text-xl font-playfair font-bold text-gray-800 dark:text-white mt-1">
                {new Date(booking.checkOut).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </motion.div>

          {/* Guests */}
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-0 dark:from-blue-900/20 dark:to-blue-900/5 hover:from-blue-100 hover:to-blue-50 transition-all duration-300 border border-blue-200/30 dark:border-blue-800/30 hover:border-blue-300 dark:hover:border-blue-700">
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-200/50 to-blue-100/30 dark:from-blue-900/40 dark:to-blue-900/20 shadow-lg">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                Guests
              </p>
              <p className="text-xl font-playfair font-bold text-gray-800 dark:text-white mt-1">
                {booking.guests} Adult{booking.guests > 1 ? "s" : ""} {booking.children > 0 && `+ ${booking.children} Child${booking.children > 1 ? "ren" : ""}`}
              </p>
            </div>
          </motion.div>

          {/* Duration */}
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-0 dark:from-purple-900/20 dark:to-purple-900/5 hover:from-purple-100 hover:to-purple-50 transition-all duration-300 border border-purple-200/30 dark:border-purple-800/30 hover:border-purple-300 dark:hover:border-purple-700">
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-200/50 to-purple-100/30 dark:from-purple-900/40 dark:to-purple-900/20 shadow-lg">
              <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                Stay Duration
              </p>
              <p className="text-xl font-playfair font-bold text-gray-800 dark:text-white mt-1">
                {booking.nights} Night{booking.nights > 1 ? "s" : ""}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Elegant Divider */}
        <div className="h-px bg-gradient-to-r from-accent-gold/20 via-accent-gold/40 to-accent-gold/20 mb-8" />

        {/* Pricing Section - Premium */}
        <motion.div whileHover={{ scale: 1.01 }} className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-900/60 dark:to-slate-800/60 border-2 border-accent-gold/30 hover:border-accent-gold/50 backdrop-blur-sm shadow-lg transition-all duration-300 relative overflow-hidden group">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/0 via-accent-gold/5 to-accent-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-2">
                💰 Price per Night
              </p>
              <p className="text-4xl font-playfair font-bold text-accent-gold drop-shadow-lg">
                ${booking.price.toFixed(2)}
              </p>
            </div>
            <div className="text-3xl opacity-10">×{booking.nights}</div>
            <div className="text-right">
              <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-2">
                💎 Total Amount
              </p>
              <p className="text-4xl font-playfair font-bold text-primary-green dark:text-accent-gold drop-shadow-lg">
                ${booking.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Guest/Host Contact Info - Premium */}
        {isHost && (
          <>
            <div className="h-px bg-gradient-to-r from-accent-gold/20 via-accent-gold/40 to-accent-gold/20 mb-8" />
            <motion.div whileHover={{ scale: 1.01 }} className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 to-blue-100/40 dark:from-blue-900/30 dark:to-blue-900/10 border-2 border-blue-300/40 dark:border-blue-700/40 hover:border-blue-400 dark:hover:border-blue-600 backdrop-blur-sm shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-blue-400/0 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <h4 className="font-playfair font-bold text-lg text-gray-800 dark:text-white mb-4 flex items-center gap-3 relative z-10">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                Guest Information
              </h4>
              <div className="space-y-3 relative z-10">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold text-gray-900 dark:text-white">Name:</span> {booking.guestName}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <a href={`mailto:${booking.email}`} className="hover:text-accent-gold transition-colors">
                    {booking.email}
                  </a>
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <a href={`tel:${booking.phone}`} className="hover:text-accent-gold transition-colors">
                    {booking.phone}
                  </a>
                </p>
                {booking.specialRequests && (
                  <div className="pt-3 border-t border-blue-300/50 dark:border-blue-700/50">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-bold text-gray-900 dark:text-white">✨ Special Requests:</span> {booking.specialRequests}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}

        {/* Special Requests (Customer View) */}
        {!isHost && booking.specialRequests && (
          <>
            <div className="h-px bg-gradient-to-r from-accent-gold/20 via-accent-gold/40 to-accent-gold/20 mb-8" />
            <motion.div whileHover={{ scale: 1.01 }} className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-amber-50/80 to-amber-100/40 dark:from-amber-900/30 dark:to-amber-900/10 border-2 border-amber-300/40 dark:border-amber-700/40 hover:border-amber-400 dark:hover:border-amber-600 backdrop-blur-sm shadow-lg transition-all duration-300">
              <p className="text-sm text-amber-900 dark:text-amber-200">
                <span className="font-bold">✨ Special Requests:</span> {booking.specialRequests}
              </p>
            </motion.div>
          </>
        )}

        {/* Actions - Enhanced Buttons */}
        <div className="h-px bg-gradient-to-r from-accent-gold/20 via-accent-gold/40 to-accent-gold/20 mb-8" />
        <div className="flex flex-col sm:flex-row gap-4">
          {isHost ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-accent-gold to-accent-gold/90 hover:from-accent-gold/95 hover:to-accent-gold/85 text-white font-bold shadow-xl hover:shadow-2xl hover:shadow-accent-gold/30 transition-all duration-300 group"
              >
                <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
                View Details
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-primary-green to-primary-green/90 hover:from-primary-green/95 hover:to-primary-green/85 text-white font-bold shadow-xl hover:shadow-2xl hover:shadow-primary-green/30 transition-all duration-300 group"
              >
                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Message Guest
              </motion.button>
              {booking.status === "confirmed" && (
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 border-red-500/60 hover:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold transition-all duration-300 group shadow-lg hover:shadow-xl"
                >
                  <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Cancel Booking
                </motion.button>
              )}
            </>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-accent-gold to-accent-gold/90 hover:from-accent-gold/95 hover:to-accent-gold/85 text-white font-bold shadow-xl hover:shadow-2xl hover:shadow-accent-gold/30 transition-all duration-300 group"
              >
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Download Invoice
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              {isUpcoming && booking.status === "confirmed" && (
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 border-red-500/60 hover:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold transition-all duration-300 group shadow-lg hover:shadow-xl"
                >
                  <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Cancel Booking
                </motion.button>
              )}
            </>
          )}
        </div>

        {/* Booking Meta Info */}
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-6 text-center font-medium">
          Booking #{booking.id} • Booked on{" "}
          {new Date(booking.bookingDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </motion.div>
  );
};

export default function BookingPage() {
  const { user, userRole } = useSelector((state: RootState) => state.auth);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<Booking["status"] | "all">("all");
  const isHost = userRole?.toLowerCase() === "host" || userRole?.toLowerCase() === "admin";

  // Mock data - Replace with API calls
  const mockBookings: Booking[] = [
    {
      id: 1001,
      guestName: "John Doe",
      hotelName: "Grand Palace Hotel",
      roomType: "Deluxe Suite",
      checkIn: "2025-02-10",
      checkOut: "2025-02-15",
      guests: 2,
      children: 1,
      price: 250,
      totalPrice: 1250,
      status: "confirmed",
      email: "john@example.com",
      phone: "+1-555-0123",
      specialRequests: "High floor, king bed preferred",
      bookingDate: "2025-01-15",
      nights: 5,
    },
    {
      id: 1002,
      guestName: "Jane Smith",
      hotelName: "Sunset Resort",
      roomType: "Ocean View Room",
      checkIn: "2025-03-01",
      checkOut: "2025-03-05",
      guests: 1,
      children: 0,
      price: 180,
      totalPrice: 720,
      status: "pending",
      email: "jane@example.com",
      phone: "+1-555-0456",
      bookingDate: "2025-01-20",
      nights: 4,
    },
    {
      id: 1003,
      guestName: "Robert Johnson",
      hotelName: "Mountain View Inn",
      roomType: "Family Room",
      checkIn: "2025-01-20",
      checkOut: "2025-01-25",
      guests: 4,
      children: 2,
      price: 320,
      totalPrice: 1600,
      status: "completed",
      email: "robert@example.com",
      phone: "+1-555-0789",
      specialRequests: "Crib needed for infant",
      bookingDate: "2024-12-10",
      nights: 5,
    },
    {
      id: 1004,
      guestName: "Sarah Williams",
      hotelName: "City Plaza Hotel",
      roomType: "Standard Room",
      checkIn: "2025-02-20",
      checkOut: "2025-02-22",
      guests: 1,
      children: 0,
      price: 120,
      totalPrice: 240,
      status: "cancelled",
      email: "sarah@example.com",
      phone: "+1-555-1011",
      bookingDate: "2025-01-25",
      nights: 2,
    },
  ];

  useEffect(() => {
    // TODO: Replace with actual API call
    // const fetchBookings = async () => {
    //   try {
    //     const response = await axios.post(
    //       `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/bookings/list`,
    //       { userId: user?.id, isHost },
    //       { headers: authHeader() }
    //     );
    //     setBookings(response.data.bookings);
    //   } catch (error) {
    //     console.error("Error fetching bookings:", error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchBookings();

    // Using mock data for now
    setTimeout(() => {
      setBookings(mockBookings);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredBookings =
    filterStatus === "all"
      ? bookings
      : bookings.filter((b) => b.status === filterStatus);

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    pending: bookings.filter((b) => b.status === "pending").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800/80 dark:to-slate-900">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-green/5 rounded-full blur-3xl opacity-40" />
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
            {isHost ? "📅 All Bookings" : "📖 My Bookings"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
            {isHost
              ? "Manage all guest bookings and reservations with premium control"
              : "View and manage your hotel reservations effortlessly"}
          </p>
        </motion.div>

        {/* Stats with Enhanced Design */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {[
            { label: "Total", value: stats.total, color: "from-slate-500 to-slate-700", icon: "📊" },
            {
              label: "Confirmed",
              value: stats.confirmed,
              color: "from-green-500 to-green-700",
              icon: "✅",
            },
            {
              label: "Pending",
              value: stats.pending,
              color: "from-amber-500 to-amber-700",
              icon: "⏳",
            },
            {
              label: "Completed",
              value: stats.completed,
              color: "from-blue-500 to-blue-700",
              icon: "🎉",
            },
            {
              label: "Cancelled",
              value: stats.cancelled,
              color: "from-red-500 to-red-700",
              icon: "❌",
            },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`rounded-2xl p-5 text-center bg-gradient-to-br ${stat.color} text-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 backdrop-blur-sm cursor-pointer group`}
            >
              <p className="text-2xl mb-2 group-hover:scale-125 transition-transform">{stat.icon}</p>
              <p className="text-xs font-bold opacity-90 uppercase tracking-wider">{stat.label}</p>
              <p className="text-4xl font-playfair font-bold mt-2 group-hover:scale-110 origin-center transition-transform">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters with Premium Styling */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-3 scrollbar-hide">
          {["all", "confirmed", "pending", "completed", "cancelled"].map((status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterStatus(status as Booking["status"] | "all")}
              className={`px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all duration-300 ${
                filterStatus === status
                  ? "bg-gradient-to-r from-accent-gold to-accent-gold/90 text-white shadow-lg shadow-accent-gold/30 scale-105"
                  : "bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-accent-gold/50 hover:bg-slate-50 dark:hover:bg-slate-700/50"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid gap-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="h-72 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-3xl animate-pulse shadow-xl"
              />
            ))}
          </div>
        )}

        {/* Bookings Grid */}
        {!isLoading && filteredBookings.length > 0 && (
          <div className="grid gap-6">
            {filteredBookings.map((booking, idx) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                isHost={isHost}
                delay={idx * 0.1}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredBookings.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-32 px-8"
          >
            <div className="inline-block p-6 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700 mb-6">
              <Calendar className="w-20 h-20 text-accent-gold mx-auto opacity-40" />
            </div>
            <h3 className="text-3xl font-playfair font-bold text-gray-700 dark:text-gray-300 mb-3">
              No bookings found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto">
              {filterStatus === "all"
                ? isHost
                  ? "Start by welcoming your first guests! Create amazing experiences."
                  : "Begin your journey by booking your first luxury stay."
                : `No ${filterStatus} bookings at this time.`}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
