'use client';

import React, { useState, useRef, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  FaUsers,
  FaBook,
  FaClock,
  FaArrowRight
} from "react-icons/fa";
import { useSearchParams } from "next/navigation";

interface Course {
  id: number;
  image: string;
  title: string;
  participants: number;
  duration: string;
  instructor: string;
  category: string;
  description: string;
  features: string[];
}

// Component that uses useSearchParams - wrapped in Suspense boundary
function CoursesContent() {
  const searchParams = useSearchParams();
  const [collegeId, setCollegeId] = useState<string | null>(null);
  
  const [activeCourse, setActiveCourse] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [coursesData, setCoursesData] = useState<{ courses: Course[] }>({ courses: [] });
  const [loading, setLoading] = useState(true);
  
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get college ID from URL
  useEffect(() => {
    let id = searchParams.get('college_id');
    if (!id) {
      id = sessionStorage.getItem('college_id');
    }
    if (id) {
      setCollegeId(id);
      sessionStorage.setItem('college_id', id);
      console.log('🏫 [Courses] College ID loaded:', id);
    }
  }, [searchParams]);

  // Fetch courses data from API
  useEffect(() => {
    async function fetchCoursesData() {
      if (!collegeId) {
        console.log('⚠️ [Courses] No college ID, skipping fetch');
        setLoading(false);
        return;
      }
      
      setLoading(true);
      console.log('🔄 [Courses] Fetching courses data for college ID:', collegeId);
      
      try {
        const response = await fetch(`/api/public/sections?college_id=${collegeId}&section_name=Courses`);
        console.log('📡 [Courses] API Response Status:', response.status);
        
        const data = await response.json();
        console.log('📦 [Courses] Full API Response:', JSON.stringify(data, null, 2));
        
        if (data.success && data.content) {
          if (data.content.courses && Array.isArray(data.content.courses)) {
            setCoursesData({ courses: data.content.courses });
            console.log('✅ [Courses] Loaded', data.content.courses.length, 'courses');
          } else {
            console.log('⚠️ [Courses] No courses array in content');
            setCoursesData({ courses: [] });
          }
        } else {
          console.log('❌ [Courses] No content or success false');
          setCoursesData({ courses: [] });
        }
      } catch (error) {
        console.error('❌ [Courses] Error fetching courses data:', error);
        setCoursesData({ courses: [] });
      } finally {
        setLoading(false);
      }
    }
    
    fetchCoursesData();
  }, [collegeId]);

  // Continuous right-to-left slider effect
  useEffect(() => {
    if (loading || coursesData.courses.length === 0) return;
    
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
  }, [isDragging, loading, coursesData.courses.length]);

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
    if (coursesData.courses.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveCourse(prev => (prev + 1) % coursesData.courses.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [coursesData.courses.length]);

  const handleCourseSelect = (index: number) => {
    setActiveCourse(index);
  };

  if (loading) {
    return (
      <section className="relative bg-white min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading courses...</p>
        </div>
      </section>
    );
  }

  if (coursesData.courses.length === 0) {
    return (
      <section className="relative bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <FaBook className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">No Courses Available</h3>
          <p className="text-gray-500">Courses will be added soon. Check back later!</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative bg-white overflow-hidden">
      {/* Hero image section with rounded bottom corners - NO SCROLL ANIMATIONS */}
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
        
        {/* Simple static heading - no scroll animations */}
        <div className="relative z-10 h-full flex items-center">
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
        </div>
      </div>

      {/* Courses content */}
      <div className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-12 md:mb-16">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-serif text-3xl md:text-4xl font-medium text-teal-400 mb-6 leading-tight">
                  Comprehensive Programs
                </h2>
              </motion.div>
              
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

          {/* Active course display - NO SCROLL ANIMATIONS */}
          <div className="mb-12 md:mb-16">
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
                        {course.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover rounded-2xl"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <FaBook className="w-16 h-16 text-gray-400" />
                          </div>
                        )}
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
          </div>

          {/* Continuous Horizontal Slider - Only show if courses exist */}
          {coursesData.courses.length > 1 && (
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

              {/* Progress indicator */}
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
          )}
        </div>
      </div>

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
}

// Main component with Suspense boundary
const CoursesSection: React.FC = () => {
  return (
    <Suspense fallback={
      <section className="relative bg-white min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading courses...</p>
        </div>
      </section>
    }>
      <CoursesContent />
    </Suspense>
  );
};

export default CoursesSection;