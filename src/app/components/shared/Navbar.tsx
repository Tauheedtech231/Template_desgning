"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Events", href: "#events" },
    { name: "Gallery", href: "#gallery" },
    { name: "Faculty", href: "#faculty" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-5">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center space-x-3">

              {/* Circular Logo */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">KC</span>
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-ping"></div>
              </div>

              {/* College Name */}
              <h1
                className={`hidden sm:block text-xl font-black transition-all duration-300 ${
                  isScrolled
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    : "text-white"
                }`}
              >
                Kips College
              </h1>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`
                  px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105
                  ${
                    isScrolled
                      ? "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      : "text-white hover:text-white/80"
                  }
                `}
              >
                {item.name}
              </a>
            ))}

            {/* Join Now Button */}
            <button
              onClick={scrollToContact}
              className={`
                px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg
                ${
                  isScrolled
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "text-white border border-white/40 hover:bg-white/10"
                }
              `}
            >
              Join Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`
                p-2 rounded-full transition-colors duration-200
                ${
                  isScrolled
                    ? "text-gray-700 dark:text-gray-300 hover:text-blue-600"
                    : "text-white hover:text-gray-200"
                }
              `}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="px-4 pt-4 pb-6 space-y-3">
                
                {/* Mobile Logo */}
                <div className="flex items-center space-x-3 px-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">KC</span>
                  </div>
                  <h1 className="text-lg font-black text-gray-800 dark:text-white">
                    Kips College
                  </h1>
                </div>

                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                  >
                    {item.name}
                  </a>
                ))}

                <div className="pt-4 px-4">
                  <button
                    onClick={scrollToContact}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-bold"
                  >
                    Join Now
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
