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
            <div className="flex flex-col justify-center space-y-5">
                {/* City Selection */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400">Destination</label>
                    <div className="bg-gray-50 dark:bg-slate-700/50 flex items-center rounded-lg border border-gray-200 dark:border-slate-700 focus-within:border-accent-gold/50 focus-within:bg-white dark:focus-within:bg-slate-800 transition-colors duration-300 min-w-[200px] max-sm:w-full">
                        <Image src={BedIcon} alt="bed icon" className="ml-3 w-5 h-5 dark:filter dark:invert dark:brightness-0 dark:p-0.5" />
                        <div className="relative w-full">
                            <Select value={selectedCity} onValueChange={setSelectedCity}>
                                <SelectTrigger className="sm:min-w-48 font-medium text-sm border-none shadow-none outline-none rounded-lg bg-transparent">
                                    <SelectValue placeholder="Where are you going?">
                                        {selectedCity && CityOptions().find((city) => city.value === selectedCity)?.label}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-slate-800 z-50">
                                    <SelectGroup>
                                        <SelectLabel>Select City</SelectLabel>
                                        {CityOptions().map((city, i) => (
                                            <SelectItem key={city.value + i} value={city.value} className="hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer">
                                                <div className="flex gap-2 items-center p-2">
                                                    <FaLocationDot className="text-accent-gold h-4 w-4" />
                                                    <div className="flex flex-col">
                                                        <p className="text-gray-900 dark:text-white font-semibold text-sm">{city.label}</p>
                                                        <p className="font-normal text-gray-500 dark:text-gray-400 text-xs">India</p>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Date Picker */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400">Check-in & Check-out</label>
                    <div className="bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-700 focus-within:border-accent-gold/50 focus-within:bg-white dark:focus-within:bg-slate-800 transition-colors duration-300 flex items-center rounded-lg overflow-hidden">
                        <Image src={calendar} alt="calendar icon" className="ml-3 w-5 h-5 dark:filter dark:invert dark:brightness-0 dark:p-0.5" />
                        <DatePickerWithRange dateRange={date} setDate={setDate} />
                    </div>
                </div>

                {/* Person & Room Selector */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400">Guests & Rooms</label>
                    <div onClick={() => setIsSelectPersonAndRoomModelOpen(true)} className="relative bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-700 hover:border-accent-gold/50 dark:hover:border-accent-gold/40 hover:bg-white dark:hover:bg-slate-800 transition-colors duration-300 flex items-center gap-3 px-4 py-2.5 rounded-lg w-full cursor-pointer">
                        <Image src={iconuser} alt="user icon" className="w-5 h-5 dark:filter dark:invert dark:brightness-0 dark:p-0.5" />
                        <div className="flex-1">
                            <span className="font-medium text-sm text-gray-900 dark:text-white">{personDetails.adults} adult{personDetails.adults !== 1 ? 's' : ''}</span>
                            {personDetails.children > 0 && <span className="font-medium text-sm text-gray-900 dark:text-white ml-2">{personDetails.children} child{personDetails.children !== 1 ? 'ren' : ''}</span>}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{personDetails.rooms} room{personDetails.rooms !== 1 ? 's' : ''}</span>
                        <Image src={downline} alt="dropdown icon" className="w-4 h-4 dark:filter dark:invert dark:brightness-0" />
                    </div>
                </div>

                {/* Price Range Slider */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400">Price Range</label>
                    <CustomSlider min={1} max={20000} value={[+filters.minPrice, +filters.maxPrice]} onChange={handlePriceChange} />
                </div>

                {/* Apply Filter Button */}
                <Button onClick={handleApplyFilter} className="w-full bg-accent-gold text-white hover:bg-accent-gold/90 px-4 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-accent-gold/30 mt-6">
                    Apply Filters
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
