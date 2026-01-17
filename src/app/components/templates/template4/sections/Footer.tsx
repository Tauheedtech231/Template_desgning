"use client";

import React from "react";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaArrowUp,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-gray-900 text-gray-300 border-t border-gray-800 overflow-hidden">
      
      {/* Soft premium glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12">

        {/* Top Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-600/30">
                <span className="text-white font-bold">C</span>
              </div>
              <h2 className="text-lg font-bold text-white">College</h2>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 max-w-sm">
              Dedicated to academic excellence, innovation, and student success.
            </p>

            <div className="flex gap-3">
              {[FaFacebook, FaLinkedin, FaInstagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center
                             hover:bg-teal-600 hover:scale-110 transition-all duration-300"
                >
                  <Icon className="text-sm text-gray-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["Home", "About", "Courses", "Faculty", "Contact"].map(
                (item, i) => (
                  <li key={i}>
                    <Link
                      href="#"
                      className="hover:text-teal-400 transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>

            {/* Desktop */}
            <div className="hidden sm:space-y-4 sm:block text-sm">
              <div className="flex gap-3">
                <FaMapMarkerAlt className="text-teal-400 mt-1" />
                <span>Education Street, Academic City</span>
              </div>
              <div className="flex gap-3">
                <FaPhone className="text-teal-400 mt-1" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex gap-3">
                <FaEnvelope className="text-teal-400 mt-1" />
                <span>contact@college.edu</span>
              </div>
            </div>

            {/* Mobile – icons only */}
            <div className="flex sm:hidden gap-4">
              {[FaMapMarkerAlt, FaPhone, FaEnvelope].map((Icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center"
                >
                  <Icon className="text-teal-400 text-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row
                        justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {year} College. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center
                       hover:bg-teal-600 hover:scale-110 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="text-sm" />
          </button>
        </div>
      </div>
    </footer>
  );
};
