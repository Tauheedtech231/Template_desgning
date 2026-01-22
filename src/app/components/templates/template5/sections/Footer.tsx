"use client";

import React, { useRef } from "react";
import { MdLocationOn, MdPhone, MdArrowUpward } from "react-icons/md";

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const contactInfo = [
    {
      icon: <MdLocationOn />,
      title: "Campus Location",
      details: ["123 Education Street", "Academic District", "City, State 12345"]
    },
    {
      icon: <MdPhone />,
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
          color: #A17A74 !important;
          transform: translateX(3px);
        }
        .contact-item:hover .contact-icon-container {
          background-color: #A17A74;
          transform: scale(1.05);
        }
        .contact-item:hover .contact-icon {
          color: white;
        }
        .back-to-top:hover {
          background-color: #C99789;
          transform: translateY(-3px);
        }
      `}</style>

      <footer
        ref={footerRef}
        className="bg-black text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* 2-Column Approach: Mobile - Brand & Contact, Desktop - Brand, Quick Links, Contact */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
            
            {/* Column 1: Brand & Description - Always visible */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A17A74] to-[#C99789] flex items-center justify-center">
                  <span className="text-white font-bold text-xl">EC</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Excellence College</h2>
                  <p className="text-sm text-white/70">Since 1998</p>
                </div>
              </div>
              
              <p className="text-sm text-white/70 leading-relaxed max-w-xs">
                A premier educational institution delivering quality education, professional development, and career-focused programs.
              </p>
            </div>

            {/* Column 2: Quick Links - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:block">
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-white/20">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="footer-link-item text-sm text-white/70 hover:text-white flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#C99789]"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Info - Always visible */}
            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-white/20">Contact Info</h3>
              <ul className="space-y-3">
                {contactInfo.map((item, index) => (
                  <li key={index} className="contact-item flex items-start gap-3">
                    <div className="contact-icon-container w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                      <div className="contact-icon text-[#C99789] text-lg">{item.icon}</div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      {item.details.map((d, idx) => (
                        <p key={idx} className="text-xs text-white/60">{d}</p>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-sm text-white/70">
                  &copy; {currentYear} Excellence College. All rights reserved.
                </p>
                <p className="text-xs text-white/50 mt-1">
                  Accredited Educational Institution | Est. 1998
                </p>
              </div>

              {/* Back to Top Button */}
              <button
                onClick={scrollToTop}
                className="back-to-top w-10 h-10 rounded-full bg-gradient-to-r from-[#A17A74] to-[#C99789] flex items-center justify-center text-white transition-all duration-300"
                aria-label="Back to top"
              >
                <MdArrowUpward className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};