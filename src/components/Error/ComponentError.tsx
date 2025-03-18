"use client";

import React, { FC } from "react";
import errorimage from "@/asset/icon/error.svg";
import Image from "next/image";

interface ComponentProps {
    error: string;
    reload: () => void;
}

const ComponentError: FC<ComponentProps> = ({ error, reload }) => {
    return (
        <div className="flex gap-2 items-center">
            <Image height={12} width={12} src={errorimage} alt="error" />
            <span className="text-xs text-red-800 font-semibold m-0">{error}</span>
            <button
                onClick={reload}
                className="px-2 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600"
            >
                Retry
            </button>
        </div>
    );
};

export default ComponentError;
