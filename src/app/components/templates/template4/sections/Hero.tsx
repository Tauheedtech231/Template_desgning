"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  FaArrowRight,
  FaCalendarCheck
} from "react-icons/fa";

// High quality education background images
const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1683887034491-f58b4c4fca72?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
];

// Serif-like font class for headings
const serifFont = "font-serif font-medium tracking-tight";
const sansFont = "font-sans font-normal leading-relaxed";

// Stats without cards
const STATS_CONFIG = [
  { value: 0, label: "Students", suffix: "+", target: 15000 },
  { value: 0, label: "Faculty", suffix: "+", target: 500 },
  { value: 0, label: "Courses", suffix: "+", target: 200 },
  { value: 0, label: "Graduation", suffix: "%", target: 95 }
];

// Smooth right-to-left sliding background
const BackgroundSlidingAnimation = () => {
  const [currentBgImageIndex, setCurrentBgImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Current Image - slides out to left */}
      <motion.div
        key={`current-${currentBgImageIndex}`}
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ 
          duration: 2,
          ease: "easeInOut",
          delay: 3
        }}
        className="absolute inset-0 z-10"
      >
        <Image
          src={BACKGROUND_IMAGES[currentBgImageIndex]}
          alt="College environment"
          fill
          className="object-cover"
          sizes="100vw"
          quality={95}
          priority
        />
        <div className="absolute inset-0 bg-black/40 z-5" />
      </motion.div>

      {/* Next Image - enters from right */}
      <motion.div
        key={`next-${(currentBgImageIndex + 1) % BACKGROUND_IMAGES.length}`}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ 
          duration: 2,
          ease: "easeInOut",
          delay: 3
        }}
        className="absolute inset-0 z-5"
      >
        <Image
          src={BACKGROUND_IMAGES[(currentBgImageIndex + 1) % BACKGROUND_IMAGES.length]}
          alt="Next campus view"
          fill
          className="object-cover"
          sizes="100vw"
          quality={95}
        />
        <div className="absolute inset-0 bg-black/40 z-5" />
      </motion.div>
      
      {/* Static dark overlay for consistent text readability */}
      <div className="absolute inset-0 bg-black/30 z-15" />
    </div>
  );
};

// Minimal stat counter
const StatCounter = ({ 
  stat, 
  index 
}: { 
  stat: typeof STATS_CONFIG[0] & { value: number }; 
  index: number 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="flex flex-col items-center"
  >
    <div className={`text-2xl md:text-4xl font-light ${serifFont} text-white mb-1`}>
      {stat.value.toLocaleString()}
      <span className="text-[#E86A58] ml-0.5">{stat.suffix}</span>
    </div>
    <div className="text-white/85 text-xs md:text-sm tracking-wide uppercase">
      {stat.label}
    </div>
  </motion.div>
);

export const HeroSection: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(STATS_CONFIG);

  const animateCounter = useCallback((index: number, start: number, end: number, duration: number) => {
    const startTime = performance.now();
    
    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(start + (end - start) * easeOutQuart);
      
      setAnimatedStats(prev => prev.map((stat, i) => 
        i === index ? { ...stat, value: currentValue } : stat
      ));
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    requestAnimationFrame(updateCounter);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animatedStats.forEach((stat, index) => {
              setTimeout(() => {
                animateCounter(index, 0, stat.target, 1800);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, animatedStats, animateCounter]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[85vh] md:min-h-screen">
        {/* Background container - fixed position */}
        <div className="fixed inset-0 z-0">
          <BackgroundSlidingAnimation />
        </div>
        
        {/* Content container */}
        <div className="relative z-20 h-full flex flex-col">
          {/* Main content area - reduced spacing on mobile */}
          <div className="flex-1 flex items-center justify-center lg:justify-start pt-8 md:pt-0">
            <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl mx-auto lg:mx-0"
              >
                {/* Institutional tag - reduced margin on mobile */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-4 md:mb-10"
                >
                  <div className="inline-flex items-center gap-2">
                    <div className="h-px w-6 md:w-12 bg-white/50" />
                    <span className="text-white/85 text-xs md:text-sm tracking-wide">
                      Established 1998
                    </span>
                  </div>
                </motion.div>

                {/* Main heading - reduced spacing on mobile */}
                <div className="space-y-3 md:space-y-6 mb-4 md:mb-8">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`text-2xl sm:text-3xl md:text-[42px] leading-[1.1] ${serifFont} text-white text-center lg:text-left`}
                  >
                    Excel College of<br />
                    <span className="text-[#E86A58]">Professional Studies</span>
                  </motion.h1>

                  {/* Decorative accent line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="h-[2px] sm:h-[3px] w-20 md:w-32 bg-[#E86A58] origin-left mx-auto lg:mx-0"
                  />
                </div>

                {/* Supporting text - reduced margin and smaller font on mobile */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className={`text-white/85 text-sm md:text-lg ${sansFont} max-w-xl mb-6 md:mb-12 text-center lg:text-left leading-relaxed md:leading-normal`}
                >
                  A place where practical learning meets academic rigor. 
                  For over two decades, we have helped students find their path 
                  through education that matters.
                </motion.p>

                {/* CTAs - single row on mobile with smaller padding */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-row gap-2 md:gap-4 items-center justify-center flex-nowrap whitespace-nowrap"
                >
                  <Link
                    href="/components/templates/template4/courses"
                    className="group inline-flex items-center gap-2 md:gap-3 px-3 md:px-8 py-2.5 md:py-4 bg-[#E86A58] text-white hover:bg-[#D45A48] transition-colors duration-300 rounded-full text-xs md:text-base flex-shrink-0"
                  >
                    <span className="font-medium">Explore programs</span>
                    <FaArrowRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </Link>
                  
                  <Link
                    href="/components/templates/template4/contact"
                    className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-8 py-2.5 md:py-4 border border-white/30 text-white hover:bg-white/10 transition-colors duration-300 rounded-full text-xs md:text-base flex-shrink-0"
                  >
                    <FaCalendarCheck className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                    <span className="md:inline">Schedule visit</span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Stats section - Updated layout and reduced padding */}
          <div className="relative z-20 bg-black/30 backdrop-blur-[1px] border-t border-white/20 mt-4 md:mt-0">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div 
                ref={statsRef}
                className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row justify-between items-center gap-6 py-6 md:py-12"
              >
                {/* Mobile layout: two rows, two columns with padding */}
                <div className="grid grid-cols-2 gap-6 w-full sm:hidden">
                  {/* First row: Students and Faculty */}
                  <div className="flex flex-col items-start pl-2">
                    <StatCounter stat={animatedStats[0]} index={0} />
                  </div>
                  <div className="flex flex-col items-end pr-2">
                    <StatCounter stat={animatedStats[1]} index={1} />
                  </div>
                  
                  {/* Second row: Courses and Graduation */}
                  <div className="flex flex-col items-start pl-2">
                    <StatCounter stat={animatedStats[2]} index={2} />
                  </div>
                  <div className="flex flex-col items-end pr-2">
                    <StatCounter stat={animatedStats[3]} index={3} />
                  </div>
                </div>

                {/* Desktop layout */}
                <div className="hidden sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:justify-between w-full">
                  {animatedStats.map((stat, index) => (
                    <React.Fragment key={index}>
                      <StatCounter stat={stat} index={index} />
                      {/* Vertical divider for larger screens */}
                      {index < STATS_CONFIG.length - 1 && (
                        <div className="hidden lg:block h-8 w-px bg-white/20 self-center" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};