"use client";

import { useEffect, useState } from "react";
import HotelTable, { HotelIF } from "../Components/Tabels/HotelTabel";
import Image from "next/image";
import Arrow from "@/asset/icon/Arrow.svg";
import Link from "next/link";
import axios from "axios";
import { authHeader } from "@/app/Auth/AuthHeader/authHeader";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

export interface JsonResponseIF {
  hotelCount: number;
  avgRating: number;
  hotels: HotelIF[];
}

export interface ApiResponseIF {
  output: number;
  message: string;
  jsonResponse: JsonResponseIF;
}

export default function HostDashboard() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [dashBoardData, setDashBoardData] = useState<ApiResponseIF | null>(
    null
  );
  const [isDashBoardLoading, setIsDashBoardLoading] = useState<boolean>(false);

  const getDashBoardResponse = async () => {
    setIsDashBoardLoading(true);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/host/host-dashboard`,
      { hostId: user?.id },
      {
        headers: authHeader(),
      }
    );

    const responseData = response.data;
    if (responseData.output === 1) {
      setDashBoardData(responseData);
      setIsDashBoardLoading(false);
    } else {
      setIsDashBoardLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    user?.id && getDashBoardResponse();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const [bookings] = useState([
    {
      id: 101,
      guest: "John Doe",
      hotel: "Grand Palace",
      checkIn: "2025-02-10",
      checkOut: "2025-02-15",
      price: "$250",
      status: "Confirmed",
    },
    {
      id: 102,
      guest: "Jane Smith",
      hotel: "Sunset Resort",
      checkIn: "2025-03-01",
      checkOut: "2025-03-05",
      price: "$180",
      status: "Pending",
    },
  ]);

  return (
    <div className="container mx-auto p-6 px-0 md:px-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center sm:text-left">
        🏨 Host Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 w-full">
        {[
          { title: "Total Hotels", value: dashBoardData?.jsonResponse.hotels.length, color: "bg-blue-100" },
          {
            title: "Total Bookings",
            value: bookings.length,
            color: "bg-green-100",
          },
          { title: "Revenue", value: "$1,230", color: "bg-yellow-100" },
          { title: "Avg. Rating", value: `${dashBoardData?.jsonResponse.avgRating} ⭐`, color: "bg-purple-100" },
        ].map(({ title, value, color }) => (
          <div
            key={title}
            className={`${color} p-4 rounded-lg text-center shadow-md`}
          >
            <h2 className="text-lg font-semibold dark:text-foreground">
              {title}
            </h2>
            <p className="text-2xl font-bold dark:text-foreground">{value}</p>
          </div>
        ))}
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white dark:bg-foreground shadow-md rounded-lg p-4 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">📅 Recent Bookings</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-bannerbg text-sm sm:text-base">
              <th className="p-2">Guest</th>
              <th className="p-2">Hotel</th>
              <th className="p-2">Check-in</th>
              <th className="p-2">Check-out</th>
              <th className="p-2">Price</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b dark:border-gray-600 text-sm "
              >
                <td className="p-2">{booking.guest}</td>
                <td className="p-2">{booking.hotel}</td>
                <td className="p-2">{booking.checkIn}</td>
                <td className="p-2">{booking.checkOut}</td>
                <td className="p-2">{booking.price}</td>
                <td
                  className={`p-2 font-bold ${
                    booking.status === "Confirmed"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {booking.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hotel List */}
      <div className="bg-white dark:bg-foreground shadow-md rounded-lg p-4 mt-6 overflow-x-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">🏠 Your Hotels</h2>
          <Link href={"/Admin/hotel"}>
            <Image
              src={Arrow}
              alt={Arrow}
              className="bg-primaryblue dark:bg-bannerbg p-1 rounded-full max-sm:top-4 max-sm:right-6 max-sm:size-8 w-6 h-6 object-cover cursor-pointer "
            />
          </Link>
        </div>
        <HotelTable hotelData={dashBoardData?.jsonResponse.hotels ?? null} loading={isDashBoardLoading} handleRefress={getDashBoardResponse} />
      </div>
    </div>
  );
}
