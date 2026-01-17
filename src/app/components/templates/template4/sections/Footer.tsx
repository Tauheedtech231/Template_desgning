"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaArrowUp,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/components/templates/template4/about" },
    { name: "Courses", link: "/components/templates/template4/courses" },
    { name: "Faculty", link: "/components/templates/template4/faculty" },
    { name: "Contact", link: "/components/templates/template4/contact" },
  ];

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // GSAP animations
  useEffect(() => {
    // Footer items animation
    gsap.fromTo(".footer-item",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "footer",
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Social icons animation
    gsap.fromTo(".social-icon",
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.3,
        ease: "back.out(1.7)"
      }
    );

    // Scroll to top button animation
    if (isVisible) {
      gsap.to(".scroll-top-btn",
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)"
        }
      );
    } else {
      gsap.to(".scroll-top-btn",
        {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        }
      );
    }
  }, [isVisible]);

  return (
    <footer className="relative bg-gray-900 text-gray-300 border-t border-gray-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r from-teal-500/5 to-teal-600/3 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-l from-teal-500/5 to-teal-600/3 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                           linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Soft premium glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16">

        {/* Top Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand - Animated with glow effect */}
          <div className="footer-item space-y-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-teal-600 rounded-xl blur-md opacity-30 animate-pulse"></div>
                {/* Logo */}
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center shadow-lg hover:shadow-teal-500/20 transition-shadow duration-300">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight hover:text-teal-400 transition-colors duration-300">
                College
              </h2>
            </div>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed hover:text-gray-300 transition-colors duration-300">
              Dedicated to academic excellence, innovation, and student success.
            </p>

            <div className="flex gap-3">
              {[FaFacebook, FaLinkedin, FaInstagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="social-icon w-10 h-10 rounded-lg bg-gray-800/50 border border-gray-700 flex items-center justify-center
                             hover:bg-teal-600 hover:border-teal-500 hover:scale-110 hover:shadow-lg hover:shadow-teal-500/20
                             transition-all duration-300 transform"
                >
                  <Icon className="text-gray-300 text-sm hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Animated with hover effects */}
         <div className="footer-item">
  <h3 className="text-white font-semibold mb-5 text-lg flex items-center">
    <div className="w-1.5 h-5 bg-teal-500 rounded-full mr-2"></div>
    Quick Links
  </h3>

  <ul className="space-y-3">
    {navItems.map((item, i) => (
      <li key={i} className="group">
        <Link
          href={item.link}
          className="text-sm text-gray-400 hover:text-teal-400 transition-all duration-300 
                     flex items-center gap-2 group-hover:translate-x-1"
        >
          <div className="w-1 h-1 bg-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span>{item.name}</span>
        </Link>
      </li>
    ))}
  </ul>
</div>


          {/* Contact - Enhanced with smooth animations */}
          <div className="footer-item">
            <h3 className="text-white font-semibold mb-5 text-lg flex items-center">
              <div className="w-1.5 h-5 bg-teal-500 rounded-full mr-2"></div>
              Contact
            </h3>

            {/* Desktop */}
            <div className="hidden sm:space-y-4 sm:block">
              <div className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700 flex items-center justify-center 
                               group-hover:bg-teal-600/20 group-hover:border-teal-500/50 transition-all duration-300">
                  <FaMapMarkerAlt className="text-teal-400 text-sm group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  Education Street, Academic City
                </span>
              </div>
              
              <div className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700 flex items-center justify-center 
                               group-hover:bg-teal-600/20 group-hover:border-teal-500/50 transition-all duration-300">
                  <FaPhone className="text-teal-400 text-sm group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  +1 (555) 123-4567
                </span>
              </div>
              
              <div className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700 flex items-center justify-center 
                               group-hover:bg-teal-600/20 group-hover:border-teal-500/50 transition-all duration-300">
                  <FaEnvelope className="text-teal-400 text-sm group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  contact@college.edu
                </span>
              </div>
            </div>

            {/* Mobile – icons only */}
            <div className="flex sm:hidden gap-4">
              {[FaMapMarkerAlt, FaPhone, FaEnvelope].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-lg bg-gray-800/50 border border-gray-700 flex items-center justify-center
                             hover:bg-teal-600 hover:scale-110 hover:shadow-lg transition-all duration-300"
                >
                  <Icon className="text-teal-400 text-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800/50 flex flex-col sm:flex-row
                        justify-between items-center gap-6">
          <p className="text-xs text-gray-500 hover:text-gray-400 transition-colors duration-300">
            © {year} College. All rights reserved.
          </p>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="scroll-top-btn w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 
                       flex items-center justify-center hover:bg-teal-600 hover:scale-110 hover:shadow-xl
                       hover:shadow-teal-500/20 active:scale-95 transition-all duration-300
                       focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="text-sm text-gray-300 group-hover:text-white group-hover:-translate-y-0.5 transition-all duration-300" />
          </button>
        </div>
      </div>

      {/* Glowing Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
    </footer>
  );
};