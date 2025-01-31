import Image from "next/image";
import React from "react";
import edit from "@/asset/icon/edit.svg";
interface ComponentProps {
  setState: (val: boolean) => void;
}
export const EditButton = ({ setState }: ComponentProps) => {
  return (
    <div
      className=" h-10 w-10 rounded-full bg-primaryblue dark:bg-foreground text-white p-2 cursor-pointer grid place-items-center absolute top-4 right-4 "
      onClick={() => setState(true)}
    >
      <Image src={edit} alt="edit" className=" h-full w-full object-cover" />
    </div>
  );
};
