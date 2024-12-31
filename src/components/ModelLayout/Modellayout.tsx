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
      className="fixed inset-0 flex justify-center bg-black bg-opacity-50 z-50"
      onClick={() => onClose(false)}
    >
      <div
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md h-4/5 top-8"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
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
