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
      <div className="bg-primaryblue dark:bg-foreground p-1 flex items-center gap-1 rounded-md max-sm:flex-col max-sm:gap-3 max-sm:p-4 max-sm:bg-white max-sm:bg-opacity-50 max-sm:drop-shadow-xl">
        {/* City Selection */}
        <div className="bg-white dark:bg-bannerbg flex items-center p-3 pr-4 rounded-md min-w-[200px] max-sm:w-full">
          <Image src={BedIcon} alt="bed icon" className="w-8 h-8 dark:rounded-full size-6 dark:filter dark:invert dark:brightness-0 dark:p-1" />
          <div className="relative  w-full">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="sm:min-w-48 font-medium text-sm border-none shadow-none outline-none rounded-md p-3">
                <SelectValue placeholder="Where are you going?">{selectedCity && CityOptions().find(city => city.value === selectedCity)?.label}</SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-foreground z-50">
                <SelectGroup>
                  <SelectLabel>Select City</SelectLabel>
                  {CityOptions().map((city, i) => (
                    <SelectItem key={city.value + i} value={city.value} className="hover:bg-gray-200 dark:hover:bg-bannerbg cursor-pointer">
                      <div className="flex gap-2 items-center p-2">
                        <FaLocationDot className="text-primaryblue h-5 w-5" />
                        <div className="flex flex-col">
                          <p className="text-black dark:text-white font-semibold">{city.label}</p>
                          <p className="font-normal text-gray-600 dark:text-slate-50">India</p>
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
        <div className="bg-white dark:bg-bannerbg flex items-center p-3 pr-4 rounded-md max-sm:w-full">
          <Image src={calendar} alt="calendar icon" className="w-8 h-8 dark:rounded-full size-6 dark:filter dark:invert dark:brightness-0 dark:p-1" />
          <DatePickerWithRange dateRange={date} setDate={setDate} />
        </div>

        {/* Person & Room Selection */}
        <div
          onClick={() => setIsSelectPersonAndRoomModelOpen(true)}
          className="relative bg-white dark:bg-bannerbg flex items-center gap-1 p-3 pr-4 rounded-md max-sm:w-full cursor-pointer"
        >
          <Image src={iconuser} alt="user icon" className="w-8 h-8 dark:rounded-full size-6 dark:filter dark:invert dark:brightness-0 dark:p-1" />
          <span className="font-medium text-sm mx-1">{personDetails.adults} adults</span>
          <span className="font-medium text-sm mx-1">{personDetails.children} children</span>
          <span className="font-medium text-sm mx-1">{personDetails.rooms} room</span>
          <Image src={downline} alt="dropdown icon" className="w-5 h-5 ml-14 max-sm:ml-16 dark:filter dark:invert dark:brightness-0" />
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearchHotel}
          disabled={(!selectedCity || !date) ? true : false}
          className="bg-white dark:bg-bannerbg disabled:bg-white disabled:opacity-1 disabled:cursor-not-allowed disabled:text-gray-300 text-primaryblue dark:text-white text-sm font-semibold h-full px-8 py-[18px] dark:shadow-xl dark:hover:bg-foreground max-sm:w-full"
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
