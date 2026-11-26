"use client";

import Image from "next/image";
import React, { FC, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import noImage from "@/asset/no-image.jpg";

interface ComponentProps {
  images: string[];
}

const HotelGallery: FC<ComponentProps> = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % (images?.length || 1));

  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + (images?.length || 1)) % (images?.length || 1));

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-slate-800 dark:to-slate-700 rounded-3xl flex items-center justify-center border border-gray-200 dark:border-slate-700">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Premium Gallery Grid - 60/40 Layout Desktop, Responsive Mobile */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Main Large Image - 60% on desktop, full-width on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -8 }}
          className="w-full md:w-3/5 relative group overflow-hidden rounded-3xl cursor-pointer shadow-xl md:shadow-2xl"
          onClick={() => openModal(0)}
        >
          <div className="relative h-72 md:h-96 lg:h-full min-h-96">
            <Image
              width={1200}
              height={800}
              src={images?.length > 0 ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${images[0]}` : noImage}
              alt="Hotel Main Image"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out rounded-3xl"
              priority
            />
          </div>

          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

          {/* View Gallery Button - Premium Style */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-6 py-3 rounded-2xl shadow-2xl">
              <Eye className="w-5 h-5 text-accent-gold" />
              <span className="font-semibold text-primary-green">View Gallery</span>
            </div>
          </motion.div>

          {/* Image Counter Badge - Premium */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-6 right-6 bg-white/90 backdrop-blur-md text-primary-green px-4 py-2 rounded-full text-sm font-bold shadow-lg border border-accent-gold/30"
          >
            1 / {images.length}
          </motion.div>
        </motion.div>

        {/* Secondary Images Grid - 40% on desktop, full-width on mobile */}
        <div className="w-full md:w-2/5 grid grid-cols-2 gap-3 md:gap-4">
          {/* Top-left secondary image */}
          {images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="relative group overflow-hidden rounded-2xl cursor-pointer shadow-lg h-44 md:h-48"
              onClick={() => openModal(1)}
            >
              <Image
                width={500}
                height={400}
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${images[1]}`}
                alt={`Hotel Image 2`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out rounded-2xl"
                loading="lazy"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                <div className="text-white text-center">
                  <Eye className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm font-semibold">View</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Top-right secondary image */}
          {images.length > 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              whileHover={{ y: -4 }}
              className="relative group overflow-hidden rounded-2xl cursor-pointer shadow-lg h-44 md:h-48"
              onClick={() => openModal(2)}
            >
              <Image
                width={500}
                height={400}
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${images[2]}`}
                alt={`Hotel Image 3`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out rounded-2xl"
                loading="lazy"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                <div className="text-white text-center">
                  <Eye className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm font-semibold">View</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Bottom-left secondary image */}
          {images.length > 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="relative group overflow-hidden rounded-2xl cursor-pointer shadow-lg h-44 md:h-48"
              onClick={() => openModal(3)}
            >
              <Image
                width={500}
                height={400}
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${images[3]}`}
                alt={`Hotel Image 4`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out rounded-2xl"
                loading="lazy"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                <div className="text-white text-center">
                  <Eye className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm font-semibold">View</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Bottom-right: More photos or next image */}
          {images.length > 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              whileHover={{ y: -4 }}
              className="relative group overflow-hidden rounded-2xl cursor-pointer shadow-lg h-44 md:h-48 bg-gradient-to-br from-accent-gold/20 via-primary-green/10 to-accent-gold/10 dark:from-accent-gold/10 dark:via-primary-green/5 dark:to-accent-gold/5 flex items-center justify-center border border-accent-gold/30"
              onClick={() => openModal(4)}
            >
              {images.length > 5 ? (
                <>
                  <div className="text-center">
                    <div className="text-3xl font-playfair font-bold text-accent-gold mb-1">
                      +{images.length - 4}
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary-green dark:text-accent-gold">
                      More Photos
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 to-primary-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </>
              ) : (
                <>
                  <Image
                    width={500}
                    height={400}
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${images[4]}`}
                    alt={`Hotel Image 5`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out rounded-2xl"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                    <div className="text-white text-center">
                      <Eye className="w-6 h-6 mx-auto mb-2" />
                      <p className="text-sm font-semibold">View</p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Photo Info Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-r from-accent-gold/5 to-primary-green/5 dark:from-slate-800/50 dark:to-slate-700/30 px-6 py-4 md:py-5 rounded-2xl border border-accent-gold/20 dark:border-slate-700/50 gap-4"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">
            Photo Gallery
          </p>
          <p className="text-base font-semibold text-primary-green dark:text-white">
            {images.length} {images.length === 1 ? "Image" : "Images"}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openModal(0)}
          className="flex items-center gap-2 bg-gradient-to-r from-accent-gold to-accent-gold/90 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-accent-gold/30 transition-all text-sm font-semibold shadow-md"
        >
          <Eye className="w-4 h-4" />
          View All Photos
        </motion.button>
      </motion.div>

      {/* Premium Modal Lightbox */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            {/* Lightbox Controls - Top Bar */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent px-6 py-6 flex justify-between items-center z-20">
              {/* Counter */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-white"
              >
                <span className="text-sm font-semibold">
                  {currentIndex + 1} of {images.length}
                </span>
              </motion.div>

              {/* Close Button - Premium */}
              <motion.button
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="text-white bg-white/15 hover:bg-white/25 backdrop-blur-md p-3 rounded-full transition-all border border-white/20"
                onClick={closeModal}
                aria-label="Close gallery"
              >
                <FaTimes className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Main Image - Premium Display */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <Image
                width={1400}
                height={900}
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${images[currentIndex]}`}
                alt="Hotel Image"
                className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />
            </motion.div>

            {/* Navigation Buttons - Premium Styling */}
            {images.length > 1 && (
              <>
                {/* Previous Button */}
                <motion.button
                  whileHover={{ scale: 1.2, x: -4 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/15 hover:bg-white/25 backdrop-blur-md p-4 rounded-full text-white text-2xl transition-all border border-white/20 z-10 shadow-lg"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <FaChevronLeft />
                </motion.button>

                {/* Next Button */}
                <motion.button
                  whileHover={{ scale: 1.2, x: 4 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/15 hover:bg-white/25 backdrop-blur-md p-4 rounded-full text-white text-2xl transition-all border border-white/20 z-10 shadow-lg"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <FaChevronRight />
                </motion.button>
              </>
            )}

            {/* Bottom Thumbnail Strip - Premium */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-6">
              <div className="flex gap-3 overflow-x-auto pb-2 justify-center">
                {images.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setCurrentIndex(index)}
                    className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all ${
                      index === currentIndex
                        ? "bg-accent-gold text-white shadow-lg"
                        : "bg-white/20 text-white hover:bg-white/30 border border-white/20"
                    }`}
                  >
                    {index + 1}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HotelGallery;
