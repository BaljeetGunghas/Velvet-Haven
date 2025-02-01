// "use client";

// import React from "react";

// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// interface ComponentProps {
//   date: Date | undefined;
//   setDate: (val: Date) => void;
// }
// export const CalendarComponent = ({ date, setDate }: ComponentProps) => {
//   const handleDateChage = (selectedDate: Date | undefined) => {
//     if (selectedDate) {
//       setDate(selectedDate);
//     }
//   };

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant={"outline"}
//           className={cn(
//             "w-full bg-gray-100 justify-start text-left font-normal text-gray-900",
//             !date && "text-muted-foreground w-full bg-gray-100 text-gray-900 "
//           )}
//         >
//           <CalendarIcon />
//           {date ? format(date, "PPP") : <span>Select Date of Birth</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0" align="start">
//         <Calendar
//           mode="single"
//           selected={date}
//           onSelect={handleDateChage}
//           initialFocus
//           className="z-50 relative w-full bg-white dark:bg-foreground"
//         />
//       </PopoverContent>
//     </Popover>
//   );
// };
