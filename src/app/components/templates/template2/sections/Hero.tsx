"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles, Target, Zap, Shield, TrendingUp, Star, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "/manpower.jpg",
    title: "Mansol Institute",
    subtitle: "Building Leaders for Tomorrow",
    description: "Delivering disciplined education, practical learning, and career-focused programs.",
    feature: "NEBOSH & IOSH Certified",
    icon: <Shield className="h-4 w-4" />
  },
  {
    image: "/manpower1.jpg",
    title: "Safety First",
    subtitle: "Where Learning Meets Purpose",
    description: "Empowering students with industry-aligned knowledge and real-world skills.",
    feature: "100% Practical Training",
    icon: <Zap className="h-4 w-4" />
  },
  {
    image: "/manpower.jpg",
    title: "Global Standards",
    subtitle: "Educating Minds. Shaping Futures.",
    description: "A modern institute committed to excellence, integrity, and long-term success.",
    feature: "International Certifications",
    icon: <Award className="h-4 w-4" />
  },
];

const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  // Auto slide
  useEffect(() => {
    if (isHovered) return;
    
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => clearTimeout(timer);
  }, [current, isHovered]);

  return (
    <section 
      className="relative h-screen w-full overflow-hidden bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Attractive Layer */}
      <div className="absolute top-0 left-0 right-0 z-30">
        {/* Animated Gradient Bar */}
        <div className="relative h-2 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] via-[#F97316] to-[#06B6D4]"
            animate={{ 
              backgroundPosition: ['0%', '200%'],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ 
              backgroundSize: '200% 100%',
              backgroundImage: 'linear-gradient(90deg, #06B6D4 0%, #F97316 50%, #06B6D4 100%)'
            }}
          />
        </div>

        {/* Floating Badge Strip */}
        <div className="bg-black/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-3">
              <div className="flex items-center justify-between">
                {/* Left: Animated Features */}
                <div className="flex items-center gap-6 overflow-hidden">
                  <motion.div 
                    className="flex items-center gap-6"
                    animate={{ x: [0, -100, 0] }}
                    transition={{ 
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {[
                      { icon: <Star className="h-3 w-3 text-[#F97316]" />, text: "International Recognition" },
                      { icon: <Target className="h-3 w-3 text-[#06B6D4]" />, text: "Industry Experts" },
                      { icon: <TrendingUp className="h-3 w-3 text-[#10B981]" />, text: "95% Placement Rate" },
                      { icon: <Shield className="h-3 w-3 text-[#F97316]" />, text: "Certified Training" },
                      { icon: <Zap className="h-3 w-3 text-[#06B6D4]" />, text: "Hands-on Practical" },
                      { icon: <Award className="h-3 w-3 text-[#10B981]" />, text: "Global Certifications" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          {item.icon}
                        </div>
                        <span className="text-xs font-medium text-white/90">
                          {item.text}
                        </span>
                        <div className="h-3 w-px bg-white/20 mx-2"></div>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Right: Live Indicator */}
                <div className="hidden lg:flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-white/80">LIVE TRAINING</span>
                  </div>
                  <div className="h-3 w-px bg-white/20 mx-2"></div>
                  <div className="text-xs text-white/60">
                    Batch Starting: <span className="text-white font-medium">15 Dec 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Glowing Edge Effect */}
        <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>

      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
          {/* Gradient Overlay - Centered focus */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container - Centered */}
      <div className="relative z-10 h-full flex items-center justify-center pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Feature Tag - Centered */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 mb-8 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20"
              >
                <div className="flex items-center justify-center">
                  {slides[current].icon}
                </div>
                <span className="text-sm font-medium text-white">
                  {slides[current].feature}
                </span>
              </motion.div>

              {/* Title - Centered */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                {slides[current].title}
              </h1>

              {/* Subtitle - Centered */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#F97316]"></div>
                <h2 className="text-2xl md:text-3xl text-gray-300 font-medium">
                  {slides[current].subtitle}
                </h2>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#F97316]"></div>
              </div>

              {/* Description - Centered */}
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                {slides[current].description}
              </p>

              {/* CTA Buttons - Centered */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="/components/templates/template2/courses"
                  className="group px-10 py-4 bg-gradient-to-r from-[#06B6D4] to-[#0891b2] text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 shadow-lg"
                >
                  <span>Explore Our Courses</span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </a>
                
                <a
                  href="/components/templates/template2/contact"
                  className="px-10 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/50 hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
                >
                  Free Consultation
                </a>
              </div>

              {/* Trust Badge - Centered */}
              <div className="mt-16 inline-flex items-center gap-4 bg-black/40 backdrop-blur-sm rounded-full px-8 py-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#0891b2] flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white">Government Recognized</div>
                    <div className="text-xs text-gray-400">TEVTA & PSB Registered</div>
                  </div>
                </div>
                <div className="h-8 w-px bg-white/20"></div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white">15+ Years Experience</div>
                    <div className="text-xs text-gray-400">Industry Leaders</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* NEW: Modern Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Slide Number with 0 Padding */}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">0{current + 1}</span>
              <span className="text-white/60 mx-1">/</span>
              <span className="text-xl text-white/40">0{slides.length}</span>
            </div>

            {/* Center: Slide Dots */}
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative group"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div className={`h-1 rounded-full transition-all duration-300 ${
                    current === index 
                      ? 'w-8 bg-gradient-to-r from-[#06B6D4] to-[#F97316]' 
                      : 'w-3 bg-white/40 group-hover:bg-white/60'
                  }`} />
                </button>
              ))}
            </div>

            {/* Right: Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Sparkles */}
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + i * 3}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="h-5 w-5 text-[#06B6D4]/30" />
        </motion.div>
      ))}

      {/* Floating Elements - Bottom Corners */}
      <motion.div
        className="absolute bottom-28 left-10"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
            <Target className="h-6 w-6 text-[#06B6D4]" />
          </div>
          <div className="text-xs text-white/60">Safety First</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-28 right-10"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-[#F97316]" />
          </div>
          <div className="text-xs text-white/60">Career Growth</div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSlider;