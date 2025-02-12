"use client";

import React, { useEffect, useState } from "react";
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

interface ComponentProps {
  isOpen: boolean;
  onClose: (val: boolean) => void;
}

const EmailVerify = ({ isOpen, onClose }: ComponentProps) => {
  const [otp, setOtp] = useState(""); // State to store OTP input
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

  useEffect(() => {
    sendEmailVerificationToken();
  }, []);

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

    const responseData = response.data;

    if (responseData.output === 1) {
      setIsSubmitting(false);
      onClose(false);

      return toast.success(responseData.message);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center bg-black bg-opacity-70 z-50 max-sm:items-center"
      onClick={() => onClose(false)}
    >
      <div
        className="relative bg-white dark:bg-gray-800 shadow-lg p-3 max-sm:px-1 w-1/3 rounded-md h-4/5 top-8 max-sm:h-fit max-sm:top-0 md:h-fit"
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
          <p className="text-sm font-normal text-gray-600 dark:text-gray-200">
            Please check your email to verify your account
          </p>

          {/* OTP Input */}
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            value={otp}
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

          {/* Submit Button */}
          <Button
            className="bg-primaryblue text-white px-4 py-2 rounded-md"
            onClick={handleVerifyEmail}
          >
            {isSubmitting ? <ButtonLoading /> : "Verify"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
