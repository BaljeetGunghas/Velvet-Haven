"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import LoadingComponent from "@/components/Loading/LoadingComponent";
import ComponentError from "@/components/Error/ComponentError";
import { authHeader } from "../Auth/AuthHeader/authHeader";
import { MapPin, Star, Share2, Heart } from "lucide-react";
import Link from "next/link";

// Component imports (to be created)
import HotelGallery from "./Components/HotelGallery";
import HotelHeader from "./Components/HotelHeader";
import HotelHighlights from "./Components/HotelHighlights";
import AmenitiesGrid from "./Components/AmenitiesGrid";
import ReviewsSection from "./Components/ReviewsSection";
import BookingPanel from "./Components/BookingPanel";
import RoomsSection from "./Components/RoomsSection";

interface HotelDetails {
  _id: string;
  hotel_name: string;
  hotelAddress: string;
  hotelRating: number;
  description: string;
  room_images: string[];
  amenities: string[];
  reviews?: any[];
  total_rooms?: number;
  restaurant_count?: number;
  is_shortlisted?: boolean;
  starting_price?: number;
}

interface RoomData {
  rooms: any[];
  total_rooms: number;
}

const HotelDetailsPage = () => {
  const searchParams = useSearchParams();
  const hotelId = searchParams.get("hotel_id");

  const [hotelDetails, setHotelDetails] = useState<HotelDetails | null>(null);
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isShortlisted, setIsShortlisted] = useState(false);

  // Fetch hotel details
  const fetchHotelDetails = useCallback(async () => {
    if (!hotelId) {
      setError("Hotel ID is required");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Fetch hotel details
      const hotelResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel/${hotelId}`,
        { headers: authHeader() }
      );

      if (hotelResponse.data.output > 0) {
        const hotelData = hotelResponse.data.jsonResponse;
        setHotelDetails(hotelData);
        setIsShortlisted(hotelData.is_shortlisted || false);

        // Fetch available rooms for this hotel
        try {
          const roomsResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotel/${hotelId}/rooms`,
            { headers: authHeader() }
          );

          if (roomsResponse.data.output > 0) {
            setRoomData(roomsResponse.data.jsonResponse);
          }
        } catch (err) {
          console.error("Error fetching rooms:", err);
          // Rooms error is not fatal, page can display without them
        }
      } else {
        setError("Hotel not found");
      }
    } catch (err) {
      console.error("Error fetching hotel details:", err);
      setError("Failed to load hotel details. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [hotelId]);

  useEffect(() => {
    fetchHotelDetails();
  }, [fetchHotelDetails]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingComponent />
      </div>
    );
  }

  if (error || !hotelDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ComponentError error={error || "Hotel not found"} reload={fetchHotelDetails} />
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 pt-20 sm:pt-24 lg:pt-28">
      {/* Hero Gallery Section - More Spacious */}
      <section className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-7xl mx-auto"
        >
          <HotelGallery images={hotelDetails.room_images} />
        </motion.div>
      </section>

      {/* Main Content Section with Sticky Booking Panel */}
      <section className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-7xl mx-auto">
          {/* Hotel Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <HotelHeader
              hotel={hotelDetails}
              isShortlisted={isShortlisted}
              onShortlistChange={setIsShortlisted}
            />
          </motion.div>

          {/* Two Column Layout: Left Content + Right Sticky Booking */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Left Column: Content */}
            <div className="lg:col-span-2">
              {/* Hotel Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12"
              >
                <HotelHighlights hotel={hotelDetails} />
              </motion.div>

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-12"
              >
                <AmenitiesGrid amenities={hotelDetails.amenities} />
              </motion.div>

              {/* About Section */}
              {hotelDetails.description && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mb-12 bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 p-6 md:p-8 shadow-lg hover:shadow-xl hover:shadow-accent-gold/20 transition-all"
                >
                  <h2 className="text-2xl font-playfair font-bold text-primary-green dark:text-white mb-4">
                    About {hotelDetails.hotel_name}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {hotelDetails.description}
                  </p>
                </motion.div>
              )}

              {/* Reviews Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-12"
              >
                <ReviewsSection hotel={hotelDetails} />
              </motion.div>

              {/* Rooms Section */}
              {roomData && roomData.rooms.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mb-12"
                >
                  <RoomsSection rooms={roomData.rooms} hotelName={hotelDetails.hotel_name} />
                </motion.div>
              )}
            </div>

            {/* Right Column: Sticky Booking Panel */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-40">
                <BookingPanel hotel={hotelDetails} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

const Page = () => (
  <Suspense fallback={<LoadingComponent />}>
    <HotelDetailsPage />
  </Suspense>
);

export default Page;
