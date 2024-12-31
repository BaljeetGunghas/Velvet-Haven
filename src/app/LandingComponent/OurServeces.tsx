import Image from "next/image";
import React from "react";
import star from "@/asset/icon/Star.svg";
import services1 from "@/asset/services1.svg";
import services2 from "@/asset/services2.svg";

const OurServeces = () => {
  return (
    <div className=" p-mainPading flex max-sm:flex-col max-sm:h-full max-sm:p-5 max-sm:gap-5">
      <div className="w-1/2 h-full max-sm:w-full">
        <h2 className="text-xl font-medium text-secondrybackground">
          Our Services
        </h2>
        <h3 className="text-4xl my-2 font-semibold">
          We’re Here To Help You Discover Your Perfect Stay
        </h3>
        <p className=" text-base font-normal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
          veritatis molestiae quod ab blanditiis recusandae facilis, cupiditate
          consequuntur, quo eaque sapiente aperiam quam repudiandae delectus
          maxime soluta itaque ducimus porro obcaecati molestiae inventore, iure
          corrupti velit saepe nihil illum debitis. Quos quaerat sequi accusamus
          nihil!
        </p>
        <br />
        <div className="flex items-center gap-3 my-1">
          <Image src={star} alt="star icon" className="size-6 dark:filter dark:invert dark:brightness-0" />
          <span className="font-normal text-base">Exceptional Comfort</span>
        </div>
        <div className="flex items-center gap-3 my-1">
          <Image src={star} alt="star icon" className="size-6 dark:filter dark:invert dark:brightness-0" />
          <span className="font-normal text-base">Prime Location</span>
        </div>
        <div className="flex items-center gap-3 my-1">
          <Image src={star} alt="star icon" className="size-6 dark:filter dark:invert dark:brightness-0" />
          <span className="font-normal text-base">
            Personalized Hospitality
          </span>
        </div>
      </div>
      <div className="relative w-1/2 h-full max-sm:w-full 78 max-sm:h-96 ">
        <Image src={services2} alt="services" className="size-80 absolute top-0 right-0 z-20 max-sm:left-0" />
        <Image src={services1} alt="services1" className="size-80 absolute right-16 top-12 z-30 max-sm:right-0" />
      </div>
    </div>
  );
};

export default OurServeces;
