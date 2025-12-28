"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {  ChevronRight, ChevronLeft } from "lucide-react";

interface Certificate {
  image: string;
  title: string;
  subtitle: string;
}

const certificates: Certificate[] = [
  { image: "/c1.jpg", title: "Apex Core Engineering", subtitle: "ISO 14001" },
  { image: "/c2.jpg", title: "Apex Core Engineering", subtitle: "ISO 45001" },
  { image: "/c3.jpg", title: "Apex Core Engineering", subtitle: "ISO 9001" },
  { image: "/c4.jpg", title: "MMS (PVT)", subtitle: "LCCI Membership" },
  { image: "/c5.jpg", title: "MTTI", subtitle: "PSDA (1)" },
  { image: "/c6.jpg", title: "MTTI", subtitle: "PSDA (2)" },
  { image: "/c7.jpg", title: "NAVTTC", subtitle: "Registration MTTI Lahore Campus" },
  { image: "/c8.jpg", title: "AWS", subtitle: "Member Institute" },
];



const CertificatesSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentSpeed, setCurrentSpeed] = useState(0.5);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const scrollPositionRef = useRef<number>(0);

  // Right to left continuous scrolling animation
  const animate = () => {
    if (sliderRef.current && isAutoPlaying) {
      scrollPositionRef.current -= currentSpeed; // Negative for right to left
      
      // Reset when scrolled past half
      if (Math.abs(scrollPositionRef.current) >= sliderRef.current.scrollWidth / 2) {
        scrollPositionRef.current = 0;
      }
      
      sliderRef.current.scrollLeft = Math.abs(scrollPositionRef.current);
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
  }, [isAutoPlaying, currentSpeed]);

  // Pause on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Manual scroll buttons - reversed for right to left
  const scrollRight = () => { // Actually moves to next (left)
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const scrollLeft = () => { // Actually moves to previous (right)
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const openModal = (images: string[]) => {
    setModalImages(images);
    setModalOpen(true);
    setIsAutoPlaying(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImages([]);
    setIsAutoPlaying(true);
  };

  // Duplicate certificates for seamless loop - Now for right to left
  const sliderCertificates = [...certificates, ...certificates, ...certificates];

  // Speed control


  return (
    <section className="bg-gradient-to-b from-gray-100 to-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Beautiful Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h3 className="text-lg md:text-xl font-semibold text-red-600 tracking-wide uppercase mb-2">
            Certificates
          </h3>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Recognizing Our <span className="text-blue-700">Commitment</span>
          </h1>
        </div>

        {/* Continuous Slider Container - Now moving from right to left */}
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {/* Navigation Buttons - Swapped for right to left movement */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Continuous Slider - Now moving right to left */}
          <div 
            ref={sliderRef}
            className="overflow-x-auto scrollbar-hide"
            style={{ cursor: 'grab' }}
          >
            <div className="flex gap-6 md:gap-8 py-4 min-w-max">
              {sliderCertificates.map((cert, idx) => (
                <div
                  key={idx}
                  onClick={() => openModal([cert.image])}
                  className="cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden w-64 md:w-72 flex-shrink-0"
                >
                  <div className="relative w-full h-40 md:h-48">
                    <Image
                      src={cert.image}
                      alt={`${cert.title} ${cert.subtitle}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 256px, 288px"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-gray-900 font-bold text-lg mb-1">
                      {cert.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{cert.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Speed and Control Indicator */}
         
        </div>

        {/* CEO Button */}
      

      
      </div>

      {/* Modal */}
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
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 font-bold text-3xl z-10"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className={`grid ${modalImages.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-6 p-6`}>
              {modalImages.map((img, idx) => (
                <div key={idx} className="relative w-full h-64 md:h-80">
                  <Image
                    src={img}
                    alt={`Certificate ${idx + 1}`}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              ))}
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
        
        @keyframes rightToLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default CertificatesSection;