import Image from "next/image";
import React from "react";
import logo from "@/asset/logo.svg";
import facebook from "@/asset/icon/facebook.svg";
import instagram from "@/asset/icon/instagram-solid.svg";
import linkedin from "@/asset/icon/linkedin.svg";
import twitter from "@/asset/icon/twitter.svg";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="relative bg-primaryblue dark:bg-black dark:border-t p-mainPading max-sm:h-full max-sm:p-5 max-sm:gap-5">
      <div className="flex h-full justify-between max-sm:flex-col max-sm:gap-12">
        <div className=" w-1/2 max-sm:w-full">
          <Image src={logo} alt="logo" className="size-28" />
          <span className="text-base font-normal text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia Curae.
          </span>
        </div>
        <div className="flex gap-32 max-sm:w-full">
          <div  className=" max-sm:w-full max-sm:flex max-sm:flex-col ">
            <h3 className="text-white text-xl font-semibold mb-12">Service</h3>
            <ul className="text-white text-base font-normal flex flex-col gap-5">
              <li>
                <Link href={""} className="text-base font-semibold">
                  Home
                </Link>
              </li>
              <li>
                <Link href={""} className="text-base font-semibold">
                  About
                </Link>
              </li>
              <li>
                <Link href={""} className="text-base font-semibold">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href={""} className="text-base font-semibold">
                  Location
                </Link>
              </li>
              <li>
                <Link href={""} className="text-base font-semibold">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>
          <div className=" max-sm:w-full max-sm:flex max-sm:flex-col max-sm:items-end ">
            <h3 className="text-white text-xl font-semibold mb-12">Social</h3>
            <ul className="text-white text-base font-normal flex gap-5 max-sm:flex-col">
              <Link href={""} target="_blank" className="bg-white dark:bg-bannerbg  rounded-full size-10 grid place-items-center">
                <Image src={facebook} alt="facebook" className="dark:filter dark:invert dark:brightness-0 size-6" />
              </Link>
              <Link href={""} target="_blank" className="bg-white dark:bg-bannerbg  rounded-full size-10 grid place-items-center">
                <Image src={instagram} alt="instagram" className="dark:filter dark:invert dark:brightness-0 size-6" />
              </Link>
              <Link href={""} target="_blank" className="bg-white dark:bg-bannerbg  rounded-full size-10 grid place-items-center">
                <Image src={linkedin} alt="linkedin" className="dark:filter dark:invert dark:brightness-0 size-6" />
              </Link>
              <Link href={""} target="_blank" className="bg-white dark:bg-bannerbg  rounded-full size-10 grid place-items-center">
                <Image src={twitter} alt="twitter" className="dark:filter dark:invert dark:brightness-0 size-6" />
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-6" />
      <div className="flex justify-between max-sm:flex-col max-sm:items-center max-sm:gap-3">
        <div className="flex gap-5 items-center">
          <Link href={''} className="text-base font-medium ">Privacy Policy </Link>
          <Link href={''} className="text-base font-medium ">Terms of use </Link>
        </div>

        <span className="text-base font-medium">© Velvet Haven. All Rights Reserved </span>
      </div>
    </div>
  );
};

export default Footer;
