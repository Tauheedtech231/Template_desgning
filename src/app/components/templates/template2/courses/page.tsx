'use client';
/* eslint-disable */

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaArrowRight,
  FaArrowLeft,
  FaArrowCircleRight,
  FaCertificate,
  FaCalendarAlt,
  FaShieldAlt,
  FaClock,
  FaUserFriends,
  FaStar
} from "react-icons/fa";
import Image from "next/image";

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Define TypeScript interface for course data
interface Course {
  id: number;
  image: string;
  title: string;
  participants: number;
  duration: string;
  instructor: string;
  category: string;
  rating: number;
  description: string;
  features: string[];
  level: string;
  price: string;
}

// Define interface for the API response structure
interface CoursesData {
  sectionTitle: string;
  sectionDescription: string;
  highlights: Array<{
    id: number;
    icon: string;
    title: string;
    description: string;
  }>;
  courses: Course[];
}

const CoursesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // State for fetched data
  const [coursesData, setCoursesData] = useState<CoursesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Navigation refs
  const nextRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);

  // Fetch data from backend on component mount
  useEffect(() => {
    const fetchCoursesData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch data from your API endpoint
        // Using template_id=2 based on your portfolio structure
        const response = await fetch('https://nes-tick-portfolio-handler.vercel.app/api/sections?template_id=2&section_name=Courses');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch courses: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Log the fetched data for debugging
        console.log('Fetched courses data:', data);
        
        if (data.sections && data.sections.length > 0) {
          // Extract content from the first section
          const dbContent = data.sections[0].content;
          
          // Transform database structure to match frontend expectations
          const transformedData: CoursesData = {
            sectionTitle: dbContent.sectionTitle || "Our Featured Programs",
            sectionDescription: dbContent.sectionDescription || "Industry-recognized safety training programs with hands-on experience and expert guidance",
            highlights: dbContent.highlights || [
              {
                id: 1,
                icon: "FaCertificate",
                title: "Internationally Recognized",
                description: "Certifications accepted by global organizations and regulatory bodies"
              },
              {
                id: 2,
                icon: "FaCalendarAlt",
                title: "Flexible Schedule",
                description: "Weekend, evening & online batches to fit your busy schedule"
              },
              {
                id: 3,
                icon: "FaShieldAlt",
                title: "Career Support",
                description: "Placement assistance and ongoing career guidance for all graduates"
              }
            ],
            courses: dbContent.courses || []
          };
          
          setCoursesData(transformedData);
        } else {
          throw new Error("No courses data found in response");
        }
      } catch (err) {
        console.error("Error fetching courses data:", err);
        setError(err instanceof Error ? err.message : "Failed to load courses data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoursesData();
  }, []);

  useEffect(() => {
    // Only set up animations if we have data and swiper instance
    if (!coursesData || !swiperInstance) return;

    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(
        ".section-header",
        {
          opacity: 0,
          y: -40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
          },
        }
      );

      // Animated underline
      gsap.fromTo(
        ".animated-underline",
        { width: 0 },
        {
          width: "100%",
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".section-title",
            start: "top 85%",
          },
        }
      );

      // Card animations when active
      const handleSlideChange = () => {
        if (swiperInstance) {
          setActiveIndex(swiperInstance.activeIndex);
          
          // Animate active card
          const activeCard = document.querySelector(".swiper-slide-active .course-card");
          if (activeCard) {
            gsap.to(activeCard, {
              scale: 1.02,
              y: -10,
              duration: 0.3,
              ease: "power2.out",
            });
          }
          
          // Reset previous cards
          document.querySelectorAll(".swiper-slide:not(.swiper-slide-active) .course-card").forEach(card => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        }
      };

      if (swiperInstance) {
        swiperInstance.on('slideChange', handleSlideChange);
      }

      // Rest of your animation code remains the same...
      // [Keep all your existing animation code for nav buttons, hover effects, etc.]

    }, sectionRef);

    return () => {
      ctx.revert();
      if (swiperInstance) {
        swiperInstance.off('slideChange');
      }
    };
  }, [swiperInstance, coursesData]); // Add coursesData to dependency array

  const goNext = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  // Icon mapping function
  const getIconComponent = (iconName: string) => {
    switch(iconName) {
      case 'FaCertificate': return FaCertificate;
      case 'FaCalendarAlt': return FaCalendarAlt;
      case 'FaShieldAlt': return FaShieldAlt;
      default: return FaCertificate; // Fallback icon
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <section id="courses" className="relative py-20 bg-[#F8FAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#06B6D4] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading courses...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section id="courses" className="relative py-20 bg-[#F8FAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 text-red-500">
              {/* Error icon */}
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Courses</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#06B6D4] text-white rounded-lg hover:bg-[#14B8A6] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // If no data is available, show empty state
  if (!coursesData || !coursesData.courses || coursesData.courses.length === 0) {
    return (
      <section id="courses" className="relative py-20 bg-[#F8FAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Available</h3>
            <p className="text-gray-600">Check back soon for our training programs.</p>
          </div>
        </div>
      </section>
    );
  }

  const { courses, highlights, sectionTitle, sectionDescription } = coursesData;

  return (
    <section
      id="courses"
      ref={sectionRef}
      className="relative py-20 bg-[#F8FAFC] overflow-hidden"
    >
      {/* [Keep all your existing background elements and structure] */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Now using fetched data */}
        <div className="text-center mb-16 section-header">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#06B6D4]/10 rounded-full mb-6">
            <FaCertificate className="text-[#06B6D4]" />
            <span className="text-[#06B6D4] text-sm font-medium uppercase tracking-wider">
              Professional Training
            </span>
          </div>
          
          <h2 className="section-title text-3xl md:text-4xl lg:text-4xl font-bold text-[#111827] mb-6">
            {sectionTitle || "Our Featured Programs"}
          </h2>
          
          <p className="text-lg text-[#475569] max-w-3xl mx-auto leading-relaxed">
            {sectionDescription}
          </p>
        </div>

        {/* Slider Navigation Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-[#111827]">
              Featured Courses
            </h3>
            <p className="text-[#475569] mt-2">
              Swipe to explore our comprehensive training programs
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Progress Indicator */}
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm text-[#475569]">
                {activeIndex + 1} / {courses.length}
              </span>
              <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#06B6D4] transition-all duration-300"
                  style={{ width: `${((activeIndex + 1) / courses.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex space-x-3">
              <button
                ref={prevRef}
                onClick={goPrev}
                className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#475569] hover:text-[#06B6D4] hover:border-[#06B6D4] transition-colors"
                aria-label="Previous course"
              >
                <FaArrowLeft className="w-5 h-5" />
              </button>
              <button
                ref={nextRef}
                onClick={goNext}
                className="w-12 h-12 rounded-full bg-[#06B6D4] text-white flex items-center justify-center hover:bg-[#14B8A6] transition-colors"
                aria-label="Next course"
              >
                <FaArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Courses Slider - Now using fetched courses */}
        <div className="relative mb-16">
          <Swiper
            onSwiper={setSwiperInstance}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
              type: 'bullets',
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            loop={courses.length > 1}
            className="courses-slider"
          >
            {courses.map((course, index) => (
              <SwiperSlide key={course.id || index}>
                <div className="course-card group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-[#14B8A6] transition-all duration-300 flex flex-col h-full p-0.5">
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden rounded-t-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
                    <Image
                      src={course.image || "/default-course.jpg"}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[#111827] text-xs font-medium rounded-lg">
                        {course.category || "Training"}
                      </span>
                    </div>

                    {/* Level Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1.5 bg-[#06B6D4] text-white text-xs font-medium rounded-lg">
                        {course.level || "All Levels"}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-4 right-4 z-20">
                      <div className="px-4 py-2 bg-black/80 backdrop-blur-sm text-white text-lg font-bold rounded-lg shadow-lg">
                        {course.price || "$0"}
                      </div>
                    </div>
                  </div>

                  {/* Content - Now using fetched course data */}
                  <div className="flex-1 p-6 flex flex-col">
                    {/* Title and Rating */}
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-[#111827] mb-2 line-clamp-2 min-h-[3.5rem]">
                        {course.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(course.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-[#475569]">{course.rating?.toFixed(1) || "N/A"}</span>
                        </div>
                        <div className="text-sm text-[#475569] flex items-center">
                          <FaUserFriends className="w-4 h-4 mr-1" />
                          {course.participants || 0}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#475569] text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {course.features && course.features.slice(0, 3).map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-[#F1F5F9] text-[#475569] text-xs rounded-lg"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Course Details */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-sm text-[#475569] mb-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#06B6D4]/10 flex items-center justify-center mr-2">
                            <FaClock className="text-[#06B6D4] w-3 h-3" />
                          </div>
                          <span>{course.duration || "Flexible"}</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button className="apply-button w-full py-3 bg-gradient-to-r from-[#06B6D4] to-[#14B8A6] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center group">
                        <span>Enroll Now</span>
                        <FaArrowCircleRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform hover-arrow" />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination */}
          <div className="swiper-pagination !relative !mt-8 flex justify-center gap-2"></div>
        </div>

        {/* Course Highlights - Now using fetched highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {highlights.map((highlight) => {
            const IconComponent = getIconComponent(highlight.icon);
            return (
              <div key={highlight.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="text-[#06B6D4] text-lg" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111827] mb-2">{highlight.title}</h4>
                    <p className="text-sm text-[#475569]">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Keep your existing custom Swiper styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #CBD5E1;
          opacity: 1;
        }
        
        .swiper-pagination-bullet-active {
          background: #06B6D4;
          width: 30px;
          border-radius: 5px;
        }
        
        .courses-slider {
          padding: 20px 10px;
          margin: -20px -10px;
        }
        
        .swiper-slide {
          height: auto;
          transition: transform 0.3s ease;
        }
        
        .swiper-slide-active {
          transform: translateY(-5px);
        }
      `}</style>
    </section>
  );
};

export default CoursesSection;