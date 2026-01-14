"use client";

import React, { useRef } from "react";
import { motion, Variants } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaArrowUp,
  FaChevronRight,
} from "react-icons/fa";

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/components/templates/template4/about" },
    { label: "Courses", href: "/components/templates/template4/courses" },
    { label: "Faculty", href: "/components/templates/template4/faculty" },
    { label: "Contact", href: "/components/templates/template4/contact" },
  ];

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      details: ["123 Education Street", "Academic District"],
    },
    {
      icon: <FaPhone />,
      title: "Phone",
      details: ["+1 (555) 123-4567"],
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      details: ["contact@college.edu"],
    },
  ];

  return (
    <footer ref={footerRef} className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Column */}
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">College</h2>
                <p className="text-sm text-gray-400">Educational Excellence</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 leading-relaxed">
              Committed to quality education and student success since 2005.
            </p>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div 
            variants={itemVariants}
          >
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    className="flex items-center text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200"
                  >
                    <FaChevronRight className="mr-2 text-teal-400 text-xs" />
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div 
            variants={itemVariants}
          >
            <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-400 text-sm">
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white mb-1">
                      {item.title}
                    </h4>
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-xs text-gray-400">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Copyright */}
          <div className="text-sm text-gray-400 text-center md:text-left">
            © {currentYear} College. All rights reserved.
          </div>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-gray-800 hover:bg-teal-500 text-white flex items-center justify-center transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};