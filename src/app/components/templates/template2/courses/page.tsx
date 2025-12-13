"use client";
/* eslint-disable */

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaUserFriends, 
  FaClock, 
  FaChalkboardTeacher, 
  FaGraduationCap, 
  FaStar,
  FaArrowRight,
  FaArrowLeft,
  FaArrowCircleRight,
  FaCertificate,
  FaCalendarAlt,
  FaShieldAlt,
  FaPlayCircle
} from "react-icons/fa";
import Image from "next/image";

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const courses = [
  {
    image: "/cu1.jpg",
    title: "Basic First Aid",
    participants: 25,
    duration: "8h",
    instructor: "Masol Hab",
    category: "First Aid Training",
    rating: 4.8,
    description: "Essential first aid techniques for workplace emergencies",
    features: ["CPR Certification", "Emergency Response", "Wound Care"],
    level: "Beginner",
    price: "$199"
  },
  {
    image: "/cu2.jpg",
    title: "Integrated Safety & Compliance",
    participants: 42,
    duration: "40h",
    instructor: "Masol Hab",
    category: "All In One",
    rating: 4.9,
    description: "Comprehensive safety training covering 7 critical modules",
    features: ["7 Modules", "Certification", "Practical Training"],
    level: "Advanced",
    price: "$899"
  },
  {
    image: "/cu3.jpg",
    title: "Basic Orientation of Safety & Health",
    participants: 38,
    duration: "16h",
    instructor: "Masol Hab",
    category: "BOSH Training",
    rating: 4.7,
    description: "Fundamental occupational safety and health orientation",
    features: ["OSHA Standards", "Risk Assessment", "Safety Protocols"],
    level: "Intermediate",
    price: "$349"
  },
  {
    image: "/cu4.jpg",
    title: "Fire Safety Essentials",
    participants: 31,
    duration: "12h",
    instructor: "Masol Hab",
    category: "Fire Safety Training",
    rating: 4.8,
    description: "Essential fire prevention and response procedures",
    features: ["Fire Extinguisher Use", "Evacuation Plans", "Fire Prevention"],
    level: "Beginner",
    price: "$249"
  },
  {
    image: "/cu5.jpg",
    title: "OSHA Compliance Basics",
    participants: 45,
    duration: "20h",
    instructor: "Masol Hab",
    category: "OSHA Training",
    rating: 4.9,
    description: "Understanding and implementing OSHA standards",
    features: ["Regulatory Compliance", "Workplace Safety", "Legal Requirements"],
    level: "Intermediate",
    price: "$449"
  },
  {
    image: "/cu6.jpg",
    title: "Hole Watcher Safety",
    participants: 22,
    duration: "6h",
    instructor: "Masol Hab",
    category: "Specialized Safety",
    rating: 4.6,
    description: "Safety protocols for confined space monitoring",
    features: ["Confined Space", "Risk Mitigation", "Monitoring Protocols"],
    level: "Specialized",
    price: "$299"
  },
];

const CoursesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Navigation refs
  const nextRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
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

      // Counter animation
      gsap.fromTo(
        ".counter-animation",
        { textContent: 0 },
        {
          textContent: ( target:any) => target.getAttribute("data-value"),
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".counter-section",
            start: "top 80%",
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

      // Animate navigation buttons on hover
      const navButtons = [nextRef.current, prevRef.current];
      navButtons.forEach(button => {
        if (button) {
          button.addEventListener("mouseenter", () => {
            gsap.to(button, {
              scale: 1.1,
              duration: 0.2,
              ease: "power2.out",
            });
          });
          
          button.addEventListener("mouseleave", () => {
            gsap.to(button, {
              scale: 1,
              duration: 0.2,
              ease: "power2.out",
            });
          });
        }
      });

      // Hover effects for course cards
      document.querySelectorAll(".course-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -12,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
            borderColor: "#14B8A6",
          });
          
          // Animate the arrow
          const arrow = card.querySelector(".hover-arrow");
          if (arrow) {
            gsap.to(arrow, {
              x: 5,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            borderColor: "#E2E8F0",
          });
          
          // Reset arrow
          const arrow = card.querySelector(".hover-arrow");
          if (arrow) {
            gsap.to(arrow, {
              x: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      if (swiperInstance) {
        swiperInstance.off('slideChange');
      }
    };
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
      className="relative py-20 bg-[#F8FAFC] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#06B6D4]/5 to-[#14B8A6]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#06B6D4]/5 to-transparent rounded-full blur-3xl"></div>
        
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(90deg, transparent 95%, #06B6D4 100%),
                             linear-gradient(180deg, transparent 95%, #06B6D4 100%)`,
            backgroundSize: '60px 60px',
          }}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 section-header">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#06B6D4]/10 rounded-full mb-6">
            <FaCertificate className="text-[#06B6D4]" />
            <span className="text-[#06B6D4] text-sm font-medium uppercase tracking-wider">
              Professional Training
            </span>
          </div>
          
          <h2 className="section-title text-3xl md:text-4xl lg:text-4xl font-bold text-[#111827] mb-6">
  Our Featured{" "}
  <span className="relative">
    <span className="text-[#06B6D4]">Programs</span>
    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent animated-underline"></div>
  </span>
</h2>

          
          <p className="text-lg text-[#475569] max-w-3xl mx-auto leading-relaxed">
            Industry-recognized safety training programs with hands-on experience and expert guidance
          </p>
        </div>

        {/* Counter Section */}
        <div className="counter-section grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { number: 1500, label: "Professionals Trained", icon: <FaUserFriends /> },
            { number: 98, label: "Certification Rate", suffix: "%", icon: <FaCertificate /> },
            { number: 25, label: "Expert Instructors", icon: <FaChalkboardTeacher /> },
            { number: 50, label: "Industry Partners", icon: <FaGraduationCap /> },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center">
                  <div className="text-[#06B6D4] text-lg">
                    {stat.icon}
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span 
                      className="counter-animation text-2xl font-bold text-[#111827]" 
                      data-value={stat.number}
                    >
                      {stat.number}
                    </span>
                    {stat.suffix && (
                      <span className="text-2xl font-bold text-[#111827]">{stat.suffix}</span>
                    )}
                  </div>
                  <div className="text-sm text-[#475569]">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
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
            loop={true}
            className="courses-slider"
          >
            {courses.map((course, index) => (
              <SwiperSlide key={index}>
                <div className="course-card group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-[#14B8A6] transition-all duration-300 flex flex-col h-full p-0.5">
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden rounded-t-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[#111827] text-xs font-medium rounded-lg">
                        {course.category}
                      </span>
                    </div>

                    {/* Level Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1.5 bg-[#06B6D4] text-white text-xs font-medium rounded-lg">
                        {course.level}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-4 right-4 z-20">
                      <div className="px-4 py-2 bg-black/80 backdrop-blur-sm text-white text-lg font-bold rounded-lg shadow-lg">
                        {course.price}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
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
                              className={`w-4 h-4 ${i < Math.floor(course.rating) ? "text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-[#475569]">{course.rating}</span>
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
                          <div className="w-8 h-8 rounded-full bg-[#06B6D4]/10 flex items-center justify-center mr-2">
                            <FaClock className="text-[#06B6D4] w-3 h-3" />
                          </div>
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#06B6D4]/10 flex items-center justify-center mr-2">
                            <FaChalkboardTeacher className="text-[#06B6D4] w-3 h-3" />
                          </div>
                          <span>Expert</span>
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

        {/* Course Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center flex-shrink-0">
                <FaCertificate className="text-[#06B6D4] text-lg" />
              </div>
              <div>
                <h4 className="font-bold text-[#111827] mb-2">Internationally Recognized</h4>
                <p className="text-sm text-[#475569]">
                  Certifications accepted by global organizations and regulatory bodies
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center flex-shrink-0">
                <FaCalendarAlt className="text-[#06B6D4] text-lg" />
              </div>
              <div>
                <h4 className="font-bold text-[#111827] mb-2">Flexible Schedule</h4>
                <p className="text-sm text-[#475569]">
                  Weekend, evening & online batches to fit your busy schedule
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center flex-shrink-0">
                <FaShieldAlt className="text-[#06B6D4] text-lg" />
              </div>
              <div>
                <h4 className="font-bold text-[#111827] mb-2">Career Support</h4>
                <p className="text-sm text-[#475569]">
                  Placement assistance and ongoing career guidance for all graduates
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
      
      </div>

      {/* Custom Swiper Styles */}
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