"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Link from "next/link";

import { parseCookies } from "nookies";
import { useHandleLogout } from "../../Hooks/handleLogout";
// import Image from "next/image";

// const userAvatar = "@/asset/useravatar.svg";

const AvatarDropdown = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { userDetails } = useSelector((state: RootState) => state.userProfile);
  const handleLogout = useHandleLogout();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cookies = parseCookies();
  const userRole = cookies.userRole;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      {/* Avatar */}
      <div className="w-10 h-10 bg-slate-400 rounded-full grid place-items-center cursor-pointer">
        <Avatar className="w-10 h-10 bg-slate-400 rounded-full grid place-items-center">
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${
              userDetails?.profile_picture
                ? userDetails?.profile_picture
                : user?.profile_picture
            }`}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover "
          />
          <AvatarFallback>
            {user?.name
              ? user.name
                  .split(" ")
                  .map((word) => word[0].toUpperCase())
                  .join(" ")
              : "G U"}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 w-48 pt-2">
          <div className=" bg-white rounded-lg shadow-lg transition-opacity duration-200 z-10">
            <ul className="py-2">
              <li>
                <Link
                  href="/Auth/myprofile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  View Profile
                </Link>
              </li>
              {userRole === "host" && (
                <li>
                  <Link
                    href="/Admin/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Admin
                  </Link>
                </li>
              )}
              <li>
              <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
