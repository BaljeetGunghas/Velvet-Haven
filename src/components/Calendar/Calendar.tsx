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
            "w-full bg-gray-100 flex items-center gap-2 justify-start text-left font-normal text-gray-900",
          )}
        >
          <CalendarIcon className="w-5 h-5 text-gray-500" />
          {date ? format(date, "PPP") : <span>Select Date of Birth</span>}
        </Button>
      </PopoverTrigger>

      {/* Wrapper to handle overlapping */}
      <div className="relative">
        <PopoverContent className="w-auto p-0 min-w-[250px] z-50" align="start">
          <DatePicker
            selected={date}
            onChange={(date) => handleDateChange(date as Date | undefined)}
            maxDate={new Date()} // Restrict future dates
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            dateFormat="MMMM dd, yyyy"
            className="w-full px-3 py-2 border rounded-md dark:bg-foreground"
          />
        </PopoverContent>
      </div>
    </Popover>
  );
};
