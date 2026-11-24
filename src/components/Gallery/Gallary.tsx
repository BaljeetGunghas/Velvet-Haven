"use client";

import Image from "next/image";
import React, { FC, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes, FaExpand } from "react-icons/fa";
import noImage from "@/asset/no-image.jpg";
import { motion } from "framer-motion";

interface ComponentProps {
    images: string[];
}

const Gallery: FC<ComponentProps> = ({ images }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openModal = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const closeModal = () => setIsOpen(false);

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images?.length);

    const prevImage = () =>
        setCurrentIndex((prev) => (prev - 1 + images?.length) % images?.length);

    // Handle keyboard navigation
    React.useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "ArrowRight") nextImage();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    // Container animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <div className="w-full">
            <motion.div
                className="flex flex-col gap-3 sm:gap-4 md:gap-5"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {/* Hero Image - Main Gallery Hero */}
                <motion.div
                    variants={itemVariants}
                    className="relative group overflow-hidden rounded-3xl md:rounded-4xl shadow-2xl hover:shadow-2xl hover:shadow-accent-gold/50 transition-all duration-500 cursor-pointer border border-white/20 dark:border-slate-700/50"
                >
                    <div className="relative bg-gradient-to-b from-gray-100 to-gray-50 dark:from-slate-800 dark:to-slate-700">
                        <Image
                            width={1000}
                            height={600}
                            src={images?.length > 0 ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${images[0]}` : noImage}
                            alt="Premium Room Image"
                            className="w-full h-40 sm:h-52 md:h-80 lg:h-96 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            onClick={() => images?.length > 0 && openModal(0)}
                            priority
                        />
                    </div>

                    {/* Luxury Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Premium Expand Button */}
                    <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => images?.length > 0 && openModal(0)}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                        <div className="bg-gradient-to-br from-accent-gold to-accent-gold/80 text-primary-green p-4 md:p-5 lg:p-6 rounded-full shadow-2xl shadow-accent-gold/60 hover:scale-125 transition-transform border border-accent-gold/60">
                            <FaExpand className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
                        </div>
                    </motion.button>

                    {/* Image Counter Badge */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="absolute top-4 left-4 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-primary-green px-5 py-2.5 rounded-full text-xs md:text-sm font-bold shadow-lg border border-accent-gold/70 backdrop-blur-sm"
                    >
                        1 / {images?.length}
                    </motion.div>
                </motion.div>

                {/* Middle Grid - Premium Layout */}
                {images?.length > 2 && (
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5"
                    >
                        {images.slice(1, -1).map((img, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -12, scale: 1.02 }}
                                className="relative group overflow-hidden rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-accent-gold/50 transition-all duration-500 cursor-pointer border border-white/20 dark:border-slate-700/50"
                            >
                                <div className="relative bg-gradient-to-b from-gray-100 to-gray-50 dark:from-slate-800 dark:to-slate-700">
                                    <Image
                                        width={250}
                                        height={200}
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${img}`}
                                        alt={`Gallery Image ${index + 2}`}
                                        className="w-full h-32 sm:h-40 md:h-56 object-cover group-hover:scale-120 transition-transform duration-700 ease-out"
                                        loading="lazy"
                                        onClick={() => openModal(index + 1)}
                                    />
                                </div>

                                {/* Overlay with Icon */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <motion.div
                                        whileHover={{ scale: 1.25 }}
                                        className="bg-gradient-to-br from-accent-gold to-accent-gold/80 text-primary-green p-3 md:p-4 rounded-full shadow-xl shadow-accent-gold/60 border border-accent-gold/60"
                                    >
                                        <FaExpand className="w-5 h-5 md:w-6 md:h-6" />
                                    </motion.div>
                                </div>

                                {/* Image Number */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    className="absolute top-2 md:top-3 right-2 md:right-3 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-primary-green px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-lg border border-accent-gold/70 backdrop-blur-sm"
                                >
                                    {index + 2}
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Last Image - Full Width Hero */}
                {images?.length > 1 && (
                    <motion.div
                        variants={itemVariants}
                        className="relative group overflow-hidden rounded-3xl md:rounded-4xl shadow-2xl hover:shadow-2xl hover:shadow-accent-gold/50 transition-all duration-500 cursor-pointer border border-white/20 dark:border-slate-700/50"
                    >
                        <div className="relative bg-gradient-to-b from-gray-100 to-gray-50 dark:from-slate-800 dark:to-slate-700">
                            <Image
                                width={1000}
                                height={600}
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${images[images.length - 1]}`}
                                alt="Premium Room Gallery"
                                className="w-full h-40 sm:h-52 md:h-80 lg:h-96 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                loading="lazy"
                                onClick={() => openModal(images.length - 1)}
                            />
                        </div>

                        {/* Luxury Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Expand Button */}
                        <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openModal(images.length - 1)}
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                            <div className="bg-gradient-to-br from-accent-gold to-accent-gold/80 text-primary-green p-4 md:p-5 lg:p-6 rounded-full shadow-2xl shadow-accent-gold/60 hover:scale-125 transition-transform border border-accent-gold/60">
                                <FaExpand className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
                            </div>
                        </motion.button>

                        {/* Image Counter */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="absolute top-4 left-4 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-primary-green px-5 py-2.5 rounded-full text-xs md:text-sm font-bold shadow-lg border border-accent-gold/70 backdrop-blur-sm"
                        >
                            {images?.length} / {images?.length}
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>

            {/* Gallery Modal - Card Style with Transparent Background */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={closeModal}
                    className="fixed inset-0 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center z-50 p-3 sm:p-4 md:p-6"
                >
                    {/* Card Container with Premium Design */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ duration: 0.4 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-4xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl md:rounded-4xl shadow-2xl shadow-black/40 overflow-hidden border border-white/30 dark:border-slate-700/50"
                    >
                        {/* Close Button - Top Right */}
                        <motion.button
                            whileHover={{ scale: 1.15, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                closeModal();
                            }}
                            className="absolute top-4 right-4 z-30 bg-gradient-to-br from-accent-gold to-accent-gold/80 hover:from-accent-gold/90 hover:to-accent-gold text-primary-green p-2.5 md:p-3 rounded-full min-w-[44px] min-h-[44px] md:min-w-[52px] md:min-h-[52px] flex items-center justify-center text-xl md:text-2xl transition-all duration-300 hover:shadow-lg hover:shadow-accent-gold/60 border border-accent-gold/60 font-bold"
                            aria-label="Close gallery"
                            title="Close (ESC)"
                        >
                            <FaTimes />
                        </motion.button>

                        {/* Image Counter - Top Left */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="absolute top-4 left-4 z-30 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-primary-green px-4 py-2 rounded-full text-xs md:text-sm font-bold shadow-lg border border-accent-gold/60"
                        >
                            {currentIndex + 1} / {images.length}
                        </motion.div>

                        {/* Main Image Container */}
                        <div className="relative w-full flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50 dark:from-slate-800 dark:to-slate-900 p-4 md:p-6">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="relative w-full flex justify-center"
                            >
                                <Image
                                    width={1400}
                                    height={1000}
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${images[currentIndex]}`}
                                    alt={`Room Gallery ${currentIndex + 1}`}
                                    className="w-full h-auto max-h-[60vh] object-contain rounded-2xl shadow-lg"
                                    priority
                                />
                            </motion.div>

                            {/* Navigation Arrows */}
                            {images.length > 1 && (
                                <>
                                    <motion.button
                                        whileHover={{ scale: 1.15, x: -4 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            prevImage();
                                        }}
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-accent-gold/70 to-accent-gold/50 hover:from-accent-gold/90 hover:to-accent-gold/80 text-primary-green p-2.5 md:p-3 rounded-full min-w-[44px] min-h-[44px] md:min-w-[52px] md:min-h-[52px] flex items-center justify-center text-lg md:text-2xl transition-all duration-300 hover:shadow-lg hover:shadow-accent-gold/50 border border-accent-gold/70 font-bold"
                                        aria-label="Previous image"
                                        title="Previous (← Arrow)"
                                    >
                                        <FaChevronLeft />
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.15, x: 4 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            nextImage();
                                        }}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-accent-gold/70 to-accent-gold/50 hover:from-accent-gold/90 hover:to-accent-gold/80 text-primary-green p-2.5 md:p-3 rounded-full min-w-[44px] min-h-[44px] md:min-w-[52px] md:min-h-[52px] flex items-center justify-center text-lg md:text-2xl transition-all duration-300 hover:shadow-lg hover:shadow-accent-gold/50 border border-accent-gold/70 font-bold"
                                        aria-label="Next image"
                                        title="Next (→ Arrow)"
                                    >
                                        <FaChevronRight />
                                    </motion.button>
                                </>
                            )}
                        </div>

                        {/* Bottom Info Bar */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-full px-4 md:px-6 py-4 bg-gradient-to-r from-primary-green/5 to-accent-gold/5 dark:from-slate-800/50 dark:to-slate-700/50 border-t border-gray-200/50 dark:border-slate-700/50 text-center"
                        >
                            <p className="text-gray-700 dark:text-gray-300 text-xs md:text-sm font-semibold flex items-center justify-center gap-4 flex-wrap">
                                <span className="flex items-center gap-2">
                                    <span className="text-accent-gold font-bold">ESC</span>
                                    <span>to close</span>
                                </span>
                                <span className="text-accent-gold">•</span>
                                <span className="flex items-center gap-2">
                                    <span className="text-accent-gold font-bold">←→</span>
                                    <span>to navigate</span>
                                </span>
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default Gallery;
