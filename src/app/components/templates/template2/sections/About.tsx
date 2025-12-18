"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaRocket, FaBullseye, FaChartLine, FaUsers, FaAward, FaGlobe, FaShieldAlt, FaGraduationCap, FaIndustry, FaCertificate, FaCheckCircle, FaStar, FaHandshake, FaUserGraduate, FaClock, FaMedal, FaBuilding, FaHandsHelping, FaUsersCog } from "react-icons/fa";
/* eslint-disable */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Interface for the fetched data structure
interface AboutData {
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  mission: string;
  vision: string;
  establishedYear: string;
  highlights: string[];
  pillars: Array<{
    id: number;
    title: string;
    description: string;
  }>;
  whyChooseUs: Array<{
    id: number;
    title: string;
    description: string;
  }>;
  stats: Array<{
    id: number;
    label: string;
    value: number;
    suffix: string;
  }>;
  accreditation: string;
  coverImage: string;
  logo: string;
}

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const heading1Ref = useRef<HTMLHeadingElement>(null);
  const heading2Ref = useRef<HTMLHeadingElement>(null);
  const topHeadingRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const missionSectionRef = useRef<HTMLDivElement>(null);
  const approachSectionRef = useRef<HTMLDivElement>(null);
  const whyChooseRef = useRef<HTMLDivElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const pillarsHeadingRef = useRef<HTMLDivElement>(null);

  // State for dynamic data
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from database on component mount
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(
          `https://nes-tick-portfolio-handler.vercel.app/api/sections?template_id=2&section_name=About`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.sections && data.sections.length > 0) {
            setAboutData(data.sections[0].content);
          }
        } else {
          console.error('Failed to fetch about data');
        }
      } catch (error) {
        console.error('Error loading about data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Extract data with fallbacks
  const instituteName = aboutData?.name || "Mansol";
  const tagline = aboutData?.tagline || "Pakistan Premier Safety Training Institute";
  const description = aboutData?.shortDescription || 
    "Transforming workplace safety through world-class certification programs and hands-on training that meets international standards.";
  const mission = aboutData?.mission || 
    "To revolutionize workplace safety standards in Pakistan by providing world-class, practical safety education that empowers professionals to create safer working environments across all industries.";
  const vision = aboutData?.vision || 
    "Founded in 2008, Mansol Institute emerged with a singular vision: to revolutionize workplace safety standards in Pakistan. What began as a small training center has grown into the nations most trusted safety education provider.";
  const establishedYear = aboutData?.establishedYear || "2008";
  const longDescription = aboutData?.longDescription || 
    "Established\nSince 2008\nLeading Safety Education\nin Pakistan\n15+ years of excellence in professional safety training, empowering thousands of professionals to achieve international safety standards.";
  const coverImage = aboutData?.coverImage || "/about.jpg";
  const highlights = aboutData?.highlights || [
    "NEBOSH Certification Programs",
    "IOSH Managing Safely",
    "OSHA Standards Training",
    "Fire Safety Training",
    "First Aid & CPR Certification",
    "Risk Assessment Training",
  ];

  // Parse the long description
  const longDescLines = longDescription.split('\n');
  const heroLines = {
    line1: longDescLines[0] || "Established",
    line2: longDescLines[1] || `Since ${establishedYear}`,
    line3: longDescLines[2] || "Leading Safety Education",
    line4: longDescLines[3] || "in Pakistan",
    line5: longDescLines[4] || "15+ years of excellence in professional safety training, empowering thousands of professionals to achieve international safety standards."
  };

  // Use pillars from database or fallback
  const aboutCards = aboutData?.pillars || [
    {
      id: 1,
      title: "Industry Leadership",
      description: "15+ years of excellence in safety training, setting industry standards and benchmarks for professional development.",
    },
    {
      id: 2,
      title: "Expert Training",
      description: "Internationally certified trainers with real-world experience delivering practical, hands-on safety education.",
    },
    {
      id: 3,
      title: "Global Standards",
      description: "Curriculum aligned with NEBOSH, IOSH, OSHA, and other international safety certification requirements.",
    },
    {
      id: 4,
      title: "Certified Excellence",
      description: "98% certification success rate with comprehensive assessment and continuous improvement programs.",
    },
  ];

  // Map icon to each pillar (fallback if not in database)
  const pillarWithIcons = aboutCards.map((pillar, index) => {
    const icons = [FaShieldAlt, FaGraduationCap, FaIndustry, FaCertificate];
    const colors = ["#06B6D4", "#10B981", "#F97316", "#8B5CF6"];
    return {
      ...pillar,
      icon: icons[index] || FaShieldAlt,
      color: colors[index] || "#06B6D4"
    };
  });

  const whyChooseUs = aboutData?.whyChooseUs || [
    {
      id: 1,
      title: "Proven Excellence",
      description: "Consistently rated 4.9+ by professionals across industries",
    },
    {
      id: 2,
      title: "Expert Faculty",
      description: "Industry veterans with 20+ years of safety experience",
    },
    {
      id: 3,
      title: "Industry Partnerships",
      description: "Collaborations with top organizations for placement",
    },
    {
      id: 4,
      title: "Flexible Scheduling",
      description: "Weekend, evening, and customized corporate batches",
    },
    {
      id: 5,
      title: "Premium Facilities",
      description: "State-of-the-art training labs and equipment",
    },
    {
      id: 6,
      title: "Post-Course Support",
      description: "Lifetime career guidance and certification renewal",
    },
  ];

  // Map icons for why choose us
  const whyChooseUsWithIcons = whyChooseUs.map((item, index) => {
    const icons = [FaStar, FaUserGraduate, FaHandshake, FaClock, FaMedal, FaCheckCircle];
    return {
      ...item,
      icon: icons[index] || FaStar
    };
  });

  const stats = aboutData?.stats || [
    { id: 1, label: "Years Experience", value: 15, suffix: "+" },
    { id: 2, label: "Professionals", value: 5000, suffix: "+" },
    { id: 3, label: "Success Rate", value: 98, suffix: "%" },
    { id: 4, label: "Industry Partners", value: 50, suffix: "+" },
  ];

  // Map icons for stats
  const statsWithIcons = stats.map((stat, index) => {
    const icons = [FaChartLine, FaUsers, FaAward, FaGlobe];
    return {
      ...stat,
      icon: icons[index] || FaChartLine
    };
  });

  const accreditation = aboutData?.accreditation || "National Education Board Certified";

  useEffect(() => {
    if (loading || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Clean smooth scroll for entire page
      gsap.utils.toArray("section").forEach((section: any) => {
        gsap.fromTo(section,
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
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      // Top heading smooth fade in
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

      // Hero image parallax with smooth movement
      gsap.to(heroImageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroImageRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Hero content fade in
      gsap.fromTo(
        [heading1Ref.current, heading2Ref.current, contentRef.current],
        { 
          opacity: 0,
          y: 30 
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroImageRef.current,
            start: "top 80%",
          },
        }
      );

      // Mission and Approach sections - smooth slide in from sides
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
          },
        }
      );

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
          },
        }
      );

      // Mission section fade up
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
          },
        }
      );

      // Why Choose Us section fade up
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
          },
        }
      );

      // Pillars heading fade up
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
          },
        }
      );

      // Pillars cards - smooth staggered fade up
      gsap.fromTo(
        cardsRef.current,
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
            trigger: ".cards-container",
            start: "top 85%",
          },
        }
      );

      // Pillars cards hover effects
      cardsRef.current.forEach((card) => {
        if (!card) return;
        
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

      // Stats container fade up
      gsap.fromTo(
        statsContainerRef.current,
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
            trigger: ".stats-section",
            start: "top 85%",
          },
        }
      );

      // Stats counting animation
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

      // Why Choose Us cards - smooth staggered fade up
      gsap.fromTo(
        ".why-choose-card",
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
          },
        }
      );

      // Decorative elements fade in
      gsap.fromTo(
        ".decorative-element",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      // Continuous subtle floating animation for some elements
      gsap.to(".float-element", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [loading]);

  // Show loading state
  if (loading) {
    return (
      <section id="about" className="relative bg-white overflow-hidden min-h-screen">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#06B6D4] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading about section...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute decorative-element w-2 h-2 rounded-full bg-[#06B6D4]/5"
            style={{
              left: `${10 + i * 8}%`,
              top: `${15 + (i % 4) * 25}%`,
            }}
          ></div>
        ))}
      </div>

      {/* Top Heading Section - BEFORE Image */}
      <div 
        ref={topHeadingRef}
        className="relative bg-gradient-to-b from-white to-gray-50 py-12 md:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-0.5 bg-[#06B6D4] rounded-full"></div>
              <div className="w-2 h-2 bg-[#06B6D4] rounded-full float-element"></div>
              <div className="w-10 h-0.5 bg-[#06B6D4] rounded-full"></div>
            </div>
            
            {/* First Heading - Dynamic */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-2">
              About <span className="text-[#06B6D4]">{instituteName}</span>
            </h1>
            
            {/* Second Heading - Dynamic */}
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#475569]">
              {tagline}
            </h2>
            
            {/* Description - Dynamic */}
            <p className="mt-6 text-sm md:text-base text-[#64748b] max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        
        {/* Arrow pointing down to image */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-[#06B6D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hero Image Section - Full Width */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <div 
          ref={heroImageRef}
          className="absolute inset-0 w-full h-full"
        >
          {/* Dynamic Cover Image */}
          <img
            src={coverImage}
            alt={`${instituteName} Training Center`}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4]/20 via-transparent to-[#0891b2]/20"></div>
        </div>

        {/* Content Inside Image */}
        <div 
          ref={contentRef}
          className="absolute inset-0 flex items-center"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl">
              {/* Headings Inside Image - Dynamic */}
              <div className="mb-6">
                <h1 
                  ref={heading1Ref}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
                >
                  {heroLines.line1}
                  <span className="block text-[#06B6D4] mt-1">{heroLines.line2}</span>
                </h1>
              </div>

              {/* Divider */}
              <div className="w-14 h-0.5 bg-gradient-to-r from-white/40 via-[#06B6D4] to-white/40 mb-4 rounded-full"></div>

              {/* Second Heading Inside Image - Dynamic */}
              <div className="mb-6">
                <h2 
                  ref={heading2Ref}
                  className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight"
                >
                  {heroLines.line3}
                  <span className="block">{heroLines.line4}</span>
                </h2>
              </div>
              
              {/* Description - Dynamic */}
              <p className="text-sm md:text-base text-white/85 mb-8 max-w-lg leading-relaxed">
                {heroLines.line5}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          {/* Left-Right Animation Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
            {/* Left Column - Mission - Dynamic */}
            <div 
              ref={leftColumnRef}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 md:p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#06B6D4]/10 flex items-center justify-center">
                  <FaBuilding className="text-[#06B6D4] text-lg" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#111827]">
                  Our Mission
                </h3>
              </div>
              
              <div className="space-y-4">
                {/* Split mission by paragraphs */}
                {mission.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-sm md:text-base text-[#475569] leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Key Focus Areas */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
                  <FaBullseye className="text-[#06B6D4]" />
                  Key Focus Areas
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {["Practical Training", "Industry Standards", "Certification", "Career Support"].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#06B6D4] rounded-full float-element"></div>
                      <span className="text-sm text-[#475569]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Approach/Vision - Dynamic */}
            <div 
              ref={rightColumnRef}
              className="bg-gradient-to-br from-[#06B6D4]/5 to-white rounded-xl p-6 md:p-8 border border-[#06B6D4]/20 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#06B6D4] flex items-center justify-center">
                  <FaHandsHelping className="text-white text-lg" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#111827]">
                  Our Vision
                </h3>
              </div>
              
              <div className="space-y-4">
                {/* Split vision by paragraphs */}
                {vision.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-sm md:text-base text-[#475569] leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Methodology Points */}
              <div className="mt-8 pt-6 border-t border-[#06B6D4]/10">
                <h4 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
                  <FaUsersCog className="text-[#06B6D4]" />
                  Training Methodology
                </h4>
                <div className="space-y-3">
                  {[
                    "70% Practical, 30% Theoretical",
                    "Industry Expert Instructors",
                    "Real Case Studies",
                    "Simulation Exercises"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-[#06B6D4]/5 transition-colors">
                      <FaCheckCircle className="text-[#06B6D4] flex-shrink-0" />
                      <span className="text-sm text-[#475569]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Introduction Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
            {/* Left Column - Introduction */}
            <div ref={missionSectionRef} className="space-y-8">
              <div className="section-header">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-[#06B6D4]"></div>
                  <span className="text-[#06B6D4] text-xs font-semibold uppercase tracking-wider">
                    Our Journey & Vision
                  </span>
                  <div className="w-10 h-0.5 bg-[#06B6D4]"></div>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6">
                  Building a <span className="text-[#06B6D4]">Safer Pakistan</span>
                </h2>
                
                <div className="space-y-4">
                  <p className="text-sm md:text-base text-[#475569] leading-relaxed">
                    Founded in {establishedYear}, {instituteName} emerged with a singular vision: to revolutionize 
                    workplace safety standards in Pakistan. What began as a small training center has 
                    grown into the nations most trusted safety education provider.
                  </p>
                  <p className="text-sm md:text-base text-[#475569] leading-relaxed">
                    Our mission extends beyond certification - we are cultivating a culture of safety 
                    consciousness that permeates every industry, ensuring professionals are not just 
                    qualified, but truly equipped to save lives and prevent accidents.
                  </p>
                </div>
              </div>

              {/* Highlights - Dynamic */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-lg md:text-xl font-bold text-[#111827] mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#06B6D4]/10 flex items-center justify-center">
                    <FaBullseye className="text-[#06B6D4]" />
                  </div>
                  Core Training Programs
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {highlights.map((item, index) => (
                    <div 
                      key={index} 
                      className="group flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100 hover:border-[#06B6D4] hover:shadow-sm transition-all duration-200"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#06B6D4]/10 flex items-center justify-center group-hover:bg-[#06B6D4] group-hover:scale-110 transition-all">
                        <FaCheckCircle className="text-[#06B6D4] text-xs group-hover:text-white" />
                      </div>
                      <span className="text-xs md:text-sm text-[#475569] group-hover:text-[#06B6D4]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Why Choose Us - Dynamic */}
            <div ref={whyChooseRef} className="why-choose-section">
              <div className="sticky top-20">
                <div className="bg-gradient-to-br from-[#111827] to-[#1e293b] rounded-xl p-6 md:p-8 text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#06B6D4]/20 flex items-center justify-center">
                      <FaRocket className="text-[#06B6D4] text-sm" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold">Why Choose {instituteName}?</h3>
                  </div>
                  <p className="text-white/80 mb-6 text-sm">
                    What makes us the preferred choice for safety professionals
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {whyChooseUsWithIcons.map((item, index) => (
                      <div 
                        key={item.id}
                        className="why-choose-card group bg-white/5 backdrop-blur-sm rounded-lg p-3 hover:bg-white/10 transition-all duration-200 border border-white/10 hover:border-[#06B6D4]/30"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#06B6D4] to-[#0891b2] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <item.icon className="text-white text-xs" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white text-sm mb-1">{item.title}</h4>
                            <p className="text-xs text-white/70">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Cards Grid - Dynamic */}
          <div className="cards-container mb-16 md:mb-20">
            <div ref={pillarsHeadingRef} className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#06B6D4]"></div>
                <span className="text-[#06B6D4] text-xs font-semibold uppercase tracking-wider">
                  Our Excellence Pillars
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#06B6D4]"></div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4">
                Built on <span className="text-[#06B6D4]">{pillarWithIcons.length} Pillars</span>
              </h2>
              <p className="text-sm text-[#475569] max-w-2xl mx-auto leading-relaxed">
                Each aspect of our training methodology is designed to deliver unparalleled results
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {pillarWithIcons.map((card, index) => (
                <div
                  key={card.id}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className="group bg-white rounded-lg p-5 md:p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col h-full">
                    {/* Icon with gradient */}
                    <div className="relative mb-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center relative overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}80)` }}
                      >
                        <div className="absolute inset-0 bg-white/10"></div>
                        <card.icon className="text-white text-lg relative z-10" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-base md:text-lg font-bold text-[#111827] mb-3 group-hover:text-[#06B6D4] transition-colors">
                      {card.title}
                    </h3>
                    
                    <p className="text-xs md:text-sm text-[#475569] leading-relaxed flex-grow mb-4">
                      {card.description}
                    </p>

                    {/* Number indicator */}
                    <div className="mt-auto pt-4 border-t border-gray-100 group-hover:border-[#06B6D4] transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-medium text-[#06B6D4]">Learn More →</div>
                        <div className="text-lg font-bold text-gray-300">0{card.id}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section - Dynamic */}
          <div ref={statsContainerRef} className="stats-section mb-16 md:mb-20">
            <div className="bg-gradient-to-br from-gray-900 to-[#111827] rounded-xl md:rounded-2xl p-6 md:p-8 relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#06B6D4] rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#0891b2] rounded-full blur-2xl"></div>
              </div>
              
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <FaChartLine className="text-[#06B6D4]" />
                    <span className="text-[#06B6D4] text-xs font-semibold uppercase tracking-wider">
                      Our Impact
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Transforming <span className="text-[#06B6D4]">Safety Education</span>
                  </h2>
                  <p className="text-white/80 max-w-xl mx-auto text-sm">
                    Measuring our contribution to professional safety standards
                  </p>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {statsWithIcons.map((stat) => (
                    <div
                      key={stat.id}
                      className="group text-center p-4 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-all duration-200 border border-white/10 hover:border-[#06B6D4]/30"
                    >
                      <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#06B6D4]/20 to-transparent flex items-center justify-center group-hover:scale-110 transition-transform">
                          <stat.icon className="text-lg text-[#06B6D4]" />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <span 
                          className="stat-number text-2xl md:text-3xl font-bold text-white" 
                          data-value={stat.value}
                        >
                          {stat.value}
                        </span>
                        <span className="text-2xl md:text-3xl font-bold text-white">
                          {stat.suffix}
                        </span>
                      </div>
                      
                      <div className="text-sm font-semibold text-white">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Accreditation & Recognition - Dynamic */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-white to-gray-50 rounded-lg px-6 py-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <FaShieldAlt className="text-2xl text-[#06B6D4]" />
              <div className="text-left">
                <div className="font-bold text-[#111827] text-base mb-0.5">Government Recognized</div>
                <div className="text-xs text-[#475569]">{accreditation}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div className="py-6 border-t border-gray-200 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs text-[#475569]">
              Trusted by 500+ organizations across Pakistan including Fortune 500 companies, 
              government agencies, and leading industrial groups
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;