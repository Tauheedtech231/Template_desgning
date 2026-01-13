"use client";

import React, { useRef } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaArrowUp,
  FaChevronRight,
  FaBookOpen,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCalendarAlt,
} from "react-icons/fa";

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Campus Location",
      details: ["123 Education Street", "Academic District", "City, State 12345"],
    },
    {
      icon: <FaPhone />,
      title: "Contact Numbers",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    },
    {
      icon: <FaEnvelope />,
      title: "Email Addresses",
      details: ["admissions@college.edu", "info@college.edu"],
    },
    {
      icon: <FaClock />,
      title: "Office Hours",
      details: ["Mon – Fri: 8:00 AM – 6:00 PM", "Sat: 9:00 AM – 2:00 PM"],
    },
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/components/templates/template4/about" },
    { label: "Programs", href: "/components/templates/template4/courses" },
    { label: "Faculty", href: "/components/templates/template4/faculty" },
    { label: "Contact", href: "/components/templates/template4/contact" },
  ];

  const programs = [
    "Computer Science",
    "Business Administration",
    "Engineering",
    "Health Sciences",
    "Arts & Humanities",
    "Research Programs",
  ];

  const accreditation = [
    { name: "Accredited College", icon: <FaBookOpen /> },
    { name: "Government Approved", icon: <FaChalkboardTeacher /> },
    { name: "Quality Certified", icon: <FaUserGraduate /> },
  ];

  return (
    <>
      <style jsx global>{`
        .footer-link-item {
          transition: all 0.3s ease;
        }
        .footer-link-item:hover {
          transform: translateX(4px);
          color: #e86a58 !important;
        }

        .contact-item:hover .contact-icon-container {
          background-color: #e86a58;
          border-color: #e86a58;
        }
        .contact-item:hover .contact-icon {
          color: white;
        }
        .contact-item:hover .contact-title {
          color: #e86a58;
        }

        .program-item:hover {
          transform: translateX(2px);
        }
        .program-item:hover .program-text {
          color: #e86a58;
        }

        .back-to-top:hover {
          background-color: #bf4e3a;
          transform: scale(1.05);
        }
      `}</style>

      <footer ref={footerRef} className="relative bg-[#000821] text-[#D1D5DB]">
        <div className="h-px bg-[#0B1033] w-full" />

        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#E86A58] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <div>
                  <h2 className="text-lg font-medium text-white">
                    Excel College
                  </h2>
                  <p className="text-sm text-gray-300">
                    of Professional Studies
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-gray-300">
                A premier educational institution committed to academic
                excellence and professional growth since 2005.
              </p>

              <div className="pt-6 border-t border-[#0B1033]">
                <p className="text-sm mb-3 font-medium text-white">
                  Accreditation
                </p>
                <div className="space-y-2">
                  {accreditation.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span className="text-[#E86A58]">{item.icon}</span>
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-medium text-white mb-6 border-b border-[#0B1033] pb-3">
                Quick Navigation
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="footer-link-item flex items-center text-sm"
                    >
                      <FaChevronRight className="mr-2 text-[#E86A58]" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h3 className="text-lg font-medium text-white mb-6 border-b border-[#0B1033] pb-3">
                Academic Programs
              </h3>
              <ul className="space-y-3">
                {programs.map((p, i) => (
                  <li key={i} className="program-item text-sm text-gray-300">
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-medium text-white mb-6 border-b border-[#0B1033] pb-3">
                Contact Information
              </h3>
              <div className="space-y-5">
                {contactInfo.map((item, i) => (
                  <div key={i} className="contact-item flex gap-3">
                    <div className="contact-icon-container w-9 h-9 rounded-lg bg-[#0B1033] border border-[#121A4D] flex items-center justify-center">
                      <span className="contact-icon text-[#E86A58] text-sm">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <h4 className="contact-title text-sm font-semibold text-white mb-1">
                        {item.title}
                      </h4>
                      {item.details.map((d, idx) => (
                        <p key={idx} className="text-xs text-gray-300">
                          {d}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-[#0B1033] flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <FaCalendarAlt className="text-[#E86A58]" />
              © {currentYear} Excel College. All rights reserved.
            </div>

            <button
              onClick={scrollToTop}
              className="back-to-top w-10 h-10 rounded-lg bg-[#E86A58] flex items-center justify-center text-white"
            >
              <FaArrowUp />
            </button>
          </div>
        </div>

        <div className="h-px bg-[#0B1033] w-full" />
      </footer>
    </>
  );
};
