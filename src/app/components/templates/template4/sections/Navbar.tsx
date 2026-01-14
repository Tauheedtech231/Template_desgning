"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaBars, FaTimes, FaChevronDown, FaChevronRight, FaGraduationCap } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const coursesMenuRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  // Courses submenu items
  const coursesItems = [
    { name: "Computer Science", link: "components/templates/template4/courses" },
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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Handle menu close with smooth animation
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar - Professional Design */}
      <div className="bg-gray-900 text-white py-2 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            {/* Left section - Contact info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 mb-2 sm:mb-0 text-sm">
              <div className="flex items-center space-x-2 mb-1 sm:mb-0 group">
                <FaMapMarkerAlt className="text-teal-400 text-xs" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                  Q Kamboh plaza Lahore, Pakistan
                </span>
              </div>
              <div className="hidden sm:block text-gray-600">|</div>
              <div className="flex items-center space-x-2 mb-1 sm:mb-0 group">
                <FaEnvelope className="text-teal-400 text-xs" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                  college@starlysoft.com
                </span>
              </div>
              <div className="hidden sm:block text-gray-600">|</div>
              <div className="flex items-center space-x-2 group">
                <FaPhone className="text-teal-400 text-xs" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                  +92 333 754144
                </span>
              </div>
            </div>

            {/* Right section - Social icons */}
            <div className="flex items-center space-x-4">
              {[
                { icon: FaFacebook, color: "hover:text-blue-400" },
                { icon: FaTwitter, color: "hover:text-sky-400" },
                { icon: FaInstagram, color: "hover:text-pink-400" }
              ].map((social, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className={`text-gray-400 transition-colors duration-200 ${social.color}`}
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Professional Design */}
      <nav 
        ref={navbarRef}
        className={`bg-white transition-all duration-300 sticky top-0 z-50 border-b ${
          scrolled 
            ? 'border-gray-200 shadow-sm' 
            : 'border-gray-100'
        }`}
      >
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
                        onMouseEnter={() => {
                          setIsCoursesOpen(true);
                          setHoveredItem(item.name);
                        }}
                        onMouseLeave={() => setHoveredItem(null)}
                        className="group flex items-center text-gray-700 hover:text-teal-600 font-medium text-sm uppercase tracking-wide transition-all duration-200 relative"
                      >
                        <span className="relative py-2">
                          {item.name}
                          {/* Main navigation underline */}
                          <span className={`absolute -bottom-1 left-0 h-0.5 bg-teal-500 transition-all duration-300 ${
                            isCoursesOpen || hoveredItem === item.name ? 'w-full' : 'w-0 group-hover:w-full'
                          }`}></span>
                        </span>
                        <FaChevronDown className={`ml-1.5 transition-transform duration-300 ${isCoursesOpen ? 'rotate-180 text-teal-600' : ''}`} size={12} />
                      </button>
                      
                      {/* Courses Dropdown - Rounded corners */}
                      {isCoursesOpen && (
                        <div 
                          className="absolute left-0 top-full mt-1 w-56 bg-white border border-gray-200 py-2 z-50 rounded-lg"
                          onMouseLeave={() => setIsCoursesOpen(false)}
                        >
                          {/* Subtle top border for dropdown */}
                          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent"></div>
                          
                          {coursesItems.map((course, index) => (
                            <a
                              key={course.name}
                              href={course.link}
                              className="block px-4 py-2.5 text-sm text-gray-700 hover:text-teal-600 transition-all duration-200 relative group/submenu"
                              onClick={() => setIsCoursesOpen(false)}
                            >
                              <div className="flex items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-3 transition-all duration-300 group-hover/submenu:bg-teal-500"></div>
                                {course.name}
                              </div>
                              
                              {/* Submenu item bottom border on hover */}
                              <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-0 group-hover/submenu:opacity-100 transition-opacity duration-300 transform scale-x-0 group-hover/submenu:scale-x-100 transition-transform duration-300 origin-center"></div>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.link}
                      className="group relative text-gray-700 hover:text-teal-600 font-medium text-sm uppercase tracking-wide transition-all duration-200"
                      onClick={() => setActiveNav(item.name)}
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span className="relative py-2 block">
                        {item.name}
                        {/* Smooth bottom border for active/hover */}
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-teal-500 transition-all duration-300 ${
                          activeNav === item.name ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}></span>
                      </span>
                    </a>
                  )}
                </div>
              ))}
              
              {/* Get Started Button - Fully Rounded */}
              <button className="bg-teal-600 hover:bg-teal-700 transition-all duration-300 text-white rounded-full px-6 py-2.5 font-medium text-sm hover:scale-[1.02] active:scale-[0.98]">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button - Rounded */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-teal-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Rounded Slider */}
        <div className="lg:hidden">
          {/* Backdrop */}
          <div 
            className={`fixed inset-0 bg-black/40 z-40 transition-all duration-300 ${
              isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
            onClick={handleCloseMenu}
          />

          {/* Menu Container - Rounded right corners for soft slide in */}
          <div
            ref={mobileMenuRef}
            className={`fixed inset-y-0 left-0 w-80 bg-white z-50 transform transition-transform duration-500 ease-out ${
              isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            style={{ 
              borderTopRightRadius: '1.5rem',
              borderBottomRightRadius: '1.5rem'
            }}
          >
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
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Menu Content with rounded scroll area */}
            <div className="h-full overflow-y-auto pb-6" style={{ 
              borderBottomRightRadius: '1.5rem'
            }}>
              <div className="p-4">
                {/* Navigation Links */}
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <div key={item.name} className="relative">
                      {item.name === 'Courses' ? (
                        <div className="mb-2">
                          <button
                            onClick={() => setIsMobileCoursesOpen(!isMobileCoursesOpen)}
                            className={`flex items-center justify-between w-full p-3 text-left transition-all duration-200 rounded-lg ${
                              activeNav === item.name ? 'text-teal-600 font-semibold bg-teal-50' : 'text-gray-800 hover:text-teal-600 hover:bg-gray-50'
                            }`}
                          >
                            <span className="relative">
                              {item.name}
                              {activeNav === item.name && (
                                <span className="absolute -bottom-1 left-0 h-0.5 bg-teal-500 w-full"></span>
                              )}
                            </span>
                            <FaChevronRight className={`transition-transform duration-200 ${
                              isMobileCoursesOpen ? 'rotate-90' : ''
                            } ${activeNav === item.name ? 'text-teal-500' : 'text-gray-400'}`} />
                          </button>
                          
                          {/* Mobile Courses Submenu with rounded items */}
                          <div className={`overflow-hidden transition-all duration-300 ${
                            isMobileCoursesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}>
                            <div className="ml-4 space-y-1 py-2 border-l border-gray-200">
                              {coursesItems.map((course) => (
                                <a
                                  key={course.name}
                                  href={course.link}
                                  className="block p-3 text-sm text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-all duration-200 relative group/mobilesubmenu"
                                  onClick={handleCloseMenu}
                                >
                                  <div className="flex items-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-3 transition-all duration-200 group-hover/mobilesubmenu:bg-teal-500"></div>
                                    {course.name}
                                  </div>
                                  
                                  {/* Mobile submenu bottom border on hover */}
                                  <div className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-0 group-hover/mobilesubmenu:opacity-100 transition-opacity duration-200"></div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <a
                          href={item.link}
                          className={`block p-3 rounded-lg transition-all duration-200 ${
                            activeNav === item.name ? 'text-teal-600 font-semibold bg-teal-50' : 'text-gray-800 hover:text-teal-600 hover:bg-gray-50'
                          }`}
                          onClick={() => {
                            setActiveNav(item.name);
                            handleCloseMenu();
                          }}
                        >
                          <span className="relative">
                            {item.name}
                            {activeNav === item.name && (
                              <span className="absolute -bottom-1 left-0 h-0.5 bg-teal-500 w-full"></span>
                            )}
                          </span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                {/* Get Started Button - Fully Rounded */}
                <button className="w-full mt-6 bg-teal-600 hover:bg-teal-700 transition-all duration-300 text-white rounded-full px-4 py-3 font-medium">
                  Get Started
                </button>

                {/* Contact Info with rounded cards */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Contact Info</h4>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <FaMapMarkerAlt className="text-teal-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Q Kamboh plaza Lahore, Pakistan</span>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <FaEnvelope className="text-teal-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">college@starlysoft.com</span>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <FaPhone className="text-teal-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">+92 333 754144</span>
                    </div>
                  </div>
                </div>

                {/* Social Links with rounded buttons */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-center space-x-4">
                    <a href="#" className="text-gray-400 hover:text-teal-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100">
                      <FaFacebook size={18} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-teal-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100">
                      <FaTwitter size={18} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-teal-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100">
                      <FaInstagram size={18} />
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
        /* Smooth slide in animation for mobile menu */
        @keyframes softSlideIn {
          0% {
            transform: translateX(-100%);
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          100% {
            transform: translateX(0);
            border-top-right-radius: 1.5rem;
            border-bottom-right-radius: 1.5rem;
          }
        }

        @keyframes softSlideOut {
          0% {
            transform: translateX(0);
            border-top-right-radius: 1.5rem;
            border-bottom-right-radius: 1.5rem;
          }
          100% {
            transform: translateX(-100%);
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
        }

        /* Custom scrollbar for mobile menu */
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
        
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
          border-top-right-radius: 1.5rem;
          border-bottom-right-radius: 1.5rem;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
        
        /* Smooth transition for rounded corners */
        .rounded-slide {
          animation: softSlideIn 0.5s ease-out forwards;
        }
        
        .rounded-slide-out {
          animation: softSlideOut 0.5s ease-in forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;