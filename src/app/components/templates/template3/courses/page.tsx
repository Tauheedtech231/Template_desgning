'use client';

import React, { useEffect, useRef, useState } from "react";
import { 
  FaArrowRight,
  FaArrowLeft,
  FaArrowCircleRight,
  FaCertificate,
  FaCalendarAlt,
  FaShieldAlt,
  FaClock,
  FaUserFriends,
  FaStar,
  FaBookOpen,
  FaGraduationCap,
  FaChartLine
} from "react-icons/fa";
import Image from "next/image";

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

// Define interface for the highlights
interface Highlight {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const CoursesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  /* eslint-disable */

  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Navigation refs
  const nextRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);

  // Generic courses data
  const coursesData = {
    sectionTitle: "Featured Academic Programs",
    sectionDescription: "Industry-relevant courses designed to equip students with practical skills and theoretical knowledge for career success",
    highlights: [
      {
        id: 1,
        icon: <FaGraduationCap className="text-[#064E3B] text-lg" />,
        title: "Industry-Relevant Curriculum",
        description: "Courses designed in collaboration with industry experts"
      },
      {
        id: 2,
        icon: <FaChartLine className="text-[#064E3B] text-lg" />,
        title: "Career Advancement",
        description: "98% of our graduates secure employment within 6 months"
      },
      {
        id: 3,
        icon: <FaBookOpen className="text-[#064E3B] text-lg" />,
        title: "Flexible Learning",
        description: "Full-time, part-time, and online study options available"
      }
    ],
    courses: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Computer Science Fundamentals",
        participants: 250,
        duration: "12 Weeks",
        instructor: "Dr. Sarah Johnson",
        category: "Technology",
        rating: 4.8,
        description: "Master programming fundamentals, algorithms, and software development principles.",
        features: ["Hands-on Projects", "Industry Certifications", "Career Support"],
        level: "Beginner",
        price: "$1,200"
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2111&q=80",
        title: "Business Administration",
        participants: 180,
        duration: "16 Weeks",
        instructor: "Prof. Michael Chen",
        category: "Business",
        rating: 4.7,
        description: "Develop leadership, management, and strategic planning skills for business success.",
        features: ["Case Studies", "Networking Events", "Internship Support"],
        level: "Intermediate",
        price: "$1,500"
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Engineering Principles",
        participants: 150,
        duration: "20 Weeks",
        instructor: "Dr. Robert Williams",
        category: "Engineering",
        rating: 4.9,
        description: "Learn core engineering concepts with practical applications and project-based learning.",
        features: ["Lab Sessions", "Industry Projects", "Technical Workshops"],
        level: "Advanced",
        price: "$1,800"
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Digital Marketing",
        participants: 220,
        duration: "10 Weeks",
        instructor: "Prof. Lisa Anderson",
        category: "Marketing",
        rating: 4.6,
        description: "Master digital marketing strategies, analytics, and campaign management.",
        features: ["Real Campaigns", "Analytics Tools", "Portfolio Building"],
        level: "Beginner",
        price: "$900"
      },
      {
        id: 5,
        image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2036&q=80",
        title: "Data Science & Analytics",
        participants: 190,
        duration: "14 Weeks",
        instructor: "Dr. David Miller",
        category: "Data Science",
        rating: 4.8,
        description: "Learn data analysis, machine learning, and statistical modeling techniques.",
        features: ["Python/R Training", "Real Datasets", "Industry Tools"],
        level: "Intermediate",
        price: "$1,400"
      }
    ]
  };

  const { courses, highlights, sectionTitle, sectionDescription } = coursesData;

  useEffect(() => {
    // Set up swiper instance and active index tracking
    if (swiperInstance) {
      const handleSlideChange = () => {
        setActiveIndex(swiperInstance.activeIndex);
      };
      
      swiperInstance.on('slideChange', handleSlideChange);
      
      return () => {
        swiperInstance.off('slideChange');
      };
    }
  }, [swiperInstance]);

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

  return (
    <section
      id="courses"
      ref={sectionRef}
      className="relative py-20 bg-[#F1F5F9] overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#064E3B]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0F172A]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#064E3B]/10 rounded-full mb-6">
            <FaCertificate className="text-[#064E3B]" />
            <span className="text-[#064E3B] text-sm font-medium uppercase tracking-wider">
              Academic Excellence
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#0F172A] mb-6">
            {sectionTitle}
          </h2>
          
          <p className="text-lg text-[#475569] max-w-3xl mx-auto leading-relaxed">
            {sectionDescription}
          </p>
        </div>

        {/* Slider Navigation Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
          <div>
            <h3 className="text-2xl font-bold text-[#0F172A]">
              Popular Programs
            </h3>
            <p className="text-[#475569] mt-2">
              Browse through our comprehensive academic offerings
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Progress Indicator */}
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm text-[#475569]">
                {activeIndex + 1} / {courses.length}
              </span>
              <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#064E3B] transition-all duration-300"
                  style={{ width: `${((activeIndex + 1) / courses.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex gap-3">
              <button
                ref={prevRef}
                onClick={goPrev}
                className="w-10 h-10 rounded-lg bg-white border border-gray-300 flex items-center justify-center text-[#475569] hover:text-[#064E3B] hover:border-[#064E3B] transition-all duration-300 shadow-sm"
                aria-label="Previous course"
              >
                <FaArrowLeft className="w-4 h-4" />
              </button>
              <button
                ref={nextRef}
                onClick={goNext}
                className="w-10 h-10 rounded-lg bg-white border border-gray-300 flex items-center justify-center text-[#475569] hover:text-[#064E3B] hover:border-[#064E3B] transition-all duration-300 shadow-sm"
                aria-label="Next course"
              >
                <FaArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Courses Slider */}
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
            {courses.map((course) => (
              <SwiperSlide key={course.id}>
                <div className="course-card group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10" />
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-white text-[#0F172A] text-xs font-medium rounded-lg">
                        {course.category}
                      </span>
                    </div>

                    {/* Level Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 bg-[#064E3B] text-white text-xs font-medium rounded-lg">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col">
                    {/* Title and Rating */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-[#0F172A] mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(course.rating) ? "text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-[#475569]">{course.rating.toFixed(1)}</span>
                        </div>
                        <div className="text-sm text-[#475569] flex items-center">
                          <FaUserFriends className="w-4 h-4 mr-1" />
                          {course.participants}
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
                        {course.features.slice(0, 3).map((feature, idx) => (
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
                          <FaClock className="text-[#064E3B] w-4 h-4 mr-2" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="text-lg font-bold text-[#064E3B]">
                          {course.price}
                        </div>
                      </div>

                      {/* Action Button */}
                      <button className="w-full py-3 bg-[#064E3B] text-white rounded-lg hover:bg-[#04332A] transition-colors duration-300 font-medium flex items-center justify-center shadow-sm">
                        <span>Enroll Now</span>
                        <FaArrowCircleRight className="ml-2 w-4 h-4" />
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

        {/* Course Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {highlights.map((highlight) => (
            <div key={highlight.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#064E3B]/10 flex items-center justify-center flex-shrink-0">
                  {highlight.icon}
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] mb-2">{highlight.title}</h4>
                  <p className="text-sm text-[#475569]">
                    {highlight.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Programs CTA */}
        <div className="text-center">
          <button className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#064E3B] text-[#064E3B] font-medium rounded-lg hover:bg-[#064E3B] hover:text-white transition-all duration-300">
            View All Programs
            <FaArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Swiper Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #CBD5E1;
          opacity: 1;
        }
        
        .swiper-pagination-bullet-active {
          background: #064E3B;
        }
        
        .courses-slider {
          padding: 10px 5px;
          margin: -10px -5px;
        }
        
        .swiper-slide {
          height: auto;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default CoursesSection;