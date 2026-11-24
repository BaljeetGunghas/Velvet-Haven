"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/asset/logo.png";
import eyeclosed from "@/asset/icon/eye-close.svg";
import { Button } from "../ui/button";
import google from "@/asset/icon/google.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login, UserLoginResponse } from "@/app/store/Auth/authSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../Toast/Index";
import Error from "../Error/Error";
import ButtonLoading from "../Loading/ButtonLoading";
import { userProfile } from "@/app/store/Profile/userProfileSlice";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

interface ComponentProps {
  onChange: (val: boolean) => void;
}

const Login = ({ onChange }: ComponentProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const isUserRegistered = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/isUserRegistered`,
        { email: values.email }
      );
      const isUserRegisteredData = isUserRegistered.data;
      if (isUserRegisteredData.output === 1) {
        const response = await dispatch(login(values));
        if (response.meta.requestStatus === "fulfilled") {
          const userDataResponse = response.payload as UserLoginResponse;
          toast.success("Login success");
          if (userDataResponse?._id) {
            if (userDataResponse.role === "host") {
              router.push("/Admin/dashboard");
            }
            dispatch(userProfile({ _id: userDataResponse._id }));
          }
        }
      } else {
        return toast.success(isUserRegisteredData.message, toastOptions);
      }
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error, toastOptions);
    }
  }, [error]);

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
            Velvet Haven
          </h1>
          <p className="text-xs text-accent-gold font-semibold tracking-widest mt-1">
            LUXURY STAYS
          </p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 pt-2">
          Sign in to your exclusive account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-4">
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
          {formik.touched.email && formik.errors.email && (
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
          {formik.touched.password && formik.errors.password && (
            <Error error={formik.errors.password} />
          )}
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <button
            type="button"
            className="text-xs text-accent-gold hover:text-accent-gold/80 font-semibold transition-colors"
          >
            Forgot password?
          </button>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          className="w-full bg-accent-gold hover:bg-accent-gold/90 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl hover:shadow-accent-gold/40 mt-6"
        >
          {loading ? <ButtonLoading /> : "Sign In"}
        </Button>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-slate-600"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white dark:bg-slate-700 text-gray-500 dark:text-gray-400">
              or continue with
            </span>
          </div>
        </div>

        {/* Google Sign In */}
        <Button
          type="button"
          className="w-full bg-white dark:bg-slate-600/60 hover:bg-gray-50 dark:hover:bg-slate-600 text-gray-700 dark:text-white border border-gray-200 dark:border-slate-500 font-semibold py-3 rounded-lg transition-all gap-2 flex items-center justify-center"
        >
          <Image src={google} alt="Google" className="w-5 h-5" />
          <span className="text-sm">Google</span>
        </Button>
      </form>

      {/* Sign Up Link */}
      <div className="text-center pt-2 border-t border-gray-100 dark:border-slate-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => onChange(false)}
            className="text-accent-gold hover:text-accent-gold/80 font-semibold transition-colors"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
