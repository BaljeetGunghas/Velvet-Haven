"use client";

import ModalLayout from "@/components/ModelLayout/Modellayout";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import dayjs from "dayjs";
import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import CreateUpdateHotel from "../../hotel/Components/CreateUpdateHotel";
import ConfirmationModel from "@/components/ConfirmationModel/ConfirmationModel";
import { useHandleDeleteHotel } from "@/Hooks/hotel";
import { toast } from "react-toastify";
import { useHandleLogout } from "@/Hooks/handleLogout";

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
  hotel_image: string[] | null;
}

interface DeleteHotelResponseIF {
  output: number;
  message: string;
  jsonResponse: null;
}

interface Props {
  hotelData: HotelIF[] | null;
  loading: boolean;
  handleRefress: () => void;
}

const HotelTable: React.FC<Props> = ({ hotelData, loading, handleRefress }) => {
  const [selectedHotel, setSelectedHotel] = useState<HotelIF | null>(null);
  const [showDetailsModel, setShowDetailsModel] = useState<boolean>(false);
  const [isUpdateHotelOpen, setIsUpdateHotelOpen] = useState<boolean>(false);
  const [ConfirmationModelOpen, setConfirmationModelOpen] =
    useState<boolean>(false);
  const useHandleDeleteHotelCallBack = useHandleDeleteHotel;
  const handleLogout = useHandleLogout();
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const onEdit = (hotel: HotelIF) => {
    setSelectedHotel(hotel);
    setIsUpdateHotelOpen(true);
  };

  const handleDeleteHotel = async () => {
    if (!selectedHotel?._id) return; // Prevent calling API if no hotel is selected
  
    setDeleteLoading(true);
  
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const response: DeleteHotelResponseIF = await useHandleDeleteHotelCallBack(selectedHotel._id);
  
    if (response.output === 1) {
      console.log("Delete Hotel ID:", selectedHotel?._id);
      toast.success("Hotel Deleted Successfully");
      handleRefress();
      setSelectedHotel(null);
      setConfirmationModelOpen(false);
    } else if (response.output === -401) {
      handleLogout();
    } else {
      toast.error("Something went wrong");
    }
  
    setDeleteLoading(false);
  };
  
  const onDelete = (hotel: HotelIF) => {
    setConfirmationModelOpen(true);
    setSelectedHotel(hotel);
  };

  return (
    <>
      <div className="py-2 px-0 shadow-md rounded-lg dark:bg-foreground pt-0.5">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-lg rounded-lg min-w-[700px]">
            <thead className="bg-primaryblue dark:bg-bannerbg text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left hidden md:table-cell">Owner</th>
                <th className="p-3 text-left hidden lg:table-cell">Address</th>
                <th className="p-3 text-center">Rating</th>
                <th className="p-3 text-center hidden md:table-cell">Rooms</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center hidden lg:table-cell">
                  Created / Updated
                </th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading || hotelData === null ? (
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
                    <td className="p-3 text-center hidden md:table-cell">
                      <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                    </td>
                    <td className="p-3 text-center hidden lg:table-cell">
                      <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
                    </td>
                  </tr>
                ))
              ) : hotelData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">
                    No Hotels Found!
                  </td>
                </tr>
              ) : (
                hotelData.map((hotel) => (
                  <tr
                    key={hotel._id}
                    className="border-b last:border-none dark:hover:bg-gray-900 hover:bg-slate-200 text-sm transition duration-300"
                  >
                    <td className="p-3 font-semibold ">{hotel?.name}</td>
                    <td className="p-3 hidden md:table-cell text-xs">
                      {hotel?.owner_name}
                    </td>
                    {hotel?.address?.length > 22 ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <td className="p-3 text-xs hidden lg:table-cell truncate max-w-[150px]">
                            {hotel?.address}
                          </td>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          sideOffset={5}
                          className="p-2 rounded-xl bg-foreground text-white dark:bg-blue-950 text-xs dark:text-white relative z-100"
                        >
                          {hotel?.address}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <td className="p-3 text-xs hidden lg:table-cell">
                        {hotel?.address}
                      </td>
                    )}

                    <td className="p-3 text-xs text-center">
                      {hotel?.rating} ⭐
                    </td>
                    <td className="p-3 text-xs text-center hidden md:table-cell">
                      {hotel.rooms}
                    </td>
                    <td
                      className={`p-3 text-xs text-center font-bold ${
                        hotel.status === "active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {hotel.status}
                    </td>
                    <td className="p-3 text-center hidden lg:table-cell">
                      <p className="text-xs m-0 text-center">
                        {dayjs(hotel.createdAt).format("DD MMM YYYY HH:mm a")}
                      </p>
                      <p className="text-xs m-0 text-center">
                        {dayjs(hotel.updatedAt).format("DD MMM YYYY HH:mm a")}
                      </p>
                    </td>
                    <td className="p-3 text-center space-x-2">
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
                        onClick={() => onDelete(hotel)}
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
      </div>

      {selectedHotel && (
        <ModalLayout isOpen={showDetailsModel} onClose={setShowDetailsModel}>
          <div className="p-6 rounded-lg w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {selectedHotel.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
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
            </div>
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

      {isUpdateHotelOpen && selectedHotel?._id && (
        <CreateUpdateHotel
          onClose={() => setIsUpdateHotelOpen(false)}
          handleRefress={handleRefress}
          selectedHotelId={selectedHotel._id}
        />
      )}

      {ConfirmationModelOpen && selectedHotel?._id && (
        <ConfirmationModel
          isOpen={ConfirmationModelOpen}
          onClose={setConfirmationModelOpen}
          handleExicutefunction={handleDeleteHotel}
          loading={deleteLoading}
        >
          Delete Hotel
        </ConfirmationModel>
      )}
    </>
  );
};

export default HotelTable;
