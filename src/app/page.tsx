"use client";

import LandingBanner from "@/components/Banner/LandingBanner";
import OurServeces from "./LandingComponent/OurServeces";
import TopDestinationHotel from "./LandingComponent/TopDestinationHotel";
import Faq from "./LandingComponent/Faq";
import Testimonial from "./LandingComponent/Testimonial";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { authHeader } from "./Auth/AuthHeader/authHeader";
import { RootState } from "./store/store";
import { useSelector } from "react-redux";

export default function Home() {
  const [cityname, setCityname] = useState<string | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    // Ask for location permission on component mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Call the reverse geocoding API (OpenStreetMap Nominatim)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
          );
          const data = await response.json();

          // Get the city name from the response with fallback logic
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.city_district ||
            data.address.suburb ||
            data.address.county ||
            data.address.state;

          setCityname(city || "Location not found");
          if (user?.id) {
            const payload = {
              city: city || cityname,
              state: data.address.state,
              country: data.address.country,
            };
            const responseUpdateProfile = await axios.put(
              `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/profile/update`,
              payload,
              {
                headers: authHeader(),
              }
            );
            const responseData = responseUpdateProfile.data;
            if (responseData.output === 1) {
              console.log(responseData.message);
            }
          }
        },
        (error) => {
          // Handle location permission error
          if (error.code === error.PERMISSION_DENIED) {
            toast.warn(
              "We need your location to provide better service. Please enable location access."
            );
          }
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  
  return (
    <>
      <LandingBanner />
      <OurServeces />
      <TopDestinationHotel />
      <Testimonial />
      <Faq />
    </>
  );
}
