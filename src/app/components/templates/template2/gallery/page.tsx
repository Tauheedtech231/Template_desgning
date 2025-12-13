"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const galleryImages = [
  { src: "/gallery/g1.jpg", title: "MAJ (R) MUHAMMAD TARIQ", category: "Leadership" },
  { src: "/gallery/g2.jpg", title: "MR. NADIR CHATTHA VISIT", category: "Industry Visit" },
  { src: "/gallery/g3.jpg", title: "SARAH RASHID DG PSDA", category: "Government Official" },
  { src: "/gallery/g4.jpg", title: "TRAINING COMPETITIONS AT MANSOL", category: "Training" },
  { src: "/gallery/g5.jpg", title: "MOU SIGNING CEREMONY", category: "Partnership" },
  { src: "/gallery/g6.jpg", title: "CONTRACT SIGNING MANSOL", category: "Business" },
  { src: "/gallery/g7.jpg", title: "TEAM WORK & PROJECTS", category: "Team Activities" },
  { src: "/gallery/g8.jpg", title: "OFFICIAL INDUSTRY VISITS", category: "Industry Engagement" },
];

const GallerySection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const sectionRef = useRef<HTMLDivElement>(null);

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(galleryImages.map(img => img.category)))];

  // Filter images by category
  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openModal = (index: number) => {
    setCurrentImg(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImg((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImg((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalOpen) return;
      
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen, filteredImages.length]);

  // Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(
        ".section-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      // Gallery items animation
      gsap.fromTo(
        ".gallery-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Category buttons animation
      gsap.fromTo(
        ".category-btn",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-16 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-5">
            Campus Gallery
          </h2>
          <p className="text-base text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Capturing moments of excellence, collaboration, and achievement at our campus
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`category-btn px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                activeCategory === category
                  ? "bg-[#06B6D4] text-white shadow-md shadow-[#06B6D4]/20"
                  : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="gallery-item group relative overflow-hidden rounded-lg cursor-pointer border border-gray-200 hover:border-[#06B6D4] transition-all duration-300 hover:shadow-xl hover:shadow-[#06B6D4]/20"
              onClick={() => openModal(index)}
            >
              {/* Image Container */}
              <div className="relative aspect-square">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Expand Icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <FaExpand className="text-white text-lg" />
                    </div>
                  </div>
                  
                  {/* Image Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-sm font-semibold mb-1">{image.title}</h3>
                    <p className="text-xs text-white/80">{image.category}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Navigation Buttons - Teal color */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[#06B6D4] hover:bg-[#14B8A6] transition-all duration-300 shadow-lg"
            aria-label="Previous image"
          >
            <FaChevronLeft className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[#06B6D4] hover:bg-[#14B8A6] transition-all duration-300 shadow-lg"
            aria-label="Next image"
          >
            <FaChevronRight className="w-5 h-5 text-white" />
          </button>

          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 font-bold text-2xl z-10 p-2"
            onClick={closeModal}
          >
            &times;
          </button>

          {/* Image Info */}
          <div className="absolute bottom-4 left-0 right-0 text-center z-10">
            <h3 className="text-white text-lg font-semibold mb-1">
              {filteredImages[currentImg].title}
            </h3>
            <p className="text-white/70 text-sm">{filteredImages[currentImg].category}</p>
            <p className="text-white/60 text-xs mt-2">
              {currentImg + 1} / {filteredImages.length}
            </p>
          </div>

          {/* Modal Content */}
          <div
            className="relative w-full max-w-5xl h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filteredImages[currentImg].src}
              alt={filteredImages[currentImg].title}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;