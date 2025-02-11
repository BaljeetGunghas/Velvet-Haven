import React from "react";

interface SelectPersonAndRoomProps {
  rooms: number;
  adults: number;
  Children: number;
  setRooms: (value: number) => void;
  setAdults: (value: number) => void;
  setChildren: (value: number) => void;
  isOpen: boolean;
  onClose: (val: boolean) => void;
}

const SelectPersonAndRoom: React.FC<SelectPersonAndRoomProps> = ({
  rooms,
  adults,
  Children,
  setRooms,
  setAdults,
  setChildren,
  isOpen,
  onClose,
}) => {
  const maxAdults = rooms * 2;
  const maxChildren = rooms * 2;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center bg-black bg-opacity-30 z-50 max-sm:items-center"
      onClick={() => onClose(false)}
    >
      <div
        className="relative  dark:bg-gray-800  shadow-lg p-3 max-sm:px-1 w-full max-w-5xl max-sm:w-11/12 h-4/5 top-8 max-sm:h-fit max-sm:top-0 md:h-fit"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          className="absolute top-2 right-2 rounded-full size-6 border-[1.5px] border-black dark:border-white dark:text-white max-sm:dark:text-black text-base p-0 m-0 text-gray-500 hover:text-gray-800 dark:hover:text-white max-sm:bg-white"
          onClick={() => onClose(false)}
        >
          &times;
        </button>
        <div className="p-6 bg-transparent rounded-xl w-96 shadow-lg border border-gray-200 mx-auto my-5 bg-white dark:bg-gray-800 p-3 rounded-lg">
          {/* Room Selection */}
          <div className="flex justify-between items-center mb-5 ">
            <span className="text-lg font-medium text-gray-700">Rooms</span>
            <div className="flex items-center gap-3">
              <button
                className="w-9 h-9 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center text-xl hover:bg-gray-300 transition"
                onClick={() => setRooms(rooms - 1)}
                disabled={rooms <= 1}
              >
                -
              </button>
              <span className="text-lg font-semibold">{rooms}</span>
              <button
                className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl hover:bg-blue-700 transition"
                onClick={() => setRooms(rooms + 1)}
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
                onClick={() => setAdults(adults - 1)}
                disabled={adults <= 1}
              >
                -
              </button>
              <span className="text-lg font-semibold">{adults}</span>
              <button
                className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl hover:bg-blue-700 transition"
                onClick={() => setAdults(adults + 1)}
                disabled={adults >= maxAdults}
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
                onClick={() => setChildren(Children - 1)}
                disabled={Children <= 0}
              >
                -
              </button>
              <span className="text-lg font-semibold">{Children}</span>
              <button
                className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl hover:bg-blue-700 transition"
                onClick={() => setChildren(Children + 1)}
                disabled={Children >= maxChildren}
              >
                +
              </button>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            className="w-full bg-blue-600 text-white px-5 py-3 rounded-lg text-lg font-semibold shadow-md transition hover:bg-blue-700"
            onClick={() => onClose(false)}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectPersonAndRoom;
