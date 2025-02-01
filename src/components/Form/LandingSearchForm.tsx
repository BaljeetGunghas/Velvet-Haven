"use client";

import BedIcon from "@/asset/icon/bed-outline.svg";
import calendar from "@/asset/icon/calendar.svg";
import downline from "@/asset/icon/down-line.svg";
import iconuser from "@/asset/icon/icon_user.svg";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
// import { SingleSelect } from "../Select/SingleSelect";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Options } from "../Select/SingleSelect";
// import { DatePickerWithRange, DateRange } from "../Calendar/DatePicker";
import ModalLayout from "../ModelLayout/Modellayout";
import SelectPersonAndRoom from "../SelectPersonAndRoom/SelectPersonAndRoom";
import { useRouter } from "next/navigation";

const cityOptions = [
  { value: "1", label: "New Delhi" },
  { value: "2", label: "Mumbai" },
  { value: "3", label: "Bangalore" },
  { value: "4", label: "Hyderabad" },
  { value: "5", label: "Chennai" },
  { value: "6", label: "Kolkata" },
  { value: "7", label: "Pune" },
  { value: "8", label: "Ahmedabad" },
  { value: "9", label: "Jaipur" },
  { value: "10", label: "Surat" },
  { value: "11", label: "Lucknow" },
  { value: "12", label: "Kanpur" },
  { value: "13", label: "Nagpur" },
  { value: "14", label: "Indore" },
  { value: "15", label: "Thane" },
  { value: "16", label: "Bhopal" },
  { value: "17", label: "Visakhapatnam" },
  { value: "18", label: "Patna" },
  { value: "19", label: "Vadodara" },
  { value: "20", label: "Ghaziabad" },
];

const LandingSearchForm = () => {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState<string>("");
  // const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const [isSelectPersonAndRoomModelOpen, setisSelectPersonAndRoomModelOpen] =
    useState<boolean>(false);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [Children, setChildren] = useState(0);
  const [isHotelSearchingLoading, setIsHotelSearchingLoading] =
    useState<boolean>(false);

  const handleSearchHotel = () => {
    setIsHotelSearchingLoading(true);
    setTimeout(() => {
      setIsHotelSearchingLoading(false);
    }, 2000);
    router.push("/SearchResult");
  };

  return (
    <>
      <div className="bg-primaryblue dark:bg-foreground p-1 flex items-center gap-1 rounded-md max-sm:flex-col max-sm:gap-3 max-sm:p-4 max-sm:bg-white max-sm:bg-opacity-50  max-sm:drop-shadow-xl max-md:gap-2 max-md:p-2 max-md:bg-opacity-50 max-md:bg-white max-md:drop-shadow-xl max-md:flex-col max-md:items-center  max-md:rounded-md">
        <div className=" bg-white dark:bg-bannerbg flex items-center p-3 pr-4 rounded-md min-w-[200px] max-sm:w-full max-sm:py-5 max-md:w-full">
          <Image
            src={BedIcon}
            alt="bed icon"
            className="w-8 h-8  dark:rounded-full size-6 dark:filter dark:invert dark:brightness-0 dark:p-1"
          />
          {/* <SingleSelect value={selectedCity} setValue={setSelectedCity} option={cityOpitons} label="" /> */}
          <Select
            value={selectedCity}
            onValueChange={(e) => setSelectedCity(e)}
          >
            <SelectTrigger className="sm:min-w-48  font-medium text-base  border-none shadow-none outline-none active:outline-none rounded-md p-3">
              <SelectValue placeholder="Where are you going?" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-foreground">
              <SelectGroup>
                <SelectLabel>Select Option</SelectLabel>
                {cityOptions.map((o: Options) => {
                  return (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <span className=" font-medium text-base">Where are you going?</span> */}
        </div>
        <div className=" bg-white dark:bg-bannerbg flex items-center p-3 pr-4 rounded-md max-sm:w-full w-fit max-sm:py-5 max-md:w-full">
          <Image
            src={calendar}
            alt="bed icon"
            className="w-8 h-8  dark:rounded-full size-6 dark:filter dark:invert dark:brightness-0 dark:p-1"
          />
          {/* <span className=" font-medium text-base">Check in date</span>
        <span className=" font-medium text-base">-</span>
        <span className=" font-medium text-base">Check Out date </span> */}
          {/* <DatePickerWithRange date={date} setDate={setDate} /> */}
        </div>
        <div
          onClick={() => setisSelectPersonAndRoomModelOpen(true)}
          className="relative bg-white dark:bg-bannerbg flex items-center gap-2 p-3 pr-4 rounded-md max-sm:w-full max-sm:pr-2 max-md:w-full"
        >
          <Image
            src={iconuser}
            alt="bed icon"
            className="w-8 h-8  dark:rounded-full size-6 dark:filter dark:invert dark:brightness-0 dark:p-1"
          />
          <span className=" font-medium text-base inline-block mx-1">
            2 adults{" "}
          </span>
          <span className=" font-medium text-base inline-block mx-1">
            0 children
          </span>
          <span className=" font-medium text-base inline-block mx-1">
            1 room{" "}
          </span>
          <Image
            src={downline}
            alt="bed icon"
            className="w-5 h-5 ml-14 max-sm:mr-0 max-sm:ml-16 dark:filter dark:invert dark:brightness-0 max-md:mr-4 max-md:ml-32 "
          />
        </div>
        <Button
          onClick={handleSearchHotel}
          className=" bg-white dark:bg-bannerbg text-primaryblue dark:text-white text-base font-semibold h-full px-8 py-[18px] dark:shadow-xl dark:hover:bg-foreground duration-2000 max-sm:w-full max-sm:py-[22px] max-md:w-full "
        >
          {isHotelSearchingLoading ? "Serching..." :"Search"}
        </Button>
      </div>

      <ModalLayout
        isOpen={isSelectPersonAndRoomModelOpen}
        onClose={setisSelectPersonAndRoomModelOpen}
      >
        <SelectPersonAndRoom
          rooms={rooms}
          adults={adults}
          Children={Children}
          setRooms={setRooms}
          setAdults={setAdults}
          setChildren={setChildren}
          onConfirm={() => setisSelectPersonAndRoomModelOpen(false)}
        />
      </ModalLayout>
    </>
  );
};

export default LandingSearchForm;
