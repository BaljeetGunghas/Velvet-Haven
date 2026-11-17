"use client";

import { motion } from "framer-motion";

const LoadingComponent = () => {
    return (
        <div className="flex flex-col justify-center items-center h-full min-h-screen gap-6">
            {/* Premium Spinner */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative w-24 h-24"
            >
                {/* Outer rotating circle - Gold */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent-gold border-r-accent-gold/60 shadow-lg shadow-accent-gold/30"
                />

                {/* Middle rotating circle - Green */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 rounded-full border-4 border-transparent border-b-primary-green border-l-primary-green/60 shadow-md shadow-primary-green/20"
                />

                {/* Center dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-3 h-3 rounded-full bg-gradient-to-r from-accent-gold to-primary-green"
                    />
                </div>
            </motion.div>

            {/* Loading Text */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
            >
                <p className="text-lg font-playfair font-semibold text-primary-green dark:text-white mb-1">
                    Loading
                </p>
                <motion.p
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-sm text-accent-gold font-light tracking-widest"
                >
                    Please wait...
                </motion.p>
            </motion.div>
        </div>
    );
};

export default LoadingComponent;