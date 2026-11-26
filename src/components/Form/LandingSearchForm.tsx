"use client";

import downline from "@/asset/icon/down-line.svg";
import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import DatePickerWithRange from "../Calendar/DatePicker";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import { FaLocationDot } from "react-icons/fa6";
import { MapPin, Users, ChevronDown } from "lucide-react";
import { CityOptions } from "./CityOptions";

// Lazy loading SelectPersonAndRoom for better performance
const SelectPersonAndRoom = dynamic(() => import("../SelectPersonAndRoom/SelectPersonAndRoom"), { ssr: false });

const LandingSearchForm = () => {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState<string>("");

  // Initialize with today and tomorrow
  const getDefaultDateRange = (): Range => ({
    startDate: new Date(),
    endDate: dayjs().add(1, 'day').toDate(),
    key: "selection",
  });

  const [date, setDate] = useState<Range>(getDefaultDateRange());
  const [isSelectPersonAndRoomModelOpen, setIsSelectPersonAndRoomModelOpen] = useState<boolean>(false);
  const [personDetails, setPersonDetails] = useState({ rooms: 1, adults: 1, children: 0 });
  const [isHotelSearchingLoading, setIsHotelSearchingLoading] = useState<boolean>(false);

  // Update date to today + tomorrow when component mounts or when date becomes stale
  useEffect(() => {
    const today = dayjs();
    const selectedCheckIn = dayjs(date.startDate);

    // If the date is from yesterday or earlier, update to today
    if (selectedCheckIn.diff(today, 'day') < 0) {
      setDate(getDefaultDateRange());
    }
  }, []);

  const handleSearchHotel = useCallback(() => {
    setIsHotelSearchingLoading(true);

    // Always use today's date + tomorrow as defaults for fresh calculation
    const today = dayjs().format('YYYY-MM-DD');
    const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');

    // Use selected dates if they're valid and in the future, otherwise use today + tomorrow
    const checkInDate = (date.startDate && dayjs(date.startDate).diff(dayjs(), 'day') >= 0)
      ? dayjs(date.startDate).format('YYYY-MM-DD')
      : today;
    const checkOutDate = (date.endDate && dayjs(date.endDate).diff(dayjs(date.startDate), 'day') > 0)
      ? dayjs(date.endDate).format('YYYY-MM-DD')
      : tomorrow;

    const queryParams = new URLSearchParams({
      city: selectedCity,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
    });

    if (personDetails.adults) {
      queryParams.append("adults", personDetails.adults.toString());
    }

    if (personDetails.children) {
      queryParams.append("children", personDetails.children.toString());
    }
    queryParams.append("page", "1");


    router.push(`/SearchResult?${queryParams.toString()}`);
  }, [router, selectedCity, date, personDetails]);


  return (
    <>
      <div className="w-full flex flex-col gap-3 md:grid md:gap-3 items-stretch md:items-center landing-search-form">
        {/* City Selection */}
        <div className="min-w-0 flex items-center gap-2 sm:gap-3 bg-white dark:bg-slate-700/80 rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 border border-gray-200 dark:border-slate-600 transition-all duration-300 hover:border-accent-gold/50 dark:hover:border-accent-gold/60 focus-within:border-accent-gold dark:focus-within:border-accent-gold focus-within:ring-2 focus-within:ring-accent-gold/20 min-h-[44px] sm:min-h-[48px] md:min-h-[52px]">
          <MapPin className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-accent-gold" />
          <div className="relative flex-1 min-w-0">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="border-none shadow-none outline-none p-0 text-xs sm:text-sm font-medium text-gray-700 dark:text-white placeholder:text-gray-500">
                <SelectValue placeholder="Where are you going?">
                  {selectedCity &&
                    CityOptions().find((city) => city.value === selectedCity)
                      ?.label}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-900 z-50 border border-gray-200 dark:border-slate-700 rounded-xl shadow-lg">
                <SelectGroup>
                  <SelectLabel className="text-gray-500 dark:text-gray-400 px-4 py-2 text-xs font-semibold uppercase tracking-wider">
                    Select City
                  </SelectLabel>
                  {CityOptions().map((city, i) => (
                    <SelectItem
                      key={city.value + i}
                      value={city.value}
                      className="hover:bg-accent-gold/10 dark:hover:bg-slate-800 cursor-pointer focus:bg-accent-gold/10 py-3 px-4"
                    >
                      <div className="flex gap-3 items-center">
                        <FaLocationDot className="text-primary-green h-5 w-5 flex-shrink-0 opacity-100" />
                        <div className="flex flex-col gap-0.5">
                          <p className="text-gray-900 dark:text-white font-semibold text-sm">
                            {city.label}
                          </p>
                          <p className="font-normal text-xs text-gray-500 dark:text-gray-400">
                            India
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Date Picker */}
        <div className="min-w-0 flex-1 min-w-0 overflow-hidden">
          <DatePickerWithRange dateRange={date} setDate={setDate} />
        </div>

        {/* Person & Room Selection */}
        <div
          onClick={() => setIsSelectPersonAndRoomModelOpen(true)}
          className="min-w-0 flex items-center gap-2 sm:gap-3 bg-white dark:bg-slate-700/80 rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 border border-gray-200 dark:border-slate-600 transition-all duration-300 hover:border-accent-gold/50 dark:hover:border-accent-gold/60 focus-within:border-accent-gold dark:focus-within:border-accent-gold focus-within:ring-2 focus-within:ring-accent-gold/20 cursor-pointer hover:shadow-md dark:hover:shadow-accent-gold/20 min-h-[44px] sm:min-h-[48px] md:min-h-[52px]"
        >
          <Users className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-accent-gold" />
          <span className="flex-1 min-w-0 overflow-hidden text-xs sm:text-sm font-medium text-gray-700 dark:text-white">
            {personDetails.adults + personDetails.children > 0 &&
              `${personDetails.adults}A, ${personDetails.children}C | ${personDetails.rooms}R`}
            {personDetails.adults + personDetails.children === 0 &&
              "1A, 0C | 1R"}
          </span>
          <ChevronDown className="w-5 h-5 flex-shrink-0 text-accent-gold" />
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearchHotel}
          disabled={!selectedCity || !date.startDate || !date.endDate}
          className="min-w-0 flex items-center justify-center gap-1 sm:gap-2 rounded-lg sm:rounded-xl bg-accent-gold px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-3.5 text-sm font-semibold text-white transition-all duration-300 min-h-[44px] sm:min-h-[48px] md:min-h-[52px] hover:bg-accent-gold/90 hover:shadow-lg hover:shadow-accent-gold/40 hover:scale-105 disabled:hover:scale-100 active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-400 w-full sm:w-auto"
        >
          {isHotelSearchingLoading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span className="hidden sm:inline">Searching...</span>
              <span className="sm:hidden">...</span>
            </span>
          ) : (
            <>
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">Search</span>
            </>
          )}
        </Button>
      </div>

      {/* Modal for Person & Room Selection - Uses React Portal */}
      <SelectPersonAndRoom
        personDetails={personDetails}
        setPersonDetails={setPersonDetails}
        isOpen={isSelectPersonAndRoomModelOpen}
        onClose={setIsSelectPersonAndRoomModelOpen}
      />
    </>
  );
};

export default LandingSearchForm;
