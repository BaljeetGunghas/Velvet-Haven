"use client";

import Image from "next/image";
import React, { FC, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import noImage from "@/asset/no-image.jpg";

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

    return (
        <div className="w-full">
            <div className=" flex flex-col gap-2">
                {/* First Image - Full Width */}
                <Image
                    width={600}
                    height={400}
                    src={images?.length > 0 ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${images[0]}` : noImage}
                    alt="First Room Image"
                    className={`rounded-2xl w-full h-40 ${images?.length > 0 ? 'md:h-72' : 'md:h-auto'}  object-cover cursor-pointer`}
                    loading="lazy"
                    onClick={() => images?.length > 0 && openModal(0)}
                />

                {/* Middle Images - Scrollable Row on Mobile */}
                {images?.length > 2 && (
                    <div className="flex gap-4 overflow-x-auto py-1 justify-start scrollbar-hide">
                        {images.slice(1, -1).map((img, index) => (
                            <Image
                                key={index}
                                width={120}
                                height={80}
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${img}`}
                                alt={`Room Image ${index + 1}`}
                                className="rounded-md h-24 md:h-full w-32 md:w-[32%] object-cover cursor-pointer"
                                loading="lazy"
                                onClick={() => openModal(index + 1)}
                            />
                        ))}
                    </div>
                )}

                {/* Last Image - Full Width */}
                {images?.length > 1 && (
                    <Image
                        width={600}
                        height={400}
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${images[images.length - 1]}`}
                        alt="Last Room Image"
                        className="rounded-2xl w-full h-40 md:h-72 object-cover cursor-pointer"
                        loading="lazy"
                        onClick={() => openModal(images.length - 1)}
                    />
                )}
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative">
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-white text-2xl bg-gray-800 p-2 rounded-full"
                            onClick={closeModal}
                        >
                            <FaTimes />
                        </button>

                        {/* Image Display */}
                        <Image
                            width={800}
                            height={600}
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${images[currentIndex]}`}
                            alt="Room Image"
                            className="max-w-full max-h-[80vh] rounded-lg"
                        />

                        {/* Left & Right Navigation */}
                        {images.length > 1 && (
                            <>
                                <button
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full text-white text-xl"
                                    onClick={prevImage}
                                >
                                    <FaChevronLeft />
                                </button>
                                <button
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full text-white text-xl"
                                    onClick={nextImage}
                                >
                                    <FaChevronRight />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
