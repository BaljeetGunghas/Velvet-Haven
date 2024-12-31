import BedIcon from "@/asset/icon/bed-outline.svg";
import calendar from "@/asset/icon/calendar.svg";
import downline from "@/asset/icon/down-line.svg";
import iconuser from "@/asset/icon/icon_user.svg";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const LandingSearchForm = () => {
  return (
    <div className="bg-primaryblue dark:bg-foreground p-1 flex items-center gap-1 rounded-md max-sm:flex-col max-sm:gap-3 max-sm:p-4 max-sm:bg-white max-sm:bg-opacity-50  max-sm:drop-shadow-xl max-md:gap-2 max-md:p-2 max-md:bg-opacity-50 max-md:bg-white max-md:drop-shadow-xl max-md:flex-col max-md:items-center  max-md:rounded-md">
      <div className=" bg-white dark:bg-bannerbg flex items-center gap-2 p-3 pr-4 rounded-md max-sm:w-full max-sm:py-5 max-md:w-full">
        <Image
          src={BedIcon}
          alt="bed icon"
          className="w-8 h-8  dark:rounded-full size-6 dark:filter dark:invert dark:brightness-0 dark:p-1"
        />
        <span className=" font-medium text-base">Where are you going?</span>
      </div>
      <div className=" bg-white dark:bg-bannerbg flex items-center gap-2 p-3 pr-4 rounded-md max-sm:w-full max-sm:py-5 max-md:w-full">
        <Image
          src={calendar}
          alt="bed icon"
          className="w-8 h-8  dark:rounded-full size-6 dark:filter dark:invert dark:brightness-0 dark:p-1"
        />
        <span className=" font-medium text-base">Check in date</span>
        <span className=" font-medium text-base">-</span>
        <span className=" font-medium text-base">Check Out date </span>
      </div>
      <div className=" bg-white dark:bg-bannerbg flex items-center gap-2 p-3 pr-4 rounded-md max-sm:w-full max-sm:pr-2 max-md:w-full">
        <Image
          src={iconuser}
          alt="bed icon"
          className="w-8 h-8  dark:rounded-full size-6 dark:filter dark:invert dark:brightness-0 dark:p-1"
        />
        <span className=" font-medium text-base inline-block mx-1">2 adults </span>
        <span className=" font-medium text-base inline-block mx-1">0 children</span>
        <span className=" font-medium text-base inline-block mx-1">1 room </span>
        <Image
          src={downline}
          alt="bed icon"
          className="w-5 h-5 ml-14 max-sm:mr-0 max-sm:ml-16 dark:filter dark:invert dark:brightness-0 max-md:mr-4 max-md:ml-32 "
        />
      </div>
      <Button className=" bg-white dark:bg-bannerbg text-primaryblue dark:text-white text-base font-semibold h-full px-8 py-[18px] dark:shadow-xl dark:hover:bg-foreground duration-2000 max-sm:w-full max-sm:py-[22px] max-md:w-full ">
        Search
      </Button>
    </div>
  );
};

export default LandingSearchForm;
