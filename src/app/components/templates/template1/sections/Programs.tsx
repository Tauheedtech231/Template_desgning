"use client";

import React, { useEffect, useRef, useState } from 'react';
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
  FaArrowRight,
  FaDollarSign,
  FaBook
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
}

interface Department {
  id: string;
  name: string;
  createdAt: string;
}

interface CoursesSection {
  id: number;
  template_id: number;
  section_name: string;
  content: {
    courses: Course[];
    departments: Department[];
    title?: string;
    subtitle?: string;
  };
  created_at?: string;
}

export const Programs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [coursesData, setCoursesData] = useState<CoursesSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        const res = await fetch('https://nes-tick-portfolio-handler.vercel.app/api/sections?template_id=1&section_name=Courses', {
          cache: "no-store"
        });
        
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status}`);
        }
        
        const data = await res.json();
        console.log('Fetched courses data:', data);
        
        // Assuming API returns an array of sections, take the first one
        if (Array.isArray(data.sections) && data.sections.length > 0) {
          setCoursesData(data.sections[0]);
        } else {
          throw new Error('No courses data found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching courses data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesData();
  }, []);

  useEffect(() => {
    if (!coursesData) return;

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
  }, [coursesData]);

  // Map department to icons
  const departmentIcons: { [key: string]: React.ElementType } = {
    "CS": FaLaptopCode,
    "FSC": FaCogs,
    "ENGINEERING": FaCogs,
    "MEDICAL": FaUserMd,
    "BUSINESS": FaChartLine,
    "DEFAULT": FaGraduationCap
  };

  // Get icon for department
  const getDepartmentIcon = (department: string): React.ElementType => {
    return departmentIcons[department] || departmentIcons["DEFAULT"];
  };

  // Loading state
  if (loading) {
    return (
      <section id="programs" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading programs...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="programs" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-500">Error: {error}</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Failed to load programs. Using default data.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Use API data if available, otherwise use default data
  const content = coursesData?.content || {
    courses: defaultCollegeInfo.programs.map((program, index) => ({
      id: program.id.toString(),
      name: program.title,
      image: "",
      credits: 3,
      duration: program.duration,
      department: "CS",
      description: program.description,
      feeStructure: "",
      syllabus: ""
    })),
    departments: [
      { id: "1", name: "Computer Science", createdAt: "" },
      { id: "2", name: "Engineering", createdAt: "" }
    ],
    title: "Academic Programs",
    subtitle: "Comprehensive education designed for your success"
  };

  const courses = content.courses || [];
  const departments = content.departments || [];

  return (
    <section id="programs" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={content.title || "Academic Programs"}
          subtitle={content.subtitle || "Comprehensive education designed for your success"}
          align="center"
          underline={true}
          underlineVariant="primary"
          animation="fade"
        />

        {courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">No programs available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course) => {
                const DepartmentIcon = getDepartmentIcon(course.department);
                
                return (
                  <Card 
                    key={course.id} 
                    className="program-card group border-0 shadow-lg hover:shadow-xl flex flex-col h-full overflow-hidden transition-all duration-300 transform hover:-translate-y-2"
                  >
                    {/* Top Section with Hover Effect */}
                    <div className="relative h-40 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
                      {/* Default Icon View */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-all duration-500 group-hover:opacity-0 group-hover:scale-110">
                        <div className="text-3xl mb-3 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:scale-110">
                          <DepartmentIcon className="w-10 h-10" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center leading-tight">
                          {course.name}
                        </h3>
                      </div>

                      {/* Hover Image View - Always render but control visibility */}
                      <div className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100">
                        <div className="relative w-full h-full">
                          {course.image ? (
                            <Image
                              src={course.image}
                              alt={course.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                // Show fallback background
                                target.parentElement!.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600" />
                          )}
                          <div className="absolute inset-0 bg-black/20 transition-opacity duration-300" />
                          <div className="absolute top-3 left-3 text-white text-lg">
                            <DepartmentIcon className="w-6 h-6" />
                          </div>
                          <h3 className="absolute bottom-3 left-3 right-3 text-white font-bold text-sm leading-tight">
                            {course.name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Content Section - Always Visible */}
                    <CardContent className="flex-grow flex flex-col p-5">
                      {/* Description - Shows in default state, hides on hover */}
                      <div className="flex-grow transition-all duration-300 group-hover:opacity-0 group-hover:h-0 overflow-hidden">
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                          {course.description}
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
                            {course.duration} Months
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-1">
                          <div className="flex items-center gap-2">
                            <FaBook className="text-green-500 text-xs" />
                            <span>Credits:</span>
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
                            {course.credits}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-1">
                          <div className="flex items-center gap-2">
                            <FaGraduationCap className="text-purple-500 text-xs" />
                            <span>Department:</span>
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
                            {course.department}
                          </span>
                        </div>
                      </div>
                      
                      {/* CTA Buttons */}
                      <div className="flex gap-2 mt-4">
                        {course.feeStructure && (
                          <a 
                            href={course.feeStructure}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-xs"
                          >
                            <FaDollarSign />
                            <span>Fees</span>
                          </a>
                        )}
                        {course.syllabus && (
                          <a 
                            href={course.syllabus}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-xs"
                          >
                            <FaBook />
                            <span>Syllabus</span>
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Departments Section */}
            {departments.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">
                  Departments
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {departments.map((dept) => {
                    const DepartmentIcon = getDepartmentIcon(dept.name);
                    return (
                      <div 
                        key={dept.id}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700"
                      >
                        <DepartmentIcon className="text-blue-600 dark:text-blue-400 text-sm" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {dept.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-4">
                  Can not Find Your Program?
                </h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto leading-relaxed">
                  We offer {courses.length}+ academic programs across various disciplines. 
                  Contact our admissions team to explore all available options.
                </p>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto">
                  <span>View All Programs</span>
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};