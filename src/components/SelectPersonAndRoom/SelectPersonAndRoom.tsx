import React, { useState } from "react";

interface SelectPersonAndRoomProps {
  personDetails: {
    rooms: number;
    adults: number;
    children: number;
  }
  setPersonDetails: (details: { rooms: number; adults: number; children: number }) => void;
  isOpen: boolean;
  onClose: (val: boolean) => void;
}

const SelectPersonAndRoom: React.FC<SelectPersonAndRoomProps> = ({
  personDetails,
  setPersonDetails,
  isOpen,
  onClose,
}) => {
  const [rooms, setRooms] = useState<number>(personDetails.rooms || 1);
  const [adults, setAdults] = useState<number>(personDetails.adults || 1);
  const [children, setChildren] = useState<number>(personDetails.children || 0);

  const maxAdults = rooms * 2;
  const maxChildren = rooms * 2;

  const handleConfirm = () => {
    setPersonDetails({ rooms, adults, children });
    onClose(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center bg-black bg-opacity-30 z-50 max-sm:items-center"
      onClick={() => onClose(false)}
    >
      <div
        className="relative dark:bg-gray-800 shadow-lg p-3 max-sm:px-1 w-full max-w-5xl max-sm:w-11/12 h-4/5 top-8 max-sm:h-fit max-sm:top-0 md:h-fit"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          className="absolute top-2 right-2 rounded-full size-6 border-[1.5px] border-black dark:border-white dark:text-white text-gray-500 hover:text-gray-800 dark:hover:text-white max-sm:bg-white"
          onClick={() => onClose(false)}
        >
          &times;
        </button>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 mx-auto my-5 w-96">
          {/* Room Selection */}
          <div className="flex justify-between items-center mb-5">
            <span className="text-lg font-medium text-gray-700">Rooms</span>
            <div className="flex items-center gap-3">
              <button
                className="w-9 h-9 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center text-xl hover:bg-gray-300 transition"
                onClick={() => setRooms((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="text-lg font-semibold">{rooms}</span>
              <button
                className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl hover:bg-blue-700 transition"
                onClick={() => setRooms((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Adult Selection */}
          <div className="flex justify-between items-center mb-5">
            <span className="text-lg font-medium text-gray-700">Adults</span>
            <div className="flex items-center gap-3">
              <button
                className="w-9 h-9 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center text-xl hover:bg-gray-300 transition"
                onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                disabled={adults <= 1}
              >
                -
              </button>
              <span className="text-lg font-semibold">{adults}</span>
              <button
                className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl hover:bg-blue-700 transition"
                onClick={() => setAdults((prev) => Math.min(maxAdults, prev + 1))}
              >
                +
              </button>
            </div>
          </div>

          {/* Children Selection */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-medium text-gray-700">Children</span>
            <div className="flex items-center gap-3">
              <button
                className="w-9 h-9 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center text-xl hover:bg-gray-300 transition"
                onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                disabled={children <= 0}
              >
                -
              </button>
              <span className="text-lg font-semibold">{children}</span>
              <button
                className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl hover:bg-blue-700 transition"
                onClick={() => setChildren((prev) => Math.min(maxChildren, prev + 1))}
              >
                +
              </button>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            className="w-full bg-blue-600 text-white px-5 py-3 rounded-lg text-lg font-semibold shadow-md transition hover:bg-blue-700"
            onClick={handleConfirm}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectPersonAndRoom;
