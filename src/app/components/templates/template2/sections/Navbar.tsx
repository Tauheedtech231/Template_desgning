"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    {
      name: "Courses",
      subItems: [
        { name: "NEBOSH", href: "#courses" },
        { name: "IOSH", href: "#courses" },
        { name: "OSHA", href: "#courses" },
        { name: "BOSH", href: "#courses" },
        { name: "Hole Watcher", href: "#courses" },
        { name: "PTW", href: "#courses" },
        { name: "Fire Safety", href: "#courses" },
        { name: "First Aid", href: "#courses" },
      ],
    },
    { name: "Gallery", href: "#gallery" },
    { name: "Team", href: "#faculty" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
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
          ? "bg-white shadow-md border-b border-gray-200"
          : "bg-white/70 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/mansol_logo.jpg"
              alt="Mansol Logo"
              width={100}
              height={40}
              className="object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item, idx) =>
              item.subItems ? (
                <div key={idx} className="relative" ref={dropdownRef}>
                  <button
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    onClick={() => toggleMobileDropdown(item.name)}
                    className="relative group px-2 py-2 font-medium text-black tracking-wide"
                  >
                    {item.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50"
                      >
                        <div className="max-h-80 overflow-y-auto">
                          {item.subItems.map((sub, i) => (
                            <button
                              key={i}
                              onClick={() => scrollToSection(sub.href)}
                              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                            >
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  key={idx}
                  onClick={() => scrollToSection(item.href)}
                  className="relative group px-2 py-2 font-medium text-black tracking-wide"
                >
                  {item.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              )
            )}

            {/* Contact Button */}
            <button
              onClick={() => scrollToSection("#contact")}
              className="ml-4 px-6 py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-md transition-all duration-200 font-medium"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-black p-2 hover:bg-black/5 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="h-7 w-7"
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
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 py-4 space-y-1">
                {navItems.map((item, idx) =>
                  item.subItems ? (
                    <div key={idx} ref={mobileDropdownRef}>
                      <button
                        onClick={() => toggleMobileDropdown(item.name)}
                        className="w-full flex justify-between items-center px-4 py-3 text-black font-medium hover:bg-black/5 rounded-lg"
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
                            className="ml-4 space-y-1 border-l border-gray-300"
                          >
                            {item.subItems.map((sub, i) => (
                              <button
                                key={i}
                                onClick={() => scrollToSection(sub.href)}
                                className="block w-full text-left px-4 py-2.5 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
                              >
                                {sub.name}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <button
                      key={idx}
                      onClick={() => scrollToSection(item.href)}
                      className="w-full text-left px-4 py-3 text-black font-medium hover:bg-black/5 rounded-lg"
                    >
                      {item.name}
                    </button>
                  )
                )}

                <button
  onClick={() => scrollToSection("#contact")}
  className="w-full mt-4 px-6 py-3.5 bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-full font-semibold shadow-md transition-all duration-300"
>
  Contact Us
</button>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
