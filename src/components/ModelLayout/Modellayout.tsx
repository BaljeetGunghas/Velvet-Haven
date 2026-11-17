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
        className="relative bg-white dark:bg-gray-800  shadow-lg p-3 max-sm:px-1 w-full max-w-5xl max-sm:w-11/12 h-4/5 top-8 max-sm:h-fit max-sm:top-0 md:h-fit"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          className="absolute top-3 right-3 rounded-full size-10 flex items-center justify-center border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 hover:text-primary-green dark:hover:text-accent-gold transition-all duration-300 z-50"
          onClick={() => onClose(false)}
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
