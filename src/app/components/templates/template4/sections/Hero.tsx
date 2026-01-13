"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

// Dynamic headings for college
const mainHeadings = [
  "Computer Science Department",
  "Annual Student Projects",
  "Student Achievements",
  "Research & Innovation",
  "Workshops & Events"
];

const subHeading =
  "Welcome to our college portfolio. Explore our students' projects, achievements, and programs.";

const dynamicImages = [
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
  "https://plus.unsplash.com/premium_photo-1691849271949-cb30187a80c3?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1641160616553-a9d21a846e49?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0"
];

export default function HeroSection() {
  const [headingIndex, setHeadingIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Optimized timer with useCallback
  const nextHeading = useCallback(() => {
    setHeadingIndex((prev) => (prev + 1) % mainHeadings.length);
  }, []);

  const nextImage = useCallback(() => {
    setImageIndex((prev) => (prev + 1) % dynamicImages.length);
  }, []);

  useEffect(() => {
    const headingTimer = setInterval(nextHeading, 4000);
    return () => clearInterval(headingTimer);
  }, [nextHeading]);

  useEffect(() => {
    const imgTimer = setInterval(nextImage, 8000);
    return () => clearInterval(imgTimer);
  }, [nextImage]);

  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[80vh] lg:min-h-screen overflow-hidden bg-[#0B1220]">
      
      {/* MOBILE BACKGROUND - FURTHER REDUCED HEIGHT */}
      <div className="absolute inset-0 lg:hidden z-0 h-[70vh] md:h-[80vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={imageIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Image
              src={dynamicImages[imageIndex]}
              alt="College illustration"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/95 via-[#0B1220]/70 to-[#0B1220]/40" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* MAIN CONTENT - ADJUSTED HEIGHT */}
      <div className="relative z-10 w-full h-[70vh] md:h-[80vh] lg:h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* LEFT CONTENT */}
            <div className="relative z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-xl"
              >
                {/* Welcome Text */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-teal-400 tracking-[0.3em] mb-4 text-sm font-medium uppercase"
                >
                  WELCOME TO
                </motion.p>

                {/* Dynamic Heading */}
                <div className="min-h-[80px] sm:min-h-[100px] md:min-h-[120px] mb-4 md:mb-6 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.h1
                      key={headingIndex}
                      initial={{ y: 50, opacity: 0, filter: "blur(5px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: -50, opacity: 0, filter: "blur(5px)" }}
                      transition={{ 
                        duration: 0.8, 
                        ease: "easeOut" 
                      }}
                      className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                    >
                      {mainHeadings[headingIndex]}
                    </motion.h1>
                  </AnimatePresence>
                </div>

                {/* SMOOTH LEFT-TO-RIGHT ANIMATION FOR DESCRIPTION */}
                <div className="mb-6 md:mb-8 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`description-${headingIndex}-${imageIndex}`}
                      initial={{ 
                        x: -100, 
                        opacity: 0,
                        clipPath: "inset(0 100% 0 0)" 
                      }}
                      animate={{ 
                        x: 0, 
                        opacity: 1,
                        clipPath: "inset(0 0% 0 0)" 
                      }}
                      exit={{ 
                        x: 100, 
                        opacity: 0,
                        clipPath: "inset(0 0% 0 100%)" 
                      }}
                      transition={{ 
                        duration: 0.8,
                        ease: [0.25, 0.1, 0.25, 1], // Smooth easing
                        delay: 0.1
                      }}
                    >
                      <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">
                        {subHeading}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* CTA Button with delayed animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-4 md:mt-6"
                >
                  <Link
                    href="#"
                    className="group inline-flex items-center gap-3 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-teal-500 hover:bg-teal-600 transition-all duration-300 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="text-xs sm:text-sm md:text-base font-medium">Explore Portfolio</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300 text-sm md:text-base" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* RIGHT IMAGE - DESKTOP ONLY */}
            <div className="relative hidden lg:block h-full rounded-l-3xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={imageIndex}
                  className="absolute inset-0"
                  initial={{ 
                    opacity: 0, 
                    scale: 1.1,
                    filter: "brightness(0.8) blur(2px)"
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    filter: "brightness(1) blur(0px)"
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.95,
                    filter: "brightness(0.8) blur(2px)"
                  }}
                  transition={{ 
                    duration: 1.5, 
                    ease: "easeInOut" 
                  }}
                >
                  <Image
                    src={dynamicImages[imageIndex]}
                    alt="College illustration"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-l from-[#0B1220]/20 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>
              
              {/* Image Navigation Dots */}
              <div className="absolute bottom-8 right-8 flex gap-2 z-20">
                {dynamicImages.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setImageIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === imageIndex 
                        ? 'bg-teal-400 w-8' 
                        : 'bg-white/60 hover:bg-white/90'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* DESKTOP GRADIENT OVERLAY */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220] via-[#0B1220]/90 to-transparent w-[55%]" />
      </div>

      {/* MOBILE SCROLL INDICATOR - ONLY SHOW IF CONTENT OVERFLOWS */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 lg:hidden"
        >
          <div className="flex flex-col items-center">
            <span className="text-white/60 text-xs mb-1">Scroll</span>
            <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-teal-400 rounded-full mt-1.5"
              />
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}