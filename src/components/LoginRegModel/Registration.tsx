"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "@/asset/logo.png";
import { Button } from "../ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { signup, LoginResponse } from "@/app/store/Auth/authSlice";
import { AppDispatch } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { toastOptions } from "../Toast/Index";
import { toast } from "react-toastify";
import Error from "../Error/Error";
import ButtonLoading from "../Loading/ButtonLoading";
import { Eye, EyeOff } from "lucide-react";

interface ComponentProps {
  onChange: (val: boolean) => void;
}

const Registration = ({ onChange }: ComponentProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const isUserRegistered = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/isUserRegistered`,
          { email: values.email }
        );
        const isUserRegisteredData = isUserRegistered.data;
        if (isUserRegisteredData.output === 1) {
          setLoading(false);
          return toast.success(isUserRegisteredData.message, toastOptions);
        } else {
          const payload = {
            name: values.name,
            email: values.email,
            password: values.password,
          };
          const action = await dispatch(signup(payload));
          const signupResponse: LoginResponse = action.payload as LoginResponse;
          if (signupResponse.output === 1) {
            setLoading(false);
            return toast.success(signupResponse.message, toastOptions);
          } else {
            setLoading(false);
            return toast.error(
              "Signup response payload is undefined",
              toastOptions
            );
          }
        }
      } catch (error: unknown) {
        setLoading(false);
        const typedError = error as any;
        return toast.error(
          typedError.response?.data?.message || "Signup failed",
          toastOptions
        );
      }
    },
  });

  return (
    <div className="space-y-6">
      {/* Logo & Branding */}
      <div className="space-y-3 text-center">
        <div className="flex justify-center mb-2">
          <Image
            src={logo}
            alt="Velvet Haven"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-playfair font-semibold text-primary-green dark:text-white">
            Join Velvet Haven
          </h1>
          <p className="text-xs text-accent-gold font-semibold tracking-widest mt-1">
            LUXURY STAYS
          </p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 pt-2">
          Create your account to unlock exclusive benefits
        </p>
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Full Name Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-primary-green dark:text-white">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="John Doe"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-600/60 border border-gray-200 dark:border-slate-500 rounded-lg text-sm focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          {formik.errors.name && formik.touched.name && (
            <Error error={formik.errors.name} />
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-primary-green dark:text-white">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="your@email.com"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-600/60 border border-gray-200 dark:border-slate-500 rounded-lg text-sm focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          {formik.errors.email && formik.touched.email && (
            <Error error={formik.errors.email} />
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-primary-green dark:text-white">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-600/60 border border-gray-200 dark:border-slate-500 rounded-lg text-sm focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-accent-gold transition-colors"
            >
              {showPassword ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </button>
          </div>
          {formik.errors.password && formik.touched.password && (
            <Error error={formik.errors.password} />
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
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-600/60 border border-gray-200 dark:border-slate-500 rounded-lg text-sm focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-accent-gold transition-colors"
            >
              {showConfirmPassword ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </button>
          </div>
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <Error error={formik.errors.confirmPassword} />
          )}
        </div>

        {/* Sign Up Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-accent-gold hover:bg-accent-gold/90 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl hover:shadow-accent-gold/40 mt-6"
        >
          {loading ? <ButtonLoading /> : "Create Account"}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-slate-600"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-white dark:bg-slate-700 text-gray-500 dark:text-gray-400">
            Already have an account?
          </span>
        </div>
      </div>

      {/* Sign In Link */}
      <div className="text-center pt-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <button
            type="button"
            onClick={() => onChange(true)}
            className="text-accent-gold hover:text-accent-gold/80 font-semibold transition-colors"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Registration;
