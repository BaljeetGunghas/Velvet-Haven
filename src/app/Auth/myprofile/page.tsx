"use client";

import React, { FC, useEffect, useState } from "react";
import { EditButton } from "@/components/EditButton/EditButton";
import ViewProfile from "./Component/ViewProfile";
import EditProfile from "./Component/EditProfile";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { userProfile } from "@/app/store/Profile/userProfileSlice";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useHandleLogout } from "@/Hooks/handleLogout";
import { toast } from "react-toastify";

const Page: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const handleLogout = useHandleLogout();

  const { user } = useSelector((state: RootState) => state.auth);
  const { userDetails, error } = useSelector(
    (state: RootState) => state.userProfile
  );
  const [isEditEnable, setIsEditEnable] = useState<boolean>(false);

  // Handle 401 errors and redirect
  useEffect(() => {
    if (error && error.includes("Session expired")) {
      toast.error("Your session has expired. Please login again.");
      handleLogout();
    }
  }, [error, handleLogout]);

  // Check if user is authenticated
  useEffect(() => {
    if (!user) {
      toast.info("Please login to view your profile");
      router.push("/");
    }
  }, [user, router]);

  useEffect(() => {
    if (user) {
      if (user?.id && !userDetails) {
        dispatch(userProfile({ _id: user.id }));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 pt-20 sm:pt-24 lg:pt-28">
      {/* Hero Section - Premium Luxury */}
      <section className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12 sm:py-14 lg:py-16 overflow-hidden">
        {/* Background Decorative Elements - Subtle */}
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-accent-gold/3 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-5 w-48 h-48 sm:w-60 sm:h-60 bg-primary-green/3 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="h-0.5 w-8 bg-gradient-to-r from-accent-gold/30 to-accent-gold"></div>
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[2.5px] text-accent-gold">
              Account Management
            </span>
            <div className="h-0.5 w-8 bg-gradient-to-l from-accent-gold/30 to-accent-gold"></div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-semibold text-center text-primary-green dark:text-white mb-4 leading-tight"
          >
            My <span className="text-accent-gold">Profile</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Manage your personal information, account settings, and preferences
          </motion.p>
        </div>
      </section>

      {/* Main Content Section - Premium */}
      <section className="relative w-full py-8 sm:py-10 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl hover:shadow-accent-gold/20 transition-all duration-300 overflow-hidden max-w-4xl mx-auto"
          >
            {/* Header Bar with Edit Button */}
            <div className="flex justify-between items-center p-6 sm:p-8 lg:p-10 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-white/50 to-slate-50/50 dark:from-slate-800/50 dark:to-slate-700/50">
              <h2 className="text-2xl font-playfair font-semibold text-primary-green dark:text-white">
                Account Details
              </h2>
              {!isEditEnable && <EditButton setState={setIsEditEnable} />}
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 lg:p-10">
              {isEditEnable ? (
                <EditProfile setState={setIsEditEnable} />
              ) : (
                <ViewProfile />
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Page;
