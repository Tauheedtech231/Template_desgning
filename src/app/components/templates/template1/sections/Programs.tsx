"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { SectionTitle } from '../../../shared/SectionTitle';
import { Card, CardContent } from '../../../shared/Card';
import { defaultCollegeInfo } from '../data/collegeInfo';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaLaptopCode, 
  FaChartLine, 
  FaCogs, 
  FaUserMd,
  FaClock,
  FaGraduationCap,
  FaArrowRight
} from 'react-icons/fa';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const Programs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.program-card',
        { 
          opacity: 0, 
          y: 80,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Map program icons to React Icons
  const programIcons = {
    "1": FaUserMd,
    "2": FaCogs,
    "3": FaLaptopCode,
    "4": FaChartLine
  };

  // Program images with optimized sizes
  const programImages = {
    "1": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    "2": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    "3": "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    "4": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
  };

  return (
    <section id="programs" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Academic Programs"
          subtitle="Comprehensive education designed for your success"
          align="center"
          underline={true}
          underlineVariant="primary"
          animation="fade"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {defaultCollegeInfo.programs.map((program) => {
            const IconComponent = programIcons[program.id as keyof typeof programIcons];
            const programImage = programImages[program.id as keyof typeof programImages];
            
            return (
              <Card 
                key={program.id} 
                className="program-card group border-0 shadow-lg hover:shadow-xl flex flex-col h-full overflow-hidden transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Top Section with Hover Effect */}
                <div className="relative h-40 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
                  {/* Default Icon View */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-all duration-500 group-hover:opacity-0 group-hover:scale-110">
                    <div className="text-3xl mb-3 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:scale-110">
                      {IconComponent && <IconComponent className="w-10 h-10" />}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center leading-tight">
                      {program.title}
                    </h3>
                  </div>

                  {/* Hover Image View - Always render but control visibility */}
                  <div className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <div className="relative w-full h-full">
                      <Image
                        src={programImage}
                        alt={program.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black/20 transition-opacity duration-300" />
                      <div className="absolute top-3 left-3 text-white text-lg">
                        {IconComponent && <IconComponent className="w-6 h-6" />}
                      </div>
                      <h3 className="absolute bottom-3 left-3 right-3 text-white font-bold text-sm leading-tight">
                        {program.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Content Section - Always Visible */}
                <CardContent className="flex-grow flex flex-col p-5">
                  {/* Description - Shows in default state, hides on hover */}
                  <div className="flex-grow transition-all duration-300 group-hover:opacity-0 group-hover:h-0 overflow-hidden">
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {program.description}
                    </p>
                  </div>

                  {/* Program Details - Always Visible */}
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400 mt-4">
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-blue-500 text-xs" />
                        <span>Duration:</span>
                      </div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
                        {program.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <FaGraduationCap className="text-purple-500 text-xs" />
                        <span>Degree:</span>
                      </div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
                        {program.degree}
                      </span>
                    </div>
                  </div>
                  
                  {/* CTA Button - Always Visible */}
                  <button className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm mt-4">
                    <span>Learn More</span>
                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">
              Can not Find Your Program?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto leading-relaxed">
              We offer 50+ academic programs across various disciplines. 
              Contact our admissions team to explore all available options.
            </p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto">
              <span>View All Programs</span>
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};