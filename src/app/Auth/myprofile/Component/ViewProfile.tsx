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

  // 🚨 Prevent SSR mismatch
  if (!isMounted) return null;

  // Handle errors gracefully
  if (error) {
    return (
      <div className="w-full space-y-7 p-6">
        <div className="bg-gradient-to-r from-red-50 to-red-50/30 dark:from-red-950/40 dark:to-red-950/20 border border-red-200 dark:border-red-800/50 rounded-xl p-6 text-center">
          <p className="text-red-700 dark:text-red-300 font-semibold mb-2">Unable to load profile</p>
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return !userDetails ? (
    <UserProfileSkeleton />
  ) : (
    <div className="w-full space-y-7">
      {/* User Profile Header - Premium Luxury */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-6 pb-7 border-b border-gray-200 dark:border-slate-700">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 to-primary-green/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Image
            src={
              userDetails?.profile_picture
                ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${userDetails.profile_picture}`
                : userImage
            }
            alt="user"
            className="relative h-24 w-24 md:h-32 md:w-32 rounded-full object-cover shadow-lg border-4 border-accent-gold/30 group-hover:border-accent-gold/60 transition-all duration-300"
            loading="lazy"
            width={130}
            height={130}
          />
          {userDetails?.isVerified && (
            <div className="absolute bottom-0 right-0 bg-gradient-to-br from-green-400 to-green-500 rounded-full p-2 border-4 border-white dark:border-slate-800 shadow-lg">
              <Image
                src={verifiedImage}
                alt="verified"
                className="w-5 h-5"
                loading="lazy"
              />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary-green dark:text-white leading-tight">
              {userDetails?.name ?? "Not Provided"}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-semibold mt-2">
              {userDetails?.role ?? "Guest"}
            </p>
          </div>

          {userDetails?.isVerified ? (
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-green-700 dark:text-green-300 bg-gradient-to-r from-green-50 to-green-50/30 dark:from-green-950/40 dark:to-green-950/20 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800/50 w-fit mt-1">
              <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
              <span>✓ Verified Account</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-300 bg-gradient-to-r from-amber-50 to-amber-50/30 dark:from-amber-950/40 dark:to-amber-950/20 px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-800/50 w-fit mt-1">
              <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-pulse"></span>
              <span>Pending Verification</span>
            </div>
          )}
        </div>
      </div>

      {/* Verification Alert - Premium Compact */}
      {!userDetails?.isVerified && (
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/3 to-accent-gold/0"></div>
          <div className="relative bg-gradient-to-r from-amber-50/80 to-amber-50/40 dark:from-amber-900/15 dark:to-amber-900/5 border-l-3 border-accent-gold rounded-xl p-5 md:p-6 flex items-start gap-3">
            <div className="text-2xl flex-shrink-0 mt-0.5">🔐</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-playfair font-semibold text-amber-900 dark:text-amber-100 text-base mb-0.5">
                Verify Your Account
              </h3>
              <p className="text-xs text-amber-800 dark:text-amber-200 mb-3">
                Complete your account verification to unlock premium benefits and ensure security.
              </p>
              <button
                onClick={async () => {
                  setIsAccountVerifiedModelOpen(true);
                  await sendEmailVerificationToken();
                }}
                className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-accent-gold to-accent-gold/90 hover:from-accent-gold/90 hover:to-accent-gold text-white font-semibold rounded-lg hover:shadow-md hover:shadow-accent-gold/30 transition-all duration-300 text-xs md:text-sm"
              >
                <span>Verify Now</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Information Grid - Premium */}
      <div className="space-y-5">
        <h3 className="text-base font-playfair font-semibold text-primary-green dark:text-white uppercase tracking-wide">Personal Information</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {/* Email */}
          <div className="group">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest block mb-2">
              📧 Email Address
            </label>
            <div className="p-3.5 md:p-4 bg-gradient-to-br from-slate-50 to-slate-50/50 dark:from-slate-700/50 dark:to-slate-700/30 border border-gray-200 dark:border-slate-600 rounded-xl group-hover:border-accent-gold/50 group-hover:shadow-sm group-hover:shadow-accent-gold/10 transition-all duration-300">
              <p className="text-sm text-gray-900 dark:text-gray-100 font-medium break-all">
                {userDetails?.email ?? "Not Provided"}
              </p>
            </div>
          </div>

          {/* Mobile */}
          <div className="group">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest block mb-2">
              📱 Mobile Number
            </label>
            <div className="p-3.5 md:p-4 bg-gradient-to-br from-slate-50 to-slate-50/50 dark:from-slate-700/50 dark:to-slate-700/30 border border-gray-200 dark:border-slate-600 rounded-xl group-hover:border-accent-gold/50 group-hover:shadow-sm group-hover:shadow-accent-gold/10 transition-all duration-300">
              <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                {userDetails?.phone_number ?? "Not Provided"}
              </p>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="group">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest block mb-2">
              🎂 Date of Birth
            </label>
            <div className="p-3.5 md:p-4 bg-gradient-to-br from-slate-50 to-slate-50/50 dark:from-slate-700/50 dark:to-slate-700/30 border border-gray-200 dark:border-slate-600 rounded-xl group-hover:border-accent-gold/50 group-hover:shadow-sm group-hover:shadow-accent-gold/10 transition-all duration-300">
              <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                {userDetails?.date_of_birth
                  ? dayjs(userDetails.date_of_birth).format("DD MMM YYYY")
                  : "Not Provided"}
              </p>
            </div>
          </div>

          {/* Role */}
          <div className="group">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest block mb-2">
              👤 Account Role
            </label>
            <div className="p-3.5 md:p-4 bg-gradient-to-br from-slate-50 to-slate-50/50 dark:from-slate-700/50 dark:to-slate-700/30 border border-gray-200 dark:border-slate-600 rounded-xl group-hover:border-accent-gold/50 group-hover:shadow-sm group-hover:shadow-accent-gold/10 transition-all duration-300">
              <p className="text-sm text-gray-900 dark:text-gray-100 font-medium capitalize">
                {userDetails?.role ?? "Not Provided"}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="group">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest block mb-2">
              ✓ Account Status
            </label>
            <div className="p-3.5 md:p-4 bg-gradient-to-br from-slate-50 to-slate-50/50 dark:from-slate-700/50 dark:to-slate-700/30 border border-gray-200 dark:border-slate-600 rounded-xl group-hover:border-accent-gold/50 group-hover:shadow-sm group-hover:shadow-accent-gold/10 transition-all duration-300 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-600 rounded-full flex-shrink-0"></span>
                <p className="text-sm text-gray-900 dark:text-gray-100 font-medium capitalize">
                  {userDetails?.status ?? "Not Provided"}
                </p>
              </div>
          </div>

          {/* Member Since */}
          <div className="group">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest block mb-2">
              📅 Member Since
            </label>
            <div className="p-3.5 md:p-4 bg-gradient-to-br from-slate-50 to-slate-50/50 dark:from-slate-700/50 dark:to-slate-700/30 border border-gray-200 dark:border-slate-600 rounded-xl group-hover:border-accent-gold/50 group-hover:shadow-sm group-hover:shadow-accent-gold/10 transition-all duration-300">
              <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                {userDetails?.createdAt
                  ? dayjs(userDetails.createdAt).format("DD MMM YYYY")
                  : "Not Provided"}
              </p>
            </div>
          </div>
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
