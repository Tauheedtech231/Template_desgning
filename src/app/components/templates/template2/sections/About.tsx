"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, ShieldCheck, Globe, Award } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-element',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <Target className="w-6 h-6 text-white" />,
      title: 'Vision',
      description: 'Our vision is to lead in the creation, implementation, and delivery of innovative workforce solutions, tools, and services that empower our clients to succeed and thrive in the dynamic and evolving landscape of work.'
    },
    {
      icon: <Award className="w-6 h-6 text-white" />,
      title: 'Quality',
      description: 'Mansol is committed to achieving total client satisfaction through innovation and continuous improvement of its business processes.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      title: 'Safety',
      description: "Mansol prioritizes health, safety, and security during projects and beyond, ensuring a proactive approach to workplace safety."
    },
    {
      icon: <Globe className="w-6 h-6 text-white" />,
      title: 'Serving You Around The Globe',
      description: 'Mansol has extensive experience in manpower recruitment and training, providing skilled human resources for construction, Oil & Gas, and major industrial projects locally and internationally.'
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-16 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16 about-element">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#4B3F72]">
            About Mansol
          </h2>
          <p className="mt-4 text-[#8E8D8A] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Leading provider of manpower solutions and technical training with global expertise in construction and industrial projects.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Image */}
          <div className="about-element relative w-full h-80 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
            <Image
              src="/mansol_about.jpg"
              alt="Mansol About"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Right Content */}
          <div className="space-y-8 about-element">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-5 p-5 bg-[#F28C28]/10 rounded-2xl hover:scale-105 transition-transform duration-300 shadow-md">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-[#F28C28]">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#4B3F72] mb-2">{feature.title}</h3>
                  <p className="text-[#8E8D8A] text-base md:text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
