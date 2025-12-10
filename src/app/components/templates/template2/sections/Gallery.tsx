"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  { src: "/gallery/g1.jpg", title: "MAJ (R) MUHAMMAD TARIQ" },
  { src: "/gallery/g2.jpg", title: "MR. NADIR CHATTHA VISIT" },
  { src: "/gallery/g3.jpg", title: "SARAH RASHID DG PSDA" },
  { src: "/gallery/g4.jpg", title: "TRAINING COMPETITIONS AT MANSOL" },
  { src: "/gallery/g5.jpg", title: "MOU SIGNING CEREMONY" },
  { src: "/gallery/g6.jpg", title: "CONTRACT SIGNING MANSOL" },
  { src: "/gallery/g7.jpg", title: "TEAM WORK & PROJECTS" },
  { src: "/gallery/g8.jpg", title: "OFFICIAL INDUSTRY VISITS" },
];

const GallerySection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState<string>("");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const scrollPositionRef = useRef<number>(0);

  const openModal = (img: string) => {
    setCurrentImg(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentImg("");
  };

  // Continuous scrolling animation
  const animate = () => {
    if (sliderRef.current && isAutoPlaying) {
      scrollPositionRef.current += 0.5; // Adjust speed here
      
      if (scrollPositionRef.current >= sliderRef.current.scrollWidth / 2) {
        scrollPositionRef.current = 0;
      }
      
      sliderRef.current.scrollLeft = scrollPositionRef.current;
    }
    
    animationRef.current = requestAnimationFrame(animate);
  };

  // Start/stop animation
  useEffect(() => {
    if (isAutoPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationRef.current);
    }
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isAutoPlaying]);

  // Pause on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Manual scroll with buttons
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  // ESC Key Close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Duplicate images for seamless loop
  const sliderImages = [...galleryImages, ...galleryImages, ...galleryImages];

  return (
    <section className="bg-white py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h3 className="text-lg md:text-xl font-bold text-red-600 uppercase tracking-wide mb-2">
            A Glimpse of Excellence
          </h3>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Gallery
          </h1>
        </div>

        {/* Continuous Slider Container */}
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Continuous Slider */}
          <div 
            ref={sliderRef}
            className="overflow-x-auto scrollbar-hide"
            style={{ cursor: 'grab' }}
          >
            <div className="flex gap-6 md:gap-8 py-4 min-w-max">
              {sliderImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => openModal(img.src)}
                  className="cursor-pointer bg-white border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 w-64 md:w-72 flex-shrink-0"
                >
                  {/* Title Bar */}
                  <div className="bg-gradient-to-r from-purple-900 to-blue-700 p-2 text-center text-yellow-300 font-bold text-xs md:text-sm tracking-wide uppercase truncate">
                    {img.title}
                  </div>

                  {/* Image */}
                  <div className="relative w-full h-48 md:h-56">
                    <Image
                      src={img.src}
                      alt={`Gallery ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 256px, 288px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Auto Play Indicator */}
          
        </div>

        {/* Description */}
       
      </div>

      {/* Modal Popup */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-800 hover:text-black font-bold text-3xl z-10"
              onClick={closeModal}
            >
              &times;
            </button>

            <div className="relative w-full h-[80vh] max-h-[900px]">
              <Image
                src={currentImg}
                alt="Gallery Large"
                fill
                className="object-contain p-6"
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default GallerySection;