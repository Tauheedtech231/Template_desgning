"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "/manpower.jpg",
    title: "Travel Related",
    subtitle: "WELCOME TO MANSOL",
    description: "Your Trusted Partner In Recruitment, Travel & Consultancy.",
  },
  {
    image: "/manpower1.jpg",
    title: "Engineering Services",
    subtitle: "WELCOME TO MANSOL",
    description: "Providing world-class engineering manpower solutions.",
  },
  {
    image: "/manpower.jpg",
    title: "Technical Training",
    subtitle: "WELCOME TO MANSOL",
    description: "Training skilled workforce for global industries.",
  },
];

const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [typingText, setTypingText] = useState("");

  const handleNext = () => setCurrent((prev) => (prev + 1) % slides.length);
  const handlePrev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, []);

  // Typing Effect
  useEffect(() => {
    const fullText = slides[current].subtitle;
    let i = 0;

    const typingInterval = setInterval(() => {
      setTypingText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(typingInterval);
    }, 75);

    return () => clearInterval(typingInterval);
  }, [current]);

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-12 md:px-24 lg:px-36 z-20">
        {/* Typing Subtitle */}
        <h2 className="text-white text-2xl md:text-4xl uppercase tracking-widest font-semibold mb-3">
          {typingText}
          <span className="text-red-500 animate-pulse">|</span>
        </h2>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold italic leading-tight text-white drop-shadow-xl">
          {slides[current].title}
        </h1>

        <p className="text-lg md:text-xl text-gray-200 max-w-xl mt-4 drop-shadow-md">
          {slides[current].description}
        </p>
      </div>

      {/* View Courses Button */}
      <a
        href="#courses"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 border border-white rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 z-30"
      >
        View Courses
      </a>

      {/* Navigation Arrows - hidden on mobile */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col space-y-6 z-30 hidden md:flex">
        <button
          onClick={handleNext}
          className="bg-white hover:bg-gray-200 text-black p-4 rounded-full transition-all duration-300"
        >
          <ChevronRight size={25} />
        </button>

        <button
          onClick={handlePrev}
          className="bg-white/40 hover:bg-white/70 text-white hover:text-black p-4 rounded-full transition-all duration-300"
        >
          <ChevronLeft size={25} />
        </button>
      </div>

      {/* Scroll Down Animation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce">
        <ChevronDown size={36} className="text-white opacity-80" />
      </div>
    </section>
  );
};

export default HeroSlider;
