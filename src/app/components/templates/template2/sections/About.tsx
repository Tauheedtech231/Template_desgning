"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaRocket, FaEye, FaBullseye, FaLightbulb } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
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
        ".about-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
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
        ".icon-container",
        { scale: 0, rotation: -180 },
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

      // Subtle line animation under section tag
      gsap.fromTo(
        ".section-tag-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const aboutData = [
    {
      id: 1,
      icon: FaRocket,
      title: "Our Mission",
      description: "Mansol is a leading organization in manpower recruitment and training, with enriched experience in local and international markets. Our expertise includes providing skilled human resources to major industries including Oil & Gas, Chemical, Construction, and other Electro-Mechanical EPC projects and shutdowns across GCC countries.",
      accentColor: "#2563EB",
    },
    {
      id: 2,
      icon: FaEye,
      title: "Our Vision",
      description: "Our vision is to lead in the creation and delivery of innovative workforce solutions and services that empower our clients to succeed in the evolving global employment landscape.",
      accentColor: "#2563EB",
    },
    {
      id: 3,
      icon: FaBullseye,
      title: "Our Values",
      description: "We uphold integrity, excellence, and innovation in all our endeavors. Our commitment to quality training and ethical recruitment practices sets us apart in the industry.",
      accentColor: "#2563EB",
    },
    {
      id: 4,
      icon: FaLightbulb,
      title: "Our Approach",
      description: "We combine industry expertise with modern training methodologies to deliver workforce solutions that meet the evolving demands of global markets and empower individuals for success.",
      accentColor: "#2563EB",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#2563EB] text-sm font-light tracking-widest uppercase">
              About Mansol
            </span>
            <div className="w-12 h-px bg-[#2563EB] mx-auto mt-2 section-tag-line transform origin-left"></div>
          </div>
          
         <h1 className="section-title text-4xl md:text-5xl font-thin italic font-serif text-black mb-6">
  Empowering Workforce Excellence
</h1>

          
          <p className="text-[#555555] text-lg max-w-3xl mx-auto leading-relaxed">
            Mansol Hab Trainings is a premier institution delivering high-quality education, 
            workforce training, and recruitment solutions empowering individuals and organizations.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Image and About */}
          <div className="space-y-8">
            {/* About Card */}
            <div className="about-card bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0 icon-container">
                  <div className="w-14 h-14 rounded-full border-2 border-[#2563EB] flex items-center justify-center">
                    <FaRocket className="text-[#2563EB] text-xl" />
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold text-black mb-2">
                    About Mansol
                  </h3>
                  <div className="w-16 h-0.5 bg-[#2563EB] mb-4"></div>
                </div>
              </div>
              <p className="text-[#555555] leading-relaxed">
                As a premier workforce development institution, we specialize in bridging the gap 
                between industry requirements and individual capabilities. Our comprehensive training 
                programs and strategic recruitment solutions are designed to meet the evolving demands 
                of global markets.
              </p>
            </div>

            {/* Image Container */}
            <div className="about-card overflow-hidden rounded-lg">
              <div className="relative">
                <img
                  src="/mansol_logo_about.jpg"
                  alt="Mansol Training Facility"
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Right Column: Vision, Values, Approach Cards */}
          <div className="space-y-8">
            {aboutData.slice(1).map((item) => (
              <div
                key={item.id}
                className="about-card bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0 icon-container">
                    <div className="w-14 h-14 rounded-full border-2 border-[#2563EB] flex items-center justify-center">
                      <item.icon className="text-[#2563EB] text-xl" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-2xl font-bold text-black mb-2">
                      {item.title}
                    </h3>
                    <div className="w-16 h-0.5 bg-[#2563EB] mb-4"></div>
                  </div>
                </div>
                <p className="text-[#555555] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}

            {/* Industry Expertise */}
            <div className="about-card bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-black mb-6">
                Industry Expertise
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Oil & Gas", color: "bg-blue-50" },
                  { name: "Chemical", color: "bg-blue-50" },
                  { name: "Construction", color: "bg-blue-50" },
                  { name: "Electro-Mechanical", color: "bg-blue-50" },
                  { name: "EPC Projects", color: "bg-blue-50" },
                  { name: "GCC Operations", color: "bg-blue-50" },
                ].map((industry, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 rounded-lg border border-gray-100 hover:border-[#2563EB]/20 transition-colors duration-200"
                  >
                    <div className="w-2 h-2 bg-[#2563EB] rounded-full mr-3"></div>
                    <span className="text-[#555555] text-sm font-medium">
                      {industry.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section - Subtle and Professional */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-gray-100">
          {[
            { number: "15+", label: "Years Experience", icon: "📅" },
            { number: "5000+", label: "Professionals Trained", icon: "👥" },
            { number: "50+", label: "Industry Partners", icon: "🤝" },
            { number: "98%", label: "Success Rate", icon: "⭐" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <div className="text-3xl font-bold text-black mb-2">
                {stat.number}
              </div>
              <div className="text-[#555555] text-sm mb-3">{stat.label}</div>
              <div className="text-2xl opacity-70">{stat.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};