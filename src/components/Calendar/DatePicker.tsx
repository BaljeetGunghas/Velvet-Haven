"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  dateRange: Range;
  setDate: React.Dispatch<React.SetStateAction<Range>>;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  dateRange,
  setDate,
}) => {



  const [isMobile, setIsMobile] = useState(false);

  // 🛠 Ensure this runs only on the client side
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize); // Listen to resize events

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);


  const handleSelect = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    setDate({
      startDate: startDate || new Date(),
      endDate: endDate || new Date(),
      key: "selection",
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full sm:w-[300px] px-3 py-2 justify-start text-left font-normal rounded-md border-none outline-none shadow-none",
            !dateRange?.startDate && "text-muted-foreground"
          )}
        >
          {dateRange?.startDate && dateRange?.endDate ? (
            <span className="font-medium text-base">
              {format(dateRange?.startDate, "LLL dd, y")} -{" "}
              {format(dateRange?.endDate, "LLL dd, y")}
            </span>
          ) : (
            <span className="font-medium text-base">
              Check-in date - Check-out date
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 bg-white rounded-lg shadow-lg  sm:w-auto relative z-50 ">
        <DateRange
          ranges={
            dateRange.startDate
              ? [dateRange]
              : [
                  {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: "selection",
                  },
                ]
          }
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          months={isMobile ? 1 : 2} // ✅ Responsive: 1 month for mobile, 2 for larger screens
      direction={isMobile ? "vertical" : "horizontal"} // ✅ Vertical for mobile, horizontal for larger screens
          preventSnapRefocus
          minDate={new Date()}
          className="w-full relative z-50"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
