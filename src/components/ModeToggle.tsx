"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import CustomTooltip from "./Tooltip/Tooltip";
import { motion } from "framer-motion";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <CustomTooltip content={resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}>
        <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex justify-center items-center h-10 w-10 rounded-full cursor-pointer transition-all duration-300 border-2 group ${
          resolvedTheme === "dark"
            ? "border-accent-gold bg-accent-gold/10 hover:bg-accent-gold/20"
            : "border-primary-green bg-primary-green/5 hover:bg-primary-green/10"
        }`}
      >
        <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-300 ${
          resolvedTheme === "dark" ? "bg-accent-gold" : "bg-primary-green"
        }`} />

        {resolvedTheme === "dark" ? (
          <motion.div
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sun
              onClick={() => setTheme("light")}
              size={20}
              className="cursor-pointer text-accent-gold transition-all duration-300 hover:drop-shadow-lg relative z-10"
              strokeWidth={1.5}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Moon
              onClick={() => setTheme("dark")}
              size={20}
              className="cursor-pointer text-primary-green transition-all duration-300 hover:drop-shadow-lg relative z-10"
              strokeWidth={1.5}
            />
          </motion.div>
        )}
        </motion.button>
      </CustomTooltip>
    </div>
  );
}
