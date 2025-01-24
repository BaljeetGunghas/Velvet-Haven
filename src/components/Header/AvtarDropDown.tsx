import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
const userAvtar = "@/asset/useravtar.svg";
import { RootState, AppDispatch } from "@/app/store/store";
import { logout } from "@/app/store/Auth/authSlice";
import Link from "next/link";

const AvatarDropdown = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    dispatch(logout());
  };
console.log(user);

  return (
    <div className="relative group">
      {/* Avatar */}
      <div className="w-10 h-10 bg-slate-400 rounded-full grid place-items-center cursor-pointer">
        <Avatar className="w-10 h-10 bg-slate-400 rounded-full grid place-items-center ">
          <AvatarImage src={userAvtar} alt="userAvtar" />
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
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <ul className="py-2">
          <li>
            <Link
              href="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              View Profile
            </Link>
          </li>
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
  );
};

export default AvatarDropdown;
