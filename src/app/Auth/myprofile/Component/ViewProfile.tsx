"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import userImage from "@/asset/dummy/user1.jpg";
import { X } from "lucide-react";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import { UserProfileData } from "@/app/store/Profile/userProfileSlice";
import dayjs from "dayjs";
import EmailVerify from "@/components/EmailVerify/EmailVerify";

const ViewProfile = () => {
  const { error, userDetails } = useSelector(
    (state: RootState) => state.userProfile
  );

  const [isAccountVerified, setIsAccountVerified] = React.useState<boolean>(
    userDetails?.isVerified ? !userDetails?.isVerified : false
  );
  const [isAccountVerifiedModelOpen, setIsAccountVerifiedModelOpen] =
    React.useState<boolean>(false);

  const [userProfileData, setUserProfileData] =
    React.useState<UserProfileData | null>(null);

  useEffect(() => {
    if (userDetails) {
      setUserProfileData(userDetails);
      setIsAccountVerified(userDetails.isVerified);
    }
  }, [userDetails]);

  if (error) {
    throw new Error("Error");
  }

  return (
    <div className="h-full w-full ">
      <div className="h-32 w-full items-center p-2">
        <Image
          src={userImage}
          alt="user"
          className="h-full mx-auto w-28 rounded-full object-cover"
          loading="lazy"
        />
      </div>
      <h2 className="text-base font-semibold text-foreground text-center dark:text-white">
        {userDetails?.name ?? "Not Provided"}
      </h2>

      {!isAccountVerified && (
        <div className="w-full sm:w-10/12 mx-auto bg-yellow-200 text-yellow-900 py-2 mt-2 px-2 sm:px-6 relative flex items-center justify-start sm:justify-center">
          <p className="text-sm font-semibold">
            Your account is not verified.{" "}
            <span
              onClick={() => setIsAccountVerifiedModelOpen(true)}
              className="text-blue-600 cursor-pointer underline"
            >
              Verify Now
            </span>
          </p>

          <button
            className="absolute top-2 right-4 text-yellow-900 hover:text-yellow-700"
            onClick={() => setIsAccountVerified(true)}
          >
            <X size={18} />
          </button>

          <div className="absolute -top-4 left-1/2 transform rotate-180 -translate-x-1/2 border-8 border-transparent border-t-yellow-200"></div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 px-0 sm:px-16 my-6 gap-5">
        <div className="flex gap-1 flex-col ">
          <label className=" text-sm font-semibold text-black dark:text-white ">
            Email{" "}
          </label>
          <p className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3">
            {userDetails?.email ?? "Not Provided"}
          </p>
        </div>
        <div className="flex gap-1 flex-col ">
          <label className=" text-sm font-semibold text-black dark:text-white ">
            Mobile{" "}
          </label>
          <p className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3">
            {userProfileData?.phone_number ?? "Not Provided"}
          </p>
        </div>
        <div className="flex gap-1 flex-col ">
          <label className=" text-sm font-semibold text-black dark:text-white ">
            Date of birth{" "}
          </label>
          <p className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3">
            {userProfileData?.date_of_birth
              ? dayjs(userProfileData?.date_of_birth)
                  .locale("en")
                  .format("DD-MMM-YYYY")
              : "Not Provided"}
          </p>
        </div>
        <div className="flex gap-1 flex-col ">
          <label className=" text-sm font-semibold text-black dark:text-white ">
            Role{" "}
          </label>
          <p className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3">
            {userProfileData?.role ?? "Not Provided"}
          </p>
        </div>
        <div className="flex gap-1 flex-col ">
          <label className=" text-sm font-semibold text-black dark:text-white ">
            Created At{" "}
          </label>
          <p className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3">
            {dayjs(userProfileData?.createdAt)
              .locale("en")
              .format("DD-MMM-YYYY HH:mm:ss")}
          </p>
        </div>
        <div className="flex gap-1 flex-col ">
          <label className=" text-sm font-semibold text-black dark:text-white ">
            Updated At{" "}
          </label>
          <p className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3">
            {dayjs(userProfileData?.updatedAt)
              .locale("en")
              .format("DD-MMM-YYYY HH:mm:ss")}
          </p>
        </div>

        <div className="flex gap-1 flex-col ">
          <label className=" text-sm font-semibold text-black dark:text-white ">
            Profile Status{" "}
          </label>
          <p className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3">
            {userProfileData?.status ?? "Not Provided"}
          </p>
        </div>
      </div>

      {isAccountVerifiedModelOpen &&<EmailVerify
        isOpen={isAccountVerifiedModelOpen}
        onClose={setIsAccountVerifiedModelOpen}
      />}
    </div>
  );
};

export default ViewProfile;
