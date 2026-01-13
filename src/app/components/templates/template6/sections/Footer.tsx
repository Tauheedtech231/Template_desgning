"use client";

import React, { useRef } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowUp } from "react-icons/fa";

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
      details: ["123 Education Street", "Academic District", "City, State 12345"]
    },
    {
      icon: <FaPhone />,
      title: "Contact",
      details: ["+1 (555) 123-4567", "admissions@college.edu"]
    }
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/components/templates/template5/about" },
    { label: "Programs", href: "/components/templates/template5/courses" },
    { label: "Faculty", href: "/components/templates/template5/faculty" },
    { label: "Contact", href: "/components/templates/template5/contact" }
  ];

  return (
    <>
      <style jsx global>{`
        .footer-link-item {
          transition: all 0.25s ease;
        }
        .footer-link-item:hover {
          color: #2f5d62 !important;
          transform: translateX(3px);
        }
        .contact-item:hover .contact-icon-container {
          background-color: #2f5d62;
        }
        .contact-item:hover .contact-icon {
          color: white;
        }
        .back-to-top:hover {
          background-color: #1f4a4f;
          transform: scale(1.05);
        }
      `}</style>

      <footer
        ref={footerRef}
        className="bg-[#F5F5F5] text-[#121212] border-t border-[#DDD]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Column 1: Brand & Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold font-[Merriweather]">Excel College</h2>
              <p className="text-sm text-[#4A4A4A] leading-relaxed max-w-xs">
                A premier educational institution delivering quality education, professional development, and career-focused programs since 2005. Join thousands of students who trust Excel College for their growth.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-[16px] font-medium mb-4 font-[Merriweather]">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="footer-link-item text-sm font-medium"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div>
              <h3 className="text-[16px] font-medium mb-4 font-[Merriweather]">Contact</h3>
              <ul className="space-y-3">
                {contactInfo.map((item, index) => (
                  <li key={index} className="contact-item flex items-start space-x-3">
                    <div className="contact-icon-container w-9 h-9 rounded-lg bg-[#E0E0E0] flex items-center justify-center transition-all duration-300">
                      <div className="contact-icon text-[#2f5d62]">{item.icon}</div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      {item.details.map((d, idx) => (
                        <p key={idx} className="text-xs text-[#6E6E6E]">{d}</p>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-[#DDD] flex flex-col items-center space-y-3">
            <p className="text-xs text-[#6E6E6E] text-center">
              &copy; {currentYear} Excel College of Professional Studies. All rights reserved.
            </p>
            <p className="text-xs text-[#A0A0A0] text-center">
              Accredited Educational Institution | Est. 2005
            </p>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="back-to-top w-10 h-10 rounded-lg bg-[#2f5d62] flex items-center justify-center text-white transition-all duration-300 mt-3"
              aria-label="Back to top"
            >
              <FaArrowUp className="text-sm" />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};
