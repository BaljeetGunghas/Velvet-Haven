import React from "react";

interface SelectPersonAndRoomProps {
  rooms: number;
  adults: number;
  Children: number;
  setRooms: (value: number) => void;
  setAdults: (value: number) => void;
  setChildren: (value: number) => void;
  onConfirm: () => void;
}

const SelectPersonAndRoom: React.FC<SelectPersonAndRoomProps> = ({
  rooms,
  adults,
  Children,
  setRooms,
  setAdults,
  setChildren,
  onConfirm,
}) => {
  const maxAdults = rooms * 2;
  const maxChildren = rooms * 2;

  return (
    <div className="p-6 bg-white rounded-xl w-96 shadow-lg border border-gray-200 mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Select Guests & Rooms
      </h2>
    
      {/* Room Selection */}
      <div className="flex justify-between items-center mb-5">
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
        onClick={onConfirm}
      >
        OK
      </button>
    </div>
  );
};

export default SelectPersonAndRoom;
