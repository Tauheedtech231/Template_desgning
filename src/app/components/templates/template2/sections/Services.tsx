"use client";

import React from "react";
import Image from "next/image";

const courses = [
  {
    image: "/cu1.jpg",
    title: "Basic First Aid",
    participants: 0,
    duration: null,
    instructor: "Masol Hab",
    category: "First Aid – First Aid Training",
    price: "Rs18,000",
    oldPrice: "Rs20,000",
  },
  {
    image: "/cu2.jpg",
    title: "Integrated Safety & Compliance Training Program (7 in 1)",
    participants: 4,
    duration: "12h 30m",
    instructor: "Masol Hab",
    category: "All In One",
    price: "Rs100,000",
    oldPrice: "Rs150,000",
  },
  {
    image: "/cu3.jpg",
    title: "Basic Orientation of Safety & Health (BOSH)",
    participants: 4,
    duration: "6h",
    instructor: "Masol Hab",
    category: "BOSH – Basic Occupational Safety & Health",
    price: "Rs16,000",
    oldPrice: "Rs20,000",
  },
  {
    image: "/cu4.jpg",
    title: "Fire Safety Essentials",
    participants: 3,
    duration: "8h",
    instructor: "Masol Hab",
    category: "Fire Safety – Fire Training",
    price: "Rs18,000",
    oldPrice: "Rs20,000",
  },
  {
    image: "/cu5.jpg",
    title: "OSHA Compliance Basics",
    participants: 5,
    duration: "10h",
    instructor: "Masol Hab",
    category: "OSHA – Occupational Safety & Health Administration",
    price: "Rs40,000",
    oldPrice: "Rs50,000",
  },
  {
    image: "/cu6.jpg",
    title: "Hole Watcher Safety",
    participants: 2,
    duration: "4h",
    instructor: "Masol Hab",
    category: "Hole Watcher",
    price: "Rs18,000",
    oldPrice: "Rs20,000",
  },
];

export const CoursesSection: React.FC = () => {
  return (
    <section  id="courses" className="py-16 md:py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            <span className="text-gray-900">Our </span>
            <span className="text-blue-700 italic">Courses</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Professional safety training programs for workplace excellence
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {courses.map((course, idx) => (
            <div
              key={idx}
              className="bg-blue-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative w-full h-48 sm:h-52 bg-white/10">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content Container */}
              <div className="flex-1 px-5 sm:px-6 py-5 sm:py-6 flex flex-col text-white">
                {/* Rating Stars */}
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-300 text-sm">★</span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-3 line-clamp-2 min-h-[3.5rem]">
                  {course.title}
                </h3>

                {/* Participants & Duration */}
                <div className="flex items-center text-sm mb-4 text-white/80">
                  <div className="flex items-center gap-2">
                    <span>👤 {course.participants}</span>
                    {course.duration && (
                      <>
                        <span className="text-white/30">•</span>
                        <span>⏱ {course.duration}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center text-xs font-semibold shrink-0">
                    MH
                  </div>
                  <div className="text-sm leading-tight">
                    <p className="font-medium">By {course.instructor}</p>
                    <p className="text-white/70 text-xs truncate">
                      In {course.category}
                    </p>
                  </div>
                </div>

                {/* Price + Button */}
                <div className="mt-auto pt-5 border-t border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-bold text-xl">{course.price}</span>
                      <span className="line-through text-white/60 text-sm">
                        {course.oldPrice}
                      </span>
                    </div>
                    <button className="px-5 py-2.5 border border-white rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300 font-medium text-sm">
                      Buy Course
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 md:mt-16">
          <button className="px-8 py-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};