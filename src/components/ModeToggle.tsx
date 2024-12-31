"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import CustomTooltip from "./Tooltip/Tooltip";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const { resolvedTheme } = useTheme();
  return (
    <CustomTooltip content="Change theam">
      <div className="flex justify-end items-center p-1.5 border-dashed border-white border-l h-8 w-8 rounded-2xl cursor-pointer">
        {resolvedTheme === "dark" ? (
          <Sun
            onClick={() => setTheme("light")}
            className=" cursor-pointer h-[1.2rem] w-[1.2rem] scale-100 transition-all "
          />
        ) : (
          <Moon
            onClick={() => setTheme("dark")}
            className="absolute h-[1.2rem] w-[1.2rem] text-white transition-all dark:rotate-0 dark:scale-200"
          />
        )}
      </div>
    </CustomTooltip>
  );
}
