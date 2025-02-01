"use client";

import * as React from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";



interface ComponentProps {
    date: DateRange | undefined;
    setDate: (val: DateRange | undefined) => void;
  }
export const DatePickerWithRange = ({ date, setDate }: ComponentProps) => {
//   const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal border-none outline-none shadow-none",
              !date &&
                "text-muted-foreground border-none outline-none shadow-none"
            )}
          >
            {/* <CalendarIcon /> */}
            {date?.from ? (
              date.to ? (
                <span className="font-medium text-base">
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </span>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span className="font-medium text-base">
                Check in date - Check Out date
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-white dark:bg-foreground"
          align="start"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
