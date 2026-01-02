"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { Search, Menu, X, ChevronRight, Phone, User, Home, Images, Users, BookOpen, ExternalLink, Calendar, Globe, MoreVertical, ChevronDown } from "lucide-react";
/* eslint-disable */

interface NavSubItem {
  name: string;
  href: string;
  icon: string;
}

interface NavItem {
  name: string;
  href?: string;
  icon: React.ReactNode;
  description: string;
  featured?: boolean;
  showInMobilePrimary: boolean;
  cta?: boolean;
  subItems?: NavSubItem[];
}

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ==================== UPDATED FOR TEMPLATE 4 ====================
  const navItems: NavItem[] = [
    { 
      name: "Home", 
      href: "/",
      icon: <Home className="h-4 w-4" />,
      description: "Welcome page",
      showInMobilePrimary: false  // Changed from true to false
    },
    { 
      name: "About", 
      href: "/components/templates/template4/about",
      icon: <User className="h-4 w-4" />,
      description: "Our story and mission",
      showInMobilePrimary: false
    },
    {
      name: "Courses",
      icon: <BookOpen className="h-4 w-4" />,
      description: "Learning programs",
      featured: true,
      showInMobilePrimary: false,
      subItems: [
        { 
          name: "Course One", 
          href: "/components/templates/template4/courses", 
          icon: "📘"
        },
        { 
          name: "Course Two", 
          href: "/services", 
          icon: "🎓"
        },
        { 
          name: "Course Three", 
          href: "/services", 
          icon: "🛡️"
        },
        { 
          name: "Course Four", 
          href: "/services", 
          icon: "📚"
        },
      ],
    },
    { 
      name: "Gallery", 
      href: "/components/templates/template4/gallery",
      icon: <Images className="h-4 w-4" />,
      description: "Visual portfolio",
      showInMobilePrimary: false
    },
    { 
      name: "Faculty", 
      href: "/components/templates/template4/faculty",
      icon: <Users className="h-4 w-4" />,
      description: "Our educators",
      showInMobilePrimary: false
    },
    { 
      name: "Events", 
      href: "/components/templates/template4/events",
      icon: <Calendar className="h-4 w-4" />,
      description: "Upcoming activities",
      showInMobilePrimary: false
    },
    { 
      name: "Contact", 
      href: "/components/templates/template4/contact",
      icon: <Phone className="h-4 w-4" />,
      description: "Get in touch",
      cta: true,
      showInMobilePrimary: false
    },
  ];

  // Separate items for mobile primary (Home) and secondary (More)
  // Since Home is now in the slider menu, we don't need mobilePrimaryItems
  const mobileSecondaryItems = navItems.filter(item => !item.showInMobilePrimary);

  const searchData = [
    { title: "Home", url: "/", category: "Main", icon: "🏠" },
    { title: "About", url: "/components/templates/template4/about", category: "Information", icon: "👥" },
    { title: "Courses", url: "/components/templates/template4/courses", category: "Education", icon: "📚" },
    { title: "Gallery", url: "/components/templates/template4/gallery", category: "Portfolio", icon: "🖼️" },
    { title: "Faculty", url: "/components/templates/template4/faculty", category: "People", icon: "👨‍🏫" },
    { title: "Contact", url: "/components/templates/template4/contact", category: "Contact", icon: "📞" },
  ];

  // Animation variants for Courses sub-menu
  const coursesMenuVariants: Variants = {
    closed: {
      opacity: 0,
      height: "0px",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut",
        delayChildren: 0.1,
      }
    }
  };

  const subItemVariants:Variants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 }
  };

  // Mobile "More" menu variants
  const mobileMoreVariants:Variants = {
    closed: {
      opacity: 0,
      height: "0px",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Mobile slider menu variants
  const mobileSliderVariants: Variants = {
    hidden: { x: "100%" },
    visible: { 
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.25
      }
    }
  };

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Close desktop-specific states on mobile resize
      if (mobile) {
        setIsCoursesOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close panels when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.querySelector('.menu-container');
      const menuButton = document.querySelector('.menu-button');
      const searchModal = document.querySelector('.search-modal-container');
      const searchButton = document.querySelector('.search-button');
      const coursesButton = document.querySelector('.courses-menu-button');
      const coursesMenu = document.querySelector('.courses-submenu');
      const moreButton = document.querySelector('.mobile-more-button');
      const moreMenu = document.querySelector('.mobile-more-menu');
      
      if (menu && !menu.contains(event.target as Node) && !menuButton?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      
      if (searchModal && !searchModal.contains(event.target as Node) && !searchButton?.contains(event.target as Node)) {
        setShowSearchModal(false);
        setSearchQuery("");
        setSearchResults([]);
      }
      
      if (coursesMenu && coursesButton && 
          !coursesMenu.contains(event.target as Node) && 
          !coursesButton.contains(event.target as Node) &&
          !isMobile) {
        setIsCoursesOpen(false);
      }
      
      if (moreMenu && moreButton && 
          !moreMenu.contains(event.target as Node) && 
          !moreButton.contains(event.target as Node)) {
        setIsMobileMoreOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  // Prevent body scroll when panels are open
  useEffect(() => {
    if (isMenuOpen || showSearchModal || isMobileMoreOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen, showSearchModal, isMobileMoreOpen]);

  // Focus search input when modal opens
  useEffect(() => {
    if (showSearchModal && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [showSearchModal]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && searchResults.length > 0) {
      window.location.href = searchResults[0].url;
      setShowSearchModal(false);
      setSearchQuery("");
    }
  };

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      const results = searchData.filter(item =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results.slice(0, 8));
    } else {
      setSearchResults([]);
    }
  };

  // ==================== UPDATED DESKTOP NAVIGATION ====================
  const DesktopNav = () => (
    <nav className="hidden lg:flex items-center gap-0.5">
      {navItems.map((item, idx) => (
        item.name === "Courses" ? (
          <div key={idx} className="relative group">
            <button
              onClick={() => setIsCoursesOpen(!isCoursesOpen)}
              onMouseEnter={() => !isMobile && setIsCoursesOpen(true)}
              onMouseLeave={() => !isMobile && setTimeout(() => setIsCoursesOpen(false), 150)}
              className="courses-menu-button flex items-center gap-1.5 px-4 py-2.5 text-[#1E1E1E] hover:text-[#E86A58] font-normal text-[16px] tracking-wide transition-colors duration-200 relative group/navitem"
            >
              <span>{item.name}</span>
              <ChevronDown className={`h-3 w-3 text-[#5A5A5A] transform transition-transform duration-200 ${isCoursesOpen ? 'rotate-180' : ''}`} />
              <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#E86A58] -translate-x-1/2 group-hover/navitem:w-3/4 transition-all duration-200 ease-out"></span>
            </button>
            
            <AnimatePresence>
              {isCoursesOpen && (
                <motion.div
                  className="courses-submenu absolute top-full left-0 w-60 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-[#EDEDED] rounded-md overflow-hidden z-40"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={coursesMenuVariants}
                  onMouseEnter={() => setIsCoursesOpen(true)}
                  onMouseLeave={() => setIsCoursesOpen(false)}
                >
                  <div className="py-2">
                    {item.subItems?.map((sub, i) => (
                      <motion.div
                        key={i}
                        variants={subItemVariants}
                        className="relative group/subitem"
                      >
                        <Link
                          href={sub.href}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-[#FAFAFA] transition-colors duration-150"
                          onClick={() => setIsCoursesOpen(false)}
                        >
                          <span className="text-[17px]">{sub.icon}</span>
                          <div className="flex-1">
                            <div className="text-[15px] text-[#1E1E1E] font-normal group-hover/subitem:text-[#E86A58] transition-colors">
                              {sub.name}
                            </div>
                          </div>
                          <ChevronRight className="h-3 w-3 text-[#D0D0D0] group-hover/subitem:text-[#E86A58] transition-colors" />
                        </Link>
                        <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-[#F0F0F0] group-hover/subitem:bg-[#E86A58] transition-colors duration-200"></span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            key={idx}
            href={item.href!}
            className={`px-4 py-2.5 font-normal text-[16px] tracking-wide transition-colors duration-200 relative group/navitem ${
              item.name === "Contact" 
                ? 'text-[#1E1E1E] hover:text-[#E86A58] font-medium' 
                : 'text-[#1E1E1E] hover:text-[#E86A58]'
            }`}
          >
            {item.name}
            <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#E86A58] -translate-x-1/2 group-hover/navitem:w-3/4 transition-all duration-200 ease-out"></span>
          </Link>
        )
      ))}
    </nav>
  );

  // ==================== UPDATED MOBILE NAVIGATION ====================
  // Removed Home button from mobile navbar and kept it only in slider menu
  const MobileNav = () => (
    <div className="flex items-center gap-1 lg:hidden">
      {/* More Button - Now serves as the main navigation button */}
      <button
        onClick={() => setIsMobileMoreOpen(!isMobileMoreOpen)}
        className="mobile-more-button p-2.5 text-[#5A5A5A] hover:text-[#1E1E1E] transition-colors duration-200 flex items-center gap-1 relative group/morebutton"
      >
        <MoreVertical className="h-5 w-5" />
        <span className="text-sm font-medium">More</span>
        <ChevronDown className={`h-3 w-3 transform transition-transform duration-200 ${isMobileMoreOpen ? 'rotate-180' : ''}`} />
        <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-[#E86A58] -translate-x-1/2 group-hover/morebutton:w-4/5 transition-all duration-200"></span>
      </button>

      {/* Search Button */}
      <button
        onClick={() => setShowSearchModal(true)}
        className="p-2.5 text-[#5A5A5A] hover:text-[#1E1E1E] transition-colors duration-200"
      >
        <Search className="h-5 w-5" />
      </button>
      
      {/* Menu Button */}
      {/* <button
        onClick={() => setIsMenuOpen(true)}
        className="p-2.5 text-[#5A5A5A] hover:text-[#1E1E1E] transition-colors duration-200"
      >
        <Menu className="h-5 w-5" />
      </button> */}

      {/* Animated More Menu */}
      <AnimatePresence>
        {isMobileMoreOpen && (
          <motion.div
            className="mobile-more-menu absolute top-full right-2 mt-1 w-48 bg-white shadow-[0_8px_25px_rgba(0,0,0,0.12)] border border-[#EDEDED] rounded-md overflow-hidden z-40"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMoreVariants}
          >
            <div className="py-2">
              {mobileSecondaryItems.map((item, idx) => (
                <div key={idx} className="border-b border-[#F5F5F5] last:border-0">
                  {item.name === "Courses" ? (
                    <>
                      <button
                        onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                        className="w-full flex items-center justify-between p-3 hover:bg-[#FAFAFA] transition-colors duration-150 relative group/mobileitem"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-[#F5F5F5] rounded-sm">
                            {item.icon}
                          </div>
                          <span className="text-sm font-normal text-[#1E1E1E]">{item.name}</span>
                        </div>
                        <ChevronRight className={`h-3 w-3 text-[#8A8A8A] transform transition-transform ${isCoursesOpen ? 'rotate-90' : ''}`} />
                        <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-transparent group-hover/mobileitem:bg-[#E86A58] transition-colors duration-200"></span>
                      </button>
                      
                      <AnimatePresence>
                        {isCoursesOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 pl-4 border-l border-[#F0F0F0]">
                              {item.subItems?.map((sub, i) => (
                                <Link
                                  key={i}
                                  href={sub.href}
                                  className="flex items-center gap-3 p-2.5 hover:bg-[#FAFAFA] transition-colors duration-150 relative group/mobilesubitem"
                                  onClick={() => {
                                    setIsMobileMoreOpen(false);
                                    setIsCoursesOpen(false);
                                  }}
                                >
                                  <span className="text-[15px]">{sub.icon}</span>
                                  <span className="text-sm text-[#1E1E1E] font-normal group-hover/mobilesubitem:text-[#E86A58]">
                                    {sub.name}
                                  </span>
                                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-transparent group-hover/mobilesubitem:bg-[#E86A58] transition-colors duration-200"></span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href!}
                      className="flex items-center gap-3 p-3 hover:bg-[#FAFAFA] transition-colors duration-150 relative group/mobileitem"
                      onClick={() => setIsMobileMoreOpen(false)}
                    >
                      <div className="p-1.5 bg-[#F5F5F5] rounded-sm">
                        {item.icon}
                      </div>
                      <span className="text-sm font-normal text-[#1E1E1E]">{item.name}</span>
                      <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-transparent group-hover/mobileitem:bg-[#E86A58] transition-colors duration-200"></span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // ==================== MOBILE SLIDER MENU ====================
  // Home is now included in the slider menu
  const MobileSliderMenu = () => (
    <AnimatePresence>
      {isMenuOpen && isMobile && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsMenuOpen(false);
            }}
            className="fixed inset-0 bg-black/15 backdrop-blur-[1px] z-40"
          />

          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileSliderVariants}
            className="menu-container fixed top-0 right-0 h-full w-[300px] bg-white shadow-[0_0_30px_rgba(0,0,0,0.1)] z-40 overflow-y-auto border-l border-[#F0F0F0]"
          >
            <div className="sticky top-0 bg-white border-b border-[#EDEDED] z-10 p-5">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#1E1E1E] rounded-md flex items-center justify-center">
                    <span className="text-white font-medium">P</span>
                  </div>
                  <div>
                    <div className="font-medium text-[16px] text-[#1E1E1E]">Institution</div>
                    <div className="text-[13px] text-[#8A8A8A]">Template 4</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-[#FAFAFA] rounded-md transition-colors duration-200"
                >
                  <X className="h-5 w-5 text-[#5A5A5A] hover:text-[#1E1E1E]" />
                </button>
              </div>
            </div>

            <div className="p-5">
              <nav className="space-y-1">
                {navItems.map((item, idx) => (
                  <div key={idx} className="mb-2">
                    {item.subItems ? (
                      <>
                        <button
                          onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                          className="w-full flex items-center justify-between p-3 rounded-sm hover:bg-[#FAFAFA] transition-colors duration-200 relative group/menuitem"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#F5F5F5] rounded-sm">
                              {item.icon}
                            </div>
                            <div className="text-left">
                              <div className="font-normal text-[15px] text-[#1E1E1E]">{item.name}</div>
                              <div className="text-[13px] text-[#8A8A8A]">{item.description}</div>
                            </div>
                          </div>
                          <ChevronRight
                            className={`h-4 w-4 text-[#8A8A8A] transform transition-transform duration-200 ${
                              isCoursesOpen ? "rotate-90" : ""
                            }`}
                          />
                          <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-transparent group-hover/menuitem:bg-[#E86A58] transition-colors duration-200"></span>
                        </button>

                        <AnimatePresence>
                          {isCoursesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="ml-14 overflow-hidden"
                            >
                              <div className="py-2 space-y-1">
                                {item.subItems.map((sub, i) => (
                                  <Link
                                    key={i}
                                    href={sub.href}
                                    onClick={() => {
                                      setIsMenuOpen(false);
                                      setIsCoursesOpen(false);
                                    }}
                                    className="flex items-center gap-3 p-2.5 rounded-sm hover:bg-[#FAFAFA] transition-colors duration-200 relative group/submenuitem"
                                  >
                                    <span className="text-[17px]">{sub.icon}</span>
                                    <div>
                                      <div className="text-[15px] text-[#1E1E1E] font-normal">{sub.name}</div>
                                    </div>
                                    <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-transparent group-hover/submenuitem:bg-[#E86A58] transition-colors duration-200"></span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href!}
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full flex items-center gap-3 p-3 rounded-sm hover:bg-[#FAFAFA] transition-colors duration-200 relative group/menuitem"
                      >
                        <div className="p-2 bg-[#F5F5F5] rounded-sm">
                          {item.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-normal text-[15px] text-[#1E1E1E]">{item.name}</div>
                          <div className="text-[13px] text-[#8A8A8A]">{item.description}</div>
                        </div>
                        <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-transparent group-hover/menuitem:bg-[#E86A58] transition-colors duration-200"></span>
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-8 p-4 bg-[#FAFAFA] border border-[#EDEDED] rounded-sm">
                <h4 className="font-medium text-[15px] text-[#1E1E1E] mb-3">Get Started</h4>
                <div className="space-y-3">
                  <Link
                    href="/components/templates/template4/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full px-4 py-2.5 bg-[#1E1E1E] text-white rounded-sm font-medium text-[14px] text-center hover:bg-[#E86A58] transition-all duration-300"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // ==================== SEARCH MODAL ====================
  const SearchModal = () => (
    <AnimatePresence>
      {showSearchModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowSearchModal(false);
              setSearchQuery("");
              setSearchResults([]);
            }}
            className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
            className="search-modal-container fixed top-24 left-1/2 transform -translate-x-1/2 w-full max-w-xl z-50 px-5"
          >
            <div className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#EDEDED] rounded-md overflow-hidden">
              <div className="p-4 border-b border-[#F0F0F0]">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Search className="h-5 w-5 text-[#8A8A8A]" />
                  </div>
                  <form onSubmit={handleSearch}>
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search pages and content..."
                      value={searchQuery}
                      onChange={(e) => handleSearchInputChange(e.target.value)}
                      className="w-full pl-12 pr-12 py-3.5 bg-[#FAFAFA] border border-[#E0E0E0] rounded-sm focus:outline-none focus:border-[#1E1E1E] focus:bg-white text-[#1E1E1E] placeholder:text-[#8A8A8A] text-[16px] tracking-wide"
                      autoFocus
                    />
                  </form>
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-[#F5F5F5] rounded-sm transition-colors duration-200"
                    >
                      <X className="h-4 w-4 text-[#8A8A8A] hover:text-[#1E1E1E]" />
                    </button>
                  )}
                </div>
              </div>

              <div className="max-h-[70vh] overflow-y-auto">
                <AnimatePresence mode="wait">
                  {searchResults.length > 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-2"
                    >
                      {searchResults.map((result, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          onClick={() => {
                            window.location.href = result.url;
                            setShowSearchModal(false);
                            setSearchQuery("");
                          }}
                          className="w-full text-left p-3 hover:bg-[#FAFAFA] rounded-sm transition-colors duration-150 group/result relative"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2.5 bg-[#F5F5F5] rounded-sm group-hover/result:bg-[#1E1E1E] transition-colors duration-200 flex-shrink-0">
                              <span className="text-[17px] group-hover/result:text-white">{result.icon}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-normal text-[16px] text-[#1E1E1E] group-hover/result:text-[#E86A58] transition-colors">
                                  {result.title}
                                </h3>
                                <ChevronRight className="h-4 w-4 text-[#D0D0D0] group-hover/result:text-[#E86A58] transform group-hover/result:translate-x-0.5 transition-all" />
                              </div>
                              <p className="text-[14px] text-[#8A8A8A] mt-1">
                                {result.category}
                              </p>
                            </div>
                          </div>
                          <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-[#F0F0F0] group-hover/result:bg-[#E86A58] transition-colors duration-200"></span>
                        </motion.button>
                      ))}
                    </motion.div>
                  ) : searchQuery ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-8 text-center"
                    >
                      <div className="inline-flex p-4 bg-[#FAFAFA] border border-[#EDEDED] rounded-sm mb-4">
                        <Search className="h-7 w-7 text-[#8A8A8A]" />
                      </div>
                      <h3 className="font-normal text-[16px] text-[#1E1E1E] mb-2">
                        No results found
                      </h3>
                      <p className="text-[14px] text-[#8A8A8A]">
                        Try different keywords
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-6"
                    >
                      <h4 className="font-medium text-[15px] text-[#1E1E1E] mb-4 tracking-wide">
                        Quick Navigation
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {["Courses", "Faculty", "Events", "About", "Contact", "Home"].map(
                          (term, index) => (
                            <motion.button
                              key={index}
                              whileHover={{ y: -1 }}
                              onClick={() => {
                                setSearchQuery(term);
                                handleSearchInputChange(term);
                              }}
                              className="p-3.5 bg-[#FAFAFA] hover:bg-white border border-[#EDEDED] hover:border-[#1E1E1E] rounded-sm transition-all duration-200 text-left relative group/searchitem"
                            >
                              <div className="font-normal text-[15px] text-[#1E1E1E]">
                                {term}
                              </div>
                              <div className="text-[13px] text-[#8A8A8A] mt-1">
                                Page navigation
                              </div>
                              <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-transparent group-hover/searchitem:bg-[#E86A58] transition-colors duration-200"></span>
                            </motion.button>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
          isScrolled 
            ? "bg-[#FAFAFA]/95 backdrop-blur-[2px] py-3 border-b border-[#EDEDED]" 
            : "bg-[#FAFAFA] py-4 border-b border-[#F0F0F0]"
        }`}
        style={{ 
          height: isScrolled ? '70px' : '78px'
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group pl-1"
            >
              <div className="relative">
                <div className="w-9 h-9 bg-[#1E1E1E] rounded-md flex items-center justify-center transition-all duration-300 group-hover:bg-[#E86A58]/10 group-hover:border group-hover:border-[#E86A58]/20">
                  <span className="text-white font-medium text-lg group-hover:text-[#1E1E1E] transition-colors">P</span>
                </div>
              </div>
              <div className="ml-1">
                <span className="font-medium text-[17px] text-[#1E1E1E] tracking-tight block leading-tight">
                  Institution
                </span>
                <span className="text-[13px] text-[#5A5A5A] font-normal tracking-wide">
                  Template 4
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <DesktopNav />

            {/* Right Actions - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setShowSearchModal(true)}
                className="p-2 text-[#5A5A5A] hover:text-[#1E1E1E] transition-colors duration-200 relative group/searchbtn"
              >
                <Search className="h-[18px] w-[18px]" />
                <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-[#E86A58] -translate-x-1/2 group-hover/searchbtn:w-3/4 transition-all duration-200"></span>
              </button>

              <Link
                href="/components/templates/template4/contact"
                className="px-5 py-2.5 bg-[#1E1E1E] text-white font-medium text-[15px] rounded-sm hover:bg-[#E86A58] transition-all duration-300 tracking-wide relative group/ctabtn"
              >
                Get Started
                <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-transparent group-hover/ctabtn:bg-[#E86A58] transition-colors duration-200"></span>
              </Link>
            </div>

            {/* Mobile Navigation */}
            <MobileNav />
          </div>
        </div>
      </motion.header>

      {/* Spacer */}
      <div style={{ height: isScrolled ? '70px' : '78px' }} />

      {/* Search Modal */}
      <SearchModal />

      {/* Mobile Slider Menu */}
      <MobileSliderMenu />
    </>
  );
};