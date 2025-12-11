"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaRocket, FaEye, FaBullseye, FaLightbulb } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

 const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title entrance with smooth slide from left
      gsap.fromTo(
        ".section-title",
        {
          opacity: 0,
          x: -80,
          rotation: -5,
        },
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      // Section tag animation - fade in from top
      gsap.fromTo(
        ".section-tag",
        {
          opacity: 0,
          y: -30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
          },
        }
      );

      // Blue line animation - draw from center
      gsap.fromTo(
        ".section-tag-line",
        { scaleX: 0, transformOrigin: "center" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
          },
        }
      );

      // Left column content slide in from left
      gsap.fromTo(
        leftColumnRef.current,
        {
          opacity: 0,
          x: -100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftColumnRef.current,
            start: "top 80%",
          },
        }
      );

      // Right column content slide in from right
      gsap.fromTo(
        rightColumnRef.current,
        {
          opacity: 0,
          x: 100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightColumnRef.current,
            start: "top 80%",
          },
        }
      );

      // Image reveal with parallax effect
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: 50,
          rotationY: -10,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotationY: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
          },
        }
      );

      // Icon animation with bounce effect
      gsap.fromTo(
        ".icon-container",
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
            each: 0.15,
            from: "start",
          },
          scrollTrigger: {
            trigger: ".about-card",
            start: "top 85%",
          },
        }
      );

      // Card content reveal with slight delay after icons
      gsap.fromTo(
        ".card-content",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.3,
          stagger: {
            each: 0.1,
          },
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-card",
            start: "top 85%",
          },
        }
      );

      // Industry expertise items animation - cascade effect
      gsap.fromTo(
        ".industry-item",
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: {
            each: 0.08,
            from: "start",
          },
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".industry-item",
            start: "top 90%",
          },
        }
      );

      // Stats counting animation
      const stats = document.querySelectorAll(".stat-number");
      stats.forEach((stat) => {
        gsap.fromTo(
          stat,
          {
            textContent: 0,
          },
          {
            textContent: stat.textContent,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            snap: { textContent: 1 },
          }
        );
      });

      // Stats container animation
      gsap.fromTo(
        ".stat-item",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: {
            each: 0.1,
          },
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".stat-item",
            start: "top 90%",
          },
        }
      );

      // Hover effects for cards
      document.querySelectorAll(".about-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -8,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Image hover effect
      if (imageRef.current) {
        imageRef.current.addEventListener("mouseenter", () => {
          gsap.to(imageRef.current, {
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        imageRef.current.addEventListener("mouseleave", () => {
          gsap.to(imageRef.current, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      // Clean up hover event listeners
      document.querySelectorAll(".about-card").forEach((card) => {
        card.removeEventListener("mouseenter", () => {});
        card.removeEventListener("mouseleave", () => {});
      });
    };
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
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, #2563EB 1px, transparent 1px),
                           linear-gradient(-45deg, #2563EB 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="section-tag text-[#2563EB] text-sm font-light tracking-widest uppercase">
              About Mansol
            </span>
            <div className="w-12 h-px bg-[#2563EB] mx-auto mt-2 section-tag-line transform origin-left"></div>
          </div>
          
          <h1 className="section-title text-4xl md:text-5xl font-thin italic font-serif text-black mb-6">
            Empowering Workforce Excellence
          </h1>
          
          <div className="card-content">
            <p className="text-[#555555] text-lg max-w-3xl mx-auto leading-relaxed">
              Mansol Hab Trainings is a premier institution delivering high-quality education, 
              workforce training, and recruitment solutions empowering individuals and organizations.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Image and About */}
          <div ref={leftColumnRef} className="space-y-8">
            {/* About Card */}
            <div className="about-card bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0 icon-container">
                  <div className="w-14 h-14 rounded-full border-2 border-[#2563EB] flex items-center justify-center">
                    <FaRocket className="text-[#2563EB] text-xl" />
                  </div>
                </div>
                <div className="ml-6 card-content">
                  <h3 className="text-2xl font-bold text-black mb-2">
                    About Mansol
                  </h3>
                  <div className="w-16 h-0.5 bg-[#2563EB] mb-4"></div>
                  <p className="text-[#555555] leading-relaxed">
                    As a premier workforce development institution, we specialize in bridging the gap 
                    between industry requirements and individual capabilities. Our comprehensive training 
                    programs and strategic recruitment solutions are designed to meet the evolving demands 
                    of global markets.
                  </p>
                </div>
              </div>
            </div>

            {/* Image Container */}
            <div 
              ref={imageRef}
              className="about-card overflow-hidden rounded-lg transform transition-transform duration-300"
            >
              <div className="relative">
                <img
                  src="/mansol_logo_about.jpg"
                  alt="Mansol Training Facility"
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                
                {/* Animated overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/0 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            </div>
          </div>

          {/* Right Column: Vision, Values, Approach Cards */}
          <div ref={rightColumnRef} className="space-y-8">
            {aboutData.slice(1).map((item) => (
              <div
                key={item.id}
                className="about-card bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0 icon-container">
                    <div className="w-14 h-14 rounded-full border-2 border-[#2563EB] flex items-center justify-center">
                      <item.icon className="text-[#2563EB] text-xl" />
                    </div>
                  </div>
                  <div className="ml-6 card-content">
                    <h3 className="text-2xl font-bold text-black mb-2">
                      {item.title}
                    </h3>
                    <div className="w-16 h-0.5 bg-[#2563EB] mb-4"></div>
                    <p className="text-[#555555] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Industry Expertise */}
            <div className="about-card bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
              <div className="card-content">
                <h3 className="text-2xl font-bold text-black mb-6">
                  Industry Expertise
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Oil & Gas" },
                    { name: "Chemical" },
                    { name: "Construction" },
                    { name: "Electro-Mechanical" },
                    { name: "EPC Projects" },
                    { name: "GCC Operations" },
                  ].map((industry, index) => (
                    <div
                      key={index}
                      className="industry-item flex items-center p-3 rounded-lg border border-gray-100 hover:border-[#2563EB]/20 transition-colors duration-200 group"
                    >
                      <div className="w-2 h-2 bg-[#2563EB] rounded-full mr-3 transition-transform duration-300 group-hover:scale-125"></div>
                      <span className="text-[#555555] text-sm font-medium group-hover:text-[#2563EB] transition-colors duration-300">
                        {industry.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-16 border-t border-gray-100">
          {[
            { number: "15", suffix: "+", label: "Years Experience" },
            { number: "5000", suffix: "+", label: "Professionals Trained" },
            { number: "50", suffix: "+", label: "Industry Partners" },
            { number: "98", suffix: "%", label: "Success Rate" },
          ].map((stat, index) => (
            <div
              key={index}
              className="stat-item text-center p-6 hover:bg-gray-50 rounded-lg transition-all duration-300 group"
            >
              <div className="flex items-center justify-center mb-2">
                <span className="stat-number text-4xl font-bold text-black group-hover:text-[#2563EB] transition-colors duration-300">
                  {stat.number}
                </span>
                <span className="text-4xl font-bold text-black group-hover:text-[#2563EB] transition-colors duration-300 ml-1">
                  {stat.suffix}
                </span>
              </div>
              <div className="text-[#555555] text-sm group-hover:text-black transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default About;