"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaExpand, FaChevronLeft, FaChevronRight, FaCamera } from "react-icons/fa";
import gsap from "gsap";

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
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Gallery data with slight variations for organic feel
  const galleryImages: GalleryImage[] = [
    { 
      src: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Main Campus Building", 
      category: "Campus" 
    },
    { 
      src: "https://images.unsplash.com/photo-1524178234883-043d5c3f3cf4?w=800&auto=format&fit=crop&q=80", 
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

  // GSAP animations for image entrance
  useEffect(() => {
    if (!galleryRef.current || filteredImages.length === 0) return;

    const ctx = gsap.context(() => {
      // Reset all images to initial state
      gsap.set(imagesRef.current.filter(Boolean), {
        opacity: 0,
        y: 50,
        rotateY: 10,
        scale: 0.9
      });

      // Staggered entrance animation
      gsap.to(imagesRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.2)",
        delay: 0.2
      });

      // Continuous subtle floating animation
      imagesRef.current.filter(Boolean).forEach((img, index) => {
        if (!img) return;
        
        gsap.to(img, {
          y: -5,
          duration: 2 + Math.random() * 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.1
        });
      });

    }, galleryRef);

    return () => ctx.revert();
  }, [filteredImages, activeCategory]);

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
    
    // GSAP animation for modal opening
    gsap.fromTo(".modal-content", 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.2)" }
    );
  };

  const closeModal = () => {
    // GSAP animation for modal closing
    gsap.to(".modal-content", {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: "back.in(1.2)",
      onComplete: () => setModalOpen(false)
    });
  };

  const nextImage = () => {
    // Slide out animation
    gsap.to(".modal-image", {
      x: -100,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        setCurrentImg((prev) => (prev + 1) % filteredImages.length);
        // Slide in animation
        gsap.fromTo(".modal-image",
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }
    });
  };

  const prevImage = () => {
    // Slide out animation
    gsap.to(".modal-image", {
      x: 100,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        setCurrentImg((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
        // Slide in animation
        gsap.fromTo(".modal-image",
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }
    });
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
      {/* Hero Section with improved design */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1728403885859-c1b9f060e6c2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Campus gallery"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 via-teal-800/20 to-transparent" />
        
        {/* Overlay content with improved design */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  <span className="text-teal-600">Campus</span>
                  <span className="text-white ml-3">Gallery</span>
                </h1>
                
                <div className="h-1 w-20 bg-teal-500/50 mb-6"></div>
                
                <p className="text-lg text-white/90 leading-relaxed max-w-xl font-light">
                  Explore our vibrant campus through a curated collection of moments 
                  that showcase our community, facilities, and daily life.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery content section */}
      <section
        ref={sectionRef}
        className="relative bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          {/* Category filter - improved design */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-16 justify-center"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full transition-all duration-300 text-sm font-medium hover:scale-105 active:scale-95 ${
                  activeCategory === category
                    ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-teal-400 hover:text-teal-600"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Gallery grid - organic, masonry-like layout */}
          <div 
            ref={galleryRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 auto-rows-[200px]"
          >
            {filteredImages.map((image, index) => {
              const style = getImageStyle(index);
              
              return (
                <div
                  key={`${image.src}-${index}`}
                  ref={el => { imagesRef.current[index] = el; }}
                  className={`relative group cursor-pointer ${style.colSpan} ${style.rowSpan}`}
                  onClick={() => openModal(index)}
                >
                  {/* Image container with hover effects */}
                  <div 
                    className={`relative w-full h-full overflow-hidden ${style.aspect} ${style.rotation} transition-all duration-500 group-hover:rotate-0 group-hover:scale-[1.02]`}
                    style={{ 
                      borderRadius: '12px',
                      marginTop: index % 3 === 0 ? '0' : index % 3 === 1 ? '6px' : '-6px'
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/0 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/20 transition-all duration-500" />
                    
                    {/* Expand icon */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <FaExpand className="h-4 w-4 text-teal-600" />
                      </div>
                    </div>
                    
                    {/* Image caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="text-white">
                        <div className="text-base font-semibold mb-1.5">{image.title}</div>
                        <div className="flex items-center gap-2">
                          <span className="inline-block w-2 h-2 rounded-full bg-teal-400"></span>
                          <span className="text-sm text-white/90">{image.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating effect border */}
                    <div className="absolute inset-0 border-2 border-white/0 group-hover:border-teal-400/30 transition-all duration-500 rounded-[12px]"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredImages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-teal-100 to-teal-50 flex items-center justify-center border border-teal-200">
                <FaCamera className="h-10 w-10 text-teal-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                No Images Found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {activeCategory === "All" 
                  ? "Gallery images will be available soon."
                  : `No ${activeCategory.toLowerCase()} images available. Try another category.`
                }
              </p>
            </motion.div>
          )}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {modalOpen && filteredImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
              onClick={closeModal}
            >
              {/* Navigation buttons with improved design */}
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 group/nav"
                aria-label="Previous image"
              >
                <FaChevronLeft className="w-6 h-6 text-white group-hover/nav:text-teal-300 transition-colors" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 group/nav"
                aria-label="Next image"
              >
                <FaChevronRight className="w-6 h-6 text-white group-hover/nav:text-teal-300 transition-colors" />
              </button>

              {/* Close button */}
              <button
                className="absolute top-4 right-4 md:top-8 md:right-8 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white hover:text-teal-300 hover:border-teal-300 transition-all duration-300 hover:scale-110 text-xl font-light"
                onClick={closeModal}
              >
                ×
              </button>

              {/* Image info with improved design */}
              <div className="absolute bottom-8 left-0 right-0 z-20">
                <div className="max-w-2xl mx-auto px-4">
                  <motion.div
                    key={currentImg}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-white text-xl font-semibold mb-2 text-center">
                      {filteredImages[currentImg].title}
                    </h3>
                    <div className="flex items-center justify-center gap-6 text-sm">
                      <span className="px-3 py-1 rounded-full bg-teal-600/20 text-teal-300 border border-teal-600/30">
                        {filteredImages[currentImg].category}
                      </span>
                      <span className="text-white/70">
                        {currentImg + 1} / {filteredImages.length}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Modal content */}
              <div
                className="modal-content relative w-full max-w-6xl h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-image relative w-full h-full">
                  <Image
                    src={filteredImages[currentImg].src}
                    alt={filteredImages[currentImg].title}
                    fill
                    className="object-contain rounded-lg"
                    sizes="100vw"
                  />
                </div>
              </div>

              {/* Background pattern */}
              <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:40px_40px]"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-200/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-200/30 to-transparent" />
      </section>
    </>
  );
};

export default GallerySection;