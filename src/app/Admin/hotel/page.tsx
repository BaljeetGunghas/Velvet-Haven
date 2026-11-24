"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { authHeader } from "@/app/Auth/AuthHeader/authHeader";
import HotelTable, { HotelIF } from "../Components/Tabels/HotelTabel";
import CreateUpdateHotel from "./Components/CreateUpdateHotel";
import { RefreshCcw, Plus, Search, Filter, Eye, Edit, Trash2, MapPin, Star, Users, DollarSign, AlertCircle, Building2, Mail, Phone, X, FileText, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useHandleLogout } from "@/Hooks/handleLogout";
import ButtonLoading from "@/components/Loading/ButtonLoading";

const AdminHotelPage = () => {
  const [mounted, setMounted] = useState(false);
  const [hotels, setHotels] = useState<HotelIF[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<HotelIF[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [iscreateHotelOpen, setIsCreateHotelOpen] = useState<boolean>(false);
  const [selectedHotelId, setSelectedHotelId] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; hotelId?: string; hotelName?: string }>({ isOpen: false });
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewHotel, setViewHotel] = useState<HotelIF | null>(null);
  const [isViewingHotel, setIsViewingHotel] = useState(false);
  const handleLogout = useHandleLogout();

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel/get-host-hotelList`,
        {},
        {
          headers: authHeader(),
        }
      );
      const responseData = response.data;
      if (responseData.output > 0) {
        setHotels(responseData.jsonResponse);
        setFilteredHotels(responseData.jsonResponse);
      } else if (responseData.output === -401) {
        alert("Session Expired! Please login again.");
        return handleLogout();
      } else {
        setHotels([]);
        setFilteredHotels([]);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setHotels([]);
      setFilteredHotels([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let filtered = hotels.filter((hotel) =>
      hotel.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.address?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterStatus !== "all") {
      filtered = filtered.filter((hotel) => hotel.status === filterStatus);
    }

    setFilteredHotels(filtered);
  }, [searchTerm, filterStatus, hotels]);

  const stats = {
    total: hotels.length,
    active: hotels.filter((h) => h.status === "active").length,
    inactive: hotels.filter((h) => h.status === "inactive").length,
  };

  // Handle Edit
  const handleEdit = (hotelId: string) => {
    setSelectedHotelId(hotelId);
    setIsCreateHotelOpen(true);
  };

  // Handle View
  const handleView = async (hotelId: string) => {
    setIsViewingHotel(true);
    try {
      const hotel = hotels.find((h) => h._id === hotelId);
      if (hotel) {
        setViewHotel(hotel);
      }
    } catch (error) {
      console.error("Error fetching hotel details:", error);
      toast.error("Failed to load hotel details");
    } finally {
      setIsViewingHotel(false);
    }
  };

  // Handle Delete
  const handleDeleteClick = (hotelId: string, hotelName: string) => {
    setDeleteConfirm({ isOpen: true, hotelId, hotelName });
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!deleteConfirm.hotelId) return;

    setIsDeleting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel/delete-hotel`,
        { hotelId: deleteConfirm.hotelId },
        {
          headers: authHeader(),
        }
      );

      if (response.data.output === 1) {
        toast.success(response.data.message || "Hotel deleted successfully");
        fetchHotels();
        setDeleteConfirm({ isOpen: false });
      } else if (response.data.output === -401) {
        handleLogout();
      } else {
        toast.error(response.data.message || "Failed to delete hotel");
      }
    } catch (error) {
      console.error("Error deleting hotel:", error);
      toast.error("Error deleting hotel");
    } finally {
      setIsDeleting(false);
    }
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-playfair font-bold text-primary-green dark:text-white mb-3">
                Hotel Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg font-light">
                Manage your hotel properties and operations
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fetchHotels()}
                className="flex items-center gap-2 px-6 py-4 rounded-lg bg-gradient-to-r from-slate-200/80 to-slate-200/60 dark:from-slate-700/80 dark:to-slate-700/60 hover:from-slate-300 hover:to-slate-300 dark:hover:from-slate-600 dark:hover:to-slate-600 text-gray-700 dark:text-gray-200 font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <RefreshCcw className="w-5 h-5" />
                <span className="hidden sm:inline">Refresh</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreateHotelOpen(true)}
                className="flex items-center gap-2 px-6 py-4 rounded-lg bg-gradient-to-r from-accent-gold/80 to-accent-gold/60 hover:from-accent-gold hover:to-accent-gold/80 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                <span>Create Hotel</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        {hotels.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { label: "Total Hotels", value: stats.total, icon: "🏨", color: "from-blue-50/60 to-blue-50/30 dark:from-blue-950/40 dark:to-blue-950/20", border: "border-blue-200/40 dark:border-blue-900/40" },
              { label: "Active", value: stats.active, icon: "✅", color: "from-emerald-50/60 to-emerald-50/30 dark:from-emerald-950/40 dark:to-emerald-950/20", border: "border-emerald-200/40 dark:border-emerald-900/40" },
              { label: "Inactive", value: stats.inactive, icon: "⏸️", color: "from-amber-50/60 to-amber-50/30 dark:from-amber-950/40 dark:to-amber-950/20", border: "border-amber-200/40 dark:border-amber-900/40" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className={`rounded-xl p-6 bg-gradient-to-br ${stat.color} border-2 ${stat.border} shadow-md hover:shadow-lg transition-all duration-300`}
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
        {hotels.length > 0 && (
          <div className="mb-10 flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by hotel name or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-3 rounded-lg bg-white dark:bg-slate-800 border-2 border-slate-200/50 dark:border-slate-700/50 hover:border-accent-gold/30 focus:border-accent-gold/60 focus:outline-none transition-all duration-300 text-gray-800 dark:text-white placeholder-gray-400 text-sm font-medium"
              />
            </div>

            {/* Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-6 py-3 rounded-lg bg-white dark:bg-slate-800 border-2 border-slate-200/50 dark:border-slate-700/50 hover:border-accent-gold/30 focus:border-accent-gold/60 focus:outline-none transition-all duration-300 text-gray-700 dark:text-gray-300 font-semibold cursor-pointer text-sm"
            >
              <option value="all">All Hotels</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 gap-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="h-20 bg-gradient-to-r from-slate-200/50 to-slate-300/50 dark:from-slate-700/50 dark:to-slate-800/50 rounded-xl animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Hotel List */}
        {!loading && filteredHotels.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden border-2 border-slate-200/50 dark:border-slate-700/50 bg-white dark:bg-slate-800/80 backdrop-blur-sm shadow-lg"
          >
            {/* Table Header */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-50/80 to-slate-100/60 dark:from-slate-900/60 dark:to-slate-900/40 border-b-2 border-slate-200/50 dark:border-slate-700/50">
                    <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Hotel Name
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Owner
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Rooms
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Updated
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHotels.map((hotel, idx) => (
                    <motion.tr
                      key={hotel._id || idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-gradient-to-r hover:from-accent-gold/5 hover:to-primary-green/5 dark:hover:from-accent-gold/10 dark:hover:to-primary-green/10 transition-all duration-300 group"
                    >
                      {/* Hotel Name */}
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900 dark:text-white group-hover:text-accent-gold transition-colors">
                          {hotel.name}
                        </div>
                      </td>

                      {/* Owner */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {hotel.owner || "—"}
                        </span>
                      </td>

                      {/* Address */}
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                          <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent-gold" />
                          <span className="line-clamp-1">{hotel.address || "—"}</span>
                        </div>
                      </td>

                      {/* Rating */}
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-50/60 dark:bg-yellow-950/30 border border-yellow-200/50 dark:border-yellow-800/50">
                          <Star className="w-4 h-4 fill-accent-gold text-accent-gold" />
                          <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                            {hotel.rating || "0"}
                          </span>
                        </div>
                      </td>

                      {/* Rooms */}
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-800/50">
                          <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                            {hotel.rooms || "0"}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${
                            hotel.status === "active"
                              ? "bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200/50 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300"
                              : "bg-amber-50/60 dark:bg-amber-950/30 border-amber-200/50 dark:border-amber-800/50 text-amber-700 dark:text-amber-300"
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${hotel.status === "active" ? "bg-emerald-600 dark:bg-emerald-400" : "bg-amber-600 dark:bg-amber-400"}`} />
                          {hotel.status?.charAt(0).toUpperCase() + hotel.status?.slice(1)}
                        </div>
                      </td>

                      {/* Updated */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <div>{new Date(hotel.updatedAt).toLocaleDateString()}</div>
                          <div className="text-xs opacity-75">
                            {new Date(hotel.updatedAt).toLocaleTimeString()}
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleView(hotel._id || "")}
                            className="p-2 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 hover:bg-blue-100/80 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition-all shadow-md hover:shadow-lg"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEdit(hotel._id || "")}
                            className="p-2 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 hover:bg-amber-100/80 dark:hover:bg-amber-900/50 text-amber-600 dark:text-amber-400 transition-all shadow-md hover:shadow-lg"
                            title="Edit Hotel"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteClick(hotel._id || "", hotel.name || "Hotel")}
                            className="p-2 rounded-lg bg-red-50/60 dark:bg-red-950/30 hover:bg-red-100/80 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 transition-all shadow-md hover:shadow-lg"
                            title="Delete Hotel"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && hotels.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-32"
          >
            <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-slate-100/60 to-slate-100/30 dark:from-slate-800/60 dark:to-slate-800/30 border-2 border-slate-200/50 dark:border-slate-700/50 mb-8">
              <div className="text-6xl mb-4">🏨</div>
            </div>
            <h3 className="text-3xl font-playfair font-bold text-gray-700 dark:text-gray-300 mb-3">
              No hotels yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Get started by creating your first hotel property. Click the "Create Hotel" button to add your property to the system.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreateHotelOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-gradient-to-r from-accent-gold/80 to-accent-gold/60 hover:from-accent-gold hover:to-accent-gold/80 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              <span>Create Your First Hotel</span>
            </motion.button>
          </motion.div>
        )}

        {/* No Results State */}
        {!loading && hotels.length > 0 && filteredHotels.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No hotels found matching your search criteria
            </p>
          </motion.div>
        )}
      </div>

      {/* Create/Update Hotel Modal */}
      {iscreateHotelOpen && (
        <CreateUpdateHotel
          onClose={() => {
            setIsCreateHotelOpen(false);
            setSelectedHotelId(undefined);
          }}
          handleRefress={fetchHotels}
          selectedHotelId={selectedHotelId}
        />
      )}

      {/* View Hotel Details Modal */}
      {viewHotel && mounted && (() => {
        const portal = document.getElementById("modal-root");
        return portal ? createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex justify-center items-center bg-black/70 z-[9999] p-4"
            onClick={() => setViewHotel(null)}
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              willChange: "backdrop-filter"
            }}
          >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 shadow-2xl rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Premium Header with Gradient */}
            <div className="bg-gradient-to-r from-primary-green via-primary-green/95 to-primary-green/90 dark:from-primary-green dark:via-primary-green/90 dark:to-primary-green/80 p-8 sticky top-0 z-10 flex items-center justify-between border-b-4 border-accent-gold/50">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="p-3 rounded-xl bg-accent-gold/25 backdrop-blur-sm flex-shrink-0">
                  <Building2 className="w-8 h-8 text-accent-gold" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-3xl font-playfair font-bold text-white drop-shadow-lg truncate">
                    {viewHotel.name}
                  </h2>
                  <div className="flex items-center gap-2 text-white/90 mt-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <p className="text-sm font-medium truncate">{viewHotel.city || "Location"}</p>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setViewHotel(null)}
                className="p-3 hover:bg-white/20 rounded-full transition-all backdrop-blur-sm flex-shrink-0"
                title="Close"
              >
                <X
                  className="w-6 h-6 flex-shrink-0"
                  style={{
                    color: "#FFFFFF",
                    textShadow: "0 0 2px rgba(0,0,0,0.8)",
                    filter: "drop-shadow(0 0 3px rgba(0,0,0,0.6))"
                  }}
                />
              </motion.button>
            </div>

            {/* Content with Premium Styling */}
            <div className="p-8 space-y-8">
              {/* Quick Info Cards - Premium Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Owner */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 16px 32px rgba(0,0,0,0.12)" }}
                  className="p-7 rounded-2xl bg-gradient-to-br from-slate-100/85 via-slate-50/65 to-white dark:from-slate-700/70 dark:via-slate-700/55 dark:to-slate-800/35 border-2 border-slate-300/45 dark:border-slate-600/55 hover:border-accent-gold/70 transition-all duration-300 shadow-md"
                >
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-3">Owner</label>
                  <p className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                    {viewHotel.owner_name || "—"}
                  </p>
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  whileHover={{ y: -5, boxShadow: "0 16px 32px rgba(59,130,246,0.12)" }}
                  className="p-7 rounded-2xl bg-gradient-to-br from-blue-100/80 via-blue-50/60 to-white dark:from-blue-950/45 dark:via-blue-950/35 dark:to-slate-800/35 border-2 border-blue-300/45 dark:border-blue-800/50 hover:border-accent-gold/70 transition-all duration-300 shadow-md"
                >
                  <div className="flex items-start gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-blue-200/35 dark:bg-blue-900/35 flex-shrink-0">
                      <Mail className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                    </div>
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Email</label>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white break-all line-clamp-2 leading-snug">
                    {viewHotel.email || "—"}
                  </p>
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ y: -5, boxShadow: "0 16px 32px rgba(16,185,129,0.12)" }}
                  className="p-7 rounded-2xl bg-gradient-to-br from-emerald-100/80 via-emerald-50/60 to-white dark:from-emerald-950/45 dark:via-emerald-950/35 dark:to-slate-800/35 border-2 border-emerald-300/45 dark:border-emerald-800/50 hover:border-accent-gold/70 transition-all duration-300 shadow-md"
                >
                  <div className="flex items-start gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-emerald-200/35 dark:bg-emerald-900/35 flex-shrink-0">
                      <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />
                    </div>
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Phone</label>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {viewHotel.contact_number || "—"}
                  </p>
                </motion.div>

                {/* Rating */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  whileHover={{ y: -5, boxShadow: "0 16px 32px rgba(217,119,6,0.12)" }}
                  className="p-7 rounded-2xl bg-gradient-to-br from-amber-100/80 via-amber-50/60 to-white dark:from-amber-950/45 dark:via-amber-950/35 dark:to-slate-800/35 border-2 border-amber-300/45 dark:border-amber-800/50 hover:border-accent-gold/70 transition-all duration-300 shadow-md"
                >
                  <div className="flex items-start gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-amber-200/35 dark:bg-amber-900/35 flex-shrink-0">
                      <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                    </div>
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Rating</label>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {viewHotel.rating || "0"}
                  </p>
                  <p className="text-sm text-amber-600 dark:text-amber-400 font-medium mt-1">⭐ Rating</p>
                </motion.div>
              </div>

              {/* Secondary Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Status */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ y: -5, boxShadow: "0 16px 32px rgba(147,51,234,0.12)" }}
                  className="p-7 rounded-2xl bg-gradient-to-br from-purple-100/80 via-purple-50/60 to-white dark:from-purple-950/45 dark:via-purple-950/35 dark:to-slate-800/35 border-2 border-purple-300/45 dark:border-purple-800/50 hover:border-accent-gold/70 transition-all duration-300 shadow-md"
                >
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-4">
                    Status
                  </label>
                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-bold backdrop-blur-sm shadow-md"
                    style={{
                      backgroundColor: viewHotel.status === "active" ? "rgba(34, 197, 94, 0.18)" : "rgba(202, 138, 4, 0.18)",
                      color: viewHotel.status === "active" ? "#16a34a" : "#b45309",
                      border: `2px solid ${viewHotel.status === "active" ? "#22c55e" : "#f59e0b"}`,
                    }}
                  >
                    <span className="w-3.5 h-3.5 rounded-full"
                      style={{
                        backgroundColor: viewHotel.status === "active" ? "#22c55e" : "#f59e0b",
                      }}
                    />
                    {viewHotel.status?.charAt(0).toUpperCase() + viewHotel.status?.slice(1)}
                  </div>
                </motion.div>

                {/* Postal Code */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  whileHover={{ y: -5, boxShadow: "0 16px 32px rgba(79,70,229,0.12)" }}
                  className="p-7 rounded-2xl bg-gradient-to-br from-indigo-100/80 via-indigo-50/60 to-white dark:from-indigo-950/45 dark:via-indigo-950/35 dark:to-slate-800/35 border-2 border-indigo-300/45 dark:border-indigo-800/50 hover:border-accent-gold/70 transition-all duration-300 shadow-md"
                >
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-4">
                    Postal Code
                  </label>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {viewHotel.postal_code || "—"}
                  </p>
                </motion.div>
              </div>

              {/* Rooms Count - Full Width */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -5, boxShadow: "0 16px 32px rgba(217,119,6,0.12)" }}
                className="p-8 rounded-2xl bg-gradient-to-br from-orange-100/80 via-orange-50/60 to-white dark:from-orange-950/45 dark:via-orange-950/35 dark:to-slate-800/35 border-2 border-orange-300/45 dark:border-orange-800/50 hover:border-accent-gold/70 transition-all duration-300 shadow-md"
              >
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-lg bg-orange-200/35 dark:bg-orange-900/35">
                        <Users className="w-6 h-6 text-orange-600 dark:text-orange-300" />
                      </div>
                      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Total Rooms</label>
                    </div>
                    <p className="text-5xl font-bold text-gray-900 dark:text-white">
                      {viewHotel.rooms || "0"}
                    </p>
                  </div>
                  <div className="text-7xl opacity-25 group-hover:opacity-40 transition-opacity flex-shrink-0">🏨</div>
                </div>
              </motion.div>

              {/* Address */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                whileHover={{ boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
                className="p-8 rounded-2xl bg-gradient-to-br from-slate-100/70 via-slate-50/50 to-white dark:from-slate-700/50 dark:via-slate-700/40 dark:to-slate-800/30 border-2 border-accent-gold/35 hover:border-accent-gold/70 transition-all duration-300 shadow-md"
              >
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-accent-gold/20">
                    <MapPin className="w-5 h-5 text-accent-gold" />
                  </div>
                  Full Address
                </label>
                <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                  {viewHotel.address || "—"}
                </p>
              </motion.div>

              {/* Description */}
              {viewHotel.description && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <label className="text-lg font-playfair font-bold text-primary-green dark:text-white flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-accent-gold/20">
                      <FileText className="w-6 h-6 text-accent-gold" />
                    </div>
                    Description
                  </label>
                  <div className="p-7 rounded-2xl bg-gradient-to-br from-white/70 via-slate-50/50 to-white dark:from-slate-800/50 dark:via-slate-800/40 dark:to-slate-900/35 border-2 border-slate-200/45 dark:border-slate-700/45 hover:border-slate-300/60 dark:hover:border-slate-600/60 transition-all shadow-md">
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap font-medium">
                      {viewHotel.description}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Policies */}
              {viewHotel.policies && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="space-y-4"
                >
                  <label className="text-lg font-playfair font-bold text-primary-green dark:text-white flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-emerald-100/25 dark:bg-emerald-900/25">
                      <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
                    </div>
                    Hotel Policies
                  </label>
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {viewHotel.policies.split("\n").filter(p => p.trim()).map((policy, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.55 + idx * 0.04 }}
                        className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-emerald-50/70 via-emerald-50/50 to-emerald-50/30 dark:from-emerald-950/30 dark:via-emerald-950/20 dark:to-emerald-950/10 border-2 border-emerald-200/40 dark:border-emerald-800/40 hover:border-emerald-300/70 dark:hover:border-emerald-700/70 transition-all shadow-sm"
                      >
                        <div className="p-2 rounded-full bg-emerald-500/25 mt-0.5 flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium text-sm leading-relaxed">{policy}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Cancellation Policy */}
              {viewHotel.cancellation_policy && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  <label className="text-lg font-playfair font-bold text-primary-green dark:text-white flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-red-100/25 dark:bg-red-900/25">
                      <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-300" />
                    </div>
                    Cancellation Policy
                  </label>
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {viewHotel.cancellation_policy.split("\n").filter(p => p.trim()).map((policy, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + idx * 0.04 }}
                        className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-red-50/70 via-red-50/50 to-red-50/30 dark:from-red-950/30 dark:via-red-950/20 dark:to-red-950/10 border-2 border-red-200/40 dark:border-red-800/40 hover:border-red-300/70 dark:hover:border-red-700/70 transition-all shadow-sm"
                      >
                        <div className="p-2 rounded-full bg-red-500/25 mt-0.5 flex-shrink-0">
                          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-300" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium text-sm leading-relaxed">{policy}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Metadata */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="p-7 rounded-2xl bg-gradient-to-br from-slate-100/70 via-slate-50/50 to-white dark:from-slate-700/40 dark:via-slate-700/30 dark:to-slate-800/20 border-2 border-slate-200/45 dark:border-slate-700/45 hover:border-slate-300/60 dark:hover:border-slate-600/60 transition-all shadow-md"
              >
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-5">Timeline</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-2">Created Date</label>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {viewHotel.createdAt ? new Date(viewHotel.createdAt).toLocaleDateString() : "—"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {viewHotel.createdAt ? new Date(viewHotel.createdAt).toLocaleTimeString() : "—"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-2">Last Updated</label>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {viewHotel.updatedAt ? new Date(viewHotel.updatedAt).toLocaleDateString() : "—"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {viewHotel.updatedAt ? new Date(viewHotel.updatedAt).toLocaleTimeString() : "—"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Close Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex gap-4 justify-end pt-8 mt-4 border-t-2 border-slate-200/40 dark:border-slate-700/40"
              >
                <motion.button
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setViewHotel(null)}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent-gold/85 to-accent-gold/65 hover:from-accent-gold/95 hover:to-accent-gold/80 text-white font-bold shadow-lg hover:shadow-xl hover:shadow-accent-gold/50 transition-all duration-300"
                >
                  Close Details
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>,
        portal
        ) : null;
      })()}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-50 p-4"
          onClick={() => setDeleteConfirm({ isOpen: false })}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="relative bg-white dark:bg-slate-800 shadow-2xl rounded-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
              <h3 className="text-2xl font-playfair font-bold text-white flex items-center gap-3">
                <AlertCircle className="w-6 h-6" />
                Delete Hotel
              </h3>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Are you sure you want to delete <strong>{deleteConfirm.hotelName}</strong>? This action cannot be undone.
              </p>

              {/* Buttons */}
              <div className="flex gap-4 justify-end pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDeleteConfirm({ isOpen: false })}
                  disabled={isDeleting}
                  className="px-6 py-2 rounded-lg bg-slate-200/80 dark:bg-slate-700/80 hover:bg-slate-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 font-bold transition-all disabled:opacity-50"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isDeleting ? (
                    <>
                      <ButtonLoading />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Hotel</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminHotelPage;
