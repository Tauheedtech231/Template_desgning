"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  FaShieldAlt
} from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main footer elements animation - staggered entrance
      gsap.fromTo(
        ".footer-element",
        {
          opacity: 0,
          y: 40,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: {
            each: 0.1,
            from: "start",
          },
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );

      // Social icons animation with bounce
      gsap.fromTo(
        ".social-icon",
        {
          scale: 0,
          rotation: -180,
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );

      // Footer links animation - cascade effect
      gsap.fromTo(
        ".footer-link",
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: {
            each: 0.05,
            from: "start",
          },
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );

      // Back to top button animation - floating effect
      gsap.to(".back-to-top", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Blue accent lines animation - draw effect
      gsap.fromTo(
        ".blue-accent-line",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );

      // Background pattern animation
      gsap.fromTo(
        ".footer-pattern",
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          },
        }
      );

      // Certification badges animation - staggered rotation
      gsap.fromTo(
        ".cert-badge",
        {
          opacity: 0,
          rotation: -30,
          scale: 0.5,
        },
        {
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );

      // Hover effects for footer links
      document.querySelectorAll(".footer-link-item").forEach((item) => {
        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            x: 5,
            duration: 0.3,
            ease: "power2.out",
            color: "#2563EB",
          });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            x: 0,
            duration: 0.3,
            ease: "power2.out",
            color: "#CCCCCC",
          });
        });
      });

      // Hover effects for social icons
      document.querySelectorAll(".social-icon").forEach((icon) => {
        icon.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            scale: 1.2,
            rotation: 15,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        icon.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, footerRef);

    return () => {
      ctx.revert();
      // Clean up event listeners
      document.querySelectorAll(".footer-link-item").forEach((item) => {
        item.removeEventListener("mouseenter", () => {});
        item.removeEventListener("mouseleave", () => {});
      });
      document.querySelectorAll(".social-icon").forEach((icon) => {
        icon.removeEventListener("mouseenter", () => {});
        icon.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

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
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Courses", href: "#courses" },
    { label: "Faculty", href: "#faculty" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" }
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
    <footer ref={footerRef} className="relative bg-black text-white overflow-hidden">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2563EB] to-transparent"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 footer-pattern">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, #2563EB 1px, transparent 0%)`,
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand & Description */}
          <div className="footer-element space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  MANSOL
                </h2>
                <p className="text-sm text-gray-400">Hab Trainings & Solutions</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              A premier institution delivering high-quality education, workforce training, 
              and recruitment solutions empowering individuals and organizations worldwide.
            </p>

            {/* Social Media Links */}
            <div className="pt-4">
              <p className="text-gray-400 text-sm mb-4">Follow Us</p>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-10 h-10 rounded-full border border-gray-700 hover:border-[#2563EB] hover:bg-[#2563EB] transition-all duration-300 flex items-center justify-center text-gray-400 hover:text-white"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-element">
            <h3 className="text-lg font-semibold text-white mb-6 pb-3 border-b border-gray-800 relative">
              Quick Links
              <div className="w-12 h-1 bg-[#2563EB] blue-accent-line absolute bottom-0 left-0"></div>
            </h3>
            <ul className="space-y-3 footer-links">
              {quickLinks.map((link, index) => (
                <li key={index} className="footer-link">
                  <a
                    href={link.href}
                    className="footer-link-item text-gray-400 hover:text-[#2563EB] transition-colors duration-300 flex items-center group"
                  >
                    <FaChevronRight className="w-3 h-3 text-[#2563EB] mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="footer-element">
            <h3 className="text-lg font-semibold text-white mb-6 pb-3 border-b border-gray-800 relative">
              Our Services
              <div className="w-12 h-1 bg-[#2563EB] blue-accent-line absolute bottom-0 left-0"></div>
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="footer-link flex items-center">
                  <div className="w-2 h-2 bg-[#2563EB] rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-gray-400 text-sm hover:text-white transition-colors duration-300">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="footer-element">
            <h3 className="text-lg font-semibold text-white mb-6 pb-3 border-b border-gray-800 relative">
              Contact Info
              <div className="w-12 h-1 bg-[#2563EB] blue-accent-line absolute bottom-0 left-0"></div>
            </h3>
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center">
                      <div className="text-[#2563EB]">
                        {item.icon}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white mb-1">
                      {item.title}
                    </h4>
                    <div className="space-y-1">
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-400 text-sm leading-relaxed">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

    

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm">
                &copy; {currentYear} Mansol Hab Trainings. All rights reserved.
              </p>
              <p className="text-gray-600 text-xs mt-2">
                Proudly serving industries across Pakistan and GCC countries since 2008
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#" 
                className="text-gray-500 hover:text-white text-sm transition-colors hover:underline"
              >
                Privacy Policy
              </a>
              <span className="text-gray-700">•</span>
              <a 
                href="#" 
                className="text-gray-500 hover:text-white text-sm transition-colors hover:underline"
              >
                Terms of Service
              </a>
              <span className="text-gray-700">•</span>
              <a 
                href="#" 
                className="text-gray-500 hover:text-white text-sm transition-colors hover:underline"
              >
                Sitemap
              </a>
              <span className="text-gray-700">•</span>
              <a 
                href="#" 
                className="text-gray-500 hover:text-white text-sm transition-colors hover:underline"
              >
                Careers
              </a>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="back-to-top w-12 h-12 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] transition-all duration-300 flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110"
              aria-label="Back to top"
            >
              <FaArrowUp />
            </button>
          </div>
        </div>

        {/* Industry Partners */}
       
      </div>

      {/* Footer Bottom Gradient */}
      <div className="relative h-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2563EB] to-transparent"></div>
      </div>
    </footer>
  );
};