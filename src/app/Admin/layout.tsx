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
import { LayoutDashboard, Hotel, DoorOpen, Calendar, Settings, ShoppingBag, Heart, LogOut, Plus, Edit, Eye, MessageCircle, BarChart3, AlertCircle } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const userRole = user?.userRole;
  const isHost = isHydrated && (userRole?.toLowerCase() === "host" || userRole?.toLowerCase() === "admin");
  const userName = isHydrated && user?.name ? user.name : "User";
  const displayIcon = isHydrated && isHost ? "🏨" : "👤";

  // Host navigation items - Enhanced for property management
  const hostNavItems = [
    { name: "Dashboard", path: "/Admin/dashboard", icon: LayoutDashboard },
    { name: "Add Hotel", path: "/Admin/hotel", icon: Plus },
    { name: "Manage Hotels", path: "/Admin/hotel-list", icon: Hotel },
    { name: "Add Room", path: "/Admin/room", icon: Plus },
    { name: "Manage Rooms", path: "/Admin/room-management", icon: DoorOpen },
    { name: "Update Pricing", path: "/Admin/update-pricing", icon: BarChart3 },
    { name: "Bookings", path: "/Admin/booking", icon: Calendar },
    { name: "Guest Feedback", path: "/Admin/feedback", icon: MessageCircle },
    { name: "Reviews & Ratings", path: "/Admin/reviews", icon: Eye },
    { name: "Competitor Analysis", path: "/Admin/wishlist", icon: AlertCircle },
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
    setIsHydrated(true);
  }, []);

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
              <h2 className="text-2xl font-playfair font-bold text-accent-gold capitalize truncate">
                {displayIcon} {userName}
              </h2>
              <p className="text-xs text-white/70 mt-1 font-light truncate">
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

      {/* Premium Sidebar Toggle - Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.85 }}
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-8 left-8 z-40 group cursor-pointer"
        title={isSidebarOpen ? "Close Menu" : "Open Menu"}
      >
        <motion.div
          animate={{
            width: isSidebarOpen ? "200px" : "56px",
            paddingLeft: isSidebarOpen ? "16px" : "12px",
            paddingRight: isSidebarOpen ? "16px" : "12px",
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="relative h-14 rounded-full flex items-center justify-between cursor-pointer overflow-hidden"
        >
          {/* Gradient Background */}
          <motion.div
            animate={{
              background: isSidebarOpen
                ? "linear-gradient(135deg, #C9A66B 0%, #B8955F 100%)"
                : "linear-gradient(135deg, #103F38 0%, #0a3d3a 100%)"
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-full"
          />

          {/* Animated Background Glow */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 blur-xl bg-accent-gold transition-opacity duration-300" />

          {/* Premium SVG Icon */}
          <motion.svg
            animate={{ rotate: isSidebarOpen ? 0 : 180 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-6 h-6 text-white flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isSidebarOpen ? (
              // Menu Open Icon
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              // Menu Closed Icon (Hamburger)
              <>
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </>
            )}
          </motion.svg>

          {/* Text Label */}
          <motion.span
            animate={{
              opacity: isSidebarOpen ? 1 : 0,
              marginLeft: isSidebarOpen ? "12px" : "0px"
            }}
            transition={{ duration: 0.3 }}
            className="relative z-10 font-semibold text-sm text-white whitespace-nowrap"
          >
            {isSidebarOpen ? "Close Menu" : ""}
          </motion.span>

          {/* Border Glow */}
          <motion.div
            animate={{
              opacity: 0.3
            }}
            whileHover={{ opacity: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-full border-2 border-white/40 pointer-events-none"
          />

          {/* Shine Effect */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 bg-gradient-to-r from-white/20 via-transparent to-transparent transition-opacity duration-300" />
        </motion.div>
      </motion.button>

      {/* Toggle Sidebar Button */}

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}
      >
        {children}
      </div>
    </div>
  );
}
