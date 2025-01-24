import React, { FC } from "react";
import errorimage from "@/asset/icon/error.svg";
import Image from "next/image";

interface ComponentProps {
  error: string;
}

const Error: FC<ComponentProps> = ({error}) => {
  return (
    <div className="flex gap-2 items-center">
      <Image height={12} width={12} src={errorimage} alt="error" />
      <span className="text-xs text-red-800 font-semibold m-0 ">{error}</span>
    </div>
  );
};

export default Error;
