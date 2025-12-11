"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaUserFriends, FaClock, FaChalkboardTeacher, FaGraduationCap } from "react-icons/fa";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const courses = [
  {
    image: "/cu1.jpg",
    title: "Basic First Aid",
    participants: 0,
    duration: null,
    instructor: "Masol Hab",
    category: "First Aid Training",
    rating: 4.8,
    description: "Essential first aid techniques for workplace emergencies",
  },
  {
    image: "/cu2.jpg",
    title: "Integrated Safety & Compliance Training Program (7 in 1)",
    participants: 4,
    duration: "12h 30m",
    instructor: "Masol Hab",
    category: "All In One",
    rating: 4.9,
    description: "Comprehensive safety training covering 7 critical modules",
  },
  {
    image: "/cu3.jpg",
    title: "Basic Orientation of Safety & Health (BOSH)",
    participants: 4,
    duration: "6h",
    instructor: "Masol Hab",
    category: "BOSH Training",
    rating: 4.7,
    description: "Fundamental occupational safety and health orientation",
  },
  {
    image: "/cu4.jpg",
    title: "Fire Safety Essentials",
    participants: 3,
    duration: "8h",
    instructor: "Masol Hab",
    category: "Fire Safety Training",
    rating: 4.8,
    description: "Essential fire prevention and response procedures",
  },
  {
    image: "/cu5.jpg",
    title: "OSHA Compliance Basics",
    participants: 5,
    duration: "10h",
    instructor: "Masol Hab",
    category: "OSHA Training",
    rating: 4.9,
    description: "Understanding and implementing OSHA standards",
  },
  {
    image: "/cu6.jpg",
    title: "Hole Watcher Safety",
    participants: 2,
    duration: "4h",
    instructor: "Masol Hab",
    category: "Specialized Safety",
    rating: 4.6,
    description: "Safety protocols for confined space monitoring",
  },
];

export const CoursesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(
        ".section-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        ".course-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Icon animation
      gsap.fromTo(
        ".course-icon",
        { scale: 0, rotation: -90 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="courses"
      ref={sectionRef}
      className="relative py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#2563EB] text-sm font-light tracking-widest uppercase">
              Professional Training Programs
            </span>
          </div>
          
        <h1 className="section-title text-4xl md:text-5xl font-thin italic font-serif mb-4">
  <span className="text-black">Our</span>{" "}
  <span className="text-blue-700">Courses</span>
</h1>


          
          <p className="text-black text-lg max-w-3xl mx-auto leading-relaxed">
            Comprehensive safety training programs designed for workplace excellence 
            and regulatory compliance
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
             key={index}
  ref={(el) => { cardsRef.current[index] = el; }} // ✅ block {} ensures void return
              className="course-card bg-[#F7F7F7] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
            >
              {/* Image Container */}
              <div className="relative h-56 bg-white/50">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-10" />
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 bg-[#2563EB] text-white text-xs font-medium rounded-full">
                    {course.category}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="flex-1 px-6 py-6 flex flex-col">
                {/* Course Title */}
                <h3 className="text-lg font-semibold text-black mb-3 line-clamp-2 min-h-[3.5rem]">
                  {course.title}
                </h3>

                {/* Course Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(course.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {course.rating}
                  </span>
                </div>

                {/* Course Details */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                  <div className="flex items-center course-icon">
                    <div className="w-8 h-8 rounded-full border border-[#2563EB] flex items-center justify-center mr-2">
                      <FaUserFriends className="text-[#2563EB] text-sm" />
                    </div>
                    <span className="font-medium">{course.participants} Enrolled</span>
                  </div>

                  {course.duration && (
                    <div className="flex items-center course-icon">
                      <div className="w-8 h-8 rounded-full border border-[#2563EB] flex items-center justify-center mr-2">
                        <FaClock className="text-[#2563EB] text-sm" />
                      </div>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                  )}
                </div>

                {/* Instructor */}
                <div className="flex items-center mb-6">
                  <div className="flex items-center course-icon">
                    <div className="w-10 h-10 rounded-full border border-[#2563EB] flex items-center justify-center mr-3">
                      <FaChalkboardTeacher className="text-[#2563EB]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black">By {course.instructor}</p>
                      <p className="text-xs text-gray-500">Certified Instructor</p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto pt-4 border-t border-gray-200">
                  <button className="w-full px-4 py-3 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-all duration-300 font-medium text-sm flex items-center justify-center">
                    <FaGraduationCap className="mr-2" />
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Course Categories */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-semibold text-black mb-4">
              Browse by Category
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our specialized training programs across different safety domains
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { 
                name: "First Aid Training", 
                icon: "🩹",
                count: 3,
                color: "bg-blue-50 border-blue-100"
              },
              { 
                name: "Fire Safety", 
                icon: "🔥",
                count: 2,
                color: "bg-red-50 border-red-100"
              },
              { 
                name: "OSHA Compliance", 
                icon: "📋",
                count: 4,
                color: "bg-green-50 border-green-100"
              },
              { 
                name: "Specialized Safety", 
                icon: "🛡️",
                count: 3,
                color: "bg-purple-50 border-purple-100"
              },
            ].map((category, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border ${category.color} hover:shadow-md transition-all duration-300 cursor-pointer`}
              >
                <div className="text-3xl mb-4">{category.icon}</div>
                <h4 className="text-lg font-medium text-black mb-2">
                  {category.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {category.count} courses available
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};