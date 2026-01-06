"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { Menu, X, Home, User, Users, Search, ChevronUp } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  // Search data
  const searchData = [
    { title: "Home", url: "/", category: "Main" },
    { title: "About", url: "/components/templates/template5/about", category: "Information" },
    { title: "Faculty", url: "/components/templates/template5/faculty", category: "People" },
    { title: "Courses", url: "/components/templates/template5/courses", category: "Education" },
    { title: "Gallery", url: "/components/templates/template5/gallery", category: "Portfolio" },
    { title: "Contact", url: "/components/templates/template5/contact", category: "Contact" },
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
      y: "100%",
      opacity: 0
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        mass: 0.8
      }
    },
    exit: { 
      y: "100%",
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
      setIsScrolled(currentScrollY > 30);
      setLastScrollY(currentScrollY);
      setShowSearchResults(false);
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
            className="w-48 px-4 py-2 bg-white border border-[#D8D8D8] rounded-full focus:outline-none focus:border-[#2F5D62] focus:ring-0 text-[#121212] placeholder:text-[#888888] text-[14px] tracking-[0.1px] font-normal transition-colors duration-240"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setShowSearchResults(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#121212] transition-colors duration-200 text-[16px] leading-none"
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
              className="absolute top-full left-0 mt-1 w-64 bg-white border border-[#E8E8E8] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden z-40"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={searchResultsVariants}
            >
              <div className="py-2">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      window.location.href = result.url;
                      setSearchQuery("");
                      setShowSearchResults(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-[#FAFAFA] transition-colors duration-200 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-normal text-[14px] text-[#121212] tracking-[0.1px]">
                        {result.title}
                      </div>
                      <div className="text-[12px] text-[#666666] tracking-[0.05px] mt-0.5">
                        {result.category}
                      </div>
                    </div>
                    <div className="text-[#D8D8D8]">→</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-0">
        {[
          { name: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
          { name: "About", href: "/components/templates/template5/about", icon: <User className="h-4 w-4" /> },
          { name: "Faculty", href: "/components/templates/template5/faculty", icon: <Users className="h-4 w-4" /> },
        ].map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="px-4 py-2.5 font-normal text-[15px] tracking-[0.1px] text-[#121212] hover:text-[#2F5D62] transition-colors duration-240 relative group/navitem"
          >
            <span className="relative">
              {item.name}
              <span className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#2F5D62] opacity-0 group-hover/navitem:w-[55%] group-hover/navitem:opacity-60 transition-all duration-240"></span>
            </span>
          </Link>
        ))}
      </nav>

      {/* Contact Button */}
      <Link
        href="/components/templates/template5/contact"
        className="px-5 py-2.5 bg-[#121212] text-white font-normal text-[14px] rounded-full hover:bg-[#2F5D62] transition-colors duration-240 tracking-[0.1px]"
      >
        Contact
      </Link>
    </div>
  );

  // ==================== MOBILE NAVIGATION ====================
  const MobileNav = () => (
    <div className="flex items-center gap-3 lg:hidden">
      {/* Search Input (Mobile) */}
      <div className="relative">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => handleSearchInputChange(e.target.value)}
            onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
            className="w-32 px-3 py-2 bg-white border border-[#D8D8D8] rounded-full focus:outline-none focus:border-[#2F5D62] text-[#121212] placeholder:text-[#888888] text-[14px] tracking-[0.1px] font-normal transition-colors duration-240"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setShowSearchResults(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#121212] transition-colors duration-200 text-[16px] leading-none"
            >
              ×
            </button>
          )}
        </form>

        {/* Search Results Dropdown (Mobile) */}
        <AnimatePresence>
          {showSearchResults && searchResults.length > 0 && (
            <motion.div
              className="absolute top-full right-0 mt-1 w-56 bg-white border border-[#E8E8E8] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden z-40"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={searchResultsVariants}
            >
              <div className="py-2">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      window.location.href = result.url;
                      setSearchQuery("");
                      setShowSearchResults(false);
                    }}
                    className="w-full text-left px-3 py-2.5 hover:bg-[#FAFAFA] transition-colors duration-200"
                  >
                    <div className="font-normal text-[14px] text-[#121212] tracking-[0.1px]">
                      {result.title}
                    </div>
                    <div className="text-[11px] text-[#666666] tracking-[0.05px] mt-0.5">
                      {result.category}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Menu Button */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="p-2.5 text-[#666666] hover:text-[#121212] transition-colors duration-240 mobile-menu-button"
      >
        <Menu className="h-5 w-5" />
      </button>
    </div>
  );

  // ==================== BOTTOM SLIDER MENU ====================
  const BottomSliderMenu = () => (
    <AnimatePresence>
      {isMenuOpen && isMobile && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-[0.5px] z-40"
          />

          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileSliderVariants}
            className="mobile-menu-container fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-[0_-4px_30px_rgba(0,0,0,0.08)] border-t border-[#F0F0F0] z-40 max-h-[85vh] overflow-hidden"
          >
            {/* Drag Handle */}
            <div className="sticky top-0 bg-white z-10 pt-3 pb-2 flex justify-center">
              <div className="w-12 h-1.5 bg-[#E0E0E0] rounded-full"></div>
            </div>

            <div className="overflow-y-auto h-full">
              <div className="p-4">
                {/* Header with Close Button */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#121212] rounded-full flex items-center justify-center">
                      <span className="text-white font-normal text-[16px]">P</span>
                    </div>
                    <div>
                      <div className="font-normal text-[16px] text-[#121212] tracking-[0.1px]">Institution</div>
                      <div className="text-[13px] text-[#666666] tracking-[0.05px]">Template 5</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-[#FAFAFA] rounded-full transition-colors duration-240"
                  >
                    <X className="h-5 w-5 text-[#666666] hover:text-[#121212]" />
                  </button>
                </div>

                {/* Mobile Menu Search Input */}
                <form onSubmit={handleSearchSubmit} className="relative mb-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888888]" />
                    <input
                      type="text"
                      placeholder="Search courses, faculty..."
                      value={searchQuery}
                      onChange={(e) => handleSearchInputChange(e.target.value)}
                      className="w-full pl-11 pr-10 py-3.5 bg-[#FAFAFA] border border-[#E0E0E0] rounded-full focus:outline-none focus:border-[#2F5D62] text-[#121212] placeholder:text-[#888888] text-[14px] tracking-[0.1px] font-normal"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#121212] transition-colors duration-200"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </form>

                {/* Navigation Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { name: "Home", href: "/", icon: <Home className="h-5 w-5" />, color: "bg-blue-50" },
                    { name: "About", href: "/components/templates/template5/about", icon: <User className="h-5 w-5" />, color: "bg-green-50" },
                    { name: "Faculty", href: "/components/templates/template5/faculty", icon: <Users className="h-5 w-5" />, color: "bg-purple-50" },
                    { name: "Courses", href: "/components/templates/template5/courses", icon: <span className="text-[18px]">📘</span>, color: "bg-amber-50" },
                    { name: "Gallery", href: "/components/templates/template5/gallery", icon: <span className="text-[18px]">🖼️</span>, color: "bg-pink-50" },
                    { name: "Events", href: "/components/templates/template5/events", icon: <span className="text-[18px]">📅</span>, color: "bg-cyan-50" },
                  ].map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`${item.color} p-4 rounded-xl hover:opacity-90 transition-opacity duration-200 flex flex-col items-center justify-center group/menuitem`}
                    >
                      <div className="p-2.5 mb-2 rounded-lg bg-white/80">
                        {item.icon}
                      </div>
                      <div className="font-normal text-[14px] text-[#121212] tracking-[0.1px] text-center">
                        {item.name}
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Contact Section */}
                <div className="mb-6">
                  <div className="font-normal text-[15px] text-[#121212] mb-3 tracking-[0.1px]">Get in Touch</div>
                  <div className="space-y-3">
                    <Link
                      href="/components/templates/template5/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-[#121212] text-white rounded-xl font-normal text-[14px] text-center hover:bg-[#2F5D62] transition-colors duration-240 tracking-[0.1px]"
                    >
                      <span>Contact Us</span>
                    </Link>
                    
                    <Link
                      href="/components/templates/template5/courses"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-white text-[#121212] border border-[#E0E0E0] rounded-xl font-normal text-[14px] text-center hover:border-[#2F5D62] hover:text-[#2F5D62] transition-colors duration-240 tracking-[0.1px]"
                    >
                      <span>Browse All Courses</span>
                    </Link>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="pt-4 border-t border-[#E8E8E8]">
                  <div className="text-[12px] text-[#666666] tracking-[0.05px] text-center">
                    <p className="mb-1">Institution Template 5</p>
                    <p>Premium Education Experience Since 2024</p>
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-[0.5px] py-2.5 border-b border-[#E8E8E8]" 
            : "bg-white py-3.5 border-b border-[#F0F0F0]"
        }`}
        style={{ 
          height: isScrolled ? '64px' : '68px'
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-5 lg:px-6 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 bg-[#121212] rounded-full flex items-center justify-center transition-colors duration-240 hover:bg-[#2F5D62]">
                <span className="text-white font-normal text-[16px]">P</span>
              </div>
              <div>
                <span className="font-normal text-[16px] text-[#121212] tracking-[0.15px] block leading-tight">
                  Institution
                </span>
                <span className="text-[12.5px] text-[#666666] font-normal tracking-[0.1px]">
                  Template 5
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <DesktopNav />

            {/* Mobile Navigation */}
            <MobileNav />
          </div>
        </div>
      </motion.header>

      {/* Spacer */}
      <div style={{ height: isScrolled ? '64px' : '68px' }} />

      {/* Bottom Slider Menu */}
      <BottomSliderMenu />
    </>
  );
};