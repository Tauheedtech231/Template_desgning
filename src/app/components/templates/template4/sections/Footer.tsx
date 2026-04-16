"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useSearchParams } from "next/navigation";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaArrowUp,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  website: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  workingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  contactNumbers: {
    phone: string;
    whatsapp: string;
    office: string;
  };
}

interface CollegeInfo {
  id: number;
  name: string;
  logo?: string;
}

const navItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/components/templates/template4/about" },
  { name: "Courses", link: "/components/templates/template4/courses" },
  { name: "Faculty", link: "/components/templates/template4/faculty" },
  { name: "Contact", link: "/components/templates/template4/contact" },
];

// Component that uses useSearchParams - wrapped in Suspense boundary
function FooterContent() {
  const searchParams = useSearchParams();
  const [collegeId, setCollegeId] = useState<string | null>(null);
  const [collegeInfo, setCollegeInfo] = useState<CollegeInfo | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const year = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  // Get college ID from URL
  useEffect(() => {
    let id = searchParams.get('college_id');
    if (!id && typeof window !== 'undefined') {
      id = sessionStorage.getItem('college_id');
    }
    if (id) {
      setCollegeId(id);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('college_id', id);
      }
    }
  }, [searchParams]);

  // Fetch college and contact data
  useEffect(() => {
    async function fetchData() {
      if (!collegeId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch college info
        const collegeRes = await fetch(`/api/public/college?id=${collegeId}`);
        const collegeData = await collegeRes.json();
        
        if (collegeData.success && collegeData.college) {
          setCollegeInfo(collegeData.college);
        }

        // Fetch contact info
        const contactRes = await fetch(`/api/public/sections?college_id=${collegeId}&section_name=Contact`);
        const contactData = await contactRes.json();
        
        if (contactData.success && contactData.content) {
          setContactInfo(contactData.content);
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [collegeId]);

  const getDynamicLink = (basePath: string) => {
    if (collegeId) {
      const separator = basePath.includes('?') ? '&' : '?';
      return `${basePath}${separator}college_id=${collegeId}`;
    }
    return basePath;
  };

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
    if (typeof window === "undefined") return;
    
    gsap.fromTo(".footer-item",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "footer",
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(".social-icon",
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.2,
        ease: "back.out(1.7)"
      }
    );

    if (isVisible) {
      gsap.to(".scroll-top-btn",
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        }
      );
    } else {
      gsap.to(".scroll-top-btn",
        {
          scale: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in"
        }
      );
    }
  }, [isVisible]);

  if (loading) {
    return (
      <footer className="relative bg-gray-900 text-gray-300 border-t border-gray-800 py-8">
        <div className="text-center text-gray-500 text-sm">Loading footer...</div>
      </footer>
    );
  }

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

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 md:py-12">
        {/* Top Content - Reduced height */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-8">
          {/* Brand - Dynamic College Name */}
          <div className="footer-item space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-teal-600 rounded-xl blur-md opacity-30 animate-pulse"></div>
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center shadow-lg">
                  {collegeInfo?.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={collegeInfo.logo} alt={collegeInfo.name} className="w-8 h-8 rounded-lg object-cover" />
                  ) : (
                    <span className="text-white font-bold text-base">{collegeInfo?.name?.charAt(0) || 'C'}</span>
                  )}
                </div>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight hover:text-teal-400 transition-colors">
                {collegeInfo?.name || "College"}
              </h2>
            </div>

            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Dedicated to academic excellence, innovation, and student success.
            </p>

            <div className="flex gap-2">
              {contactInfo?.socialMedia?.facebook && (
                <a
                  href={contactInfo.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-8 h-8 rounded-lg bg-gray-800/50 border border-gray-700 flex items-center justify-center hover:bg-teal-600 hover:border-teal-500 hover:scale-110 transition-all"
                >
                  <FaFacebook className="text-gray-300 text-xs hover:text-white" />
                </a>
              )}
              {contactInfo?.socialMedia?.linkedin && (
                <a
                  href={contactInfo.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-8 h-8 rounded-lg bg-gray-800/50 border border-gray-700 flex items-center justify-center hover:bg-teal-600 hover:border-teal-500 hover:scale-110 transition-all"
                >
                  <FaLinkedin className="text-gray-300 text-xs hover:text-white" />
                </a>
              )}
              {contactInfo?.socialMedia?.instagram && (
                <a
                  href={contactInfo.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-8 h-8 rounded-lg bg-gray-800/50 border border-gray-700 flex items-center justify-center hover:bg-teal-600 hover:border-teal-500 hover:scale-110 transition-all"
                >
                  <FaInstagram className="text-gray-300 text-xs hover:text-white" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links - Reduced spacing */}
          <div className="footer-item">
            <h3 className="text-white font-semibold mb-4 text-base flex items-center">
              <div className="w-1.5 h-4 bg-teal-500 rounded-full mr-2"></div>
              Quick Links
            </h3>

            <ul className="space-y-2">
              {navItems.map((item, i) => (
                <li key={i} className="group">
                  <Link
                    href={getDynamicLink(item.link)}
                    className="text-xs text-gray-400 hover:text-teal-400 transition-all duration-300 flex items-center gap-2 group-hover:translate-x-1"
                  >
                    <div className="w-1 h-1 bg-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact - Dynamic Contact Info */}
          <div className="footer-item">
            <h3 className="text-white font-semibold mb-4 text-base flex items-center">
              <div className="w-1.5 h-4 bg-teal-500 rounded-full mr-2"></div>
              Contact
            </h3>

            <div className="space-y-3">
              {contactInfo?.address && (
                <div className="flex items-start gap-2 group">
                  <div className="w-7 h-7 rounded-lg bg-gray-800/50 border border-gray-700 flex items-center justify-center group-hover:bg-teal-600/20 transition-all">
                    <FaMapMarkerAlt className="text-teal-400 text-xs" />
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-gray-300 leading-relaxed">
                    {contactInfo.address}
                  </span>
                </div>
              )}
              
              {(contactInfo?.contactNumbers?.phone || contactInfo?.phone) && (
                <div className="flex items-start gap-2 group">
                  <div className="w-7 h-7 rounded-lg bg-gray-800/50 border border-gray-700 flex items-center justify-center group-hover:bg-teal-600/20 transition-all">
                    <FaPhone className="text-teal-400 text-xs" />
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-gray-300">
                    {contactInfo?.contactNumbers?.phone || contactInfo?.phone}
                  </span>
                </div>
              )}
              
              {contactInfo?.email && (
                <div className="flex items-start gap-2 group">
                  <div className="w-7 h-7 rounded-lg bg-gray-800/50 border border-gray-700 flex items-center justify-center group-hover:bg-teal-600/20 transition-all">
                    <FaEnvelope className="text-teal-400 text-xs" />
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-gray-300">
                    {contactInfo.email}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar - Reduced padding */}
        <div className="mt-6 pt-4 border-t border-gray-800/50 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500">
            © {year} {collegeInfo?.name || "College"}. All rights reserved.
          </p>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="scroll-top-btn w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center hover:bg-teal-600 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="text-xs text-gray-300" />
          </button>
        </div>
      </div>

      {/* Glowing Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
    </footer>
  );
}

// Main component with Suspense boundary
export const Footer: React.FC = () => {
  return (
    <Suspense fallback={
      <footer className="relative bg-gray-900 text-gray-300 border-t border-gray-800 py-8">
        <div className="text-center text-gray-500 text-sm">Loading footer...</div>
      </footer>
    }>
      <FooterContent />
    </Suspense>
  );
};

export default Footer;