"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedin, FaQuoteLeft, FaQuoteRight, FaArrowRight, FaEnvelope, FaBriefcase, FaGraduationCap, FaChalkboardTeacher } from "react-icons/fa";
import Image from "next/image";
/* eslint-disable */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Faculty {
  id?: string;
  image: string;
  name: string;
  position: string;
  designation: string;
  linkedin?: string;
  email?: string;
  quote?: string;
  expertise?: string[];
  experience: string;
  description?: string;
  department?: string;
  bio?: string;
  skills?: string[];
  order?: number;
}

const FacultySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  
  // State for fetched data
  const [facultyMembers, setFacultyMembers] = useState<Faculty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize ref array
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, facultyMembers.length);
  }, [facultyMembers]);

  // Fetch faculty data from backend
  useEffect(() => {
    const fetchFacultyData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch data from your API endpoint with template_id = 2
        const response = await fetch('https://nes-tick-portfolio-handler.vercel.app/api/sections?template_id=2&section_name=Faculty');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch faculty data: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Fetched faculty data:', data);
        
        if (data.sections && data.sections.length > 0) {
          // Extract content from the first section
          const dbContent = data.sections[0].content;
          
          if (dbContent && dbContent.faculty) {
            // Transform database structure to match frontend expectations
            const transformedData: Faculty[] = dbContent.faculty.map((member: any) => ({
              id: member.id || `fac-${Date.now()}`,
              image: member.image || "/template2_faculty/default.jpg",
              name: member.name || "Faculty Member",
              position: member.position || "",
              designation: member.designation || member.position || "",
              linkedin: member.linkedin || "",
              email: member.email || "",
              quote: member.quote || member.bio ? `"${member.bio.substring(0, 100)}..."` : "",
              expertise: member.skills || member.expertise || [],
              experience: member.experience || "",
              description: member.description || member.bio || "",
              department: member.department || "",
              bio: member.bio || "",
              skills: member.skills || [],
              order: member.order || 0
            }));
            
            setFacultyMembers(transformedData);
          } else {
            // If no data in database, use empty array
            setFacultyMembers([]);
          }
        } else {
          throw new Error("No faculty data found in response");
        }
      } catch (err) {
        console.error("Error fetching faculty data:", err);
        setError(err instanceof Error ? err.message : "Failed to load faculty data");
        // Fallback to empty array on error
        setFacultyMembers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFacultyData();
  }, []);

  useEffect(() => {
    // Only set up animations if we have data
    if (facultyMembers.length === 0) return;

    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(
        ".section-header",
        { opacity: 0, y: -40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      // Animated underline
      gsap.fromTo(
        ".animated-underline",
        { width: 0 },
        {
          width: "100%",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".section-title",
            start: "top 85%",
          },
        }
      );

      // Faculty cards animation - staggered entrance
      gsap.fromTo(
        ".faculty-card",
        { 
          opacity: 0, 
          y: 60,
          scale: 0.9,
          rotationY: 15
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: {
            each: 0.15,
            from: "start",
          },
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Avatar animation
      gsap.fromTo(
        ".faculty-avatar",
        { 
          scale: 0,
          rotation: -180
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Icon animations
      gsap.fromTo(
        ".faculty-icon",
        { 
          scale: 0, 
          rotation: -180 
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Quote animations
      gsap.fromTo(
        ".faculty-quote",
        { 
          opacity: 0,
          y: 20 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faculty-card",
            start: "top 85%",
          },
        }
      );

      // Hover effects for faculty cards
      document.querySelectorAll(".faculty-card").forEach((card, index) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -12,
            scale: 1.03,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "0 20px 40px rgba(6, 182, 212, 0.15)",
            borderColor: "#14B8A6",
          });
          
          // Animate avatar
          const avatar = card.querySelector(".faculty-avatar");
          if (avatar) {
            gsap.to(avatar, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });
          }
          
          // Animate the button
          const button = card.querySelector(".connect-button");
          if (button) {
            gsap.to(button, {
              x: 5,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "none",
            borderColor: "#E2E8F0",
          });
          
          const avatar = card.querySelector(".faculty-avatar");
          if (avatar && index !== activeIndex) {
            gsap.to(avatar, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          }
          
          const button = card.querySelector(".connect-button");
          if (button) {
            gsap.to(button, {
              x: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
      });

      // Hover effects for expertise tags
      document.querySelectorAll(".expertise-tag").forEach((tag) => {
        tag.addEventListener("mouseenter", () => {
          gsap.to(tag, {
            scale: 1.1,
            backgroundColor: "#06B6D4",
            color: "white",
            duration: 0.2,
            ease: "power2.out",
          });
        });

        tag.addEventListener("mouseleave", () => {
          gsap.to(tag, {
            scale: 1,
            backgroundColor: "#F1F5F9",
            color: "#475569",
            duration: 0.2,
            ease: "power2.out",
          });
        });
      });

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [activeIndex, facultyMembers]);

  // Show loading state
  if (isLoading) {
    return (
      <section id="faculty" className="relative py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#06B6D4] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading faculty data...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section id="faculty" className="relative py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 text-red-500">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Faculty</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#06B6D4] text-white rounded-lg hover:bg-[#14B8A6] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // If no data is available, show empty state
  if (!facultyMembers || facultyMembers.length === 0) {
    return (
      <section id="faculty" className="relative py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
              <FaChalkboardTeacher className="w-full h-full" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Faculty Members Available</h3>
            <p className="text-gray-600">Check back soon for faculty information.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="faculty"
      ref={sectionRef}
      className="relative py-16 bg-white"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-[#06B6D4]/5 to-[#14B8A6]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-[#06B6D4]/5 to-transparent rounded-full blur-3xl"></div>
        
        {/* Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(90deg, transparent 95%, #06B6D4 100%),
                             linear-gradient(180deg, transparent 95%, #06B6D4 100%)`,
            backgroundSize: '50px 50px',
          }}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 section-header">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#06B6D4]/10 rounded-full mb-5">
            <FaChalkboardTeacher className="text-[#06B6D4] text-sm" />
            <span className="text-[#06B6D4] text-xs font-medium uppercase tracking-wider">
              Expert Faculty
            </span>
          </div>
          
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-5">
            Meet Our{" "}
            <span className="relative">
              <span className="text-[#06B6D4]">Leadership Team</span>
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent animated-underline"></div>
            </span>
          </h2>
          
          <p className="text-base text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Industry experts and seasoned professionals with real-world experience and academic excellence
          </p>
        </div>

        {/* REMOVED: Stats Section completely */}

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facultyMembers.sort((a, b) => (a.order || 0) - (b.order || 0)).map((faculty, index) => (
            <div
              key={faculty.id || index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`faculty-card group bg-white rounded-xl border ${
                activeIndex === index 
                  ? 'border-[#06B6D4] shadow-lg shadow-[#06B6D4]/10' 
                  : 'border-gray-200 hover:border-[#06B6D4]/50'
              } transition-all duration-300 overflow-hidden`}
              onClick={() => setActiveIndex(index)}
            >
              {/* Avatar Section */}
              <div className="relative p-8 pb-12">
                {/* Avatar Background */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-[#06B6D4]/10 to-[#14B8A6]/10 rounded-t-xl"></div>
                
                {/* Avatar Container */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Avatar with Glow Effect */}
                  <div className="faculty-avatar relative mb-6">
                    <div className="absolute -inset-4 bg-[#06B6D4]/20 rounded-full blur-xl"></div>
                    <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden">
                      <Image
                        src={faculty.image || "/template2_faculty/default.jpg"}
                        alt={faculty.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                    
                    {/* Experience Badge */}
                    {faculty.experience && (
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#06B6D4] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                        {faculty.experience} Experience
                      </div>
                    )}
                  </div>

                  {/* Name and Designation */}
                  <div className="text-center mb-4">
                    <h3 className="faculty-name text-xl font-bold text-[#111827] mb-2">
                      {faculty.name}
                    </h3>
                    <p className="faculty-designation text-sm text-[#475569] mb-3">
                      {faculty.designation || faculty.position}
                    </p>
                    
                    {/* Description */}
                    {faculty.description && (
                      <p className="text-sm text-[#475569] mb-4 leading-relaxed">
                        {faculty.description}
                      </p>
                    )}
                  </div>

                  {/* Quote */}
                  {faculty.quote && (
                    <div className="mb-6 relative">
                      <FaQuoteLeft className="absolute -top-2 -left-2 text-[#06B6D4] text-sm opacity-50" />
                      <p className="faculty-quote text-sm text-[#475569] italic text-center leading-relaxed">
                        {faculty.quote}
                      </p>
                      <FaQuoteRight className="absolute -bottom-2 -right-2 text-[#06B6D4] text-sm opacity-50" />
                    </div>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="px-6 pb-6">
                {/* Expertise Tags */}
                {(faculty.expertise && faculty.expertise.length > 0) || (faculty.skills && faculty.skills.length > 0) ? (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {(faculty.expertise || faculty.skills || []).slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="expertise-tag px-3 py-1.5 bg-[#F1F5F9] text-[#475569] text-xs rounded-lg transition-all duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Contact Information */}
                <div className="mb-6 space-y-3">
                  {/* LinkedIn Link */}
                  {faculty.linkedin && (
                    <a
                      href={faculty.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="connect-button faculty-icon w-full py-3 bg-gradient-to-r from-[#06B6D4] to-[#14B8A6] text-white rounded-lg hover:shadow-md transition-all duration-300 font-medium text-sm flex items-center justify-center group"
                    >
                      <FaLinkedin className="mr-2 text-base" />
                      Connect on LinkedIn
                      <FaArrowRight className="ml-2 text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </a>
                  )}
                  
                  {/* Email */}
                  {faculty.email && (
                    <a
                      href={`mailto:${faculty.email}`}
                      className="w-full py-3 bg-white border border-gray-300 text-[#475569] rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium text-sm flex items-center justify-center group"
                    >
                      <FaEnvelope className="mr-2 text-base" />
                      Send Email
                      <FaArrowRight className="ml-2 text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Faculty Highlights - Cleaner version */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center">
                <FaBriefcase className="text-[#06B6D4] text-lg" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#111827] mb-1">Industry Experience</h4>
                <p className="text-sm text-[#475569]">Real-world practical knowledge</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center">
                <FaGraduationCap className="text-[#06B6D4] text-lg" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#111827] mb-1">Expert Faculty</h4>
                <p className="text-sm text-[#475569]">Highly qualified professionals</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center">
                <FaChalkboardTeacher className="text-[#06B6D4] text-lg" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#111827] mb-1">Practical Training</h4>
                <p className="text-sm text-[#475569]">Hands-on learning approach</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacultySection;