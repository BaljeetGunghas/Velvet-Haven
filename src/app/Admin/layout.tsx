"use client";

import Link from "next/link";
import AdminDashboard from "./page";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PiGreaterThanDuotone, PiLessThanDuotone } from "react-icons/pi";
import { motion } from "framer-motion";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const navItems = [
    { name: "Dashboard", path: "/Admin/dashboard" },
    { name: "Hotel", path: "/Admin/hotel" },
    { name: "Room", path: "/Admin/room" },
    { name: "Booking", path: "/Admin/booking" },
    { name: "More", path: "/Admin/more" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 640);
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize); // Listen to resize events

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  return (
    <div className="flex min-h-screen mt-14">
      {/* Sidebar with Animation */}
      <motion.nav
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {isSidebarOpen && (
          <div
            className="w-60  bg-gray-800 text-white p-4 pr-0 duration-300 translate-x-0 relative 
          ransition-all ease-in-out shadow-lg h-full"
          >
            <div className="fixed w-4/5  ">
              <h2 className="text-xl font-bold mb-4">Host Panel</h2>
              <ul>
                {navItems.map(({ name, path }) => (
                  <li key={path} className="mb-2">
                    <Link
                      href={path}
                      className={`block p-2 rounded ${
                        pathname === path ? "bg-gray-700" : "hover:bg-gray-600"
                      }`}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </motion.nav>

      <Button
        variant={"secondary"}
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className={`fixed bg-white dark:bg-foreground top-16 px-3 shadow-lg rounded-full z-10 ${
          isSidebarOpen ? " md left-56" : "left-4"
        } transition-all duration-300`}
      >
        {isSidebarOpen ? <PiLessThanDuotone /> : <PiGreaterThanDuotone />}
      </Button>

      {/* Toggle Sidebar Button */}

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ml-${
          isSidebarOpen ? "60" : "0"
        }`}
      >
        <AdminDashboard>{children}</AdminDashboard>
      </div>
    </div>
  );
}
