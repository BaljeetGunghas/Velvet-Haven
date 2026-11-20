"use client";

import Link from "next/link";
// import AdminDashboard, { AdminProps } from "./page";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PiGreaterThanDuotone, PiLessThanDuotone } from "react-icons/pi";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { LayoutDashboard, Hotel, DoorOpen, Calendar, Settings, ShoppingBag, Heart, LogOut } from "lucide-react";

// export default function AdminLayout({
//   children,
// }: AdminProps) {
export default function AdminLayout() {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const { userRole } = useSelector((state: RootState) => state.auth);
  const isHost = userRole?.toLowerCase() === "host" || userRole?.toLowerCase() === "admin";

  // Host navigation items
  const hostNavItems = [
    { name: "Dashboard", path: "/Admin/dashboard", icon: LayoutDashboard },
    { name: "Hotels", path: "/Admin/hotel", icon: Hotel },
    { name: "Rooms", path: "/Admin/room", icon: DoorOpen },
    { name: "Bookings", path: "/Admin/booking", icon: Calendar },
    { name: "Settings", path: "/Admin/settings", icon: Settings },
  ];

  // Customer navigation items
  const customerNavItems = [
    { name: "Dashboard", path: "/Admin/dashboard", icon: LayoutDashboard },
    { name: "My Bookings", path: "/Admin/bookings", icon: Calendar },
    { name: "Wishlist", path: "/Admin/wishlist", icon: Heart },
    { name: "Orders", path: "/Admin/orders", icon: ShoppingBag },
    { name: "Settings", path: "/Admin/settings", icon: Settings },
  ];

  const navItems = isHost ? hostNavItems : customerNavItems;

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
        className="fixed h-screen z-20"
      >
        {isSidebarOpen && (
          <div className="w-64 bg-gradient-to-b from-primary-green via-primary-green/95 to-primary-green/90 text-white h-screen overflow-y-auto shadow-xl">
            <div className="p-6 sticky top-0 bg-primary-green/95 border-b border-accent-gold/20">
              <h2 className="text-2xl font-playfair font-bold text-accent-gold">
                {isHost ? "🏨 Host" : "👤 Guest"}
              </h2>
              <p className="text-xs text-white/70 mt-1 font-light">
                {isHost ? "Management Panel" : "My Account"}
              </p>
            </div>

            <ul className="p-4 space-y-2">
              {navItems.map(({ name, path, icon: Icon }) => {
                const isActive = pathname === path;
                return (
                  <li key={path}>
                    <Link
                      href={path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                        isActive
                          ? "bg-accent-gold text-primary-green shadow-lg shadow-accent-gold/30"
                          : "text-white hover:bg-white/10 hover:translate-x-1"
                      }`}
                    >
                      <Icon size={20} className="flex-shrink-0" />
                      <span className="text-sm">{name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Divider */}
            <div className="mx-4 my-4 border-t border-white/10"></div>

            {/* Logout */}
            <div className="p-4">
              <Link
                href="/logout"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-red-500/20 transition-all duration-300 font-medium"
              >
                <LogOut size={20} className="flex-shrink-0" />
                <span className="text-sm">Logout</span>
              </Link>
            </div>
          </div>
        )}
      </motion.nav>

      <Button
        variant={"secondary"}
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className={`fixed bg-white dark:bg-foreground top-16 px-3 shadow-lg rounded-full z-10 ${isSidebarOpen ? " md left-56" : "left-4"
          } transition-all duration-300`}
      >
        {isSidebarOpen ? <PiLessThanDuotone /> : <PiGreaterThanDuotone />}
      </Button>

      {/* Toggle Sidebar Button */}

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}
      >
        {/* Content rendered by child pages */}
      </div>
    </div>
  );
}
