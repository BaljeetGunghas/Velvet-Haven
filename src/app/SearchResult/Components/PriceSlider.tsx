/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useRef, useEffect } from "react";

interface CustomSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  min,
  max,
  step = 500,
  value,
  onChange,
}) => {
  const [minValue, setMinValue] = useState(value[0] || 0);
  const [maxValue, setMaxValue] = useState(value[1] || 20000);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Update external state when internal values change
  useEffect(() => {
    onChange([minValue, maxValue]);
  }, [minValue, maxValue]);

  // Convert value to percentage
  const getPercent = (val: number) => ((val - min) / (max - min)) * 100;

  // Handle dragging logic
  const handleMouseMove = (e: React.MouseEvent, isMin: boolean) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const newValue = Math.round(
      ((e.clientX - rect.left) / rect.width) * (max - min) + min
    );

    if (isMin) {
      if (newValue < maxValue - step && newValue >= min) {
        setMinValue(newValue);
      }
    } else {
      if (newValue > minValue + step && newValue <= max) {
        setMaxValue(newValue);
      }
    }
  };

  return (
    <div className="w-full p-3 rounded-md bg-gray-100 dark:bg-bannerbg dark:border shadow-md mb-4">
      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-white">Price Range</label>
      
      {/* Slider Track */}
      <div ref={sliderRef} className="relative w-full h-6 flex items-center">
        {/* Background Track */}
        <div className="absolute w-full h-1 bg-gray-300 rounded-md"></div>
        
        {/* Active Range */}
        <div
          className="absolute h-1 bg-blue-500 rounded-md"
          style={{
            left: `${getPercent(minValue)}%`,
            width: `${getPercent(maxValue) - getPercent(minValue)}%`,
          }}
        ></div>

        {/* Min Handle */}
        <div
          className="absolute w-5 h-5 bg-blue-500 rounded-full cursor-pointer border-2 border-white shadow-md"
          style={{ left: `${getPercent(minValue)}%`, transform: "translateX(-50%)" }}
          onMouseDown={(e) => {
            e.preventDefault();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const moveHandler = (event: MouseEvent) => handleMouseMove(event as any, true);
            const upHandler = () => window.removeEventListener("mousemove", moveHandler);
            window.addEventListener("mousemove", moveHandler);
            window.addEventListener("mouseup", upHandler, { once: true });
          }}
        ></div>

        {/* Max Handle */}
        <div
          className="absolute w-5 h-5 bg-blue-500 rounded-full cursor-pointer border-2 border-white shadow-md"
          style={{ left: `${getPercent(maxValue)}%`, transform: "translateX(-50%)" }}
          onMouseDown={(e) => {
            e.preventDefault();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const moveHandler = (event: MouseEvent) => handleMouseMove(event as any, false);
            const upHandler = () => window.removeEventListener("mousemove", moveHandler);
            window.addEventListener("mousemove", moveHandler);
            window.addEventListener("mouseup", upHandler, { once: true });
          }}
        ></div>
      </div>

      {/* Min & Max Value Display */}
      <div className="flex justify-between text-sm text-gray-600 dark:text-white mt-3 font-semibold">
        <span>₹{minValue}</span>
        <span>₹{maxValue}</span>
      </div>
    </div>
  );
};

export default CustomSlider;
