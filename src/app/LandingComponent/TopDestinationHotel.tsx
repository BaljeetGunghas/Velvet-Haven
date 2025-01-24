import React from "react";
import Shimla from "@/asset/destination/Shimla.svg";
import Agra from "@/asset/destination/Agra.svg";
import Jaipur from "@/asset/destination/Jaipur.svg";
import Mumbai from "@/asset/destination/Mumbai.svg";
import Image from "next/image";
import Arrow from "@/asset/icon/Arrow.svg";
import { Button } from "@/components/ui/button";
import { toast } from 'react-toastify';

const TopDestinationHotel = () => {
  const topDetinationsDetails = [
    {
      id: 1,
      name: "Mumbai",
      image: Mumbai,
      description: "One of the best tourist place",
      tripDetails: "14 Hotel - 18 Tours 95 Activity",
    },
    {
      id: 2,
      name: "Jaipur",
      image: Jaipur,
      description: "One of the best tourist place",
      tripDetails: "11 Hotel - 14 Tours 85 Activity",
    },
    {
      id: 3,
      name: "Shimla",
      image: Shimla,
      description: "One of the best tourist place",
      tripDetails: "14 Hotel - 18 Tours 95 Activity",
    },
    {
      id: 4,
      name: "Agra",
      image: Agra,
      description: "One of the best tourist place",
      tripDetails: "14 Hotel - 18 Tours 95 Activity",
    },
  ];
  return (
    <div className="relative p-mainPading max-sm:h-full max-sm:p-5 max-sm:gap-5">
      <h2 className="text-xl font-medium text-secondrybackground ">
        Top Destinations
      </h2>
      <Image
        src={Arrow}
        alt={Arrow}
        onClick={() => toast.success("Wow so easy!")}
        className="bg-primaryblue dark:bg-foreground p-1 rounded-full absolute top-16 right-16 max-sm:top-4 max-sm:right-6 max-sm:size-8 w-6 h-6 object-cover cursor-pointer "
      />
      <h3 className="text-4xl my-2 font-semibold">
        Book Hotels at Popular Destinations
      </h3>
      <div className="flex flex-row rounded flex-wrap items-center gap-10 max-sm:gap-5 my-3 mt-5">
        {topDetinationsDetails.map((d) => {
          return (
            <div
              className="relative h-62 w-48 max-sm:w-44 rounded overflow-hidden cursor-pointer"
              key={d.id}
            >
              {/* Image */}
              <Image
                src={d.image}
                alt={d.name}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-blue-500 bg-opacity-20 bg-custom-gradient p-5 py-5 max-sm:px-3 opacity-0 hover:opacity-100 transition-opacity">
                <p className="text-white text-sm text-center max-w-[80%] max-sm:w-[90%] mx-auto font-normal">
                  {d.tripDetails}
                </p>
             
                <p className="text-white text-base font-semibold mt-7">{d.name}</p>
                <hr className="my-2" />
                <p className="text-white text-sm font-normal">
                  {d.description}
                </p>
                <Button className=" border py-2 mt-3 text-xs font-medium text-white rounded">Book Now</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopDestinationHotel;
