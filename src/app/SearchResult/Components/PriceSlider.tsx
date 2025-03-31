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
  const [minValue, setMinValue] = useState(value[0] || 1);
  const [maxValue, setMaxValue] = useState(value[1] || 20000);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onChange([minValue, maxValue]);
  }, [minValue, maxValue]);

  const getPercent = (val: number) => ((val - min) / (max - min)) * 100;

  const handleMove = (e: MouseEvent | TouchEvent, isMin: boolean) => {
    if (!sliderRef.current) return;

    let clientX: number;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }

    const rect = sliderRef.current.getBoundingClientRect();
    const newValue = Math.round(
      ((clientX - rect.left) / rect.width) * (max - min) + min
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

  const handleStart = (e: React.MouseEvent | React.TouchEvent, isMin: boolean) => {
    e.preventDefault();

    const moveHandler = (event: MouseEvent | TouchEvent) => handleMove(event, isMin);
    const upHandler = () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseup", upHandler);
      window.removeEventListener("touchmove", moveHandler);
      window.removeEventListener("touchend", upHandler);
    };

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseup", upHandler);
    window.addEventListener("touchmove", moveHandler);
    window.addEventListener("touchend", upHandler);
  };

  return (
    <div className="w-full p-3 rounded-md bg-gray-100 dark:bg-bannerbg dark:border shadow-md mb-4">
      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-white">
        Price Range
      </label>

      {/* Slider Track */}
      <div ref={sliderRef} className="relative w-full h-6 flex items-center">
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
          onMouseDown={(e) => handleStart(e, true)}
          onTouchStart={(e) => handleStart(e, true)}
        ></div>

        {/* Max Handle */}
        <div
          className="absolute w-5 h-5 bg-blue-500 rounded-full cursor-pointer border-2 border-white shadow-md"
          style={{ left: `${getPercent(maxValue)}%`, transform: "translateX(-50%)" }}
          onMouseDown={(e) => handleStart(e, false)}
          onTouchStart={(e) => handleStart(e, false)}
        ></div>
      </div>

      <div className="flex justify-between text-sm text-gray-600 dark:text-white mt-3 font-semibold">
        <span>₹{minValue}</span>
        <span>₹{maxValue}</span>
      </div>
    </div>
  );
};

export default CustomSlider;
