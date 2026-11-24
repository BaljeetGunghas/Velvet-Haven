"use client";

import { authHeader } from "@/app/Auth/AuthHeader/authHeader";
import { useHandleLogout } from "@/Hooks/handleLogout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RoomTable, { RoomIF } from "../Components/Tabels/RoomTable";
import { RefreshCcw, Plus, Search, Filter, DoorOpen, TrendingUp, AlertCircle } from "lucide-react";
import CreateUpdateRoom from "./Components/CreateUpdateRoom";
import { motion } from "framer-motion";

const AdminRoomPage = () => {
  const [rooms, setRooms] = useState<RoomIF[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<RoomIF[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [iscreateRoomOpen, setIsCreateRoomOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "available" | "occupied" | "maintenance">("all");
  const handleLogout = useHandleLogout();

  const fetchRoom = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel-room/get-host-all-room`,
        {},
        {
          headers: authHeader(),
        }
      );
      const responseData = response.data;
      if (responseData.output > 0) {
        setRooms(responseData.jsonResponse);
        setFilteredRooms(responseData.jsonResponse);
      } else if (responseData.output === -401) {
        alert("Session Expired! Please login again.");
        return handleLogout();
      } else {
        setRooms([]);
        setFilteredRooms([]);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setRooms([]);
      setFilteredRooms([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  // Filter rooms based on search and status
  useEffect(() => {
    let filtered = rooms.filter((room) =>
      room.room_number?.toString().includes(searchTerm) ||
      room.room_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.hotel_id?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterStatus !== "all") {
      filtered = filtered.filter((room) => room.availability_status === filterStatus);
    }

    setFilteredRooms(filtered);
  }, [searchTerm, filterStatus, rooms]);

  // Calculate statistics
  const stats = {
    total: rooms.length,
    available: rooms.filter((r) => r.availability_status === "available").length,
    occupied: rooms.filter((r) => r.availability_status === "occupied").length,
    maintenance: rooms.filter((r) => r.availability_status === "maintenance").length,
    avgRating: (rooms.reduce((sum, r) => sum + (r.rating || 0), 0) / rooms.length).toFixed(1),
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800/80 dark:to-slate-900">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/3 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-green/3 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-8 relative z-10">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary-green/20 to-primary-green/10 dark:from-primary-green/15 dark:to-primary-green/5">
              <DoorOpen className="w-8 h-8 text-primary-green" />
            </div>
            <div>
              <h1 className="text-4xl font-playfair font-bold text-gray-900 dark:text-white">
                Room Management
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage all your hotel rooms and availability</p>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {/* Total Rooms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-100/80 via-slate-50/60 to-white dark:from-slate-700/60 dark:via-slate-700/40 dark:to-slate-800/30 border-2 border-slate-300/40 dark:border-slate-600/40 shadow-md hover:shadow-lg transition-shadow"
            >
              <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-3">Total Rooms</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </motion.div>

            {/* Available Rooms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-emerald-100/80 via-emerald-50/60 to-white dark:from-emerald-950/40 dark:via-emerald-950/30 dark:to-slate-800/30 border-2 border-emerald-300/40 dark:border-emerald-700/40 shadow-md hover:shadow-lg transition-shadow"
            >
              <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-3">Available</p>
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stats.available}</p>
            </motion.div>

            {/* Occupied Rooms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-red-100/80 via-red-50/60 to-white dark:from-red-950/40 dark:via-red-950/30 dark:to-slate-800/30 border-2 border-red-300/40 dark:border-red-700/40 shadow-md hover:shadow-lg transition-shadow"
            >
              <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-3">Occupied</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.occupied}</p>
            </motion.div>

            {/* Maintenance Rooms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-amber-100/80 via-amber-50/60 to-white dark:from-amber-950/40 dark:via-amber-950/30 dark:to-slate-800/30 border-2 border-amber-300/40 dark:border-amber-700/40 shadow-md hover:shadow-lg transition-shadow"
            >
              <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-3">Maintenance</p>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{stats.maintenance}</p>
            </motion.div>

            {/* Avg Rating */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-100/80 via-blue-50/60 to-white dark:from-blue-950/40 dark:via-blue-950/30 dark:to-slate-800/30 border-2 border-blue-300/40 dark:border-blue-700/40 shadow-md hover:shadow-lg transition-shadow"
            >
              <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-3">Avg Rating</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.avgRating} ⭐</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 p-6 rounded-2xl bg-white dark:bg-slate-800/50 border-2 border-slate-200/50 dark:border-slate-700/50 shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
                <input
                  type="text"
                  placeholder="Search room number, type, or hotel..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-accent-gold transition-colors"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white focus:outline-none focus:border-accent-gold transition-colors"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fetchRoom()}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600 hover:from-slate-300 hover:to-slate-200 dark:hover:from-slate-600 dark:hover:to-slate-500 text-gray-700 dark:text-gray-200 font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <RefreshCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreateRoomOpen(true)}
                className="flex items-center gap-2 px-6 py-4 rounded-lg bg-gradient-to-r from-accent-gold/80 to-accent-gold/60 hover:from-accent-gold hover:to-accent-gold/80 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                <span>Create Room</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Rooms Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {!loading && filteredRooms.length === 0 && rooms.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-24"
            >
              <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-slate-100/60 to-slate-100/30 dark:from-slate-800/60 dark:to-slate-800/30 border-2 border-slate-200/50 dark:border-slate-700/50 mb-8">
                <DoorOpen className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600" />
              </div>
              <h3 className="text-2xl font-playfair font-bold text-gray-700 dark:text-gray-300 mb-2">
                No rooms yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Get started by creating your first room</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreateRoomOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-accent-gold/80 to-accent-gold/60 hover:from-accent-gold hover:to-accent-gold/80 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                Create Your First Room
              </motion.button>
            </motion.div>
          ) : !loading && filteredRooms.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 p-8 rounded-2xl bg-gradient-to-br from-slate-100/60 to-slate-100/30 dark:from-slate-800/60 dark:to-slate-800/30 border-2 border-slate-200/50 dark:border-slate-700/50"
            >
              <AlertCircle className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-3" />
              <p className="text-gray-600 dark:text-gray-400 font-medium">No rooms found matching your search</p>
            </motion.div>
          ) : (
            <RoomTable
              roomData={filteredRooms}
              loading={loading}
              handleRefress={fetchRoom}
            />
          )}
        </motion.div>
      </div>

      {/* Create/Update Room Modal */}
      {iscreateRoomOpen && (
        <CreateUpdateRoom
          onClose={() => setIsCreateRoomOpen(false)}
          handleRefress={fetchRoom}
        />
      )}
    </div>
  );
};

export default AdminRoomPage;
