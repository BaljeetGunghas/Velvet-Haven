"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "@/asset/blue-logo.svg";
import eyeclosed from "@/asset/icon/eye-close.svg";
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

interface ComponentProps {
  onChange: (val: boolean) => void;
}
const Registration = ({ onChange }: ComponentProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
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
        .min(3, "Name must contain atleast 3 characher ")
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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const typedError = error as any;
        return toast.error(
          typedError.response?.data?.message || "Signup failed",
          toastOptions
        );
      }
    },
  });

  return (
    <>
      <Image
        src={logo}
        alt="logo"
        className="size-14 object-contain ml-32 dark:filter dark:invert dark:brightness-0  max-sm:mx-auto "
      />
      <h1 className=" text-2xl font-semibold max-sm:w-full max-sm:text-center">
        Welcome to Velvet Haven <br />
        Create a account to continue
      </h1>
      <span className=" text-sm font-normal max-sm:w-full max-sm:text-center max-sm:px-10 block my-3 ">
        Already have an account ?{" "}
        <span
          className=" text-secondrybackground cursor-pointer max-sm:w-full text-center"
          onClick={() => onChange(true)}
        >
          Sign in
        </span>
      </span>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-3 max-sm:w-full max-sm:px-5"
      >
        <div className="flex flex-col w-4/5 gap-3 max-sm:w-full max-sm:px-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Jeson statham"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-100 p-2 bg-lightGray focus:bg-transparent rounded-lg  text-sm font-normal dark:text-black focus:dark:text-white"
            />
            {formik.errors.name && formik.touched.name && (
              <Error error={formik.errors.name} />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Jasonexmple@gmail.com"
              className="bg-gray-100 p-2 bg-lightGray focus:bg-transparent rounded-lg  text-sm font-normal dark:text-black focus:dark:text-white"
            />
            {formik.errors.email && formik.touched.email && (
              <Error error={formik.errors.email} />
            )}
          </div>
          <div className="flex flex-col gap-1 relative">
            <label className="text-sm font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="xxxxxxxxxxxxxx"
              className="bg-gray-100 text p-2 bg-lightGray focus:bg-transparent rounded-lg  text-sm font-normal dark:text-black focus:dark:text-white"
            />
            {formik.errors.password && formik.touched.password && (
              <Error error={formik.errors.password} />
            )}

            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-4 absolute bottom-2 right-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            ) : (
              <Image
                src={eyeclosed}
                alt="eyeclose"
                className="size-4 absolute bottom-2 right-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          <div className="flex flex-col gap-1 relative">
            <label className="text-sm font-medium"> Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="xxxxxxxxxxxxxx"
              className="bg-gray-100 text p-2 bg-lightGray focus:bg-transparent rounded-lg  text-sm font-normal dark:text-black focus:dark:text-white"
            />
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <Error error={formik.errors.confirmPassword} />
              )}

            {showConfirmPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-4 absolute bottom-2 right-5 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            ) : (
              <Image
                src={eyeclosed}
                alt="eyeclose"
                className="size-4 absolute bottom-2 right-5 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )}
          </div>

          <Button
            className="bg-primaryblue w-full rounded-lg py-6 text-white mt-5 max-sm:my-5"
            type="submit"
            disabled={loading}
          >
            {loading ? <ButtonLoading /> : "Create account"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default Registration;
