"use client";

import React, { useState, useEffect, FormEvent, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, Menu, X, ChevronRight, Mail, MapPin, Clock, Phone, User, Home, Images, Users, BookOpen, ExternalLink, Calendar, Globe } from "lucide-react";
/* eslint-disable */

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
      icon: <Home className="h-5 w-5" />,
      description: "Welcome to Mansol Institute",
      showInMobilePrimary: true
    },
    { 
      name: "About Us", 
      href: "/components/templates/template2/about",
      icon: <User className="h-5 w-5" />,
      description: "Our story and mission",
      showInMobilePrimary: false
    },
    {
      name: "Courses",
      icon: <BookOpen className="h-5 w-5" />,
      description: "Professional safety training",
      featured: true,
      showInMobilePrimary: false,
      subItems: [
        { 
          name: "NEBOSH", 
          href: "/components/templates/template2/courses", 
          icon: "📘",
          tag: "Popular"
        },
        { 
          name: "IOSH", 
          href: "/courses/iosh", 
          icon: "🎓",
          tag: "Certified"
        },
        { 
          name: "OSHA", 
          href: "/courses/osha", 
          icon: "🛡️",
          tag: "International"
        },
        { 
          name: "BOSH", 
          href: "/courses/bosh", 
          icon: "📚",
          tag: "Advanced"
        },
        { 
          name: "Hole Watcher", 
          href: "/courses/hole-watcher", 
          icon: "👁️",
          tag: "Specialized"
        },
        { 
          name: "PTW", 
          href: "/courses/ptw", 
          icon: "📝",
          tag: "Essential"
        },
        { 
          name: "Fire Safety", 
          href: "/courses/fire-safety", 
          icon: "🔥",
          tag: "Mandatory"
        },
        { 
          name: "First Aid", 
          href: "/courses/first-aid", 
          icon: "🩹",
          tag: "Life Saving"
        },
      ],
    },
    { 
      name: "Gallery", 
      href: "/components/templates/template2/gallery",
      icon: <Images className="h-5 w-5" />,
      description: "Our campus and events",
      showInMobilePrimary: false
    },
    { 
      name: "Team", 
      href: "/components/templates/template2/faculty",
      icon: <Users className="h-5 w-5" />,
      description: "Expert faculty members",
      showInMobilePrimary: false
    },
    { 
      name: "Contact", 
      href: "/components/templates/template2/contact",
      icon: <Phone className="h-5 w-5" />,
      description: "Get in touch with us",
      cta: true,
      showInMobilePrimary: false
    },
  ];

  const searchData = [
    { title: "Home", url: "/", category: "Main", icon: "🏠" },
    { title: "About Us", url: "/components/templates/template2/about", category: "Main", icon: "👥" },
    { title: "Gallery", url: "/components/templates/template2/gallery", category: "Main", icon: "🖼️" },
    { title: "Team", url: "/components/templates/template2/faculty", category: "Main", icon: "👨‍🏫" },
    { title: "Contact", url: "/components/templates/template2/contact", category: "Main", icon: "📞" },
    { title: "NEBOSH Course", url: "/components/templates/template2/courses", category: "Courses", icon: "📘" },
    { title: "IOSH Certification", url: "/courses/iosh", category: "Courses", icon: "🎓" },
    { title: "OSHA Training", url: "/courses/osha", category: "Courses", icon: "🛡️" },
    { title: "BOSH Course", url: "/courses/bosh", category: "Courses", icon: "📚" },
    { title: "Hole Watcher Training", url: "/courses/hole-watcher", category: "Courses", icon: "👁️" },
    { title: "PTW Course", url: "/courses/ptw", category: "Courses", icon: "📝" },
    { title: "Fire Safety Training", url: "/courses/fire-safety", category: "Courses", icon: "🔥" },
    { title: "First Aid Course", url: "/courses/first-aid", category: "Courses", icon: "🩹" },
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
      
      if (currentScrollY < 100) {
        setIsScrolled(false);
      } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsScrolled(true);
      } else if (currentScrollY < lastScrollY) {
        setIsScrolled(false);
      }
      
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

  const handleSearchClick = (url: string) => {
    window.location.href = url;
    setShowSearchModal(false);
    setSearchQuery("");
    setSearchResults([]);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-xl shadow-2xl py-3 border-b border-gray-100" 
            : "bg-white py-4 border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-2 group"
            >
              <div className="relative">
                <Image
                  src="/mansol_logo.jpg"
                  alt="Mansol Logo"
                  width={isScrolled ? 110 : 130}
                  height={isScrolled ? 44 : 52}
                  className="object-contain transition-all duration-300 rounded-xl"
                />
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#06B6D4] to-[#F97316] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
              </div>
              <div className="hidden lg:block">
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-gray-900 leading-tight">
                    Mansol Institute
                  </span>
                  <span className="text-sm text-gray-500 font-medium">
                    Professional Safety Training
                  </span>
                </div>
              </div>
            </Link>

            {/* Right Actions - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Quick Contact */}
              <button
                onClick={() => setShowContactSlider(!showContactSlider)}
                className="location-button flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-full hover:shadow-md transition-all duration-300 group"
              >
                <div className="p-1.5 bg-gradient-to-br from-[#06B6D4]/10 to-[#F97316]/10 rounded-full group-hover:from-[#06B6D4]/20 group-hover:to-[#F97316]/20">
                  <MapPin className="h-4 w-4 text-gray-600 group-hover:text-[#06B6D4]" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Lahore
                </span>
              </button>

              {/* Search Button */}
              <button
                onClick={() => setShowSearchModal(true)}
                className="search-button flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-full hover:shadow-md transition-all duration-300 group"
              >
                <Search className="h-4 w-4 text-gray-600 group-hover:text-[#06B6D4]" />
                <span className="text-sm font-medium text-gray-700">
                  Search
                </span>
              </button>

              {/* Desktop Menu Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsMenuOpen(true)}
                className="menu-button flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#06B6D4] to-[#0599B0] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Menu className="h-4.5 w-4.5" />
                <span>Menu</span>
              </motion.button>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setShowContactSlider(!showContactSlider)}
                className="location-button p-3 bg-gray-50 border border-gray-200 rounded-full hover:shadow-sm transition-all duration-300"
              >
                <MapPin className="h-5 w-5 text-gray-600" />
              </button>
              
              <button
                onClick={() => setShowSearchModal(true)}
                className="search-button p-3 bg-gray-50 border border-gray-200 rounded-full hover:shadow-sm transition-all duration-300"
              >
                <Search className="h-5 w-5 text-gray-600" />
              </button>
              
              <button
                onClick={() => setIsMenuOpen(true)}
                className="menu-button p-3 bg-gradient-to-r from-[#06B6D4] to-[#0599B0] text-white rounded-full hover:shadow-lg transition-all duration-300"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent opacity-20 rounded-full">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#06B6D4] to-[#F97316] rounded-full"
            animate={{ 
              scaleX: [0, 1, 0],
              translateX: ["-100%", "100%", "-100%"]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </motion.header>

      {/* Spacer */}
      <div className={`h-16 lg:h-20 transition-all duration-300 ${isScrolled ? 'lg:h-16' : ''}`} />

      {/* Contact Information Slider - BLACK BACKGROUND */}
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
            className="fixed top-16 lg:top-14 left-0 right-0 z-40 bg-gray-900 shadow-2xl border-b border-gray-800"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-[#06B6D4]/20 to-[#F97316]/20 rounded-full">
                    <MapPin className="h-6 w-6 text-[#06B6D4]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">
                      Contact Information
                    </h3>
                    <p className="text-sm text-gray-300">Reach out to us anytime</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowContactSlider(false)}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-white" />
                </button>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Location */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#06B6D4]/20 rounded-full flex-shrink-0">
                      <MapPin className="h-5 w-5 text-[#06B6D4]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Our Campus</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Airport Road, Opposite Honda Point<br />
                        Lahore, Punjab, Pakistan
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[#06B6D4] font-medium hover:text-[#22D3EE] transition-colors"
                  >
                    View on Map
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                {/* Contact Details */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#10B981]/20 rounded-full flex-shrink-0">
                      <Mail className="h-5 w-5 text-[#10B981]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Email Address</h4>
                      <a 
                        href="mailto:info@mansol.com.pk"
                        className="text-[#06B6D4] hover:text-[#22D3EE] text-sm transition-colors"
                      >
                        info@mansol.com.pk
                      </a>
                      <p className="text-xs text-gray-400 mt-1">For general inquiries</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#8B5CF6]/20 rounded-full flex-shrink-0">
                      <Globe className="h-5 w-5 text-[#8B5CF6]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Website</h4>
                      <a 
                        href="https://mansol.com.pk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#06B6D4] hover:text-[#22D3EE] text-sm transition-colors"
                      >
                        www.mansol.com.pk
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours & Quick Action */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#F97316]/20 rounded-full flex-shrink-0">
                      <Clock className="h-5 w-5 text-[#F97316]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Working Hours</h4>
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300">Weekdays</span>
                          <span className="text-sm font-medium text-white">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300">Saturday</span>
                          <span className="text-sm font-medium text-white">9:00 AM - 2:00 PM</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300">Sunday</span>
                          <span className="text-sm font-medium text-gray-400">Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Link
                      href="/components/templates/template2/contact"
                      onClick={() => setShowContactSlider(false)}
                      className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
                    >
                      <Calendar className="h-4 w-4" />
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </div>

              {/* Contact Numbers */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <h4 className="font-semibold text-white mb-4">Contact Numbers</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                    <div className="p-2 bg-[#06B6D4]/20 rounded-full">
                      <Phone className="h-4 w-4 text-[#06B6D4]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Phone</div>
                      <div className="text-white font-medium">+92 300 1234567</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                    <div className="p-2 bg-[#10B981]/20 rounded-full">
                      <Phone className="h-4 w-4 text-[#10B981]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">WhatsApp</div>
                      <div className="text-white font-medium">+92 300 7654321</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                    <div className="p-2 bg-[#8B5CF6]/20 rounded-full">
                      <Phone className="h-4 w-4 text-[#8B5CF6]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Office</div>
                      <div className="text-white font-medium">+92 42 1234567</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Menu Slider - BLACK BACKGROUND */}
      <AnimatePresence>
        {isMenuOpen && !isMobile && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            {/* Menu Content - BLACK BACKGROUND */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 200
              }}
              className="menu-container fixed top-0 left-0 right-0 h-screen bg-gray-900 z-50 overflow-y-auto"
            >
              {/* Menu Header */}
              <div className="sticky top-0 bg-gray-900 border-b border-gray-800 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Image
                          src="/mansol_logo.jpg"
                          alt="Mansol Logo"
                          width={140}
                          height={56}
                          className="object-contain rounded-xl"
                        />
                      </div>
                      <div>
                        <h2 className="font-bold text-white text-xl">Mansol Institute</h2>
                        <p className="text-sm text-gray-300">Professional Safety Training</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                    >
                      <X className="h-6 w-6 text-gray-400 hover:text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Menu Content */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Main Navigation Grid - Clean & Organized */}
                <div className="grid grid-cols-3 gap-8 mb-12">
                  {navItems.map((item, idx) => (
                    <div key={idx} className="space-y-4">
                      <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                        <div className={`p-2 rounded-full ${
                          item.featured 
                            ? 'bg-gradient-to-br from-[#06B6D4]/20 to-[#F97316]/20' 
                            : item.cta 
                            ? 'bg-gradient-to-br from-[#F97316]/20 to-[#FB923C]/20'
                            : 'bg-gray-800'
                        }`}>
                          <div className={item.featured ? 'text-[#06B6D4]' : item.cta ? 'text-[#F97316]' : 'text-gray-300'}>
                            {item.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-lg">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-300 mt-1">{item.description}</p>
                        </div>
                      </div>
                      
                      {item.subItems ? (
                        <div className="space-y-3">
                          {item.subItems.map((sub, i) => (
                            <Link
                              key={i}
                              href={sub.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-800/50 transition-all duration-200 group"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-xl">{sub.icon}</span>
                                <div>
                                  <div className="font-medium text-white group-hover:text-[#06B6D4] transition-colors">
                                    {sub.name}
                                  </div>
                                  <div className="text-xs text-gray-400">{sub.tag}</div>
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-[#06B6D4] transform group-hover:translate-x-1 transition-all" />
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <Link
                          href={item.href!}
                          onClick={() => setIsMenuOpen(false)}
                          className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition-all duration-300 ${
                            item.cta
                              ? 'bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white hover:shadow-lg hover:shadow-orange-500/20'
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          {item.cta ? 'Get in Touch' : 'Explore'}
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* Contact Info Bar - Simple & Clean */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900 rounded-2xl border border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-[#06B6D4]/20 to-[#F97316]/20 rounded-full">
                        <Phone className="h-6 w-6 text-[#06B6D4]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Need Assistance?</h4>
                        <p className="text-gray-300">Our team is here to help you</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          setShowContactSlider(true);
                        }}
                        className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-full font-medium hover:border-[#06B6D4] hover:text-[#06B6D4] transition-all duration-200"
                      >
                        Contact Info
                      </button>
                      <Link
                        href="/components/templates/template2/contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="px-5 py-2.5 bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
                      >
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Modal - BLACK BACKGROUND */}
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
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            {/* Modal Content - BLACK BACKGROUND */}
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
              <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
                {/* Search Input */}
                <div className="p-4 border-b border-gray-800">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <form onSubmit={handleSearch}>
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search courses, programs, and resources..."
                        value={searchQuery}
                        onChange={(e) => handleSearchInputChange(e.target.value)}
                        className="w-full pl-12 pr-12 py-4 bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/30 focus:border-[#06B6D4] text-white placeholder-gray-400 text-base"
                        autoFocus
                      />
                    </form>
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setSearchResults([]);
                        }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-700 rounded-full transition-colors"
                      >
                        <X className="h-4 w-4 text-gray-400 hover:text-white" />
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
                            onClick={() => handleSearchClick(result.url)}
                            className="w-full text-left p-4 hover:bg-gray-800/50 rounded-xl transition-colors group/result"
                          >
                            <div className="flex items-start gap-4">
                              <div className="p-2 bg-gray-800 rounded-full group-hover/result:bg-[#06B6D4]/20 transition-colors flex-shrink-0">
                                <span className="text-xl">{result.icon}</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-medium text-white group-hover/result:text-[#06B6D4] text-base">
                                    {result.title}
                                  </h3>
                                  <ChevronRight className="h-4 w-4 text-gray-500 group-hover/result:text-[#06B6D4] transform group-hover/result:translate-x-1 transition-transform" />
                                </div>
                                <p className="text-sm text-gray-400 mt-1">
                                  {result.category === "Courses" 
                                    ? "Professional Training Course" 
                                    : "Navigation Page"}
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
                        <div className="inline-flex p-4 bg-gray-800 rounded-full mb-4">
                          <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="font-medium text-white mb-2 text-base">
                          No results found for "{searchQuery}"
                        </h3>
                        <p className="text-gray-400 text-sm">
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
                        <h4 className="font-medium text-gray-300 mb-4 text-base">
                          Popular Searches
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {["NEBOSH", "IOSH", "Fire Safety", "First Aid", "OSHA Training", "Safety Courses"].map(
                            (term, index) => (
                              <motion.button
                                key={index}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                  setSearchQuery(term);
                                  handleSearchInputChange(term);
                                }}
                                className="p-3 bg-gray-800 hover:bg-[#06B6D4]/10 rounded-xl border border-gray-700 hover:border-[#06B6D4]/30 transition-all duration-200 text-left"
                              >
                                <div className="font-medium text-white text-base">
                                  {term}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                  {term.includes("Training") || term.includes("Courses") 
                                    ? "Professional Programs" 
                                    : "Safety Certifications"}
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

      {/* Mobile Menu - BLACK BACKGROUND */}
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
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            />

            {/* Menu Panel - BLACK BACKGROUND */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="menu-container fixed top-0 right-0 h-full w-80 bg-gray-900 shadow-2xl z-40 overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gray-900 border-b border-gray-800 z-10 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Image
                        src="/mansol_logo.jpg"
                        alt="Mansol Logo"
                        width={80}
                        height={32}
                        className="object-contain rounded-xl"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-white text-base">Mansol</div>
                      <div className="text-xs text-gray-300">Institute</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-400 hover:text-white" />
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
                            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-800 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-full ${
                                item.featured 
                                  ? 'bg-gradient-to-br from-[#06B6D4]/20 to-[#F97316]/20' 
                                  : 'bg-gray-800'
                              }`}>
                                {item.icon}
                              </div>
                              <div className="text-left">
                                <div className="font-semibold text-white">{item.name}</div>
                                <div className="text-xs text-gray-300">{item.description}</div>
                              </div>
                            </div>
                            <ChevronRight
                              className={`h-4 w-4 text-gray-500 transform transition-transform ${
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
                                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-800 transition-colors"
                                    >
                                      <span className="text-xl">{sub.icon}</span>
                                      <div>
                                        <div className="text-gray-200 font-medium">{sub.name}</div>
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
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition-colors"
                        >
                          <div className={`p-2 rounded-full ${
                            item.cta 
                              ? 'bg-gradient-to-br from-[#F97316]/20 to-[#FB923C]/20' 
                              : 'bg-gray-800'
                          }`}>
                            {item.icon}
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-white">{item.name}</div>
                            <div className="text-xs text-gray-300">{item.description}</div>
                          </div>
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Contact CTA */}
                <div className="mt-6 p-4 bg-gradient-to-br from-[#06B6D4]/10 to-[#F97316]/10 rounded-xl border border-[#06B6D4]/20">
                  <h4 className="font-bold text-white mb-3">Get Started Today</h4>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setShowContactSlider(true);
                      }}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-gray-300 rounded-full font-medium hover:border-[#06B6D4] hover:text-[#06B6D4] transition-all duration-200"
                    >
                      Contact Information
                    </button>
                    <Link
                      href="/components/templates/template2/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full px-4 py-2.5 bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white rounded-full font-semibold text-center hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
                    >
                      Enroll Now
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