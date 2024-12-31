import React from "react";
import bannerImg from "@/asset/landing-banner.svg";
import Image from "next/image";
import LandingSearchForm from "../Form/LandingSearchForm";

const LandingBanner = () => {
  return (
    <div className=" w-full min-h-[450px] bg-bannerbg flex overflow-hidden relative -z-0 max-sm:h-[600px]">
      <div className=" flex gap-4 flex-col pt-secondryPadding pl-mainPading max-sm:p-8 ">
        <h1 className=" text-white font-semibold text-6xl max-sm:text-4xl">
          Book Your Stay Today
        </h1>
        <p className="font-normal text-base max-w-3xl text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et
          ultrices posuere cubilia Curae.
        </p>
      </div>
      <Image
        src={bannerImg}
        alt="Banner image"
        className=" w-[55%] h-full object-cover absolute right-0 top-0 -z-10 max-sm:w-full max-sm:brightness-50"
      />
      <div className=" absolute bottom-28 px-secondryPadding max-sm:bottom-10 max-sm:p-4 max-sm:w-full">
        <LandingSearchForm />
      </div>
    </div>
  );
};

export default LandingBanner;
