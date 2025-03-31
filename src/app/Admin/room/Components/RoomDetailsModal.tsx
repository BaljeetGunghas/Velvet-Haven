"use client";

import React from "react";
import Image from "next/image";
import ModalLayout from "@/components/ModelLayout/Modellayout";
import { RoomIF } from "../../Components/Tabels/RoomTable";

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
  if (!room) return null;

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-bold">Room No: {room.room_number}</h2>
          <span className="text-lg font-semibold text-primary">
            {room.room_type}
          </span>
        </div>

        {/* Hotel Name */}
        <p className="text-sm text-gray-700">
          <strong>Hotel:</strong> {room.hotel_id?.name || "N/A"}
        </p>

        {/* Pricing & Occupancy */}
        <div className="grid grid-cols-2 gap-4">
          <p className="text-sm">
            <strong>Price Per Night:</strong> ${room.price_per_night}
          </p>
          <p className="text-sm">
            <strong>Max Occupancy:</strong> {room.max_occupancy} guests
          </p>
        </div>
        {/* Floor & Bed Type */}
        <div className="grid grid-cols-2 gap-4">
          <p className="text-sm">
            <strong>Floor:</strong> {room.floor_number}
          </p>
          <p className="text-sm">
            <strong>Bed Type:</strong> {room.bed_type}
          </p>
        </div>

        {/* Availability & View */}
        <div className="grid grid-cols-2 gap-4">
          <p
            className={`text-sm font-bold ${
              room.availability_status ? "text-green-600" : "text-red-600"
            }`}
          >
            {room.availability_status ? "Available" : "Booked"}
          </p>
          <p className="text-sm">
            <strong>View:</strong> {room.amenities|| "N/A"}
          </p>
        </div>

        {/* Smoking Policy */}
        <p className="text-sm">
          <strong>Smoking Allowed:</strong>{" "}
          {room.smoking_allowed ? "Yes" : "No"}
        </p>

        {/* Check-in & Check-out Times */}
        <div className="grid grid-cols-2 gap-4">
          <p className="text-sm">
            <strong>Check-in:</strong> {room.check_in_time}
          </p>
          <p className="text-sm">
            <strong>Check-out:</strong> {room.check_out_time}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700">
          <strong>Description:</strong>{" "}
          {room.description || "No description available"}
        </p>

        {/* Room Images */}
        {room?.room_images && room?.room_images?.length > 0 ? (
          <div>
            <p className="text-sm font-semibold mb-2">Room Images:</p>
            <div className="grid grid-cols-3 gap-2">
              {room.room_images.map((img, index) => (
                <div key={index} className="relative w-full h-24">
                  <Image
                    src={img}
                    alt={`Room Image ${index}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg shadow"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No images available</p>
        )}
      </div>
    </ModalLayout>
  );
};

export default RoomDetailsModal;
