"use client";

import Image from "next/image";
import React, { useState } from "react";
import user from "@/asset/dummy/user1.jpg";
import { Input } from "@/components/ui/input";
// import { CalendarComponent } from "@/components/Calendar/Calendar";
import { SingleSelect } from "@/components/Select/SingleSelect";
import { UserRoleIF, UserStatusIF } from "@/Types/enums";
import { Button } from "@/components/ui/button";

interface ComponentProps {
  setState: (val: boolean) => void;
}

const EditProfile = ({ setState }: ComponentProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("No file chosen");
//   const [date, setDate] = useState<Date>();
  const [userRole, setUserRole] = useState<string>("");
  const [userStatus, setUserStatus] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
    }
  };

  return (
    <div className="h-full w-full ">
      <div className="h-32  p-2 w-full sm:w-5/6 mx-auto flex gap-3 items-center ">
        <Image
          src={image ?? user}
          alt="user"
          className="h-full w-28 rounded-full object-cover"
          loading="lazy"
          width={200}
          height={200}
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="image" className=" text-sm font-semibold">
            {" "}
            Upload Image
          </label>
          <div className="flex gap-2 sm:gap-0 flex-col sm:flex-row">
            <div className=" p-2 sm:p-3 text-gray-600 text-xs sm:text-sm bg-gray-100 w-60 rounded-md rounded-r-none">
              {fileName && fileName.length > 20
                ? fileName.slice(0, 20).concat("...")
                : fileName ?? "No file chosen"}
            </div>
            <div className="flex gap-5 items-center">
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <label
                htmlFor="imageUpload"
                className="px-4 py-2 sm:py-3 rounded-l-none bg-primaryblue text-white text-xs sm:text-sm rounded-md cursor-pointer m-0 hover:bg-blue-700 transition"
              >
                Choose file
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 px-0 sm:px-16 my-6 gap-5">
        <div className="flex gap-1 flex-col ">
          <label className=" text-sm font-semibold text-black dark:text-white ">
            Name{" "}
          </label>
          <Input
            type="text"
            className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3"
            value={"Jeson statham"}
          />
        </div>
        <div className="flex gap-1 flex-col ">
          <label className=" text-sm font-semibold text-black dark:text-white ">
            Email{" "}
          </label>
          <Input
            type="text"
            className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3"
            value={"jasonstatham@gmail.com"}
          />
        </div>
        <div className="flex gap-1 flex-col ">
          <label className=" text-sm font-semibold text-black dark:text-white ">
            Mobile{" "}
          </label>
          <Input
            type="tel"
            className="text-sm text-gray-900 dark:text-foreground bg-gray-100 rounded-md p-3"
            placeholder="Enter Number"
          />
        </div>
        <div className="flex gap-1 flex-col ">
          <label className=" text-sm font-semibold text-black dark:text-white ">
            Date of birth{" "}
          </label>
          {/* <CalendarComponent date={date} setDate={setDate} /> */}
        </div>
        <SingleSelect
          value={userRole}
          setValue={setUserRole}
          option={UserRoleIF}
          label="Role"
        />
        <SingleSelect
          value={userStatus}
          setValue={setUserStatus}
          option={UserStatusIF}
          label="Status"
        />
      </div>

      <div className=" pt-6 flex gap-5 justify-center items-center w-full">
        <Button
          onClick={() => setState(false)}
          className=" border border-primaryblue min-w-40 text-sm rounded-md text-primaryblue font-semibold dark:border-white dark:text-white"
        >
          Cancel
        </Button>
        <Button
          onClick={() => setState(false)}
          className=" bg-primaryblue text-sm rounded-md min-w-40 text-white font-semibold"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;
