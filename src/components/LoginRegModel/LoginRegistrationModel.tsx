"use client";

import React, { useState } from "react";
import Image from "next/image";
import registrationBanner from "@/asset/registrationbanner.svg";
import Login from "./Login";
import horizantalBanner from "@/asset/registrationhorizatalbanner.jpg";
import Registration from "./Registration";

const LoginRegistrationModel = () => {
  const [isLoginShow, setIsLoginShow] = useState<boolean>(true);

  return (
    <div
      className={`w-full h-full flex  overflow-hidden max-sm:flex-col ${
        !isLoginShow ? "items-start" : "items-center"
      }`}
    >
      <div className="w-7/12 h-full max-sm:w-full max-sm:h-[200px]">
        <Image
          src={registrationBanner}
          alt="registrationBanner"
          className="w-[100%] object-contain h-full rounded-md -ml-10 max-sm:hidden max-md:object-cover max-h-[600px]"
          lazyRoot="lazy-loading"
        />
        <Image
          src={horizantalBanner}
          alt="horizantalBanner"
          className="w-[100%] object-cover h-full rounded-md hidden max-sm:block max-sm:overflow-auto "
          lazyRoot="lazy-loading"
        />
      </div>
      <div className="w-1/2 h-full pt-8 max-sm:w-full max-sm:pt-5 max max-md:pt-24">
        {isLoginShow ? (
          <Login onChange={setIsLoginShow} />
        ) : (
          <Registration onChange={setIsLoginShow} />
        )}
      </div>
    </div>
  );
};

export default LoginRegistrationModel;
