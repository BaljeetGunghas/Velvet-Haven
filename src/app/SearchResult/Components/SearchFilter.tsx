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
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaLocationDot } from "react-icons/fa6";
import { MapPin, Users, ChevronDown } from "lucide-react";
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
            <div className="flex flex-col justify-center space-y-6">
                {/* City Selection */}
                <div className="space-y-2.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-gray-700 dark:text-gray-300">Destination</label>
                    <div className="min-w-0 flex items-center gap-2 sm:gap-3 bg-white dark:bg-slate-700/80 rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 border border-gray-200 dark:border-slate-600 transition-all duration-300 hover:border-accent-gold/50 dark:hover:border-accent-gold/60 focus-within:border-accent-gold dark:focus-within:border-accent-gold focus-within:ring-2 focus-within:ring-accent-gold/20 min-h-[44px] sm:min-h-[48px] md:min-h-[52px]">
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-accent-gold" />
                        <div className="relative flex-1 min-w-0 flex items-center">
                            <Select value={selectedCity} onValueChange={setSelectedCity}>
                                <SelectTrigger className="border-none shadow-none outline-none p-0 text-sm font-medium text-gray-700 dark:text-white placeholder:text-gray-500 h-auto w-full flex-1 [&>svg]:hidden">
                                    <SelectValue placeholder="Where are you going?">
                                        {selectedCity && CityOptions().find((city) => city.value === selectedCity)?.label}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-slate-900 z-50 border border-gray-200 dark:border-slate-700 rounded-xl shadow-lg">
                                    <SelectGroup>
                                        <SelectLabel className="text-gray-500 dark:text-gray-400 px-4 py-2 text-xs font-semibold uppercase tracking-wider">Select City</SelectLabel>
                                        {CityOptions().map((city, i) => (
                                            <SelectItem key={city.value + i} value={city.value} className="hover:bg-accent-gold/10 dark:hover:bg-slate-800 cursor-pointer focus:bg-accent-gold/10 py-3 px-4">
                                                <div className="flex gap-3 items-center">
                                                    <FaLocationDot className="text-primary-green h-5 w-5 flex-shrink-0 opacity-100" />
                                                    <div className="flex flex-col gap-0.5">
                                                        <p className="text-gray-900 dark:text-white font-semibold text-sm">{city.label}</p>
                                                        <p className="font-normal text-xs text-gray-500 dark:text-gray-400">India</p>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-accent-gold pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Date Picker */}
                <div className="space-y-2.5 relative z-50">
                    <label className="text-xs font-semibold uppercase tracking-widest text-gray-700 dark:text-gray-300">Check-in & Check-out</label>
                    <DatePickerWithRange dateRange={date} setDate={setDate} />
                </div>

                {/* Person & Room Selector */}
                <div className="space-y-2.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-gray-700 dark:text-gray-300">Guests & Rooms</label>
                    <div
                        onClick={() => setIsSelectPersonAndRoomModelOpen(true)}
                        className="min-w-0 flex items-center gap-2 sm:gap-3 bg-white dark:bg-slate-700/80 rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 border border-gray-200 dark:border-slate-600 transition-all duration-300 hover:border-accent-gold/50 dark:hover:border-accent-gold/60 focus-within:border-accent-gold dark:focus-within:border-accent-gold focus-within:ring-2 focus-within:ring-accent-gold/20 cursor-pointer hover:shadow-md dark:hover:shadow-accent-gold/20 min-h-[44px] sm:min-h-[48px] md:min-h-[52px]"
                    >
                        <Users className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-accent-gold" />
                        <span className="flex-1 min-w-0 overflow-hidden text-sm font-medium text-gray-700 dark:text-white">
                            {personDetails.adults + personDetails.children > 0 &&
                                `${personDetails.adults}A, ${personDetails.children}C | ${personDetails.rooms}R`}
                            {personDetails.adults + personDetails.children === 0 &&
                                "1A, 0C | 1R"}
                        </span>
                        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-accent-gold" />
                    </div>
                </div>

                {/* Price Range Slider */}
                <div className="space-y-2.5 pt-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-gray-700 dark:text-gray-300">Price Range</label>
                    <CustomSlider min={1} max={20000} value={[+filters.minPrice, +filters.maxPrice]} onChange={handlePriceChange} />
                </div>

                {/* Apply Filter Button - Premium */}
                <Button onClick={handleApplyFilter} className="w-full bg-gradient-to-r from-accent-gold to-accent-gold/90 hover:from-accent-gold/95 hover:to-accent-gold/85 text-white px-4 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-accent-gold/30 mt-8 text-base">
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
