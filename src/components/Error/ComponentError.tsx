"use client";

import React, { FC } from "react";
import errorimage from "@/asset/error.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";


interface ComponentProps {
    error: string;
    reload: () => void;
}

const ComponentError: FC<ComponentProps> = ({ error, reload }) => {
    return (
        <div className="flex flex-col gap-2 items-center justify-start">
            <Image height={72} width={72} className="h-72 w-72" src={errorimage} alt="error" />
            <h2 className="text-black dark:text-white font-semibold text-xl">Something Went Wrong</h2>
            <span className="text-xs text-[#7B899D] font-semibold m-0">{error}</span>
            <Button
                onClick={reload}
                className="text-sm text-primaryblue dark:text-white border border-primaryblue dark:border-white my-3 rounded-md"
            >
                Try Again
            </Button>
        </div>
    );
};

export default ComponentError;
