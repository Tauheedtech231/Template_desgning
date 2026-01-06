'use client';

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CoursesSection: React.FC = () => {
  const [activeCourse, setActiveCourse] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Updated course descriptions with natural variation
  const coursesData = {
    courses: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Computer Science Foundations",
        participants: 250,
        duration: "12 weeks",
        instructor: "Dr. Sarah Johnson",
        category: "Technology",
        description: "Master computational thinking through deliberate practice and real-world applications. Build intuition for complex systems.",
        features: ["Algorithmic patterns", "Systems thinking", "Code reviews", "Architecture principles"]
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2111&q=80",
        title: "Strategic Leadership",
        participants: 180,
        duration: "16 weeks",
        instructor: "Prof. Michael Chen",
        category: "Business",
        description: "Develop frameworks for organizational clarity and decision-making under uncertainty.",
        features: ["Decision matrices", "Team dynamics", "Resource allocation", "Growth strategies"]
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Modern Engineering",
        participants: 150,
        duration: "20 weeks",
        instructor: "Dr. Robert Williams",
        category: "Engineering",
        description: "Bridge theoretical principles with practical implementation through iterative design cycles.",
        features: ["Prototyping methods", "Failure analysis", "Material selection", "System integration"]
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Digital Strategy",
        participants: 220,
        duration: "10 weeks",
        instructor: "Prof. Lisa Anderson",
        category: "Marketing",
        description: "Craft resonant narratives that connect products with audiences in meaningful ways.",
        features: ["Audience mapping", "Channel optimization", "Metric frameworks", "Content systems"]
      },
      {
        id: 5,
        image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2036&q=80",
        title: "Data Interpretation",
        participants: 190,
        duration: "14 weeks",
        instructor: "Dr. David Miller",
        category: "Data Science",
        description: "Transform raw information into actionable insights through systematic analysis.",
        features: ["Pattern recognition", "Visual storytelling", "Statistical reasoning", "Ethical considerations"]
      }
    ]
  };

  // Continuous right-to-left slider effect
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const animateSlider = () => {
      const totalWidth = slider.scrollWidth;
      const visibleWidth = slider.clientWidth;
      
      if (slider.scrollLeft >= totalWidth - visibleWidth) {
        slider.scrollLeft = 0;
      } else {
        slider.scrollLeft += 0.5;
      }
      
      requestAnimationFrame(animateSlider);
    };

    const animationId = requestAnimationFrame(animateSlider);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Handle drag for manual control
  const handleDragStart = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleCourseSelect = (index: number) => {
    setActiveCourse(index);
  };

  // Auto-rotate active course
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCourse(prev => (prev + 1) % coursesData.courses.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [coursesData.courses.length]);

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Hero image section - Simplified */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src="https://plus.unsplash.com/premium_photo-1683887034491-f58b4c4fca72?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Learning environment"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Overlay content - Minimal */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl">
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-white mb-4 leading-tight">
                Intelligent Learning
                <span className="block text-[#2F5D62]">Structured Growth</span>
              </h1>
              
              <p className="text-white/90 leading-relaxed max-w-lg">
                Methodical programs designed for measurable skill development and professional advancement.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses content */}
      <div className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-12 md:mb-16">
            <div className="max-w-2xl">
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#121212] mb-6 leading-tight">
                Structured Programs
              </h2>
              
              <p className="text-[#4A4A4A] leading-relaxed max-w-xl">
                Each curriculum balances theoretical foundations with practical application, 
                focusing on transferable skills that compound over time.
              </p>
            </div>
          </div>

          {/* Active course display */}
          <div className="mb-16">
            <AnimatePresence mode="wait">
              {coursesData.courses.map((course, index) => {
                if (index !== activeCourse) return null;
                
                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10"
                  >
                    {/* Course image */}
                    <div className="relative">
                      <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden rounded-lg">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                      </div>
                    </div>

                    {/* Course details */}
                    <div className="flex flex-col justify-center">
                      <div className="bg-white border border-[#E3E3E3] rounded-xl pt-7 px-6 pb-8">
                        {/* Course title */}
                        <h3 className="font-serif text-xl md:text-[22px] font-medium text-[#121212] mb-4 leading-tight">
                          {course.title}
                        </h3>
                        
                        {/* Instructor info */}
                        <div className="mb-6">
                          <div className="text-sm text-[#4A4A4A] mb-1">Led by</div>
                          <div className="text-[#121212] font-medium">{course.instructor}</div>
                        </div>
                        
                        {/* Course description */}
                        <div className="mb-8">
                          <p className="text-[#4A4A4A] leading-relaxed text-[15px] tracking-tight">
                            {course.description}
                          </p>
                        </div>
                        
                        {/* Course features */}
                        <div className="space-y-2.5 mb-8">
                          {course.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-3 h-3 rounded-full bg-[#2F5D62]/10 flex items-center justify-center flex-shrink-0 mt-1">
                                <div className="w-1 h-1 bg-[#2F5D62] rounded-full" />
                              </div>
                              <span className="text-[#4A4A4A] text-sm leading-relaxed">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Course stats */}
                        <div className="pt-6 border-t border-[#E3E3E3]">
                          <div className="flex flex-wrap gap-4 text-sm text-[#4A4A4A]">
                            <div className="flex items-center gap-2">
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span>{course.participants} enrolled</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span>Applied learning</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Horizontal Slider - Continuous right to left */}
          <div className="mt-12">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="h-px w-6 bg-[#E3E3E3]" />
                <span className="text-sm text-[#4A4A4A] tracking-wide">
                  Explore programs
                </span>
              </div>
            </div>
            
            {/* Slider container */}
            <div className="relative overflow-hidden">
              {/* Gradient overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10" />
              
              {/* Continuous slider */}
              <div
                ref={sliderRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide"
                style={{ scrollBehavior: 'auto' }}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onDragStart={(e) => e.preventDefault()}
              >
                {/* First set of courses */}
                {coursesData.courses.map((course, index) => (
                  <div
                    key={`first-${course.id}`}
                    className={`flex-shrink-0 w-64 cursor-pointer transition-all duration-300 ${
                      activeCourse === index 
                        ? 'opacity-100' 
                        : 'opacity-80 hover:opacity-100'
                    }`}
                    onClick={() => handleCourseSelect(index)}
                  >
                    <div className="bg-white border border-[#E3E3E3] rounded-xl pt-7 px-6 pb-8 hover:border-[#2F5D62] hover:text-[#2F5D62] transition-colors">
                      <div className="mb-4">
                        <div className="text-[#4A4A4A] text-xs tracking-wide mb-2">
                          {course.category}
                        </div>
                        <h3 className="font-serif font-medium text-[#121212] text-lg leading-tight hover:text-[#2F5D62] transition-colors">
                          {course.title}
                        </h3>
                      </div>
                      <div className="text-sm text-[#4A4A4A]">
                        {course.instructor}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {coursesData.courses.map((course, index) => (
                  <div
                    key={`second-${course.id}`}
                    className={`flex-shrink-0 w-64 cursor-pointer transition-all duration-300 ${
                      activeCourse === index 
                        ? 'opacity-100' 
                        : 'opacity-80 hover:opacity-100'
                    }`}
                    onClick={() => handleCourseSelect(index)}
                  >
                    <div className="bg-white border border-[#E3E3E3] rounded-xl pt-7 px-6 pb-8 hover:border-[#2F5D62] hover:text-[#2F5D62] transition-colors">
                      <div className="mb-4">
                        <div className="text-[#4A4A4A] text-xs tracking-wide mb-2">
                          {course.category}
                        </div>
                        <h3 className="font-serif font-medium text-[#121212] text-lg leading-tight hover:text-[#2F5D62] transition-colors">
                          {course.title}
                        </h3>
                      </div>
                      <div className="text-sm text-[#4A4A4A]">
                        {course.instructor}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="flex gap-2">
                {coursesData.courses.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleCourseSelect(index)}
                    className="focus:outline-none transition-all duration-300"
                    aria-label={`View course ${index + 1}`}
                  >
                    <div 
                      className={`h-1 rounded-full transition-all duration-300 ${
                        index === activeCourse 
                          ? 'w-6 bg-[#2F5D62]' 
                          : 'w-2 bg-[#E3E3E3] hover:bg-[#2F5D62]/30'
                      }`}
                    />
                  </button>
                ))}
              </div>
              
              <div className="text-sm text-[#4A4A4A]">
                <span className="font-medium">{activeCourse + 1}</span>
                <span className="mx-2">/</span>
                <span>{coursesData.courses.length}</span>
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <div className="mt-16 pt-8 border-t border-[#E3E3E3]">
            <div className="max-w-xl">
              <div className="mb-4">
                <span className="text-[#121212] font-medium">Adaptive scheduling</span>
              </div>
              <p className="text-[#4A4A4A] leading-relaxed text-[15px]">
                Programs accommodate varied schedules while maintaining cohort cohesion. 
                Learning intensity adjusts based on progress markers and feedback cycles.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Subtle section separator */}
      <div className="h-px bg-[#E3E3E3] max-w-4xl mx-auto" />
    </section>
  );
};

export default CoursesSection;