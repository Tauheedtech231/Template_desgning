"use client";

import React, { useRef } from "react";
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaArrowUp,
  FaChevronRight,
  FaCertificate,
  FaShieldAlt,
  FaBuilding,
  FaExternalLinkAlt
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
      title: "Head Office",
      details: ["Office No. 123, 1st Floor, Divine Mega-2", "New Airport Road, Opposite Honda Point", "Lahore, Pakistan"]
    },
    {
      icon: <FaPhone />,
      title: "Contact Numbers",
      details: ["+92 (423) 5700362", "+92 (423) 7169399", "+92 (300) 1234567"]
    },
    {
      icon: <FaEnvelope />,
      title: "Email Addresses",
      details: ["info@mansol.com.pk", "mtti@mansol.com.pk", "mes@mansol.com.pk"]
    },
    {
      icon: <FaClock />,
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM", "Sunday: Closed"]
    }
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "#about" },
    { label: "Courses", href: "/components/templates/template2/courses" },
    { label: "Faculty", href: "/components/templates/template2/faculty" },
    { label: "Gallery", href: "/components/templates/template2/gallery" },
    { label: "Contact", href: "/components/templates/template2/contact" }
  ];

  const services = [
    "Manpower Recruitment",
    "Technical Training",
    "Safety Certifications",
    "Industry Consultancy",
    "Workforce Development",
    "Corporate Training",
    "EPC Projects Staffing",
    "GCC Operations Support"
  ];

  const certifications = [
    { name: "PSDA Certified", icon: <FaCertificate /> },
    { name: "TEVTA Approved", icon: <FaCertificate /> },
    { name: "OSHAC Compliant", icon: <FaShieldAlt /> },
    { name: "ISO 9001:2015", icon: <FaCertificate /> }
  ];

  const socialLinks = [
    { icon: <FaLinkedin />, label: "LinkedIn", url: "https://www.linkedin.com/in/mansol-hab-traning-services-b7b4b1296/" },
    { icon: <FaInstagram />, label: "Instagram", url: "https://www.instagram.com/mansol.hab.training.services/" },
    { icon: <FaFacebook />, label: "Facebook", url: "https://www.facebook.com/people/Mansol-Hab/61567152315949/" },
    { icon: <FaYoutube />, label: "YouTube", url: "#" }
  ];

  return (
    <>
      <style jsx global>{`
        /* Floating animation for particles */
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        /* Smooth animations for hover effects */
        .footer-link-item {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .footer-link-item:hover {
          transform: translateX(5px);
          color: #06B6D4 !important;
        }

        .footer-link-item:hover .footer-link-chevron {
          opacity: 1;
          transform: translateX(3px);
          background-color: #06B6D4;
          border-color: #06B6D4;
        }

        .social-icon {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-icon:hover {
          transform: scale(1.15) rotate(10deg);
          box-shadow: 0 5px 20px rgba(6, 182, 212, 0.3);
          border-color: #06B6D4;
          background-color: rgba(6, 182, 212, 0.1);
          color: #06B6D4 !important;
        }

        .service-item {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .service-item:hover {
          transform: translateX(3px);
        }

        .service-item:hover .service-text {
          color: #06B6D4 !important;
        }

        .service-item:hover .service-dot {
          transform: scale(1.5);
          background-color: #06B6D4;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }

        /* Fixed Contact Item Hover */
        .contact-item {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .contact-item:hover {
          transform: translateY(-3px);
        }

        .contact-item:hover .contact-icon-container {
          transform: scale(1.1);
          background-color: #06B6D4 !important;
          border-color: #06B6D4;
          box-shadow: 0 5px 20px rgba(6, 182, 212, 0.3);
        }

        .contact-item:hover .contact-icon {
          color: white !important;
        }

        .contact-item:hover .contact-title {
          color: #06B6D4;
        }

        /* Cert badge hover */
        .cert-badge {
          transition: all 0.3s ease;
        }

        .cert-badge:hover {
          border-color: #06B6D4;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(6, 182, 212, 0.2);
        }

        .cert-badge:hover .cert-icon {
          color: #06B6D4;
        }

        /* Legal links hover */
        .legal-link {
          position: relative;
          transition: color 0.3s ease;
        }

        .legal-link:hover {
          color: #06B6D4 !important;
        }

        .legal-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: #06B6D4;
          transition: width 0.3s ease;
        }

        .legal-link:hover::after {
          width: 100%;
        }

        /* Back to top button */
        .back-to-top {
          animation: floatUpDown 2s ease-in-out infinite;
        }

        @keyframes floatUpDown {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .back-to-top:hover {
          animation: none;
          transform: scale(1.1) rotate(180deg);
          box-shadow: 0 10px 30px rgba(6, 182, 212, 0.4);
        }

        /* Fade in animation for elements */
        .fade-in {
          opacity: 0;
          animation: fadeIn 0.8s ease forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Stagger animations */
        .fade-in-delay-1 { animation-delay: 0.1s; }
        .fade-in-delay-2 { animation-delay: 0.2s; }
        .fade-in-delay-3 { animation-delay: 0.3s; }
        .fade-in-delay-4 { animation-delay: 0.4s; }
        .fade-in-delay-5 { animation-delay: 0.5s; }
        .fade-in-delay-6 { animation-delay: 0.6s; }

        /* Subtle pulse for gradient orbs */
        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.15;
          }
        }
        
        .pulse-orb {
          animation: pulse 4s ease-in-out infinite;
        }
      `}</style>
      
      <footer 
        ref={footerRef} 
        className="relative bg-gradient-to-b from-[#0f172a] to-[#111827] text-[#F8FAFC] overflow-hidden"
      >
        {/* Top Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent"></div>
        
        {/* Background Orbs */}
        <div className="pulse-orb absolute top-10 right-10 w-80 h-80 bg-[#06B6D4] rounded-full blur-3xl opacity-10"></div>
        <div className="pulse-orb absolute bottom-10 left-10 w-80 h-80 bg-[#0891b2] rounded-full blur-3xl opacity-10 animation-delay-2000"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] overflow-hidden">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #06B6D4 1px, transparent 1%)`,
            backgroundSize: '40px 40px',
          }}></div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Column 1: Brand & Description */}
            <div className="space-y-6 fade-in fade-in-delay-1">
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#06B6D4] via-[#0891b2] to-[#06B6D4] rounded-xl flex items-center justify-center shadow-lg shadow-[#06B6D4]/30 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-[#06B6D4]/40">
                    <span className="text-white font-bold text-2xl">M</span>
                  </div>
                  <div className="absolute -inset-2 bg-[#06B6D4] blur-xl opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-500"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-[#06B6D4] to-white bg-clip-text text-transparent">
                    MANSOL
                  </h2>
                  <p className="text-sm text-[#94a3b8] font-medium">Hab Trainings & Solutions</p>
                </div>
              </div>
              
              <p className="text-[#94a3b8] text-sm leading-relaxed">
                A premier institution delivering high-quality education, workforce training, 
                and recruitment solutions empowering individuals and organizations worldwide.
              </p>

              {/* Social Media Links */}
              <div className="pt-4">
                <p className="text-[#94a3b8] text-sm mb-4 font-medium">Follow Our Journey</p>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-icon w-10 h-10 rounded-lg bg-[#1e293b] border border-[#334155] flex items-center justify-center text-[#cbd5e1] fade-in fade-in-delay-${index + 2}`}
                      aria-label={social.label}
                    >
                      <div className="text-base">
                        {social.icon}
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="pt-6 border-t border-[#334155]">
                <p className="text-[#94a3b8] text-sm mb-3 font-medium">Certifications</p>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert, index) => (
                    <div 
                      key={index}
                      className={`cert-badge flex items-center gap-2 px-3 py-1.5 bg-[#1e293b] rounded-lg border border-[#334155] fade-in fade-in-delay-${index + 3}`}
                    >
                      <div className="text-[#06B6D4] cert-icon text-xs">
                        {cert.icon}
                      </div>
                      <span className="text-xs text-[#cbd5e1]">{cert.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="fade-in fade-in-delay-2">
              <h3 className="text-lg font-semibold text-white mb-6 pb-3 border-b border-[#334155] relative">
                Quick Navigation
                <div className="absolute -bottom-px left-0 w-12 h-0.5 bg-gradient-to-r from-[#06B6D4] to-transparent"></div>
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="footer-link-item flex items-center group relative pl-6 py-2"
                    >
                      <div className="absolute left-0 w-2.5 h-2.5 rounded-full border border-[#06B6D4]/20 group-hover:border-[#06B6D4] transition-all duration-300 flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full bg-transparent group-hover:bg-[#06B6D4]/10 transition-colors duration-300"></div>
                        <FaChevronRight className="absolute w-1.5 h-1.5 text-white opacity-0 footer-link-chevron transition-all duration-300" />
                      </div>
                      <span className="text-sm text-[#cbd5e1] group-hover:text-[#06B6D4] transition-colors duration-300 font-medium">{link.label}</span>
                      <FaExternalLinkAlt className="ml-2 text-[#06B6D4] opacity-0 group-hover:opacity-100 text-xs transition-opacity duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className="fade-in fade-in-delay-3">
              <h3 className="text-lg font-semibold text-white mb-6 pb-3 border-b border-[#334155] relative">
                Our Services
                <div className="absolute -bottom-px left-0 w-12 h-0.5 bg-gradient-to-r from-[#06B6D4] to-transparent"></div>
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="service-item">
                    <div className="flex items-center py-2">
                      <div className="service-dot w-1.5 h-1.5 bg-[#06B6D4] rounded-full mr-3 flex-shrink-0 transition-all duration-300"></div>
                      <span className="service-text text-sm text-[#cbd5e1] transition-colors duration-300 cursor-pointer">
                        {service}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact Info - FIXED HOVER */}
            <div className="fade-in fade-in-delay-4">
              <h3 className="text-lg font-semibold text-white mb-6 pb-3 border-b border-[#334155] relative">
                Get In Touch
                <div className="absolute -bottom-px left-0 w-12 h-0.5 bg-gradient-to-r from-[#06B6D4] to-transparent"></div>
              </h3>
              <div className="space-y-5">
                {contactInfo.map((item, index) => (
                  <div key={index} className="contact-item">
                    <div className="flex items-start space-x-3 group">
                      <div className="flex-shrink-0">
                        <div className="contact-icon-container w-9 h-9 rounded-lg bg-[#1e293b] border border-[#334155] flex items-center justify-center transition-all duration-300">
                          <div className="contact-icon text-[#06B6D4] text-sm transition-colors duration-300">
                            {item.icon}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="contact-title text-sm font-semibold text-white mb-1.5 transition-colors duration-300">
                          {item.title}
                        </h4>
                        <div className="space-y-1">
                          {item.details.map((detail, idx) => (
                            <p key={idx} className="text-xs text-[#94a3b8] leading-relaxed truncate">
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

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-[#334155] fade-in fade-in-delay-5">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-5 md:space-y-0">
              {/* Copyright & Info */}
              <div className="text-center md:text-left space-y-2">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <FaBuilding className="text-[#06B6D4] flex-shrink-0 text-sm" />
                  <p className="text-[#94a3b8] text-sm">
                    &copy; {currentYear} Mansol Hab Trainings & Solutions. All rights reserved.
                  </p>
                </div>
                <p className="text-[#64748b] text-xs">
                  Registered under SECP | NTN: 123456-7 | Since 2008
                </p>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-5">
                {[
                  { label: "Privacy Policy", href: "#" },
                  { label: "Terms of Service", href: "#" },
                  { label: "Disclaimer", href: "#" },
                  { label: "Sitemap", href: "#" },
                  { label: "Careers", href: "#" },
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="legal-link text-[#94a3b8] hover:text-[#06B6D4] text-xs transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Back to Top Button */}
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-[#06B6D4]/20 to-[#0891b2]/20 rounded-full blur-md opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <button
                  onClick={scrollToTop}
                  className="back-to-top relative w-12 h-12 rounded-full bg-gradient-to-br from-[#06B6D4] via-[#0891b2] to-[#06B6D4] flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#06B6D4]/30"
                  aria-label="Back to top"
                >
                  <FaArrowUp className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Gradient */}
        <div className="relative h-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent"></div>
          
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] bg-[#06B6D4] rounded-full animate-float"
              style={{
                left: `${10 + (i * 15)}%`,
                bottom: `${Math.random() * 30}%`,
                animationDelay: `${i * 0.8}s`,
                opacity: 0.4 + (i * 0.1),
              }}
            ></div>
          ))}
        </div>
      </footer>
    </>
  );
};