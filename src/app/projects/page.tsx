"use client";

import { motion } from "framer-motion";

export default function ProjectsComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white pt-24">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl text-center font-bold leading-snug bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text"
      >
        Project Showcase Coming Soon
      </motion.h1>

      <p className="mt-4 text-lg text-gray-400 text-center">
        We're building something amazing! Stay tuned for the launch of our
        projects platform.
      </p>

      {/* Optional Call-to-Action Button */}
      <motion.a
        href="/"
        className="mt-8 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition"
        whileHover={{ scale: 1.05 }}
      >
        Return Home
      </motion.a>

      {/* Subtle Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 text-gray-600 text-sm"
      >
        🚀 Awesome things ahead!
      </motion.div>
    </div>
  );
}
