"use client";

import React from "react";
import Image from "next/image";
import ModalLayout from "@/components/ModelLayout/Modellayout";

interface Room {
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
  features: string[];
  floor_number: number;
  bed_type: string;
  availability_status: boolean;
  view_type: string;
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

interface RoomDetailsModalProps {
  room: Room | null;
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
      <div className="p-4 space-y-3">
        {/* Room Number & Type */}
        <div className="flex justify-between">
          <p className="text-lg font-bold">Room No: {room.room_number}</p>
          <p className="text-lg font-semibold text-primary">{room.room_type}</p>
        </div>

        {/* Hotel Name */}
        <p className="text-sm text-gray-600">
          <strong>Hotel:</strong> {room.hotel_id.name}
        </p>

        {/* Price & Occupancy */}
        <div className="flex justify-between">
          <p className="text-sm">
            <strong>Price Per Night:</strong> ${room.price_per_night}
          </p>
          <p className="text-sm">
            <strong>Max Occupancy:</strong> {room.max_occupancy} guests
          </p>
        </div>

        {/* Features */}
        <div>
          <p className="text-sm font-semibold">Features:</p>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {room.features.length > 0 ? (
              room.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))
            ) : (
              <li>No features listed</li>
            )}
          </ul>
        </div>

        {/* Floor & Bed Type */}
        <div className="flex justify-between">
          <p className="text-sm">
            <strong>Floor:</strong> {room.floor_number}
          </p>
          <p className="text-sm">
            <strong>Bed Type:</strong> {room.bed_type}
          </p>
        </div>

        {/* Availability & View */}
        <div className="flex justify-between">
          <p
            className={`text-sm font-bold ${
              room.availability_status ? "text-green-600" : "text-red-600"
            }`}
          >
            {room.availability_status ? "Available" : "Booked"}
          </p>
          <p className="text-sm">
            <strong>View:</strong> {room.view_type}
          </p>
        </div>

        {/* Smoking Allowed */}
        <p className="text-sm">
          <strong>Smoking Allowed:</strong>{" "}
          {room.smoking_allowed ? "Yes" : "No"}
        </p>

        {/* Check-in & Check-out Times */}
        <div className="flex justify-between">
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
        {room.room_images && room.room_images.length > 0 ? (
          <div>
            <p className="text-sm font-semibold mb-2">Room Images:</p>
            <div className="flex space-x-2 overflow-x-auto">
              {room.room_images.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={`Room Image ${index}`}
                  width={100}
                  height={70}
                  className="rounded-lg shadow"
                />
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
