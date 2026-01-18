"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const galleryItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Static generic gallery data
  const galleryImages: GalleryImage[] = [
    
    { 
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2NpZW5jZSUyMGxhYnxlbnwwfHwwfHx8MA%3D%3D", 
      title: "Science Laboratory", 
      category: "Facilities" 
    },
    { 
      src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xhc3Nyb29tJTIwbGVjdHVyZXxlbnwwfHwwfHx8MA%3D%3D", 
      title: "Classroom Lecture", 
      category: "Academics" 
    },
    { 
      src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3R1ZGVudHMlMjBkaXNjdXNzaW5nfGVufDB8fDB8fHww", 
      title: "Student Discussion", 
      category: "Student Life" 
    },
    { 
      src: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FmZXRlcmlhfGVufDB8fDB8fHww", 
      title: "Campus Cafeteria", 
      category: "Campus" 
    },
    { 
      src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhZHVhdGlvbiUyMGNlcmVtb255fGVufDB8fDB8fHww", 
      title: "Graduation Ceremony", 
      category: "Events" 
    },
    { 
      src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BvcnRzJTIwZmFjaWxpdHl8ZW58MHx8MHx8fDA%3D", 
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
      // Section title animation with left-right movement
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { 
            x: -100, 
            opacity: 0,
            filter: "blur(10px)"
          },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Description animation with right-left movement
      if (descriptionRef.current) {
        gsap.fromTo(
          descriptionRef.current,
          { 
            x: 100, 
            opacity: 0,
            filter: "blur(8px)"
          },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: descriptionRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Gallery items animation with alternating directions
      galleryItemsRef.current.forEach((item, index) => {
        if (item) {
          const direction = index % 2 === 0 ? -50 : 50;
          gsap.fromTo(
            item,
            { 
              x: direction, 
              opacity: 0,
              scale: 0.9,
              rotate: index % 2 === 0 ? -5 : 5
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 0.8,
              delay: index * 0.1,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
              },
            }
          );
        }
      });

      // Category buttons animation with scale
      gsap.fromTo(
        ".category-btn",
        { 
          opacity: 0, 
          scale: 0.8,
          y: 20
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
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
      className="relative py-20 mt-4 bg-black overflow-hidden"
    >
      {/* Background Decorative Elements with green accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#10B981]/10 to-transparent rounded-full -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#10B981]/10 to-transparent rounded-full translate-x-48 translate-y-48"></div>
      
      {/* Additional decorative elements */}
      <div className="absolute top-1/4 right-10 w-8 h-8 rounded-full bg-[#10B981]/20"></div>
      <div className="absolute bottom-1/3 left-10 w-12 h-12 rounded-full bg-[#34D399]/10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with dark theme */}
        <div className="text-center mb-16">
          {/* Animated Divider with green */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#10B981] to-transparent rounded-full"></div>
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#10B981] to-[#34D399] animate-pulse"></div>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#10B981] to-transparent rounded-full"></div>
          </div>
          
          {/* Title with Animation - white text on black */}
          <div ref={titleRef} className="overflow-hidden mb-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="text-white">Campus </span>
              <span className="bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#10B981] bg-clip-text text-transparent">
                Gallery
              </span>
            </h2>
          </div>
          
          {/* Description with Animation - gray text */}
          <div ref={descriptionRef} className="overflow-hidden max-w-2xl mx-auto">
            <p className="text-lg text-gray-300 leading-relaxed">
              A visual journey through our campus facilities, academic spaces, and vibrant student life
            </p>
          </div>
        </div>

        {/* Category Filter - Green gradient for active button */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`category-btn px-6 py-3 rounded-full transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-[#10B981] to-[#34D399] text-white shadow-lg shadow-[#10B981]/30 hover:shadow-xl hover:shadow-[#10B981]/40 transform hover:scale-105"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid - Dark theme cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el && !galleryItemsRef.current.includes(el)) {
                  galleryItemsRef.current[index] = el;
                }
              }}
              className="gallery-item group relative overflow-hidden rounded-2xl cursor-pointer border border-gray-800 bg-gray-900 hover:border-[#10B981]/50 hover:shadow-2xl hover:shadow-[#10B981]/20 transition-all duration-500 hover:-translate-y-2"
              onClick={() => openModal(index)}
            >
              {/* Image Container */}
              <div className="relative aspect-square">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                {/* Dark gradient overlay with green accent */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl">
                  {/* Expand Icon with green */}
                  <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#10B981]/20 to-[#34D399]/20 backdrop-blur-sm border border-[#10B981]/30 flex items-center justify-center hover:from-[#10B981]/30 hover:to-[#34D399]/30 transition-colors">
                      <FaExpand className="text-white text-lg" />
                    </div>
                  </div>
                  
                  {/* Image Info with green badges */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#10B981] to-[#34D399] shadow-sm">
                        {image.category}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold mb-1 leading-tight">{image.title}</h3>
                    <p className="text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      Click to view full image
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State - Dark theme */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center shadow-lg">
              <FaExpand className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              No Images Found
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              {activeCategory === "All" 
                ? 'No gallery images available.'
                : `No images found in ${activeCategory} category.`
              }
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#10B981] to-[#34D399] text-white font-medium hover:shadow-lg hover:shadow-[#10B981]/30 transition-all duration-300 hover:scale-105"
            >
              View All Categories
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && filteredImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Navigation Buttons with green gradient */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-gradient-to-r from-[#10B981] to-[#34D399] hover:from-[#0EA271] hover:to-[#10B981] transition-all duration-300 shadow-lg shadow-[#10B981]/30 hover:scale-110"
            aria-label="Previous image"
          >
            <FaChevronLeft className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-gradient-to-r from-[#10B981] to-[#34D399] hover:from-[#0EA271] hover:to-[#10B981] transition-all duration-300 shadow-lg shadow-[#10B981]/30 hover:scale-110"
            aria-label="Next image"
          >
            <FaChevronRight className="w-5 h-5 text-white" />
          </button>

          {/* Close Button with dark theme */}
          <button
            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:bg-gray-700/50 hover:border-[#10B981]/30 transition-all duration-300"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <span className="text-white text-2xl font-bold">&times;</span>
          </button>

          {/* Image Info with green accents */}
          <div className="absolute bottom-8 left-0 right-0 text-center z-10">
            <div className="inline-flex flex-col items-center gap-2 bg-gray-900/80 backdrop-blur-sm rounded-2xl px-6 py-4 border border-gray-800">
              <h3 className="text-white text-lg font-semibold">
                {filteredImages[currentImg].title}
              </h3>
              <div className="flex items-center gap-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#10B981] to-[#34D399]">
                  {filteredImages[currentImg].category}
                </span>
                <p className="text-gray-400 text-sm">
                  {currentImg + 1} / {filteredImages.length}
                </p>
              </div>
            </div>
          </div>

          {/* Modal Content */}
          <div
            className="relative w-full max-w-5xl h-[80vh] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl"
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

      {/* Custom Styles */}
      <style jsx global>{`
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Custom animations for modal */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Modal animation */
        .modal-enter {
          animation: fadeIn 0.3s ease-out;
        }

        .modal-content-enter {
          animation: slideIn 0.3s ease-out 0.1s both;
        }

        /* Glow effect for active category button */
        .active-glow {
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default GallerySection;