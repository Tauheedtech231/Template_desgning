"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaBars, FaTimes, FaChevronDown, FaChevronRight, FaGraduationCap, FaImages, FaCalendarAlt, FaEye } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const coursesMenuRef = useRef<HTMLDivElement>(null);
  const aboutMenuRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (coursesMenuRef.current && !coursesMenuRef.current.contains(event.target as Node)) {
        setIsCoursesOpen(false);
      }
      if (aboutMenuRef.current && !aboutMenuRef.current.contains(event.target as Node)) {
        setIsAboutOpen(false);
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

  // Handle About click
  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAboutOpen(!isAboutOpen);
    setIsCoursesOpen(false); // Close courses if open
    setActiveNav("About");
  };

  // Handle Courses click
  const handleCoursesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCoursesOpen(!isCoursesOpen);
    setIsAboutOpen(false); // Close about if open
    setActiveNav("Courses");
  };

  // Handle Courses link click (for main Courses link)
  const handleCoursesLinkClick = () => {
    setActiveNav("Courses");
    setIsCoursesOpen(false);
    setIsMobileCoursesOpen(false);
    setIsMenuOpen(false);
    window.location.href = "/components/templates/template4/courses";
  };

  // Handle About link click (for main About link)
  const handleAboutLinkClick = () => {
    setActiveNav("About");
    setIsAboutOpen(false);
    setIsMobileAboutOpen(false);
    setIsMenuOpen(false);
    window.location.href = "/components/templates/template4/about";
  };

  // Handle About submenu item click
  const handleAboutItemClick = (itemName: string) => {
    setActiveNav("About");
    setIsAboutOpen(false);
    setIsMobileAboutOpen(false);
    setIsMenuOpen(false);
    // Navigate to specific section based on item
    if (itemName === "Vision") {
      window.location.href = "/components/templates/template4/about#vision";
    } else {
      window.location.href = `/components/templates/template4/${itemName.toLowerCase()}`;
    }
  };

  // Handle Courses submenu item click
  const handleCourseItemClick = (courseName: string) => {
    setActiveNav("Courses");
    setIsCoursesOpen(false);
    setIsMobileCoursesOpen(false);
    setIsMenuOpen(false);
    window.location.href = "/components/templates/template4/courses";
  };

  // Handle mobile courses toggle
  const handleMobileCoursesToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileCoursesOpen(!isMobileCoursesOpen);
    setIsMobileAboutOpen(false); // Close about if open
    setActiveNav("Courses");
  };

  // Handle mobile about toggle
  const handleMobileAboutToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileAboutOpen(!isMobileAboutOpen);
    setIsMobileCoursesOpen(false); // Close courses if open
    setActiveNav("About");
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
                <div key={item.name} className="relative" ref={item.name === 'Courses' ? coursesMenuRef : item.name === 'About' ? aboutMenuRef : null}>
                  {item.name === 'Courses' ? (
                    <div className="relative">
                      <button
                        onClick={handleCoursesClick}
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
                      
                      {/* Courses Dropdown - Rounded corners with smooth border */}
                      {isCoursesOpen && (
                        <div 
                          className="absolute left-0 top-full mt-2 w-56 bg-white border border-gray-100 z-50 rounded-2xl"
                          onMouseLeave={() => setIsCoursesOpen(false)}
                        >
                          {/* Dropdown rounded top corners effect */}
                          <div className="absolute -top-1 left-4 right-4 h-2 bg-white"></div>
                          
                          {coursesItems.map((course, index) => (
                            <button
                              key={course.name}
                              onClick={() => handleCourseItemClick(course.name)}
                              className="block w-full text-left px-5 py-3 text-sm text-gray-700 hover:text-teal-600 transition-all duration-200 relative group/submenu"
                            >
                              <div className="flex items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-3 transition-all duration-300 group-hover/submenu:bg-teal-500"></div>
                                {course.name}
                              </div>
                              
                              {/* Smooth bottom border on hover */}
                              <div className="absolute bottom-0 left-5 right-5 h-[1px] bg-gradient-to-r from-transparent via-teal-400/30 to-transparent opacity-0 group-hover/submenu:opacity-100 transition-all duration-500 transform scale-x-0 group-hover/submenu:scale-x-100 origin-center"></div>
                            </button>
                          ))}
                          
                          {/* View All Courses Link with border */}
                          <div className="border-t border-gray-100/50 mt-2 pt-3 mx-5">
                            <button
                              onClick={handleCoursesLinkClick}
                              className="w-full text-center px-3 py-2 text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors duration-200 rounded-lg hover:bg-teal-50/50"
                            >
                              View All Courses →
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : item.name === 'About' ? (
                    <div className="relative">
                      <button
                        onClick={handleAboutClick}
                        onMouseEnter={() => {
                          setIsAboutOpen(true);
                          setHoveredItem(item.name);
                        }}
                        onMouseLeave={() => setHoveredItem(null)}
                        className="group flex items-center text-gray-700 hover:text-teal-600 font-medium text-sm uppercase tracking-wide transition-all duration-200 relative"
                      >
                        <span className="relative py-2">
                          {item.name}
                          {/* Main navigation underline */}
                          <span className={`absolute -bottom-1 left-0 h-0.5 bg-teal-500 transition-all duration-300 ${
                            isAboutOpen || hoveredItem === item.name ? 'w-full' : 'w-0 group-hover:w-full'
                          }`}></span>
                        </span>
                        <FaChevronDown className={`ml-1.5 transition-transform duration-300 ${isAboutOpen ? 'rotate-180 text-teal-600' : ''}`} size={12} />
                      </button>
                      
                      {/* About Dropdown - Enhanced Design with smooth borders */}
                      {isAboutOpen && (
                        <div 
                          className="absolute left-0 top-full mt-2 w-64 bg-white border border-gray-100 z-50 rounded-2xl"
                          onMouseLeave={() => setIsAboutOpen(false)}
                        >
                          {/* Dropdown rounded top corners effect */}
                          <div className="absolute -top-1 left-4 right-4 h-2 bg-white"></div>
                          
                          {aboutItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                              <button
                                key={item.name}
                                onClick={() => handleAboutItemClick(item.name)}
                                className="block w-full text-left px-5 py-4 hover:bg-teal-50/30 transition-all duration-200 relative group/aboutitem"
                              >
                                <div className="flex items-start">
                                  <div className="mr-3 mt-0.5">
                                    <Icon className="text-teal-500 text-sm transition-transform duration-300 group-hover/aboutitem:scale-110" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-800 group-hover/aboutitem:text-teal-600 transition-colors duration-200">
                                      {item.name}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      {item.description}
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Smooth gradient bottom border on hover */}
                                <div className="absolute bottom-0 left-5 right-5 h-[1px] bg-gradient-to-r from-transparent via-teal-400/40 to-transparent opacity-0 group-hover/aboutitem:opacity-100 transition-all duration-500 transform scale-x-0 group-hover/aboutitem:scale-x-100 origin-center"></div>
                              </button>
                            );
                          })}
                          
                          {/* About Page Link with border */}
                          <div className="border-t border-gray-100/50 mt-2 pt-3 mx-5">
                            <button
                              onClick={handleAboutLinkClick}
                              className="w-full text-center px-3 py-2 text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors duration-200 rounded-lg hover:bg-teal-50/50"
                            >
                              About College →
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
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
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Get Started Button - Fully Rounded */}
              <button 
                onClick={handleCoursesLinkClick}
                className="bg-teal-600 hover:bg-teal-700 transition-all duration-300 text-white rounded-full px-6 py-2.5 font-medium text-sm hover:scale-[1.02] active:scale-[0.98]"
              >
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
                            onClick={handleMobileCoursesToggle}
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
                          
                          {/* Mobile Courses Submenu with smooth borders */}
                          <div className={`overflow-hidden transition-all duration-300 ${
                            isMobileCoursesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}>
                            <div className="ml-4 space-y-1 py-2 border-l border-gray-200/50">
                              {coursesItems.map((course) => (
                                <button
                                  key={course.name}
                                  onClick={() => handleCourseItemClick(course.name)}
                                  className="block w-full text-left p-3 text-sm text-gray-600 hover:text-teal-600 hover:bg-gray-50/50 rounded-lg transition-all duration-200 relative group/mobilesubmenu"
                                >
                                  <div className="flex items-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-3 transition-all duration-200 group-hover/mobilesubmenu:bg-teal-500"></div>
                                    {course.name}
                                  </div>
                                  
                                  {/* Mobile submenu smooth bottom border on hover */}
                                  <div className="absolute bottom-0 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-teal-400/40 to-transparent opacity-0 group-hover/mobilesubmenu:opacity-100 transition-all duration-500 transform scale-x-0 group-hover/mobilesubmenu:scale-x-100 origin-center"></div>
                                </button>
                              ))}
                              {/* View All Courses in Mobile */}
                              <button
                                onClick={handleCoursesLinkClick}
                                className="block w-full text-left p-3 text-sm text-teal-600 hover:text-teal-700 font-medium rounded-lg transition-all duration-200 hover:bg-teal-50/30 mt-2"
                              >
                                View All Courses →
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : item.name === 'About' ? (
                        <div className="mb-2">
                          <button
                            onClick={handleMobileAboutToggle}
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
                              isMobileAboutOpen ? 'rotate-90' : ''
                            } ${activeNav === item.name ? 'text-teal-500' : 'text-gray-400'}`} />
                          </button>
                          
                          {/* Mobile About Submenu with smooth borders */}
                          <div className={`overflow-hidden transition-all duration-300 ${
                            isMobileAboutOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}>
                            <div className="ml-4 space-y-1 py-2 border-l border-gray-200/50">
                              {aboutItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <button
                                    key={item.name}
                                    onClick={() => handleAboutItemClick(item.name)}
                                    className="block w-full text-left p-3 text-sm text-gray-600 hover:text-teal-600 hover:bg-gray-50/50 rounded-lg transition-all duration-200 relative group/mobileabout"
                                  >
                                    <div className="flex items-center">
                                      <Icon className="text-teal-500 mr-3 text-sm transition-transform duration-300 group-hover/mobileabout:scale-110" />
                                      <div>
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                                      </div>
                                    </div>
                                    
                                    {/* Mobile smooth bottom border on hover */}
                                    <div className="absolute bottom-0 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-teal-400/40 to-transparent opacity-0 group-hover/mobileabout:opacity-100 transition-all duration-500 transform scale-x-0 group-hover/mobileabout:scale-x-100 origin-center"></div>
                                  </button>
                                );
                              })}
                              {/* About College Link */}
                              <button
                                onClick={handleAboutLinkClick}
                                className="block w-full text-left p-3 text-sm text-teal-600 hover:text-teal-700 font-medium rounded-lg transition-all duration-200 hover:bg-teal-50/30 mt-2"
                              >
                                About College →
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link
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
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* Get Started Button - Fully Rounded */}
                <button 
                  onClick={handleCoursesLinkClick}
                  className="w-full mt-6 bg-teal-600 hover:bg-teal-700 transition-all duration-300 text-white rounded-full px-4 py-3 font-medium"
                >
                  Get Started
                </button>

                {/* Contact Info with smooth hover effects */}
                <div className="mt-8 pt-6 border-t border-gray-200/50">
                  <h4 className="font-semibold text-gray-900 mb-4">Contact Info</h4>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50/50 transition-colors duration-200 relative group/contact">
                      <FaMapMarkerAlt className="text-teal-500 mt-1 flex-shrink-0 transition-transform duration-300 group-hover/contact:scale-110" />
                      <span className="text-gray-600">Q Kamboh plaza Lahore, Pakistan</span>
                      <div className="absolute bottom-0 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-teal-400/30 to-transparent opacity-0 group-hover/contact:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50/50 transition-colors duration-200 relative group/contact">
                      <FaEnvelope className="text-teal-500 mt-1 flex-shrink-0 transition-transform duration-300 group-hover/contact:scale-110" />
                      <span className="text-gray-600">college@starlysoft.com</span>
                      <div className="absolute bottom-0 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-teal-400/30 to-transparent opacity-0 group-hover/contact:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50/50 transition-colors duration-200 relative group/contact">
                      <FaPhone className="text-teal-500 mt-1 flex-shrink-0 transition-transform duration-300 group-hover/contact:scale-110" />
                      <span className="text-gray-600">+92 333 754144</span>
                      <div className="absolute bottom-0 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-teal-400/30 to-transparent opacity-0 group-hover/contact:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                </div>

                {/* Social Links with smooth hover */}
                <div className="mt-6 pt-6 border-t border-gray-200/50">
                  <div className="flex justify-center space-x-4">
                    <a href="#" className="text-gray-400 hover:text-teal-600 transition-all duration-300 p-2 rounded-full hover:bg-gray-100/50 group/social">
                      <FaFacebook size={18} className="transition-transform duration-300 group-hover/social:scale-110" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-teal-600 transition-all duration-300 p-2 rounded-full hover:bg-gray-100/50 group/social">
                      <FaTwitter size={18} className="transition-transform duration-300 group-hover/social:scale-110" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-teal-600 transition-all duration-300 p-2 rounded-full hover:bg-gray-100/50 group/social">
                      <FaInstagram size={18} className="transition-transform duration-300 group-hover/social:scale-110" />
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

        /* Smooth border animation */
        @keyframes borderExpand {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          100% {
            transform: scaleX(1);
            opacity: 1;
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
      `}</style>
    </>
  );
};

export default Navbar;