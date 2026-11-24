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
  Edit2,
  Trash2,
  MessageSquare,
} from "lucide-react";

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
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-700 dark:text-green-400",
      icon: CheckCircle,
    },
    pending: {
      bg: "bg-amber-100 dark:bg-amber-900/30",
      text: "text-amber-700 dark:text-amber-400",
      icon: Clock,
    },
    cancelled: {
      bg: "bg-red-100 dark:bg-red-900/30",
      text: "text-red-700 dark:text-red-400",
      icon: AlertCircle,
    },
    completed: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-700 dark:text-blue-400",
      icon: CheckCircle,
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
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
      whileHover={{ y: -5 }}
      className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      {/* Header Background */}
      <div className="h-1 bg-gradient-to-r from-accent-gold to-primary-green" />

      <div className="p-6 md:p-8">
        {/* Booking Info Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-primary-green dark:text-white mb-2">
              {booking.hotelName}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent-gold" />
              {booking.roomType}
            </p>
          </div>
          <StatusBadge status={booking.status} />
        </div>

        {/* Booking Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Check-in */}
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-accent-gold/10">
              <Calendar className="w-6 h-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Check-in
              </p>
              <p className="text-lg font-bold text-gray-800 dark:text-white">
                {new Date(booking.checkIn).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Check-out */}
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary-green/10">
              <Calendar className="w-6 h-6 text-primary-green" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Check-out
              </p>
              <p className="text-lg font-bold text-gray-800 dark:text-white">
                {new Date(booking.checkOut).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Guests */}
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Guests
              </p>
              <p className="text-lg font-bold text-gray-800 dark:text-white">
                {booking.guests} Adults {booking.children > 0 ? `+ ${booking.children} Children` : ""}
              </p>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Duration
              </p>
              <p className="text-lg font-bold text-gray-800 dark:text-white">
                {booking.nights} Night{booking.nights > 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
                Price per Night
              </p>
              <p className="text-2xl font-bold text-accent-gold">
                ${booking.price.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
                Total Amount
              </p>
              <p className="text-2xl font-bold text-primary-green dark:text-accent-gold">
                ${booking.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Guest/Host Contact Info */}
        {isHost && (
          <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Guest Information
            </h4>
            <div className="space-y-2">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Name:</span> {booking.guestName}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {booking.email}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {booking.phone}
              </p>
              {booking.specialRequests && (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Special Requests:</span> {booking.specialRequests}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Special Requests (Customer View) */}
        {!isHost && booking.specialRequests && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-900 dark:text-amber-200">
              <span className="font-semibold">Special Requests:</span> {booking.specialRequests}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          {isHost ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-accent-gold hover:bg-accent-gold/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Eye className="w-5 h-5" />
                View Details
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary-green hover:bg-primary-green/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <MessageSquare className="w-5 h-5" />
                Message Guest
              </motion.button>
              {booking.status === "confirmed" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold transition-all duration-300"
                >
                  <Trash2 className="w-5 h-5" />
                  Cancel
                </motion.button>
              )}
            </>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-accent-gold hover:bg-accent-gold/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                Download Invoice
              </motion.button>
              {isUpcoming && booking.status === "confirmed" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold transition-all duration-300"
                >
                  <Trash2 className="w-5 h-5" />
                  Cancel Booking
                </motion.button>
              )}
            </>
          )}
        </div>

        {/* Booking Date */}
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-4 text-center">
          Booking ID: #{booking.id} • Booked on{" "}
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
  const { user } = useSelector((state: RootState) => state.auth);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<Booking["status"] | "all">("all");
  const isHost = user?.userRole?.toLowerCase() === "host" || user?.userRole?.toLowerCase() === "admin";

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
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-primary-green dark:text-white mb-2">
            {isHost ? "📅 All Bookings" : "📖 My Bookings"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isHost
              ? "Manage all guest bookings and reservations"
              : "View and manage your hotel reservations"}
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, color: "from-slate-400 to-slate-600" },
            {
              label: "Confirmed",
              value: stats.confirmed,
              color: "from-green-400 to-green-600",
            },
            {
              label: "Pending",
              value: stats.pending,
              color: "from-amber-400 to-amber-600",
            },
            {
              label: "Completed",
              value: stats.completed,
              color: "from-blue-400 to-blue-600",
            },
            {
              label: "Cancelled",
              value: stats.cancelled,
              color: "from-red-400 to-red-600",
            },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-lg p-4 text-center bg-gradient-to-br ${stat.color} text-white shadow-lg`}
            >
              <p className="text-sm font-semibold opacity-90">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {["all", "confirmed", "pending", "completed", "cancelled"].map((status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterStatus(status as Booking["status"] | "all")}
              className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                filterStatus === status
                  ? "bg-accent-gold text-white shadow-lg"
                  : "bg-slate-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-slate-300 dark:hover:bg-slate-600"
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
              <div
                key={i}
                className="h-64 bg-gray-200 dark:bg-slate-700 rounded-2xl animate-pulse"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {filterStatus === "all"
                ? isHost
                  ? "You don't have any bookings yet."
                  : "You don't have any bookings yet."
                : `No ${filterStatus} bookings found.`}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
