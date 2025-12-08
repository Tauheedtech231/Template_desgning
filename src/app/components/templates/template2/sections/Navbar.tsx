"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    {
      name: "Courses / Trainings",
      subItems: [
        { name: "NEBOSH", href: "#nebosh" },
        { name: "IOSH", href: "#iosh" },
        { name: "OSHA", href: "#osha" },
        { name: "BOSH", href: "#bosh" },
        { name: "Hole Watcher", href: "#hole-watcher" },
        { name: "PTW", href: "#ptw" },
        { name: "Fire Safety", href: "#fire-safety" },
        { name: "First Aid", href: "#first-aid" },
      ],
    },
    { name: "Gallery", href: "#gallery" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Admissions", href: "#admissions" },
    // Removed Blog / News
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCoursesOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToSection = (href: string) => {
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
      setActiveDropdown(null);
    }
  };

  const toggleMobileDropdown = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-cream/95 backdrop-blur-md shadow-sm border-b border-gray-200"
          : "bg-cream/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center py-2 md:py-3">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-700 to-orange-500 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xs sm:text-sm">MH</span>
              </div>
            </div>
            <h1
              className={`text-lg sm:text-xl font-black transition-all duration-300 ${
                isScrolled
                  ? "bg-gradient-to-r from-purple-700 to-orange-500 bg-clip-text text-transparent"
                  : "text-purple-800"
              }`}
            >
              Mansol Hub
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item, idx) =>
              item.subItems ? (
                <div key={idx} className="relative" ref={dropdownRef}>
                  <button
                    onMouseEnter={() => setIsCoursesOpen(true)}
                    onMouseLeave={() => setIsCoursesOpen(false)}
                    onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                    className="px-4 py-3 text-base font-semibold text-purple-800 hover:text-orange-500 transition-all duration-200 flex items-center gap-1"
                  >
                    {item.name}
                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        isCoursesOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {isCoursesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden z-50"
                        onMouseEnter={() => setIsCoursesOpen(true)}
                        onMouseLeave={() => setIsCoursesOpen(false)}
                      >
                        <div className="max-h-80 overflow-y-auto">
                          {item.subItems.map((sub, i) => (
                            <a
                              key={i}
                              href={sub.href}
                              onClick={() => scrollToSection(sub.href)}
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 border-b border-gray-100 last:border-b-0 rounded-lg"
                            >
                              {sub.name}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={idx}
                  href={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="px-4 py-3 text-base font-semibold text-purple-800 hover:text-orange-500 transition-all duration-200 whitespace-nowrap rounded-lg"
                >
                  {item.name}
                </a>
              )
            )}

            {/* Contact Button */}
            <button
              onClick={() => scrollToSection("#contact")}
              className="ml-2 px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-purple-700 to-orange-500 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-purple-800 hover:text-orange-500 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-cream/95 backdrop-blur-md shadow-lg border border-gray-200 overflow-hidden"
            >
              <div className="px-2 pt-3 pb-4 max-h-[80vh] overflow-y-auto">
                {/* Mobile Logo */}
                <div className="flex items-center space-x-3 px-3 pb-3 mb-2 border-b border-gray-200">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-700 to-orange-500 flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-xs">MH</span>
                  </div>
                  <h1 className="text-base font-black text-purple-800">Mansol Hub</h1>
                </div>

                {navItems.map((item, idx) =>
                  item.subItems ? (
                    <div key={idx} className="mb-1" ref={mobileDropdownRef}>
                      <button
                        onClick={() => toggleMobileDropdown(item.name)}
                        className="w-full flex justify-between items-center px-3 py-3 rounded-lg text-purple-800 font-semibold text-base hover:bg-gray-50 transition-all duration-200"
                      >
                        <span>{item.name}</span>
                        <svg
                          className={`w-4 h-4 transform transition-transform ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-4 pr-2 space-y-1 overflow-hidden"
                          >
                            {item.subItems.map((sub, i) => (
                              <a
                                key={i}
                                href={sub.href}
                                onClick={() => {
                                  scrollToSection(sub.href);
                                  setActiveDropdown(null);
                                }}
                                className="block px-3 py-2.5 rounded-full text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
                              >
                                {sub.name}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className="block px-3 py-3 rounded-full text-purple-800 hover:text-orange-500 hover:bg-gray-50 transition-all duration-200 text-base"
                    >
                      {item.name}
                    </a>
                  )
                )}

                {/* Contact Button for Mobile */}
                <div className="pt-4 mt-3 border-t border-gray-200">
                  <button
                    onClick={() => scrollToSection("#contact")}
                    className="w-full px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-purple-700 to-orange-500 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Contact Us
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
