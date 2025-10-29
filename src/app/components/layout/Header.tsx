'use client';
import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { motion } from 'framer-motion';

interface HeaderProps {
  collegeName: string;
}

export function Header({ collegeName }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Left side: Brand */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2"
        >
          <h1 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
            College Portfolio Portal
          </h1>
          {collegeName && (
            <p className="text-xs sm:text-base text-gray-600 dark:text-gray-400 tracking-wide">
              Managing content{' '}
              <span className="font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                {collegeName}
              </span>
            </p>
          )}
        </motion.div>

        {/* Right side: Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/">
            <button className="inline-flex items-center px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium text-sm sm:text-base hover:shadow-lg transition-all duration-300">
              Home
            </button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
