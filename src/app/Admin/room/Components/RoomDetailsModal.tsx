"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { RoomIF } from "../../Components/Tabels/RoomTable";
import { X, DoorOpen, MapPin, Users, DollarSign, Calendar, Wifi, Cigarette, FileText } from "lucide-react";

interface RoomDetailsModalProps {
  room: RoomIF | null;
  isOpen: boolean;
  onClose: (val: boolean) => void;
}

const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({
  room,
  isOpen,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!room || !isOpen) return null;

  if (!mounted) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return { bg: "rgba(34, 197, 94, 0.1)", text: "#16a34a", border: "#22c55e" };
      case "occupied":
        return { bg: "rgba(239, 68, 68, 0.1)", text: "#b91c1c", border: "#ef4444" };
      case "maintenance":
        return { bg: "rgba(202, 138, 4, 0.1)", text: "#b45309", border: "#f59e0b" };
      default:
        return { bg: "rgba(107, 114, 128, 0.1)", text: "#374151", border: "#d1d5db" };
    }
  };

  const statusColor = getStatusColor(room.availability_status);

  const portal = document.getElementById("modal-root");
  if (!portal) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex justify-center items-center bg-black/70 z-[9999] p-4"
      onClick={() => onClose(false)}
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
              <DoorOpen className="w-8 h-8 text-accent-gold" />
            </div>
            <div className="min-w-0">
              <h2 className="text-3xl font-playfair font-bold text-white drop-shadow-lg truncate">
                Room #{room.room_number}
              </h2>
              <div className="flex items-center gap-2 text-white/90 mt-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <p className="text-sm font-medium truncate">{room.hotel_id?.name || "Hotel"}</p>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onClose(false)}
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

        {/* Content */}
        <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Room Type */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-100/85 via-slate-50/65 to-white dark:from-slate-700/70 dark:via-slate-700/55 dark:to-slate-800/35 border-2 border-slate-300/45 dark:border-slate-600/55 hover:border-accent-gold/70 transition-all shadow-md"
            >
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-3">Room Type</label>
              <p className="text-lg font-bold text-gray-900 dark:text-white capitalize">{room.room_type}</p>
            </motion.div>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-100/80 via-blue-50/60 to-white dark:from-blue-950/45 dark:via-blue-950/35 dark:to-slate-800/35 border-2 border-blue-300/45 dark:border-blue-800/50 hover:border-accent-gold/70 transition-all shadow-md"
            >
              <div className="flex items-start gap-2 mb-3">
                <div className="p-2 rounded-lg bg-blue-200/35 dark:bg-blue-900/35 flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                </div>
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Price/Night</label>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">Rs {room.price_per_night?.toLocaleString()}</p>
            </motion.div>

            {/* Max Occupancy */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-emerald-100/80 via-emerald-50/60 to-white dark:from-emerald-950/45 dark:via-emerald-950/35 dark:to-slate-800/35 border-2 border-emerald-300/45 dark:border-emerald-800/50 hover:border-accent-gold/70 transition-all shadow-md"
            >
              <div className="flex items-start gap-2 mb-3">
                <div className="p-2 rounded-lg bg-emerald-200/35 dark:bg-emerald-900/35 flex-shrink-0">
                  <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />
                </div>
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Max Occupancy</label>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{room.max_occupancy} Guests</p>
            </motion.div>

            {/* Status */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-purple-100/80 via-purple-50/60 to-white dark:from-purple-950/45 dark:via-purple-950/35 dark:to-slate-800/35 border-2 border-purple-300/45 dark:border-purple-800/50 hover:border-accent-gold/70 transition-all shadow-md"
            >
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-4">Status</label>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
                style={{
                  backgroundColor: statusColor.bg,
                  color: statusColor.text,
                  border: `2px solid ${statusColor.border}`,
                }}
              >
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColor.border }} />
                {room.availability_status?.charAt(0).toUpperCase() + room.availability_status?.slice(1)}
              </div>
            </motion.div>
          </div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-playfair font-bold text-primary-green dark:text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-accent-gold rounded-full" />
              Room Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Floor Number */}
              <div className="p-5 rounded-xl bg-slate-50/80 dark:bg-slate-700/40 border-2 border-slate-200/50 dark:border-slate-700/50">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Floor Number</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">Floor {room.floor_number}</p>
              </div>

              {/* Bed Type */}
              <div className="p-5 rounded-xl bg-slate-50/80 dark:bg-slate-700/40 border-2 border-slate-200/50 dark:border-slate-700/50">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Bed Type</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white capitalize">{room.bed_type}</p>
              </div>

              {/* Check-in Time */}
              <div className="p-5 rounded-xl bg-slate-50/80 dark:bg-slate-700/40 border-2 border-slate-200/50 dark:border-slate-700/50">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Check-in
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{room.check_in_time}</p>
              </div>

              {/* Check-out Time */}
              <div className="p-5 rounded-xl bg-slate-50/80 dark:bg-slate-700/40 border-2 border-slate-200/50 dark:border-slate-700/50">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Check-out
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{room.check_out_time}</p>
              </div>

              {/* Smoking Policy */}
              <div className="p-5 rounded-xl bg-slate-50/80 dark:bg-slate-700/40 border-2 border-slate-200/50 dark:border-slate-700/50">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Cigarette className="w-4 h-4" /> Smoking
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {room.smoking_allowed ? "✓ Allowed" : "✗ Not Allowed"}
                </p>
              </div>

              {/* Rating */}
              <div className="p-5 rounded-xl bg-slate-50/80 dark:bg-slate-700/40 border-2 border-slate-200/50 dark:border-slate-700/50">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Rating</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{room.rating || "0"} ⭐</p>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          {room.description && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-playfair font-bold text-primary-green dark:text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-accent-gold rounded-full" />
                Description
              </h3>
              <div className="p-6 rounded-2xl bg-white/70 dark:bg-slate-800/50 border-2 border-slate-200/50 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 transition-all shadow-sm">
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{room.description}</p>
              </div>
            </motion.div>
          )}

          {/* Room Images */}
          {room?.room_images && room?.room_images?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-playfair font-bold text-primary-green dark:text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-accent-gold rounded-full" />
                Room Images
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {room.room_images.map((img, index) => {
                  const imageUrl = img?.startsWith('http') || img?.startsWith('/')
                    ? img
                    : `${process.env.NEXT_PUBLIC_IMAGE_URL}/${img}`;

                  return (
                    <motion.div
                      key={`room-img-${index}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="relative h-48 rounded-2xl overflow-hidden border-2 border-slate-200/50 dark:border-slate-700/50 hover:border-accent-gold/50 transition-all group"
                    >
                      <Image
                        src={imageUrl}
                        alt={`Room Image ${index}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          console.error(`Failed to load image: ${imageUrl}`);
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Close Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex justify-end pt-6 border-t-2 border-slate-200/40 dark:border-slate-700/40"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onClose(false)}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent-gold/90 to-accent-gold/70 hover:from-accent-gold hover:to-accent-gold/90 text-white font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Close
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>,
    portal
  );
};

export default RoomDetailsModal;
