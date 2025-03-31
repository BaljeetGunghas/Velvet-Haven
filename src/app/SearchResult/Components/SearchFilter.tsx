/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { CityOptions } from "@/components/Form/CityOptions";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaLocationDot } from "react-icons/fa6";
import BedIcon from "@/asset/icon/bed-outline.svg";
import iconuser from "@/asset/icon/icon_user.svg";
import calendar from "@/asset/icon/calendar.svg";
import downline from "@/asset/icon/down-line.svg";
import DatePickerWithRange from "../../../components/Calendar/DatePicker";
import { Range } from "react-date-range";
import SelectPersonAndRoom from "@/components/SelectPersonAndRoom/SelectPersonAndRoom";
import ModalLayout from "@/components/ModelLayout/Modellayout";
import CustomSlider from "./PriceSlider";
import dayjs from "dayjs";

interface FiltersProps {
    filters: {
        city: string;
        check_in_date: string;
        check_out_date: string;
        adults: string;
        children: string;
        minPrice: string;
        maxPrice: string;
        page: string;
    };
    setfilter: (filters: FiltersProps["filters"]) => void;
    fetchRooms: (resetPage?: boolean) => void;
}

const SearchFilter: React.FC<FiltersProps> = ({ filters, setfilter, fetchRooms }) => {
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "1"; // Get page param safely

    // State Variables
    const [selectedCity, setSelectedCity] = useState<string>(filters.city || "");
    const [isSelectPersonAndRoomModelOpen, setIsSelectPersonAndRoomModelOpen] = useState<boolean>(false);
    const [personDetails, setPersonDetails] = useState({
        rooms: 1,
        adults: Number(filters.adults) || 1,
        children: Number(filters.children) || 0,
    });

    // Ensure valid date values
    const defaultDateRange: Range = {
        startDate: filters.check_in_date ? new Date(filters.check_in_date) : new Date(),
        endDate: filters.check_out_date ? new Date(filters.check_out_date) : dayjs().add(1, "day").toDate(),
        key: "selection",
    };

    const [date, setDate] = useState<Range>(defaultDateRange);

    useEffect(() => {
        if (filters.city !== selectedCity) {
            setSelectedCity(filters.city);
        }
    }, [filters.city]);

    const handlePriceChange = useCallback((val: number[]) => {
        setfilter({
            ...filters,
            minPrice: val[0].toString(),
            maxPrice: val[1].toString(),
        });
    }, [setfilter]);

    const handleApplyFilter = useCallback(() => {
        setfilter({
            ...filters,
            city: selectedCity,
            check_in_date: dayjs(date.startDate).format("YYYY-MM-DD"),
            check_out_date: dayjs(date.endDate).format("YYYY-MM-DD"),
            children: String(personDetails.children),
            adults: String(personDetails.adults),
            page: page, // Ensure page value persists
        });
        fetchRooms(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCity, date, personDetails, setfilter, fetchRooms, page]);

    return (
        <>
            <div className="flex flex-col justify-center">
                {/* City Selection */}
                <div className="bg-white dark:bg-bannerbg flex items-center rounded-md min-w-[200px] max-sm:w-full border mb-4">
                    <Image src={BedIcon} alt="bed icon" className="w-8 h-8 dark:rounded-full size-6 dark:filter dark:invert dark:brightness-0 dark:p-1" />
                    <div className="relative w-full">
                        <Select value={selectedCity} onValueChange={setSelectedCity}>
                            <SelectTrigger className="sm:min-w-48 font-medium text-base border-none shadow-none outline-none rounded-md">
                                <SelectValue placeholder="Where are you going?">
                                    {selectedCity && CityOptions().find((city) => city.value === selectedCity)?.label}
                                </SelectValue>
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
                <div className="border dark:bg-bannerbg flex items-center rounded-md max-sm:w-full mb-4 overflow-hidden">
                    <Image src={calendar} alt="calendar icon" className="w-8 h-8 dark:rounded-full size-6 dark:filter dark:invert dark:brightness-0 dark:p-1" />
                    <DatePickerWithRange dateRange={date} setDate={setDate} />
                </div>

                {/* Person & Room Selector */}
                <div onClick={() => setIsSelectPersonAndRoomModelOpen(true)} className="relative border dark:bg-bannerbg flex items-center gap-2 py-1 mb-4 rounded-md w-full cursor-pointer">
                    <Image src={iconuser} alt="user icon" className="w-8 h-8 dark:rounded-full size-6 dark:filter dark:invert dark:brightness-0 dark:p-1" />
                    <span className="font-medium text-sm">{personDetails.adults} adults</span>
                    <span className="font-medium text-sm">{personDetails.children} children</span>
                    <span className="font-medium text-sm">{personDetails.rooms} room</span>
                    <Image src={downline} alt="dropdown icon" className="w-5 h-5 dark:filter dark:invert dark:brightness-0" />
                </div>

                {/* Price Range Slider */}
                <CustomSlider min={1} max={20000} value={[+filters.minPrice, +filters.maxPrice]} onChange={handlePriceChange} />

                {/* Apply Filter Button */}
                <Button onClick={handleApplyFilter} className="bg-primaryblue text-white px-4 py-2">
                    Apply Filter
                </Button>
            </div>

            {/* Modal for Person & Room Selection */}
            <ModalLayout isOpen={isSelectPersonAndRoomModelOpen} onClose={setIsSelectPersonAndRoomModelOpen}>
                <SelectPersonAndRoom personDetails={personDetails} setPersonDetails={setPersonDetails} isOpen={isSelectPersonAndRoomModelOpen} onClose={setIsSelectPersonAndRoomModelOpen} />
            </ModalLayout>
        </>
    );
};

export default SearchFilter;
