"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showCoursesDropdown, setShowCoursesDropdown] = useState(false);
  const [showMobileCoursesDropdown, setShowMobileCoursesDropdown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeLink, setActiveLink] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const coursesDropdownRef = useRef<HTMLDivElement>(null);

  // Color Scheme
  const colors = {
    background: "#FFFFFF",
    text: "#2C3E50",
    accent: "#8B6B61",
    accentHover: "#A17A74",
    border: "#E8E8E8",
    searchBg: "#F8F8F8",
    placeholder: "#7F8C8D"
  };

  // Courses data for dropdown
  const coursesData = [
    { name: "Computer Science", duration: "4 Years" },
    { name: "Business Management", duration: "3 Years" },
    { name: "Engineering", duration: "4 Years" },
    { name: "Medical Sciences", duration: "5 Years" },
    { name: "Arts & Humanities", duration: "3 Years" },
    { name: "Law Program", duration: "5 Years" },
  ];

  // Search data
  const searchData = [
    { title: "Home", url: "/", category: "Main" },
    { title: "About", url: "/components/templates/template5/about", category: "Information" },
    { title: "Faculty", url: "/components/templates/template5/faculty", category: "Teachers" },
    { title: "Courses", url: "/components/templates/template5/courses", category: "Programs" },
    { title: "Gallery", url: "/components/templates/template5/gallery", category: "Photos" },
    { title: "Contact", url: "/components/templates/template5/contact", category: "Get in Touch" },
  ];

  // Filtered search results
  const searchResults = searchQuery.trim() 
    ? searchData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  // ==================== ANIMATION VARIANTS ====================
  const mobileSliderVariants: Variants = {
    hidden: { 
      x: "100%",
      opacity: 0
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        mass: 0.8
      }
    },
    exit: { 
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const searchResultsVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: -8,
      transition: {
        duration: 0.18,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.22,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.03
      }
    }
  };

  const coursesDropdownVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: -10,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: { 
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const mobileCoursesDropdownVariants: Variants = {
    hidden: { 
      opacity: 0,
      height: 0,
    },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.25,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  // ==================== EFFECTS ====================
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
      setShowSearchResults(false);
      setShowCoursesDropdown(false);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.querySelector('.mobile-menu-container');
      const menuButton = document.querySelector('.mobile-menu-button');
      const searchResults = searchResultsRef.current;
      const searchInput = searchInputRef.current;
      const coursesDropdown = coursesDropdownRef.current;
      const coursesButton = document.querySelector('.courses-dropdown-button');
      
      // Close mobile menu
      if (menu && !menu.contains(event.target as Node) && !menuButton?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      
      // Close search results
      if (searchResults && searchInput && 
          !searchResults.contains(event.target as Node) && 
          !searchInput.contains(event.target as Node)) {
        setShowSearchResults(false);
      }

      // Close courses dropdown
      if (coursesDropdown && coursesButton && 
          !coursesDropdown.contains(event.target as Node) && 
          !coursesButton.contains(event.target as Node)) {
        setShowCoursesDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    // Set active link based on current path
    const pathname = window.location.pathname;
    if (pathname.includes("about")) setActiveLink("about");
    else if (pathname.includes("faculty")) setActiveLink("faculty");
    else if (pathname.includes("courses")) setActiveLink("courses");
    else if (pathname.includes("gallery")) setActiveLink("gallery");
    else if (pathname.includes("contact")) setActiveLink("contact");
    else setActiveLink("home");
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && searchResults.length > 0) {
      window.location.href = searchResults[0].url;
      setSearchQuery("");
      setShowSearchResults(false);
    }
  };

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
    setShowSearchResults(value.trim().length > 0);
  };

  // ==================== DESKTOP NAVIGATION ====================
  const DesktopNav = () => (
    <div className="hidden lg:flex items-center gap-6">
      {/* Navigation Links */}
      <nav className="flex items-center gap-0">
        {[
          { name: "Home", href: "/", id: "home" },
          { name: "About Us", href: "/components/templates/template5/about", id: "about" },
          { name: "Faculty", href: "/components/templates/template5/faculty", id: "faculty" },
        ].map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onClick={() => setActiveLink(item.id)}
            className={`px-5 py-3 font-medium text-[16px] tracking-[0.15px] transition-all duration-300 relative group/navitem ${
              activeLink === item.id 
                ? `text-[#8B6B61] font-semibold` 
                : `text-[#2C3E50] hover:text-[#8B6B61]`
            }`}
          >
            <span className="relative">
              {item.name}
              <span className={`absolute -bottom-[2px] left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ${
                activeLink === item.id 
                  ? 'w-[70%] bg-[#8B6B61] opacity-100' 
                  : 'w-0 bg-[#A17A74] opacity-0 group-hover/navitem:w-[70%] group-hover/navitem:opacity-100'
              }`}></span>
            </span>
          </Link>
        ))}

        {/* Courses Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowCoursesDropdown(!showCoursesDropdown)}
            className={`px-5 py-3 font-medium text-[16px] tracking-[0.15px] transition-all duration-300 relative group/courses courses-dropdown-button ${
              activeLink === "courses" 
                ? `text-[#8B6B61] font-semibold` 
                : `text-[#2C3E50] hover:text-[#8B6B61]`
            }`}
          >
            <span className="relative flex items-center gap-1">
              Programs
              <span className={`text-[12px] transition-transform duration-300 ${showCoursesDropdown ? 'rotate-180' : ''}`}>
                ▼
              </span>
              <span className={`absolute -bottom-[2px] left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ${
                activeLink === "courses" || showCoursesDropdown
                  ? 'w-[70%] bg-[#8B6B61] opacity-100' 
                  : 'w-0 bg-[#A17A74] opacity-0 group-hover/courses:w-[70%] group-hover/courses:opacity-100'
              }`}></span>
            </span>
          </button>

          {/* Courses Dropdown */}
          <AnimatePresence>
            {showCoursesDropdown && (
              <motion.div
                ref={coursesDropdownRef}
                className="absolute top-full left-0 mt-2 w-72 bg-white border border-[#E0E0E0] rounded-2xl shadow-[0_20px_60px_rgba(139,107,97,0.15)] overflow-hidden z-40"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={coursesDropdownVariants}
              >
                <div className="p-4">
                  <div className="font-semibold text-[14px] text-[#8B6B61] mb-3 px-2">Popular Programs</div>
                  <div className="space-y-1">
                    {coursesData.map((course, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          window.location.href = "/components/templates/template5/courses";
                          setShowCoursesDropdown(false);
                          setActiveLink("courses");
                        }}
                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#F8F8F8] transition-all duration-200 group/courseitem"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-[15px] text-[#2C3E50] tracking-[0.15px] group-hover/courseitem:text-[#8B6B61]">
                              {course.name}
                            </div>
                            <div className="text-[13px] text-[#7F8C8D] tracking-[0.08px] mt-1">
                              Duration: {course.duration}
                            </div>
                          </div>
                          <div className="text-[#E0E0E0] group-hover/courseitem:text-[#8B6B61] transition-colors duration-200 text-lg">→</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      window.location.href = "/components/templates/template5/courses";
                      setShowCoursesDropdown(false);
                      setActiveLink("courses");
                    }}
                    className="w-full mt-3 px-4 py-3 bg-[#8B6B61] text-white rounded-xl font-medium text-[14px] text-center hover:bg-[#7A5D54] transition-colors duration-300"
                  >
                    View All Programs
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {[
          { name: "Gallery", href: "/components/templates/template5/gallery", id: "gallery" },
        ].map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onClick={() => setActiveLink(item.id)}
            className={`px-5 py-3 font-medium text-[16px] tracking-[0.15px] transition-all duration-300 relative group/navitem ${
              activeLink === item.id 
                ? `text-[#8B6B61] font-semibold` 
                : `text-[#2C3E50] hover:text-[#8B6B61]`
            }`}
          >
            <span className="relative">
              {item.name}
              <span className={`absolute -bottom-[2px] left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ${
                activeLink === item.id 
                  ? 'w-[70%] bg-[#8B6B61] opacity-100' 
                  : 'w-0 bg-[#A17A74] opacity-0 group-hover/navitem:w-[70%] group-hover/navitem:opacity-100'
              }`}></span>
            </span>
          </Link>
        ))}
      </nav>

      {/* Search Input */}
      <div className="relative">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => handleSearchInputChange(e.target.value)}
            onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
            className="w-56 px-5 py-3 bg-[#F8F8F8] border border-[#E0E0E0] rounded-full focus:outline-none focus:border-[#8B6B61] text-[#2C3E50] placeholder:text-[#7F8C8D] text-[15px] tracking-[0.15px] font-normal transition-all duration-300 hover:border-[#D0C9C6]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setShowSearchResults(false);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7F8C8D] hover:text-[#2C3E50] transition-colors duration-200 text-[18px] leading-none"
            >
              ×
            </button>
          )}
        </form>

        {/* Search Results Dropdown */}
        <AnimatePresence>
          {showSearchResults && searchResults.length > 0 && (
            <motion.div
              ref={searchResultsRef}
              className="absolute top-full left-0 mt-2 w-72 bg-white border border-[#E0E0E0] rounded-2xl shadow-[0_20px_60px_rgba(139,107,97,0.15)] overflow-hidden z-40"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={searchResultsVariants}
            >
              <div className="p-4">
                <div className="space-y-1">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        window.location.href = result.url;
                        setSearchQuery("");
                        setShowSearchResults(false);
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#F8F8F8] transition-all duration-200 group/searchitem"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-[15px] text-[#2C3E50] tracking-[0.15px] group-hover/searchitem:text-[#8B6B61]">
                            {result.title}
                          </div>
                          <div className="text-[13px] text-[#7F8C8D] tracking-[0.08px] mt-1">
                            {result.category}
                          </div>
                        </div>
                        <div className="text-[#E0E0E0] group-hover/searchitem:text-[#8B6B61] transition-colors duration-200 text-lg">→</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Contact Button */}
      <Link
        href="/components/templates/template5/contact"
        onClick={() => setActiveLink("contact")}
        className={`px-7 py-3.5 font-semibold text-[15px] rounded-full transition-all duration-300 tracking-[0.15px] ${
          activeLink === "contact"
            ? 'bg-[#8B6B61] text-white hover:bg-[#7A5D54] shadow-sm'
            : 'bg-[#2C3E50] text-white hover:bg-[#8B6B61] shadow-sm'
        }`}
      >
        Contact
      </Link>
    </div>
  );

  // ==================== MOBILE NAVIGATION ====================
  const MobileNav = () => (
    <div className="flex items-center gap-4 lg:hidden">
      <button
        onClick={() => setIsMenuOpen(true)}
        className="mobile-menu-button px-4 py-2 text-[#2C3E50] hover:text-[#8B6B61] transition-colors duration-300 font-medium text-[15px]"
      >
        <MenuIcon />
      </button>
    </div>
  );

  // ==================== RIGHT SLIDER MENU ====================
  const RightSliderMenu = () => (
    <AnimatePresence>
      {isMenuOpen && isMobile && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/25 backdrop-blur-[1px] z-40"
          />

          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileSliderVariants}
            className="mobile-menu-container fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white z-40 overflow-hidden"
          >
            {/* Header with Logo and Close */}
            <div className="sticky top-0 bg-white z-10 border-b border-[#E0E0E0] px-5 py-4">
              <div className="flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#8B6B61] rounded-full"></div>
                  <div>
                    <span className="font-bold text-[16px] text-[#2C3E50] block">
                      Excellence College
                    </span>
                    <span className="text-[11px] text-[#7F8C8D] font-medium">
                      Since 1995
                    </span>
                  </div>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#2C3E50] hover:text-[#8B6B61] text-[20px] font-light"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="overflow-y-auto h-full">
              <div className="p-5">
                {/* Search Input */}
                <form onSubmit={handleSearchSubmit} className="relative mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => handleSearchInputChange(e.target.value)}
                      className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#E0E0E0] rounded-full focus:outline-none focus:border-[#8B6B61] text-[#2C3E50] placeholder:text-[#7F8C8D] text-[14px]"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7F8C8D] hover:text-[#2C3E50]"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </form>

                {/* Navigation Links */}
                <div className="space-y-1 mb-6">
                  {[
                    { name: "Home", href: "/", id: "home" },
                    { name: "About Us", href: "/components/templates/template5/about", id: "about" },
                    { name: "Faculty", href: "/components/templates/template5/faculty", id: "faculty" },
                  ].map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setActiveLink(item.id);
                      }}
                      className={`block w-full text-left px-4 py-3.5 rounded-xl transition-all duration-300 ${
                        activeLink === item.id
                          ? 'bg-[#F8F8F8] text-[#8B6B61] font-semibold'
                          : 'text-[#2C3E50] hover:bg-[#F8F8F8]'
                      }`}
                    >
                      <div className="font-medium text-[15px]">
                        {item.name}
                      </div>
                    </Link>
                  ))}

                  {/* Mobile Courses Dropdown */}
                  <div className="space-y-1">
                    <button
                      onClick={() => setShowMobileCoursesDropdown(!showMobileCoursesDropdown)}
                      className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-300 ${
                        activeLink === "courses" || showMobileCoursesDropdown
                          ? 'bg-[#F8F8F8] text-[#8B6B61] font-semibold'
                          : 'text-[#2C3E50] hover:bg-[#F8F8F8]'
                      }`}
                    >
                      <div className="font-medium text-[15px]">
                        Programs
                      </div>
                    </button>

                    {/* Mobile Courses Dropdown Content */}
                    <AnimatePresence>
                      {showMobileCoursesDropdown && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={mobileCoursesDropdownVariants}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 pl-4 mt-2 ml-2">
                            {coursesData.map((course, index) => (
                              <Link
                                key={index}
                                href="/components/templates/template5/courses"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setActiveLink("courses");
                                }}
                                className="block px-4 py-2.5 rounded-xl hover:bg-[#F8F8F8] transition-colors duration-300"
                              >
                                <div className="font-medium text-[14px] text-[#2C3E50]">
                                  {course.name}
                                </div>
                                <div className="text-[12px] text-[#7F8C8D] mt-1">
                                  {course.duration}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {[
                    { name: "Gallery", href: "/components/templates/template5/gallery", id: "gallery" },
                    { name: "Contact", href: "/components/templates/template5/contact", id: "contact" },
                  ].map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setActiveLink(item.id);
                      }}
                      className={`block w-full text-left px-4 py-3.5 rounded-xl transition-all duration-300 ${
                        activeLink === item.id
                          ? 'bg-[#F8F8F8] text-[#8B6B61] font-semibold'
                          : 'text-[#2C3E50] hover:bg-[#F8F8F8]'
                      }`}
                    >
                      <div className="font-medium text-[15px]">
                        {item.name}
                      </div>
                    </Link>
                  ))}
                </div>

                {/* View All Programs Button */}
                <Link
                  href="/components/templates/template5/courses"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setActiveLink("courses");
                  }}
                  className="block w-full px-4 py-3.5 bg-[#F8F8F8] text-[#2C3E50] border border-[#E0E0E0] rounded-xl font-medium text-[14px] text-center hover:border-[#8B6B61] hover:text-[#8B6B61] mb-4"
                >
                  View All Programs
                </Link>

                {/* College Info */}
                <div className="pt-4 border-t border-[#E0E0E0]">
                  <div className="text-[12px] text-[#7F8C8D]">
                    <p>Quality Education</p>
                    <p>Since 1995</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // ==================== MAIN RENDER ====================
  return (
    <>
      {/* Main Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 20,
          delay: 0.1
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-white/98 backdrop-blur-[4px] py-3.5 border-b border-[#E8E8E8]" 
            : "bg-white py-5"
        }`}
        style={{ 
          height: isScrolled ? '72px' : '76px'
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo - Properly Visible */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#8B6B61] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-[18px]">EC</span>
              </div>
              <div>
                <span className="font-bold text-[20px] text-[#2C3E50] block leading-tight">
                  Excellence College
                </span>
                <span className="text-[13px] text-[#7F8C8D] font-medium hidden md:block">
                  Quality Education Since 1995
                </span>
                <span className="text-[12px] text-[#7F8C8D] font-medium md:hidden">
                  Since 1995
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <DesktopNav />

            {/* Mobile Navigation */}
            <MobileNav />
          </div>
        </div>
      </motion.header>

      {/* Spacer */}
      <div style={{ height: isScrolled ? '72px' : '76px' }} />

      {/* Right Slider Menu */}
      <RightSliderMenu />
    </>
  );
};