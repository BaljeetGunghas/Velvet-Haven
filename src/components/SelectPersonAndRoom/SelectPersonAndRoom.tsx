import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

interface SelectPersonAndRoomProps {
  personDetails: {
    rooms: number;
    adults: number;
    children: number;
  };
  setPersonDetails: (details: {
    rooms: number;
    adults: number;
    children: number;
  }) => void;
  isOpen: boolean;
  onClose: (val: boolean) => void;
}

const SelectPersonAndRoom: React.FC<SelectPersonAndRoomProps> = ({
  personDetails,
  setPersonDetails,
  isOpen,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);
  const [rooms, setRooms] = useState<number>(personDetails.rooms || 1);
  const [adults, setAdults] = useState<number>(personDetails.adults || 1);
  const [children, setChildren] = useState<number>(personDetails.children || 0);

  const maxAdults = rooms * 2;
  const maxChildren = rooms * 2;

  // Ensure portal is mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scrolling and sync values when opening
  useEffect(() => {
    if (!isOpen) return;

    setRooms(personDetails.rooms || 1);
    setAdults(personDetails.adults || 1);
    setChildren(personDetails.children || 0);

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, personDetails]);

  const handleConfirm = () => {
    setPersonDetails({ rooms, adults, children });
    onClose(false);
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[10000] flex items-end justify-center bg-black/60 backdrop-blur-md p-4 sm:items-center"
      onClick={() => onClose(false)}
    >
      <motion.div
        initial={{ y: 500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 500, opacity: 0 }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
          type: "spring",
          stiffness: 100,
          damping: 25,
        }}
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl border border-gray-100 bg-white p-5 sm:p-7 shadow-2xl shadow-black/40 dark:border-slate-600/60 dark:bg-slate-700/95 dark:shadow-primary-green/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => onClose(false)}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-all hover:border-accent-gold hover:text-accent-gold dark:border-slate-600 dark:text-gray-400 dark:hover:border-accent-gold dark:hover:text-accent-gold"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Header */}
        <h3 className="mb-6 text-lg font-semibold text-primary-green dark:text-white">
          Guests & Rooms
        </h3>

        {/* Adults */}
        <div className="mb-5 space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Adults
          </label>
          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-slate-600 dark:bg-slate-800/50">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {adults}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                disabled={adults <= 1}
                className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 transition-all hover:border-accent-gold hover:bg-accent-gold/5 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800 dark:text-gray-400"
              >
                −
              </button>
              <button
                onClick={() =>
                  setAdults((prev) => Math.min(maxAdults, prev + 1))
                }
                disabled={adults >= maxAdults}
                className="flex h-8 w-8 items-center justify-center rounded border border-accent-gold bg-accent-gold/10 text-accent-gold transition-all hover:bg-accent-gold/20 disabled:opacity-40 dark:bg-accent-gold/20"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Children */}
        <div className="mb-5 space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Children
          </label>
          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-slate-600 dark:bg-slate-800/50">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {children}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                disabled={children <= 0}
                className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 transition-all hover:border-accent-gold hover:bg-accent-gold/5 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800 dark:text-gray-400"
              >
                −
              </button>
              <button
                onClick={() =>
                  setChildren((prev) => Math.min(maxChildren, prev + 1))
                }
                disabled={children >= maxChildren}
                className="flex h-8 w-8 items-center justify-center rounded border border-accent-gold bg-accent-gold/10 text-accent-gold transition-all hover:bg-accent-gold/20 disabled:opacity-40 dark:bg-accent-gold/20"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Rooms */}
        <div className="mb-6 space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Rooms
          </label>
          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-slate-600 dark:bg-slate-800/50">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {rooms}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const nextRooms = Math.max(1, rooms - 1);
                  setRooms(nextRooms);
                  setAdults((prev) => Math.min(prev, nextRooms * 2));
                  setChildren((prev) => Math.min(prev, nextRooms * 2));
                }}
                disabled={rooms <= 1}
                className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 transition-all hover:border-accent-gold hover:bg-accent-gold/5 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800 dark:text-gray-400"
              >
                −
              </button>
              <button
                onClick={() => setRooms((prev) => prev + 1)}
                className="flex h-8 w-8 items-center justify-center rounded border border-accent-gold bg-accent-gold/10 text-accent-gold transition-all hover:bg-accent-gold/20 dark:bg-accent-gold/20"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Confirm */}
        <button
          onClick={handleConfirm}
          className="w-full rounded-lg bg-accent-gold px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-accent-gold/90 hover:shadow-xl hover:shadow-accent-gold/40 sm:text-base"
        >
          Confirm Selection
        </button>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default SelectPersonAndRoom;
