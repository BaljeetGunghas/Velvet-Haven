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
      <style>{`
        [data-state="open"] {
          z-index: 50 !important;
        }

        [data-radix-popover-content] {
          z-index: 50 !important;
          pointer-events: auto;
        }
      `}</style>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full px-4 py-3 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700/50 flex items-center gap-3 justify-start text-left font-normal text-gray-900 dark:text-white border border-gray-200 dark:border-slate-600 rounded-lg hover:border-accent-gold/50 hover:shadow-md hover:shadow-accent-gold/10 transition-all duration-300 cursor-pointer"
          )}
        >
          <CalendarIcon className="w-5 h-5 text-accent-gold flex-shrink-0" />
          <span className="text-sm md:text-base font-medium flex-1">
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

      <PopoverContent className="p-0 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 relative z-50 overflow-visible w-auto" align="start" side="bottom" sideOffset={12} avoidCollisions={true}>
        <style>{`
          /* Premium Luxury Calendar Range Styling */
          .rdr-calendar {
            background: white;
            border: none;
            font-family: inherit;
            font-size: 14px;
            line-height: 1.5;
            padding: 1rem;
          }

          .rdr-months {
            padding: 0.5rem 1rem;
            gap: 1.5rem;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
          }

          .rdr-month {
            width: auto;
            min-width: 280px;
          }

          .rdr-month-and-year {
            padding: 0.75rem 1rem;
            background: linear-gradient(135deg, #103F36 0%, #0a2a22 100%);
            border-radius: 0.75rem;
            margin-bottom: 1rem;
            color: white;
            font-family: 'Playfair Display', serif;
            font-size: 1rem;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-align: center;
          }

          .rdr-weekdays {
            padding: 0.5rem 0 0.75rem 0;
            margin-bottom: 0.5rem;
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 0;
          }

          .rdr-weekday {
            color: #103F36;
            font-weight: 700;
            font-size: 0.7rem;
            letter-spacing: 1px;
            text-transform: uppercase;
            width: 2rem;
            height: 2rem;
            line-height: 2rem;
            text-align: center;
          }

          .rdr-week {
            padding: 0.25rem 0;
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 2px;
          }

          .rdr-day {
            width: 2rem;
            height: 2rem;
            font-weight: 500;
            font-size: 0.8rem;
            text-align: center;
            padding: 0;
          }

          .rdr-day-number {
            width: 2rem;
            height: 2rem;
            line-height: 2rem;
            color: #4b5563;
            border-radius: 0.5rem;
            transition: all 0.2s ease-out;
            display: inline-block;
            cursor: pointer;
          }

          .rdr-day:not(.rdr-day--disabled) .rdr-day-number:hover {
            background-color: #C9A66B;
            color: white;
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(201, 166, 107, 0.3);
          }

          .rdr-day--selected .rdr-day-number,
          .rdr-day--range-start .rdr-day-number,
          .rdr-day--range-end .rdr-day-number {
            background: linear-gradient(135deg, #103F36 0%, #0a2a22 100%);
            color: white;
            font-weight: 700;
            border: 2px solid #C9A66B;
          }

          .rdr-day--in-range .rdr-day-number {
            background: linear-gradient(135deg, rgba(201, 166, 107, 0.2) 0%, rgba(201, 166, 107, 0.1) 100%);
            color: #103F36;
            border-radius: 0.25rem;
            border: none;
          }

          .rdr-day--today .rdr-day-number {
            border: 2px solid #C9A66B;
            color: #103F36;
            font-weight: 700;
            background: linear-gradient(135deg, rgba(201, 166, 107, 0.15) 0%, rgba(201, 166, 107, 0.08) 100%);
          }

          .rdr-day--disabled .rdr-day-number {
            color: #d1d5db;
            background: transparent;
            opacity: 0.3;
            cursor: not-allowed;
          }

          .rdr-day--today.rdr-day--disabled .rdr-day-number {
            border-color: #d1d5db;
            opacity: 0.3;
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
            box-shadow: 0 0 0 3px rgba(201, 166, 107, 0.15);
          }

          .rdr-next-btn,
          .rdr-prev-btn {
            border: 1px solid #e5e7eb;
            background: white;
            width: 2rem;
            height: 2rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.5rem;
            transition: all 0.2s;
            color: #103F36;
            font-weight: 700;
            font-size: 1rem;
          }

          .rdr-next-btn:hover,
          .rdr-prev-btn:hover {
            background: rgba(201, 166, 107, 0.15);
            color: #C9A66B;
            border-color: #C9A66B;
          }

          .rdr-btn {
            background: transparent;
            border: 1px solid #e5e7eb;
            color: #103F36;
            font-weight: 600;
            cursor: pointer;
            border-radius: 0.5rem;
            padding: 0.375rem 0.75rem;
            transition: all 0.2s;
            font-size: 0.75rem;
          }

          .rdr-btn:hover {
            background: rgba(201, 166, 107, 0.1);
            border-color: #C9A66B;
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
            color: #cbd5e1;
          }

          .dark .rdr-day:not(.rdr-day--disabled) .rdr-day-number:hover {
            color: white;
          }

          .dark .rdr-input {
            background: #0f172a;
            border-color: #334155;
            color: #e2e8f0;
          }

          .dark .rdr-next-btn,
          .dark .rdr-prev-btn {
            background: #334155;
            border-color: #475569;
            color: #cbd5e1;
          }

          .dark .rdr-next-btn:hover,
          .dark .rdr-prev-btn:hover {
            background: rgba(201, 166, 107, 0.2);
            border-color: #C9A66B;
            color: #C9A66B;
          }

          .dark .rdr-btn {
            background: transparent;
            border-color: #475569;
            color: #cbd5e1;
          }

          .dark .rdr-btn:hover {
            background: rgba(201, 166, 107, 0.15);
            border-color: #C9A66B;
            color: #C9A66B;
          }
        `}</style>

        <DateRange
          ranges={[dateRange]}
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          months={isMobile ? 1 : 2}
          direction={isMobile ? "vertical" : "horizontal"}
          preventSnapRefocus={true}
          minDate={new Date()}
          rangeColors={["#103F36"]}
          className="w-full relative z-50"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
