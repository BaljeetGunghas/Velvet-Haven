"use client";

import React, { useState, useEffect } from "react";
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
import { X, CheckCircle2, Mail } from "lucide-react";

interface VerfiyEmailResponseIF {
  output: number;
  message: string;
  jsonResponse: {
    _id: string;
    email: string;
    isVerified: boolean;
  };
}

interface ComponentProps {
  isOpen: boolean;
  onClose: (val: boolean) => void;
}

const EmailVerify = ({ isOpen, onClose }: ComponentProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Timer countdown
  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  const handleVerifyEmail = async () => {
    if (otp.length < 6) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/verify-email`,
        {
          otp: otp,
        },
        {
          headers: authHeader(),
        }
      );

      const responseData: VerfiyEmailResponseIF = response.data;

      if (responseData.output === 1) {
        setIsSubmitting(false);
        dispatch(userProfile({ _id: user?.id || responseData.jsonResponse._id }));
        onClose(false);
        setOtp("");
        setTimeLeft(300);
        return toast.success(responseData.message);
      } else {
        setIsSubmitting(false);
        setError(responseData.message);
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    } catch (err) {
      setIsSubmitting(false);
      setError("Failed to verify email. Please try again.");
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={() => onClose(false)}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Floating */}
        <button
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-all z-20"
          onClick={() => onClose(false)}
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Content - All In One */}
        <div className="px-8 py-8 flex flex-col gap-6">
          {/* Icon */}
          <div className="flex justify-center pt-2">
            <Mail className="w-10 h-10 text-primary-green dark:text-accent-gold" />
          </div>

          {/* Title */}
          <div className="text-center -mt-2">
            <h2 className="text-2xl font-playfair font-bold text-primary-green dark:text-white mb-1">
              Verify Email
            </h2>
            <p className="text-xs text-accent-gold font-semibold uppercase tracking-[2px]">
              Secure Your Account
            </p>
          </div>
          {/* Description */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-700 dark:text-gray-200">
              We've sent a verification code to your registered email address. Enter it below to complete verification.
            </p>
            <div className={`text-xs font-semibold uppercase tracking-widest ${
              timeLeft <= 60 ? "text-red-600 dark:text-red-400" : "text-accent-gold"
            }`}>
              ⏱️ Time remaining: {formatTime(timeLeft)}
            </div>
          </div>

          {/* OTP Input Section */}
          <div className="space-y-4">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-widest block text-center">
              6-Digit Code
            </label>
            <div className="bg-gradient-to-br from-slate-50 to-slate-50/30 dark:from-slate-700/30 dark:to-slate-700/10 p-6 rounded-2xl border-2 border-gray-200 dark:border-slate-600 transition-all duration-300">
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={otp}
                type="text"
                onChange={(value) => {
                  setOtp(value);
                  setError(null);
                }}
                disabled={isSubmitting || timeLeft <= 0}
                containerClassName="flex justify-center gap-3"
              >
                <InputOTPGroup className="flex gap-3">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="w-12 h-14 text-lg font-bold rounded-xl border-2 border-gray-300 dark:border-slate-500 bg-white dark:bg-slate-700 text-primary-green dark:text-accent-gold focus:border-accent-gold dark:focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/30 transition-all duration-200"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg flex gap-3">
              <span className="text-red-600 dark:text-red-400 flex-shrink-0 text-lg">✕</span>
              <p className="text-sm text-red-700 dark:text-red-300 font-medium">{error}</p>
            </div>
          )}

          {/* Verify Button */}
          <Button
            className="w-full bg-gradient-to-r from-accent-gold to-accent-gold/80 hover:from-accent-gold/90 hover:to-accent-gold text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent-gold/40 disabled:opacity-50 disabled:cursor-not-allowed text-base mt-2"
            onClick={handleVerifyEmail}
            disabled={isSubmitting || otp.length < 6 || timeLeft <= 0}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <ButtonLoading />
                <span>Verifying...</span>
              </div>
            ) : timeLeft <= 0 ? (
              "Code Expired"
            ) : (
              "Verify Now"
            )}
          </Button>

          {/* Additional Info */}
          <div className="pt-2 space-y-2 text-center border-t border-gray-200 dark:border-slate-700">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Didn't receive the code?
            </p>
            <button className="text-xs font-semibold text-accent-gold hover:text-accent-gold/80 transition-colors">
              Resend Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
