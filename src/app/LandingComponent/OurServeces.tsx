import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import star from "@/asset/icon/Star.svg";
import services1 from "@/asset/services1.svg";
import services2 from "@/asset/services2.svg";

const OurServices = () => {
  const services = [
    { id: 1, icon: star, title: "Luxurious Accommodations" },
    { id: 2, icon: star, title: "Prime Location" },
    { id: 3, icon: star, title: "Personalized Hospitality" },
    { id: 4, icon: star, title: "Fitness Center" },
  ];

  return (
    <motion.div
      className="p-mainPading flex max-sm:flex-col max-sm:h-full max-sm:p-5 max-sm:gap-5 max-md:pb-5"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}
    >
      <div className="w-1/2 h-full max-sm:w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          <h2 className="text-xl font-medium text-secondrybackground">
            Our Services
          </h2>
          <h3 className="text-4xl my-2 font-semibold">
            Exceptional Services, Tailored for You
          </h3>
          <p className="text-base font-normal">
            At Velvet-Haven, we offer a range of premium services designed to make
            your stay unforgettable. From luxurious accommodations to personalized
            assistance, we ensure every moment is perfect.
          </p>
        </motion.div>
        <br />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          {services.map((service) => (
            <div key={service.id} className="flex items-center gap-3 my-1">
              <Image
                src={service.icon}
                alt="star icon"
                className="size-6 dark:filter dark:invert dark:brightness-0"
              />
              <span className="font-normal text-base">{service.title}</span>
            </div>
          ))}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
        className="relative w-1/2 h-full max-sm:w-full max-sm:h-96"
      >
        <Image
          src={services2}
          alt="services"
          className="size-80 absolute top-0 right-0 z-20 max-sm:left-0"
        />
        <Image
          src={services1}
          alt="services1"
          className="size-80 absolute right-16 top-12 z-30 max-sm:right-0 max-md:right-2 max-md:top-20"
        />
      </motion.div>
    </motion.div>
  );
};

export default OurServices;
