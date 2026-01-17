"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaExpand, FaChevronLeft, FaChevronRight, FaCamera } from "react-icons/fa";

interface GalleryImage {
  src: string;
  title: string;
  category: string;
}

const GallerySection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Gallery data
  const galleryImages: GalleryImage[] = [
    { 
      src: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Main Campus Building", 
      category: "Campus" 
    },
    { 
      src: "https://images.unsplash.com/photo-1588581939864-064d42ace7cd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "University Library", 
      category: "Facilities" 
    },
    { 
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80", 
      title: "Science Laboratory", 
      category: "Facilities" 
    },
    { 
      src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=80", 
      title: "Classroom Lecture", 
      category: "Academics" 
    },
    { 
      src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80", 
      title: "Student Discussion", 
      category: "Student Life" 
    },
    { 
      src: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=800&auto=format&fit=crop&q=80", 
      title: "Campus Cafeteria", 
      category: "Campus" 
    },
    { 
      src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80", 
      title: "Graduation Ceremony", 
      category: "Events" 
    },
    { 
      src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=80", 
      title: "Sports Facility", 
      category: "Facilities" 
    },
  ];

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(galleryImages.map(img => img.category)))];

  // Filter images by category
  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  // Initialize image loaded states
  useEffect(() => {
    setImagesLoaded(new Array(galleryImages.length).fill(false));
  }, []);

  // Handle image load
  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const getGridColumnSpan = (index: number) => {
    const patterns = [
      'md:col-span-2',
      'md:col-span-1',
      'md:col-span-1',
      'md:col-span-1',
      'md:col-span-2',
      'md:col-span-1',
      'md:col-span-1',
      'md:col-span-1',
    ];
    return patterns[index % patterns.length];
  };

  const getGridRowSpan = (index: number) => {
    const patterns = [
      'md:row-span-2',
      'md:row-span-1',
      'md:row-span-1',
      'md:row-span-1',
      'md:row-span-1',
      'md:row-span-2',
      'md:row-span-1',
      'md:row-span-1',
    ];
    return patterns[index % patterns.length];
  };

  const getAspectRatio = (index: number) => {
    const ratios = [
      'aspect-[4/3]',
      'aspect-[3/2]',
      'aspect-square',
      'aspect-[3/4]',
      'aspect-[16/9]',
      'aspect-[4/5]',
      'aspect-[3/2]',
      'aspect-square',
    ];
    return ratios[index % ratios.length];
  };

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

  return (
    <>
      {/* Hero Section with Video Background */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source 
              src="/data/about3.mp4"
              type="video/mp4" 
            />
            Your browser does not support the video tag.
          </video>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60" />
        </div>

        {/* Content with sliding animations */}
        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl w-full text-center">
            {/* Heading with smooth left-right sliding animation */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="mb-6"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Campus Gallery
              </h1>
            </motion.div>

            {/* Underline with width animation */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "180px" }}
              transition={{
                duration: 1,
                delay: 0.6,
                ease: "easeOut"
              }}
              className="h-1 bg-gradient-to-r from-teal-400 to-teal-300 mx-auto mb-8 rounded-full"
            />

            {/* Description with smooth right-left sliding animation */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="max-w-2xl mx-auto"
            >
              <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
                Discover our vibrant campus through a curated collection of photographs showcasing facilities, 
                student life, and academic excellence.
              </p>
            </motion.div>

            {/* CTA Button with fade in */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.8,
                ease: "easeOut"
              }}
              className="mt-12"
            >
              <button
                onClick={() => sectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-8 py-3.5 bg-teal-600 backdrop-blur-lg border border-white/30 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/10 inline-flex items-center gap-3"
              >
                <span>Explore Gallery</span>
                <svg 
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Floating elements for visual interest */}
        <motion.div
          animate={{ 
            x: [0, 20, 0],
            y: [0, -15, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-10 w-4 h-4 rounded-full bg-teal-400/30 blur-sm"
        />
        <motion.div
          animate={{ 
            x: [0, -15, 0],
            y: [0, 20, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            delay: 1
          }}
          className="absolute bottom-1/4 right-12 w-3 h-3 rounded-full bg-white/20 blur-sm"
        />
      </div>

      {/* Gallery Content Section */}
      <section
        ref={sectionRef}
        className="relative bg-gray-50 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse Collection
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Filter images by category to explore specific areas of our campus
            </p>
          </div>

          {/* Category Filter - Rounded buttons */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 text-sm font-medium ${
                    activeCategory === category
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-500/25"
                      : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredImages.map((image, index) => {
              const colSpan = getGridColumnSpan(index);
              const rowSpan = getGridRowSpan(index);
              const aspectRatio = getAspectRatio(index);
              
              return (
                <motion.div
                  key={`${image.src}-${index}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeOut" 
                  }}
                  className={`relative ${colSpan} ${rowSpan}`}
                >
                  <div 
                    className="group relative w-full h-full overflow-hidden rounded-2xl cursor-pointer bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => openModal(index)}
                  >
                    {/* Image container */}
                    <div className={`relative ${aspectRatio} w-full overflow-hidden`}>
                      <Image
                        src={image.src}
                        alt={image.title}
                        fill
                        className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                          imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
                        }`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        onLoadingComplete={() => handleImageLoad(index)}
                        priority={index < 4}
                      />
                      
                      {/* Loading skeleton */}
                      {!imagesLoaded[index] && (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-2xl" />
                      )}
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                      
                      {/* Category badge */}
                      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-3 py-1.5 bg-white/90 text-teal-700 text-xs font-medium rounded-full shadow-sm">
                          {image.category}
                        </span>
                      </div>
                      
                      {/* Expand icon */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                          <FaExpand className="h-4 w-4 text-teal-600" />
                        </div>
                      </div>
                      
                      {/* Image caption */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <h3 className="text-white text-lg font-semibold truncate">{image.title}</h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-teal-50 flex items-center justify-center">
                <FaCamera className="h-10 w-10 text-teal-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                No Images Found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                {activeCategory === "All" 
                  ? "Gallery images will be available soon."
                  : `No ${activeCategory.toLowerCase()} images available. Try another category.`
                }
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="px-6 py-3 bg-teal-500 text-white rounded-full font-medium hover:bg-teal-600 transition-colors duration-300"
              >
                View All Images
              </button>
            </div>
          )}
          
      
        </div>

        {/* Modal */}
        <AnimatePresence mode="wait">
          {modalOpen && filteredImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
              onClick={closeModal}
            >
              {/* Navigation buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                aria-label="Previous image"
              >
                <FaChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                aria-label="Next image"
              >
                <FaChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Close button */}
              <button
                className="absolute top-6 right-6 md:top-8 md:right-8 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white hover:text-teal-300 hover:border-teal-300 transition-all duration-300 text-xl"
                onClick={closeModal}
              >
                ×
              </button>

              {/* Image info */}
              <div className="absolute bottom-8 left-0 right-0 z-20">
                <div className="max-w-2xl mx-auto px-6">
                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                    <h3 className="text-white text-xl font-semibold mb-2 text-center">
                      {filteredImages[currentImg].title}
                    </h3>
                    <div className="flex items-center justify-center gap-4">
                      <span className="px-4 py-1.5 rounded-full bg-teal-600/30 text-teal-300 border border-teal-600/30 text-sm">
                        {filteredImages[currentImg].category}
                      </span>
                      <span className="text-white/80 text-sm">
                        {currentImg + 1} / {filteredImages.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal content */}
              <div
                className="relative w-full max-w-6xl h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  key={currentImg}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={filteredImages[currentImg].src}
                    alt={filteredImages[currentImg].title}
                    fill
                    className="object-contain rounded-2xl"
                    sizes="100vw"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default GallerySection;