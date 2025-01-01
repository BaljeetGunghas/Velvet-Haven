"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "@/asset/blue-logo.svg";
import eyeclosed from "@/asset/icon/eye-close.svg";
import { Button } from "../ui/button";
import google from "@/asset/icon/google.svg";

interface ComponentProps {
  onChange: (val: boolean) => void;
}

const Login = ({ onChange }: ComponentProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <Image
        src={logo}
        alt="logo"
        className="size-14 object-contain ml-32 dark:filter dark:invert dark:brightness-0  max-sm:mx-auto "
      />
      <h1 className=" text-2xl font-semibold max-sm:w-full max-sm:text-center">
        Welcome to Velvet Haven <br />
        Sign in to continue{" "}
      </h1>
      <span className=" text-sm font-normal max-sm:w-full max-sm:text-center max-sm:px-5 block my-3 ">
        Dont’t have an account ?{" "}
        <span
          className=" text-secondrybackground cursor-pointer max-sm:w-full text-center"
          onClick={() => onChange(false)}
        >
          Create a account
        </span>
        <br />
        it takes less then a minute
      </span>
      <div className="flex flex-col w-4/5 gap-3 max-sm:w-full max-sm:px-5">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Email</label>
          <input
            type="text"
            placeholder="Jasonexmple@gmail.com"
            className="bg-gray-100 p-2 bg-lightGray focus:bg-transparent rounded-lg  text-sm font-normal dark:text-black focus:dark:text-white"
          />
        </div>
        <div className="flex flex-col gap-1 relative">
          <label className="text-sm font-medium">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="xxxxxxxxxxxxxx"
            className="bg-gray-100 text p-2 bg-lightGray focus:bg-transparent rounded-lg  text-sm font-normal dark:text-black focus:dark:text-white"
          />

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
        <div className="flex justify-between">
          <p className="text-xs font-normal m-0">
            Dont have account{" "}
            <span
              className="text-secondrybackground cursor-pointer"
              onClick={() => onChange(false)}
            >
              Create account
            </span>
          </p>
          <p className="text-xs font-normal m-0 cursor-pointer text-secondrybackground">
            Forgot password
          </p>
        </div>

        <Button className="bg-primaryblue w-full rounded-lg py-6 text-white">
          Sign in
        </Button>
        <Button className="bg-#F8F8F8 w-full rounded-lg py-6 text-base font-semibold mt-2 max-sm:mb-5 dark:bg-foreground">
          <Image src={google} alt="google" className="size-4" /> Sign-in with
          google
        </Button>
      </div>
    </>
  );
};

export default Login;
