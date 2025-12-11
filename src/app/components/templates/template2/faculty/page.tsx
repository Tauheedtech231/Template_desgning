"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedin, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import Image from "next/image";

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
}

const facultyMembers: Faculty[] = [
  {
    image: "/template2_faculty/fac1.jpg",
    name: "Amir Aziz",
    designation: "General Manager at Mansol Manpower Solutions",
    linkedin: "https://www.linkedin.com/in/amir-aziz-7b117b4a/",
    quote: "Empowering organizations through strategic workforce solutions.",
    expertise: ["Strategic Planning", "Business Development", "Team Leadership"]
  },
  {
    image: "/template2_faculty/fac2.jpg",
    name: "Taiba Malik",
    designation: "HR Manager at Mansol Institute",
    linkedin: "https://www.linkedin.com/in/taiba-malik-b76948325/",
    quote: "Building talent that transforms workplaces.",
    expertise: ["Human Resources", "Training Development", "Talent Management"]
  },
  {
    image: "/template2_faculty/fac3.jpg",
    name: "Abdul Khalique Khan",
    designation: "Chief Executive at Mansol Manpower Solutions",
    linkedin: "https://www.linkedin.com/in/abdul-khalique-khan-36837227/",
    quote: "Innovating workforce solutions for tomorrow's challenges.",
    expertise: ["Executive Leadership", "Industry Relations", "Quality Assurance"]
  },
];

const FacultySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize ref array
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, facultyMembers.length);
  }, []);

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
        ".faculty-card",
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
        ".faculty-icon",
        { scale: 0, rotation: -90 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Quote mark animation
      gsap.fromTo(
        ".quote-mark",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 0.8,
          duration: 0.5,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Ref callback function
  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[index] = el;
  };

  return (
    <section
    id="faculty"
      ref={sectionRef}
      className="relative py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#2563EB] text-sm font-light tracking-widest uppercase">
              Our Leadership Team
            </span>
          </div>
          
        <h1 className="section-title text-4xl md:text-5xl font-thin italic font-serif text-black mb-4">
  Meet Our <span className="text-[#2563EB]">Faculty</span>
</h1>

          
          <p className="text-[#555555] text-lg max-w-3xl mx-auto leading-relaxed">
            Industry experts and seasoned professionals dedicated to your success
          </p>
        </div>

        {/* Faculty Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyMembers.map((faculty, index) => (
            <div
              key={index}
              ref={setCardRef(index)}
              className="faculty-card bg-[#F7F7F7] rounded-xl border border-[#E5E5E5] hover:shadow-xl transition-all duration-300 group"
            >
              {/* Card Content */}
              <div className="p-8">
                {/* Quote Marks */}
                <div className="relative mb-8">
                  <FaQuoteLeft className="quote-mark text-[#2563EB] text-2xl opacity-0 absolute -top-2 -left-2" />
                  <FaQuoteRight className="quote-mark text-[#2563EB] text-2xl opacity-0 absolute -bottom-2 -right-2" />
                </div>

                {/* Faculty Quote */}
                {faculty.quote && (
                  <p className="text-[#555555] italic text-lg mb-8 leading-relaxed text-center">
                    {faculty.quote}
                  </p>
                )}

                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB] to-transparent rounded-full opacity-20"></div>
                    <Image
                      src={faculty.image}
                      alt={faculty.name}
                      fill
                      className="object-cover rounded-full border-4 border-white shadow-lg"
                      sizes="128px"
                    />
                    
                    {/* Blue accent indicator */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-[#2563EB] rounded-full"></div>
                  </div>
                </div>

                {/* Faculty Info */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {faculty.name}
                  </h3>
                  
                  {/* Blue accent line */}
                  <div className="w-20 h-0.5 bg-[#2563EB] mx-auto mb-4"></div>
                  
                  <p className="text-[#555555] text-sm leading-relaxed mb-6">
                    {faculty.designation}
                  </p>

                  {/* Expertise Tags */}
                  {faculty.expertise && (
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                      {faculty.expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white border border-[#E5E5E5] rounded-full text-xs text-[#555555]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* LinkedIn Button */}
                  {faculty.linkedin && (
                    <a
                      href={faculty.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="faculty-icon inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all duration-300"
                      aria-label={`Connect with ${faculty.name} on LinkedIn`}
                    >
                      <FaLinkedin className="text-lg" />
                    </a>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-8 py-6 border-t border-[#E5E5E5] bg-white/50 rounded-b-xl">
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#2563EB] rounded-full mr-2"></div>
                  <span className="text-sm text-[#555555]">
                    Industry Expert
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 pt-12 border-t border-[#E5E5E5]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Experience Stats */}
            <div className="bg-[#F7F7F7] rounded-xl p-8 border border-[#E5E5E5]">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full border-2 border-[#2563EB] flex items-center justify-center mr-4">
                  <span className="text-[#2563EB] font-bold">15+</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-black">Years Experience</h4>
                  <p className="text-sm text-[#555555]">Collective industry experience</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-[#F7F7F7] rounded-xl p-8 border border-[#E5E5E5]">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full border-2 border-[#2563EB] flex items-center justify-center mr-4">
                  <span className="text-[#2563EB] text-xl">📜</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-black">Certified Professionals</h4>
                  <p className="text-sm text-[#555555]">Industry-recognized certifications</p>
                </div>
              </div>
            </div>

            {/* Client Success */}
            <div className="bg-[#F7F7F7] rounded-xl p-8 border border-[#E5E5E5]">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full border-2 border-[#2563EB] flex items-center justify-center mr-4">
                  <span className="text-[#2563EB] text-xl">🏆</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-black">Proven Success</h4>
                  <p className="text-sm text-[#555555]">High client satisfaction rate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-[#555555] mb-6">
              Our faculty members bring real-world experience and industry insights to every training session
            </p>
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border border-[#2563EB] mr-2"></div>
              <span className="text-sm text-[#555555]">
                Connect with our experts for customized training solutions
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FacultySection;