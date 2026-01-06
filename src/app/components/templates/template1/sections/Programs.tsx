"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { SectionTitle } from '../../../shared/SectionTitle';
import { Card, CardContent } from '../../../shared/Card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaLaptopCode, 
  FaChartLine, 
  FaCogs, 
  FaClock,
  FaGraduationCap,
  FaArrowRight,
  FaDollarSign,
  FaBook,
  FaFlask,
  FaPaintBrush,
  FaMicroscope,
  FaHeartbeat,
  FaGlobeAmericas
} from 'react-icons/fa';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Course {
  id: string;
  name: string;
  image: string;
  credits: number;
  duration: string;
  department: string;
  description: string;
  feeStructure: string;
  syllabus: string;
  isNew?: boolean;
  featured?: boolean;
}

export const Programs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const departmentRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Map department to icons with colors
  const departmentConfig: { 
    [key: string]: { 
      icon: React.ElementType; 
      color: string; 
      bgColor: string;
      gradient: string;
    } 
  } = {
    "CS": { 
      icon: FaLaptopCode, 
      color: "text-blue-600", 
      bgColor: "bg-blue-100",
      gradient: "from-blue-500 to-cyan-500"
    },
    "ENGINEERING": { 
      icon: FaCogs, 
      color: "text-amber-600", 
      bgColor: "bg-amber-100",
      gradient: "from-amber-500 to-orange-500"
    },
    "MEDICAL": { 
      icon: FaHeartbeat, 
      color: "text-red-600", 
      bgColor: "bg-red-100",
      gradient: "from-red-500 to-pink-500"
    },
    "BUSINESS": { 
      icon: FaChartLine, 
      color: "text-emerald-600", 
      bgColor: "bg-emerald-100",
      gradient: "from-emerald-500 to-teal-500"
    },
    "SCIENCE": { 
      icon: FaFlask, 
      color: "text-purple-600", 
      bgColor: "bg-purple-100",
      gradient: "from-purple-500 to-indigo-500"
    },
    "ARTS": { 
      icon: FaPaintBrush, 
      color: "text-pink-600", 
      bgColor: "bg-pink-100",
      gradient: "from-pink-500 to-rose-500"
    },
    "DEFAULT": { 
      icon: FaGraduationCap, 
      color: "text-gray-600", 
      bgColor: "bg-gray-100",
      gradient: "from-gray-500 to-gray-700"
    }
  };

  // Get department config
  const getDepartmentConfig = (department: string) => {
    const deptKey = Object.keys(departmentConfig).find(key => 
      department.toUpperCase().includes(key)
    );
    return departmentConfig[deptKey || "DEFAULT"];
  };

  // Enhanced static data with fewer cards
  const programsData = {
    title: "Academic Pathways",
    subtitle: "Where passion meets profession—choose your journey",
    featuredQuote: "Education shouldn&apos;t fit you into a box. It should help you build your own.",
    
    departments: [
      { 
        id: "1", 
        name: "Computer Science", 
        description: "Code, create, innovate",
        icon: FaLaptopCode,
        color: "blue",
        studentCount: 1200
      },
      { 
        id: "2", 
        name: "Engineering", 
        description: "Build tomorrow's world",
        icon: FaCogs,
        color: "amber",
        studentCount: 850
      },
      { 
        id: "3", 
        name: "Health Sciences", 
        description: "Care, heal, advance",
        icon: FaHeartbeat,
        color: "red",
        studentCount: 700
      },
      { 
        id: "4", 
        name: "Business & Economics", 
        description: "Lead, innovate, grow",
        icon: FaChartLine,
        color: "emerald",
        studentCount: 950
      }
    ],

    courses: [
      {
        id: "1",
        name: "Artificial Intelligence & Machine Learning",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        credits: 18,
        duration: "24",
        department: "CS",
        description: "Go beyond theory—build actual neural networks, train models on real data, and understand the ethics of AI. Taught by engineers who've shipped production systems.",
        feeStructure: "#",
        syllabus: "#",
        isNew: true,
        featured: true
      },
      {
        id: "2",
        name: "Biomedical Engineering",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        credits: 20,
        duration: "36",
        department: "MEDICAL",
        description: "Where biology meets engineering. Design medical devices, work with prosthetics, collaborate with local hospitals on real patient cases.",
        feeStructure: "#",
        syllabus: "#",
        isNew: false,
        featured: true
      },
      {
        id: "3",
        name: "Sustainable Business Strategy",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        credits: 16,
        duration: "18",
        department: "BUSINESS",
        description: "Profit with purpose. Learn to build companies that thrive financially while making positive social and environmental impact.",
        feeStructure: "#",
        syllabus: "#",
        isNew: true,
        featured: false
      },
      {
        id: "4",
        name: "Full-Stack Web Development",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        credits: 15,
        duration: "12",
        department: "CS",
        description: "From frontend finesse to backend logic. Build complete applications using modern frameworks. Portfolio projects are mandatory—you'll graduate with work to show.",
        feeStructure: "#",
        syllabus: "#",
        isNew: false,
        featured: false
      }
    ]
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered card animation
      gsap.fromTo('.program-card',
        { 
          opacity: 0, 
          y: 50,
          scale: 0.95,
          rotationX: 5
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
            markers: false
          }
        }
      );

      // Department chips animation
      gsap.fromTo('.department-chip',
        {
          opacity: 0,
          scale: 0.8,
          x: -20
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.departments-section',
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating animation for featured badge
      gsap.to('.featured-badge', {
        y: -6,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="programs" ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Personality */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <span className="text-blue-600 dark:text-blue-400 text-sm font-medium tracking-wider">
              FIND YOUR PATH
            </span>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          </div>
          
          <SectionTitle
            title={programsData.title}
            subtitle={programsData.subtitle}
            align="center"
            underline={true}
           
            animation="fade"
          />
          
          <div className="mt-8 max-w-3xl mx-auto">
            <p className="text-gray-700 dark:text-gray-300 text-lg italic text-center leading-relaxed font-light">
              &ldquo;Education shouldn&apos;t fit you into a box. It should help you build your own.&rdquo;
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <FaGlobeAmericas className="text-gray-400 text-sm" />
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Departments Filter Chips */}
        <div className="departments-section mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {programsData.departments.map((dept, index) => {
              const Icon = dept.icon;
              return (
             <button
  key={dept.id}
  ref={(el: HTMLButtonElement | null) => {
    departmentRefs.current[index] = el; // assign only
  }}
  className="department-chip group px-5 py-3 rounded-full border transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-3"
  style={{
    background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
    borderColor: `rgb(var(--color-${dept.color}-200))`,
    backgroundColor: `rgb(var(--color-${dept.color}-50))`,
  }}
>
  <div className={`p-2 rounded-full bg-${dept.color}-100`}>
    <Icon className={`text-${dept.color}-600 text-lg`} />
  </div>
  <div className="text-left">
    <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
      {dept.name}
    </div>
    <div className="text-xs text-gray-600 dark:text-gray-400">
      {dept.studentCount} students
    </div>
  </div>
</button>

              );
            })}
          </div>
        </div>

        {/* Programs Grid - Now with only 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {programsData.courses.map((course) => {
            const deptConfig = getDepartmentConfig(course.department);
            const Icon = deptConfig.icon;
            
            return (
              <Card 
                key={course.id} 
                className="program-card group border-0 shadow-xl hover:shadow-2xl flex flex-col h-full overflow-hidden transition-all duration-500 transform hover:-translate-y-3 relative"
              >
                {/* Top Banner */}
                <div className="absolute top-0 left-0 right-0 z-10">
                  {course.isNew && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold rounded-full shadow-lg">
                      NEW
                    </div>
                  )}
                  {course.featured && (
                    <div className="featured-badge absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                      <span>⭐</span> FEATURED
                    </div>
                  )}
                </div>

                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0"></div>
                  {course.image ? (
                    <Image
                      src={course.image}
                      alt={course.name}
                      fill
                      className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${deptConfig.gradient}`} />
                  )}
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  
                  {/* Department Badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${deptConfig.bgColor} backdrop-blur-sm`}>
                      <Icon className={`${deptConfig.color} text-lg`} />
                    </div>
                    <span className="text-white text-xs font-semibold bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
                      {course.department}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <CardContent className="flex-grow flex flex-col p-6">
                  {/* Course Title */}
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {course.name}
                  </h3>

                  {/* Description */}
                  <div className="flex-grow mb-4">
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {course.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <FaClock className="text-blue-500 text-xs" />
                        <span className="text-xs text-gray-500">Duration</span>
                      </div>
                      <div className="font-bold text-gray-900 dark:text-white text-sm">
                        {course.duration} mo
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <FaBook className="text-emerald-500 text-xs" />
                        <span className="text-xs text-gray-500">Credits</span>
                      </div>
                      <div className="font-bold text-gray-900 dark:text-white text-sm">
                        {course.credits}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Icon className={`${deptConfig.color} text-xs`} />
                        <span className="text-xs text-gray-500">Dept</span>
                      </div>
                      <div className="font-bold text-gray-900 dark:text-white text-sm truncate" title={course.department}>
                        {course.department}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm group/btn">
                      <FaDollarSign className="group-hover/btn:rotate-12 transition-transform" />
                      <span>Fee Details</span>
                    </button>
                    
                    <button className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm group/btn">
                      <FaBook className="group-hover/btn:rotate-12 transition-transform" />
                      <span>Syllabus</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Banner */}
        <div className="mt-20 mb-16">
          <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 bottom-0 left-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent"></div>
            </div>
            
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {programsData.courses.length}
                </div>
                <div className="text-blue-200 text-sm">Featured Programs</div>
                <div className="text-blue-300/70 text-xs mt-1">Hand-picked excellence</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  3:1
                </div>
                <div className="text-blue-200 text-sm">Student-Faculty Ratio</div>
                <div className="text-blue-300/70 text-xs mt-1">Personal attention</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  94%
                </div>
                <div className="text-blue-200 text-sm">Placement Rate</div>
                <div className="text-blue-300/70 text-xs mt-1">Within 6 months</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  4
                </div>
                <div className="text-blue-200 text-sm">Departments</div>
                <div className="text-blue-300/70 text-xs mt-1">Diverse disciplines</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
            <div className="text-5xl mb-6">🎯</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Still Searching?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Sometimes the right path is not listed yet. Our academic advisors love helping students 
              design custom learning journeys. Bring your curiosity—we will help you build the rest.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/25 flex items-center justify-center gap-3">
                <span>Schedule Advisor Chat</span>
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              
              <button className="px-8 py-3 bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-semibold rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 transform hover:scale-105">
                Download Full Catalog
              </button>
            </div>
            
            
          </div>
        </div>
      </div>
    </section>
  );
};