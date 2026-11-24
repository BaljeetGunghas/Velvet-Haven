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
    <div className="w-full space-y-3">
      {/* Slider Track */}
      <div ref={sliderRef} className="relative w-full h-2 flex items-center">
        {/* Background Track */}
        <div className="absolute w-full h-2 bg-gray-200 dark:bg-slate-700/50 rounded-full"></div>

        {/* Active Range - Gold Gradient */}
        <div
          className="absolute h-2 bg-gradient-to-r from-accent-gold to-accent-gold/70 rounded-full shadow-md shadow-accent-gold/30"
          style={{
            left: `${getPercent(minValue)}%`,
            width: `${getPercent(maxValue) - getPercent(minValue)}%`,
          }}
        ></div>

        {/* Min Handle */}
        <div
          className="absolute w-6 h-6 bg-gradient-to-br from-accent-gold to-accent-gold/90 rounded-full cursor-pointer border-2 border-white shadow-lg shadow-accent-gold/40 hover:scale-125 transition-transform"
          style={{ left: `${getPercent(minValue)}%`, transform: "translateX(-50%)" }}
          onMouseDown={(e) => handleStart(e, true)}
          onTouchStart={(e) => handleStart(e, true)}
        ></div>

        {/* Max Handle */}
        <div
          className="absolute w-6 h-6 bg-gradient-to-br from-accent-gold to-accent-gold/90 rounded-full cursor-pointer border-2 border-white shadow-lg shadow-accent-gold/40 hover:scale-125 transition-transform"
          style={{ left: `${getPercent(maxValue)}%`, transform: "translateX(-50%)" }}
          onMouseDown={(e) => handleStart(e, false)}
          onTouchStart={(e) => handleStart(e, false)}
        ></div>
      </div>

      {/* Price Display */}
      <div className="flex justify-between items-center bg-gradient-to-r from-accent-gold/5 to-accent-gold/10 dark:from-slate-700/30 dark:to-slate-700/20 rounded-lg p-3 border border-accent-gold/20 dark:border-accent-gold/30">
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">Min</span>
          <span className="text-lg font-playfair font-bold text-accent-gold">₹{minValue.toLocaleString('en-IN')}</span>
        </div>
        <div className="text-gray-400 dark:text-gray-500">—</div>
        <div className="flex flex-col text-right">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">Max</span>
          <span className="text-lg font-playfair font-bold text-accent-gold">₹{maxValue.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};

export default CustomSlider;
