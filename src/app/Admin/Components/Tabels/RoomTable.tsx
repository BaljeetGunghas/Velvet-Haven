"use client";

import React, { useState } from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import RoomDetailsModal from "../../room/Components/RoomDetailsModal";
import CreateUpdateRoom from "../../room/Components/CreateUpdateRoom";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

export interface RoomIF {
  _id: string;
  hostid: string;
  hotel_id: {
    _id: string;
    name: string;
  };
  room_number: number;
  room_type: string;
  price_per_night: number;
  max_occupancy: number;
  floor_number: number;
  bed_type: string;
  availability_status: string;
  amenities: string;
  smoking_allowed: boolean;
  description: string;
  rating: number;
  reviews: string[];
  check_in_time: string;
  check_out_time: string;
  room_images?: string[] | null;
  createdAt: string;
  updatedAt: string;
}

interface RoomTableProps {
  roomData: RoomIF[] | null;
  loading: boolean;
  handleRefress: () => void;
}

const getRoomTypeIcon = (type: string) => {
  const iconMap: Record<string, string> = {
    single: "🛏️",
    double: "🛌",
    suite: "👑",
    deluxe: "✨",
    family: "👨‍👩‍👧",
    standard: "🚪",
    executive: "💼",
  };
  return iconMap[type.toLowerCase()] || "🏠";
};

const RoomTable: React.FC<RoomTableProps> = ({
  roomData,
  loading,
  handleRefress,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomIF | null>(null);
  const [showDetailsModel, setShowDetailsModel] = useState<boolean>(false);
  const [iscreateRoomOpen, setIsCreateRoomOpen] = useState<boolean>(false);

  const onEdit = (room: RoomIF) => {
    setSelectedRoom(room);
    setIsCreateRoomOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return {
          bg: "rgba(34, 197, 94, 0.1)",
          text: "#16a34a",
          border: "#22c55e",
          light: "from-emerald-50 to-emerald-50/50",
          icon: "✓",
        };
      case "occupied":
        return {
          bg: "rgba(239, 68, 68, 0.1)",
          text: "#b91c1c",
          border: "#ef4444",
          light: "from-red-50 to-red-50/50",
          icon: "×",
        };
      case "maintenance":
        return {
          bg: "rgba(202, 138, 4, 0.1)",
          text: "#b45309",
          border: "#f59e0b",
          light: "from-amber-50 to-amber-50/50",
          icon: "⚙",
        };
      default:
        return {
          bg: "rgba(107, 114, 128, 0.1)",
          text: "#374151",
          border: "#d1d5db",
          light: "from-gray-50 to-gray-50/50",
          icon: "?",
        };
    }
  };

  return (
    <>
      <div className="rounded-3xl overflow-hidden shadow-lg border-2 border-slate-200/50 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            {/* Premium Table Header */}
            <thead className="bg-gradient-to-r from-primary-green via-primary-green/95 to-primary-green/90 dark:from-primary-green dark:via-primary-green/90 dark:to-primary-green/80 text-white border-b-4 border-accent-gold/30">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-widest">Room No.</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-widest hidden lg:table-cell">Hotel</th>
                <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-widest">Rating</th>
                <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-widest">Price/Night</th>
                <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-widest">Occupancy</th>
                <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-widest">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
              {loading || roomData === null ? (
                // Loading Skeleton
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-5 bg-gray-300 dark:bg-slate-600 rounded w-12"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-5 bg-gray-300 dark:bg-slate-600 rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="h-5 bg-gray-300 dark:bg-slate-600 rounded w-32"></div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="h-5 bg-gray-300 dark:bg-slate-600 rounded w-12 mx-auto"></div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="h-5 bg-gray-300 dark:bg-slate-600 rounded w-16 mx-auto"></div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="h-5 bg-gray-300 dark:bg-slate-600 rounded w-12 mx-auto"></div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="h-5 bg-gray-300 dark:bg-slate-600 rounded w-20 mx-auto"></div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <div className="h-8 w-8 bg-gray-300 dark:bg-slate-600 rounded-lg"></div>
                        <div className="h-8 w-8 bg-gray-300 dark:bg-slate-600 rounded-lg"></div>
                        <div className="h-8 w-8 bg-gray-300 dark:bg-slate-600 rounded-lg"></div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : roomData && roomData.length > 0 ? (
                // Table Rows
                roomData.map((room, idx) => {
                  const statusColor = getStatusColor(room.availability_status);
                  return (
                    <motion.tr
                      key={room._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-slate-100/30 dark:hover:from-slate-700/30 dark:hover:to-slate-700/20 transition-all duration-300"
                    >
                      {/* Room Number */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getRoomTypeIcon(room.room_type)}</span>
                          <div>
                            <p className="font-bold text-gray-900 dark:text-white text-lg">#{room.room_number}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Floor {room.floor_number}</p>
                          </div>
                        </div>
                      </td>

                      {/* Room Type */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-slate-100/60 dark:bg-slate-700/40 text-gray-700 dark:text-gray-300 capitalize">
                          {room.room_type}
                        </span>
                      </td>

                      {/* Hotel Name */}
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-xs cursor-help">
                              {room.hotel_id?.name || "—"}
                            </p>
                          </TooltipTrigger>
                          <TooltipContent
                            side="right"
                            sideOffset={5}
                            className="px-3 py-2 rounded-lg bg-gray-900 text-white text-xs dark:bg-slate-900 relative z-50"
                          >
                            {room.hotel_id?.name}
                          </TooltipContent>
                        </Tooltip>
                      </td>

                      {/* Rating */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="font-bold text-gray-900 dark:text-white">{room.rating}</span>
                          <span className="text-lg">⭐</span>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 text-center">
                        <p className="font-bold text-gray-900 dark:text-white">Rs {room.price_per_night?.toLocaleString()}</p>
                      </td>

                      {/* Occupancy */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-lg">👥</span>
                          <span className="font-bold text-gray-700 dark:text-gray-300">{room.max_occupancy}</span>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4 text-center">
                        <span
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm border-2"
                          style={{
                            backgroundColor: statusColor.bg,
                            color: statusColor.text,
                            borderColor: statusColor.border,
                          }}
                        >
                          <span className="text-base">{statusColor.icon}</span>
                          {room.availability_status?.charAt(0).toUpperCase() + room.availability_status?.slice(1)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {/* View */}
                          <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setSelectedRoom(room);
                              setShowDetailsModel(true);
                            }}
                            className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-all shadow-md hover:shadow-lg"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>

                          {/* Edit */}
                          <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onEdit(room)}
                            className="p-2.5 rounded-lg bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/60 transition-all shadow-md hover:shadow-lg"
                            title="Edit Room"
                          >
                            <Edit2 className="w-4 h-4" />
                          </motion.button>

                          {/* Delete */}
                          <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2.5 rounded-lg bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/60 transition-all shadow-md hover:shadow-lg"
                            title="Delete Room"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
                // Empty State
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <p className="text-gray-500 dark:text-gray-400 font-medium">No rooms found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Room Details Modal */}
      {showDetailsModel && selectedRoom && (
        <RoomDetailsModal
          room={selectedRoom}
          isOpen={showDetailsModel}
          onClose={setShowDetailsModel}
        />
      )}

      {/* Create/Update Room Modal */}
      {iscreateRoomOpen && selectedRoom?._id && (
        <CreateUpdateRoom
          onClose={() => {
            setIsCreateRoomOpen(false);
            setSelectedRoom(null);
          }}
          handleRefress={handleRefress}
          selectedRoomId={selectedRoom._id}
        />
      )}
    </>
  );
};

export default RoomTable;
