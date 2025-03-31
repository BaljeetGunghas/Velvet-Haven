"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "axios";
import { authHeader } from "@/app/Auth/AuthHeader/authHeader";
import { toast } from "react-toastify";
import ButtonLoading from "../Loading/ButtonLoading";
import VerifyEmail from "@/asset/verify-email.jpg";
import Image from "next/image";
import Error from "../Error/Error";
import { AppDispatch, RootState } from "@/app/store/store";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "@/app/store/Profile/userProfileSlice";

interface VerfiyEmailResponseIF{
  output: number;
  message: string;
  jsonResponse:{
    _id: string;
    email: string;
    isVerified: boolean;
  }
}

interface ComponentProps {
  isOpen: boolean;
  onClose: (val: boolean) => void;
}

const EmailVerify = ({ isOpen, onClose }: ComponentProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [otp, setOtp] = useState(""); // State to store OTP input
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleVerifyEmail = async () => {
    setIsSubmitting(true);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/verify-email`,
      {
        otp: otp,
      },
      {
        headers: authHeader(),
      }
    );

    const responseData : VerfiyEmailResponseIF = response.data;

    if (responseData.output === 1) {
      setIsSubmitting(false);
      dispatch(userProfile({ _id: user?.id  || responseData.jsonResponse._id }));
      onClose(false);
      return toast.success(responseData.message);
    } else {
      setIsSubmitting(false);
      setError(responseData.message);
      setTimeout(() => {  
        setError(null);
      }, 2000);
    }
  };

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
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Verify Your Email
          </h1>
          <Image
            src={VerifyEmail}
            alt="user"
            className="h-full mx-auto w-64 rounded-md shadow-lg  object-cover"
            loading="lazy"
          />
          <p className="text-sm text-center font-normal text-gray-600 dark:text-gray-200">
            Please check your email to verify your account. This verification
            OTP will expire in 5 minutes.
          </p>

          {/* OTP Input */}
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            value={otp}
            type="text"
            onChange={(value) => {
              setOtp(value);
              console.log("OTP Entered:", value); // Log OTP value
            }}
            disabled={isSubmitting}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          {/* Error Message */}
          {error && <Error error={error} />}

          {/* Submit Button */}
          <Button
            className="bg-primaryblue text-white px-4 py-2 rounded-md"
            onClick={handleVerifyEmail}
            disabled={isSubmitting || otp.length < 6}
          >
            {isSubmitting ? <ButtonLoading /> : "Verify"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
