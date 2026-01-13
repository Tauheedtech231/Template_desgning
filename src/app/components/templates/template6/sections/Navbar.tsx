"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { Menu, X, Home, User, Users, ChevronDown, Facebook, Linkedin, Music2 as TikTok, Briefcase, Globe, Code, Palette, Zap } from "lucide-react";

export  const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

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

  // Unique floating animation for services dropdown
  const floatingServicesVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: -15,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.8,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2
      }
    }
  };

  const serviceItemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
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
      setIsServicesOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen || isServicesOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen, isServicesOpen]);

  // ==================== DESKTOP NAVIGATION ====================
  const DesktopNav = () => {
    // Unique services with icons and descriptions
    const servicesItems = [
      { 
        name: "Web Development", 
        href: "/services/web", 
        icon: <Code className="h-5 w-5" />,
        desc: "Modern responsive websites",
        color: "text-blue-600",
        bgColor: "bg-blue-50"
      },
      { 
        name: "UI/UX Design", 
        href: "/services/design", 
        icon: <Palette className="h-5 w-5" />,
        desc: "User-centered interfaces",
        color: "text-purple-600",
        bgColor: "bg-purple-50"
      },
      { 
        name: "Digital Strategy", 
        href: "/services/strategy", 
        icon: <Globe className="h-5 w-5" />,
        desc: "Growth-focused planning",
        color: "text-green-600",
        bgColor: "bg-green-50"
      },
      { 
        name: "Tech Consulting", 
        href: "/services/consulting", 
        icon: <Briefcase className="h-5 w-5" />,
        desc: "Expert guidance",
        color: "text-amber-600",
        bgColor: "bg-amber-50"
      },
    ];

    // Main navigation with generous spacing
    const navItems = [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Services", href: "#", hasDropdown: true },
      { name: "Portfolio", href: "/portfolio" },
      { name: "Testimonials", href: "/testimonials" },
      { name: "Contact", href: "/contact" },
    ];

    const socialIcons = [
      { icon: <Facebook size={20} />, href: "https://facebook.com", label: "Facebook" },
      { icon: <Linkedin size={20} />, href: "https://linkedin.com", label: "LinkedIn" },
      { icon: <TikTok size={20} />, href: "https://tiktok.com", label: "TikTok" },
    ];

    return (
      <div className="hidden lg:flex items-center gap-10">
        {/* Navigation Links with Increased Spacing */}
        <nav className="flex items-center gap-2">
          {navItems.map((item, idx) => (
            <div key={idx} className="relative" ref={item.hasDropdown ? servicesRef : null}>
              {item.hasDropdown ? (
                <>
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    onMouseEnter={() => {
                      setHoveredPath("services");
                      setIsServicesOpen(true);
                    }}
                    onMouseLeave={() => {
                      if (!isServicesOpen) setHoveredPath(null);
                    }}
                    className={`px-5 py-3 font-medium text-[15px] tracking-wide transition-all duration-300 relative group/service-trigger ${
                      isServicesOpen ? "text-[#FF7A00]" : "text-[#333333] hover:text-[#FF7A00]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.name}
                      <motion.div
                        animate={{ rotate: isServicesOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.div>
                    </span>
                    
                    {/* Unique Orange Border Animation on Hover */}
                    <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover/service-trigger:border-[#FF7A00]/30 transition-all duration-400"></div>
                    
                    {/* Animated underline */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#FF7A00] group-hover/service-trigger:w-3/4 transition-all duration-300"></div>
                  </button>

                  {/* Services Dropdown with Orange Border */}
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        className="absolute left-0 top-full pt-4 z-50"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={floatingServicesVariants}
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                      >
                        <div className="relative">
                          {/* Orange Border Container */}
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent rounded-xl border border-orange-300/30 shadow-2xl shadow-orange-200/30 -m-1"></div>
                          
                          {/* Main Dropdown Content */}
                          <div className="relative bg-white/95 backdrop-blur-xl border border-gray-100 rounded-xl shadow-2xl overflow-hidden min-w-[320px]">
                            {/* Header */}
                            <div className="p-5 bg-gradient-to-r from-orange-50 to-white border-b border-gray-100">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                  <Zap className="h-5 w-5 text-orange-600" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900">Our Services</h3>
                                  <p className="text-sm text-gray-600">Tailored solutions for your business</p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Services List */}
                            <div className="p-2">
                              {servicesItems.map((service, index) => (
                                <motion.div
                                  key={index}
                                  variants={serviceItemVariants}
                                  whileHover={{ x: 5 }}
                                >
                                  <Link
                                    href={service.href}
                                    onClick={() => setIsServicesOpen(false)}
                                    className="flex items-start gap-4 p-4 hover:bg-gray-50/80 transition-all duration-200 group/service-item"
                                  >
                                    <div className={`p-2.5 ${service.bgColor} rounded-lg group-hover/service-item:scale-110 transition-transform duration-300`}>
                                      <div className={service.color}>
                                        {service.icon}
                                      </div>
                                    </div>
                                    <div className="flex-1">
                                      <div className="font-medium text-gray-900 group-hover/service-item:text-[#FF7A00] transition-colors duration-200">
                                        {service.name}
                                      </div>
                                      <div className="text-sm text-gray-600 mt-1">
                                        {service.desc}
                                      </div>
                                    </div>
                                    <div className="text-gray-300 group-hover/service-item:text-[#FF7A00] transition-colors duration-200">
                                      →
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                            
                            {/* Footer */}
                            <div className="p-4 bg-gray-50/50 border-t border-gray-100">
                              <Link
                                href="/services"
                                onClick={() => setIsServicesOpen(false)}
                                className="flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:text-[#FF7A00] transition-colors duration-200"
                              >
                                <span>View all services</span>
                                <ChevronDown className="h-4 w-4 rotate-270" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={item.href}
                  className="px-5 py-3 font-medium text-[15px] text-[#333333] hover:text-[#FF7A00] tracking-wide transition-all duration-300 relative group/navlink"
                  onMouseEnter={() => setHoveredPath(item.name.toLowerCase())}
                  onMouseLeave={() => setHoveredPath(null)}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Hover Background Effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent to-transparent group-hover/navlink:from-orange-50/20 group-hover/navlink:to-transparent transition-all duration-400"></div>
                  
                  {/* Animated underline */}
                  <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-[#FF7A00] transition-all duration-300 ${
                    hoveredPath === item.name.toLowerCase() ? "w-3/4" : "w-0"
                  }`}></div>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Social Media Icons with Unique Styling */}
        <div className="flex items-center gap-4 border-r border-gray-200 pr-8">
          {socialIcons.map((social, idx) => (
            <motion.a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-2.5 rounded-full bg-gray-50 text-gray-600 hover:text-[#FF7A00] transition-colors duration-300 group/social"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.label}
            >
              {social.icon}
              <div className="absolute inset-0 rounded-full border border-transparent group-hover/social:border-orange-300/50 transition-all duration-300"></div>
            </motion.a>
          ))}
        </div>

        {/* Get a Quote Button with Unique Animation */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/get-quote"
            className="relative px-7 py-3.5 bg-gradient-to-r from-[#FF7A00] to-[#FF9A3D] text-white font-semibold text-[14px] rounded-full hover:shadow-xl hover:shadow-orange-200/50 transition-all duration-300 tracking-wide overflow-hidden group/quote"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover/quote:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <span className="relative flex items-center gap-2">
              Get a Quote
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-block"
              >
                →
              </motion.span>
            </span>
          </Link>
        </motion.div>
      </div>
    );
  };

  // ==================== MOBILE NAVIGATION ====================
  const MobileNav = () => (
    <div className="flex items-center gap-5 lg:hidden">
      {/* Social Media Icons (Mobile) */}
      <div className="flex items-center gap-3">
        {[Facebook, Linkedin, TikTok].map((Icon, idx) => (
          <a
            key={idx}
            href="#"
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:text-[#FF7A00] transition-colors duration-240"
          >
            <Icon size={18} />
          </a>
        ))}
      </div>

      {/* Unique Menu Button */}
      <motion.button
        onClick={() => setIsMenuOpen(true)}
        className="relative p-3 rounded-full bg-gray-50 text-[#666666] hover:text-[#FF7A00] transition-colors duration-240 group/menu-btn"
        whileTap={{ scale: 0.95 }}
      >
        <Menu className="h-5 w-5" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover/menu-btn:border-[#FF7A00]/30 transition-all duration-400"></div>
      </motion.button>
    </div>
  );

  // ==================== BOTTOM SLIDER MENU ====================
  const BottomSliderMenu = () => {
    const mobileServicesItems = [
      { name: "Web Development", icon: <Code className="h-4 w-4" />, color: "bg-blue-50", textColor: "text-blue-600" },
      { name: "UI/UX Design", icon: <Palette className="h-4 w-4" />, color: "bg-purple-50", textColor: "text-purple-600" },
      { name: "Digital Strategy", icon: <Globe className="h-4 w-4" />, color: "bg-green-50", textColor: "text-green-600" },
      { name: "Tech Consulting", icon: <Briefcase className="h-4 w-4" />, color: "bg-amber-50", textColor: "text-amber-600" },
    ];

    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

    return (
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            />

            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileSliderVariants}
              className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-white to-gray-50/95 rounded-t-3xl shadow-2xl shadow-black/10 border-t border-gray-200/50 z-40 max-h-[90vh] overflow-hidden"
            >
              {/* Unique Drag Handle with Orange Accent */}
              <div className="sticky top-0 z-10 pt-4 pb-3 flex justify-center bg-gradient-to-b from-white to-transparent">
                <div className="w-16 h-1.5 bg-gradient-to-r from-gray-300 via-[#FF7A00]/60 to-gray-300 rounded-full"></div>
              </div>

              <div className="overflow-y-auto h-full pb-8">
                <div className="px-6">
                  {/* Header with Logo and Close */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="relative"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-[#333333] to-gray-800 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-semibold text-lg">T5</span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF7A00] rounded-full border-2 border-white"></div>
                      </motion.div>
                      <div>
                        <div className="font-semibold text-gray-900">TechLabs Pro</div>
                        <div className="text-sm text-gray-600">Premium Solutions</div>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2.5 hover:bg-gray-100 rounded-full transition-colors duration-240"
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="h-5 w-5 text-gray-600" />
                    </motion.button>
                  </div>

                  {/* Navigation List with Unique Spacing */}
                  <div className="space-y-1 mb-8">
                    {["Home", "About", "Services", "Portfolio", "Testimonials", "Contact"].map((item, idx) => (
                      <div key={idx} className="mb-1">
                        {item === "Services" ? (
                          <>
                            <button
                              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                              className={`w-full flex items-center justify-between px-5 py-4 text-[16px] font-medium rounded-xl transition-all duration-300 ${
                                mobileServicesOpen 
                                  ? "text-[#FF7A00] bg-orange-50/50 border border-orange-200" 
                                  : "text-gray-900 hover:text-[#FF7A00] hover:bg-gray-50"
                              }`}
                            >
                              <span>{item}</span>
                              <motion.div
                                animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronDown className="h-4 w-4" />
                              </motion.div>
                            </button>

                            {/* Mobile Services Submenu with Orange Border */}
                            <AnimatePresence>
                              {mobileServicesOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="ml-4 mt-2 pl-4 border-l-2 border-orange-200/50 space-y-2 overflow-hidden"
                                >
                                  {mobileServicesItems.map((service, sIdx) => (
                                    <motion.div
                                      key={sIdx}
                                      initial={{ x: -20, opacity: 0 }}
                                      animate={{ x: 0, opacity: 1 }}
                                      transition={{ delay: sIdx * 0.05 }}
                                    >
                                      <Link
                                        href={`/services/${service.name.toLowerCase().replace(' ', '-')}`}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50/80 rounded-lg transition-colors duration-200"
                                      >
                                        <div className={`p-2 ${service.color} rounded-lg`}>
                                          <div className={service.textColor}>
                                            {service.icon}
                                          </div>
                                        </div>
                                        <span>{service.name}</span>
                                      </Link>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center justify-between px-5 py-4 text-[16px] font-medium text-gray-900 hover:text-[#FF7A00] hover:bg-gray-50 rounded-xl transition-all duration-300"
                          >
                            <span>{item}</span>
                            <div className="text-gray-300">→</div>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Get a Quote Button */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                  >
                    <Link
                      href="/get-quote"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center gap-3 w-full px-4 py-4 bg-gradient-to-r from-[#FF7A00] to-[#FF9A3D] text-white rounded-2xl font-semibold text-[15px] hover:shadow-lg hover:shadow-orange-200/50 transition-all duration-300"
                    >
                      <Zap className="h-4 w-4" />
                      <span>Get a Free Quote</span>
                    </Link>
                  </motion.div>

                  {/* Social Media Footer with Unique Layout */}
                  <div className="pt-6 border-t border-gray-200/50">
                    <div className="text-center mb-4">
                      <div className="text-sm font-medium text-gray-900 mb-3">Connect With Us</div>
                      <div className="flex justify-center gap-5">
                        {[Facebook, Linkedin, TikTok].map((Icon, idx) => (
                          <motion.a
                            key={idx}
                            href="#"
                            className="p-3 rounded-full bg-gradient-to-br from-gray-100 to-white border border-gray-200 text-gray-600 hover:text-[#FF7A00] hover:border-orange-200 transition-all duration-300"
                            whileTap={{ scale: 0.9 }}
                          >
                            <Icon size={20} />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                    <div className="text-center text-xs text-gray-500 space-y-1">
                      <p>© 2024 TechLabs Pro Template</p>
                      <p>Premium Digital Solutions</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  };

  // ==================== MAIN RENDER ====================
  return (
    <>
      {/* Main Navbar with Unique Styling */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 120, 
          damping: 18,
          delay: 0.1
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-white/98 backdrop-blur-xl py-3 shadow-lg shadow-black/5 border-b border-gray-200/80" 
            : "bg-white py-4 border-b border-gray-100"
        }`}
        style={{ 
          height: isScrolled ? '70px' : '76px'
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Unique Logo Design */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group"
            >
              <motion.div 
                className="relative"
                whileHover={{ rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-11 h-11 bg-gradient-to-br from-[#333333] to-gray-800 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <span className="text-white font-bold text-lg">T5</span>
                </div>
                <motion.div 
                  className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF7A00] rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                />
              </motion.div>
              <div>
                <span className="font-bold text-[17px] text-gray-900 tracking-tight block leading-tight">
                  TechLabs Pro
                </span>
                <span className="text-xs text-gray-600 font-medium tracking-wide">
                  Premium Template
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
      <div style={{ height: isScrolled ? '70px' : '76px' }} />

      {/* Bottom Slider Menu */}
      <BottomSliderMenu />
    </>
  );
};
export default Navbar;