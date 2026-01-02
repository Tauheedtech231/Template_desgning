'use client';

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  FaCalendar,
  FaUsers,
  FaBook,
  FaClock,
 
} from "react-icons/fa";


const CoursesSection: React.FC = () => {
  const [activeCourse, setActiveCourse] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  

  // Human-written course descriptions with natural variation
  const coursesData = {
    courses: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Computer Science Fundamentals",
        participants: 250,
        duration: "12 weeks",
        instructor: "Dr. Sarah Johnson",
        category: "Technology",
        description: "Start with the building blocks of programming and software development. We focus on practical problem-solving and hands-on projects that help you understand how things actually work.",
        features: ["Weekly coding exercises", "Project-based learning", "One-on-one mentor support", "Portfolio development"]
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2111&q=80",
        title: "Business Administration",
        participants: 180,
        duration: "16 weeks",
        instructor: "Prof. Michael Chen",
        category: "Business",
        description: "Learn to navigate real business situations through case studies and practical exercises. The focus is on developing judgment and decision-making skills that apply across industries.",
        features: ["Case study analysis", "Leadership workshops", "Industry guest speakers", "Team collaboration projects"]
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Engineering Principles",
        participants: 150,
        duration: "20 weeks",
        instructor: "Dr. Robert Williams",
        category: "Engineering",
        description: "An introduction to core engineering concepts that balances theory with hands-on application. You'll work on actual design problems and learn through doing, not just studying.",
        features: ["Laboratory sessions", "Design challenges", "Industry software training", "Site visits"]
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Digital Marketing",
        participants: 220,
        duration: "10 weeks",
        instructor: "Prof. Lisa Anderson",
        category: "Marketing",
        description: "Learn how to create campaigns that actually work and understand how to measure their impact. We use current tools and platforms to give you practical, applicable skills.",
        features: ["Real campaign creation", "Analytics platform practice", "Content strategy development", "Portfolio completion"]
      },
      {
        id: 5,
        image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2036&q=80",
        title: "Data Science & Analytics",
        participants: 190,
        duration: "14 weeks",
        instructor: "Dr. David Miller",
        category: "Data Science",
        description: "Work with actual datasets to learn how to find meaningful insights and tell stories with data. We emphasize practical application over abstract theory.",
        features: ["Real dataset analysis", "Statistical method application", "Data visualization practice", "Ethical consideration discussion"]
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
        // Reset to beginning for seamless loop
        slider.scrollLeft = 0;
      } else {
        // Smooth continuous scroll
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
    <section className="relative bg-[#FAFAFA] overflow-hidden">
      {/* Hero image section */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <Image
          src="https://plus.unsplash.com/premium_photo-1683887034491-f58b4c4fca72?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Learning environment"
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
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-white/50" />
                <span className="text-white/90 text-sm tracking-wide">
                  Our offerings
                </span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl font-medium text-white mb-6 leading-tight">
                Programs designed<br />
                <span className="text-[#E86A58]">for real learning</span>
              </h1>
              
              <p className="text-lg text-white/90 leading-relaxed max-w-xl">
                Each course is built around practical application, helping you develop skills that matter in your work and life.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses content */}
      <div className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-16 md:mb-20">
            <div className="max-w-3xl">
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#E86A58] mb-8 leading-tight">
                What we offer
              </h2>
              
              <p className="text-lg text-[#5A5A5A] leading-relaxed tracking-tight max-w-2xl">
                Our programs focus on building practical understanding through hands-on work. 
                We believe in teaching skills that apply directly to real-world situations.
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
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
                  >
                    {/* Course image */}
                    <div className="relative">
                      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                        
                        {/* Category badge */}
                        <div className="absolute top-6 left-6">
                          <span className="px-4 py-2 bg-white text-[#5A5A5A] text-sm font-medium tracking-wide">
                            {course.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Course details */}
                    <div className="flex flex-col justify-center">
                      <div className="p-6 md:p-8 bg-white shadow-sm">
                        {/* Course title */}
                        <h3 className="font-serif text-2xl md:text-3xl font-medium text-[#1E1E1E] mb-4 leading-tight">
                          {course.title}
                        </h3>
                        
                        {/* Instructor info */}
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-8 h-8 rounded-full bg-[#E86A58]/10 flex items-center justify-center">
                            <FaUsers className="h-4 w-4 text-[#E86A58]" />
                          </div>
                          <div>
                            <div className="text-sm text-[#5A5A5A]">Instructor</div>
                            <div className="text-[#1E1E1E] font-medium">{course.instructor}</div>
                          </div>
                        </div>
                        
                        {/* Course description */}
                        <div className="mb-8">
                          <p className="text-[#5A5A5A] leading-relaxed text-base tracking-tight">
                            {course.description}
                          </p>
                        </div>
                        
                        {/* Course features */}
                        <div className="space-y-3 mb-8">
                          {course.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-4 h-4 rounded-full bg-[#E86A58]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-[#E86A58] rounded-full" />
                              </div>
                              <span className="text-[#5A5A5A] text-sm leading-relaxed">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Course stats */}
                        <div className="pt-6 border-t border-[#E5E5E5]">
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-[#5A5A5A] text-sm">
                              <FaClock className="h-3 w-3" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#5A5A5A] text-sm">
                              <FaUsers className="h-3 w-3" />
                              <span>{course.participants} participants</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#5A5A5A] text-sm">
                              <FaBook className="h-3 w-3" />
                              <span>Hands-on learning</span>
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
          <div className="mt-16">
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-[#E86A58]/30" />
                <span className="text-sm text-[#5A5A5A] tracking-wide">
                  Browse all courses
                </span>
              </div>
            </div>
            
            {/* Slider container */}
            <div className="relative overflow-hidden">
              {/* Gradient overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10" />
              
              {/* Continuous slider */}
              <div
                ref={sliderRef}
                className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide"
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
                    className={`flex-shrink-0 w-64 md:w-80 cursor-pointer transition-all duration-300 ${
                      activeCourse === index 
                        ? 'opacity-100 scale-105' 
                        : 'opacity-80 hover:opacity-100'
                    }`}
                    onClick={() => handleCourseSelect(index)}
                  >
                    <div className="bg-white p-4 shadow-sm border border-[#E5E5E5]">
                      <div className="mb-3">
                        <div className="text-[#E86A58] text-sm font-medium">
                          {course.category}
                        </div>
                        <h3 className="font-medium text-[#1E1E1E] mt-1">
                          {course.title}
                        </h3>
                      </div>
                      <div className="text-xs text-[#5A5A5A]">
                        {course.instructor}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {coursesData.courses.map((course, index) => (
                  <div
                    key={`second-${course.id}`}
                    className={`flex-shrink-0 w-64 md:w-80 cursor-pointer transition-all duration-300 ${
                      activeCourse === index 
                        ? 'opacity-100 scale-105' 
                        : 'opacity-80 hover:opacity-100'
                    }`}
                    onClick={() => handleCourseSelect(index)}
                  >
                    <div className="bg-white p-4 shadow-sm border border-[#E5E5E5]">
                      <div className="mb-3">
                        <div className="text-[#E86A58] text-sm font-medium">
                          {course.category}
                        </div>
                        <h3 className="font-medium text-[#1E1E1E] mt-1">
                          {course.title}
                        </h3>
                      </div>
                      <div className="text-xs text-[#5A5A5A]">
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
                    className="focus:outline-none"
                    aria-label={`View course ${index + 1}`}
                  >
                    <div 
                      className={`h-1 rounded-full transition-all duration-300 ${
                        index === activeCourse 
                          ? 'w-6 bg-[#E86A58]' 
                          : 'w-2 bg-[#E5E5E5] hover:bg-[#D0D0D0]'
                      }`}
                    />
                  </button>
                ))}
              </div>
              
              <div className="text-sm text-[#5A5A5A]">
                <span className="font-medium">{activeCourse + 1}</span>
                <span className="mx-2">of</span>
                <span>{coursesData.courses.length}</span>
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <div className="mt-20 pt-8 border-t border-[#E5E5E5]">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <FaCalendar className="h-5 w-5 text-[#E86A58]" />
                <span className="text-[#1E1E1E] font-medium">Flexible scheduling</span>
              </div>
              <p className="text-[#5A5A5A] leading-relaxed">
                All our programs offer multiple scheduling options to fit different needs and commitments. 
                We focus on creating learning experiences that work with your life, not against it.
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
      <div className="h-px bg-[#E5E5E5] max-w-4xl mx-auto" />
    </section>
  );
};

export default CoursesSection;