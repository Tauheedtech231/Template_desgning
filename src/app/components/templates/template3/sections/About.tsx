"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaBullseye, FaUsers, FaAward, FaGlobe, 
  FaShieldAlt, FaGraduationCap, FaIndustry, 
  FaCheckCircle, FaStar, FaHandshake, FaUserGraduate, 
  FaClock, FaBuilding, FaHandsHelping,
  FaBookOpen, FaLightbulb, FaRocket, FaChalkboardTeacher,
  FaQuoteLeft
} from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const topHeadingRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const missionSectionRef = useRef<HTMLDivElement>(null);
  const whyChooseRef = useRef<HTMLDivElement>(null);
  const pillarsHeadingRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const imageSectionRef = useRef<HTMLDivElement>(null);
  const imageTextRef = useRef<HTMLDivElement>(null);

  // Static generic data
  const aboutData = {
    name: "Institution",
    tagline: "Excellence in Education & Professional Development",
    shortDescription: "Committed to delivering exceptional educational experiences that empower individuals and transform communities through innovative learning approaches.",
    mission: "To provide accessible, high-quality education that fosters intellectual growth, practical skills, and ethical leadership. We believe in creating learning environments that challenge minds, inspire innovation, and prepare students for meaningful careers and life-long success.",
    vision: "To be recognized as a leading educational institution that sets standards for academic excellence, research innovation, and community impact. We envision a future where education breaks barriers and creates opportunities for all.",
    establishedYear: "2010",
    highlights: [
      "Industry-Relevant Curriculum",
      "Expert Faculty Members",
      "Modern Learning Facilities",
      "Career Placement Support",
      "Research Opportunities",
      "Global Partnerships"
    ],
    pillars: [
      {
        id: 1,
        title: "Academic Excellence",
        description: "Maintaining the highest standards in curriculum design, teaching methodologies, and academic outcomes across all programs.",
      },
      {
        id: 2,
        title: "Innovation & Research",
        description: "Fostering a culture of innovation through cutting-edge research, creative thinking, and practical problem-solving approaches.",
      },
      {
        id: 3,
        title: "Student Success",
        description: "Providing comprehensive support services, mentorship programs, and resources to ensure every student achieves their full potential.",
      },
      {
        id: 4,
        title: "Community Engagement",
        description: "Building strong partnerships with industries, organizations, and communities to create real-world impact and opportunities.",
      },
    ],
    whyChooseUs: [
      {
        id: 1,
        title: "Proven Track Record",
        description: "Consistently high graduation and employment rates",
      },
      {
        id: 2,
        title: "Expert Faculty",
        description: "Industry professionals and academic leaders",
      },
      {
        id: 3,
        title: "Modern Facilities",
        description: "State-of-the-art labs and learning spaces",
      },
      {
        id: 4,
        title: "Flexible Programs",
        description: "Multiple scheduling options and learning formats",
      },
      {
        id: 5,
        title: "Global Recognition",
        description: "Internationally recognized certifications",
      },
      {
        id: 6,
        title: "Career Support",
        description: "Comprehensive placement and mentoring services",
      },
    ],
    accreditation: "Accredited by National Education Board",
  };

  // Extract data
  const instituteName = aboutData.name;
  const tagline = aboutData.tagline;
  const description = aboutData.shortDescription;
  const mission = aboutData.mission;
  const vision = aboutData.vision;
  const establishedYear = aboutData.establishedYear;
  const highlights = aboutData.highlights;
  const aboutCards = aboutData.pillars;
  const whyChooseUs = aboutData.whyChooseUs;
  const accreditation = aboutData.accreditation;

  // Map icons
  const pillarWithIcons = aboutCards.map((pillar, index) => {
    const icons = [FaGraduationCap, FaLightbulb, FaUserGraduate, FaHandsHelping];
    return {
      ...pillar,
      icon: icons[index] || FaGraduationCap,
    };
  });

  const whyChooseUsWithIcons = whyChooseUs.map((item, index) => {
    const icons = [FaAward, FaChalkboardTeacher, FaBuilding, FaClock, FaGlobe, FaHandshake];
    return {
      ...item,
      icon: icons[index] || FaAward
    };
  });

  useEffect(() => {
    // Initialize animations only after component mounts
    const ctx = gsap.context(() => {
      // Check if we're in a browser environment
      if (typeof window === "undefined") return;

      // Top heading smooth fade in
      if (topHeadingRef.current) {
        gsap.fromTo(
          topHeadingRef.current,
          { 
            opacity: 0,
            y: 30 
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          }
        );
      }

      // Image section fade up
      if (imageSectionRef.current) {
        gsap.fromTo(
          imageSectionRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageSectionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Image text fade in
      if (imageTextRef.current) {
        gsap.fromTo(
          imageTextRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: "power3.out",
          }
        );
      }

      // Mission and Approach sections - smooth slide in from sides
      if (leftColumnRef.current) {
        gsap.fromTo(
          leftColumnRef.current,
          {
            opacity: 0,
            x: -50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftColumnRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      if (rightColumnRef.current) {
        gsap.fromTo(
          rightColumnRef.current,
          {
            opacity: 0,
            x: 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rightColumnRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Mission section fade up
      if (missionSectionRef.current) {
        gsap.fromTo(
          missionSectionRef.current,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: missionSectionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Why Choose Us section fade up
      if (whyChooseRef.current) {
        gsap.fromTo(
          whyChooseRef.current,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: whyChooseRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Pillars heading fade up
      if (pillarsHeadingRef.current) {
        gsap.fromTo(
          pillarsHeadingRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pillarsHeadingRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Cards animation
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.querySelectorAll('.pillar-card');
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            {
              opacity: 0,
              y: 40,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardsContainerRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              }
            }
          );
        }
      }

      // Why Choose Us cards - smooth staggered fade up
      const whyChooseCards = document.querySelectorAll('.why-choose-card');
      if (whyChooseCards.length > 0) {
        gsap.fromTo(
          whyChooseCards,
          { 
            opacity: 0, 
            y: 20 
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".why-choose-section",
              start: "top 90%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
    >
      {/* Top Heading Section */}
      <div 
        ref={topHeadingRef}
        className="relative bg-white py-12 md:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Divider line */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-16 h-0.5 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-[#064E3B] rounded-full"></div>
              <div className="w-16 h-0.5 bg-gray-300 rounded-full"></div>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#064E3B] mb-4">
              About Our Institution
            </h1>
            
            {/* Tagline */}
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#475569] mb-6">
              {tagline}
            </h2>
            
            {/* Description */}
            <div className="max-w-3xl mx-auto">
              <div className="h-0.5 w-24 bg-gray-200 mx-auto mb-6"></div>
              <p className="text-base md:text-lg text-[#334155] leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Image Section with Text Overlay */}
      <div 
        ref={imageSectionRef}
        className="relative w-full h-[300px] md:h-[350px] overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/flagged/photo-1554473675-d0904f3cbf38?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbGxlZ2V8ZW58MHx8MHx8fDA%3D"
          alt="College Campus"
          className="w-full h-full object-cover"
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Text Overlay */}
        <div 
          ref={imageTextRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center text-white max-w-3xl px-6">
            <div className="flex justify-center mb-4">
              <FaQuoteLeft className="text-3xl text-white/70" />
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Shaping Futures Through Quality Education
            </h3>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
              Where academic excellence meets real-world application, creating leaders for tomorrow
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
          {/* Two Column Layout: Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Left Column - Mission */}
            <div 
              ref={leftColumnRef}
              className="relative"
            >
              <div className="sticky top-24">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-lg bg-[#064E3B]/10 flex items-center justify-center">
                    <FaBullseye className="text-[#064E3B] text-xl" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#064E3B]">
                    Our Mission
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {mission.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-base text-[#334155] leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Key Focus Areas */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-semibold text-[#064E3B] mb-4 text-lg flex items-center gap-2">
                    <FaCheckCircle className="text-[#064E3B]" />
                    Key Focus Areas
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {["Academic Excellence", "Student Success", "Industry Relevance", "Community Impact"].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-[#064E3B] rounded-full"></div>
                        <span className="text-sm text-[#334155]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Vision */}
            <div 
              ref={rightColumnRef}
              className="relative"
            >
              <div className="sticky top-24">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-lg bg-[#064E3B] flex items-center justify-center">
                    <FaRocket className="text-white text-xl" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#064E3B]">
                    Our Vision
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {vision.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-base text-[#334155] leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Methodology Points */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-semibold text-[#064E3B] mb-4 text-lg flex items-center gap-2">
                    <FaChalkboardTeacher className="text-[#064E3B]" />
                    Our Approach
                  </h4>
                  <div className="space-y-3">
                    {[
                      "Blended Learning Model",
                      "Industry-Aligned Curriculum",
                      "Practical Skill Development",
                      "Personalized Mentorship"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <FaCheckCircle className="text-[#064E3B] flex-shrink-0" />
                        <span className="text-sm text-[#334155]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider Line */}
          <div className="h-0.5 w-full bg-gray-200 my-16"></div>

          {/* About Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Left Column - Introduction */}
            <div ref={missionSectionRef} className="space-y-8">
              <div className="section-header">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-0.5 bg-[#064E3B]"></div>
                  <span className="text-[#064E3B] text-sm font-semibold uppercase tracking-wider">
                    Our Journey
                  </span>
                  <div className="w-8 h-0.5 bg-[#064E3B]"></div>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-[#064E3B] mb-6">
                  Building Excellence Since {establishedYear}
                </h2>
                
                <div className="space-y-4">
                  <p className="text-base text-[#334155] leading-relaxed">
                    Founded in {establishedYear}, our institution has grown from a small educational center 
                    into a respected leader in professional education. Our journey reflects our commitment 
                    to innovation, quality, and student success.
                  </p>
                  <p className="text-base text-[#334155] leading-relaxed">
                    We believe in creating learning environments that challenge conventional thinking, 
                    foster creativity, and prepare individuals for the evolving demands of the modern world.
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-[#064E3B] mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#064E3B]/10 flex items-center justify-center">
                    <FaBookOpen className="text-[#064E3B]" />
                  </div>
                  Core Programs & Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {highlights.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#064E3B]/10 flex items-center justify-center">
                        <FaCheckCircle className="text-[#064E3B] text-xs" />
                      </div>
                      <span className="text-sm text-[#334155]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Why Choose Us */}
            <div ref={whyChooseRef} className="why-choose-section">
              <div className="sticky top-24">
                <div className="bg-gray-900 rounded-xl p-6 md:p-8 text-white">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[#064E3B] flex items-center justify-center">
                      <FaStar className="text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">Why Choose Us?</h3>
                  </div>
                  <p className="text-white/80 mb-8 text-base">
                    Discover what sets us apart and makes us the preferred choice for education
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {whyChooseUsWithIcons.map((item) => (
                      <div 
                        key={item.id}
                        className="why-choose-card group bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#064E3B] flex items-center justify-center flex-shrink-0">
                            <item.icon className="text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white text-base mb-1">{item.title}</h4>
                            <p className="text-sm text-white/70">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider Line */}
          <div className="h-0.5 w-full bg-gray-200 my-16"></div>

          {/* Pillars Section */}
          <div className="cards-container mb-20">
            <div ref={pillarsHeadingRef} className="text-center mb-12">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-16 h-0.5 bg-gray-300"></div>
                <span className="text-[#064E3B] text-sm font-semibold uppercase tracking-wider">
                  Our Foundation
                </span>
                <div className="w-16 h-0.5 bg-gray-300"></div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#064E3B] mb-4">
                Our Core Pillars
              </h2>
              <p className="text-base text-[#334155] max-w-2xl mx-auto leading-relaxed">
                The foundational principles that guide our educational philosophy and operations
              </p>
            </div>

            <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillarWithIcons.map((card) => (
                <div
                  key={card.id}
                  className="pillar-card group bg-white rounded-lg p-6 border border-gray-200 hover:border-[#064E3B]/30 transition-all duration-300"
                >
                  <div className="flex flex-col h-full">
                    {/* Icon */}
                    <div className="mb-6">
                      <div 
                        className="w-14 h-14 rounded-lg bg-[#064E3B]/10 flex items-center justify-center"
                      >
                        <card.icon className="text-[#064E3B] text-xl" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-[#064E3B] mb-3">
                      {card.title}
                    </h3>
                    
                    <p className="text-sm text-[#334155] leading-relaxed flex-grow mb-4">
                      {card.description}
                    </p>

                    {/* Number indicator */}
                    <div className="mt-auto pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-medium text-[#064E3B]">Learn More →</div>
                        <div className="text-lg font-bold text-gray-300">0{card.id}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accreditation & Recognition */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-4 bg-gray-50 rounded-lg px-8 py-6 border border-gray-200">
              <FaShieldAlt className="text-2xl text-[#064E3B]" />
              <div className="text-left">
                <div className="font-bold text-[#064E3B] text-lg mb-1">Quality Assured</div>
                <div className="text-sm text-[#334155]">{accreditation}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div className="py-8 border-t border-gray-200 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-[#334155]">
              Trusted by organizations across industries for quality education and professional development
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;