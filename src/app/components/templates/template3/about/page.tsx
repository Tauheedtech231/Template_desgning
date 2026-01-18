"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaBullseye, FaUsers, FaAward, FaGlobe, 
  FaShieldAlt, FaGraduationCap, FaIndustry, 
  FaCheckCircle, FaStar, FaHandshake, FaUserGraduate, 
  FaClock, FaBuilding, FaHandsHelping,
  FaBookOpen, FaLightbulb, FaRocket, FaChalkboardTeacher,
  FaQuoteLeft, FaChevronLeft, FaChevronRight,
  FaHeart, FaBrain, FaLeaf, FaMountain
} from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  
  // Refs for animations with proper typing
  const headingRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]); // Changed to HTMLElement for flexibility
  const sliderRef = useRef<HTMLDivElement>(null);

  // Helper functions for ref assignment
  const addToHeadingRefs = (el: HTMLDivElement | null) => {
    if (el && !headingRefs.current.includes(el)) {
      headingRefs.current.push(el);
    }
  };

  const addToTextRefs = (el: HTMLDivElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  const addToIconRefs = (el: HTMLDivElement | null) => {
    if (el && !iconRefs.current.includes(el)) {
      iconRefs.current.push(el);
    }
  };

  const addToCardRefs = (el: HTMLElement | null) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  // Static generic data
  const aboutData = {
    name: "Excel College",
    tagline: "Excellence in Education & Professional Development",
    shortDescription: "Committed to delivering exceptional educational experiences that empower individuals and transform communities through innovative learning approaches.",
    mission: "To provide accessible, high-quality education that fosters intellectual growth, practical skills, and ethical leadership. We believe in creating learning environments that challenge minds, inspire innovation, and prepare students for meaningful careers and life-long success.",
    vision: "To be recognized as a leading educational institution that sets standards for academic excellence, research innovation, and community impact. We envision a future where education breaks barriers and creates opportunities for all.",
    establishedYear: "1995",
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
        icon: FaGraduationCap,
        color: "from-[#10B981] to-[#34D399]"
      },
      {
        id: 2,
        title: "Innovation & Research",
        description: "Fostering a culture of innovation through cutting-edge research, creative thinking, and practical problem-solving approaches.",
        icon: FaBrain,
        color: "from-[#059669] to-[#10B981]"
      },
      {
        id: 3,
        title: "Student Success",
        description: "Providing comprehensive support services, mentorship programs, and resources to ensure every student achieves their full potential.",
        icon: FaHeart,
        color: "from-[#047857] to-[#059669]"
      },
      {
        id: 4,
        title: "Community Engagement",
        description: "Building strong partnerships with industries, organizations, and communities to create real-world impact and opportunities.",
        icon: FaHandsHelping,
        color: "from-[#065F46] to-[#047857]"
      },
      {
        id: 5,
        title: "Ethical Leadership",
        description: "Developing responsible leaders with strong ethical values and commitment to social responsibility.",
        icon: FaShieldAlt,
        color: "from-[#064E3B] to-[#065F46]"
      },
      {
        id: 6,
        title: "Global Perspective",
        description: "Preparing students for global challenges through international collaborations and cross-cultural understanding.",
        icon: FaGlobe,
        color: "from-[#022C22] to-[#064E3B]"
      },
    ],
    whyChooseUs: [
      {
        id: 1,
        title: "Proven Track Record",
        description: "Consistently high graduation and employment rates with industry recognition",
        icon: FaAward
      },
      {
        id: 2,
        title: "Expert Faculty",
        description: "Industry professionals and academic leaders with extensive experience",
        icon: FaChalkboardTeacher
      },
      {
        id: 3,
        title: "Modern Facilities",
        description: "State-of-the-art labs, libraries, and advanced learning spaces",
        icon: FaBuilding
      },
      {
        id: 4,
        title: "Flexible Programs",
        description: "Multiple scheduling options and diverse learning formats available",
        icon: FaClock
      },
      {
        id: 5,
        title: "Global Recognition",
        description: "Internationally recognized certifications and partnerships",
        icon: FaGlobe
      },
      {
        id: 6,
        title: "Career Support",
        description: "Comprehensive placement and continuous mentoring services",
        icon: FaHandshake
      },
    ],
    stories: [
      {
        year: "1995",
        title: "The Beginning",
        description: "Started with three classrooms and a vision to provide quality education to the local community. Focused on building strong foundations in core subjects.",
        highlight: "First batch of 50 students enrolled"
      },
      {
        year: "2005",
        title: "Expansion Era",
        description: "Expanded campus facilities and introduced professional courses. Established industry partnerships for practical training and job placements.",
        highlight: "Introduced first professional certification programs"
      },
      {
        year: "2015",
        title: "Digital Transformation",
        description: "Integrated technology into learning with smart classrooms and digital resources. Launched online learning platform for wider accessibility.",
        highlight: "Achieved 90% placement rate milestone"
      },
      {
        year: "2020",
        title: "Modernization",
        description: "Upgraded all facilities with modern infrastructure. Established research centers and innovation labs for advanced learning.",
        highlight: "Received national accreditation"
      },
      {
        year: "Present",
        title: "Excellence Achieved",
        description: "Recognized as a premier institution with thousands of successful alumni worldwide. Continues to innovate and adapt to changing educational needs.",
        highlight: "Over 2500 students currently enrolled"
      }
    ],
    accreditation: "Accredited by National Education Board & ISO Certified",
  };

  // Extract data
  const {
    tagline,
    shortDescription: description,
    mission,
    vision,
    establishedYear,
    highlights,
    pillars: aboutCards,
    whyChooseUs,
    stories,
    accreditation
  } = aboutData;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (typeof window === "undefined") return;

      // Configure default ScrollTrigger settings
      ScrollTrigger.defaults({
        toggleActions: "play none none reverse",
        start: "top 80%",
        end: "bottom 20%",
        scrub: false,
        markers: false,
      });

      // Animate all headings with left/right movement
      headingRefs.current.forEach((heading, index) => {
        if (heading) {
          gsap.fromTo(
            heading,
            { 
              x: index % 2 === 0 ? -100 : 100, 
              opacity: 0,
              filter: "blur(10px)"
            },
            {
              x: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 85%",
              }
            }
          );
        }
      });

      // Animate all text content with left/right movement
      textRefs.current.forEach((text, index) => {
        if (text) {
          gsap.fromTo(
            text,
            { 
              x: index % 2 === 0 ? 80 : -80, 
              opacity: 0,
              filter: "blur(8px)"
            },
            {
              x: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1,
              delay: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: text,
                start: "top 85%",
              }
            }
          );
        }
      });

      // Animate icons with scale and fade
      iconRefs.current.forEach((icon, index) => {
        if (icon) {
          gsap.fromTo(
            icon,
            { 
              scale: 0, 
              opacity: 0,
              rotate: -180
            },
            {
              scale: 1,
              opacity: 1,
              rotate: 0,
              duration: 0.8,
              delay: index * 0.1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: icon,
                start: "top 90%",
              }
            }
          );
        }
      });

      // Animate cards with staggered entrance
      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { 
              y: 50, 
              opacity: 0,
              scale: 0.9
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              delay: index * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
              }
            }
          );
        }
      });

      // Animate story section
      const storyElements = document.querySelectorAll('.story-element');
      storyElements.forEach((element, index) => {
        gsap.fromTo(
          element,
          { 
            x: index % 2 === 0 ? -60 : 60, 
            opacity: 0 
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
            }
          }
        );
      });

    }, sectionRef);

    // Continuous slider animation
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const totalWidth = slider.scrollWidth;
      const visibleWidth = slider.clientWidth;
      let animationId: number;

      const animateSlider = () => {
        if (slider.scrollLeft >= totalWidth - visibleWidth) {
          slider.scrollLeft = 0;
        } else {
          slider.scrollLeft += 0.8;
        }
        animationId = requestAnimationFrame(animateSlider);
      };

      animationId = requestAnimationFrame(animateSlider);

      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        ctx.revert();
      };
    }

    return () => {
      ctx.revert();
    };
  }, []);

  // Story navigation
  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStoryIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative mt-4 bg-[#0B0F0E] text-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#10B981] via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#10B981] via-transparent to-transparent rounded-full"></div>
      </div>

      {/* Top Heading Section */}
     <div className="relative py-16 md:py-24 bg-black">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      {/* Animated Divider */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#10B981]/50 to-transparent rounded-full"></div>
        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#10B981] to-[#34D399]"></div>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#10B981]/50 to-transparent rounded-full"></div>
      </div>
      
      {/* Main Heading with Animation */}
      <div ref={addToHeadingRefs} className="overflow-hidden mb-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          <span className="text-white">About </span>
          <span className="bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#10B981] bg-clip-text text-transparent">
            Excel College
          </span>
        </h1>
      </div>
      
      {/* Tagline with Animation */}
      <div ref={addToHeadingRefs} className="overflow-hidden mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/80">
          {tagline}
        </h2>
      </div>
      
      {/* Description with Animation */}
      <div ref={addToTextRefs} className="overflow-hidden max-w-3xl mx-auto">
        <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-[#10B981] to-transparent mx-auto mb-8 rounded-full"></div>
        <p className="text-lg md:text-xl text-white/70 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Established Year */}
      <div className="mt-12">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
          <span className="text-sm text-white/60">
            Established in <span className="text-white font-semibold">{establishedYear}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Full Width Image Section with Text Overlay */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/flagged/photo-1554473675-d0904f3cbf38?w=1920&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbGxlZ2V8ZW58MHx8MHx8fDA%3D"
          alt="College Campus"
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F0E]/80 via-[#0B0F0E]/50 to-[#0B0F0E]/80"></div>
        
        {/* Animated Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-4xl px-6">
            <div className="flex justify-center mb-6">
              <div 
                ref={addToIconRefs}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-[#10B981] to-[#34D399] flex items-center justify-center shadow-lg shadow-[#10B981]/30"
              >
                <FaQuoteLeft className="text-white text-2xl" />
              </div>
            </div>
            
            <div 
              ref={addToHeadingRefs}
              className="overflow-hidden mb-6"
            >
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Shaping Futures Through
                <span className="block bg-gradient-to-r from-[#10B981] to-[#34D399] bg-clip-text text-transparent">
                  Quality Education
                </span>
              </h3>
            </div>
            
            <div 
              ref={addToTextRefs}
              className="overflow-hidden"
            >
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Where academic excellence meets real-world application, creating leaders for tomorrow
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
     <div className="py-20 md:py-28 bg-black">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Heading */}
    <div className="text-center mb-16">
      <div ref={addToHeadingRefs} className="overflow-hidden mb-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          <span className="text-white">Our </span>
          <span className="bg-gradient-to-r from-[#10B981] to-[#34D399] bg-clip-text text-transparent">
            Journey
          </span>
        </h2>
      </div>

      <div ref={addToTextRefs} className="overflow-hidden max-w-2xl mx-auto">
        <p className="text-lg text-white/70">
          A timeline of growth, innovation, and commitment to educational excellence
        </p>
      </div>
    </div>

    <div className="relative story-element">
      {/* Navigation Buttons */}
      <button
        onClick={prevStory}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
      >
        <FaChevronLeft className="h-5 w-5 text-white" />
      </button>

      <button
        onClick={nextStory}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
      >
        <FaChevronRight className="h-5 w-5 text-white" />
      </button>

      {/* Active Story Display */}
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="text-center story-element">
            <div className="text-6xl font-bold bg-gradient-to-br from-[#10B981] to-[#34D399] bg-clip-text text-transparent mb-4">
              {stories[currentStoryIndex].year}
            </div>
            <div className="text-white/60 text-sm uppercase tracking-wider">Milestone Year</div>
          </div>

          <div className="md:col-span-2 story-element">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              {stories[currentStoryIndex].title}
            </h3>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {stories[currentStoryIndex].description}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#10B981] to-[#34D399] flex items-center justify-center">
                <FaStar className="h-4 w-4 text-white" />
              </div>
              <span className="text-[#10B981] font-medium">{stories[currentStoryIndex].highlight}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Story Indicators */}
      <div className="flex justify-center gap-3 mt-8 story-element">
        {stories.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStoryIndex(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentStoryIndex
                ? 'w-12 bg-gradient-to-r from-[#10B981] to-[#34D399]'
                : 'w-3 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  </div>
</div>


      {/* Mission & Vision Section - Updated Background */}
      <div className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Mission */}
            <div className="space-y-8">
              <div className="flex items-center gap-6 mb-8">
                <div 
                  ref={addToIconRefs}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-[#10B981] to-[#34D399] flex items-center justify-center"
                >
                  <FaBullseye className="text-white text-2xl" />
                </div>
                <div 
                  ref={addToHeadingRefs}
                  className="overflow-hidden"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Our Mission
                  </h3>
                </div>
              </div>
              
              <div 
                ref={addToTextRefs}
                className="space-y-6"
              >
                {mission.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-lg text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Key Focus Areas as List */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                  <FaCheckCircle className="text-[#10B981]" />
                  Key Focus Areas
                </h4>
                <ul className="space-y-2">
                  {["Academic Excellence", "Student Success", "Industry Relevance", "Community Impact"].map((item, index) => (
                    <li 
                      key={index}
                      ref={(el: HTMLLIElement | null) => addToCardRefs(el)}
                      className="flex items-center gap-3"
                    >
                      <div className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse flex-shrink-0"></div>
                      <span className="text-gray-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Vision */}
            <div className="space-y-8">
              <div className="flex items-center gap-6 mb-8">
                <div 
                  ref={addToIconRefs}
                  className="w-16 h-16 rounded-full bg-gray-800 border-2 border-[#10B981]/30 flex items-center justify-center"
                >
                  <FaRocket className="text-white text-2xl" />
                </div>
                <div 
                  ref={addToHeadingRefs}
                  className="overflow-hidden"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Our Vision
                  </h3>
                </div>
              </div>
              
              <div 
                ref={addToTextRefs}
                className="space-y-6"
              >
                {vision.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-lg text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Our Approach as List */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                  <FaChalkboardTeacher className="text-[#10B981]" />
                  Our Approach
                </h4>
                <ul className="space-y-2">
                  {[
                    "Blended Learning Model",
                    "Industry-Aligned Curriculum",
                    "Practical Skill Development",
                    "Personalized Mentorship"
                  ].map((item, index) => (
                    <li 
                      key={index}
                      ref={(el: HTMLLIElement | null) => addToCardRefs(el)}
                      className="flex items-center gap-3"
                    >
                      <FaCheckCircle className="text-[#10B981] flex-shrink-0" />
                      <span className="text-gray-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Why Choose Us Section - Updated Colors */}
    <div className="py-20 md:py-28 bg-black">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

      {/* Left Column */}
      <div className="space-y-12">
        <div>
          <div ref={addToHeadingRefs} className="overflow-hidden mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Why Choose
              <span className="block bg-gradient-to-r from-[#10B981] to-[#34D399] bg-clip-text text-transparent">
                Excel College?
              </span>
            </h2>
          </div>

          <div ref={addToTextRefs} className="overflow-hidden">
            <p className="text-lg text-gray-300 leading-relaxed">
              Discover what sets us apart and makes us the preferred choice for quality education
            </p>
          </div>
        </div>

        {/* Highlights as Checkbox List */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#10B981] to-[#34D399] flex items-center justify-center">
              <FaBookOpen className="text-white text-lg" />
            </div>
            Core Programs & Features
          </h3>
          <ul className="space-y-3">
            {highlights.map((item, index) => (
              <li
                key={index}
                ref={(el: HTMLLIElement | null) => addToCardRefs(el)}
                className="flex items-center gap-3 text-gray-300"
              >
                {/* Animated checkmark / dot */}
                <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                  <span className="block w-3 h-3 rounded-full bg-[#10B981] animate-pulse" />
                </div>
                <span className="text-white">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Column - Why Choose List */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#10B981] to-[#34D399] flex items-center justify-center">
            <FaChalkboardTeacher className="text-white text-lg" />
          </div>
          Why Choose Us
        </h3>

        <ul className="space-y-3">
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon;
            return (
              <li
                key={item.id}
                ref={(el: HTMLLIElement | null) => addToCardRefs(el)}
                className="flex items-start gap-3"
              >
                {/* Animated checkbox dot */}
                <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                  <span className="block w-3 h-3 rounded-full bg-[#10B981] animate-pulse" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{item.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

    </div>
  </div>
</div>


      {/* Pillars Section with Continuous Slider - Updated Background */}
      <div className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <div 
              ref={addToHeadingRefs}
              className="overflow-hidden mb-6"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                <span className="text-gray-900">Our Core </span>
                <span className="bg-gradient-to-r from-[#10B981] to-[#34D399] bg-clip-text text-transparent">
                  Pillars
                </span>
              </h2>
            </div>
            
            <div 
              ref={addToTextRefs}
              className="overflow-hidden max-w-2xl mx-auto"
            >
              <p className="text-lg text-gray-600">
                The foundational principles that guide our educational philosophy and operations
              </p>
            </div>
          </div>

          {/* Continuous Slider Container */}
          <div className="relative overflow-hidden py-8">
            <div 
              ref={sliderRef}
              className="flex space-x-8"
              style={{ 
                width: 'max-content',
                animation: 'scroll 40s linear infinite'
              }}
            >
              {/* Duplicate cards for seamless loop */}
              {[...aboutCards, ...aboutCards].map((card, index) => {
                const Icon = card.icon;
                return (
                  <div
                    key={`${card.id}-${index}`}
                    className="flex-shrink-0 w-80"
                  >
                    <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-lg rounded-3xl p-8 hover:border-[#10B981]/30 hover:shadow-xl transition-all duration-300 group h-full">
                      <div className="flex flex-col h-full">
                        {/* Icon */}
                        <div className="mb-8">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-300 group-hover:border-[#10B981]/30 flex items-center justify-center transition-colors">
                            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                              <Icon className="text-white text-2xl" />
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          {card.title}
                        </h3>
                        
                        <p className="text-gray-600 leading-relaxed flex-grow mb-6">
                          {card.description}
                        </p>

                        {/* Number indicator */}
                        <div className="mt-auto pt-6 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-[#10B981] group-hover:translate-x-2 transition-transform">
                              Learn More →
                            </div>
                            <div className="text-lg font-bold text-gray-400">0{card.id}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Gradient overlay for edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>

    
     

      {/* CSS Animation for Continuous Slider */}
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 2rem));
          }
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10B981, #34D399);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0EA271, #10B981);
        }

        /* Hide scrollbar for slider */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;