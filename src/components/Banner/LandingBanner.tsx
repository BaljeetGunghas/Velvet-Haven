import React from "react";
import bannerImg from "@/asset/landing-banner.svg";
import Image from "next/image";
import LandingSearchForm from "../Form/LandingSearchForm";

const LandingBanner = () => {
  return (
    <div className=" w-full min-h-[450px] bg-bannerbg flex overflow-hidden relative -z-0 max-sm:h-[620px] max-md:h-[550px] mt-16">
      <div className=" flex gap-4 flex-col pt-secondryPadding pl-mainPading max-sm:p-8 ">
        <h1 className=" text-white font-semibold text-6xl max-sm:text-4xl">
        Experience Luxury at Velvet-Haven
        </h1>
        <p className="font-normal text-base max-w-3xl text-white">
        Unwind in elegant accommodations with world-class amenities and personalized service. Your journey to comfort begins here.
        </p>
      </div>
      <Image
        src={bannerImg}
        alt="Banner image"
        className=" w-[55%] h-full object-cover absolute right-0 top-0 -z-10 max-sm:w-full max-sm:brightness-50 max-md:object-cover max-md:w-[50%] max-md:h-full"
      />
      <div className=" absolute bottom-28 px-secondryPadding max-sm:bottom-2 max-sm:p-4 max-sm:w-full max-md:bottom-10 max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 max-md:w-3/4">
        <LandingSearchForm />
      </div>
    </div>
  );
};

export default LandingBanner;
