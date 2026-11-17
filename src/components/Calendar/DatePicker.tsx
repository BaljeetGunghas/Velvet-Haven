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
import { CalendarIcon } from "lucide-react";

interface DateRangePickerProps {
  dateRange: Range;
  setDate: React.Dispatch<React.SetStateAction<Range>>;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  dateRange,
  setDate,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
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
            "w-full px-4 py-3 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700/50 flex items-center gap-3 justify-start text-left font-normal text-gray-900 dark:text-white border border-gray-200 dark:border-slate-600 rounded-lg hover:border-accent-gold/50 hover:shadow-md hover:shadow-accent-gold/10 transition-all duration-300",
            !dateRange?.startDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="w-5 h-5 text-accent-gold flex-shrink-0" />
          <span className="text-sm md:text-base font-medium">
            {dateRange?.startDate && dateRange?.endDate ? (
              <>
                <span className="text-gray-700 dark:text-gray-300">{format(dateRange.startDate, "dd MMM")}</span>
                <span className="text-gray-400 dark:text-gray-500 mx-2">→</span>
                <span className="text-gray-700 dark:text-gray-300">{format(dateRange.endDate, "dd MMM")}</span>
              </>
            ) : (
              <span className="text-gray-500 dark:text-gray-400">Check-in → Check-out</span>
            )}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 relative z-50 overflow-hidden" align="start">
        <style>{`
          /* Premium Luxury Calendar Range Styling */
          .rdr-calendar {
            background: white;
            border: none;
            font-family: inherit;
          }

          .rdr-months {
            padding: 1.5rem;
            gap: 2rem;
          }

          .rdr-month {
            width: 100%;
          }

          .rdr-month-and-year {
            padding: 1rem;
            background: linear-gradient(135deg, #103F36 0%, #0a2a22 100%);
            border-radius: 0.75rem;
            margin-bottom: 1rem;
            color: white;
            font-family: 'Playfair Display', serif;
            font-size: 1.1rem;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-align: center;
          }

          .rdr-weekdays {
            padding: 0.75rem 0;
            margin-bottom: 0.75rem;
          }

          .rdr-weekday {
            color: #103F36;
            font-weight: 700;
            font-size: 0.75rem;
            letter-spacing: 1px;
            text-transform: uppercase;
            width: 2.5rem;
            height: 2.5rem;
            line-height: 2.5rem;
          }

          .rdr-week {
            padding: 0.25rem 0;
          }

          .rdr-day {
            width: 2.5rem;
            height: 2.5rem;
            font-weight: 500;
            font-size: 0.85rem;
          }

          .rdr-day-number {
            width: 2.5rem;
            height: 2.5rem;
            line-height: 2.5rem;
            color: #4b5563;
            border-radius: 0.625rem;
            transition: all 0.2s ease-out;
          }

          .rdr-day:not(.rdr-day--disabled) .rdr-day-number:hover {
            background-color: #C9A66B;
            color: white;
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(201, 166, 107, 0.2);
          }

          .rdr-day--selected .rdr-day-number,
          .rdr-day--range-start .rdr-day-number,
          .rdr-day--range-end .rdr-day-number {
            background: linear-gradient(135deg, #103F36 0%, #0a2a22 100%);
            color: white;
            font-weight: 700;
            border: 2px solid #C9A66B;
          }

          .rdr-day--range-start .rdr-day-number,
          .rdr-day--range-end .rdr-day-number {
            border-radius: 0.75rem;
          }

          .rdr-day--in-range .rdr-day-number {
            background: linear-gradient(135deg, rgba(201, 166, 107, 0.15) 0%, rgba(201, 166, 107, 0.08) 100%);
            color: #103F36;
            border-radius: 0.375rem;
          }

          .rdr-day--today .rdr-day-number {
            border: 2px solid #C9A66B;
            color: #103F36;
            font-weight: 700;
            background: linear-gradient(135deg, rgba(201, 166, 107, 0.1) 0%, rgba(201, 166, 107, 0.05) 100%);
          }

          .rdr-day--disabled .rdr-day-number {
            color: #d1d5db;
            background: transparent;
            opacity: 0.4;
            cursor: not-allowed;
          }

          .rdr-day--today.rdr-day--disabled .rdr-day-number {
            border-color: #d1d5db;
            opacity: 0.4;
          }

          .rdr-input {
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            padding: 0.5rem 0.75rem;
            font-size: 0.875rem;
            color: #103F36;
            font-weight: 600;
            transition: all 0.2s;
          }

          .rdr-input:focus {
            outline: none;
            border-color: #C9A66B;
            box-shadow: 0 0 0 3px rgba(201, 166, 107, 0.1);
          }

          .rdr-next-btn,
          .rdr-prev-btn {
            border: none;
            background: transparent;
            width: 2rem;
            height: 2rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.5rem;
            transition: all 0.2s;
            color: #103F36;
          }

          .rdr-next-btn:hover,
          .rdr-prev-btn:hover {
            background: rgba(201, 166, 107, 0.15);
            color: #C9A66B;
          }

          .rdr-btn {
            background: transparent;
            border: none;
            color: #103F36;
            font-weight: 600;
            cursor: pointer;
            border-radius: 0.5rem;
            padding: 0.375rem 0.75rem;
            transition: all 0.2s;
            font-size: 0.875rem;
          }

          .rdr-btn:hover {
            background: rgba(201, 166, 107, 0.1);
          }

          /* Dark mode support */
          .dark .rdr-calendar {
            background: #1e293b;
          }

          .dark .rdr-month-and-year {
            background: linear-gradient(135deg, #103F36 0%, #0a2a22 100%);
          }

          .dark .rdr-weekday {
            color: #103F36;
          }

          .dark .rdr-day-number {
            color: #94a3b8;
          }

          .dark .rdr-day-number:hover {
            color: white;
          }

          .dark .rdr-input {
            background: #0f172a;
            border-color: #334155;
            color: #e2e8f0;
          }
        `}</style>

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
          months={isMobile ? 1 : 2}
          direction={isMobile ? "vertical" : "horizontal"}
          preventSnapRefocus
          minDate={new Date()}
          className="w-full relative z-50"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
