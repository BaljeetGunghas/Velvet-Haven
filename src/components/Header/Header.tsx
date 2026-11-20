"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import logo from "@/asset/logo.png";
import LoginRegistrationModel from "../LoginRegModel/LoginRegistrationModel";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import AvatarDropdown from "./AvtarDropDown";
import { Menu, X, Home, Info, Mail, MapPin, UtensilsCrossed, LogIn } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  const [isRegistrationModelOpen, setIsRegistrationModelOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const pathname = usePathname();

  const headerLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "About", href: "/About", icon: Info },
    { label: "Contact", href: "/Contact", icon: Mail },
    { label: "Location", href: "/Location", icon: MapPin },
    { label: "Dining", href: "/Dining", icon: UtensilsCrossed },
  ];

  // Mark component as hydrated
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setIsRegistrationModelOpen(false);
    }
  }, [isAuthenticated]);

  // Scroll detection for header background transition
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Premium Navigation Header */}
      <header
        className={`fixed inset-0 z-40 h-16 sm:h-20 transition-all duration-300 ${
          isScrolled
            ? "bg-white dark:bg-[#103F38] shadow-2xl shadow-[#103F38]/40"
            : "bg-[#103F38] dark:bg-[#103F38] shadow-lg shadow-[#103F38]/20"
        }`}
      >
        <div className="w-full mx-auto px-28 max-sm:px-3 h-full flex justify-between items-center py-2 sm:py-4">
          {/* Logo with Brand Color */}
          <Link
            href="/"
            className="flex items-center gap-2 lg:gap-3 group flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <Image
                src={logo}
                alt="Velvet-Haven Logo"
                width={40}
                height={40}
                className="transition-all duration-300 group-hover:scale-125 w-auto h-auto rounded-full shadow-lg group-hover:shadow-xl sm:w-12 sm:h-12"
              />
              <span className={`font-playfair text-sm sm:text-base lg:text-xl font-bold transition-all duration-300 whitespace-nowrap tracking-wide ${
                isScrolled
                  ? "text-primary-green dark:text-white drop-shadow-sm"
                  : "text-white dark:text-white drop-shadow-lg"
              }`}>
                Velvet Haven
              </span>
              {/* Vertical Divider */}
              <div className={`hidden lg:block w-px h-6 transition-all duration-300 ${
                isScrolled
                  ? "bg-accent-gold/40"
                  : "bg-accent-gold/30"
              }`}></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="flex items-center max-md:hidden gap-1 lg:gap-3">
            {headerLinks.map((link) => {
              const IconComponent = link.icon;
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-2 lg:px-4 lg:py-2.5 rounded-full transition-all duration-300 relative group font-semibold text-xs lg:text-sm border-b-2 ${
                      isActive
                        ? "text-accent-gold border-accent-gold"
                        : isScrolled
                        ? "text-primary-green dark:text-white hover:bg-accent-gold/30 hover:text-accent-gold hover:shadow-lg shadow-md border-b-2 border-transparent"
                        : "text-white hover:bg-white/20 hover:text-accent-gold hover:shadow-lg border-b-2 border-transparent"
                    }`}
                  >
                    <IconComponent size={16} className="lg:size-18 transition-transform duration-300 group-hover:scale-125" />
                    <span className="text-xs lg:text-sm font-bold tracking-wide">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Sign In Button - Only show when not authenticated and hydrated */}
            {isHydrated && !isAuthenticated && (
              <motion.button
                onClick={() => setIsRegistrationModelOpen(true)}
                whileHover={{ scale: 1.08, boxShadow: "0 10px 30px rgba(197, 164, 109, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className={`hidden sm:flex items-center gap-2 transition-all duration-300 font-bold text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border-2 shadow-xl ${
                  isScrolled
                    ? "border-accent-gold bg-accent-gold text-primary-green hover:shadow-2xl hover:shadow-accent-gold/50"
                    : "border-accent-gold bg-accent-gold/20 text-white hover:bg-accent-gold hover:text-primary-green hover:shadow-2xl hover:shadow-accent-gold/50"
                }`}
              >
                <LogIn size={18} />
                <span className="hidden sm:inline">Sign In</span>
              </motion.button>
            )}
            {/* Avatar Dropdown - Only show when authenticated and hydrated */}
            {isHydrated && isAuthenticated && (
              <div className="hidden sm:block">
                <AvatarDropdown />
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`sm:hidden p-2 rounded-lg transition-all duration-300 ${
                isScrolled
                  ? "hover:bg-primary-green/10 dark:hover:bg-accent-gold/20"
                  : "hover:bg-white/10 dark:hover:bg-primary-green/20"
              }`}
            >
              {isMobileMenuOpen ? (
                <X
                  size={24}
                  className={
                    isScrolled
                      ? "text-primary-green dark:text-accent-gold"
                      : "text-white"
                  }
                />
              ) : (
                <Menu
                  size={24}
                  className={
                    isScrolled
                      ? "text-primary-green dark:text-accent-gold"
                      : "text-white"
                  }
                />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={
          isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }
        }
        transition={{ duration: 0.3 }}
        className={`fixed top-16 sm:top-20 left-0 right-0 bottom-0 z-30 sm:hidden min-h-screen bg-gradient-to-b from-primary-green to-primary-green/95 dark:bg-primary-green shadow-2xl shadow-primary-green/50 overflow-y-auto ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(23, 61, 53, 1) 0%, rgba(23, 61, 53, 0.95) 60%, rgba(23, 61, 53, 0.7) 100%)'
        }}
      >
        {/* Mobile Menu Items */}
        <nav className="flex flex-col gap-1 p-4 relative">
          {headerLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <motion.div key={link.label} whileHover={{ x: 8 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 px-5 py-4 text-white hover:bg-accent-gold/25 hover:text-accent-gold rounded-xl transition-all duration-300 font-semibold group hover:shadow-md"
                >
                  <div className="p-2.5 bg-accent-gold/10 rounded-lg group-hover:bg-accent-gold/30 transition-all duration-300">
                    <IconComponent size={22} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-base">{link.label}</span>
                </Link>
              </motion.div>
            );
          })}

          {/* Divider */}
          {isHydrated && <div className="my-2 border-t border-accent-gold/20"></div>}

          {/* Mobile Sign In - Only show when not authenticated and hydrated */}
          {isHydrated && !isAuthenticated && (
            <motion.div whileHover={{ x: 8 }} whileTap={{ scale: 0.98 }}>
              <motion.button
                onClick={() => {
                  setIsRegistrationModelOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center gap-4 px-5 py-4 bg-accent-gold/20 border-2 border-accent-gold text-white hover:bg-accent-gold/30 rounded-xl transition-all duration-300 font-bold group"
              >
                <LogIn size={22} className="group-hover:scale-110 transition-transform" />
                <span>Sign In</span>
              </motion.button>
            </motion.div>
          )}
        </nav>
      </motion.div>

      {/* Login/Registration Modal */}
      {isHydrated && isRegistrationModelOpen && (
        <LoginRegistrationModel
          onClose={() => setIsRegistrationModelOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
