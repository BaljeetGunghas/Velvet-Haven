"use client";

import BedIcon from "@/asset/icon/bed-outline.svg";
import calendar from "@/asset/icon/calendar.svg";
import downline from "@/asset/icon/down-line.svg";
import iconuser from "@/asset/icon/icon_user.svg";
import Image from "next/image";
import React, { useState, useCallback } from "react";
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
import ModalLayout from "../ModelLayout/Modellayout";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import { FaLocationDot } from "react-icons/fa6";
import { CityOptions } from "./CityOptions";

// Lazy loading SelectPersonAndRoom for better performance
const SelectPersonAndRoom = dynamic(() => import("../SelectPersonAndRoom/SelectPersonAndRoom"), { ssr: false });

const defaultDateRange: Range = {
  startDate: undefined,
  endDate: undefined,
  key: "selection",
};

const LandingSearchForm = () => {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [date, setDate] = useState<Range>(defaultDateRange);
  const [isSelectPersonAndRoomModelOpen, setIsSelectPersonAndRoomModelOpen] = useState<boolean>(false);
  const [personDetails, setPersonDetails] = useState({ rooms: 1, adults: 1, children: 0 });
  const [isHotelSearchingLoading, setIsHotelSearchingLoading] = useState<boolean>(false);

  // Fetch city options only once and prevent unnecessary re-renders



  const handleSearchHotel = useCallback(() => {
    setIsHotelSearchingLoading(true);

    const queryParams = new URLSearchParams({
      city: selectedCity,
      check_in_date: dayjs(date.startDate).format('YYYY-MM-DD'),
      check_out_date: dayjs(date.endDate).format('YYYY-MM-DD'),
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
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-3 w-full items-stretch lg:items-center">
        {/* City Selection */}
        <div className="flex-1 min-w-0 flex items-center gap-3 bg-secondary-ivory dark:bg-slate-800 rounded-lg p-4 border border-border-light dark:border-slate-700 transition-all duration-300 hover:border-accent-gold focus-within:border-accent-gold focus-within:ring-2 focus-within:ring-accent-gold/20">
          <Image
            src={BedIcon}
            alt="bed icon"
            className="w-5 h-5 flex-shrink-0 opacity-60 dark:filter dark:invert"
          />
          <div className="relative flex-1 min-w-0">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="font-medium text-sm border-none shadow-none outline-none p-0 text-text-dark dark:text-white truncate">
                <SelectValue placeholder="Where are you going?">
                  {selectedCity &&
                    CityOptions().find((city) => city.value === selectedCity)
                      ?.label}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-900 z-50 border-border-light dark:border-slate-700">
                <SelectGroup>
                  <SelectLabel className="text-text-secondary">
                    Select City
                  </SelectLabel>
                  {CityOptions().map((city, i) => (
                    <SelectItem
                      key={city.value + i}
                      value={city.value}
                      className="hover:bg-secondary-ivory dark:hover:bg-slate-800 cursor-pointer"
                    >
                      <div className="flex gap-2 items-center p-1">
                        <FaLocationDot className="text-primary-green h-4 w-4 flex-shrink-0" />
                        <div className="flex flex-col">
                          <p className="text-text-dark dark:text-white font-medium text-sm">
                            {city.label}
                          </p>
                          <p className="font-normal text-xs text-text-secondary">
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
        <div className="flex-1 min-w-0 flex items-center gap-3 bg-secondary-ivory dark:bg-slate-800 rounded-lg p-4 border border-border-light dark:border-slate-700 transition-all duration-300 hover:border-accent-gold focus-within:border-accent-gold focus-within:ring-2 focus-within:ring-accent-gold/20">
          <Image
            src={calendar}
            alt="calendar icon"
            className="w-5 h-5 flex-shrink-0 opacity-60 dark:filter dark:invert"
          />
          <div className="flex-1 min-w-0">
            <DatePickerWithRange dateRange={date} setDate={setDate} />
          </div>
        </div>

        {/* Person & Room Selection */}
        <div
          onClick={() => setIsSelectPersonAndRoomModelOpen(true)}
          className="flex-1 min-w-0 flex items-center gap-3 bg-secondary-ivory dark:bg-slate-800 rounded-lg p-4 border border-border-light dark:border-slate-700 transition-all duration-300 hover:border-accent-gold cursor-pointer hover:shadow-md"
        >
          <Image
            src={iconuser}
            alt="user icon"
            className="w-5 h-5 flex-shrink-0 opacity-60 dark:filter dark:invert"
          />
          <span className="font-medium text-sm text-text-dark dark:text-white flex-1 min-w-0 truncate">
            {personDetails.adults + personDetails.children > 0 &&
              `${personDetails.adults}A, ${personDetails.children}C`}
            {personDetails.adults + personDetails.children === 0 &&
              "Guests"}
          </span>
          <Image
            src={downline}
            alt="dropdown icon"
            className="w-4 h-4 flex-shrink-0 dark:filter dark:invert opacity-60"
          />
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearchHotel}
          disabled={(!selectedCity || !date) ? true : false}
          className="flex-shrink-0 lg:min-w-fit bg-primary-green hover:bg-accent-gold disabled:bg-gray-300 disabled:cursor-not-allowed text-white hover:text-primary-green disabled:text-gray-400 font-semibold text-sm h-auto py-4 px-6 lg:px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:hover:scale-100 active:scale-95 whitespace-nowrap"
        >
          {isHotelSearchingLoading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span className="hidden sm:inline">Searching...</span>
              <span className="sm:hidden">...</span>
            </span>
          ) : (
            "Search"
          )}
        </Button>
      </div>

      {/* Modal for Person & Room Selection */}
      <ModalLayout isOpen={isSelectPersonAndRoomModelOpen} onClose={setIsSelectPersonAndRoomModelOpen} >
        <SelectPersonAndRoom
          personDetails={personDetails}
          setPersonDetails={setPersonDetails}
          isOpen={isSelectPersonAndRoomModelOpen}
          onClose={setIsSelectPersonAndRoomModelOpen}
        />
      </ModalLayout>
    </>
  );
};

export default LandingSearchForm;
