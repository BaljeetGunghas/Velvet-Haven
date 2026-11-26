"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "@/asset/logo.png";
import { Button } from "../ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../Toast/Index";
import Error from "../Error/Error";
import ButtonLoading from "../Loading/ButtonLoading";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

interface ComponentProps {
  onBack: () => void;
}

type ForgotPasswordStep = "email-check" | "reset-password";

const ForgotPassword = ({ onBack }: ComponentProps) => {
  const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>("email-check");
  const [userEmail, setUserEmail] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState<boolean>(false);
  const [isResettingPassword, setIsResettingPassword] = useState<boolean>(false);

  // Step 1: Email Verification Form
  const emailFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      setIsCheckingEmail(true);
      try {
        // Step 1: Check if email exists
        const checkResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/isUserRegistered`,
          { email: values.email }
        );

        if (checkResponse.data.output === 1) {
          // User exists - proceed to send reset email
          try {
            // Step 2: Send reset email
            const forgotResponse = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/forgot-password`,
              { email: values.email }
            );

            if (forgotResponse.data.output === 1) {
              // Email sent successfully
              setUserEmail(values.email);
              setCurrentStep("reset-password");
              toast.success("Check your email for password reset instructions", toastOptions);
            } else {
              toast.error(forgotResponse.data.message || "Failed to send reset email", toastOptions);
            }
          } catch (forgotError: any) {
            console.error("Error sending reset email:", forgotError);
            toast.error(
              forgotError.response?.data?.message || "Failed to send reset email. Please try again.",
              toastOptions
            );
          }
        } else {
          // User doesn't exist
          toast.error("Email not registered in our system", toastOptions);
        }
      } catch (error) {
        console.error("Error checking email:", error);
        toast.error("Failed to check email. Please try again.", toastOptions);
      } finally {
        setIsCheckingEmail(false);
      }
    },
  });

  // Step 2: Reset Password Form
  const resetFormik = useFormik({
    initialValues: {
      token: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      token: Yup.string()
        .required("Reset token/code is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      setIsResettingPassword(true);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/reset-password`,
          {
            token: values.token,
            password: values.password,
          }
        );

        if (response.data.output === 1) {
          toast.success("Password reset successfully! Please login with your new password.", toastOptions);
          setTimeout(() => {
            setCurrentStep("email-check");
            emailFormik.resetForm();
            resetFormik.resetForm();
            onBack();
          }, 2000);
        } else {
          toast.error(response.data.message || "Failed to reset password", toastOptions);
        }
      } catch (error: any) {
        console.error("Error resetting password:", error);
        toast.error(
          error.response?.data?.message || "Failed to reset password. Please try again.",
          toastOptions
        );
      } finally {
        setIsResettingPassword(false);
      }
    },
  });

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-600 rounded-lg transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} className="text-primary-green dark:text-white" />
        </button>
        <div className="flex-1 text-center">
          <div className="flex justify-center mb-2">
            <Image
              src={logo}
              alt="Velvet Haven"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-playfair font-semibold text-primary-green dark:text-white">
            Reset Password
          </h1>
        </div>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>

      {/* Step 1: Email Verification */}
      {currentStep === "email-check" && (
        <form onSubmit={emailFormik.handleSubmit} className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Enter your email address and we'll send you instructions to reset your password.
          </p>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary-green dark:text-white">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={emailFormik.values.email}
              onChange={emailFormik.handleChange}
              onBlur={emailFormik.handleBlur}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-600/60 border border-gray-200 dark:border-slate-500 rounded-lg text-sm focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            {emailFormik.touched.email && emailFormik.errors.email && (
              <Error error={emailFormik.errors.email} />
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isCheckingEmail}
            className="w-full bg-accent-gold hover:bg-accent-gold/90 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl hover:shadow-accent-gold/40 mt-6"
          >
            {isCheckingEmail ? <ButtonLoading /> : "Check Email"}
          </Button>
        </form>
      )}

      {/* Step 2: Reset Password */}
      {currentStep === "reset-password" && (
        <form onSubmit={resetFormik.handleSubmit} className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Check your email for the reset code, then enter it below along with your new password.
          </p>

          {/* Reset Token/Code Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary-green dark:text-white">
              Reset Code
            </label>
            <input
              type="text"
              name="token"
              value={resetFormik.values.token}
              onChange={resetFormik.handleChange}
              onBlur={resetFormik.handleBlur}
              placeholder="Enter the code from your email"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-600/60 border border-gray-200 dark:border-slate-500 rounded-lg text-sm focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            {resetFormik.touched.token && resetFormik.errors.token && (
              <Error error={resetFormik.errors.token} />
            )}
          </div>

          {/* New Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary-green dark:text-white">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={resetFormik.values.password}
                onChange={resetFormik.handleChange}
                onBlur={resetFormik.handleBlur}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-600/60 border border-gray-200 dark:border-slate-500 rounded-lg text-sm focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-accent-gold transition-colors"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {resetFormik.touched.password && resetFormik.errors.password && (
              <Error error={resetFormik.errors.password} />
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary-green dark:text-white">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={resetFormik.values.confirmPassword}
                onChange={resetFormik.handleChange}
                onBlur={resetFormik.handleBlur}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-600/60 border border-gray-200 dark:border-slate-500 rounded-lg text-sm focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-accent-gold transition-colors"
              >
                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {resetFormik.touched.confirmPassword && resetFormik.errors.confirmPassword && (
              <Error error={resetFormik.errors.confirmPassword} />
            )}
          </div>

          {/* Reset Password Button */}
          <Button
            type="submit"
            disabled={isResettingPassword}
            className="w-full bg-accent-gold hover:bg-accent-gold/90 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl hover:shadow-accent-gold/40 mt-6"
          >
            {isResettingPassword ? <ButtonLoading /> : "Reset Password"}
          </Button>

          {/* Back to Email Step */}
          <button
            type="button"
            onClick={() => {
              setCurrentStep("email-check");
              resetFormik.resetForm();
            }}
            className="w-full text-sm text-accent-gold hover:text-accent-gold/80 font-semibold transition-colors py-2"
          >
            Back to Email Verification
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
