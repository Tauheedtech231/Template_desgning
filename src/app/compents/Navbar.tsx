"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/About" },
    { label: "Programs", href: "/Programms" },
    { label: "Students Life", href: "/Student_Life" },
    { label: "Scholarship", href: "/Scholarships" },
    { label: "Admission guidance", href: "/Admission" },
    { label: "Contact Us", href: "/Contact" },
  ];

  // Custom Cursor States
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isCursorVisible, setIsCursorVisible] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced cursor movement
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseEnter = () => setIsCursorVisible(true);
    const handleMouseLeave = () => setIsCursorVisible(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Smooth trailing effect with improved physics
  useEffect(() => {
    let animationFrameId: number;
    
    const updateCursor = () => {
      setCursorOffset((prev) => ({
        x: prev.x + (cursorPos.x - prev.x) * 0.15, // Smoother trailing
        y: prev.y + (cursorPos.y - prev.y) * 0.15,
      }));
      animationFrameId = requestAnimationFrame(updateCursor);
    };
    
    animationFrameId = requestAnimationFrame(updateCursor);
    return () => cancelAnimationFrame(animationFrameId);
  }, [cursorPos]);

  // Cursor variants for different states
  const cursorVariants :Variants = {
    default: {
      scale: 1,
      mixBlendMode: "difference" as const,
    },
    hover: {
      scale: 2,
      mixBlendMode: "normal" as const,
      backgroundColor: "#3b82f6",
    },
    hidden: {
      scale: 0,
      opacity: 0,
    }
  };

  const handleLinkHover = (label: string) => {
    setCursorVariant("hover");
    setActiveLink(label);
  };

  const handleLinkLeave = () => {
    setCursorVariant("default");
    setActiveLink("");
  };

  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants:Variants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const mobileMenuVariants:Variants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const mobileItemVariants:Variants = {
    closed: {
      opacity: 0,
      x: -50,
      scale: 0.8
    },
    open: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  return (
    <>
      {/* Enhanced Navbar */}
      <motion.nav 
        className={`bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg fixed w-full z-50 transition-all duration-500 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30 
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Enhanced Logo with Animation */}
          <motion.div
            whileHover={{ 
              scale: 1.05,
              rotateZ: [-1, 1, -1, 1, 0],
              transition: { duration: 0.5 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent bg-size-200 animate-gradient relative"
            >
              BrightFuture
              <motion.span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>

          {/* Enhanced Desktop Menu */}
          <motion.div 
            className="hidden md:flex space-x-1 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item) => (
              <motion.div
                key={item.label}
                variants={itemVariants}
                whileHover={{ 
                  y: -2,
                  transition: { type: "spring", stiffness: 400 }
                }}
              >
                <Link
                  href={item.href}
                  className="relative px-4 py-2 text-gray-800 dark:text-gray-200 font-medium transition-all duration-300 group"
                  onMouseEnter={() => handleLinkHover(item.label)}
                  onMouseLeave={handleLinkLeave}
                >
                  <span className={`relative z-10 transition-all duration-300 ${
                    activeLink === item.label 
                      ? 'text-white dark:text-white scale-110' 
                      : 'group-hover:text-white dark:group-hover:text-white'
                  }`}>
                    {item.label}
                  </span>
                  
                  {/* Enhanced Hover Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100"
                    initial={false}
                    animate={{ 
                      opacity: activeLink === item.label ? 1 : 0,
                      scale: activeLink === item.label ? 1 : 0.8
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 30 
                    }}
                  />
                  
                  {/* Enhanced Underline */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                    initial={false}
                    animate={{ 
                      width: activeLink === item.label ? "80%" : "0%",
                      x: "-50%"
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            className="md:hidden relative p-2 text-gray-800 dark:text-gray-200 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={isOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 }
              }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </motion.div>
            
            {/* Button Hover Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-0"
              animate={{ opacity: isOpen ? 0.1 : 0 }}
              whileHover={{ opacity: 0.1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-t border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <motion.div 
                className="flex flex-col px-4 py-6 space-y-2"
                variants={containerVariants}
              >
                {navItems.map((item) => (
                  <motion.div
                    key={item.label}
                    variants ={mobileItemVariants}
                    whileHover={{ 
                      x: 10,
                      transition: { type: "spring", stiffness: 400 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={item.href}
                      className="block text-gray-800 dark:text-gray-200 font-medium transition-all duration-300 py-3 px-4 rounded-xl relative group overflow-hidden"
                      onClick={() => setIsOpen(false)}
                      onMouseEnter={() => handleLinkHover(item.label)}
                      onMouseLeave={handleLinkLeave}
                    >
                      <span className="relative z-10 flex items-center">
                        {item.label}
                        <motion.span
                          className="ml-2 opacity-0 group-hover:opacity-100"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </span>
                      
                      {/* Mobile Item Background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 rounded-xl"
                        initial={false}
                        animate={{ 
                          opacity: activeLink === item.label ? 0.1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Mobile Item Border */}
                      <motion.div
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                        initial={false}
                        animate={{ 
                          width: activeLink === item.label ? "100%" : "0%"
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Enhanced Custom Cursor */}
      <AnimatePresence>
        {isCursorVisible && (
          <>
            {/* Main Cursor */}
            <motion.div
              style={{
                left: cursorOffset.x - 12,
                top: cursorOffset.y - 12,
              }}
              className="fixed pointer-events-none w-6 h-6 rounded-full z-50 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 shadow-2xl"
              variants={cursorVariants}
              animate={cursorVariant}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 28,
                mass: 0.5
              }}
            />
            
            {/* Cursor Trail */}
            <motion.div
              style={{
                left: cursorOffset.x - 16,
                top: cursorOffset.y - 16,
              }}
              className="fixed pointer-events-none w-8 h-8 rounded-full z-40 border-2 border-blue-400/30"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Cursor Particles */}
            {cursorVariant === "hover" && (
              <motion.div
                style={{
                  left: cursorOffset.x,
                  top: cursorOffset.y,
                }}
                className="fixed pointer-events-none z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full"
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 1,
                    }}
                    animate={{
                      x: Math.cos((i * Math.PI) / 2) * 20,
                      y: Math.sin((i * Math.PI) / 2) * 20,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        .bg-size-200 {
          background-size: 200% 200%;
        }
        .animate-gradient {
          animation: gradient-move 3s ease infinite;
        }
        @keyframes gradient-move {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
}