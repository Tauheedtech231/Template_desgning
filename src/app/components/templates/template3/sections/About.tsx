"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BsCaretRightFill } from "react-icons/bs";
import { 
  FaBullseye, FaAward, FaGlobe, 
  FaShieldAlt, FaGraduationCap,  
  FaCheckCircle, FaStar, FaHandshake, 
  FaClock, FaBuilding, FaHandsHelping,
  FaRocket, FaChalkboardTeacher,
  FaQuoteLeft, FaChevronLeft, FaChevronRight,
  FaHeart, FaBrain, 
  FaArrowRight,
  FaChevronDown, FaChevronUp,
  FaArrowDown
} from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillarsSliderRef = useRef<HTMLDivElement>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentPillarIndex, setCurrentPillarIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Refs for animations
  const headingRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  const addToCardRefs = (el: HTMLDivElement | null) => {
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
    faqs: [
      {
        id: 1,
        question: "What programs does Excel College offer?",
        answer: "We offer a wide range of undergraduate, graduate, and professional certification programs across various disciplines including Business, Technology, Health Sciences, and Arts."
      },
      {
        id: 2,
        question: "How do I apply for admission?",
        answer: "You can apply online through our website or visit our admissions office. We accept applications throughout the year for different intake periods."
      },
      {
        id: 3,
        question: "Are scholarships available?",
        answer: "Yes, we offer various scholarships based on academic merit, financial need, and special talents. Contact our financial aid office for details."
      },
      {
        id: 4,
        question: "What is the student-to-faculty ratio?",
        answer: "We maintain a low student-to-faculty ratio of 15:1 to ensure personalized attention and quality interaction between students and faculty."
      },
      {
        id: 5,
        question: "Does the college provide accommodation?",
        answer: "Yes, we have on-campus dormitories as well as partnerships with nearby housing facilities for students."
      },
      {
        id: 6,
        question: "What career support services are available?",
        answer: "We provide career counseling, internship placements, job fairs, resume building workshops, and interview preparation sessions."
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
    faqs,
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

      // Enhanced heading animations - Different directions
      headingRefs.current.forEach((heading, index) => {
        if (heading) {
          const direction = index % 4;
          let fromProps = {};
          
          switch(direction) {
            case 0: // Left to right
              fromProps = { x: -150, opacity: 0, filter: "blur(15px)" };
              break;
            case 1: // Right to left
              fromProps = { x: 150, opacity: 0, filter: "blur(15px)" };
              break;
            case 2: // Bottom to top
              fromProps = { y: 80, opacity: 0, filter: "blur(10px)" };
              break;
            case 3: // Top to bottom with scale
              fromProps = { y: -60, scale: 0.8, opacity: 0, filter: "blur(10px)" };
              break;
          }

          gsap.fromTo(
            heading,
            fromProps,
            {
              x: 0,
              y: 0,
              scale: 1,
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

      // Enhanced text animations - Different patterns
      textRefs.current.forEach((text, index) => {
        if (text) {
          const direction = index % 3;
          let fromProps = {};
          
          switch(direction) {
            case 0: // Left with rotation
              fromProps = { x: -120, rotateY: 90, opacity: 0, filter: "blur(12px)" };
              break;
            case 1: // Right with rotation
              fromProps = { x: 120, rotateY: -90, opacity: 0, filter: "blur(12px)" };
              break;
            case 2: // Bottom with bounce
              fromProps = { y: 100, opacity: 0, filter: "blur(8px)" };
              break;
          }

          gsap.fromTo(
            text,
            fromProps,
            {
              x: 0,
              y: 0,
              rotateY: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1,
              delay: index * 0.1,
              ease: direction === 2 ? "back.out(1.7)" : "power3.out",
              scrollTrigger: {
                trigger: text,
                start: "top 85%",
              }
            }
          );
        }
      });

      // Enhanced icon animations - Different entrances
      iconRefs.current.forEach((icon, index) => {
        if (icon) {
          const style = index % 5;
          let fromProps = {};
          
          switch(style) {
            case 0: // Scale up with rotation
              fromProps = { scale: 0, rotate: -180, opacity: 0 };
              break;
            case 1: // Drop from top
              fromProps = { y: -100, scale: 0.5, opacity: 0 };
              break;
            case 2: // Bounce from bottom
              fromProps = { y: 100, scale: 0.5, opacity: 0 };
              break;
            case 3: // Flip in
              fromProps = { rotateX: 180, scale: 0, opacity: 0 };
              break;
            case 4: // Pulse in
              fromProps = { scale: 0, opacity: 0 };
              break;
          }

          gsap.fromTo(
            icon,
            fromProps,
            {
              x: 0,
              y: 0,
              scale: 1,
              rotate: 0,
              rotateX: 0,
              opacity: 1,
              duration: 0.9,
              delay: index * 0.08,
              ease: style === 2 ? "bounce.out" : 
                     style === 3 ? "back.out(2.5)" : 
                     "power3.out",
              scrollTrigger: {
                trigger: icon,
                start: "top 90%",
              }
            }
          );
        }
      });

      // Card animations
      cardRefs.current.forEach((card, index) => {
        if (card) {
          const style = index % 4;
          let fromProps = {};
          
          switch(style) {
            case 0: // Slide from left with fade
              fromProps = { x: -100, y: 20, opacity: 0, scale: 0.95 };
              break;
            case 1: // Slide from right with fade
              fromProps = { x: 100, y: 20, opacity: 0, scale: 0.95 };
              break;
            case 2: // Pop up from bottom
              fromProps = { y: 60, opacity: 0, scale: 0.9 };
              break;
            case 3: // Zoom in
              fromProps = { scale: 0.8, opacity: 0, rotate: -5 };
              break;
          }

          gsap.fromTo(
            card,
            fromProps,
            {
              x: 0,
              y: 0,
              scale: 1,
              rotate: 0,
              opacity: 1,
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

      // Story section animations
      const storyElements = document.querySelectorAll('.story-element');
      storyElements.forEach((element, index) => {
        const style = index % 3;
        let fromProps = {};
        
        switch(style) {
          case 0: // Slide from left
            fromProps = { x: -80, opacity: 0, scale: 0.9 };
            break;
          case 1: // Slide from right
            fromProps = { x: 80, opacity: 0, scale: 0.9 };
            break;
          case 2: // Fade up
            fromProps = { y: 40, opacity: 0, scale: 0.95 };
            break;
        }

        gsap.fromTo(
          element,
          fromProps,
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.9,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
            }
          }
        );
      });

      // FAQ items animation
      const faqItems = document.querySelectorAll('.faq-item');
      faqItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { 
            y: 40, 
            opacity: 0,
            scale: 0.98
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
            }
          }
        );
      });

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Auto-play for pillars slider
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        setCurrentPillarIndex((prev) => (prev + 1) % aboutCards.length);
      }, 3000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoPlaying, aboutCards.length]);

  // Story navigation
  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStoryIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  // Pillars navigation
  const nextPillar = () => {
    setCurrentPillarIndex((prev) => (prev + 1) % aboutCards.length);
  };

  const prevPillar = () => {
    setCurrentPillarIndex((prev) => (prev - 1 + aboutCards.length) % aboutCards.length);
  };

  // Toggle auto-play
  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // FAQ toggle
  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  // Handle contact button click
  const handleContactClick = () => {
    // You can add functionality here like scrolling to a contact section or opening a modal
    alert("Contact button clicked! This would typically navigate to a contact page or open a contact form.");
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-black text-white overflow-hidden"
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
          src="https://images.pexels.com/photos/31056502/pexels-photo-31056502.jpeg"
          alt="College Campus"
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80"></div>
        
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
            <div className="story-element">
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

      {/* Mission & Vision Section - White Background */}
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
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                    Our Mission
                  </h3>
                </div>
              </div>

              <div
                ref={addToTextRefs}
                className="space-y-6"
              >
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  {mission}
                </p>
              </div>

              {/* Key Focus Areas - List Style */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                  <FaCheckCircle className="text-[#10B981]" />
                  Key Focus Areas
                </h4>

                <div className="space-y-4">
                  {[
                    "Academic Excellence",
                    "Student Success",
                    "Industry Relevance",
                    "Community Impact"
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 group hover:bg-gray-50 p-3 rounded-lg transition-colors"
                    >
                      <div className="mt-1.5">
                        <FaArrowRight className="text-[#10B981] group-hover:translate-x-1 transition-transform" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="space-y-8">
              <div className="flex items-center gap-6 mb-8">
                <div
                  ref={addToIconRefs}
                  className="w-16 h-16 rounded-full bg-gray-900 border border-[#10B981]/30 flex items-center justify-center"
                >
                  <FaRocket className="text-white text-2xl" />
                </div>

                <div
                  ref={addToHeadingRefs}
                  className="overflow-hidden"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                    Our Vision
                  </h3>
                </div>
              </div>

              <div
                ref={addToTextRefs}
                className="space-y-6"
              >
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  {vision}
                </p>
              </div>

              {/* Our Approach - List Style */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                  <FaChalkboardTeacher className="text-[#10B981]" />
                  Our Approach
                </h4>

                <div className="space-y-4">
                  {[
                    "Blended Learning Model",
                    "Industry-Aligned Curriculum",
                    "Practical Skill Development",
                    "Personalized Mentorship"
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 group hover:bg-gray-50 p-3 rounded-lg transition-colors"
                    >
                      <FaCheckCircle className="text-[#10B981] flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Why Choose Us Section - White Background */}
     <div className="py-20 md:py-28 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Heading */}
    <div className="text-center mb-16">
      <div ref={addToHeadingRefs} className="overflow-hidden mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          Why Choose
          <span className="block bg-gradient-to-r from-[#10B981] to-[#34D399] bg-clip-text text-transparent">
            Excel College?
          </span>
        </h2>
      </div>

      <div ref={addToTextRefs} className="overflow-hidden max-w-2xl mx-auto">
        <p className="text-lg text-gray-700 leading-relaxed">
          Discover what sets us apart and makes us the preferred choice for quality education.
        </p>
      </div>
    </div>

    {/* Why Choose Us Big Card with Equal Height */}
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div 
        ref={addToCardRefs}
        className="p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-xl"
      >
        <div className="md:flex md:items-stretch gap-8">
          {/* Image */}
          <div className="flex-1 overflow-hidden rounded-2xl shadow-lg">
            <img
              src="/template3.jpg"
              alt="Why Choose Excel College"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Points List */}
          <div className="flex-1 flex flex-col justify-center space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-center md:text-left">
              Why Choose Us
            </h2>

            {whyChooseUs.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.id} 
                  className="faq-item flex items-start gap-6"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#10B981] to-[#34D399] flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110">
                      <Icon className="text-white text-2xl" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-semibold text-black">{item.title}</h3>
                      <span className="text-sm text-gray-400 font-mono">#{item.id}</span>
                    </div>
                    <p className="text-black leading-relaxed">{item.description}</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 self-center transition-transform duration-300 hover:translate-x-1">
                    <FaArrowRight className="text-[#10B981] text-lg" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>

    {/* Highlights Section */}
    <div className="mt-20 pt-12 border-t border-gray-200">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
        Core Features
      </h3>

      <div className="flex flex-col md:flex-row md:flex-wrap gap-6 justify-center max-w-5xl mx-auto">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3 rounded-lg transition-colors duration-300 hover:bg-[#10B981]/10"
          >
            <div className="w-10 h-10 flex items-center justify-center text-[#10B981]">
              <BsCaretRightFill className="text-xl" />
            </div>
            <span className="text-gray-800 font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>


      {/* Pillars Section - Black Background with Left/Right Slider */}
      <div className="py-20 md:py-28 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div ref={addToHeadingRefs} className="overflow-hidden mb-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Our Core{' '}
                <span className="bg-gradient-to-r from-[#10B981] to-[#34D399] bg-clip-text text-transparent">
                  Pillars
                </span>
              </h2>
            </div>

            <div ref={addToTextRefs} className="overflow-hidden max-w-2xl mx-auto">
              <p className="text-lg text-gray-300">
                The foundational principles that guide our educational philosophy and operations
              </p>
            </div>
          </div>

          {/* Pillars Slider Container */}
          <div className="relative">
            {/* Auto-play control */}
            <div className="flex justify-center mb-6">
              <button
                onClick={toggleAutoPlay}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isAutoPlaying 
                    ? 'bg-[#10B981] text-white' 
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {isAutoPlaying ? '⏸️ ' : '▶️ '}
              </button>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevPillar}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
            >
              <FaChevronLeft className="h-5 w-5 text-white" />
            </button>

            <button
              onClick={nextPillar}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
            >
              <FaChevronRight className="h-5 w-5 text-white" />
            </button>

            {/* Active Pillar Display */}
            <div 
              ref={pillarsSliderRef}
              className="mx-auto max-w-4xl"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Pillar Icon & Number */}
                  <div className="text-center">
                    <div className="mb-8">
                      <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${aboutCards[currentPillarIndex].color} flex items-center justify-center mx-auto`}>
                        {React.createElement(aboutCards[currentPillarIndex].icon, {
                          className: "text-white text-5xl"
                        })}
                      </div>
                    </div>
                    
                    <div className="text-8xl font-bold bg-gradient-to-br from-[#10B981] to-[#34D399] bg-clip-text text-transparent mb-4">
                      0{aboutCards[currentPillarIndex].id}
                    </div>
                    <div className="text-white/60 text-sm uppercase tracking-wider">Pillar</div>
                  </div>

                  {/* Pillar Content */}
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                      {aboutCards[currentPillarIndex].title}
                    </h3>
                    <p className="text-lg text-gray-300 leading-relaxed mb-8">
                      {aboutCards[currentPillarIndex].description}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#10B981] to-[#34D399] flex items-center justify-center">
                        <FaStar className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-[#10B981] font-medium">Core Principle</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillars Indicators */}
            <div className="flex justify-center gap-4 mt-10">
              {aboutCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPillarIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentPillarIndex
                      ? 'w-12 bg-gradient-to-r from-[#10B981] to-[#34D399]'
                      : 'w-4 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Continuous Scrolling Pillars (Left to Right) */}
            <div className="mt-16 overflow-hidden relative">
              <div className="py-6">
                <div className="flex animate-scroll">
                  {[...aboutCards, ...aboutCards, ...aboutCards].map((pillar, index) => (
                    <div
                      key={`${pillar.id}-${index}`}
                      className="flex-shrink-0 mx-2"
                    >
                      <div className="w-48 h-48 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 flex flex-col items-center justify-center hover:border-[#10B981]/30 transition-all duration-300">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-4`}>
                          {React.createElement(pillar.icon, {
                            className: "text-white text-2xl"
                          })}
                        </div>
                        <h4 className="text-white font-semibold text-center text-sm mb-2">
                          {pillar.title.split(' ')[0]}
                        </h4>
                        <span className="text-xs text-white/60">0{pillar.id}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none" />
            </div>

            {/* All Pillars List (Compact) */}
 <div className="mt-12 pt-8 bg-gray-800 rounded-3xl p-6">
  <h4 className="text-xl font-semibold text-white mb-6 text-center">
    All Pillars
  </h4>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
    {aboutCards.map((pillar, index) => (
      <div
        key={pillar.id}
        onClick={() => setCurrentPillarIndex(index)}
        className="flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105"
      >
        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-2`}
        >
          {React.createElement(pillar.icon, { className: "text-white text-lg" })}
        </div>

        {/* Pillar Number */}
        <span className="text-sm text-white font-medium">0{pillar.id}</span>

        {/* Pillar Short Title */}
        <span className="text-xs text-gray-300 mt-1 text-center">{pillar.title.split(' ')[0]}</span>

        {/* Arrow indicator for selected */}
        {index === currentPillarIndex && (
          <FaArrowDown className="mt-2 text-[#10B981] animate-bounce" />
        )}
      </div>
    ))}
  </div>
</div>



          </div>
        </div>
      </div>

      {/* FAQ Section - White Background */}
      <div className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>

            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Find answers to common questions about Excel College
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="faq-item border-b border-gray-200 last:border-b-0 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#10B981] to-[#34D399] flex items-center justify-center">
                      <span className="text-white font-bold">Q{faq.id}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`transition-transform duration-300 ${
                      openFaq === faq.id ? "rotate-180" : ""
                    }`}
                  >
                    {openFaq === faq.id ? (
                      <FaChevronUp className="text-[#10B981] text-xl" />
                    ) : (
                      <FaChevronDown className="text-gray-400 text-xl" />
                    )}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === faq.id ? "max-h-96 pb-6" : "max-h-0"
                  }`}
                >
                  <div className="pl-14">
                    <div className="flex items-start gap-4">
                      <FaArrowRight className="text-[#10B981] mt-1 flex-shrink-0" />
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA Button - Black Background */}
      <div className="py-20 md:py-28 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Begin{' '}
                <span className="bg-gradient-to-r from-[#10B981] to-[#34D399] bg-clip-text text-transparent">
                  Your Journey?
                </span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Take the first step towards your educational success with Excel College
              </p>
            </div>

            <button
              onClick={handleContactClick}
              className="group relative inline-flex items-center justify-center gap-4 px-16 py-6 text-black font-bold text-xl rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#10B981]"></div>

              {/* Shimmer Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-white/40 transition-all duration-300"></div>

              {/* Content */}
              <span className="relative z-10 text-lg text-white">Contact Now</span>
              <FaArrowRight className="relative z-10 group-hover:translate-x-3 transition-transform duration-300 text-white text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 1rem));
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
          display: flex;
          width: max-content;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
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

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          .animate-scroll,
          .animate-shimmer {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;