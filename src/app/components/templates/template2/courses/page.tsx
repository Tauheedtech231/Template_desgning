"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaUserFriends, FaClock, FaChalkboardTeacher, FaGraduationCap, FaStar } from "react-icons/fa";
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
    features: ["CPR Certification", "Emergency Response", "Wound Care"]
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
    features: ["7 Modules", "Certification", "Practical Training"]
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
    features: ["OSHA Standards", "Risk Assessment", "Safety Protocols"]
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
    features: ["Fire Extinguisher Use", "Evacuation Plans", "Fire Prevention"]
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
    features: ["Regulatory Compliance", "Workplace Safety", "Legal Requirements"]
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
    features: ["Confined Space", "Risk Mitigation", "Monitoring Protocols"]
  },
];

const CoursesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const courseCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const categoryCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  // Initialize ref arrays
  useEffect(() => {
    courseCardsRef.current = courseCardsRef.current.slice(0, courses.length);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation - elegant reveal
      gsap.fromTo(
        ".section-header",
        {
          opacity: 0,
          y: -80,
          scale: 0.9,
          rotationX: 15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
          },
        }
      );

      // Blue underline animation - draw effect
    gsap.fromTo(
  ".blue-underline",
  { scaleX: 0, transformOrigin: "left center" },
  {
    scaleX: 1,
    duration: 1.5,
    ease: "power3.inOut",
    delay: 0.3, // ✅ moved here
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 88%",
    },
  }
);


      // Course grid container animation - reveal
      gsap.fromTo(
        gridRef.current,
        {
          opacity: 0,
          scale: 0.95,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
        }
      );

      // Course cards - staggered 3D animation
      gsap.fromTo(
        ".course-card",
        {
          opacity: 0,
          y: 80,
          rotationY: 10,
          scale: 0.85,
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.9,
          stagger: {
            each: 0.15,
            from: "start",
            grid: [2, 3],
          },
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
        }
      );

      // Course images parallax effect on hover
      document.querySelectorAll(".course-image").forEach((image) => {
        image.addEventListener("mouseenter", () => {
          gsap.to(image, {
            scale: 1.08,
            duration: 0.6,
            ease: "power2.out",
            y: -10,
          });
        });

        image.addEventListener("mouseleave", () => {
          gsap.to(image, {
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            y: 0,
          });
        });
      });

      // Card hover elevation effect
      document.querySelectorAll(".course-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -15,
            duration: 0.4,
            ease: "power2.out",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
            rotationY: 2,
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            boxShadow: "none",
            rotationY: 0,
          });
        });
      });

      // Course icons animation - pop effect
      gsap.fromTo(
        ".course-icon",
        {
          scale: 0,
          rotation: 180,
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
          stagger: {
            each: 0.05,
          },
          scrollTrigger: {
            trigger: ".course-card",
            start: "top 90%",
          },
        }
      );

      // Star rating animation - cascade fill
      document.querySelectorAll(".star-rating").forEach((rating) => {
        const stars = rating.querySelectorAll(".star");
        gsap.fromTo(
          stars,
          {
            scale: 0,
            rotation: 45,
          },
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: rating,
              start: "top 95%",
            },
          }
        );
      });

      // Category section header animation
      gsap.fromTo(
        ".category-header",
        {
          opacity: 0,
          y: -40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".category-header",
            start: "top 90%",
          },
        }
      );

      // Category cards animation - fan out effect
      gsap.fromTo(
        ".category-card",
        {
          opacity: 0,
          y: 60,
          rotation: -5,
        },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.7,
          stagger: {
            each: 0.1,
            from: "start",
          },
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".category-header",
            start: "top 85%",
          },
        }
      );

      // Category card hover animations
      document.querySelectorAll(".category-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Apply button animation on hover
      document.querySelectorAll(".apply-button").forEach((button) => {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out",
            boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)",
          });
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
            boxShadow: "none",
          });
        });
      });

      // Text reveal animation for course titles and descriptions
      gsap.fromTo(
        ".text-reveal",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: {
            each: 0.05,
          },
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".course-card",
            start: "top 90%",
          },
        }
      );

      // Background pattern animation
      gsap.fromTo(
        ".bg-pattern",
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
          },
        }
      );

      // Floating elements animation
      gsap.to(".floating-element", {
        y: 15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      // Clean up event listeners
      document.querySelectorAll(".course-image").forEach((image) => {
        image.removeEventListener("mouseenter", () => {});
        image.removeEventListener("mouseleave", () => {});
      });
      document.querySelectorAll(".course-card").forEach((card) => {
        card.removeEventListener("mouseenter", () => {});
        card.removeEventListener("mouseleave", () => {});
      });
      document.querySelectorAll(".category-card").forEach((card) => {
        card.removeEventListener("mouseenter", () => {});
        card.removeEventListener("mouseleave", () => {});
      });
      document.querySelectorAll(".apply-button").forEach((button) => {
        button.removeEventListener("mouseenter", () => {});
        button.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  return (
    <section
      id="courses"
      ref={sectionRef}
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-pattern">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #2563EB 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-10 floating-element"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-100 rounded-full opacity-10 floating-element"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 section-header">
          <div className="inline-block mb-4">
            <span className="text-[#2563EB] text-sm font-light tracking-widest uppercase">
              Professional Training Programs
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-thin italic font-serif mb-6 relative">
            <span className="text-black">Our</span>{" "}
            <span className="text-blue-700">Courses</span>
            <div className="w-32 h-1 bg-[#2563EB] mx-auto mt-4 blue-underline transform origin-left"></div>
          </h1>

          <p className="text-black text-lg max-w-3xl mx-auto leading-relaxed text-reveal">
            Comprehensive safety training programs designed for workplace excellence 
            and regulatory compliance
          </p>
        </div>

        {/* Courses Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {courses.map((course, index) => (
            <div
              key={index}
              ref={(el) => { courseCardsRef.current[index] = el; }}
              className="course-card bg-[#F7F7F7] rounded-xl overflow-hidden flex flex-col h-full group relative"
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
              {/* Image Container */}
              <div className="relative h-56 bg-white/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10" />
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="course-image object-cover transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 bg-[#2563EB] text-white text-xs font-medium rounded-full shadow-lg">
                    {course.category}
                  </span>
                </div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content Container */}
              <div className="flex-1 px-6 py-6 flex flex-col">
                {/* Course Title */}
                <h3 className="text-lg font-semibold text-black mb-3 line-clamp-2 min-h-[3.5rem] text-reveal">
                  {course.title}
                </h3>

                {/* Course Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 text-reveal">
                  {course.description}
                </p>

                {/* Features */}
                {course.features && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {course.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-600"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rating */}
                <div className="flex items-center mb-5">
                  <div className="flex star-rating">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="star mr-1"
                      >
                        <FaStar className={`w-4 h-4 ${i < Math.floor(course.rating) ? "text-yellow-400" : "text-gray-300"}`} />
                      </span>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600 font-medium">
                    {course.rating}
                  </span>
                </div>

                {/* Course Details */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                  <div className="flex items-center course-icon">
                    <div className="w-8 h-8 rounded-full border border-[#2563EB] flex items-center justify-center mr-2 bg-white">
                      <FaUserFriends className="text-[#2563EB] text-sm" />
                    </div>
                    <span className="font-medium">{course.participants} Enrolled</span>
                  </div>

                  {course.duration && (
                    <div className="flex items-center course-icon">
                      <div className="w-8 h-8 rounded-full border border-[#2563EB] flex items-center justify-center mr-2 bg-white">
                        <FaClock className="text-[#2563EB] text-sm" />
                      </div>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                  )}
                </div>

                {/* Instructor */}
                <div className="flex items-center mb-6">
                  <div className="flex items-center course-icon">
                    <div className="w-10 h-10 rounded-full border border-[#2563EB] flex items-center justify-center mr-3 bg-white">
                      <FaChalkboardTeacher className="text-[#2563EB]" />
                    </div>
                    <div className="text-reveal">
                      <p className="text-sm font-medium text-black">By {course.instructor}</p>
                      <p className="text-xs text-gray-500">Certified Instructor</p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto pt-4 border-t border-gray-200">
                  <button className="apply-button w-full px-4 py-3 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-all duration-300 font-medium text-sm flex items-center justify-center">
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
          <div className="text-center mb-10 category-header">
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
                ref={(el) => { categoryCardsRef.current[index] = el; }}
                className={`category-card p-6 rounded-xl border ${category.color} transition-all duration-300 cursor-pointer relative overflow-hidden`}
              >
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/0 to-[#2563EB]/0 group-hover:from-[#2563EB]/5 group-hover:to-[#2563EB]/10 transition-all duration-300"></div>
                
                <div className="text-4xl mb-4 relative z-10">{category.icon}</div>
                <h4 className="text-lg font-medium text-black mb-2 relative z-10">
                  {category.name}
                </h4>
                <p className="text-sm text-gray-600 relative z-10">
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
export default CoursesSection;