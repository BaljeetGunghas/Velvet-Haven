import Image from "next/image";
import React from "react";
import user from "@/asset/dummy/user1.jpg";
import { X } from "lucide-react";

const ViewProfile = () => {
  return (
    <div className="h-full w-full ">
      <div className="h-32 w-full items-center p-2">
        <Image
          src={user}
          alt="user"
          className="h-full mx-auto w-28 rounded-full object-cover"
          loading="lazy"
        />
      </div>
      <h2 className="text-base font-semibold text-foreground text-center dark:text-white">
        Jeson statham{" "}
      </h2>

      <div className="w-full sm:w-10/12 mx-auto bg-yellow-200 text-yellow-900 py-2 mt-2 px-2 sm:px-6 relative flex items-center justify-start sm:justify-center">
      <p className="text-sm font-semibold">
        Your account is not verified.{" "}
        <a href="/verify" className="text-blue-600 underline">
          Verify Now
        </a>
      </p>

      <button
        className="absolute top-2 right-4 text-yellow-900 hover:text-yellow-700"
        // onClick={() => setIsVisible(false)}
      >
        <X size={18} />
      </button>

      <div className="absolute -top-4 left-1/2 transform rotate-180 -translate-x-1/2 border-8 border-transparent border-t-yellow-200"></div>
    </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 px-0 sm:px-16 my-6 gap-5">
            <div className="flex gap-1 flex-col ">
                <label className=" text-sm font-semibold text-black dark:text-white ">Email </label>
                <p className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3">jasonstatham@gmail.com </p>
            </div>
            <div className="flex gap-1 flex-col ">
                <label className=" text-sm font-semibold text-black dark:text-white ">Mobile </label>
                <p className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3">8685007017 </p>
            </div>
            <div className="flex gap-1 flex-col ">
                <label className=" text-sm font-semibold text-black dark:text-white ">Date of birth </label>
                <p className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3">10-05-1997 </p>
            </div>
            <div className="flex gap-1 flex-col ">
                <label className=" text-sm font-semibold text-black dark:text-white ">Role </label>
                <p className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3">Customer </p>
            </div>
            <div className="flex gap-1 flex-col ">
                <label className=" text-sm font-semibold text-black dark:text-white ">Created At </label>
                <p className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3">23-12-2024 </p>
            </div>
           
            <div className="flex gap-1 flex-col ">
                <label className=" text-sm font-semibold text-black dark:text-white ">Profile Status </label>
                <p className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3">Active </p>
            </div>
           
      </div>
    </div>
  );
};

export default ViewProfile;
