"use client";

import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import hotelResp from "@/asset/hotel-resp.jpg";
import { EditButton } from "@/components/EditButton/EditButton";
import ViewProfile from "./Component/ViewProfile";
import EditProfile from "./Component/EditProfile";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { userProfile } from "@/app/store/Profile/userProfileSlice";

const Page: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  const { userDetails } = useSelector(
    (state: RootState) => state.userProfile
  );
  const [isEditEnable, setIsEditEnable] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      if (user?.id && !userDetails) {
        dispatch(userProfile({ _id: user.id }));
      }
    }
  }, [user]);

  return (
    <div className="container mx-auto flex gap-5 justify-between w-10/12 py-20 ">
      <div className="hidden sm:block w-1/3 rounded-md h-full overflow-hidden relative">
        <Image
          src={hotelResp}
          alt="hotelREsp"
          className="object-cover"
          loading="lazy"
        />
        <div className=" w-full absolute bottom-0 p-5 z-20">
          <h3 className=" font-semibold text-xl text-black dark:text-white">
            {" "}
            Your Perfect Stay Awaits
          </h3>
          <p className="text-xs text-black dark:text-white m-0">
            {
              "Whether you're traveling for business or leisure, our world-class amenities, elegant rooms, and exceptional service ensure a memorable stay."
            }
          </p>
        </div>
        <div className=" w-96 h-32 bg-white dark:bg-black blur-md absolute bottom-0 opacity-40 z-10"></div>
      </div>
      <div className="w-full sm:w-2/3 h-fit overflow-hidden relative  py-4 ">
        {!isEditEnable && <EditButton setState={setIsEditEnable} />}
        <h1 className="text-2xl font-semibold text-black dark:text-white">
          Profile
        </h1>
        {isEditEnable ? (
          <EditProfile setState={setIsEditEnable} />
        ) : (
          <ViewProfile />
        )}
      </div>
    </div>
  );
};

export default Page;
