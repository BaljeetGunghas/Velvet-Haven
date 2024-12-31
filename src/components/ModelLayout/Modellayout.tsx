"use client";

import React from "react";

interface ModalLayoutProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: (val: boolean) => void;
}

const ModalLayout = ({ children, isOpen, onClose }: ModalLayoutProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center bg-black bg-opacity-70 z-50 max-sm:items-center"
      onClick={() => onClose(false)}
    >
      <div
        className="relative bg-white dark:bg-gray-800  shadow-lg p-3 w-full max-w-5xl h-4/5 top-8 max-sm:h-fit max-sm:top-0 md:h-fit"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          className="absolute top-2 right-2 rounded-full size-6 border-[1.5px] border-black dark:border-white dark:text-white max-sm:dark:text-black text-base p-0 m-0 text-gray-500 hover:text-gray-800 dark:hover:text-white max-sm:bg-white"
          onClick={() => onClose(false)}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
