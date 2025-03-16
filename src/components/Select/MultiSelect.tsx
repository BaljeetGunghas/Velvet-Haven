"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export interface Options {
  value: string | number;
  label: string;
}

interface MultiSelectProps {
  value: (string | number)[];
  setValue: (val: (string | number)[]) => void;
  option: Options[];
  label: string;
}

export const MultiSelect = ({
  value,
  setValue,
  option,
  label,
}: MultiSelectProps) => {
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(
    value || []
  );

  useEffect(() => {
    setSelectedValues(value);
  }, [value]);

  const handleSelectChange = (selectedValue: string) => {
    setSelectedValues((prev) => {
      const newValues = prev.includes(selectedValue)
        ? prev.filter((val) => val !== selectedValue) // Remove if already selected
        : [...prev, selectedValue]; // Add new value

      setValue(newValues);
      return newValues;
    });
  };

  const removeSelectedItem = (item: string | number) => {
    const newValues = selectedValues.filter((val) => val !== item);
    if (newValues.length === 0) {
      setValue([]);
      setSelectedValues([]);
    } else {
      setSelectedValues(newValues);
      setValue(newValues);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-black dark:text-white">
        {label}
      </label>

      {/* Dropdown */}

      <Select key={selectedValues.join(",")} onValueChange={handleSelectChange}>
          <SelectTrigger className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3 h-auto flex-wrap cursor-pointer">
            <div className="flex flex-wrap items-center gap-2 w-full">
              {selectedValues.length > 0 ? (
                selectedValues.map((item) => {
                  const selectedItem = option.find(
                    (o) => String(o.value) === String(item)
                  );
                  return (
                    <Badge
                      key={item}
                      className="flex items-center gap-1 px-2 py-1 bg-gray-200 text-black relative"
                    >
                      {selectedItem?.label}
                      <X
                        size={12}
                        className="cursor-pointer hover:bg-red-500 hover:text-white bg-white rounded-full text-red-500 h-4 w-4 p-0.5 absolute -top-2 -right-2"
                        onPointerDown={(e) => {
                          e.preventDefault();
                          removeSelectedItem(item);
                        }}
                      />
                    </Badge>
                  );
                })
              )
                :
                <div className="flex items-center gap-2 w-full">
                  <span className="text-gray-500">Select an option</span>
                </div>
              }
            </div>
          </SelectTrigger>

          <SelectContent className="bg-white dark:bg-foreground">
            <SelectGroup>
              <SelectLabel>Select Option</SelectLabel>
              {option
                .filter((o) => !selectedValues.includes(o.value)) // Remove selected values from list
                .map((o) => (
                  <SelectItem key={o.value} value={String(o.value)}>
                    {o.label}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
      </Select>
    </div>
  );
};


