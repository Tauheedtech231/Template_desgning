"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaBars, FaTimes, FaChevronDown, FaChevronRight, FaGraduationCap, FaImages, FaCalendarAlt, FaEye } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileContactSlide, setMobileContactSlide] = useState(0);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const contactSliderRef = useRef<HTMLDivElement>(null);

  // Contact info for slider
  const contactSlides = [
    { 
      icon: FaMapMarkerAlt, 
      text: "Q Kamboh Plaza, Lahore, Pakistan",
      color: "text-teal-400"
    },
    { 
      icon: FaEnvelope, 
      text: "college@starlysoft.com",
      color: "text-teal-400"
    },
    { 
      icon: FaPhone, 
      text: "+92 333 754144",
      color: "text-teal-400"
    }
  ];

  // Courses submenu items
  const coursesItems = [
    { name: "Computer Science", link: "/components/templates/template4/courses" },
    { name: "Business Administration", link: "/components/templates/template4/courses" },
    { name: "Engineering", link: "/components/templates/template4/courses" },
    { name: "Medical Sciences", link: "/components/templates/template4/courses" },
    { name: "Arts & Humanities", link: "/components/templates/template4/courses" },
  ];

  // About submenu items with icons
  const aboutItems = [
    { 
      name: "Gallery", 
      link: "/components/templates/template4/gallery",
      icon: FaImages,
      description: "View our campus photos"
    },
    { 
      name: "Events", 
      link: "/components/templates/template4/events",
      icon: FaCalendarAlt,
      description: "Upcoming college events"
    },
    { 
      name: "Vision", 
      link: "/components/templates/template4/about#vision",
      icon: FaEye,
      description: "Our vision and mission"
    }
  ];

  // Navigation items
  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/components/templates/template4/about" },
    { name: "Courses", link: "/components/templates/template4/courses" },
    { name: "Faculty", link: "/components/templates/template4/faculty" },
    { name: "Contact", link: "/components/templates/template4/contact" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate contact slider on mobile
  useEffect(() => {
    if (window.innerWidth < 640) {
      const interval = setInterval(() => {
        setMobileContactSlide(prev => (prev + 1) % contactSlides.length);
      }, 3000);
      return () => clearInterval(interval);
    }
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

  // Smooth dropdown handling with delay
  const handleDropdownEnter = (dropdown: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleDropdownClick = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Handle mobile contact slider navigation
  const handleContactSlide = (index: number) => {
    setMobileContactSlide(index);
    if (contactSliderRef.current) {
      contactSliderRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  };

  // Handle menu close
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  // Handle navigation clicks
  const handleNavClick = (navItem: string) => {
    setActiveNav(navItem);
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar - Professional Design with Responsive Contact Slider */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-1 sm:py-2 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Contact Info - Horizontal Layout */}
          <div className="hidden sm:flex justify-center items-center space-x-8">
            {contactSlides.map((slide, index) => {
              const Icon = slide.icon;
              return (
                <div key={index} className="flex items-center space-x-3 group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
                    <Icon className={`relative ${slide.color} text-sm transition-transform duration-300 group-hover:scale-110`} />
                  </div>
                  <span className="text-gray-300 text-sm font-medium tracking-wide group-hover:text-white transition-colors duration-300">
                    {slide.text}
                  </span>
                  {index < contactSlides.length - 1 && (
                    <div className="w-[1px] h-4 bg-gray-600/50 rotate-[15deg]"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Contact Slider - Continuous */}
          <div className="sm:hidden relative overflow-hidden py-2">
            <div 
              ref={contactSliderRef}
              className="flex animate-scroll"
              style={{ 
                animation: 'scroll 25s linear infinite',
                width: 'fit-content'
              }}
            >
              {[...contactSlides, ...contactSlides, ...contactSlides].map((slide, index) => {
                const Icon = slide.icon;
                return (
                  <div 
                    key={index} 
                    className="flex-shrink-0 flex items-center justify-center space-x-3 px-6 h-6 whitespace-nowrap"
                  >
                    <Icon className={slide.color} />
                    <span className="text-xs font-medium text-gray-300">
                      {slide.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`bg-white transition-all duration-500 sticky top-0 z-50 ${
        scrolled ? 'border-b border-gray-100' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-10 sm:h-12">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-teal-500/10 rounded-full blur-sm"></div>
                <FaGraduationCap className="relative text-teal-600 text-2xl" />
              </div>
              <div className="text-2xl font-bold tracking-tight">
                <span className="text-gray-900">Coll</span>
                <span className="text-teal-500">e</span>
                <span className="text-gray-900">ge</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div 
                  key={item.name} 
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {item.name === 'Courses' || item.name === 'About' ? (
                    <div className="relative">
                      <button
                        onMouseEnter={() => handleDropdownEnter(item.name)}
                        onMouseLeave={handleDropdownLeave}
                        onClick={() => handleDropdownClick(item.name)}
                        className="group flex items-center space-x-1 text-gray-700 hover:text-teal-600 font-medium text-sm uppercase tracking-wide transition-all duration-300 relative pb-1"
                      >
                        <span className="relative">
                          {item.name}
                          <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transition-all duration-300 ease-out shadow-[0_2px_8px_rgba(20,184,166,0.3)] ${
                            activeDropdown === item.name || hoveredItem === item.name ? 'w-full' : ''
                          }`}></span>
                        </span>
                        <div className="relative">
                          <FaChevronDown className={`transition-transform duration-300 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`} size={10} />
                        </div>
                      </button>

                      {/* Smooth Dropdown */}
                      <div
                        onMouseEnter={() => handleDropdownEnter(item.name)}
                        onMouseLeave={handleDropdownLeave}
                        className={`absolute left-1/2 transform -translate-x-1/2 top-full mt-4 w-64 bg-white rounded-xl overflow-hidden transition-all duration-300 ${
                          activeDropdown === item.name
                            ? 'opacity-100 visible translate-y-0'
                            : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                        }`}
                      >
                        {/* Animated border container */}
                        <div className="relative p-0.5 rounded-xl bg-gradient-to-br from-gray-50 via-white to-gray-50">
                          <div className="bg-white rounded-xl">
                            {item.name === 'Courses' ? (
                              <>
                                {coursesItems.map((course, index) => (
                                  <a
                                    key={course.name}
                                    href={course.link}
                                    onClick={() => handleNavClick('Courses')}
                                    className="block px-6 py-3 text-sm text-gray-700 hover:text-teal-600 transition-all duration-300 group/item relative"
                                  >
                                    <div className="flex items-center">
                                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-3 group-hover/item:bg-teal-500 transition-all duration-300"></div>
                                      <span className="flex-1">{course.name}</span>
                                      <div className="opacity-0 group-hover/item:opacity-100 transform translate-x-2 group-hover/item:translate-x-0 transition-all duration-300">
                                        <div className="w-0 group-hover/item:w-4 h-[1px] bg-teal-400 transition-all duration-300"></div>
                                      </div>
                                    </div>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-teal-500 group-hover/item:w-full transition-all duration-300"></span>
                                  </a>
                                ))}
                              </>
                            ) : item.name === 'About' ? (
                              <>
                                {aboutItems.map((subItem) => {
                                  const Icon = subItem.icon;
                                  return (
                                    <a
                                      key={subItem.name}
                                      href={subItem.link}
                                      onClick={() => handleNavClick('About')}
                                      className="block px-6 py-4 text-sm hover:bg-teal-50/30 transition-all duration-300 group/item relative"
                                    >
                                      <div className="flex items-start space-x-3">
                                        <div className="relative">
                                          <div className="absolute inset-0 bg-teal-500/10 rounded-full blur-sm group-hover/item:blur-md transition-all duration-300"></div>
                                          <Icon className="relative text-teal-500 text-sm transition-transform duration-300 group-hover/item:scale-110" />
                                        </div>
                                        <div className="flex-1">
                                          <div className="font-medium text-gray-800 group-hover/item:text-teal-600 transition-colors duration-300">
                                            {subItem.name}
                                          </div>
                                          <div className="text-xs text-gray-500 mt-0.5">
                                            {subItem.description}
                                          </div>
                                        </div>
                                      </div>
                                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 group-hover/item:w-full transition-all duration-300 ease-out shadow-[0_1px_4px_rgba(20,184,166,0.4)]"></span>
                                    </a>
                                  );
                                })}
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.link}
                      onClick={() => handleNavClick(item.name)}
                      className="relative text-gray-700 hover:text-teal-600 font-medium text-sm uppercase tracking-wide transition-colors duration-300 pb-1 group"
                    >
                      {item.name}
                      <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transition-all duration-300 ease-out shadow-[0_2px_8px_rgba(20,184,166,0.3)] ${
                        activeNav === item.name ? 'w-full' : 'group-hover:w-full'
                      }`}></span>
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Get Started Button */}
              <button 
                onClick={() => handleNavClick('Courses')}
                className="relative overflow-hidden group bg-teal-600 text-white rounded-full px-6 py-2.5 font-medium text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative  z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative p-2 text-gray-700 hover:text-teal-600 transition-colors duration-300"
            >
              <div className="relative w-6 h-6">
                <div className={`absolute inset-0 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}>
                  <FaBars className="w-full h-full" />
                </div>
                <div className={`absolute inset-0 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-100' : 'opacity-0'
                }`}>
                  <FaTimes className="w-full h-full" />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          {/* Backdrop */}
          <div 
            className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-500 ${
              isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
            onClick={handleCloseMenu}
          />

          {/* Menu Panel */}
          <div
            ref={mobileMenuRef}
            className={`fixed inset-y-0 left-0 w-80 bg-white z-50 transform transition-all duration-500 ease-out shadow-2xl ${
              isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            }`}
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <FaGraduationCap className="text-teal-600 text-2xl" />
                <div className="text-xl font-bold">
                  <span className="text-gray-900">Coll</span>
                  <span className="text-teal-500">e</span>
                  <span className="text-gray-900">ge</span>
                </div>
              </div>
              <button
                onClick={handleCloseMenu}
                className="relative w-10 h-10 flex items-center justify-center rounded-full bg-teal-50 hover:bg-teal-100 text-gray-500 hover:text-teal-600 transition-all duration-300 group"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Menu Content */}
            <div className="h-full overflow-y-auto">
              <div className="p-4">
                {/* Navigation Links */}
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <div key={item.name} className="relative">
                      {item.name === 'Courses' || item.name === 'About' ? (
                        <>
                          <button
                            onClick={() => handleDropdownClick(item.name)}
                            className={`flex items-center justify-between w-full p-4 text-left transition-all duration-300 rounded-lg border-l-4 relative ${
                              activeDropdown === item.name ? 'text-teal-600 bg-teal-50 border-teal-600' : 'text-gray-800 hover:text-teal-600 hover:bg-gray-50 border-transparent'
                            }`}
                          >
                            <span className="font-medium">{item.name}</span>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                              activeDropdown === item.name ? 'bg-teal-500/20' : ''
                            }`}>
                              <FaChevronDown className={`transition-transform duration-300 ${
                                activeDropdown === item.name ? 'rotate-180' : ''
                              }`} />
                            </div>
                          </button>
                          
                          {/* Mobile Submenu */}
                          <div className={`overflow-hidden transition-all duration-500 ease-out ${
                            activeDropdown === item.name ? 'max-h-96 opacity-100 visible' : 'max-h-0 opacity-0 invisible'
                          }`}>
                            <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-4">
                              {item.name === 'Courses' ? (
                                coursesItems.map((course) => (
                                  <a
                                    key={course.name}
                                    href={course.link}
                                    onClick={() => handleNavClick('Courses')}
                                    className="block p-3 text-sm text-gray-600 hover:text-teal-600 transition-colors duration-300 rounded hover:bg-teal-50/50"
                                  >
                                    <div className="flex items-center">
                                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-3 hover:bg-teal-500 transition-colors duration-300"></div>
                                      {course.name}
                                    </div>
                                  </a>
                                ))
                              ) : item.name === 'About' ? (
                                aboutItems.map((subItem) => {
                                  const Icon = subItem.icon;
                                  return (
                                    <a
                                      key={subItem.name}
                                      href={subItem.link}
                                      onClick={() => handleNavClick('About')}
                                      className="block p-3 text-sm text-gray-600 hover:text-teal-600 transition-colors duration-300 rounded hover:bg-teal-50/50"
                                    >
                                      <div className="flex items-center space-x-3">
                                        <Icon className="text-teal-500 text-sm" />
                                        <div>
                                          <div className="font-medium">{subItem.name}</div>
                                          <div className="text-xs text-gray-500 mt-0.5">{subItem.description}</div>
                                        </div>
                                      </div>
                                    </a>
                                  );
                                })
                              ) : null}
                            </div>
                          </div>
                        </>
                      ) : (
                        <a
                          href={item.link}
                          onClick={() => handleNavClick(item.name)}
                          className={`block p-4 rounded-lg border-l-4 transition-all duration-300 ${
                            activeNav === item.name ? 'text-teal-600 font-medium bg-teal-50 border-teal-600' : 'text-gray-800 hover:text-teal-600 hover:bg-gray-50 border-transparent'
                          }`}
                        >
                          {item.name}
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                {/* Get Started Button */}
                <button 
                  onClick={() => {
                    handleNavClick('Courses');
                    handleCloseMenu();
                  }}
                  className="w-full mt-6 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full px-4 py-3 font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get Started
                </button>

                {/* Social Links */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-center space-x-6">
                    <a href="#" className="text-gray-400 hover:text-teal-600 transition-colors duration-300 p-2">
                      <FaFacebook size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-teal-600 transition-colors duration-300 p-2">
                      <FaTwitter size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-teal-600 transition-colors duration-300 p-2">
                      <FaInstagram size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Custom animation styles */}
      <style jsx global>{`
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideOut {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        /* Smooth scrollbar */
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
        
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }

        /* Gradient animations */
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
};

export default Navbar;