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
  FaShieldAlt,
  FaRocket,
  FaGlobe,
  FaUserGraduate,
  FaBuilding,
  FaHandshake
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
          y: 60,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: {
            each: 0.15,
            from: "start",
          },
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          },
        }
      );

      // Social icons animation
      gsap.fromTo(
        ".social-icon",
        {
          scale: 0,
          rotation: -180,
          opacity: 0,
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          },
        }
      );

      // Footer links animation
      gsap.fromTo(
        ".footer-link-item",
        {
          opacity: 0,
          x: -40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: {
            each: 0.08,
            from: "start",
          },
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          },
        }
      );

      // Service items animation
      gsap.fromTo(
        ".service-item",
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          },
        }
      );

      // Contact info items animation
      gsap.fromTo(
        ".contact-item",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          },
        }
      );

      // Back to top button floating effect
      gsap.to(".back-to-top", {
        y: -15,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Teal accent lines animation
      gsap.fromTo(
        ".teal-accent-line",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.inOut",
          stagger: 0.2,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          },
        }
      );

      // Certification badges animation
      gsap.fromTo(
        ".cert-badge",
        {
          opacity: 0,
          scale: 0,
          rotation: -45,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          },
        }
      );

      // Hover effects for footer links
      const footerLinks = document.querySelectorAll(".footer-link-item");
      footerLinks.forEach((item) => {
        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            x: 8,
            duration: 0.3,
            ease: "power2.out",
            color: "#06B6D4",
          });
          gsap.to(item.querySelector("svg"), {
            opacity: 1,
            x: 5,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            x: 0,
            duration: 0.3,
            ease: "power2.out",
            color: "#CBD5E1",
          });
          gsap.to(item.querySelector("svg"), {
            opacity: 0,
            x: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Hover effects for social icons
      const socialIcons = document.querySelectorAll(".social-icon");
      socialIcons.forEach((icon) => {
        icon.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            scale: 1.3,
            rotation: 360,
            duration: 0.5,
            ease: "power2.out",
            boxShadow: "0 0 20px rgba(6, 182, 212, 0.8)",
          });
        });

        icon.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: "power2.out",
            boxShadow: "none",
          });
        });
      });

      // Hover effects for service items
      const serviceItems = document.querySelectorAll(".service-item");
      serviceItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            x: 5,
            duration: 0.3,
            ease: "power2.out",
            color: "#06B6D4",
          });
          const dot = item.querySelector(".service-dot");
          if (dot) {
            gsap.to(dot, {
              scale: 1.5,
              backgroundColor: "#06B6D4",
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            x: 0,
            duration: 0.3,
            ease: "power2.out",
            color: "#CBD5E1",
          });
          const dot = item.querySelector(".service-dot");
          if (dot) {
            gsap.to(dot, {
              scale: 1,
              backgroundColor: "#06B6D4",
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
      });

      // Hover effects for contact items
      const contactItems = document.querySelectorAll(".contact-item");
      contactItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          });
          const icon = item.querySelector(".contact-icon");
          if (icon) {
            gsap.to(icon, {
              scale: 1.2,
              backgroundColor: "#06B6D4",
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
          const icon = item.querySelector(".contact-icon");
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              backgroundColor: "#1F2937",
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
      });
    }, footerRef);

    return () => {
      ctx.revert();
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
    <footer ref={footerRef} className="relative bg-[#111827] text-[#F8FAFC] overflow-hidden">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent opacity-80"></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-[#06B6D4] rounded-full blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-[#0891b2] rounded-full blur-3xl opacity-10 animate-pulse delay-1000"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30px 30px, #06B6D4 1px, transparent 1%)`,
          backgroundSize: '60px 60px',
        }}></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="footer-pattern-dot absolute w-1 h-1 bg-[#06B6D4] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand & Description */}
          <div className="footer-element space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-[#06B6D4] to-[#0891b2] rounded-xl flex items-center justify-center shadow-lg shadow-[#06B6D4]/20">
                  <span className="text-white font-bold text-2xl">M</span>
                </div>
                <div className="absolute -inset-2 bg-[#06B6D4] blur-xl opacity-20 rounded-xl"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-[#06B6D4] to-white bg-clip-text text-transparent">
                  MANSOL
                </h2>
                <p className="text-sm text-[#CBD5E1] font-medium">Hab Trainings & Solutions</p>
              </div>
            </div>
            
            <p className="text-[#CBD5E1] text-sm leading-relaxed">
              A premier institution delivering high-quality education, workforce training, 
              and recruitment solutions empowering individuals and organizations worldwide.
            </p>

            {/* Social Media Links */}
            <div className="pt-6">
              <p className="text-[#CBD5E1] text-sm mb-5 font-medium">Follow Our Journey</p>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-11 h-11 rounded-xl bg-[#1F2937] border border-gray-800 hover:border-[#06B6D4] hover:bg-[#06B6D4]/10 transition-all duration-300 flex items-center justify-center text-[#CBD5E1] hover:text-[#06B6D4] hover:shadow-lg hover:shadow-[#06B6D4]/20"
                    aria-label={social.label}
                  >
                    <div className="text-lg">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="pt-6 border-t border-gray-800">
              <p className="text-[#CBD5E1] text-sm mb-4 font-medium">Certifications</p>
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert, index) => (
                  <div 
                    key={index}
                    className="cert-badge flex items-center gap-2 px-3 py-2 bg-[#1F2937] rounded-lg border border-gray-800 hover:border-[#06B6D4] transition-colors"
                  >
                    <div className="text-[#06B6D4]">
                      {cert.icon}
                    </div>
                    <span className="text-xs text-[#CBD5E1]">{cert.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-element">
            <h3 className="text-lg font-semibold text-white mb-7 pb-4 border-b border-gray-800 relative">
              Quick Navigation
              <div className="w-16 h-1 bg-gradient-to-r from-[#06B6D4] to-transparent teal-accent-line absolute bottom-0 left-0"></div>
            </h3>
            <ul className="space-y-4 footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="footer-link-item text-[#CBD5E1] hover:text-[#06B6D4] transition-colors duration-300 flex items-center group relative pl-6"
                  >
                    <div className="absolute left-0 w-3 h-3 rounded-full border border-[#06B6D4]/30 group-hover:bg-[#06B6D4] transition-colors flex items-center justify-center">
                      <FaChevronRight className="w-2 h-2 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-sm font-medium group-hover:translate-x-2 transition-transform">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="footer-element">
            <h3 className="text-lg font-semibold text-white mb-7 pb-4 border-b border-gray-800 relative">
              Our Services
              <div className="w-16 h-1 bg-gradient-to-r from-[#06B6D4] to-transparent teal-accent-line absolute bottom-0 left-0"></div>
            </h3>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index} className="service-item">
                  <div className="flex items-center">
                    <div className="service-dot w-2 h-2 bg-[#06B6D4] rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-[#CBD5E1] hover:text-[#06B6D4] transition-colors duration-300 cursor-pointer">
                      {service}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="footer-element">
            <h3 className="text-lg font-semibold text-white mb-7 pb-4 border-b border-gray-800 relative">
              Get In Touch
              <div className="w-16 h-1 bg-gradient-to-r from-[#06B6D4] to-transparent teal-accent-line absolute bottom-0 left-0"></div>
            </h3>
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="contact-item">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="contact-icon w-10 h-10 rounded-lg bg-[#1F2937] border border-gray-800 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#06B6D4]/20 transition-all">
                        <div className="text-[#06B6D4] group-hover:text-white transition-colors">
                          {item.icon}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">
                        {item.title}
                      </h4>
                      <div className="space-y-1.5">
                        {item.details.map((detail, idx) => (
                          <p key={idx} className="text-sm text-[#CBD5E1] leading-relaxed">
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
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Copyright & Info */}
            <div className="text-center md:text-left space-y-2">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <FaBuilding className="text-[#06B6D4] flex-shrink-0" />
                <p className="text-[#CBD5E1] text-sm">
                  &copy; {currentYear} Mansol Hab Trainings & Solutions. All rights reserved.
                </p>
              </div>
              <p className="text-gray-600 text-xs">
                Registered under SECP | NTN: 123456-7 | Since 2008
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
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
                  className="text-[#CBD5E1] hover:text-[#06B6D4] text-sm transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#06B6D4] group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            {/* Back to Top Button */}
            <div className="relative">
              <div className="absolute -inset-4 bg-[#06B6D4] rounded-full blur-md opacity-20"></div>
              <button
                onClick={scrollToTop}
                className="back-to-top relative w-14 h-14 rounded-full bg-gradient-to-br from-[#06B6D4] via-[#0891b2] to-[#06B6D4] hover:from-[#0891b2] hover:to-[#06B6D4] transition-all duration-300 flex items-center justify-center text-white shadow-xl hover:shadow-2xl hover:scale-110 hover:rotate-180"
                aria-label="Back to top"
              >
                <FaArrowUp className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Gradient */}
      <div className="relative h-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent"></div>
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#06B6D4] rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 50}%`,
              animationDelay: `${i * 0.5}s`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          ></div>
        ))}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};