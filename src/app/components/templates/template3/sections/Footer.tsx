"use client";

import React, { useRef } from "react";
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaArrowUp,
  FaChevronRight,
  FaCalendarAlt,
  FaBookOpen,
  FaChalkboardTeacher,
  FaUserGraduate
} from "react-icons/fa";

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const mobileContactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      details: ["123 Education Street", "Academic District"]
    },
    {
      icon: <FaPhone />,
      title: "Phone",
      details: ["+1 (555) 123-4567"]
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      details: ["admissions@college.edu"]
    }
  ];

  const mobilePrograms = [
    "FSc Pre-Engineering",
    "FSc Pre-Medical",
    "ICS",
    "I.Com"
  ];

  // Desktop data (unchanged)
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Campus Location",
      details: ["123 Education Street", "Academic District", "City, State 12345"]
    },
    {
      icon: <FaPhone />,
      title: "Contact Numbers",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543", "+1 (555) 456-7890"]
    },
    {
      icon: <FaEnvelope />,
      title: "Email Addresses",
      details: ["admissions@college.edu", "info@college.edu", "support@college.edu"]
    }
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/components/templates/template3/about" },
    { label: "Programs", href: "/components/templates/template3/courses" },
    { label: "Contact", href: "/components/templates/template3/contact" }
  ];

  const programs = [
    "FSc Pre-Engineering",
    "FSc Pre-Medical",
    "ICS (Computer Science)",
    "ICS (Statistics)",
    "I.Com (Commerce)",
    "FA (Humanities)",
    "FA (General Arts)",
    "FSc General Science"
  ];

  const accreditation = [
    { name: "Accredited College", icon: <FaBookOpen /> },
    { name: "Government Approved", icon: <FaChalkboardTeacher /> },
    { name: "Quality Certified", icon: <FaUserGraduate /> }
  ];

  return (
    <>
      <style jsx global>{`
        /* Clean hover effects */
        .footer-link-item {
          transition: all 0.3s ease;
        }

        .footer-link-item:hover {
          transform: translateX(5px);
          color: #10B981 !important;
        }

        .footer-link-item:hover .footer-link-chevron {
          opacity: 1;
          transform: translateX(3px);
        }

        /* Contact item hover */
        .contact-item:hover .contact-icon-container {
          background-color: #10B981;
          border-color: #10B981;
        }

        .contact-item:hover .contact-icon {
          color: white;
        }

        .contact-item:hover .contact-title {
          color: #10B981;
        }

        /* Program item hover */
        .program-item:hover {
          transform: translateX(3px);
        }

        .program-item:hover .program-text {
          color: #10B981;
        }

        .program-item:hover .program-dot {
          background-color: #10B981;
        }

        /* Back to top button */
        .back-to-top:hover {
          background-color: #0EA271;
          transform: scale(1.05);
        }
      `}</style>
      
      <footer 
        ref={footerRef} 
        className="relative bg-white text-gray-800"
      >
        {/* Top Divider Line */}
        <div className="h-px bg-gray-200 w-full"></div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 md:py-8 lg:py-12">
          {/* Mobile View - 2 Columns (Programs & Contact Only) */}
          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-4">
              {/* Column 1: Programs */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                  Programs
                </h3>
                <ul className="space-y-2">
                  {mobilePrograms.map((program, index) => (
                    <li key={index} className="program-item">
                      <div className="flex items-center py-1">
                        <div className="program-dot w-1 h-1 bg-gray-400 rounded-full mr-2 flex-shrink-0 transition-all duration-300"></div>
                        <span className="program-text text-xs text-gray-700 transition-colors duration-300 line-clamp-1">
                          {program}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Contact */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                  Contact
                </h3>
                <div className="space-y-3">
                  {mobileContactInfo.map((item, index) => (
                    <div key={index} className="contact-item">
                      <div className="flex items-start space-x-2">
                        <div className="flex-shrink-0 pt-0.5">
                          <div className="contact-icon-container w-6 h-6 rounded-md bg-gray-50 border border-gray-200 flex items-center justify-center transition-all duration-300">
                            <div className="contact-icon text-[#10B981] text-[10px]">
                              {item.icon}
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="contact-title text-xs font-semibold text-gray-900 mb-0.5 transition-colors duration-300">
                            {item.title}
                          </h4>
                          <div className="space-y-0.5">
                            {item.details.map((detail, idx) => (
                              <p key={idx} className="text-[10px] text-gray-600 leading-tight">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop View - Full 4 Columns */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Column 1: Brand & Description */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#34D399] rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Excel College
                  </h2>
                  <p className="text-xs text-gray-600">of Professional Studies</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-xs leading-relaxed">
                A premier educational institution committed to delivering quality education, 
                professional development, and career-focused programs since 2005.
              </p>

              {/* Accreditation */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-700 text-xs mb-2 font-medium">Accreditation</p>
                <div className="space-y-1">
                  {accreditation.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 text-gray-600 text-xs"
                    >
                      <div className="text-[#10B981]">
                        {item.icon}
                      </div>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Quick Navigation
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="footer-link-item flex items-center group relative py-1"
                    >
                      <FaChevronRight className="w-2.5 h-2.5 text-[#10B981] opacity-0 group-hover:opacity-100 mr-1.5 footer-link-chevron transition-all duration-300" />
                      <span className="text-sm text-gray-700 font-medium group-hover:text-[#10B981] transition-colors duration-300">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Programs */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Academic Programs
              </h3>
              <ul className="space-y-2">
                {programs.map((program, index) => (
                  <li key={index} className="program-item">
                    <div className="flex items-center py-1">
                      <div className="program-dot w-1.5 h-1.5 bg-gray-400 rounded-full mr-2.5 flex-shrink-0 transition-all duration-300"></div>
                      <span className="program-text text-sm text-gray-700 transition-colors duration-300">
                        {program}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="contact-item">
                    <div className="flex items-start space-x-2.5">
                      <div className="flex-shrink-0">
                        <div className="contact-icon-container w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center transition-all duration-300">
                          <div className="contact-icon text-[#10B981] text-xs">
                            {item.icon}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="contact-title text-sm font-semibold text-gray-900 mb-1 transition-colors duration-300">
                          {item.title}
                        </h4>
                        <div className="space-y-0.5">
                          {item.details.map((detail, idx) => (
                            <p key={idx} className="text-xs text-gray-600 leading-relaxed">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar - For All Screens */}
          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
            <div className="flex flex-col items-center justify-center space-y-3">
              {/* Copyright & Info */}
              <div className="text-center space-y-1">
                <div className="flex items-center gap-1 justify-center">
                  <FaCalendarAlt className="text-[#10B981] text-[10px] md:text-xs" />
                  <p className="text-gray-600 text-[10px] md:text-xs">
                    &copy; {currentYear} Excel College. All rights reserved.
                  </p>
                </div>
                <p className="text-gray-500 text-[9px] md:text-[10px]">
                  Accredited Educational Institution | Est. 2005
                </p>
              </div>

              {/* Back to Top Button */}
              <button
                onClick={scrollToTop}
                className="back-to-top w-7 h-7 md:w-8 md:h-8 rounded-md bg-gradient-to-br from-[#10B981] to-[#34D399] flex items-center justify-center text-white shadow transition-all duration-300"
                aria-label="Back to top"
              >
                <FaArrowUp className="text-[10px] md:text-xs" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="h-px bg-gray-200 w-full"></div>
      </footer>
    </>
  );
};