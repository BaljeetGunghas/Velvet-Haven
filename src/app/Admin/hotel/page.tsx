"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { authHeader } from "@/app/Auth/AuthHeader/authHeader";
import HotelTable, { HotelIF } from "../Components/Tabels/HotelTabel";
import CreateUpdateHotel from "./Components/CreateUpdateHotel";
import { RefreshCcw } from "lucide-react";
import { useHandleLogout } from "@/Hooks/handleLogout";

const AdminHotelPage = () => {
  const [hotels, setHotels] = useState<HotelIF[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [iscreateHotelOpen, setIsCreateHotelOpen] = useState<boolean>(false);
  const handleLogout = useHandleLogout();

 

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
      } else if (responseData.output === -401) {
        alert("Session Expired! Please login again.");
        return handleLogout();
      } else {
        setHotels([]);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHotels();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Hotel Management</h1>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => fetchHotels()}
              className="bg-primaryblue text-white px-4 py-2"
            >
              <RefreshCcw />
            </Button>
            <Button
              onClick={() => setIsCreateHotelOpen(true)}
              className="bg-primaryblue text-white px-4 py-2"
            >
              + Create Hotel
            </Button>
          </div>
        </div>

        <HotelTable hotelData={hotels ?? null} loading={loading} handleRefress={fetchHotels}  />
      </div>
      {iscreateHotelOpen && (
        <CreateUpdateHotel onClose={() => setIsCreateHotelOpen(false)} handleRefress={fetchHotels} />
      )}
    </>
  );
};
export default AdminHotelPage;
