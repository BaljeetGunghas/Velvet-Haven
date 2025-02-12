import ModalLayout from "@/components/ModelLayout/Modellayout";
import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export interface HotelIF {
  _id: string;
  hostid: string;
  name: string;
  owner_name: string;
  description: string;
  address: string;
  city: number;
  state: number;
  country: number;
  postal_code: string;
  rating: number;
  reviews: string[];
  policies: string;
  cancellation_policy: string;
  contact_number: number;
  email: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  __v: number;
  rooms: number;
}

interface Props {
  hotelData: HotelIF[] | null; // Allows null for loading state
  loading: boolean;
}

const HotelTable: React.FC<Props> = ({ hotelData, loading }) => {
  const [selectedHotel, setSelectedHotel] = useState<HotelIF | null>(null);
  const [showDetailsModel, setShowDetailsModel] = useState<boolean>(false);

  const onDelete = (id: string) => {
    console.log("Delete Hotel ID:", id);
  };

  const onEdit = (hotel: HotelIF) => {
    console.log("Edit Hotel ID:", hotel._id);
  };

  return (
    <>
      <div className="py-2 px-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-primaryblue dark:bg-bannerbg text-white">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Owner</th>
                <th className="p-4 text-left">Address</th>
                <th className="p-4 text-center">Rating</th>
                <th className="p-4 text-center">Rooms</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Show Skeleton Loader When Loading or No Data Yet */}
              {loading || hotelData === null ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="border-b animate-pulse">
                    <td className="p-4">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
                    </td>
                  </tr>
                ))
              ) : hotelData.length === 0 ? (
                // Show Message When No Hotels Found
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    No Hotels Found!
                  </td>
                </tr>
              ) : (
                // Render Hotel Data
                hotelData.map((hotel) => (
                  <tr
                    key={hotel._id}
                    className="border-b dark:hover:bg-gray-900 hover:bg-slate-200 text-sm transition duration-300"
                  >
                    <td className="p-4">{hotel.name}</td>
                    <td className="p-4">{hotel.owner_name}</td>
                    <td className="p-4">{hotel.address}</td>
                    <td className="p-4 text-center">{hotel.rating} ⭐</td>
                    <td className="p-4 text-center">{hotel.rooms}</td>
                    <td
                      className={`p-4 text-center font-bold ${
                        hotel.status === "active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {hotel.status}
                    </td>
                    <td className="p-4 text-center space-x-2">
                      <button
                        onClick={() => {
                          setShowDetailsModel(true);
                          setSelectedHotel(hotel);
                        }}
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 transition"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => onEdit(hotel)}
                        className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition"
                        title="Edit Hotel"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => onDelete(hotel._id)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition"
                        title="Delete Hotel"
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

        {/* View Hotel Details Modal */}
      </div>
      {selectedHotel && (
        <ModalLayout isOpen={showDetailsModel} onClose={setShowDetailsModel}>
          <div className="p-6 rounded-lg  w-full max-w-3xl mx-auto ">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {selectedHotel.name}
            </h2>

            {/* Grid Layout */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 ">
              <p>
                <strong>Owner:</strong> {selectedHotel.owner_name}
              </p>
              <p>
                <strong>Address:</strong> {selectedHotel.address}
              </p>
              <p>
                <strong>City:</strong> {selectedHotel.city}
              </p>
              <p>
                <strong>State:</strong> {selectedHotel.state}
              </p>
              <p>
                <strong>Country:</strong> {selectedHotel.country}
              </p>
              <p>
                <strong>Postal Code:</strong> {selectedHotel.postal_code}
              </p>
              <p>
                <strong>Policies:</strong> {selectedHotel.policies}
              </p>
              <p>
                <strong>Cancellation:</strong>{" "}
                {selectedHotel.cancellation_policy}
              </p>
              <p>
                <strong>Contact:</strong> {selectedHotel.contact_number}
              </p>
              <p>
                <strong>Email:</strong> {selectedHotel.email}
              </p>
              <p>
                <strong>Rating:</strong> {selectedHotel.rating} ⭐
              </p>
              <p>
                <strong>Rooms:</strong> {selectedHotel.rooms}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-bold ${
                    selectedHotel.status === "active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedHotel.status}
                </span>
              </p>
            </div>

            {/* Close Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setSelectedHotel(null)}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </ModalLayout>
      )}
    </>
  );
};

export default HotelTable;
