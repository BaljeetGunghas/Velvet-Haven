"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import userImage from "@/asset/dummy/user1.jpg";
import verifiedImage from "@/asset/icon/verified.svg";
import { X } from "lucide-react";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import EmailVerify from "@/components/EmailVerify/EmailVerify";
import axios from "axios";
import { authHeader } from "../../AuthHeader/authHeader";
import { toast } from "react-toastify";
import UserProfileSkeleton from "./UserProfileSkeleton";

const ViewProfile = () => {
  const { error, userDetails } = useSelector(
    (state: RootState) => state.userProfile
  );
  const [isMounted, setIsMounted] = useState(false);
  const [isAccountVerifiedModelOpen, setIsAccountVerifiedModelOpen] =
    useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sendEmailVerificationToken = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/verfication-email-token-send`,
      {},
      {
        headers: authHeader(),
      }
    );

    const responseData = response.data;

    if (responseData.output === 1) {
      return toast.success(responseData.message);
    }
  };

  if (error) {
    throw new Error(error);
  }

  // 🚨 Prevent SSR mismatch
  if (!isMounted) return null;

  return !userDetails ? (
    <UserProfileSkeleton />
  ) : (
    <div className="h-full w-full">
      <div className="h-32 w-full items-center p-2">
        <Image
          src={
            userDetails?.profile_picture
              ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${userDetails.profile_picture}`
              : userImage
          }
          alt="user"
          className="h-full mx-auto w-28 rounded-full object-cover shadow-xl"
          loading="lazy"
          width={'200'}
          height={'200'}
        />
      </div>
      <h2 className="text-base font-semibold text-foreground text-center dark:text-white">
        {userDetails?.name ?? "Not Provided"}
        {userDetails?.isVerified && (
          <Image
            src={verifiedImage}
            alt="verifiedImage"
            className="h-full ml-1 mb-1 w-5 inline-block rounded-full object-cover"
            loading="lazy"
          />
        )}
      </h2>

      {!userDetails?.isVerified && (
        <div className="w-full sm:w-10/12 mx-auto bg-yellow-200 text-yellow-900 py-2 mt-2 px-2 sm:px-6 relative flex items-center justify-start sm:justify-center">
          <p className="text-sm font-semibold">
            Your account is not verified.{" "}
            <span
              onClick={async () => {
                setIsAccountVerifiedModelOpen(true);
                await sendEmailVerificationToken();
              }}
              className="text-blue-600 cursor-pointer underline"
            >
              Verify Now
            </span>
          </p>

          <button
            className="absolute top-2 right-4 text-yellow-900 hover:text-yellow-700"
            onClick={() => setIsAccountVerifiedModelOpen(false)}
          >
            <X size={18} />
          </button>

          <div className="absolute -top-4 left-1/2 transform rotate-180 -translate-x-1/2 border-8 border-transparent border-t-yellow-200"></div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 px-0 sm:px-16 my-6 gap-5">
        <div className="flex gap-1 flex-col">
          <label className="text-sm font-semibold text-black dark:text-white">
            Email
          </label>
          <p className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3">
            {userDetails?.email ?? "Not Provided"}
          </p>
        </div>
        <div className="flex gap-1 flex-col">
          <label className="text-sm font-semibold text-black dark:text-white">
            Mobile
          </label>
          <p className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3">
            {userDetails?.phone_number ?? "Not Provided"}
          </p>
        </div>
        <div className="flex gap-1 flex-col">
          <label className="text-sm font-semibold text-black dark:text-white">
            Date of Birth
          </label>
          <p className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3">
            {userDetails?.date_of_birth
              ? dayjs(userDetails.date_of_birth).format("DD-MMM-YYYY")
              : "Not Provided"}
          </p>
        </div>
        <div className="flex gap-1 flex-col">
          <label className="text-sm font-semibold text-black dark:text-white">
            Role
          </label>
          <p className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3">
            {userDetails?.role ?? "Not Provided"}
          </p>
        </div>
        <div className="flex gap-1 flex-col">
          <label className="text-sm font-semibold text-black dark:text-white">
            Created At
          </label>
          <p className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3">
            {userDetails?.createdAt
              ? dayjs(userDetails.createdAt).format("DD-MMM-YYYY HH:mm:ss")
              : "Not Provided"}
          </p>
        </div>
        <div className="flex gap-1 flex-col">
          <label className="text-sm font-semibold text-black dark:text-white">
            Updated At
          </label>
          <p className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3">
            {userDetails?.updatedAt
              ? dayjs(userDetails.updatedAt).format("DD-MMM-YYYY HH:mm:ss")
              : "Not Provided"}
          </p>
        </div>
        <div className="flex gap-1 flex-col">
          <label className="text-sm font-semibold text-black dark:text-white">
            Profile Status
          </label>
          <p className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3">
            {userDetails?.status ?? "Not Provided"}
          </p>
        </div>
      </div>

      {isAccountVerifiedModelOpen && (
        <EmailVerify
          isOpen={isAccountVerifiedModelOpen}
          onClose={() => setIsAccountVerifiedModelOpen(false)}
        />
      )}
    </div>
  );
};

export default ViewProfile;
