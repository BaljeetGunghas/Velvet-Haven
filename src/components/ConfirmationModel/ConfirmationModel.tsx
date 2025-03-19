"use client";

import Image from "next/image";
import React from "react";
import deleteImage from "@/asset/icon/delete.webp";
import { Button } from "../ui/button";
import ButtonLoading from "../Loading/ButtonLoading";

interface ModalLayoutProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: (val: boolean) => void;
  handleExicutefunction: () => void;
  loading: boolean;
}
const ConfirmationModel = ({ children, isOpen, onClose,handleExicutefunction,loading }: ModalLayoutProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center bg-black bg-opacity-70 z-50 max-sm:items-center"
      onClick={() => onClose(false)}
    >
      <div
        className="relative bg-white dark:bg-gray-800 shadow-lg p-3 max-sm:px-3 w-11/12 md:w-1/3 rounded-md h-4/5 top-8 max-sm:h-fit max-sm:top-0 md:h-fit"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          className="absolute top-2 right-2 rounded-full size-6 border-[1.5px] border-black dark:border-white dark:text-white max-sm:dark:text-black text-base p-0 m-0 text-gray-500 hover:text-gray-800 dark:hover:text-white max-sm:bg-white"
          onClick={() => onClose(false)}
        >
          &times;
        </button>
        <div className="flex flex-col items-center justify-center">
          <Image src={deleteImage} alt="logo" width={150} height={150} />
          <h1 className="text-md text-center font-semibold text-gray-800 dark:text-white">
            Are you sure you want to{" "}
            <span className="font-bold text-red-400">{children}</span> ?
          </h1>

          <div className="flex justify-center gap-4 mt-4">
            <Button
              className="rounded bg-slate-50 hover:bg-slate-200 text-black "
              onClick={() => onClose(false)}
            >
              No, Cancel
            </Button>
            <Button
              className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px
                -4 rounded"
              onClick={() => handleExicutefunction()}
              disabled={loading}
            >
              {loading ? <><ButtonLoading /> <span>Deleting... </span></>  :"Yes, Confirm"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModel;
