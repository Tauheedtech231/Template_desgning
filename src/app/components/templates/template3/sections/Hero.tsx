"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  FaBookOpen, 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaAward, 
  FaCalendarAlt,
  FaArrowRight
} from "react-icons/fa";

// High quality education background images
const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1683887034491-f58b4c4fca72?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
"https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
];

// Stats configuration for college
const STATS_CONFIG = [
  { value: 0, label: "Students Enrolled", icon: <FaUserGraduate />, suffix: "+", target: 15000, color: "#064E3B" },
  { value: 0, label: "Expert Faculty", icon: <FaChalkboardTeacher />, suffix: "+", target: 500, color: "#0F172A" },
  { value: 0, label: "Courses Offered", icon: <FaBookOpen />, suffix: "+", target: 200, color: "#064E3B" },
  { value: 0, label: "Graduation Rate", icon: <FaAward />, suffix: "%", target: 95, color: "#0F172A" }
];

// Background Sliding Animation Component - No blur, clear images
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
      {/* Main Background - Solid color */}
      <div className="absolute inset-0 bg-[#F1F5F9] z-0" />
      
      {/* Current Image - No blur, clear */}
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
          quality={95}
          priority={true}
          style={{ filter: "brightness(1.1) saturate(1.05)" }}
        />
        {/* Very light overlay for text readability - minimal opacity */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F1F5F9]/20 via-transparent to-[#F1F5F9]/10" />
      </motion.div>

      {/* Next Image - No blur, clear */}
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
          quality={95}
          style={{ filter: "brightness(1.1) saturate(1.05)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F1F5F9]/20 via-transparent to-[#F1F5F9]/10" />
      </motion.div>
    </div>
  );
};

// Animated Tagline Component
const AnimatedTagline = () => {
  const taglines = [
    "EXCELLENCE IN EDUCATION",
    "BUILDING FUTURE LEADERS",
    "INNOVATIVE LEARNING",
    "GLOBAL STANDARDS"
  ];

  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-3 mb-8"
    >
      <div className="h-px w-8 bg-[#064E3B]/50" />
      
      <div className="relative h-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentTagline}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute left-0 right-0 text-[#064E3B] text-sm font-semibold tracking-[0.15em] uppercase"
          >
            {taglines[currentTagline]}
          </motion.span>
        </AnimatePresence>
      </div>
      
      <div className="h-px w-8 bg-[#064E3B]/50" />
    </motion.div>
  );
};

// Stat Item Component
const StatItem = ({ 
  stat, 
  index, 
  hasAnimated 
}: { 
  stat: typeof STATS_CONFIG[0] & { value: number }; 
  index: number; 
  hasAnimated: boolean 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2 }}
    whileHover={{ y: -5 }}
    className="relative group"
  >
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: hasAnimated ? 1 : 0 }}
        transition={{ delay: index * 0.3 + 0.5 }}
        className="w-12 h-12 mb-4 rounded-lg bg-[#064E3B]/10 flex items-center justify-center"
      >
        <div className="text-[#064E3B] text-lg">
          {stat.icon}
        </div>
      </motion.div>
      
      {/* Counter Value */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.3 + 0.8 }}
        className="mb-3"
      >
        <div className="text-3xl font-bold text-[#0F172A]">
          {stat.value.toLocaleString()}
          <span className="text-[#064E3B] ml-1">{stat.suffix}</span>
        </div>
      </motion.div>
      
      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.3 + 1 }}
      >
        <div className="text-[#334155] font-medium">
          {stat.label}
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export const HeroSection: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(STATS_CONFIG);

  // Animation function for counters
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
      } else {
        setAnimatedStats(prev => prev.map((stat, i) => 
          i === index ? { ...stat, value: end } : stat
        ));
      }
    };
    
    requestAnimationFrame(updateCounter);
  }, []);

  // Intersection Observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animatedStats.forEach((stat, index) => {
              setTimeout(() => {
                animateCounter(index, 0, stat.target, 2000);
              }, index * 300);
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: "50px" }
    );

    const currentStatsRef = statsRef.current;
    if (currentStatsRef) {
      observer.observe(currentStatsRef);
    }

    return () => {
      if (currentStatsRef) {
        observer.unobserve(currentStatsRef);
      }
    };
  }, [hasAnimated, animatedStats, animateCounter]);

  return (
    <>
      {/* Hero Section - Clear background */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Animation with clear images */}
        <BackgroundSlidingAnimation />
        
        {/* Content Overlay - Minimal for clear background */}
        <div className="absolute inset-0 z-5">
          {/* Very subtle gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F1F5F9]/10 via-transparent to-[#F1F5F9]/20" />
        </div>

        {/* Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-3xl"
            >
              <div className="space-y-8">
                {/* Tagline */}
                <AnimatedTagline />

                {/* Main Title */}
                <div className="space-y-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0F172A] leading-tight"
                  >
                    Excel College
                    <br />
                    <span className="text-[#064E3B]">of Professional Studies</span>
                  </motion.h1>

                  {/* Decorative Line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="h-1 w-48 bg-gradient-to-r from-[#064E3B] to-[#064E3B]/50 rounded-full"
                  />
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-[#334155] text-lg md:text-xl leading-relaxed max-w-2xl"
                >
                  For over two decades, we have been committed to delivering quality education 
                  with a focus on practical learning and career development. Empowering students 
                  to become leaders in their chosen fields.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 pt-8"
                >
                  <Link
                    href="/components/templates/template3/courses"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#064E3B] text-white font-semibold rounded-lg hover:bg-[#04332A] hover:shadow-xl transition-all duration-300 shadow-lg"
                  >
                    <span>Explore Our Programs</span>
                    <FaArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                  
                  <Link
                    href="/components/templates/template3/contact"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#064E3B] font-semibold rounded-lg border-2 border-[#064E3B] hover:bg-[#064E3B]/5 hover:shadow-lg transition-all duration-300"
                  >
                    <FaCalendarAlt className="h-5 w-5" />
                    <span>Apply Now</span>
                  </Link>
                </motion.div>

                {/* Quick Info */}
              
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
         
        </motion.div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#064E3B]" />
              <div className="p-4 bg-[#064E3B]/10 rounded-xl">
                <FaBookOpen className="h-8 w-8 text-[#064E3B]" />
              </div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#064E3B]" />
            </div>
            
            <h2 className="text-[#0F172A] text-3xl md:text-4xl font-bold mb-4">
              Excellence in Numbers
            </h2>
            <p className="text-[#334155] text-lg max-w-2xl mx-auto">
              Our commitment to quality education reflected through achievements
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {animatedStats.map((stat, index) => (
              <StatItem 
                key={index} 
                stat={stat} 
                index={index} 
                hasAnimated={hasAnimated} 
              />
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 bg-gradient-to-r from-[#F1F5F9] to-white rounded-2xl p-8 border border-gray-200"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-[#0F172A] text-xl font-bold mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  {[
                    "Industry-aligned curriculum",
                    "Practical hands-on training",
                    "Experienced faculty",
                    "Modern facilities",
                    "Career support services",
                    "Global certifications"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-[#334155]">
                      <div className="w-2 h-2 bg-[#064E3B] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-[#0F172A] text-xl font-bold mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                  {[
                    { date: "Dec 15", title: "Open House", desc: "Campus Tour & Program Info" },
                    { date: "Dec 20", title: "Career Fair", desc: "Meet Top Employers" },
                    { date: "Jan 5", title: "Workshop", desc: "Skill Development Session" }
                  ].map((event, index) => (
                    <div key={index} className="flex items-start gap-4 p-3 hover:bg-white rounded-lg transition-colors">
                      <div className="bg-[#064E3B]/10 rounded-lg p-3">
                        <div className="text-[#064E3B] font-bold text-lg">{event.date}</div>
                      </div>
                      <div>
                        <div className="text-[#0F172A] font-semibold">{event.title}</div>
                        <div className="text-[#334155] text-sm">{event.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};