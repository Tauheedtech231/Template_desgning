"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaBars, FaTimes, FaChevronDown, FaChevronRight, FaGraduationCap } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [contentAnimate, setContentAnimate] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const coursesMenuRef = useRef<HTMLDivElement>(null);

  // Courses submenu items
  const coursesItems = [
    { name: "Computer Science", link: "#" },
    { name: "Business Administration", link: "#" },
    { name: "Engineering", link: "#" },
    { name: "Medical Sciences", link: "#" },
    { name: "Arts & Humanities", link: "#" },
  ];

  // Navigation items
  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/components/templates/template4/about" },
    { name: "Courses", link: "/components/templates/template4/courses" },
    { name: "Faculty", link: "/components/templates/template4/faculty" },
    { name: "Contact", link: "/components/templates/template4/contact" },
  ];

  // Animate content when menu opens
  useEffect(() => {
    if (isMenuOpen) {
      // Small delay before animating content
      const timer = setTimeout(() => {
        setContentAnimate(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setContentAnimate(false);
    }
  }, [isMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (coursesMenuRef.current && !coursesMenuRef.current.contains(event.target as Node)) {
        setIsCoursesOpen(false);
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

  // Handle menu close with content exit animation
  const handleCloseMenu = () => {
    setContentAnimate(false);
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 200);
  };

  return (
    <>
      {/* Top Bar - Unchanged as requested */}
      <div className="bg-gray-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            {/* Left section - Contact info in single line on desktop */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 mb-2 sm:mb-0 text-sm">
              <div className="flex items-center space-x-2 mb-1 sm:mb-0">
                <FaMapMarkerAlt className="text-orange-500 text-xs" />
                <span>Q Kamboh plaza Lahore, Pakistan</span>
              </div>
              <div className="hidden sm:block">|</div>
              <div className="flex items-center space-x-2 mb-1 sm:mb-0">
                <FaEnvelope className="text-orange-500 text-xs" />
                <span>college@starlysoft.com</span>
              </div>
              <div className="hidden sm:block">|</div>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-orange-500 text-xs" />
                <span>+92 333 754144</span>
              </div>
            </div>

            {/* Right section - Social icons */}
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-orange-500 transition-colors">
                <FaFacebook size={14} />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                <FaTwitter size={14} />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                <FaInstagram size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <FaGraduationCap className="text-teal-600 text-2xl" />
              <div className="text-2xl font-bold">
                <span className="text-gray-900">Coll</span>
                <span className="text-teal-500">e</span>
                <span className="text-gray-900">ge</span>
              </div>
            </div>

            {/* Desktop Navigation Items */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.name} className="relative" ref={item.name === 'Courses' ? coursesMenuRef : null}>
                  {item.name === 'Courses' ? (
                    <div className="relative">
                      <button
                        onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                        onMouseEnter={() => setIsCoursesOpen(true)}
                        className="group flex items-center text-gray-700 hover:text-teal-600 font-medium text-sm uppercase tracking-wide transition-all duration-300 relative"
                      >
                        <span className="relative">
                          {item.name}
                          <span className={`absolute -bottom-1 left-0 h-0.5 bg-teal-500 transition-all duration-300 ${isCoursesOpen ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                        </span>
                        <FaChevronDown className={`ml-1.5 transition-transform duration-300 ${isCoursesOpen ? 'rotate-180 text-teal-600' : ''}`} size={12} />
                      </button>
                      
                      {/* Courses Dropdown */}
                      {isCoursesOpen && (
                        <div 
                          className="absolute left-0 top-full mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-100"
                          onMouseLeave={() => setIsCoursesOpen(false)}
                        >
                          {coursesItems.map((course) => (
                            <a
                              key={course.name}
                              href={course.link}
                              className="block px-4 py-2.5 text-sm text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200"
                              onClick={() => setIsCoursesOpen(false)}
                            >
                              {course.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.link}
                      className="group relative text-gray-700 hover:text-teal-600 font-medium text-sm uppercase tracking-wide transition-all duration-300"
                      onClick={() => setActiveNav(item.name)}
                    >
                      <span className="relative">
                        {item.name}
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-teal-500 transition-all duration-300 ${activeNav === item.name ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                      </span>
                    </a>
                  )}
                </div>
              ))}
              
              {/* Get Started Button with teal theme */}
              <button className="bg-teal-500 hover:bg-teal-600 transition-all duration-300 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] px-6 py-2.5 font-medium text-sm">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-teal-600 transition-colors"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Smooth Animations */}
        <div className="lg:hidden">
          {/* Backdrop */}
          <div 
            className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-all duration-500 ${
              isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
            onClick={handleCloseMenu}
          />

          {/* Menu Container - Slides from LEFT */}
          <div
            ref={mobileMenuRef}
            className={`fixed inset-y-0 left-0 w-80 bg-white shadow-xl z-50 transform transition-transform duration-500 ease-out ${
              isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            
            {/* Menu Content Container - Slides from RIGHT */}
            <div className={`h-full overflow-y-auto pb-6 transition-all duration-500 ${
              contentAnimate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              
              {/* Menu Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <FaGraduationCap className="text-teal-600 text-2xl" />
                  <div className="text-xl font-bold">
                    <span className="text-gray-900">Coll</span>
                    <span className="text-teal-500">e</span>
                    <span className="text-gray-900">ge</span>
                  </div>
                </div>
                <button
                  onClick={handleCloseMenu}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Menu Content with Staggered Animation */}
              <div className="p-6">
                {/* Navigation Links */}
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <div key={item.name} className="relative">
                      {item.name === 'Courses' ? (
                        <div className="mb-2">
                          <button
                            onClick={() => setIsMobileCoursesOpen(!isMobileCoursesOpen)}
                            className={`flex items-center justify-between w-full p-3 text-left transition-all duration-300 ${
                              activeNav === item.name ? 'text-teal-600 font-semibold' : 'text-gray-800 hover:text-teal-600'
                            }`}
                          >
                            <span className="relative">
                              {item.name}
                              {activeNav === item.name && (
                                <span className="absolute -bottom-1 left-0 h-0.5 bg-teal-500 w-full transition-all duration-300"></span>
                              )}
                            </span>
                            <FaChevronRight className={`transition-transform duration-300 ${
                              isMobileCoursesOpen ? 'rotate-90' : ''
                            } ${activeNav === item.name ? 'text-teal-500' : 'text-gray-400'}`} />
                          </button>
                          
                          {/* Mobile Courses Submenu with animation */}
                          <div className={`overflow-hidden transition-all duration-500 ${
                            isMobileCoursesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}>
                            <div className="ml-4 space-y-1 py-2">
                              {coursesItems.map((course) => (
                                <a
                                  key={course.name}
                                  href={course.link}
                                  className="block p-3 text-sm text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded transition-all duration-300 transform hover:translate-x-1"
                                  onClick={handleCloseMenu}
                                >
                                  {course.name}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <a
                          href={item.link}
                          className={`block p-3 transition-all duration-300 transform hover:translate-x-1 ${
                            activeNav === item.name ? 'text-teal-600 font-semibold' : 'text-gray-800 hover:text-teal-600'
                          }`}
                          onClick={() => {
                            setActiveNav(item.name);
                            handleCloseMenu();
                          }}
                        >
                          <span className="relative">
                            {item.name}
                            {activeNav === item.name && (
                              <span className="absolute -bottom-1 left-0 h-0.5 bg-teal-500 w-full transition-all duration-300"></span>
                            )}
                          </span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                {/* Get Started Button with animation */}
                <button className="w-full mt-6 bg-teal-500 hover:bg-teal-600 transition-all duration-300 text-white rounded-full shadow-lg hover:shadow-xl active:scale-[0.98] p-3.5 font-medium transform hover:scale-[1.02]">
                  Get Started
                </button>

                {/* Contact Info with animation */}
                <div className={`mt-8 pt-6 border-t border-gray-200 transition-all duration-700 ${
                  contentAnimate ? 'opacity-100' : 'opacity-0'
                }`}>
                  <h4 className="font-semibold text-gray-900 mb-4">Contact Info</h4>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start space-x-3 transition-all duration-300 transform hover:translate-x-1">
                      <FaMapMarkerAlt className="text-teal-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Q Kamboh plaza Lahore, Pakistan</span>
                    </div>
                    <div className="flex items-start space-x-3 transition-all duration-300 transform hover:translate-x-1">
                      <FaEnvelope className="text-teal-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">college@starlysoft.com</span>
                    </div>
                    <div className="flex items-start space-x-3 transition-all duration-300 transform hover:translate-x-1">
                      <FaPhone className="text-teal-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">+92 333 754144</span>
                    </div>
                  </div>
                </div>

                {/* Social Links with animation */}
                <div className={`mt-6 pt-6 border-t border-gray-200 transition-all duration-800 ${
                  contentAnimate ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="flex justify-center space-x-4">
                    <a href="#" className="text-gray-400 hover:text-teal-600 transition-all duration-300 transform hover:scale-110">
                      <FaFacebook size={18} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-teal-600 transition-all duration-300 transform hover:scale-110">
                      <FaTwitter size={18} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-teal-600 transition-all duration-300 transform hover:scale-110">
                      <FaInstagram size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Add custom animation styles */}
      <style jsx global>{`
        @keyframes slideInLeft {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          0% {
            transform: translateX(20px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        /* Staggered animations for menu items */
        .nav-item-enter {
          animation: slideInRight 0.5s ease-out forwards;
          opacity: 0;
        }

        .nav-item-enter-active {
          opacity: 1;
          transform: translateX(0);
        }

        /* Custom transition delays for staggered effect */
        .delay-100 {
          animation-delay: 100ms;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-400 {
          animation-delay: 400ms;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </>
  );
};

export default Navbar;