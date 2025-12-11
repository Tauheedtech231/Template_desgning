"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  const desktopRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileRefs = useRef<(HTMLDivElement | null)[]>([]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/components/templates/template2/about" },
    {
      name: "Courses",
      subItems: [
        { name: "NEBOSH", href: "/components/templates/template2/courses" },
        { name: "IOSH", href: "/courses/iosh" },
        { name: "OSHA", href: "/courses/osha" },
        { name: "BOSH", href: "/courses/bosh" },
        { name: "Hole Watcher", href: "/courses/hole-watcher" },
        { name: "PTW", href: "/courses/ptw" },
        { name: "Fire Safety", href: "/courses/fire-safety" },
        { name: "First Aid", href: "/courses/first-aid" },
      ],
    },
    { name: "Gallery", href: "/components/templates/template2/gallery" },
    { name: "Team", href: "/components/templates/template2/faculty" },
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside for desktop
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopRefs.current.every(
          (ref) => ref && !ref.contains(event.target as Node)
        )
      ) {
        setDesktopDropdown(null);
      }
      if (
        mobileRefs.current.every(
          (ref) => ref && !ref.contains(event.target as Node)
        )
      ) {
        setMobileDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <Link href="/" className="flex items-center">
            <Image
              src="/mansol_logo.jpg"
              alt="Mansol Logo"
              width={100}
              height={40}
              className="object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item, idx) =>
              item.subItems ? (
                <div
                  key={idx}
  className="relative"
  ref={(el) => {
    desktopRefs.current[idx] = el; // no return
  }}
                  onMouseEnter={() => setDesktopDropdown(item.name)}
                  onMouseLeave={() => setDesktopDropdown(null)}
                >
                  <button className="relative group px-2 py-2 font-medium text-black tracking-wide">
                    {item.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </button>

                  <AnimatePresence>
                    {desktopDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50"
                      >
                        <div className="max-h-80 overflow-y-auto">
                          {item.subItems.map((sub, i) => (
                            <Link
                              key={i}
                              href={sub.href}
                              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={idx}
                  href={item.href}
                  className="relative group px-2 py-2 font-medium text-black tracking-wide"
                >
                  {item.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              )
            )}

            {/* Contact Button */}
            <Link
              href="/components/templates/template2/contact"
              className="ml-4 px-6 py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-md transition-all duration-200 font-medium"
            >
              Contact Us
            </Link>
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
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
                    <div
  key={idx}
  ref={(el) => {
    mobileRefs.current[idx] = el; // no return
  }}
>

                      <button
                        onClick={() =>
                          setMobileDropdown(
                            mobileDropdown === item.name ? null : item.name
                          )
                        }
                        className="w-full flex justify-between items-center px-4 py-3 text-black font-medium hover:bg-black/5 rounded-lg"
                      >
                        <span>{item.name}</span>
                        <svg
                          className={`w-4 h-4 transform transition-transform ${
                            mobileDropdown === item.name ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      <AnimatePresence>
                        {mobileDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-4 space-y-1 border-l border-gray-300"
                          >
                            {item.subItems.map((sub, i) => (
                              <Link
                                key={i}
                                href={sub.href}
                                className="block w-full text-left px-4 py-2.5 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={idx}
                      href={item.href}
                      className="w-full text-left px-4 py-3 text-black font-medium hover:bg-black/5 rounded-lg block"
                    >
                      {item.name}
                    </Link>
                  )
                )}

                <Link
                  href="/components/templates/template2/contact"
                  className="w-full mt-4 px-6 py-3.5 bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-full font-semibold shadow-md transition-all duration-300 block text-center"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
