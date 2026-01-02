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
  FaCalendarAlt
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
    },
    {
      icon: <FaClock />,
      title: "Office Hours",
      details: ["Monday - Friday: 8:00 AM - 6:00 PM", "Saturday: 9:00 AM - 2:00 PM", "Sunday: Closed"]
    }
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/components/templates/template4/about" },
    { label: "Programs", href: "/components/templates/template4/courses" },
    { label: "Faculty", href: "/components/templates/template4/faculty" },
    { label: "Contact", href: "/components/templates/template4/contact" }
  ];

  const programs = [
    "Computer Science",
    "Business Administration",
    "Engineering",
    "Health Sciences",
    "Arts & Humanities",
    "Social Sciences",
    "Law Studies",
    "Research Programs"
  ];

  const accreditation = [
    { name: "Accredited College", icon: <FaBookOpen /> },
    { name: "Government Approved", icon: <FaChalkboardTeacher /> },
    { name: "Quality Certified", icon: <FaUserGraduate /> }
  ];

  return (
    <>
      <style jsx global>{`
        /* Hover effects for links */
        .footer-link-item {
          transition: all 0.3s ease;
        }
        .footer-link-item:hover {
          transform: translateX(4px);
          color: #E86A58 !important;
        }
        .footer-link-item:hover .footer-link-chevron {
          opacity: 1;
          transform: translateX(2px);
        }

        /* Contact info hover */
        .contact-item:hover .contact-icon-container {
          background-color: #E86A58;
          border-color: #E86A58;
        }
        .contact-item:hover .contact-icon {
          color: white;
        }
        .contact-item:hover .contact-title {
          color: #E86A58;
        }

        /* Programs hover */
        .program-item:hover {
          transform: translateX(2px);
        }
        .program-item:hover .program-text {
          color: #E86A58;
        }
        .program-item:hover .program-dot {
          background-color: #E86A58;
        }

        /* Back to top button */
        .back-to-top:hover {
          background-color: #BF4E3A;
          transform: scale(1.05);
        }

        /* Legal / fine print hover */
        .legal-link:hover {
          color: #E86A58 !important;
        }
      `}</style>

      <footer ref={footerRef} className="relative bg-[#1E1E1E] text-[#CCCCCC]">
        {/* Top Divider */}
        <div className="h-px bg-[#333333] w-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            
            {/* Column 1: Brand & Description */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#E86A58] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <div>
                  <h2 className="text-[19px] font-medium text-white font-[Merriweather]">
                    Excel College
                  </h2>
                  <p className="text-sm text-[#CCCCCC]">of Professional Studies</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed">
                A premier educational institution committed to delivering quality education, professional development, and career-focused programs since 2005.
              </p>

              {/* Accreditation */}
              <div className="pt-6 border-t border-[#333333]">
                <p className="text-sm mb-3 font-medium">Accreditation</p>
                <div className="space-y-2">
                  {accreditation.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="text-[#E86A58]">{item.icon}</div>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Human-friendly signature */}
              <p className="text-xs text-[#B0B0B0] mt-4">
                Built with care for students and educators.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-[18px] font-medium text-white mb-6 pb-3 border-b border-[#333333] font-[Merriweather]">
                Quick Navigation
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="footer-link-item flex items-center group relative py-2 text-sm font-medium"
                    >
                      <FaChevronRight className="w-3 h-3 text-[#E86A58] opacity-0 group-hover:opacity-100 mr-2 footer-link-chevron transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Programs */}
            <div>
              <h3 className="text-[18px] font-medium text-white mb-6 pb-3 border-b border-[#333333] font-[Merriweather]">
                Academic Programs
              </h3>
              <ul className="space-y-3">
                {programs.map((program, index) => (
                  <li key={index} className="program-item">
                    <div className="flex items-center py-2">
                      <div className="program-dot w-1.5 h-1.5 bg-[#333333] rounded-full mr-3 flex-shrink-0 transition-all duration-300"></div>
                      <span className="program-text">{program}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div>
              <h3 className="text-[18px] font-medium text-white mb-6 pb-3 border-b border-[#333333] font-[Merriweather]">
                Contact Information
              </h3>
              <div className="space-y-5">
                {contactInfo.map((item, index) => (
                  <div key={index} className="contact-item">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="contact-icon-container w-9 h-9 rounded-lg bg-[#2C2C2C] border border-[#333333] flex items-center justify-center transition-all duration-300">
                          <div className="contact-icon text-[#E86A58] text-sm">{item.icon}</div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="contact-title text-sm font-semibold mb-1.5">{item.title}</h4>
                        <div className="space-y-1">
                          {item.details.map((detail, idx) => (
                            <p key={idx} className="text-xs leading-relaxed">{detail}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-[#333333] flex flex-col items-center space-y-5">
            <div className="text-center space-y-2">
              <div className="flex items-center gap-2 justify-center">
                <FaCalendarAlt className="text-[#E86A58] text-sm" />
                <p className="text-sm">&copy; {currentYear} Excel College of Professional Studies. All rights reserved.</p>
              </div>
              <p className="text-xs text-[#B0B0B0]">Accredited Educational Institution | Est. 2005</p>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="back-to-top w-10 h-10 rounded-lg bg-[#E86A58] flex items-center justify-center text-white transition-all duration-300"
              aria-label="Back to top"
            >
              <FaArrowUp className="text-sm" />
            </button>
          </div>
        </div>

        <div className="h-px bg-[#333333] w-full"></div>
      </footer>
    </>
  );
};
