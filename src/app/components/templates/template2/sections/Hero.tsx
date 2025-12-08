"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
   image:
      "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1470&q=80",
    title: "Technical Training Institute",
    subtitle: "Welcome to Mansol",
    description:
      "We train skilled workforce for construction, engineering & industrial projects nationwide.",
  },
  {
   image:
      "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1470&q=80",
    title: "Engineering Services",
    subtitle: "Welcome to Mansol",
    description:
      "Providing world-class engineering manpower and consultancy for high-value plants.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1470&q=80", // Language & Certification
    title: "Language & Certification Centers",
    subtitle: "Welcome to Mansol",
    description:
      "Learn Korean, Japanese & international safety certifications to boost your career globally.",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    const next = (current + 1) % slides.length;
    gsap.to(slideRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => setCurrent(next),
    });
    gsap.to(slideRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      delay: 1,
      ease: "power2.inOut",
    });
  };

  const handlePrev = () => {
    const prev = (current - 1 + slides.length) % slides.length;
    gsap.to(slideRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => setCurrent(prev),
    });
    gsap.to(slideRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      delay: 1,
      ease: "power2.inOut",
    });
  };

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [current]);

  // Parallax
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 25;
      const y = (e.clientY / innerHeight - 0.5) * 25;
      gsap.to(bgRef.current, { x, y, duration: 1, ease: "power2.out" });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Cursor Glow Trail
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.15,
          ease: "power2.out",
        });

        const smoke = document.createElement("span");
        smoke.style.position = "fixed";
        smoke.style.left = `${e.clientX}px`;
        smoke.style.top = `${e.clientY}px`;
        smoke.style.width = "10px";
        smoke.style.height = "10px";
        smoke.style.borderRadius = "50%";
        smoke.style.background = "rgba(242,140,40,0.4)";
        smoke.style.boxShadow = "0 0 20px rgba(242,140,40,0.5)";
        smoke.style.pointerEvents = "none";
        smoke.style.zIndex = "9998";
        smoke.style.transform = "translate(-50%, -50%)";
        smoke.style.animation = "smoke 1.2s ease-out forwards";
        document.body.appendChild(smoke);
        setTimeout(() => smoke.remove(), 1200);
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0">
        <Image
          src={slides[current].image}
          alt={slides[current].title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
      </div>

      {/* Text */}
      <div
        ref={slideRef}
        className="absolute inset-0 flex flex-col justify-center items-start md:items-start text-left px-8 md:px-20 lg:px-32 z-20"
      >
        <h2 className="text-lg md:text-2xl text-[#F28C28] font-semibold mb-2">
          {slides[current].subtitle}
        </h2>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg">
          {slides[current].title}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
          {slides[current].description}
        </p>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-30">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-white/30 hover:bg-white/50 text-gray-800 shadow-lg transition-all duration-300"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-white/30 hover:bg-white/50 text-gray-800 shadow-lg transition-all duration-300"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Scroll Icon */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce">
        <ChevronDown size={36} className="text-white opacity-80" />
      </div>

      {/* Glowing Orange Circle */}
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 rounded-full bg-[#F28C28]/70 shadow-[0_0_25px_rgba(242,140,40,0.8)] pointer-events-none z-[9999]"
        style={{
          transform: "translate(-50%, -50%)",
          transition: "transform 0.15s ease-out",
        }}
      />

      {/* Smoke animation */}
      <style jsx>{`
        @keyframes smoke {
          0% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1);
            filter: blur(0);
          }
          50% {
            opacity: 0.4;
            transform: translate(-50%, -60%) scale(2);
            filter: blur(3px);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -90%) scale(3);
            filter: blur(6px);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;
