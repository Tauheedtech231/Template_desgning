"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

interface NavSubItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href: string; // Changed from optional to required
  showInMobilePrimary: boolean;
  subItems?: NavSubItem[];
}

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activePage, setActivePage] = useState("/");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showCoursesSidebar, setShowCoursesSidebar] = useState(false);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const navItemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const coursesSidebarRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    { 
      name: "Home", 
      href: "/",
      showInMobilePrimary: true
    },
    { 
      name: "About College", 
      href: "/components/templates/template3/about",
      showInMobilePrimary: false
    },
    { 
      name: "Gallery", 
      href: "/components/templates/template3/gallery",
      showInMobilePrimary: false
    },
    { 
      name: "Team", 
      href: "/components/templates/template3/faculty",
      showInMobilePrimary: false
    },
    {
      name: "Courses",
      href: "#", // Added a placeholder href
      showInMobilePrimary: false,
      subItems: [
        { name: "Commerce (Class 12)", href: "/components/templates/template3/courses" },
        { name: "Science (Class 12)", href: "/components/templates/template3/courses" },
        { name: "Arts (Class 12)", href: "/components/templates/template3/courses" },
        { name: "Information Technology", href: "/components/templates/template3/courses" },
        { name: "Professional Courses", href: "/components/templates/template3/courses" }
      ]
    },
    { 
      name: "Get Started", 
      href: "/components/templates/template3/contact",
      showInMobilePrimary: false
    },
  ];

  const allCourses = [
    { 
      name: "FSc Pre-Engineering", 
      href: "/components/templates/template3/courses"
    },
    { 
      name: "FSc Pre-Medical", 
      href: "/components/templates/template3/courses"
    },
    { 
      name: "ICS (Computer Science)", 
      href: "/components/templates/template3/courses"
    },
    { 
      name: "ICS (Statistics)", 
      href: "/components/templates/template3/courses"
    },
    { 
      name: "I.Com (Commerce)", 
      href: "/components/templates/template3/courses"
    }
  ];

  const admissionProcessSteps = [
    "Online Application Form",
    "Document Verification",
    "Entrance Test (if applicable)",
    "Personal Interview",
    "Fee Payment",
    "Registration Confirmation"
  ];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Set active page based on URL
  useEffect(() => {
    setActivePage(window.location.pathname);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
      
      // Close sidebar on scroll
      if (showCoursesSidebar) {
        setShowCoursesSidebar(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, showCoursesSidebar]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.querySelector('.menu-container');
      const menuButton = document.querySelector('.menu-button');
      const coursesSidebar = coursesSidebarRef.current;
      
      if (menu && !menu.contains(event.target as Node) && !menuButton?.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }

      // Close courses sidebar when clicking outside
      if (coursesSidebar && !coursesSidebar.contains(event.target as Node)) {
        const coursesButton = document.querySelector('.courses-button');
        if (!coursesButton?.contains(event.target as Node)) {
          setShowCoursesSidebar(false);
        }
      }

      // Close dropdowns when clicking outside on desktop
      if (!isMobile) {
        let clickedInsideDropdown = false;
        
        // Check if clicked inside any dropdown
        Object.values(dropdownRefs.current).forEach(ref => {
          if (ref && ref.contains(event.target as Node)) {
            clickedInsideDropdown = true;
          }
        });

        // Check if clicked inside any nav item with dropdown
        Object.values(navItemRefs.current).forEach(ref => {
          if (ref && ref.contains(event.target as Node)) {
            clickedInsideDropdown = true;
          }
        });

        if (!clickedInsideDropdown) {
          setActiveDropdown(null);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, showCoursesSidebar]);

  // Prevent body scroll when menu or sidebar is open
  useEffect(() => {
    if (isMenuOpen || showCoursesSidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen, showCoursesSidebar]);

  const handleNavItemMouseEnter = (itemName: string) => {
    if (!isMobile) {
      setHoveredItem(itemName);
    }
  };

  const handleNavItemMouseLeave = () => {
    if (!isMobile) {
      setHoveredItem(null);
    }
  };

  const toggleMobileDropdown = (itemName: string) => {
    if (isMobile) {
      setActiveDropdown(activeDropdown === itemName ? null : itemName);
    }
  };

  const handleCoursesClick = (e: React.MouseEvent) => {
    if (!isMobile) {
      e.preventDefault();
      setShowCoursesSidebar(!showCoursesSidebar);
      setActiveDropdown(null);
    }
  };

  return (
    <>
      {/* Main Navbar - Trust & Authority Theme */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 120, 
          damping: 25,
          mass: 1
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 mt-4 mx-8 rounded-3xl overflow-hidden ${
          isScrolled 
            ? "bg-[#0B0F0E]/95 backdrop-blur-md shadow-2xl py-3" 
            : "bg-[#0B0F0E] py-4"
        }`}
        style={{ 
          height: isScrolled ? '70px' : '80px',
          border: '1px solid rgba(16, 185, 129, 0.15)',
          backgroundImage: 'linear-gradient(to bottom, #0B0F0E 0%, #0B0F0E 90%, rgba(6, 78, 59, 0.07) 100%)',
          boxShadow: '0 0 40px rgba(16, 185, 129, 0.1), inset 0 1px 0 rgba(16, 185, 129, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo - Mobile पर सिर्फ Logo, Desktop पर Logo + Text */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0"
            >
              <Link 
                href="/" 
                className="flex items-center gap-3 group"
                onMouseEnter={() => setHoveredItem("logo")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative">
                  <motion.div 
                    whileHover={{ rotate: 5 }}
                    className="w-12 h-12 bg-gradient-to-br from-[#064E3B] to-[#065A46] rounded-full flex items-center justify-center shadow-lg shadow-[#064E3B]/20"
                  >
                    <span className="text-white font-bold text-xl">P</span>
                  </motion.div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#064E3B] to-[#065A46] rounded-full blur-sm opacity-20 group-hover:opacity-30 transition-opacity"></div>
                </div>
                
                {/* Desktop Text Only */}
                <div className="relative hidden lg:block">
                  <span className="font-bold text-lg text-white/90 leading-tight block tracking-tight">
                    PROFESSIONAL
                  </span>
                  <span className="text-xs text-white/60 font-medium tracking-wider">
                    EXCELLENCE & TRUST
                  </span>
                  
                  {/* Logo Bottom Border Animation */}
                  <AnimatePresence>
                    {hoveredItem === "logo" && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "100%", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation - Centered with proper width */}
            <nav className="hidden lg:flex items-center justify-center gap-6">
              {navItems.map((item, idx) => (
                item.name === "Courses" ? (
                  <div 
                    key={idx}
                    className="relative"
                  >
                    <motion.div
                      className="relative"
                      onMouseEnter={() => handleNavItemMouseEnter(item.name)}
                      onMouseLeave={handleNavItemMouseLeave}
                    >
                      <button 
                        onClick={handleCoursesClick}
                        className="courses-button flex items-center gap-1 px-6 py-3 text-white/90 hover:text-[#10B981] font-medium transition-all duration-300 rounded-full hover:bg-white/5"
                      >
                        <span>{item.name}</span>
                        <motion.div
                          animate={{ rotate: showCoursesSidebar ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.div>
                      </button>

                      {/* Bottom Border Animation */}
                      <AnimatePresence>
                        {(hoveredItem === item.name || showCoursesSidebar) && (
                          <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "70%", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full"
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                ) : (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className={`px-6 py-3 font-medium transition-all duration-300 rounded-full ${
                        item.name === "Get Started"
                          ? 'bg-gradient-to-r from-[#064E3B] to-[#065A46] text-white hover:from-[#10B981] hover:to-[#064E3B] shadow-lg hover:shadow-[#10B981]/20'
                          : 'text-white/90 hover:text-[#10B981] hover:bg-white/5'
                      }`}
                      onClick={() => {
                        setActivePage(item.href);
                        if (isMobile) setIsMenuOpen(false);
                      }}
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {item.name}
                      {activePage === item.href && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-[#10B981] rounded-full"
                        />
                      )}
                    </Link>

                    {/* Bottom Border Animation for Non-Dropdown Items */}
                    <AnimatePresence>
                      {hoveredItem === item.name && item.name !== "Get Started" && (
                        <motion.div
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: "70%", opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full"
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              ))}
            </nav>

            {/* Mobile Menu Button - Just Menu Button */}
            <div className="flex items-center lg:hidden">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
                onMouseEnter={() => setHoveredItem("menu")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="p-3 text-white/90 hover:text-[#10B981] transition-colors rounded-full hover:bg-white/5"
                >
                  <Menu className="h-6 w-6" />
                </button>

                {/* Menu Button Bottom Border Animation */}
                <AnimatePresence>
                  {hoveredItem === "menu" && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "70%", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Spacer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ 
          height: isScrolled ? '70px' : '80px',
          position: 'relative',
          zIndex: 40 
        }} 
      />

      {/* Courses Sidebar from Left - Desktop Only */}
      <AnimatePresence>
        {showCoursesSidebar && !isMobile && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCoursesSidebar(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />

            {/* Sidebar */}
            <motion.div
              ref={coursesSidebarRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "tween",
                duration: 0.35,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="fixed top-0 left-0 h-full w-[340px] bg-[#0B0F0E] z-[100] overflow-y-auto border-r border-white/10"
              style={{
                borderTopRightRadius: "1.25rem",
                borderBottomRightRadius: "1.25rem",
              }}
            >
              {/* Header */}
              <div className="px-8 py-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white text-xl font-semibold">
                      All Courses
                    </h3>
                    <p className="text-white/60 text-sm mt-1">
                      Academic Programs
                    </p>
                  </div>

                  <button
                    onClick={() => setShowCoursesSidebar(false)}
                    className="p-2 rounded-full hover:bg-white/5 transition"
                  >
                    <X className="h-5 w-5 text-white/70" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 py-6 space-y-10">
                {/* Programs */}
                <div>
                  <h4 className="text-white/70 text-sm font-semibold mb-4 uppercase tracking-wide">
                    Programs
                  </h4>

                  <ul className="space-y-2">
                    {allCourses.map((course, index) => (
                      <li key={index}>
                        <Link
                          href={course.href}
                          onClick={() => setShowCoursesSidebar(false)}
                          className="group flex items-center justify-between w-full py-2 text-white/65 hover:text-white transition-colors"
                        >
                          <span className="font-medium">{course.name}</span>

                          {/* Arrow animation */}
                          <motion.span
                            className="flex-shrink-0"
                            initial={{ x: 0 }}
                            whileHover={{ x: 4 }}
                            transition={{ type: "tween", duration: 0.2 }}
                          >
                            <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-[#1FA36D] transition-colors" />
                          </motion.span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Admission Process */}
                <div>
                  <h4 className="text-white/70 text-sm font-semibold mb-4 uppercase tracking-wide">
                    Admission Process
                  </h4>

                  <ul className="space-y-3">
                    {admissionProcessSteps.map((step, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-white/60 text-sm"
                      >
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#1FA36D]" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="pt-6 border-t border-white/10">
                  <p className="text-white/60 text-sm mb-4">
                    Need help choosing the right program?
                  </p>

                  <Link
                    href="/components/templates/template3/contact"
                    onClick={() => setShowCoursesSidebar(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition"
                  >
                    Book Consultation
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu - Clean Minimal Design */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsMenuOpen(false);
                setActiveDropdown(null);
              }}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Sidebar - Clean Minimal */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ 
                type: "tween",
                duration: 0.3,
                ease: "easeOut"
              }}
              className="menu-container fixed top-0 left-0 h-full w-full max-w-sm bg-[#0B0F0E] z-[100] overflow-y-auto"
              style={{
                // No box shadow for clean look
                boxShadow: "none"
              }}
            >
              {/* Header with Simple Close Button */}
              <div className="sticky top-0 bg-[#0B0F0E] z-10 p-6 border-b border-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#064E3B] to-[#065A46] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">P</span>
                    </div>
                    <div>
                      <div className="font-bold text-white text-xl">Professional</div>
                      <div className="text-sm text-white/60 mt-0.5">Excellence College</div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-white/70 hover:text-white transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Clean Menu Items - No Shadows, Only Bottom Borders on Hover */}
              <div className="p-6 pb-32">
                <nav className="space-y-1">
                  {navItems.map((item, idx) => (
                    item.name === "Courses" ? (
                      <div key={item.name} className="border-b border-white/5 last:border-b-0">
                        <button
                          onClick={() => toggleMobileDropdown(item.name)}
                          className="
                            w-full text-left
                            px-4 py-4
                            font-medium text-white
                            transition-colors duration-200
                            relative
                            group
                          "
                        >
                          <div className="flex items-center justify-between">
                            <span>{item.name}</span>
                            <motion.div
                              animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="h-4 w-4 text-white/50" />
                            </motion.div>
                          </div>
                          
                          {/* Hover Bottom Border */}
                          <div className="
                            absolute bottom-0 left-0 w-0 h-0.5 
                            bg-gradient-to-r from-[#10B981] to-[#34D399]
                            transition-all duration-200
                            group-hover:w-full
                          " />
                        </button>

                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="pb-2 pl-4">
                                {item.subItems?.map(sub => (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    onClick={() => {
                                      setIsMenuOpen(false);
                                      setActivePage(sub.href);
                                      setActiveDropdown(null);
                                    }}
                                    className="
                                      block
                                      px-4 py-3
                                      text-sm text-white/70
                                      hover:text-white
                                      transition-colors duration-200
                                      relative
                                      group
                                    "
                                  >
                                    {sub.name}
                                    {/* Hover Bottom Border for Sub Items */}
                                    <div className="
                                      absolute bottom-0 left-0 w-0 h-0.5 
                                      bg-gradient-to-r from-[#10B981] to-[#34D399]
                                      transition-all duration-200
                                      group-hover:w-full
                                    " />
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <div key={item.name} className="border-b border-white/5 last:border-b-0">
                        {item.name === "Get Started" ? (
                          <Link
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="
                              block mx-4 my-3
                              px-6 py-3
                              rounded-full
                              font-medium text-white
                              bg-gradient-to-r from-[#064E3B] to-[#065A46]
                              hover:from-[#0F766E] hover:to-[#064E3B]
                              transition-all duration-200
                              text-center
                            "
                          >
                            {item.name}
                          </Link>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="
                              block
                              px-4 py-4
                              font-medium text-white
                              transition-colors duration-200
                              relative
                              group
                            "
                          >
                            {item.name}
                            
                            {/* Hover Bottom Border */}
                            <div className="
                              absolute bottom-0 left-0 w-0 h-0.5 
                              bg-gradient-to-r from-[#10B981] to-[#34D399]
                              transition-all duration-200
                              group-hover:w-full
                            " />
                          </Link>
                        )}
                      </div>
                    )
                  ))}
                </nav>

                {/* Simple Contact Info */}
                <div className="mt-12">
                  <h4 className="font-medium text-white mb-4 text-lg pl-4">
                    Contact Information
                  </h4>

                  <ul className="space-y-4">
                    <li className="flex items-start pl-4 group cursor-pointer">
                      <div className="flex-shrink-0 w-2 h-2 mt-2 bg-[#10B981] rounded-full mr-3"></div>
                      <div className="relative">
                        <p className="text-white font-medium">Email Address</p>
                        <p className="text-white/60 text-sm">info@professional.com</p>
                        {/* Hover Bottom Border */}
                        <div className="
                          absolute bottom-0 left-0 w-0 h-0.5 
                          bg-gradient-to-r from-[#10B981] to-[#34D399]
                          transition-all duration-200
                          group-hover:w-full
                        " />
                      </div>
                    </li>
                    
                    <li className="flex items-start pl-4 group cursor-pointer">
                      <div className="flex-shrink-0 w-2 h-2 mt-2 bg-[#10B981] rounded-full mr-3"></div>
                      <div className="relative">
                        <p className="text-white font-medium">Phone Number</p>
                        <p className="text-white/60 text-sm">+1 (555) 123-4567</p>
                        {/* Hover Bottom Border */}
                        <div className="
                          absolute bottom-0 left-0 w-0 h-0.5 
                          bg-gradient-to-r from-[#10B981] to-[#34D399]
                          transition-all duration-200
                          group-hover:w-full
                        " />
                      </div>
                    </li>
                    
                    <li className="flex items-start pl-4 group cursor-pointer">
                      <div className="flex-shrink-0 w-2 h-2 mt-2 bg-[#10B981] rounded-full mr-3"></div>
                      <div className="relative">
                        <p className="text-white font-medium">Working Hours</p>
                        <p className="text-white/60 text-sm">9:00 AM - 6:00 PM (Mon-Fri)</p>
                        {/* Hover Bottom Border */}
                        <div className="
                          absolute bottom-0 left-0 w-0 h-0.5 
                          bg-gradient-to-r from-[#10B981] to-[#34D399]
                          transition-all duration-200
                          group-hover:w-full
                        " />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};