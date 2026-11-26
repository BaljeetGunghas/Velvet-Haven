"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Login from "./Login";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";

interface LoginRegistrationModelProps {
  onClose?: () => void;
}

type ModalView = "login" | "register" | "forgot-password";

const LoginRegistrationModel = ({ onClose }: LoginRegistrationModelProps) => {
  const [currentView, setCurrentView] = useState<ModalView>("login");

  // Lock body scroll when modal opens
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6"
      onClick={handleClose}
    >
      {/* Main Modal Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className="relative w-full max-w-md bg-white dark:bg-slate-700 rounded-2xl shadow-2xl shadow-black/40 border border-gray-100 dark:border-slate-600 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Gradient Accent */}
        <div className="h-2 sm:h-3 bg-gradient-to-r from-accent-gold via-primary-green to-accent-gold"></div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 hover:text-primary-green dark:hover:text-accent-gold transition-all duration-300 group"
          aria-label="Close modal"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
          {currentView === "login" && (
            <Login
              onChange={(isRegister) => setCurrentView(isRegister ? "register" : "login")}
              onForgotPassword={() => setCurrentView("forgot-password")}
            />
          )}
          {currentView === "register" && (
            <Registration onChange={(isLogin) => setCurrentView(isLogin ? "login" : "register")} />
          )}
          {currentView === "forgot-password" && (
            <ForgotPassword onBack={() => setCurrentView("login")} />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginRegistrationModel;
