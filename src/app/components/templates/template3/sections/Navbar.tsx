"use client";

import React, { useState, useEffect, FormEvent, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
/* eslint-disable */

import Link from "next/link";
import { Search, Menu, X, ChevronRight, Mail, MapPin, Clock, Phone, User, Home, Images, Users, BookOpen, ExternalLink, Calendar, Globe } from "lucide-react";

interface NavSubItem {
  name: string;
  href: string;
  icon: string;
  tag?: string;
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showContactSlider, setShowContactSlider] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const contactSliderRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    { 
      name: "Home", 
      href: "/",
      icon: <Home className="h-4 w-4" />,
      description: "Welcome to our platform",
      showInMobilePrimary: true
    },
    { 
      name: "About Us", 
      href: "/components/templates/template3/about",
      icon: <User className="h-4 w-4" />,
      description: "Our story and mission",
      showInMobilePrimary: false
    },
    {
      name: "Services",
      icon: <BookOpen className="h-4 w-4" />,
      description: "Professional services",
      featured: true,
      showInMobilePrimary: false,
      subItems: [
        { 
          name: "Service One", 
          href: "/components/templates/template3/courses", 
          icon: "📘",
          tag: "Popular"
        },
        { 
          name: "Service Two", 
          href: "/services", 
          icon: "🎓",
          tag: "Certified"
        },
        { 
          name: "Service Three", 
          href: "/services", 
          icon: "🛡️",
          tag: "Premium"
        },
        { 
          name: "Service Four", 
          href: "/services", 
          icon: "📚",
          tag: "Advanced"
        },
      ],
    },
    { 
      name: "Gallery", 
      href: "/components/templates/template3/gallery",
      icon: <Images className="h-4 w-4" />,
      description: "Our work and projects",
      showInMobilePrimary: false
    },
    { 
      name: "Team", 
      href: "/components/templates/template3/faculty",
      icon: <Users className="h-4 w-4" />,
      description: "Expert team members",
      showInMobilePrimary: false
    },
    { 
      name: "Contact", 
      href: "/components/templates/template3/contact",
      icon: <Phone className="h-4 w-4" />,
      description: "Get in touch with us",
      cta: true,
      showInMobilePrimary: false
    },
  ];

  const searchData = [
    { title: "Home", url: "/", category: "Main", icon: "🏠" },
    { title: "About Us", url: "/components/templates/template3/about", category: "Main", icon: "👥" },
    { title: "Services", url: "/components/templates/template3/courses", category: "Services", icon: "🛠️" },
    { title: "Gallery", url: "/components/templates/template3/gallery", category: "Portfolio", icon: "🖼️" },
    { title: "Team", url: "/components/templates/template3/faculty", category: "People", icon: "👨‍💼" },
    { title: "Contact", url: "/components/templates/template3/contact", category: "Contact", icon: "📞" },
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
      const contactSlider = contactSliderRef.current;
      const locationButton = document.querySelector('.location-button');
      
      if (contactSlider && 
          !contactSlider.contains(event.target as Node) && 
          !locationButton?.contains(event.target as Node)) {
        setShowContactSlider(false);
      }
      
      const menu = document.querySelector('.menu-container');
      const menuButton = document.querySelector('.menu-button');
      const searchModal = document.querySelector('.search-modal-container');
      const searchButton = document.querySelector('.search-button');
      
      if (menu && !menu.contains(event.target as Node) && !menuButton?.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
      
      if (searchModal && !searchModal.contains(event.target as Node) && !searchButton?.contains(event.target as Node)) {
        setShowSearchModal(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when panels are open
  useEffect(() => {
    if (isMenuOpen || showSearchModal || showContactSlider) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen, showSearchModal, showContactSlider]);

  // Focus search input when modal opens
  useEffect(() => {
    if (showSearchModal && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [showSearchModal]);

  const handleSearch = (e: FormEvent) => {
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

  return (
    <>
      {/* Main Navbar - Clean Professional Design */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-sm shadow-sm py-3" 
            : "bg-white py-4"
        }`}
        style={{ 
          height: isScrolled ? '72px' : '80px',
          borderBottom: '1px solid #E5E7EB'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-[#064E3B] to-[#064E3B]/80 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
              </div>
              <div>
                <span className="font-bold text-lg text-[#0F172A] leading-tight block">
                  Professional Brand
                </span>
                <span className="text-sm text-gray-500 font-medium">
                  Premium Services
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item, idx) => (
                item.subItems ? (
                  <div key={idx} className="relative group">
                    <button className="flex items-center gap-2 px-4 py-3 text-[#0F172A] hover:text-[#064E3B] font-medium transition-colors">
                      <span>{item.name}</span>
                      <ChevronRight className="h-3 w-3 transform group-hover:rotate-90 transition-transform" />
                    </button>
                    
                    {/* Dropdown */}
                    <div className="absolute top-full left-0 w-64 bg-white shadow-lg border border-gray-100 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-2">
                      {item.subItems.map((sub, i) => (
                        <Link
                          key={i}
                          href={sub.href}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 group/subitem"
                        >
                          <span className="text-lg">{sub.icon}</span>
                          <div className="flex-1">
                            <div className="text-[#0F172A] font-medium group-hover/subitem:text-[#064E3B]">
                              {sub.name}
                            </div>
                            <div className="text-xs text-gray-500">{sub.tag}</div>
                          </div>
                          <ChevronRight className="h-3 w-3 text-gray-400 group-hover/subitem:text-[#064E3B]" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={idx}
                    href={item.href!}
                    className={`px-4 py-3 font-medium transition-colors ${
                      item.cta 
                        ? 'text-[#064E3B] hover:text-[#04332A] font-semibold' 
                        : 'text-[#0F172A] hover:text-[#064E3B]'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </nav>

            {/* Right Actions - Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Contact Button */}
              <button
                onClick={() => setShowContactSlider(!showContactSlider)}
                className="flex items-center gap-2 px-4 py-2 text-[#0F172A] hover:text-[#064E3B] font-medium transition-colors"
              >
                <MapPin className="h-4 w-4" />
                <span>Contact</span>
              </button>

              {/* CTA Button */}
              <Link
                href="/components/templates/template3/contact"
                className="px-6 py-2.5 bg-[#064E3B] text-white font-semibold rounded-md hover:bg-[#04332A] transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setShowSearchModal(true)}
                className="p-2 text-[#0F172A] hover:text-[#064E3B] transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 text-[#0F172A] hover:text-[#064E3B] transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Spacer */}
      <div style={{ height: isScrolled ? '72px' : '80px' }} />

      {/* Contact Information Slider - LIGHT THEME */}
      <AnimatePresence>
        {showContactSlider && (
          <motion.div
            ref={contactSliderRef}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
            className="fixed top-16 lg:top-14 left-0 right-0 z-40 bg-white shadow-lg border-b border-gray-200"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#064E3B]/10 rounded-full">
                    <MapPin className="h-5 w-5 text-[#064E3B]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-lg">
                      Contact Information
                    </h3>
                    <p className="text-sm text-gray-600">Reach out to us anytime</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowContactSlider(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500 hover:text-[#0F172A]" />
                </button>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Location */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#064E3B]/10 rounded-full flex-shrink-0">
                      <MapPin className="h-5 w-5 text-[#064E3B]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0F172A] mb-1">Our Location</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        123 Business Street<br />
                        Suite 101, City, State 12345
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[#064E3B] font-medium hover:text-[#04332A] transition-colors"
                  >
                    View on Map
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                {/* Contact Details */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#064E3B]/10 rounded-full flex-shrink-0">
                      <Mail className="h-5 w-5 text-[#064E3B]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0F172A] mb-1">Email Address</h4>
                      <a 
                        href="mailto:info@example.com"
                        className="text-[#064E3B] hover:text-[#04332A] text-sm transition-colors"
                      >
                        info@example.com
                      </a>
                      <p className="text-xs text-gray-500 mt-1">For general inquiries</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#064E3B]/10 rounded-full flex-shrink-0">
                      <Globe className="h-5 w-5 text-[#064E3B]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0F172A] mb-1">Website</h4>
                      <a 
                        href="https://example.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#064E3B] hover:text-[#04332A] text-sm transition-colors"
                      >
                        www.example.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours & Quick Action */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#064E3B]/10 rounded-full flex-shrink-0">
                      <Clock className="h-5 w-5 text-[#064E3B]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0F172A] mb-2">Working Hours</h4>
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Weekdays</span>
                          <span className="text-sm font-medium text-[#0F172A]">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Saturday</span>
                          <span className="text-sm font-medium text-[#0F172A]">9:00 AM - 2:00 PM</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Sunday</span>
                          <span className="text-sm font-medium text-gray-500">Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Numbers */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-[#0F172A] mb-4">Contact Numbers</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-[#064E3B]/10 rounded-full">
                      <Phone className="h-4 w-4 text-[#064E3B]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Phone</div>
                      <div className="text-[#0F172A] font-medium">+1 (555) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-[#064E3B]/10 rounded-full">
                      <Phone className="h-4 w-4 text-[#064E3B]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Support</div>
                      <div className="text-[#0F172A] font-medium">+1 (555) 987-6543</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-[#064E3B]/10 rounded-full">
                      <Phone className="h-4 w-4 text-[#064E3B]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Fax</div>
                      <div className="text-[#0F172A] font-medium">+1 (555) 456-7890</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal - LIGHT THEME */}
      <AnimatePresence>
        {showSearchModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowSearchModal(false);
                setSearchQuery("");
                setSearchResults([]);
              }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            />

            {/* Modal Content - LIGHT THEME */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 300
              }}
              className="search-modal-container fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50 px-4"
            >
              <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                {/* Search Input */}
                <div className="p-4 border-b border-gray-200">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <form onSubmit={handleSearch}>
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search pages and content..."
                        value={searchQuery}
                        onChange={(e) => handleSearchInputChange(e.target.value)}
                        className="w-full pl-12 pr-12 py-3 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064E3B]/30 focus:border-[#064E3B] text-[#0F172A] placeholder-gray-400 text-base"
                        autoFocus
                      />
                    </form>
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setSearchResults([]);
                        }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X className="h-4 w-4 text-gray-400 hover:text-[#0F172A]" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Results */}
                <div className="max-h-96 overflow-y-auto">
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
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => {
                              window.location.href = result.url;
                              setShowSearchModal(false);
                              setSearchQuery("");
                            }}
                            className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors group/result"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-gray-100 rounded-full group-hover/result:bg-[#064E3B]/10 transition-colors flex-shrink-0">
                                <span className="text-lg">{result.icon}</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-medium text-[#0F172A] group-hover/result:text-[#064E3B] text-base">
                                    {result.title}
                                  </h3>
                                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover/result:text-[#064E3B] transform group-hover/result:translate-x-1 transition-transform" />
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                  {result.category} Page
                                </p>
                              </div>
                            </div>
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
                        <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
                          <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="font-medium text-[#0F172A] mb-2 text-base">
                          No results found for {searchQuery}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Try searching with different keywords
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-6"
                      >
                        <h4 className="font-medium text-[#0F172A] mb-4 text-base">
                          Popular Searches
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {["Services", "About", "Contact", "Team", "Gallery", "Support"].map(
                            (term, index) => (
                              <motion.button
                                key={index}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                  setSearchQuery(term);
                                  handleSearchInputChange(term);
                                }}
                                className="p-3 bg-gray-50 hover:bg-[#064E3B]/5 rounded-lg border border-gray-200 hover:border-[#064E3B]/30 transition-all duration-200 text-left"
                              >
                                <div className="font-medium text-[#0F172A] text-base">
                                  {term}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  Navigation Page
                                </div>
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

      {/* Mobile Menu - LIGHT THEME */}
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
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            />

            {/* Menu Panel - LIGHT THEME */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="menu-container fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-40 overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 z-10 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#064E3B] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">P</span>
                    </div>
                    <div>
                      <div className="font-bold text-[#0F172A] text-base">Professional</div>
                      <div className="text-xs text-gray-500">Brand</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500 hover:text-[#0F172A]" />
                  </button>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-4">
                <nav className="space-y-1">
                  {navItems.map((item, idx) => (
                    <div key={idx} className="mb-2">
                      {item.subItems ? (
                        <>
                          <button
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === item.name ? null : item.name
                              )
                            }
                            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gray-100 rounded-full">
                                {item.icon}
                              </div>
                              <div className="text-left">
                                <div className="font-semibold text-[#0F172A]">{item.name}</div>
                                <div className="text-xs text-gray-500">{item.description}</div>
                              </div>
                            </div>
                            <ChevronRight
                              className={`h-4 w-4 text-gray-400 transform transition-transform ${
                                activeDropdown === item.name ? "rotate-90" : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {activeDropdown === item.name && (
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
                                      onClick={() => setIsMenuOpen(false)}
                                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                      <span className="text-lg">{sub.icon}</span>
                                      <div>
                                        <div className="text-[#0F172A] font-medium">{sub.name}</div>
                                        <div className="text-xs text-gray-400">{sub.tag}</div>
                                      </div>
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
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="p-2 bg-gray-100 rounded-full">
                            {item.icon}
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-[#0F172A]">{item.name}</div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Contact CTA */}
                <div className="mt-6 p-4 bg-[#064E3B]/5 rounded-lg border border-[#064E3B]/10">
                  <h4 className="font-bold text-[#0F172A] mb-3">Get Started Today</h4>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setShowContactSlider(true);
                      }}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 text-[#0F172A] rounded-md font-medium hover:border-[#064E3B] hover:text-[#064E3B] transition-all duration-200"
                    >
                      Contact Information
                    </button>
                    <Link
                      href="/components/templates/template3/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full px-4 py-2.5 bg-[#064E3B] text-white rounded-md font-semibold text-center hover:bg-[#04332A] transition-all duration-300"
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
    </>
  );
};