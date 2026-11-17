"use client";

import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ComponentProps {
  date: Date | undefined;
  setDate: (val: Date) => void;
}

export const CalendarComponent = ({ date, setDate }: ComponentProps) => {
  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full px-4 py-3 bg-gradient-to-br from-slate-50 to-slate-50/50 dark:from-slate-700/50 dark:to-slate-700/30 flex items-center gap-3 justify-start text-left font-normal text-gray-900 dark:text-white border border-gray-200 dark:border-slate-600 rounded-lg hover:border-accent-gold/50 hover:shadow-md hover:shadow-accent-gold/10 transition-all duration-300",
          )}
        >
          <CalendarIcon className="w-5 h-5 text-accent-gold flex-shrink-0" />
          <span className="text-sm md:text-base">
            {date ? format(date, "dd MMM yyyy") : "Select Date of Birth"}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0 z-50 shadow-lg border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden" align="start">
        <DatePicker
          selected={date}
          onChange={(date) => handleDateChange(date as Date | undefined)}
          maxDate={new Date()}
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          dateFormat="dd MMM yyyy"
          inline
        />
      </PopoverContent>
    </Popover>
  );
};
