import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Options {
  value: string;
  label: string;
}

interface ComponentProps {
  value: string;
  setValue: (val: string) => void;
  option: Options[];
  label: string;
}

export const SingleSelect = ({
  value,
  setValue,
  option,
  label,
}: ComponentProps) => {
  return (
    <div className="flex gap-1 flex-col ">
      <label className=" text-sm font-semibold text-black dark:text-white ">
        {label}{" "}
      </label>
      <Select value={value} onValueChange={(e) => setValue(e)}>
        <SelectTrigger className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3">
          <SelectValue placeholder="Select Option" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-foreground">
          <SelectGroup>
            <SelectLabel>Select Option</SelectLabel>
            {option.map((o: Options) => {
              return (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
