"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  FiArrowRight,
  FiCalendar,
  FiChevronDown,
  FiBook,
  FiUsers,
  FiAward,
  FiMapPin
} from "react-icons/fi";

// Editorial black & white images

const EDITORIAL_IMAGES = [
  "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1683887034491-f58b4c4fca72?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
];


// Stats - editorial style
const STATS = [
  { label: "Students worldwide", value: 14500, prefix: "~" },
  { label: "Faculty members", value: 480 },
  { label: "Graduation rate", value: 95, suffix: "%" },
  { label: "Programs offered", value: 42 }
];

// Editorial image with subtle grain
const EditorialImage = ({ src, alt }: { src: string; alt: string }) => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    className="relative h-[320px] md:h-[420px] lg:h-[500px] overflow-hidden bg-[#F6F6F6]"
  >
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover object-center"
      sizes="(max-width: 768px) 100vw, 50vw"
      priority
    />
    {/* Subtle grain overlay for editorial feel */}
    <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }}
    />
    {/* Edge accent - subtle and editorial */}
    <div className="absolute left-0 top-0 bottom-0 w-px bg-[#121212]/10" />
  </motion.div>
);

// Stat counter with editorial typography
const EditorialStat = ({ 
  stat, 
  index 
}: { 
  stat: typeof STATS[0] & { animatedValue: number }; 
  index: number 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.1 + 0.5 }}
    className="border-b border-[#121212]/10 pb-4"
  >
    <div className="text-3xl md:text-4xl font-serif text-[#121212] mb-1 tracking-tight">
      <span className="text-[#4A4A4A] font-light">{stat.prefix}</span>
      {stat.animatedValue.toLocaleString()}
      <span className="text-[#2F5D62] ml-0.5">{stat.suffix}</span>
    </div>
    <div className="text-[#6E6E6E] text-sm tracking-wide uppercase">
      {stat.label}
    </div>
  </motion.div>
);

export const HeroSection: React.FC = () => {
  const [currentImageIndex] = useState(0);
  const [animatedStats, setAnimatedStats] = useState(
    STATS.map(stat => ({ ...stat, animatedValue: 0 }))
  );
  const hasAnimated = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate stats when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          animatedStats.forEach((stat, index) => {
            setTimeout(() => {
              const duration = 2000;
              const startTime = Date.now();
              const endValue = stat.value;
              
              const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(easeOut * endValue);
                
                setAnimatedStats(prev => 
                  prev.map((s, i) => 
                    i === index ? { ...s, animatedValue: current } : s
                  )
                );
                
                if (progress < 1) {
                  requestAnimationFrame(animate);
                }
              };
              
              requestAnimationFrame(animate);
            }, index * 300);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [animatedStats]);

  return (
    <section className="relative min-h-[90vh] bg-white overflow-hidden">
      {/* Textural background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid lines - editorial style */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-[#121212]/[0.03] transform -translate-y-1/2 hidden lg:block" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#121212]/[0.03] transform -translate-x-1/2 hidden lg:block" />
        
        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-16 h-px bg-[#121212]/20 rotate-45 origin-top-left" />
        <div className="absolute bottom-8 right-8 w-16 h-px bg-[#121212]/20 rotate-45 origin-bottom-right" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 md:pt-24 pb-8 md:pb-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left column - Main content */}
          <div className="lg:w-7/12">
            {/* Institutional mark - subtle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-10 md:mb-14"
            >
              <div className="flex items-center gap-3">
                <div className="h-px w-10 bg-[#121212]" />
                <span className="text-[#6E6E6E] text-xs tracking-widest uppercase">
                  Established 1998
                </span>
                <FiMapPin className="h-3 w-3 text-[#6E6E6E]" />
              </div>
            </motion.div>

            {/* Main heading - editorial, thoughtful */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="mb-8 md:mb-12"
            >
              <h1 className="font-serif text-[42px] md:text-[48px] leading-[1.2] tracking-tight text-[#121212] font-medium max-w-2xl">
                Education should teach you 
                <span className="text-[#2F5D62]"> how to think</span>,
                not what to think.
              </h1>
              
              {/* Decorative rule - intentionally short */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 1.5 }}
                className="h-px w-32 bg-[#2F5D62]/30 mt-8 origin-left"
              />
            </motion.div>

            {/* Supporting text - calm and confident */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-12 md:mb-16 max-w-xl"
            >
              <p className="font-sans text-lg text-[#4A4A4A] leading-relaxed mb-6">
                For over two decades, we've focused on building thinkers, not just graduates. 
                Our approach combines rigorous academics with the space to question, explore, 
                and develop your own perspective.
              </p>
              
              <p className="font-sans text-base text-[#6E6E6E] leading-relaxed">
                It's not about having all the answers. It's about knowing 
                how to find them, challenge them, and build upon them.
              </p>
            </motion.div>

            {/* CTA Section - non-aggressive, editorial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-12 md:mb-20"
            >
              <Link
                href="/programs"
                className="group inline-flex items-center gap-3 px-8 py-3.5 border border-[#121212] text-[#121212] hover:text-[#2F5D62] hover:border-[#2F5D62] transition-all duration-300 rounded-md font-sans text-base font-medium"
              >
                <span>Explore programs</span>
                <FiArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/visit"
                className="inline-flex items-center gap-3 px-8 py-3.5 text-[#6E6E6E] hover:text-[#121212] transition-colors duration-300 font-sans text-base"
              >
                <FiCalendar className="h-4 w-4" />
                <span>Schedule campus visit</span>
              </Link>
            </motion.div>

            {/* Stats grid - integrated naturally */}
            <div 
              ref={containerRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-8 border-t border-[#121212]/10"
            >
              {animatedStats.map((stat, index) => (
                <EditorialStat key={stat.label} stat={stat} index={index} />
              ))}
            </div>
          </div>

          {/* Right column - Editorial image */}
          <div className="lg:w-5/12 lg:pt-16">
            <div className="relative">
              <EditorialImage
                src={EDITORIAL_IMAGES[currentImageIndex]}
                alt="University campus - editorial"
              />
              
              {/* Caption - editorial style */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-4 pl-2"
              >
                <div className="h-px w-8 bg-[#121212]/20 mb-2" />
                <p className="text-xs text-[#6E6E6E] italic max-w-xs">
                  Main library reading room. Photograph by academic archives.
                </p>
              </motion.div>
            </div>

            {/* Accreditation notice - subtle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-12 p-4 bg-[#F6F6F6] border border-[#121212]/10"
            >
              <div className="flex items-start gap-3">
                <FiAward className="h-4 w-4 text-[#2F5D62] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#4A4A4A] leading-relaxed">
                  Internationally accredited. Recognized by the Global Education Board since 2005.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator - very subtle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 md:mt-24 flex flex-col items-center"
        >
          <div className="h-12 w-px bg-[#121212]/20 mb-2" />
          <FiChevronDown className="h-4 w-4 text-[#6E6E6E] animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
};