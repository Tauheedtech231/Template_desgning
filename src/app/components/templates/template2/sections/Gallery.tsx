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

export const GallerySection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize ref array
  useEffect(() => {
    imagesRef.current = imagesRef.current.slice(0, galleryImages.length);
  }, []);

  const openModal = (index: number) => {
    setCurrentImg(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImg((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImg((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
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
  }, [modalOpen]);

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
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Blue line animation
      gsap.fromTo(
        ".blue-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Ref callback function
  const setImageRef = (index: number) => (el: HTMLDivElement | null) => {
    imagesRef.current[index] = el;
  };

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(galleryImages.map(img => img.category)))];

  // Filter images by category
  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <section
    id="gallery"
      ref={sectionRef}
      className="relative py-24 bg-black"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, #2563EB 2px, transparent 0%)`,
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-white/70 text-sm font-light tracking-widest uppercase">
              Behind the Scenes
            </span>
          </div>
          
          <h1 className="section-title text-4xl md:text-5xl font-bold text-white mb-4">
            Our Gallery
          </h1>
          
          {/* Blue highlight line */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-1 bg-[#2563EB] blue-line transform origin-center"></div>
          </div>
          
          <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
            Capturing moments of excellence, collaboration, and achievement
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[#2563EB] text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              ref={setImageRef(index)}
              className="gallery-item group relative overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openModal(index)}
            >
              {/* Image Container */}
              <div className="relative h-64">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                {/* Blue Overlay on Hover */}
                <div className="absolute inset-0 bg-[#2563EB]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Expand Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                    <FaExpand className="text-white text-xl" />
                  </div>
                </div>
                
                {/* Image Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-semibold text-sm mb-1">{image.title}</h3>
                  <p className="text-white/70 text-xs">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10">
          {[
            { number: galleryImages.length, label: "Moments Captured", icon: "📸" },
            { number: categories.length - 1, label: "Categories", icon: "🏷️" },
            { number: "500+", label: "Training Sessions", icon: "🎓" },
            { number: "50+", label: "Industry Partners", icon: "🤝" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300"
            >
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/70 text-sm mb-3">{stat.label}</div>
              <div className="text-2xl opacity-70">{stat.icon}</div>
            </div>
          ))}
        </div>

        {/* Navigation Instructions */}
      
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Navigation Buttons */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
            aria-label="Previous image"
          >
            <FaChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
            aria-label="Next image"
          >
            <FaChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-white/80 font-bold text-3xl z-10 p-2"
            onClick={closeModal}
          >
            &times;
          </button>

          {/* Image Info */}
          <div className="absolute bottom-4 left-0 right-0 text-center z-10">
            <h3 className="text-white text-xl font-semibold mb-1">
              {galleryImages[currentImg].title}
            </h3>
            <p className="text-white/70 text-sm">{galleryImages[currentImg].category}</p>
            <p className="text-white/60 text-xs mt-2">
              {currentImg + 1} / {galleryImages.length}
            </p>
          </div>

          {/* Modal Content */}
          <div
            className="relative w-full max-w-6xl h-[80vh] max-h-[900px]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[currentImg].src}
              alt={galleryImages[currentImg].title}
              fill
              className="object-contain p-4"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </section>
  );
};