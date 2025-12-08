"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Users, Award, Shield, Globe } from "lucide-react";

interface TrainingProgram {
  image: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  stats: { value: string; label: string }[];
}

const programs: TrainingProgram[] = [
  {
    image: "/man1.jpg",
    title: "Technical Training",
    description: "Enhance your practical skills with hands-on technical training in high-value industries including construction, engineering, and industrial projects.",
    category: "Engineering",
    icon: <Award className="w-5 h-5" />,
    stats: [
      { value: "2,500+", label: "Trained" },
      { value: "95%", label: "Success" }
    ]
  },
  {
  image: "/man2.jpg",
    title: "Language Courses",
    description: "Learn Korean and Japanese with certified instructors for global career opportunities in international markets.",
    category: "Language",
    icon: <Globe className="w-5 h-5" />,
    stats: [
      { value: "1,800+", label: "Students" },
      { value: "90%", label: "Pass Rate" }
    ]
  },
  {
    image: "/man3.jpg",
    title: "Safety Certification",
    description: "Get international certifications in NEBOSH, IOSH, OSHA, and more for workplace safety compliance and leadership.",
    category: "Safety",
    icon: <Shield className="w-5 h-5" />,
    stats: [
      { value: "3,000+", label: "Certified" },
      { value: "98%", label: "Approval" }
    ]
  },
  {
   image: "/man4.jpg",
    title: "Engineering Services",
    description: "Acquire specialized knowledge in oil, gas, and construction engineering services for industrial projects.",
    category: "Services",
    icon: <Users className="w-5 h-5" />,
    stats: [
      { value: "500+", label: "Projects" },
      { value: "15+", label: "Years Exp" }
    ]
  },
  {
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    title: "Advanced Workshops",
    description: "Specialized workshops for advanced technical skills and industry-specific training programs.",
    category: "Workshop",
    icon: <Award className="w-5 h-5" />,
    stats: [
      { value: "200+", label: "Workshops" },
      { value: "4.8★", label: "Rating" }
    ]
  },
];

const FeaturedPrograms: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  const extendedPrograms = [...programs, ...programs.slice(0, 3)];

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 4000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [isAnimating]);

  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(prev => {
      const next = prev + 1;
      if (next >= programs.length) {
        setTimeout(() => {
          if (sliderRef.current) {
            sliderRef.current.style.transition = 'none';
            setCurrentIndex(0);
            setTimeout(() => {
              if (sliderRef.current) {
                sliderRef.current.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
              }
            }, 50);
          }
        }, 700);
        return next;
      }
      return next;
    });
    
    setTimeout(() => setIsAnimating(false), 700);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(prev => {
      const next = prev - 1;
      if (next < 0) {
        setTimeout(() => {
          if (sliderRef.current) {
            sliderRef.current.style.transition = 'none';
            setCurrentIndex(programs.length - 1);
            setTimeout(() => {
              if (sliderRef.current) {
                sliderRef.current.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
              }
            }, 50);
          }
        }, 700);
        return next;
      }
      return next;
    });
    
    setTimeout(() => setIsAnimating(false), 700);
  };

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const getSlideStyle = () => {
    const basePercent = 100 / 3;
    const translate = -currentIndex * basePercent;
    return {
      transform: `translateX(${translate}%)`,
      transition: isAnimating ? 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
    };
  };

  return (
    <section 
      className="relative bg-gradient-to-b from-[#F8F5F0] to-white py-16 md:py-24 overflow-hidden"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#F28C28]/10 to-[#4B3F72]/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[#4B3F72]/10 to-[#F28C28]/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-[#F28C28]/10 to-[#4B3F72]/10">
            <div className="w-2 h-2 rounded-full bg-[#F28C28]" />
            <span className="text-sm font-semibold text-[#F28C28] uppercase tracking-wider">
              Featured Programs
            </span>
            <div className="w-2 h-2 rounded-full bg-[#4B3F72]" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-[#4B3F72] mb-6">
            Our <span className="bg-gradient-to-r from-[#4B3F72] to-[#F28C28] bg-clip-text text-transparent">
              Training Programs
            </span>
          </h2>
          
          <p className="text-lg text-[#8E8D8A] max-w-2xl mx-auto">
            World-class training programs designed to enhance your skills and boost your career
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div 
            ref={sliderRef}
            className="flex"
            style={getSlideStyle()}
          >
            {extendedPrograms.map((program, idx) => (
              <div
                key={idx}
                className="w-full md:w-1/3 px-3 lg:px-4 flex-shrink-0"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                  {/* Image Container with Overlay */}
                  <div className="relative h-72 md:h-80 overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm">
                        <div className="text-[#F28C28]">
                          {program.icon}
                        </div>
                        <span className="text-xs font-semibold text-[#4B3F72]">
                          {program.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Hover Overlay Content */}
                    <div className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 ${
                      hoveredIndex === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4">
                          {program.stats.map((stat, i) => (
                            <div key={i} className="text-center">
                              <div className="text-xl font-bold text-white">{stat.value}</div>
                              <div className="text-xs text-white/80">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                        
                        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F28C28] text-white text-sm font-semibold hover:bg-[#E67C18] transition-colors">
                          <Play className="w-4 h-4" />
                          Learn More
                        </button>
                      </div>
                    </div>
                    
                    {/* Static Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{program.title}</h3>
                      <p className="text-white/90 text-sm line-clamp-2">{program.description}</p>
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-[#F28C28] uppercase tracking-wider">
                        Featured Program
                      </span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#4B3F72]/20" />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <button className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#4B3F72] to-[#4B3F72]/90 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                        Enroll Now
                      </button>
                      <div className="text-sm text-[#8E8D8A] font-medium">
                        Starts Weekly
                      </div>
                    </div>
                  </div>
                  
                  {/* Corner Decoration */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#F28C28]/10 to-transparent rounded-bl-3xl" />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center hover:bg-white hover:scale-110 hover:shadow-2xl transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-[#4B3F72] group-hover:text-[#F28C28]" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center hover:bg-white hover:scale-110 hover:shadow-2xl transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-[#4B3F72] group-hover:text-[#F28C28]" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {programs.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`relative group transition-all duration-300 ${
                currentIndex === idx ? 'scale-125' : ''
              }`}
            >
              <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentIndex === idx 
                  ? 'bg-gradient-to-r from-[#4B3F72] to-[#F28C28]' 
                  : 'bg-[#4B3F72]/30 hover:bg-[#4B3F72]/50'
              }`} />
              <div className={`absolute inset-0 -m-2 rounded-full transition-all duration-300 ${
                currentIndex === idx 
                  ? 'bg-gradient-to-r from-[#4B3F72]/20 to-[#F28C28]/20' 
                  : 'group-hover:bg-[#4B3F72]/10'
              }`} />
            </button>
          ))}
        </div>

        {/* Info Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-[#4B3F72] mb-2">5,000+</div>
            <div className="text-sm text-[#8E8D8A] font-medium">Professionals Trained</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-[#4B3F72] mb-2">98%</div>
            <div className="text-sm text-[#8E8D8A] font-medium">Success Rate</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-[#4B3F72] mb-2">15+</div>
            <div className="text-sm text-[#8E8D8A] font-medium">Years Experience</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-[#4B3F72] mb-2">50+</div>
            <div className="text-sm text-[#8E8D8A] font-medium">Industry Partners</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrograms;