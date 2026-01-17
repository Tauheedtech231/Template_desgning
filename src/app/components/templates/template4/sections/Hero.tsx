"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaPhone, FaEnvelope } from "react-icons/fa";
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

// Dynamic descriptions
const descriptions = [
  "Welcome to our college portfolio. Explore our students' projects, achievements, and programs.",
  "Discover innovative student projects that showcase creativity and technical excellence.",
  "Celebrating student success stories and academic accomplishments across all departments.",
  "Advancing knowledge through cutting-edge research and collaborative innovation.",
  "Participate in engaging workshops and campus events designed for holistic development."
];

const dynamicImages = [
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
  "https://plus.unsplash.com/premium_photo-1691849271949-cb30187a80c3?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1641160616553-a9d21a846e49?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0"
];

export default function HeroSection() {
  const [headingIndex, setHeadingIndex] = useState(0);
  const [descIndex, setDescIndex] = useState(0);
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
  const nextContent = useCallback(() => {
    setHeadingIndex((prev) => (prev + 1) % mainHeadings.length);
    setDescIndex((prev) => (prev + 1) % descriptions.length);
  }, []);

  const nextImage = useCallback(() => {
    setImageIndex((prev) => (prev + 1) % dynamicImages.length);
  }, []);

  useEffect(() => {
    const contentTimer = setInterval(nextContent, 4000);
    return () => clearInterval(contentTimer);
  }, [nextContent]);

  useEffect(() => {
    const imgTimer = setInterval(nextImage, 6000);
    return () => clearInterval(imgTimer);
  }, [nextImage]);

  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[80vh] lg:min-h-screen overflow-hidden bg-[#0B1220]">
      
      {/* MOBILE BACKGROUND */}
      <div className="absolute inset-0 lg:hidden z-0 h-[70vh] md:h-[80vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={imageIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
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

      {/* MAIN CONTENT */}
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
    <div className="h-5 sm:h-6 mb-2 sm:mb-4 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={`welcome-${headingIndex}`}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="text-teal-400 tracking-[0.25em] text-xs sm:text-sm font-medium uppercase"
        >
          WELCOME TO
        </motion.p>
      </AnimatePresence>
    </div>

    {/* Dynamic Heading */}
    <div className="min-h-[56px] sm:min-h-[72px] md:min-h-[100px] mb-2 sm:mb-4 md:mb-6 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h1
          key={headingIndex}
          initial={{ y: 40, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -40, opacity: 0, filter: "blur(6px)" }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
        >
          {mainHeadings[headingIndex]}
        </motion.h1>
      </AnimatePresence>
    </div>

    {/* Dynamic Description */}
    <div className="h-[64px] sm:h-[76px] md:h-[96px] mb-4 sm:mb-6 md:mb-8 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={`description-${descIndex}`}
          initial={{
            x: -80,
            opacity: 0,
            clipPath: "inset(0 100% 0 0)",
          }}
          animate={{
            x: 0,
            opacity: 1,
            clipPath: "inset(0 0% 0 0)",
          }}
          exit={{
            x: 80,
            opacity: 0,
            clipPath: "inset(0 0% 0 100%)",
          }}
          transition={{
            duration: 0.75,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">
            {descriptions[descIndex]}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>

    {/* Contact Button */}
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={`mt-2 sm:mt-4 md:mt-6 ${isMobile ? "text-center" : ""}`}
    >
      <Link
        href="#contact"
        className="group inline-flex items-center gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-teal-500 hover:bg-teal-600 transition-all duration-300 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
      >
        <FaPhone className="text-sm md:text-base" />
        <span className="text-sm sm:text-base md:text-lg font-medium">
          Contact Now
        </span>
        <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300 text-sm md:text-base" />
      </Link>
    </motion.div>
  </motion.div>
</div>


            {/* RIGHT IMAGE - DESKTOP ONLY */}
           <div className="relative hidden lg:block h-full rounded-[2.5rem] overflow-hidden shadow-2xl">
  <AnimatePresence mode="wait">
    <motion.div
      key={imageIndex}
      className="absolute inset-0 rounded-l-[2.5rem] overflow-hidden"
      initial={{
        opacity: 0,
        scale: 1.08,
        rotate: 1.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.96,
        rotate: -1.5,
      }}
      transition={{
        duration: 1.1,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <Image
        src={dynamicImages[imageIndex]}
        alt="College illustration"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover rounded-l-[2.5rem] scale-[1.01]"
      />

      {/* Soft cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#0B1220]/30 via-[#0B1220]/10 to-transparent" />

      {/* Edge softening mask (premium feel) */}
      <div className="pointer-events-none absolute inset-0 rounded-l-[2.5rem] ring-1 ring-white/10" />
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
        className={`h-2 rounded-full transition-all duration-300 ${
          index === imageIndex
            ? "bg-teal-400 w-8"
            : "bg-white/60 hover:bg-white/90 w-2"
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

      {/* MOBILE SCROLL INDICATOR */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 lg:hidden"
        >
          <div className="flex flex-col items-center">
            <span className="text-white/60 text-xs mb-1">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1"
            >
              <div className="w-1 h-2 bg-teal-400 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Floating Animation Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0B1220] to-transparent pointer-events-none"
      />
    </section>
  );
}