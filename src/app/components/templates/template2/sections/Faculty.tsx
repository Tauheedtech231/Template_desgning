"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Linkedin, ChevronLeft, ChevronRight } from "lucide-react";

interface Faculty {
  image: string;
  name: string;
  designation: string;
  linkedin?: string;
}

const facultyMembers: Faculty[] = [
  {
    image: "/template2_faculty/fac1.jpg",
    name: "Amir Aziz",
    designation: "General Manager at Mansol Manpower Solutions",
    linkedin: "https://www.linkedin.com/in/amir-aziz-7b117b4a/",
  },
  {
    image: "/template2_faculty/fac2.jpg",
    name: "Taiba Malik",
    designation: "HR Manager at Mansol Institute",
    linkedin: "https://www.linkedin.com/in/taiba-malik-b76948325/",
  },
  {
    image: "/template2_faculty/fac3.jpg",
    name: "Abdul Khalique Khan",
    designation: "Chief Executive at Mansol Manpower Solutions",
    linkedin: "https://www.linkedin.com/in/abdul-khalique-khan-36837227/",
  },
];

const FacultySection: React.FC = () => {
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const scrollPositionRef = useRef<number>(0);

  // Continuous scrolling animation
  const animate = () => {
    if (sliderRef.current && isAutoPlaying) {
      scrollPositionRef.current += 0.5; // Adjust speed here
      
      if (scrollPositionRef.current >= sliderRef.current.scrollWidth / 2) {
        scrollPositionRef.current = 0;
      }
      
      sliderRef.current.scrollLeft = scrollPositionRef.current;
    }
    
    animationRef.current = requestAnimationFrame(animate);
  };

  // Start/stop animation
  useEffect(() => {
    if (isAutoPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationRef.current);
    }
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isAutoPlaying]);

  // Pause on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Manual scroll with buttons
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  // Duplicate faculty members for seamless loop
  const sliderFaculty = [...facultyMembers, ...facultyMembers, ...facultyMembers];

  return (
    <section id="faculty" className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-14">
          <h3 className="text-sm sm:text-base font-medium text-red-600 uppercase tracking-wider mb-2">
            Our Team
          </h3>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Meet Our <span className="text-blue-700">Faculty</span>
          </h1>
        </div>

        {/* Continuous Slider Container */}
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Continuous Slider */}
          <div 
            ref={sliderRef}
            className="overflow-x-auto scrollbar-hide"
            style={{ cursor: 'grab' }}
          >
            <div className="flex gap-6 md:gap-8 py-4 min-w-max">
              {sliderFaculty.map((faculty, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 p-6 w-64 md:w-72 flex-shrink-0"
                >
                  {/* Avatar Circle */}
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <Image
                      src={faculty.image}
                      alt={faculty.name}
                      fill
                      className="object-cover rounded-full border-4 border-white shadow-lg"
                      sizes="128px"
                    />
                  </div>
                  
                  {/* Content Container */}
                  <div className="text-center">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                      {faculty.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">
                      {faculty.designation}
                    </p>
                    
                    {faculty.linkedin && (
                      <a
                        href={faculty.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 mx-auto rounded-full bg-blue-700 hover:bg-blue-800 text-white transition-all duration-300 shadow-md hover:shadow-lg"
                        aria-label={`Connect with ${faculty.name} on LinkedIn`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Auto Play Indicator */}
      
        </div>

        {/* Description */}
       
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
};

export default FacultySection;