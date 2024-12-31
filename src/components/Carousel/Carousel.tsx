"use client";
import Image, { StaticImageData } from "next/image";
import logo from "@/asset/logo.svg";
import React, { useEffect, useRef, useState } from "react";

interface Testimonial {
  id: number;
  feedback: string;
  name: string;
  image: StaticImageData;
}

const TestimonialCarousel = ({
  testimonials,
}: {
  testimonials: Testimonial[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const updateIndex = (newIndex: number) => {
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${
        (currentIndex * 100) / 4
      }%)`;
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-blue-100 via-white to-gray-50 py-10 dark:bg-gradient-to-b dark:from-gray-900 dark:via-black dark:to-forground">
      {/* Carousel container */}
      <h4 className="text-base font-medium text-center">
        {
          "Don't just take our word for it—hear from our satisfied guests who have experienced the magic of Velvet-Haven."
        }
      </h4>
      <br />
      <div
        ref={carouselRef}
        className="flex transition-transform duration-500 ease-in-out"
        style={{ width: `${(testimonials.length * 100) / 5}%` }}
      >
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex-shrink-0 w-1/7 p-6 max-sm:w-1/2 hover:scale-105 transform transition-transform duration-300 "
          >
            <div className="h-full bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700">
              <Image
                src={testimonial.image || logo}
                alt={testimonial.name}
                width={80}
                height={80}
                className="rounded-full mb-6 border-4 border-blue-500"
              />
              <p className="text-gray-600 dark:text-gray-300 italic mb-6 text-sm leading-relaxed">
                {`"${testimonial.feedback}"`}
              </p>
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                {testimonial.name}
              </h3>
              <span className="text-sm text-gray-400 dark:text-gray-500">
                Verified Guest
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`${
              currentIndex === index ? "bg-blue-600" : "bg-blue-200"
            } w-3 h-3 max-sm:size-2 rounded-full focus:outline-none`}
            onClick={() => updateIndex(index)}
          />
        ))}
      </div>

      {/* Navigation controls */}
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
        <button
          className="p-3 max-sm:px-2 max-sm:py-0 max-sm:pb-1 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg focus:outline-none"
          onClick={() =>
            updateIndex(
              currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
            )
          }
        >
          &larr;
        </button>
      </div>
      <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
        <button
          className="p-3 max-sm:px-2 max-sm:py-0 max-sm:pb-1 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg focus:outline-none"
          onClick={() =>
            updateIndex(
              currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1
            )
          }
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
