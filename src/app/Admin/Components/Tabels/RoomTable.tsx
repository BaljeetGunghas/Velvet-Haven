"use client";

import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import dayjs from "dayjs";
import RoomDetailsModal from "../../room/Components/RoomDetailsModal";
import CreateUpdateRoom from "../../room/Components/CreateUpdateRoom";
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
  const onDelete = (room: RoomIF) => {
    console.log(room);
  };
  return (
    <>
      <div className="py-2 px-0 shadow-md rounded-lg dark:bg-foreground pt-0.5">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-lg rounded-lg min-w-[700px]">
            <thead className="bg-primaryblue dark:bg-bannerbg text-white">
              <tr>
                <th className="p-2 text-left">R No.</th>
                <th className="p-2 text-left hidden md:table-cell">Type</th>
                <th className="p-2 text-left hidden lg:table-cell">Hotel</th>
                <th className="p-2 text-center">Rating</th>
                <th className="p-2 text-center">Price</th>
                <th className="p-2 text-center">Availability</th>
                <th className="p-2 text-center hidden md:table-cell">
                  Created / Updated
                </th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading || roomData === null ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="border-b animate-pulse">
                    <td className="p-3">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </td>
                    <td className="p-3 hidden md:table-cell">
                      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </td>
                    <td className="p-3 hidden lg:table-cell">
                      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                    </td>
                    <td className="p-3 text-center hidden md:table-cell">
                      <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
                    </td>
                  </tr>
                ))
              ) : roomData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    No Rooms Found!
                  </td>
                </tr>
              ) : (
                roomData.map((room) => (
                  <tr
                    key={room._id}
                    className="border-b last:border-none dark:hover:bg-gray-900 hover:bg-slate-200 text-sm transition duration-300"
                  >
                    <td className="p-3 font-semibold">{room.room_number}</td>
                    <td className="p-3 hidden md:table-cell text-xs">
                      {room.room_type}
                    </td>
                    {room.hotel_id.name?.length > 22 ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <td className="p-3 text-xs font-semibold hidden lg:table-cell truncate max-w-[150px]">
                            {room.hotel_id.name}
                          </td>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          sideOffset={5}
                          className="p-2 rounded-xl bg-foreground text-white dark:bg-blue-950 text-xs dark:text-white relative z-100"
                        >
                          {room.hotel_id.name}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <td className="p-3 text-xs font-semibold hidden lg:table-cell">
                        {room.hotel_id.name}
                      </td>
                    )}
                     <td className="p-3 text-xs text-center">
                      {room?.rating} ⭐
                    </td>
                    <td className="p-3 text-xs text-center">
                      Rs{room.price_per_night}
                    </td>
                    <td
                      className={`p-3 text-xs text-center font-bold ${
                        room.availability_status === "available"
                          ? "text-green-600"
                          : room.availability_status === "occupied"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {room.availability_status === "available"
                        ? "Available"
                        : room.availability_status === "occupied"
                        ? "Occupied"
                        : "Under Maintenance"}
                    </td>
                    <td className="p-3 text-center hidden md:table-cell">
                      <p className="text-xs m-0 text-center">
                        {dayjs(room.createdAt).format("DD MMM YYYY hh:mm A")}
                      </p>
                      <p className="text-xs m-0 text-center">
                        {dayjs(room.updatedAt).format("DD MMM YYYY hh:mm A")}
                      </p>
                    </td>
                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => {
                          setShowDetailsModel(true);
                          setSelectedRoom(room);
                        }}
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 transition"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => onEdit(room)}
                        className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition"
                        title="Edit Room"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => onDelete(room)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition"
                        title="Delete Room"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showDetailsModel && selectedRoom && (
        <RoomDetailsModal
          room={selectedRoom}
          isOpen={showDetailsModel}
          onClose={setShowDetailsModel}
        />
      )}

      {iscreateRoomOpen && selectedRoom?._id && (
        <CreateUpdateRoom
          onClose={() => setIsCreateRoomOpen(false)}
          handleRefress={handleRefress}
          selectedRoomId={selectedRoom._id}
        />
      )}
    </>
  );
};

export default RoomTable;
