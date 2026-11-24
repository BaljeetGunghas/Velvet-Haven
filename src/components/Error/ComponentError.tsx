"use client";

import React, { FC } from "react";
import errorimage from "@/asset/error.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";


interface ComponentProps {
    error: string;
    reload: () => void;
}

const ComponentError: FC<ComponentProps> = ({ error, reload }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen w-full bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 flex flex-col gap-6 items-center justify-center py-20 px-4"
        >
            {/* Decorative background gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-accent-gold/10 to-primary-green/5 rounded-full blur-3xl opacity-40"></div>
                <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-primary-green/10 to-accent-gold/5 rounded-full blur-3xl opacity-40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center">
                {/* Error Image */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex justify-center mb-12"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 to-primary-green/20 rounded-full blur-2xl w-80 h-80 mx-auto"></div>
                        <Image
                            height={120}
                            width={120}
                            className="h-32 w-32 relative z-10 opacity-90"
                            src={errorimage}
                            alt="error"
                        />
                    </div>
                </motion.div>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-3xl md:text-4xl font-playfair font-bold text-primary-green dark:text-white mb-4 text-center"
                >
                    Something Went Wrong
                </motion.h2>

                {/* Error Message */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-light mb-8 text-center max-w-lg px-4"
                >
                    {error}
                </motion.p>

                {/* Try Again Button - Premium */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Button
                        onClick={reload}
                        className="bg-gradient-to-r from-accent-gold to-accent-gold/90 hover:from-accent-gold/95 hover:to-accent-gold/85 text-white px-8 md:px-10 py-3 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-accent-gold/30 hover:scale-105 transform"
                    >
                        Try Again
                    </Button>
                </motion.div>

                {/* Optional help text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-xs md:text-sm text-gray-500 dark:text-gray-500 mt-8 font-light text-center"
                >
                    If the problem persists, please try refreshing the page
                </motion.p>
            </div>
        </motion.div>
    );
};

export default ComponentError;
