'use client';

import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { motion } from 'framer-motion';

interface HeaderProps {
  collegeName: string;
}

export function Header({ collegeName }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Left side: Brand */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
          College Portfolio Portal
          </h1>
          {collegeName && (
            <p className="text-sm sm:text-base mt-1 text-gray-600 dark:text-gray-400 tracking-wide">
  Managing content {" "}
  <span className="font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
    
  </span>
</p>

          )}
        </motion.div>

        {/* Right side: Controls */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="hidden sm:inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:shadow-lg transition-all duration-300">
            Dashboard
          </button>
        </div>
      </div>
    </header>
  );
}
