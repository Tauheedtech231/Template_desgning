/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes, FaChevronDown, FaGraduationCap, FaImages, FaCalendarAlt, FaEye } from "react-icons/fa";
import Link from "next/link";

// Separate component that uses useSearchParams
function NavbarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // State for college ID
  const [collegeId, setCollegeId] = useState<string | null>(null);
  const [collegeName, setCollegeName] = useState<string>("College");
  const [collegeLogo, setCollegeLogo] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const contactSliderRef = useRef<HTMLDivElement>(null);

  // Load college ID from URL or sessionStorage
  useEffect(() => {
    let id = searchParams?.get('college_id');
    if (!id && typeof window !== 'undefined') {
      id = sessionStorage.getItem('college_id');
    }
    if (id) {
      setCollegeId(id);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('college_id', id);
      }
      console.log('✅ College ID loaded:', id);
      
      // Fetch college details
      fetchCollegeDetails(id);
      fetchContactDetails(id);
    }
  }, [searchParams]);

  // Fetch college details
  const fetchCollegeDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/public/college?id=${id}`);
      const data = await response.json();
      
      if (data.success && data.college) {
        setCollegeName(data.college.name || "College");
        console.log('✅ College name loaded:', data.college.name);
      }
      
      // Fetch about section for logo
      const aboutResponse = await fetch(`/api/public/sections?college_id=${id}&section_name=About`);
      const aboutData = await aboutResponse.json();
      
      if (aboutData.success && aboutData.content) {
        if (aboutData.content.logo) {
          setCollegeLogo(aboutData.content.logo);
          console.log('✅ College logo loaded');
        }
      }
    } catch (error) {
      console.error('Failed to fetch college details:', error);
    }
  };

  // Fetch contact details
  const fetchContactDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/public/sections?college_id=${id}&section_name=Contact`);
      const data = await response.json();
      
      if (data.success && data.content) {
        setContactInfo(data.content);
        console.log('✅ Contact info loaded:', data.content);
      }
    } catch (error) {
      console.error('Failed to fetch contact details:', error);
    }
  };

  // Dynamic link generator
  const getDynamicLink = (basePath: string) => {
    if (collegeId) {
      const separator = basePath.includes('?') ? '&' : '?';
      return `${basePath}${separator}college_id=${collegeId}`;
    }
    return basePath;
  };

  // Real contact slides from API
  const getContactSlides = () => {
    return [
      { 
        icon: FaMapMarkerAlt, 
        text: contactInfo?.address || "Q Kamboh Plaza, Lahore, Pakistan", 
        color: "text-teal-400" 
      },
      { 
        icon: FaEnvelope, 
        text: contactInfo?.email || "college@starlysoft.com", 
        color: "text-teal-400" 
      },
      { 
        icon: FaPhone, 
        text: contactInfo?.contactNumbers?.phone || contactInfo?.phone || "+92 333 754144", 
        color: "text-teal-400" 
      },
    ];
  };

  const contactSlides = getContactSlides();

  // Courses items with dynamic links
  const coursesItems = [
    { name: "Computer Science", link: "/components/templates/template4/courses" },
    { name: "Business Administration", link: "/components/templates/template4/courses" },
    { name: "Engineering", link: "/components/templates/template4/courses" },
    { name: "Medical Sciences", link: "/components/templates/template4/courses" },
    { name: "Arts & Humanities", link: "/components/templates/template4/courses" },
  ];

  // About items with dynamic links
  const aboutItems = [
    { 
      name: "Gallery", 
      link: getDynamicLink("/components/templates/template4/gallery"),
      icon: FaImages, 
      description: "View our campus photos" 
    },
    { 
      name: "Events", 
      link: getDynamicLink("/components/templates/template4/events"),
      icon: FaCalendarAlt, 
      description: "Upcoming college events" 
    },
    { 
      name: "Vision", 
      link: getDynamicLink("/components/templates/template4/about"),
      icon: FaEye, 
      description: "Our vision and mission" 
    }
  ];

  // Navigation items with dynamic links
  const navItems = [
    { name: "Home", link: getDynamicLink("/") },
    { name: "About", link: getDynamicLink("/components/templates/template4/about") },
    { name: "Courses", link: getDynamicLink("/components/templates/template4/courses") },
    { name: "Faculty", link: getDynamicLink("/components/templates/template4/faculty") },
    { name: "Contact", link: getDynamicLink("/components/templates/template4/contact") },
  ];

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Set active nav based on current path
  useEffect(() => {
    if (pathname?.includes('/about')) setActiveNav('About');
    else if (pathname?.includes('/courses')) setActiveNav('Courses');
    else if (pathname?.includes('/faculty')) setActiveNav('Faculty');
    else if (pathname?.includes('/contact')) setActiveNav('Contact');
    else setActiveNav('Home');
  }, [pathname]);

  // Dropdown handlers
  const handleDropdownEnter = (dropdown: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const handleDropdownClick = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleNavClick = (navItem: string) => {
    setActiveNav(navItem);
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar - Real Contact Info */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-1 sm:py-2 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden sm:flex justify-center items-center space-x-8">
            {contactSlides.map((slide, index) => {
              const Icon = slide.icon;
              return (
                <div key={index} className="flex items-center space-x-3 group">
                  <Icon className={`${slide.color} text-sm transition-transform duration-300 group-hover:scale-110`} />
                  <span className="text-gray-300 text-sm font-medium">{slide.text}</span>
                  {index < contactSlides.length - 1 && <div className="w-[1px] h-4 bg-gray-600/50 rotate-[15deg]"></div>}
                </div>
              );
            })}
          </div>

          {/* Mobile Contact Slider */}
          <div className="sm:hidden relative overflow-hidden py-2">
            <div ref={contactSliderRef} className="flex animate-scroll" style={{ animation: 'scroll 25s linear infinite', width: 'fit-content' }}>
              {[...contactSlides, ...contactSlides, ...contactSlides].map((slide, index) => {
                const Icon = slide.icon;
                return (
                  <div key={index} className="flex-shrink-0 flex items-center justify-center space-x-3 px-6 h-6 whitespace-nowrap">
                    <Icon className={slide.color} />
                    <span className="text-xs font-medium text-gray-300">{slide.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`bg-white transition-all duration-500 sticky top-0 z-50 ${scrolled ? 'border-b border-gray-100 shadow-sm' : ''}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo with College Name */}
            <Link href={getDynamicLink("/")} className="flex items-center space-x-3 group">
              {collegeLogo ? (
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 shadow-md group-hover:shadow-lg transition-all duration-300">
                  <img 
                    src={collegeLogo} 
                    alt={collegeName}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                  <FaGraduationCap className="text-white text-xl" />
                </div>
              )}
              
              <div className="text-xl sm:text-2xl font-bold tracking-tight">
                <span className="text-gray-900">{collegeName}</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {(item.name === 'Courses' || item.name === 'About') ? (
                    <div className="relative">
                      <button
                        onMouseEnter={() => handleDropdownEnter(item.name)}
                        onMouseLeave={handleDropdownLeave}
                        onClick={() => handleDropdownClick(item.name)}
                        className="group flex items-center space-x-1 text-gray-700 hover:text-teal-600 font-medium text-sm uppercase tracking-wide"
                      >
                        <span>{item.name}</span>
                        <FaChevronDown className={`transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} size={10} />
                      </button>

                      <div
                        onMouseEnter={() => handleDropdownEnter(item.name)}
                        onMouseLeave={handleDropdownLeave}
                        className={`absolute left-1/2 transform -translate-x-1/2 top-full mt-4 w-64 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 z-50 ${
                          activeDropdown === item.name ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                        }`}
                      >
                        <div className="bg-white rounded-xl">
                          {item.name === 'Courses' ? (
                            coursesItems.map((course) => (
                              <Link
                                key={course.name}
                                href={getDynamicLink(course.link)}
                                onClick={() => setActiveDropdown(null)}
                                className="block px-6 py-3 text-sm text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all"
                              >
                                {course.name}
                              </Link>
                            ))
                          ) : (
                            aboutItems.map((subItem) => {
                              const Icon = subItem.icon;
                              return (
                                <Link
                                  key={subItem.name}
                                  href={subItem.link}
                                  onClick={() => setActiveDropdown(null)}
                                  className="block px-6 py-3 text-sm text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all"
                                >
                                  <div className="flex items-center space-x-3">
                                    <Icon className="text-teal-500 text-sm" />
                                    <span>{subItem.name}</span>
                                  </div>
                                </Link>
                              );
                            })
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.link}
                      onClick={() => handleNavClick(item.name)}
                      className={`relative text-gray-700 hover:text-teal-600 font-medium text-sm uppercase tracking-wide pb-1 group ${
                        activeNav === item.name ? 'text-teal-600' : ''
                      }`}
                    >
                      {item.name}
                      <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 ${
                        activeNav === item.name ? 'w-full' : 'group-hover:w-full'
                      }`}></span>
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Get Started Button */}
              <Link
                href={getDynamicLink("/components/templates/template4/courses")}
                className="bg-teal-600 text-white rounded-full px-6 py-2.5 font-medium text-sm hover:bg-teal-700 transition-all"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-gray-700">
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={handleCloseMenu}>
            <div className="fixed inset-y-0 left-0 w-80 bg-white z-50 shadow-xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <Link href={getDynamicLink("/components/templates/template4")} className="flex items-center space-x-3" onClick={handleCloseMenu}>
                    {collegeLogo ? (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                        <img src={collegeLogo} alt={collegeName} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <FaGraduationCap className="text-teal-600 text-2xl" />
                    )}
                    <div className="text-xl font-bold">
                      <span className="text-gray-900">{collegeName.substring(0, 4)}</span>
                      <span className="text-teal-500">{collegeName.substring(4)}</span>
                    </div>
                  </Link>
                  <button onClick={handleCloseMenu} className="p-2 text-gray-500">
                    <FaTimes size={20} />
                  </button>
                </div>

                <div className="space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.link}
                      onClick={() => {
                        setActiveNav(item.name);
                        handleCloseMenu();
                      }}
                      className={`block p-3 rounded-lg ${
                        activeNav === item.name ? 'bg-teal-50 text-teal-600 font-medium' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  <Link
                    href={getDynamicLink("/components/templates/template4/courses")}
                    onClick={handleCloseMenu}
                    className="block w-full mt-4 bg-teal-600 text-white text-center rounded-full px-4 py-3 font-medium"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </>
  );
}

// ✅ Main export with Suspense boundary
export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-16 bg-white border-b animate-pulse" />}>
      <NavbarContent />
    </Suspense>
  );
}