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
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Gallery data with slight variations for organic feel
  const galleryImages: GalleryImage[] = [
    { 
      src: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Main campus building", 
      category: "Campus" 
    },
    { 
      src: "https://images.unsplash.com/photo-1524178234883-043d5c3f3cf4?w=800&auto=format&fit=crop&q=80", 
      title: "University library", 
      category: "Facilities" 
    },
    { 
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80", 
      title: "Science laboratory", 
      category: "Facilities" 
    },
    { 
      src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=80", 
      title: "Classroom lecture", 
      category: "Academics" 
    },
    { 
      src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80", 
      title: "Student discussion", 
      category: "Student Life" 
    },
    { 
      src: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=800&auto=format&fit=crop&q=80", 
      title: "Campus cafeteria", 
      category: "Campus" 
    },
    { 
      src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80", 
      title: "Graduation ceremony", 
      category: "Events" 
    },
    { 
      src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=80", 
      title: "Sports facility", 
      category: "Facilities" 
    },
  ];

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(galleryImages.map(img => img.category)))];

  // Filter images by category
  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  // Calculate image aspect ratios for organic layout
  const getImageStyle = (index: number) => {
    const aspectRatios = [
      'aspect-[4/3]',   // 4:3
      'aspect-[3/4]',   // 3:4
      'aspect-square',  // 1:1
      'aspect-[16/9]',  // 16:9
      'aspect-[4/5]',   // 4:5
      'aspect-[3/2]',   // 3:2
      'aspect-[2/3]',   // 2:3
      'aspect-[5/4]',   // 5:4
    ];
    
    const rotations = [
      '-rotate-1',
      'rotate-1',
      '-rotate-0.5',
      'rotate-0.5',
      '-rotate-1',
      'rotate-1',
      '-rotate-0.5',
      'rotate-0.5',
    ];
    
    const shadows = [
      'shadow-sm',
      'shadow-md',
      'shadow-sm',
      'shadow-lg',
      'shadow-md',
      'shadow-sm',
      'shadow-md',
      'shadow-sm',
    ];
    
    return {
      aspect: aspectRatios[index % aspectRatios.length],
      rotation: rotations[index % rotations.length],
      shadow: shadows[index % shadows.length],
      colSpan: index % 5 === 0 ? 'lg:col-span-2' : 'lg:col-span-1',
      rowSpan: index % 3 === 0 ? 'lg:row-span-2' : 'lg:row-span-1'
    };
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
      {/* Hero Section with background image */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1728403885859-c1b9f060e6c2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Campus gallery"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Overlay content with organic alignment */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              
              
              <h1 className="font-serif text-4xl md:text-5xl font-medium text-[#E86A58] mb-6 leading-tight">
                Campus gallery
              </h1>
              
              <p className="text-lg text-white/90 leading-relaxed max-w-xl">
                A collection of moments and spaces that show what happens here. 
                Each image tells a part of the story.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery content section */}
      <section
        ref={sectionRef}
        className="relative bg-[#FAFAFA] overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          {/* Category filter - minimal design */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                    activeCategory === category
                      ? "bg-[#1E1E1E] text-white"
                      : "bg-white text-[#5A5A5A] border border-[#E5E5E5] hover:border-[#1E1E1E]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Gallery grid - organic, masonry-like layout */}
          <div 
            ref={galleryRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px]"
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => {
                const style = getImageStyle(index);
                
                return (
                  <motion.div
                    key={`${image.src}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.05,
                      ease: "easeOut"
                    }}
                    className={`relative group cursor-pointer ${style.colSpan} ${style.rowSpan}`}
                    onClick={() => openModal(index)}
                  >
                    {/* Image container with variations */}
                    <div 
                      className={`relative w-full h-full overflow-hidden ${style.aspect} ${style.rotation} transition-all duration-500 group-hover:rotate-0`}
                      style={{ 
                        borderRadius: index % 2 === 0 ? '12px' : '16px',
                        marginTop: index % 3 === 0 ? '0' : index % 3 === 1 ? '8px' : '-8px'
                      }}
                    >
                      <Image
                        src={image.src}
                        alt={image.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* Subtle overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                      
                      {/* Expand icon - appears on hover */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                          <FaExpand className="h-4 w-4 text-[#1E1E1E]" />
                        </div>
                      </div>
                      
                      {/* Image caption - subtle appearance */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="text-white">
                          <div className="text-sm font-medium mb-1">{image.title}</div>
                          <div className="text-xs text-white/80">{image.category}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty state - minimal design */}
          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#E5E5E5] flex items-center justify-center">
                <FaCamera className="h-8 w-8 text-[#5A5A5A]" />
              </div>
              <h3 className="text-xl font-medium text-[#1E1E1E] mb-3">
                No images here yet
              </h3>
              <p className="text-[#5A5A5A] max-w-md mx-auto">
                {activeCategory === "All" 
                  ? "Check back soon for updates to the gallery."
                  : `No ${activeCategory.toLowerCase()} images available at the moment.`
                }
              </p>
            </div>
          )}

          {/* Gallery note - organic placement */}
       
        </div>

        {/* Modal - clean, minimal design */}
        <AnimatePresence>
          {modalOpen && filteredImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
              onClick={closeModal}
            >
              {/* Navigation buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-[#E86A58] transition-colors duration-300"
                aria-label="Previous image"
              >
                <FaChevronLeft className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-[#E86A58] transition-colors duration-300"
                aria-label="Next image"
              >
                <FaChevronRight className="w-5 h-5 text-white" />
              </button>

              {/* Close button */}
              <button
                className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-[#E86A58] transition-colors duration-300 z-10 text-2xl font-light"
                onClick={closeModal}
              >
                ×
              </button>

              {/* Image info */}
              <div className="absolute bottom-8 left-0 right-0 text-center z-10">
                <div className="max-w-2xl mx-auto px-4">
                  <h3 className="text-white text-lg font-medium mb-1">
                    {filteredImages[currentImg].title}
                  </h3>
                  <div className="flex items-center justify-center gap-4 text-sm text-white/70">
                    <span>{filteredImages[currentImg].category}</span>
                    <span>·</span>
                    <span>{currentImg + 1} of {filteredImages.length}</span>
                  </div>
                </div>
              </div>

              {/* Modal content */}
              <div
                className="relative w-full max-w-5xl h-[80vh]"
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
                    className="object-contain"
                    sizes="100vw"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle section separator */}
        <div className="h-px bg-[#E5E5E5] max-w-4xl mx-auto" />
      </section>
    </>
  );
};

export default GallerySection;