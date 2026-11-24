"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: number;
  feedback: string;
  name: string;
  title: string;
  image: any;
  rating: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = testimonials.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Automatic slide navigation
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  if (!totalSlides) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      className="w-full max-w-6xl mx-auto min-w-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Content */}
      <div className="w-full min-w-0 px-0 sm:px-2 lg:px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial.id}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full min-w-0"
          >
            {/* Testimonial Card */}
            <article
              className="
                w-full
                min-w-0
                min-h-[300px]
                sm:min-h-[310px]
                lg:min-h-[320px]
                flex flex-col
                justify-between
                rounded-2xl
                border border-gray-200
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
                p-5
                sm:p-6
                lg:p-7
                shadow-lg
                shadow-slate-900/5
                hover:shadow-xl
                transition-all
                duration-300
              "
            >
              {/* Top Content */}
              <div className="w-full min-w-0">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from(
                    { length: currentTestimonial.rating },
                    (_, index) => (
                      <span
                        key={index}
                        className="text-accent-gold text-lg sm:text-xl leading-none"
                      >
                        ★
                      </span>
                    )
                  )}
                </div>

                {/* Review Text */}
                <p
                  className="
                    block
                    w-full
                    min-w-0
                    max-w-full
                    text-sm
                    sm:text-base
                    leading-relaxed
                    font-normal
                    italic
                    text-gray-700
                    dark:text-gray-300
                    whitespace-normal
                    break-words
                  "
                  style={{
                    overflowWrap: "anywhere",
                    wordBreak: "normal",
                    whiteSpace: "normal",
                  }}
                >
                  "{currentTestimonial.feedback}"
                </p>
              </div>

              {/* Bottom Guest Information */}
              <div className="w-full mt-6 sm:mt-8">
                {/* Gold Divider */}
                <div className="w-12 h-1 rounded-full bg-gradient-to-r from-accent-gold to-accent-gold/20 mb-5" />

                <div className="flex items-center gap-3 min-w-0">
                  {/* Avatar */}
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full overflow-hidden border-2 border-accent-gold/30">
                    <Image
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>

                  {/* Guest Details */}
                  <div className="flex flex-col min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-semibold text-primary-green dark:text-white break-words">
                      {currentTestimonial.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-accent-gold mt-0.5 break-words">
                      {currentTestimonial.title}
                    </p>
                  </div>

                  {/* Verified Icon */}
                  <div className="shrink-0 w-6 h-6 rounded-full bg-accent-gold text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                </div>
              </div>
            </article>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Controls */}
      <div className="flex items-center justify-between mt-7 sm:mt-9">
        {/* Previous / Next */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="
              w-11 h-11 sm:w-12 sm:h-12
              rounded-full
              bg-gradient-to-br
              from-primary-green
              to-primary-green/80
              text-white
              flex items-center justify-center
              text-2xl
              shadow-lg
              hover:from-primary-green/90
              hover:to-primary-green/70
              hover:scale-105
              active:scale-95
              transition-all
              duration-300
            "
          >
            ‹
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="
              w-11 h-11 sm:w-12 sm:h-12
              rounded-full
              bg-gradient-to-br
              from-accent-gold/50
              to-accent-gold/40
              text-primary-green
              flex items-center justify-center
              text-2xl
              shadow-lg
              hover:from-accent-gold/70
              hover:to-accent-gold/60
              hover:scale-105
              active:scale-95
              transition-all
              duration-300
            "
          >
            ›
          </button>
        </div>

        {/* Slide Indicator */}
        <div className="flex items-center gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`
                h-2.5 rounded-full transition-all duration-300
                ${
                  currentIndex === index
                    ? "w-8 sm:w-10 bg-accent-gold"
                    : "w-2.5 bg-accent-gold/30 hover:bg-accent-gold/60"
                }
              `}
            />
          ))}
        </div>

        {/* Autoplay Status */}
        <button
          onClick={() => setIsPaused((prev) => !prev)}
          className="hidden sm:flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
          aria-label={isPaused ? "Resume autoplay" : "Pause autoplay"}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isPaused ? "bg-gray-400" : "bg-accent-gold animate-pulse"
            }`}
          />
          {isPaused ? "Paused" : "Auto"}
        </button>
      </div>

      {/* Slide Counter */}
      <div className="text-center mt-6 sm:mt-7">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-accent-gold">
            {currentIndex + 1}
          </span>
          {" / "}
          {totalSlides} slides
        </p>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
