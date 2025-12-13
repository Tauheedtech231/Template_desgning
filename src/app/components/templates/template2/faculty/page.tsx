"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedin, FaQuoteLeft, FaQuoteRight, FaArrowRight, FaStar, FaAward, FaGraduationCap, FaChalkboardTeacher } from "react-icons/fa";
import Image from "next/image";
/* eslint-disable */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Faculty {
  image: string;
  name: string;
  designation: string;
  linkedin?: string;
  quote?: string;
  expertise?: string[];
  experience: string;
  rating: number;
  achievements: string[];
}

const facultyMembers: Faculty[] = [
  {
    image: "/template2_faculty/fac1.jpg",
    name: "Amir Aziz",
    designation: "General Manager at Mansol Manpower Solutions",
    linkedin: "https://www.linkedin.com/in/amir-aziz-7b117b4a/",
    quote: "Empowering organizations through strategic workforce solutions.",
    expertise: ["Strategic Planning", "Business Development", "Team Leadership"],
    experience: "12+ Years",
    rating: 4.9,
    achievements: ["100+ Projects", "Industry Expert", "Certified Trainer"]
  },
  {
    image: "/template2_faculty/fac2.jpg",
    name: "Taiba Malik",
    designation: "HR Manager at Mansol Institute",
    linkedin: "https://www.linkedin.com/in/taiba-malik-b76948325/",
    quote: "Building talent that transforms workplaces.",
    expertise: ["Human Resources", "Training Development", "Talent Management"],
    experience: "8+ Years",
    rating: 4.8,
    achievements: ["500+ Trainees", "HR Specialist", "Certification Expert"]
  },
  {
    image: "/template2_faculty/fac3.jpg",
    name: "Abdul Khalique Khan",
    designation: "Chief Executive at Mansol Manpower Solutions",
    linkedin: "https://www.linkedin.com/in/abdul-khalique-khan-36837227/",
    quote: "Innovating workforce solutions for tomorrow's challenges.",
    expertise: ["Executive Leadership", "Industry Relations", "Quality Assurance"],
    experience: "15+ Years",
    rating: 5.0,
    achievements: ["Industry Leader", "Multiple Awards", "Global Experience"]
  },
];

const FacultySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Initialize ref array
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, facultyMembers.length);
  }, []);

  useEffect(() => {
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

      // Stats counter animation
      gsap.fromTo(
        ".stat-number",
        { textContent: 0 },
        {
          textContent: ( target:any) => target.getAttribute("data-value"),
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".stats-section",
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
  }, [activeIndex]);

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

        {/* Stats Section */}
        <div className="stats-section grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { number: 35, label: "Years Experience", suffix: "+", icon: <FaAward /> },
            { number: 98, label: "Success Rate", suffix: "%", icon: <FaStar /> },
            { number: 5000, label: "Trained", suffix: "+", icon: <FaGraduationCap /> },
            { number: 50, label: "Certifications", suffix: "+", icon: <FaChalkboardTeacher /> },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#06B6D4]/10 flex items-center justify-center">
                  <div className="text-[#06B6D4] text-base">
                    {stat.icon}
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-0.5">
                    <span 
                      className="stat-number text-xl font-bold text-[#111827]" 
                      data-value={stat.number}
                    >
                      {stat.number}
                    </span>
                    {stat.suffix && (
                      <span className="text-xl font-bold text-[#111827]">{stat.suffix}</span>
                    )}
                  </div>
                  <div className="text-xs text-[#475569]">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facultyMembers.map((faculty, index) => (
            <div
              key={index}
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
                        src={faculty.image}
                        alt={faculty.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                    
                    {/* Experience Badge */}
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#06B6D4] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                      {faculty.experience} Experience
                    </div>
                  </div>

                  {/* Name and Designation */}
                  <div className="text-center mb-6">
                    <h3 className="faculty-name text-xl font-bold text-[#111827] mb-2">
                      {faculty.name}
                    </h3>
                    <p className="faculty-designation text-sm text-[#475569] mb-3">
                      {faculty.designation}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center justify-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(faculty.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-[#475569] font-medium">
                        {faculty.rating} Rating
                      </span>
                    </div>
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
                {faculty.expertise && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {faculty.expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="expertise-tag px-3 py-1.5 bg-[#F1F5F9] text-[#475569] text-xs rounded-lg transition-all duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {faculty.achievements && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {faculty.achievements.map((achievement, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 px-3 py-1.5 bg-[#06B6D4]/5 rounded-lg text-xs text-[#06B6D4] font-medium"
                        >
                          <div className="w-2 h-2 rounded-full bg-[#06B6D4]"></div>
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* LinkedIn Button */}
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
              </div>
            </div>
          ))}
        </div>

        {/* Faculty Highlights - Kept but compact */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center">
                <FaAward className="text-[#06B6D4] text-lg" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#111827] mb-1">Award-Winning Faculty</h4>
                <p className="text-sm text-[#475569]">Recognized industry excellence</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center">
                <FaGraduationCap className="text-[#06B6D4] text-lg" />
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