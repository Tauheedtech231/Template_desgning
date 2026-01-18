"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

// High quality education background images
const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1683887034491-f58b4c4fca72?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
];

// Different headings to cycle through
const HEADINGS = [
  {
    firstLine: "Excel College",
    secondLine: "of Professional Studies"
  },
  {
    firstLine: "Transformative Learning",
    secondLine: "for Future Leaders"
  },
  {
    firstLine: "Excellence in",
    secondLine: "Higher Education"
  },
  {
    firstLine: "Building Careers",
    secondLine: "Shaping Futures"
  }
];

// Background Sliding Animation Component - Clear images
const BackgroundSlidingAnimation = () => {
  const [currentBgImageIndex, setCurrentBgImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentBgImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
        setIsTransitioning(false);
      }, 2000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Main Background - Dark theme */}
      <div className="absolute inset-0 bg-[#0B0F0E] z-0" />
      
      {/* Current Image - Clear with minimal overlay */}
      <motion.div
        key={`current-${currentBgImageIndex}`}
        initial={{ y: "0%", opacity: 1 }}
        animate={isTransitioning ? {
          y: "-100%",
          opacity: 0
        } : {
          y: "0%",
          opacity: 1
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute inset-0 z-10"
      >
        <Image
          src={BACKGROUND_IMAGES[currentBgImageIndex]}
          alt="College Campus"
          fill
          className="object-cover"
          sizes="100vw"
          quality={100}
          priority={true}
          style={{ 
            filter: "brightness(0.85) contrast(1.05)"
          }}
        />
        {/* Very subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F0E]/40 via-transparent to-[#0B0F0E]/50" />
      </motion.div>

      {/* Next Image */}
      <motion.div
        key={`next-${(currentBgImageIndex + 1) % BACKGROUND_IMAGES.length}`}
        initial={{ y: "100%", opacity: 0 }}
        animate={isTransitioning ? {
          y: "0%",
          opacity: 1
        } : {
          y: "100%",
          opacity: 0
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute inset-0 z-5"
      >
        <Image
          src={BACKGROUND_IMAGES[(currentBgImageIndex + 1) % BACKGROUND_IMAGES.length]}
          alt="Next Campus View"
          fill
          className="object-cover"
          sizes="100vw"
          quality={100}
          style={{ 
            filter: "brightness(0.85) contrast(1.05)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F0E]/40 via-transparent to-[#0B0F0E]/50" />
      </motion.div>
    </div>
  );
};

// Enhanced Moving Description with better UX - More Compact version
const MovingDescription = () => {
  const [isMoving, setIsMoving] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const description = "For over two decades, we have been committed to delivering quality education with a focus on practical learning and career development. Empowering students to become leaders in their chosen fields.";

  return (
    <div 
      className="relative overflow-hidden py-0.5"
      onMouseEnter={() => {
        setIsMoving(false);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsMoving(true);
        setIsHovered(false);
      }}
    >
      <motion.div
        animate={isMoving ? {
          x: [0, -200],
        } : {
          x: 0
        }}
        transition={isMoving ? {
          x: {
            duration: 25,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }
        } : {
          x: {
            duration: 0.4,
            ease: "easeOut"
          }
        }}
        className="flex whitespace-nowrap"
      >
        {/* Multiple copies for seamless looping */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="inline-flex items-center">
            <motion.span
              animate={{
                color: isHovered ? "#ffffff" : "#E2E8F0"
              }}
              transition={{ duration: 0.3 }}
              className="text-sm md:text-base font-medium mr-4"
            >
              {description}
            </motion.span>
            {/* Animated Separator */}
            <motion.div
              animate={{
                width: isHovered ? "15px" : "8px",
                backgroundColor: isHovered ? "#10B981" : "#10B981/50"
              }}
              transition={{ duration: 0.3 }}
              className="h-0.5 rounded-full mr-4"
            />
          </div>
        ))}
      </motion.div>
      
      {/* Gradient fade on edges */}
      <motion.div
        animate={{ opacity: isMoving ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
        className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0B0F0E] to-transparent pointer-events-none"
      />
      <motion.div
        animate={{ opacity: isMoving ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
        className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0B0F0E] to-transparent pointer-events-none"
      />
      
      {/* Hover Indicator */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 border-y border-[#10B981]/20 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Premium Button with Enhanced UX - More Compact
const PremiumButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
          delay: 0.6
        }
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href="/components/templates/template3/courses"
        className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 text-white font-semibold rounded-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsClicked(true)}
        onMouseUp={() => setIsClicked(false)}
      >
        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isHovered 
              ? "linear-gradient(135deg, #10B981 0%, #0EA271 50%, #059669 100%)" 
              : "linear-gradient(135deg, #10B981 0%, #0EA271 100%)"
          }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 opacity-0"
          animate={{
            opacity: isHovered ? [0, 0.3, 0] : 0,
            x: isHovered ? ["-100%", "100%"] : "-100%"
          }}
          transition={{
            opacity: { duration: 1.5, repeat: Infinity },
            x: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
          }}
        />
        
        {/* Click Ripple Effect */}
        <AnimatePresence>
          {isClicked && (
            <motion.div
              className="absolute inset-0 bg-white/30 rounded-full"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          )}
        </AnimatePresence>
        
        {/* Glowing Border */}
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          animate={{
            borderColor: isHovered ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.2)",
            boxShadow: isHovered 
              ? "0 0 15px rgba(16, 185, 129, 0.3)" 
              : "0 0 8px rgba(16, 185, 129, 0.2)"
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Text Content */}
        <motion.span
          animate={{ 
            x: isHovered ? -4 : 0,
            textShadow: isHovered ? "0 2px 8px rgba(255,255,255,0.3)" : "none"
          }}
          transition={{ duration: 0.2 }}
          className="relative z-10 text-sm tracking-wide"
        >
          Explore Our Programs
        </motion.span>
        
        {/* Animated Arrow */}
        <motion.div
          className="relative z-10"
          animate={{
            x: isHovered ? 4 : 0,
            rotate: isHovered ? 0 : 0
          }}
          transition={{ 
            x: { duration: 0.3, type: "spring", stiffness: 200 }
          }}
        >
          <FaArrowRight className="h-3.5 w-3.5" />
          
          {/* Motion Trail */}
          <AnimatePresence>
            {isHovered && (
              <>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-white/40 rounded-full"
                    initial={{ width: 0, x: -4, opacity: 0 }}
                    animate={{ 
                      width: [0, 8, 0],
                      x: [-4, -8],
                      opacity: [0, 0.6, 0]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Floating Particles */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-white/40 rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0, 1, 0],
                    y: [0, -15],
                    x: Math.cos(i * 90 * (Math.PI / 180)) * 15
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </Link>
    </motion.div>
  );
};

// Premium Dynamic Heading with Larger Desktop Font Size
const PremiumDynamicHeading = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % HEADINGS.length);
        setIsAnimating(false);
      }, 1200);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentHeading = HEADINGS[currentIndex];
  const nextHeading = HEADINGS[(currentIndex + 1) % HEADINGS.length];

  return (
    <div className="relative h-36 w-full overflow-hidden">
      {/* Current Heading - Elegant Exit */}
      <motion.div
        key={`current-${currentIndex}`}
        initial={false}
        animate={{
          y: isAnimating ? -30 : 0,
          opacity: isAnimating ? 0 : 1,
          scale: isAnimating ? 0.92 : 1,
          filter: isAnimating ? "blur(4px)" : "blur(0px)"
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <div className="text-center w-full">
          <motion.h1
            className="text-xl md:text-3xl lg:text-4xl font-bold leading-snug"
            animate={{ 
              letterSpacing: isAnimating ? "0.01em" : "0em"
            }}
            transition={{ duration: 1 }}
          >
            <div className="text-white">{currentHeading.firstLine}</div>
            <motion.div
              animate={{ scaleX: isAnimating ? 0.8 : 1 }}
              transition={{ duration: 1 }}
              className="h-[1px] w-32 md:w-40 lg:w-48 mx-auto bg-gradient-to-r from-transparent via-white/50 to-transparent my-1 md:my-2"
            />
            <div className="relative mt-0 md:mt-1">
              <span className="text-white text-lg md:text-2xl lg:text-3xl">
                {currentHeading.secondLine.split(' ')[0]} 
              </span>
              <span className="bg-gradient-to-r from-black via-gray-900 to-black bg-clip-text text-transparent ml-1 text-lg md:text-2xl lg:text-3xl">
                {currentHeading.secondLine.split(' ').slice(1).join(' ')}
              </span>
            </div>
          </motion.h1>
        </div>
      </motion.div>

      {/* Next Heading - Premium Entrance */}
      <motion.div
        key={`next-${(currentIndex + 1) % HEADINGS.length}`}
        initial={false}
        animate={{
          x: isAnimating ? 0 : 40,
          opacity: isAnimating ? 1 : 0,
          scale: isAnimating ? 1 : 0.92,
          filter: isAnimating ? "blur(0px)" : "blur(4px)"
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.1,
        }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <div className="text-center w-full">
          <motion.h1
            className="text-xl md:text-3xl lg:text-4xl font-bold leading-snug"
            animate={{ 
              letterSpacing: isAnimating ? "0em" : "0.01em"
            }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            <div className="text-white">{nextHeading.firstLine}</div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isAnimating ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-[1px] w-32 md:w-40 lg:w-48 mx-auto bg-gradient-to-r from-transparent via-white/50 to-transparent my-1 md:my-2"
            />
            <div className="relative mt-0 md:mt-1">
              <span className="text-white text-lg md:text-2xl lg:text-3xl">
                {nextHeading.secondLine.split(' ')[0]} 
              </span>
              <span className="bg-gradient-to-r from-black via-gray-900 to-black bg-clip-text text-transparent ml-1 text-lg md:text-2xl lg:text-3xl">
                {nextHeading.secondLine.split(' ').slice(1).join(' ')}
              </span>
            </div>
          </motion.h1>
        </div>
      </motion.div>
      
      {/* Premium Transition Overlay */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.08, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none"
          />
        )}
      </AnimatePresence>
      
      {/* Progress Indicator */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-28 md:w-36 lg:w-40 h-0.5 overflow-hidden">
        <motion.div
          animate={{
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
          className="h-full bg-gradient-to-r from-transparent via-[#10B981] to-transparent"
        />
      </div>
    </div>
  );
};

export const HeroSection: React.FC = () => {
  return (
    <>
      {/* Hero Section - Reduced Height */}
      <section className="relative h-[70vh] min-h-[600px] overflow-hidden mt-6">
        {/* Background Animation with Clear Images */}
        <BackgroundSlidingAnimation />
        
        {/* Content Container - Centered Everything */}
        <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          {/* Premium Background Pattern */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#10B981]/10 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
          </div>
          
          {/* Centered Main Content - Very Compact layout */}
          <div className="relative z-20 w-full max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="space-y-4"
            >
              {/* Premium Dynamic Heading */}
              <PremiumDynamicHeading />

              {/* Enhanced Moving Description */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-1"
              >
                <MovingDescription />
              </motion.div>

              {/* Premium Button */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="pt-2"
              >
                <PremiumButton />
              </motion.div>
            </motion.div>
          </div>
          
          {/* Subtle Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          >
            <motion.div
              animate={{ 
                y: [0, 6, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex flex-col items-center gap-0.5"
            >
              <div className="text-xs text-white/60 tracking-wider">SCROLL</div>
              <motion.div
                animate={{ 
                  height: [4, 8, 4]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-[1px] bg-gradient-to-b from-transparent via-[#10B981] to-transparent"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};