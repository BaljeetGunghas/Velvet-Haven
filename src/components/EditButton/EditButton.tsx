import Image from "next/image";
import React from "react";
import edit from "@/asset/icon/edit.svg";
import { motion } from "framer-motion";

interface ComponentProps {
  setState: (val: boolean) => void;
}

export const EditButton = ({ setState }: ComponentProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setState(true)}
      className="group relative h-12 w-12 md:h-14 md:w-14 rounded-full bg-gradient-to-br from-accent-gold to-accent-gold/80 hover:from-accent-gold/90 hover:to-accent-gold text-white shadow-lg hover:shadow-xl hover:shadow-accent-gold/40 transition-all duration-300 flex items-center justify-center border-2 border-accent-gold/50 dark:border-accent-gold/30 cursor-pointer"
      title="Edit Profile"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>

      {/* Edit Icon */}
      <div className="relative z-10 flex items-center justify-center">
        <Image
          src={edit}
          alt="edit"
          className="h-6 w-6 md:h-7 md:w-7 object-contain filter brightness-0 invert"
        />
      </div>

      {/* Tooltip on hover */}
      <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        <div className="bg-gradient-to-r from-primary-green to-primary-green/80 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
          Edit Profile
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-primary-green"></div>
      </div>
    </motion.button>
  );
};
