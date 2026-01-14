'use client';

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  FaUsers,
  FaBook,
  FaClock,
  FaArrowRight
} from "react-icons/fa";

const CoursesSection: React.FC = () => {
  const [activeCourse, setActiveCourse] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Scroll-based animations
  const headingX = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

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
        description: "Start with the building blocks of programming and software development. We focus on practical problem-solving and hands-on projects.",
        features: ["Weekly coding exercises", "Project-based learning", "One-on-one mentor support"]
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2111&q=80",
        title: "Business Administration",
        participants: 180,
        duration: "16 weeks",
        instructor: "Prof. Michael Chen",
        category: "Business",
        description: "Learn to navigate real business situations through case studies and practical exercises.",
        features: ["Case study analysis", "Leadership workshops", "Industry guest speakers"]
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Engineering Principles",
        participants: 150,
        duration: "20 weeks",
        instructor: "Dr. Robert Williams",
        category: "Engineering",
        description: "An introduction to core engineering concepts that balances theory with hands-on application.",
        features: ["Laboratory sessions", "Design challenges", "Industry software training"]
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Digital Marketing",
        participants: 220,
        duration: "10 weeks",
        instructor: "Prof. Lisa Anderson",
        category: "Marketing",
        description: "Learn how to create campaigns that actually work and understand how to measure their impact.",
        features: ["Real campaign creation", "Analytics platform practice", "Content strategy development"]
      },
      {
        id: 5,
        image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2036&q=80",
        title: "Data Science & Analytics",
        participants: 190,
        duration: "14 weeks",
        instructor: "Dr. David Miller",
        category: "Data Science",
        description: "Work with actual datasets to learn how to find meaningful insights and tell stories with data.",
        features: ["Real dataset analysis", "Statistical method application", "Data visualization practice"]
      }
    ]
  };

  // Continuous right-to-left slider effect
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const animateSlider = () => {
      if (isDragging) {
        requestAnimationFrame(animateSlider);
        return;
      }

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
  }, [isDragging]);

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

  // Auto-rotate active course
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCourse(prev => (prev + 1) % coursesData.courses.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [coursesData.courses.length]);

  const handleCourseSelect = (index: number) => {
    setActiveCourse(index);
  };

  return (
    <section ref={containerRef} className="relative bg-white overflow-hidden">
      {/* Hero image section with rounded bottom corners */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src="https://plus.unsplash.com/premium_photo-1683887034491-f58b4c4fca72?q=80&w=1169&auto=format&fit=crop"
          alt="Learning environment"
          fill
          className="object-cover rounded-b-3xl"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
        
        {/* Animated heading that moves on scroll */}
        <motion.div 
          className="relative z-10 h-full flex items-center"
          style={{ x: headingX, opacity: headingOpacity }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 mb-6">
                <motion.div 
                  className="h-px w-12 bg-white/50"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
                <motion.span 
                  className="text-white/90 text-sm tracking-wide"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Our Programs
                </motion.span>
              </div>
              
              <motion.h1 
                className="font-serif text-4xl md:text-5xl font-medium text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Learn Practical<br />
                <span className="text-teal-400">Skills That Matter</span>
              </motion.h1>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Courses content */}
      <div className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-12 md:mb-16">
            <div className="max-w-3xl">
              {/* Heading with left-right animation */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-serif text-3xl md:text-4xl font-medium text-gray-900 mb-6 leading-tight">
                  Comprehensive Programs
                </h2>
              </motion.div>
              
              {/* Subheading with right-left animation */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-lg text-gray-600 leading-relaxed">
                  Hands-on learning experiences designed for real-world application
                </p>
              </motion.div>
            </div>
          </div>

          {/* Active course display */}
          <motion.div 
            className="mb-12 md:mb-16"
            style={{ scale: cardScale }}
          >
            <AnimatePresence mode="wait">
              {coursesData.courses.map((course, index) => {
                if (index !== activeCourse) return null;
                
                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5, type: "spring", damping: 20 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10"
                  >
                    {/* Course image with rounded corners */}
                    <div className="relative">
                      <motion.div 
                        className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                      >
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover rounded-2xl"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        
                        {/* Category badge with animation */}
                        <motion.div 
                          className="absolute top-6 left-6"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                        >
                          <span className="px-4 py-2 bg-white text-gray-800 text-sm font-medium tracking-wide rounded-full shadow-sm">
                            {course.category}
                          </span>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Course details with rounded card */}
                    <div className="flex flex-col justify-center">
                      <div className="p-6 md:p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                        {/* Course title with animation */}
                        <motion.h3 
                          className="font-serif text-2xl md:text-3xl font-medium text-gray-900 mb-4 leading-tight"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          {course.title}
                        </motion.h3>
                        
                        {/* Instructor info with animation */}
                        <motion.div 
                          className="flex items-center gap-3 mb-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.4 }}
                        >
                          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                            <FaUsers className="h-5 w-5 text-teal-600" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Instructor</div>
                            <div className="text-gray-800 font-medium">{course.instructor}</div>
                          </div>
                        </motion.div>
                        
                        {/* Course description with animation */}
                        <motion.div 
                          className="mb-8"
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        >
                          <p className="text-gray-600 leading-relaxed">
                            {course.description}
                          </p>
                        </motion.div>
                        
                        {/* Course features with staggered animation */}
                        <div className="space-y-3 mb-8">
                          {course.features.map((feature, idx) => (
                            <motion.div 
                              key={idx} 
                              className="flex items-center gap-3"
                              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ 
                                duration: 0.4, 
                                delay: 0.6 + (idx * 0.1),
                                type: "spring",
                                stiffness: 100
                              }}
                            >
                              <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                                <div className="w-2 h-2 bg-teal-500 rounded-full" />
                              </div>
                              <span className="text-gray-700 text-sm">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* Course stats with animation */}
                        <motion.div 
                          className="pt-6 border-t border-gray-200"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.9 }}
                        >
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                              <FaClock className="h-4 w-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                              <FaUsers className="h-4 w-4" />
                              <span>{course.participants} participants</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                              <FaBook className="h-4 w-4" />
                              <span>Practical focus</span>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Continuous Horizontal Slider - Right to Left */}
          <div className="mt-16">
            {/* Section heading with left animation */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="h-px w-8 bg-teal-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: 32 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                />
                <motion.span 
                  className="text-sm text-gray-600 tracking-wide"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  Browse all programs
                </motion.span>
              </div>
            </motion.div>
            
            {/* Slider container */}
            <div className="relative overflow-hidden">
              {/* Gradient overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10" />
              
              {/* Continuous slider */}
              <div
                ref={sliderRef}
                className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
                style={{ scrollBehavior: 'auto' }}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onDragStart={(e) => e.preventDefault()}
              >
                {/* First set of courses */}
                {coursesData.courses.map((course, index) => (
                  <motion.div
                    key={`first-${course.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`flex-shrink-0 w-64 md:w-72 cursor-pointer transition-all duration-300 ${
                      activeCourse === index 
                        ? 'transform -translate-y-2' 
                        : 'hover:transform hover:-translate-y-1'
                    }`}
                    onClick={() => handleCourseSelect(index)}
                  >
                    <div className={`bg-white p-5 rounded-xl shadow-sm border transition-all duration-300 ${
                      activeCourse === index 
                        ? 'border-teal-500 shadow-md' 
                        : 'border-gray-200 hover:border-teal-300'
                    }`}>
                      {/* Category with animation */}
                      <motion.div 
                        className="mb-4"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-teal-600 text-sm font-medium mb-2">
                          {course.category}
                        </div>
                        <h3 className="font-medium text-gray-800">
                          {course.title}
                        </h3>
                      </motion.div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          {course.instructor}
                        </div>
                        <motion.div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            activeCourse === index 
                              ? 'bg-teal-500 text-white' 
                              : 'bg-gray-100 text-gray-600'
                          }`}
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FaArrowRight className="h-3 w-3" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {coursesData.courses.map((course, index) => (
                  <motion.div
                    key={`second-${course.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`flex-shrink-0 w-64 md:w-72 cursor-pointer transition-all duration-300 ${
                      activeCourse === index 
                        ? 'transform -translate-y-2' 
                        : 'hover:transform hover:-translate-y-1'
                    }`}
                    onClick={() => handleCourseSelect(index)}
                  >
                    <div className={`bg-white p-5 rounded-xl shadow-sm border transition-all duration-300 ${
                      activeCourse === index 
                        ? 'border-teal-500 shadow-md' 
                        : 'border-gray-200 hover:border-teal-300'
                    }`}>
                      <motion.div 
                        className="mb-4"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-teal-600 text-sm font-medium mb-2">
                          {course.category}
                        </div>
                        <h3 className="font-medium text-gray-800">
                          {course.title}
                        </h3>
                      </motion.div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          {course.instructor}
                        </div>
                        <motion.div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            activeCourse === index 
                              ? 'bg-teal-500 text-white' 
                              : 'bg-gray-100 text-gray-600'
                          }`}
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FaArrowRight className="h-3 w-3" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Progress indicator with animation */}
            <motion.div 
              className="flex items-center justify-center gap-6 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex gap-1.5">
                {coursesData.courses.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleCourseSelect(index)}
                    className="focus:outline-none"
                    aria-label={`View course ${index + 1}`}
                  >
                    <motion.div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === activeCourse 
                          ? 'w-8 bg-teal-500' 
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      layout
                    />
                  </button>
                ))}
              </div>
              
              <motion.div 
                className="text-sm text-gray-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <span className="font-medium text-gray-800">{activeCourse + 1}</span>
                <span className="mx-1">/</span>
                <span>{coursesData.courses.length}</span>
              </motion.div>
            </motion.div>
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
    </section>
  );
};

export default CoursesSection;