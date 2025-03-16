"use client";

import { authHeader } from "@/app/Auth/AuthHeader/authHeader";
import { useHandleLogout } from "@/Hooks/handleLogout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RoomTable, { RoomIF } from "../Components/Tabels/RoomTable";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import CreateUpdateRoom from "./Components/CreateUpdateRoom";

const AdminRoomPage = () => {
  const [rooms, setRooms] = useState<RoomIF[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
    const [iscreateRoomOpen, setIsCreateRoomOpen] = useState<boolean>(false);
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
      } else if (responseData.output === -401) {
        alert("Session Expired! Please login again.");
        return handleLogout();
      } else {
        setRooms([]);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Room Management</h1>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => fetchRoom()}
              className="bg-primaryblue text-white px-4 py-2"
            >
              <RefreshCcw />
            </Button>
            <Button
              onClick={() => setIsCreateRoomOpen(true)}
              className="bg-primaryblue text-white px-4 py-2"
            >
              + Create Room
            </Button>
          </div>
        </div>

        <RoomTable
          roomData={rooms ?? null}
          loading={loading}
          handleRefress={fetchRoom}
        />
      </div>
      {iscreateRoomOpen && (
        <CreateUpdateRoom
          onClose={() => setIsCreateRoomOpen(false)}
          handleRefress={fetchRoom}
        />
      )}
    </>
  );
};

export default AdminRoomPage;
