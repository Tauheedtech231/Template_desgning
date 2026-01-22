"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaExpand, FaChevronLeft, FaChevronRight, FaCamera } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
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
  const galleryRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Gallery data with slight variations for organic feel
  const galleryImages: GalleryImage[] = [
    { 
      src: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Main campus building", 
      category: "Campus" 
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
    { 
      src: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80", 
      title: "Art studio", 
      category: "Facilities" 
    },
    
    { 
      src: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&auto=format&fit=crop&q=80", 
      title: "Research work", 
      category: "Academics" 
    },
    { 
      src: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&auto=format&fit=crop&q=80", 
      title: "Campus garden", 
      category: "Campus" 
    },
  ];

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(galleryImages.map(img => img.category)))];

  // Filter images by category
  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  // Calculate image aspect ratios for unique organic layout
  const getImageStyle = (index: number) => {
    const layouts = [
      { aspect: 'aspect-[4/5]', colSpan: 'md:col-span-1 lg:col-span-1', rowSpan: 'md:row-span-2 lg:row-span-2', rotation: '-rotate-1' },
      { aspect: 'aspect-[16/9]', colSpan: 'md:col-span-2 lg:col-span-2', rowSpan: 'md:row-span-1 lg:row-span-1', rotation: 'rotate-0.5' },
      { aspect: 'aspect-square', colSpan: 'md:col-span-1 lg:col-span-1', rowSpan: 'md:row-span-1 lg:row-span-1', rotation: '-rotate-0.5' },
      { aspect: 'aspect-[3/4]', colSpan: 'md:col-span-1 lg:col-span-1', rowSpan: 'md:row-span-2 lg:row-span-2', rotation: 'rotate-1' },
      { aspect: 'aspect-[4/3]', colSpan: 'md:col-span-2 lg:col-span-2', rowSpan: 'md:row-span-1 lg:row-span-1', rotation: '-rotate-0.5' },
      { aspect: 'aspect-[5/4]', colSpan: 'md:col-span-1 lg:col-span-1', rowSpan: 'md:row-span-1 lg:row-span-1', rotation: 'rotate-1' },
      { aspect: 'aspect-[2/3]', colSpan: 'md:col-span-1 lg:col-span-1', rowSpan: 'md:row-span-2 lg:row-span-2', rotation: '-rotate-1' },
      { aspect: 'aspect-[3/2]', colSpan: 'md:col-span-2 lg:col-span-2', rowSpan: 'md:row-span-1 lg:row-span-1', rotation: 'rotate-0.5' },
    ];
    
    const borderRadius = [
      'rounded-xl', 'rounded-2xl', 'rounded-xl', 'rounded-3xl', 
      'rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-xl'
    ];
    
    const marginOffset = [
      'mt-0', 'mt-4', '-mt-2', 'mt-2', 
      '-mt-4', 'mt-0', 'mt-4', '-mt-2'
    ];
    
    return {
      ...layouts[index % layouts.length],
      borderRadius: borderRadius[index % borderRadius.length],
      marginOffset: marginOffset[index % marginOffset.length],
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

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (typeof window === "undefined") return;

      // Configure ScrollTrigger
      ScrollTrigger.defaults({
        toggleActions: "play none none reverse",
        start: "top 80%",
        end: "bottom 20%",
        scrub: false
      });

      // Animate heading with left-right movement
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
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
              trigger: headingRef.current,
              start: "top 85%"
            }
          }
        );
      }

      // Animate category buttons with stagger
      const categoryButtons = sectionRef.current?.querySelectorAll('.category-btn');
      categoryButtons?.forEach((btn, i) => {
        gsap.fromTo(btn,
          {
            scale: 0.8,
            opacity: 0,
            y: 20
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: btn,
              start: "top 90%"
            }
          }
        );
      });

      // Animate gallery images with unique staggered entrance
      const galleryItems = galleryRef.current?.querySelectorAll('.gallery-item');
      galleryItems?.forEach((item, i) => {
        const delay = i * 0.1;
        const direction = i % 2 === 0 ? -50 : 50;
        
        gsap.fromTo(item,
          {
            x: direction,
            y: 30,
            opacity: 0,
            scale: 0.9,
            rotate: direction > 0 ? 5 : -5
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.8,
            delay: delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  // Keyboard navigation for modal
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
      {/* Hero Section with background image - Matching About section theme */}
     <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
  {/* Background Image */}
  <Image
    src="/gallery5.jpg"
    alt="Campus gallery"
    fill
    className="object-cover"
    priority
    sizes="100vw"
  />

  {/* Subtle overlay to improve text readability */}
  <div className="absolute inset-0 bg-black/20"></div>

  {/* Overlay content */}
  <div className="relative z-10 h-full flex items-center">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-2xl">
        {/* Decorative line */}
        <div className="inline-flex items-center gap-2 sm:gap-3 mb-6">
          <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-[#C99789] to-transparent" />
          <span className="text-xs sm:text-sm text-white/90 font-semibold tracking-widest uppercase">
            Visual Journey
          </span>
          <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-[#A17A74] to-transparent" />
        </div>

        {/* Heading */}
        <h1 className="scroll-heading font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
          <span className="bg-gradient-to-r from-white via-[#F7F2EE] to-[#C99789] bg-clip-text text-transparent">
            Campus Gallery
          </span>
        </h1>

        {/* Gradient underline */}
        <div className="w-24 sm:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-[#A17A74] to-[#C99789] mb-6"></div>

        {/* Description */}
        <p className="text-lg text-white/90 leading-relaxed max-w-xl drop-shadow-sm">
          A collection of moments and spaces that define our community. 
          Each image captures the essence of learning, innovation, and connection.
        </p>
      </div>
    </div>
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
    <div className="animate-bounce">
      <FaChevronRight className="h-5 w-5 text-white rotate-90" />
    </div>
  </div>
</div>


      {/* Gallery content section */}
      <section
        ref={sectionRef}
        className="relative bg-[#F7F2EE] overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Category filter - modern design */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-12 md:mb-16 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`category-btn px-5 py-2.5 rounded-full transition-all duration-300 text-sm font-medium backdrop-blur-sm ${
                    activeCategory === category
                      ? "bg-[#A17A74] text-white shadow-lg shadow-[#A17A74]/20"
                      : "bg-white/80 text-[#3B3B3B] border border-[#EADBC8] hover:border-[#A17A74] hover:bg-white hover:shadow-md"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Gallery grid - modern masonry layout */}
          <div 
            ref={galleryRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px]"
          >
            <AnimatePresence mode="wait">
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
                    className={`gallery-item relative group cursor-pointer ${style.colSpan} ${style.rowSpan} ${style.marginOffset}`}
                    onClick={() => openModal(index)}
                  >
                    {/* Image container with modern styling */}
                    <div 
                      className={`relative w-full h-full overflow-hidden ${style.aspect} transition-all duration-500 group-hover:scale-[1.02] group-hover:rotate-0`}
                      style={{ 
                        borderRadius: index % 2 === 0 ? '16px' : '12px',
                      }}
                    >
                      {/* Image with subtle overlay */}
                      <Image
                        src={image.src}
                        alt={image.title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-black/0 group-hover:from-black/5 group-hover:via-black/10 group-hover:to-black/20 transition-all duration-500" />
                      
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#C99789]/20 transition-all duration-500 rounded-inherit" />
                      
                      {/* Expand icon - modern design */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 translate-y-2">
                        <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                          <FaExpand className="h-4 w-4 text-[#3B3B3B]" />
                        </div>
                      </div>
                      
                      {/* Image info - appears on hover */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-[#3B3B3B]/90 to-transparent">
                        <div className="text-white">
                          <h3 className="text-base md:text-lg font-medium mb-1">{image.title}</h3>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-white/80">{image.category}</span>
                            <span className="text-xs text-[#C99789] font-medium">View →</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty state - modern design */}
          {filteredImages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20 md:py-32"
            >
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#EADBC8] to-[#F7F2EE] flex items-center justify-center shadow-inner">
                <FaCamera className="h-10 w-10 text-[#A17A74]" />
              </div>
              <h3 className="text-2xl font-bold text-[#3B3B3B] mb-4">
                No images here yet
              </h3>
              <p className="text-[#3B3B3B]/70 max-w-md mx-auto text-lg">
                {activeCategory === "All" 
                  ? "Check back soon for updates to our gallery collection."
                  : `No ${activeCategory.toLowerCase()} images available at the moment.`
                }
              </p>
            </motion.div>
          )}

          {/* Gallery stats - subtle */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-[#EADBC8]/50 text-center"
          >
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#A17A74] mb-1">{galleryImages.length}</div>
                <div className="text-sm text-[#3B3B3B]/70">Total Images</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#C99789] mb-1">{categories.length - 1}</div>
                <div className="text-sm text-[#3B3B3B]/70">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#A17A74] mb-1">{filteredImages.length}</div>
                <div className="text-sm text-[#3B3B3B]/70">Currently Viewing</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Modal - modern design matching theme */}
        <AnimatePresence>
          {modalOpen && filteredImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
              onClick={closeModal}
            >
              {/* Navigation buttons - modern design */}
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 hover:border-[#C99789] transition-all duration-300 group"
                aria-label="Previous image"
              >
                <FaChevronLeft className="w-6 h-6 text-white group-hover:text-[#C99789] transition-colors" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 hover:border-[#C99789] transition-all duration-300 group"
                aria-label="Next image"
              >
                <FaChevronRight className="w-6 h-6 text-white group-hover:text-[#C99789] transition-colors" />
              </button>

              {/* Close button */}
              <button
                className="absolute top-6 right-6 md:top-8 md:right-8 z-10 group"
                onClick={closeModal}
              >
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:border-[#C99789] transition-all duration-300">
                  <span className="text-2xl font-light text-white group-hover:text-[#C99789] transition-colors">×</span>
                </div>
              </button>

              {/* Image info - modern overlay */}
              <div className="absolute bottom-8 left-0 right-0 z-10">
                <div className="max-w-4xl mx-auto px-4">
                  <div className="bg-gradient-to-t from-black/80 to-transparent backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {filteredImages[currentImg].title}
                    </h3>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4 text-white/80">
                        <span className="px-3 py-1 rounded-full bg-white/10 text-sm">
                          {filteredImages[currentImg].category}
                        </span>
                        <span className="text-sm">
                          {currentImg + 1} of {filteredImages.length}
                        </span>
                      </div>
                      <button 
                        onClick={closeModal}
                        className="px-4 py-2 rounded-full bg-[#C99789] text-white text-sm font-medium hover:bg-[#A17A74] transition-colors duration-300"
                      >
                        Close Viewer
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal content */}
              <div
                className="relative w-full max-w-6xl h-[70vh] md:h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  key={currentImg}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={filteredImages[currentImg].src}
                    alt={filteredImages[currentImg].title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
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