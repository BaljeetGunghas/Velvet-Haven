"use client";

import BedIcon from "@/asset/icon/bed-outline.svg";
import calendar from "@/asset/icon/calendar.svg";
import downline from "@/asset/icon/down-line.svg";
import iconuser from "@/asset/icon/icon_user.svg";
import Image from "next/image";
import React, { useState, useCallback, useMemo } from "react";
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
import { City } from "country-state-city";
import { useRouter } from "next/navigation";
import DatePickerWithRange from "../Calendar/DatePicker";
import { Range } from "react-date-range";
import ModalLayout from "../ModelLayout/Modellayout";
import dynamic from "next/dynamic";
import dayjs from "dayjs";

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
  const cityOptions = useMemo(() => {
    const allowedStates = ["DL", "HR", "CH", "PB", "UP", "MH", "TG", "UK"]; // State codes

    const cities = allowedStates
      .flatMap(stateCode => City.getCitiesOfState("IN", stateCode) || [])
      .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically

    return cities.map(city => ({
      value: city.name.toLowerCase(),
      label: `${city.name} (${city.stateCode} ${city.countryCode})`,
    }));
  }, []);

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

    router.push(`/SearchResult?${queryParams.toString()}`);
}, [router, selectedCity, date, personDetails]);


  return (
    <>
      <div className="bg-primaryblue dark:bg-foreground p-1 flex items-center gap-1 rounded-md max-sm:flex-col max-sm:gap-3 max-sm:p-4 max-sm:bg-white max-sm:bg-opacity-50 max-sm:drop-shadow-xl">
        {/* City Selection */}
        <div className="bg-white dark:bg-bannerbg flex items-center p-3 pr-4 rounded-md min-w-[200px] max-sm:w-full">
          <Image src={BedIcon} alt="bed icon" className="w-8 h-8 dark:rounded-full size-6 dark:filter dark:invert dark:brightness-0 dark:p-1" />
          <div className="relative">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="sm:min-w-48 font-medium text-base border-none shadow-none outline-none rounded-md p-3">
                <SelectValue placeholder="Where are you going?" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-foreground z-50">
                <SelectGroup>
                  <SelectLabel>Select City</SelectLabel>
                  {cityOptions.map((city, i) => (
                    <SelectItem key={city.value + i} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>


        </div>

        {/* Date Picker */}
        <div className="bg-white dark:bg-bannerbg flex items-center p-3 pr-4 rounded-md max-sm:w-full">
          <Image src={calendar} alt="calendar icon" className="w-8 h-8 dark:rounded-full size-6 dark:filter dark:invert dark:brightness-0 dark:p-1" />
          <DatePickerWithRange dateRange={date} setDate={setDate} />
        </div>

        {/* Person & Room Selection */}
        <div
          onClick={() => setIsSelectPersonAndRoomModelOpen(true)}
          className="relative bg-white dark:bg-bannerbg flex items-center gap-2 p-3 pr-4 rounded-md max-sm:w-full cursor-pointer"
        >
          <Image src={iconuser} alt="user icon" className="w-8 h-8 dark:rounded-full size-6 dark:filter dark:invert dark:brightness-0 dark:p-1" />
          <span className="font-medium text-base mx-1">{personDetails.adults} adults</span>
          <span className="font-medium text-base mx-1">{personDetails.children} children</span>
          <span className="font-medium text-base mx-1">{personDetails.rooms} room</span>
          <Image src={downline} alt="dropdown icon" className="w-5 h-5 ml-14 max-sm:ml-16 dark:filter dark:invert dark:brightness-0" />
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearchHotel}
          disabled={(!selectedCity || !date)?true:false}
          className="bg-white dark:bg-bannerbg disabled:bg-white disabled:opacity-1 disabled:cursor-not-allowed disabled:text-gray-300 text-primaryblue dark:text-white text-base font-semibold h-full px-8 py-[18px] dark:shadow-xl dark:hover:bg-foreground max-sm:w-full"
        >
          {isHotelSearchingLoading ? "Searching..." : "Search"}
        </Button>
      </div >

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
