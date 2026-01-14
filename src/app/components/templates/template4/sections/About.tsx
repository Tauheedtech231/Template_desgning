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
  FaQuoteLeft, FaSeedling, FaCompass, FaMountain, FaUsersCog,
  FaLeaf, FaBrain, FaHeartbeat, FaBalanceScale
} from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const storyHeadingRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const philosophyHeadingRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesHeadingRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);
  const approachHeadingRef = useRef<HTMLDivElement>(null);
  const approachImageRef = useRef<HTMLDivElement>(null);
  const approachTextRef = useRef<HTMLDivElement>(null);
  const imageTextRef = useRef<HTMLDivElement>(null);
  const whyChooseUsRef = useRef<HTMLDivElement>(null);
  const whyChooseHeadingRef = useRef<HTMLDivElement>(null);
  const whyChooseCardsRef = useRef<HTMLDivElement>(null);
  const whyChooseCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const storyParagraphsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Image URLs
  const images = {
    heroImage: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    philosophyImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    learningImage: "https://media.istockphoto.com/id/2162068738/photo/class-at-university.jpg?s=2048x2048&w=is&k=20&c=fSck5eYGgQwzKDf0mtb27ArRq_Q3Wme4XkL7Ut1KDZw="
  };

  // Updated data
  const aboutData = {
    name: "Institution",
    tagline: "Where thoughtful education shapes meaningful futures",
    shortDescription: "For more than a decade, we've quietly cultivated an environment where education transcends routine learning—where students discover not just knowledge, but purpose.",
    mission: "To nurture curious minds through education that values depth over breadth, understanding over memorization, and personal growth alongside academic achievement. We believe meaningful learning happens when theory meets practice, and when questions are valued as much as answers.",
    vision: "We envision a learning community where education adapts to human needs, not institutional requirements—where graduates leave not just with degrees, but with the clarity and confidence to contribute meaningfully to their world.",
    establishedYear: "2010",
    story: [
      "What began as a modest initiative with three classrooms has gradually evolved into a respected learning community. The growth wasn't strategic, but organic—responding to real needs rather than following predetermined plans.",
      "Along the way, we've learned that meaningful education isn't about scaling rapidly, but about deepening connections—between students and mentors, between disciplines, and between learning and lived experience.",
      "The classrooms have expanded, the curriculum has evolved, but the core intention remains unchanged: to create spaces where learning feels relevant, rigorous, and remarkably human."
    ],
    philosophy: {
      heading: "Our educational philosophy is simple but deliberate:",
      points: [
        "Learning should feel like discovery, not consumption",
        "Depth in a few areas matters more than surface exposure to many",
        "Practical application grounds theoretical understanding",
        "Mentorship amplifies independent learning"
      ]
    },
    values: [
      {
        id: 1,
        title: "Thoughtful Engagement",
        description: "We prioritize meaningful dialogue over passive reception, creating spaces where ideas are examined, not just exchanged.",
        icon: FaCompass
      },
      {
        id: 2,
        title: "Practical Wisdom",
        description: "Knowledge finds its worth in application. We connect classroom learning to real-world contexts from day one.",
        icon: FaSeedling
      },
      {
        id: 3,
        title: "Individual Attention",
        description: "Recognizing that learning journeys are personal, we maintain small cohorts and close faculty-student relationships.",
        icon: FaUsersCog
      },
      {
        id: 4,
        title: "Sustainable Growth",
        description: "We measure success not in quarterly metrics, but in long-term impact on students' lives and communities.",
        icon: FaMountain
      },
    ],
    approach: {
      heading: "How we approach education",
      description: "Rather than following trends, we've developed approaches that align with how people actually learn—varied, contextual, and deeply personal.",
      aspects: [
        {
          title: "Blended rhythm",
          description: "Alternating intensive study with reflective practice, acknowledging that learning needs both focus and integration time."
        },
        {
          title: "Contextual projects",
          description: "Assignments rooted in actual challenges, often in partnership with local organizations and communities."
        },
        {
          title: "Iterative feedback",
          description: "Continuous, constructive dialogue rather than periodic evaluations—feedback as conversation, not judgment."
        },
        {
          title: "Cross-disciplinary threads",
          description: "Connecting concepts across traditional boundaries, reflecting how real problems and solutions intersect."
        }
      ]
    },
    whyChooseUs: {
      intro: "While many institutions promise results, we focus on the journey—the subtle but significant differences in how education feels day to day.",
      points: [
        {
          title: "Faculty who prioritize presence",
          description: "Our instructors are chosen not just for expertise, but for their ability to listen, adapt, and mentor. They're educators first, experts second.",
          icon: FaChalkboardTeacher
        },
        {
          title: "Curriculum with breathing room",
          description: "We design programs that allow for depth and reflection, not just content coverage. Space to think is built into the schedule.",
          icon: FaLeaf
        },
        {
          title: "Assessment as dialogue",
          description: "Feedback comes through conversation, not just grades. We focus on growth patterns, not point-in-time performance.",
          icon: FaBrain
        },
        {
          title: "Community as curriculum",
          description: "Learning happens in relationship. We intentionally cultivate diverse cohorts where peers learn from each other's perspectives.",
          icon: FaHeartbeat
        },
        {
          title: "Ethical integration",
          description: "Every subject includes consideration of impact and ethics. We prepare students to navigate complex, real-world dilemmas.",
          icon: FaBalanceScale
        },
        {
          title: "Long-term partnership",
          description: "Our relationship doesn't end at graduation. Alumni remain part of our community with ongoing access to resources and networking.",
          icon: FaHandshake
        }
      ]
    }
  };

  // Extract data
  const instituteName = aboutData.name;
  const tagline = aboutData.tagline;
  const description = aboutData.shortDescription;
  const mission = aboutData.mission;
  const vision = aboutData.vision;
  const establishedYear = aboutData.establishedYear;
  const story = aboutData.story;
  const philosophy = aboutData.philosophy;
  const values = aboutData.values;
  const approach = aboutData.approach;
  const whyChooseUs = aboutData.whyChooseUs;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (typeof window === "undefined") return;

      // Smooth scroll trigger defaults
      ScrollTrigger.defaults({
        toggleActions: "play none none reverse",
        start: "top 85%",
        end: "bottom 20%",
        scrub: false,
        markers: false,
      });

      // Intro text animation
      if (introTextRef.current) {
        const elements = introTextRef.current.children;
        gsap.fromTo(
          elements,
          { 
            opacity: 0,
            y: 80,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: introTextRef.current,
              start: "top 90%",
            }
          }
        );
      }

      // Story heading
      if (storyHeadingRef.current) {
        gsap.fromTo(
          storyHeadingRef.current,
          {
            opacity: 0,
            x: -60,
            y: 20,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: storyHeadingRef.current,
            }
          }
        );
      }

      // Story paragraphs
      storyParagraphsRef.current.forEach((para, index) => {
        if (para) {
          gsap.fromTo(
            para,
            {
              opacity: 0,
              y: 40,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: para,
                start: "top 90%",
              }
            }
          );
        }
      });

      // Mission and Vision cards
      if (missionRef.current) {
        gsap.fromTo(
          missionRef.current,
          {
            opacity: 0,
            x: -50,
            y: 30,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: missionRef.current,
            }
          }
        );
      }

      if (visionRef.current) {
        gsap.fromTo(
          visionRef.current,
          {
            opacity: 0,
            x: 50,
            y: 30,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: visionRef.current,
            }
          }
        );
      }

      // Philosophy section
      if (philosophyHeadingRef.current) {
        gsap.fromTo(
          philosophyHeadingRef.current,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: philosophyHeadingRef.current,
            }
          }
        );
      }

      if (philosophyRef.current) {
        const points = philosophyRef.current.querySelectorAll('.philosophy-point');
        gsap.fromTo(
          points,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: philosophyRef.current,
            }
          }
        );
      }

      // Why Choose Us heading - Soft float up
      if (whyChooseHeadingRef.current) {
        gsap.fromTo(
          whyChooseHeadingRef.current,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: whyChooseHeadingRef.current,
              start: "top 90%",
            }
          }
        );
      }

      // Why Choose Us cards - Smooth upward animation from bottom
      whyChooseCardRefs.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 100, // Start from further below
            scale: 0.9,
            rotationX: 10,
            transformOrigin: "center bottom"
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1,
            delay: index * 0.1, // Staggered delay
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Values section
      if (valuesHeadingRef.current) {
        gsap.fromTo(
          valuesHeadingRef.current,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: valuesHeadingRef.current,
            }
          }
        );
      }

      if (valuesRef.current) {
        const valueItems = valuesRef.current.querySelectorAll('.value-item');
        gsap.fromTo(
          valueItems,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: valuesRef.current,
            }
          }
        );
      }

      // Approach section - Image from left, text from right
      if (approachHeadingRef.current) {
        gsap.fromTo(
          approachHeadingRef.current,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: approachHeadingRef.current,
            }
          }
        );
      }

      // Image from left
      if (approachImageRef.current) {
        gsap.fromTo(
          approachImageRef.current,
          {
            opacity: 0,
            x: -100,
            filter: "blur(10px)",
            scale: 0.9
          },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: approachImageRef.current,
              start: "top 85%",
            }
          }
        );
      }

      // Text from right
      if (approachTextRef.current) {
        gsap.fromTo(
          approachTextRef.current,
          {
            opacity: 0,
            x: 100,
            filter: "blur(10px)",
            scale: 0.9
          },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: approachTextRef.current,
              start: "top 85%",
            }
          }
        );
      }

      // Image text
      if (imageTextRef.current) {
        gsap.fromTo(
          imageTextRef.current,
          {
            opacity: 0,
            y: 80,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageTextRef.current,
              start: "top 85%",
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
      className="relative bg-gradient-to-b from-slate-50 to-white overflow-hidden font-sans"
    >
      {/* Parallax background elements */}
      <div className="parallax-bg floating-element absolute top-0 left-0 w-1/2 h-96 bg-gradient-to-br from-slate-100/30 to-gray-100/30 rounded-full blur-3xl -translate-x-1/4 -translate-y-1/4 -z-10"></div>
      <div className="parallax-bg floating-element absolute bottom-0 right-0 w-1/2 h-96 bg-gradient-to-tl from-slate-100/30 to-gray-100/30 rounded-full blur-3xl translate-x-1/4 translate-y-1/4 -z-10"></div>

      {/* Introduction Section */}
      <div className="relative pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <div ref={introTextRef} className="text-center">
            {/* Decorative element */}
            <div className="flex justify-center items-center gap-3 mb-8">
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
              <div className="text-[13px] text-teal-600 font-medium tracking-[0.3em] uppercase">
                About us
              </div>
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
            </div>
            
            {/* Main heading */}
            <h1 className="text-[36px] md:text-[42px] font-bold tracking-tight text-teal-600 mb-6 leading-[1.1]">
              Our Purpose & Perspective
            </h1>
            
            {/* Tagline */}
            <div className="mb-10">
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-full text-[15px] text-slate-700 font-medium mb-6 shadow-sm">
                {tagline}
              </div>
              <p className="text-[17px] text-slate-700 leading-[1.7] max-w-2xl mx-auto">
                {description}
              </p>
            </div>

            {/* Established year */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="text-[13px] text-slate-500">
                Cultivating learning since <span className="text-slate-700 font-semibold">{establishedYear}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Hero Video Section */}
      <div className="relative w-full h-[300px] md:h-[350px] overflow-hidden rounded-2xl">
        {/* Background Video */}
        <video
          src="/data/about2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/50 to-transparent"></div>

        {/* Text Overlay */}
        <div 
          ref={imageTextRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center max-w-2xl px-6">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="w-6 h-px bg-white/80"></div>
                <div className="w-2 h-2 border border-white/80 rounded-full"></div>
                <div className="w-6 h-px bg-white/80"></div>
              </div>
              <h3 className="text-2xl md:text-[32px] font-bold text-white mb-4 leading-tight">
                Learning as a Human Experience
              </h3>
              <p className="text-base text-white/95 max-w-lg mx-auto leading-relaxed">
                Not just acquiring knowledge, but understanding context, developing perspective, and finding ones place in complex systems.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="relative bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-20">
          <div ref={storyRef} className="mb-24">
            <div className="mb-12" ref={storyHeadingRef}>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-600 to-gray-700 flex items-center justify-center shadow-md">
                  <FaBookOpen className="text-teal-400 text-sm" />
                </div>
                <h2 className="text-[28px] md:text-[32px] font-bold text-teal-600 leading-tight">
                  How we arrived here, and why it matters
                </h2>
              </div>
            </div>

            <div className="space-y-10 sm:space-y-12">
              {story.map((paragraph, index) => (
                <div
                  key={index}
                  ref={(el) => { storyParagraphsRef.current[index] = el; }}
                  className="story-paragraph group relative"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    {/* Step Indicator */}
                    <div className="shrink-0">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-slate-100 to-gray-100 flex items-center justify-center border border-slate-200 group-hover:from-slate-200 group-hover:to-gray-200 transition-all duration-300">
                        <span className="text-xs sm:text-sm font-semibold text-slate-600">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1">
                      <p className="text-[15.5px] sm:text-[17px] text-slate-700 leading-relaxed border-l-2 border-slate-100 pl-5 sm:pl-6 py-1">
                        {paragraph}
                      </p>

                      {/* Decorative Divider */}
                      {index < story.length - 1 && (
                        <div className="mt-6">
                          <div className="w-14 h-px bg-gradient-to-r from-slate-200 via-slate-100 to-transparent"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-20">
            {/* Mission */}
            <div
              ref={missionRef}
              className="hover-card group bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-600 to-gray-700 flex items-center justify-center shadow-md">
                  <FaBullseye className="text-teal-400 text-lg" />
                </div>
                <h3 className="text-xl sm:text-[22px] font-bold text-teal-600">
                  Our Intention
                </h3>
              </div>

              {/* Content */}
              <p className="mt-5 text-[15px] sm:text-[16px] text-slate-700 leading-relaxed">
                {mission}
              </p>

              {/* Focus Areas */}
              <div className="mt-8">
                <div className="text-sm font-semibold text-slate-600 mb-4">
                  Focus areas
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Academic depth",
                    "Practical relevance",
                    "Personal growth",
                    "Community contribution",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-slate-200 transition-all group-hover:border-slate-300"
                    >
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-slate-600 to-gray-700" />
                      <span className="text-[14.5px] text-slate-700 font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vision */}
            <div
              ref={visionRef}
              className="hover-card group bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-600 to-slate-700 flex items-center justify-center shadow-md">
                  <FaRocket className="text-teal-400 text-lg" />
                </div>
                <h3 className="text-xl sm:text-[22px] font-bold text-teal-600">
                  Looking Ahead
                </h3>
              </div>

              {/* Content */}
              <p className="mt-5 text-[15px] sm:text-[16px] text-slate-700 leading-relaxed">
                {vision}
              </p>

              {/* Direction */}
              <div className="mt-8">
                <div className="text-sm font-semibold text-gray-600 mb-4">
                  Our direction
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Adaptive learning",
                    "Real-world impact",
                    "Sustainable growth",
                    "Human-centered design",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-200 transition-all group-hover:border-gray-300"
                    >
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-gray-600 to-slate-700" />
                      <span className="text-[14.5px] text-slate-700 font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="mb-20 sm:mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              {/* Left Content */}
              <div ref={philosophyRef} className="space-y-8">
                {/* Heading */}
                <div ref={philosophyHeadingRef} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-800 to-gray-900 flex items-center justify-center shadow-md">
                    <FaLightbulb className="text-teal-300 text-lg" />
                  </div>
                  <h2 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-teal-600 leading-tight">
                    {philosophy.heading}
                  </h2>
                </div>

                {/* Philosophy Points */}
                <div className="space-y-4">
                  {philosophy.points.map((point, index) => (
                    <div
                      key={index}
                      className="philosophy-point hover-card group flex items-start gap-4 p-5 bg-white border border-slate-200 rounded-2xl transition-all duration-300 hover:border-slate-300 hover:shadow-lg"
                    >
                      <div className="shrink-0 mt-1">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                          <span className="text-sm font-semibold text-slate-700">
                            {index + 1}
                          </span>
                        </div>
                      </div>

                      <p className="text-[15.5px] sm:text-[16px] text-slate-700 leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Video */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <video
                  src="/data/about1.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-[260px] sm:h-[320px] lg:h-[420px] object-cover rounded-3xl"
                />

                {/* Floating Accent */}
                <div className="floating-element absolute -bottom-5 -right-5 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-slate-700 to-gray-800 flex items-center justify-center shadow-xl">
                  <FaGraduationCap className="text-white text-xl sm:text-2xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-20 sm:mb-24">
            {/* Section Heading */}
            <div ref={whyChooseHeadingRef} className="text-center mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-slate-700 to-gray-800 flex items-center justify-center shadow-md">
                  <FaStar className="text-teal-400 text-sm" />
                </div>
                <h2 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-teal-600">
                  Why Choose Us
                </h2>
              </div>

              <p className="text-[15.5px] sm:text-[17px] text-slate-600 max-w-xl mx-auto leading-relaxed italic">
                {whyChooseUs.intro}
              </p>
            </div>

            {/* Cards */}
            <div
              ref={whyChooseCardsRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {whyChooseUs.points.map((point, index) => {
                const Icon = point.icon;

                return (
                  <div 
                    key={index} 
                    ref={el => { whyChooseCardRefs.current[index] = el; }}
                    className="why-choose-card-container relative"
                  >
                    <div className="why-choose-card relative h-full bg-gradient-to-b from-white to-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                      {/* Hover border effect */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-teal-500/20 rounded-3xl transition-all duration-500"></div>
                      
                      {/* Animated background effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Bottom border animation */}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500 group-hover:w-full transition-all duration-500 ease-out"></div>

                      {/* Icon */}
                      <div className="mb-5 relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-teal-200 group-hover:shadow-lg">
                          <Icon className="text-slate-600 text-xl transition-all duration-300 group-hover:text-teal-600" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-[17.5px] font-semibold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors relative z-10">
                        {point.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[14.5px] sm:text-[15px] text-slate-600 leading-relaxed mb-6 group-hover:text-slate-700 transition-colors relative z-10">
                        {point.description}
                      </p>

                      {/* Footer */}
                      <div className="mt-auto pt-4 border-t border-slate-200/60 flex items-center justify-between relative z-10">
                        <span className="text-xs text-slate-500 font-medium group-hover:text-teal-600 transition-colors">
                          Feature {index + 1}
                        </span>

                        <div className="flex items-center gap-2">
                          <div className="w-6 h-[3px] bg-slate-300 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-r from-slate-400 to-gray-400 group-hover:from-teal-500 group-hover:to-teal-400 transition-all duration-500 transform -translate-x-full group-hover:translate-x-0"></div>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-teal-500 transition-all duration-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20 sm:mb-24">
            {/* Section Heading */}
            <div ref={valuesHeadingRef} className="text-center mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-slate-700 to-gray-800 flex items-center justify-center shadow-md">
                  <FaShieldAlt className="text-teal-400 text-sm" />
                </div>
                <h2 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-teal-600">
                  The principles that guide our choices
                </h2>
              </div>

              <p className="text-[15.5px] sm:text-[16px] text-slate-600 max-w-xl mx-auto leading-relaxed">
                These are not just words on a wall — they are the criteria we use when making decisions, big and small.
              </p>
            </div>

            {/* Values Grid */}
            <div ref={valuesRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {values.map((value) => {
                const Icon = value.icon;

                return (
                  <div key={value.id} className="group">
                    <div className="value-item relative flex items-start gap-5 p-6 bg-gradient-to-b from-white to-slate-50 rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 hover:border-slate-300">
                      {/* Icon */}
                      <div className="shrink-0">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-teal-200">
                          <Icon className="text-slate-600 text-xl transition-all duration-300 group-hover:text-teal-600" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-[17.5px] font-semibold text-slate-900 group-hover:text-slate-800 transition-colors">
                            {value.title}
                          </h3>
                          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md group-hover:bg-teal-100 group-hover:text-teal-700 transition-colors">
                            0{value.id}
                          </span>
                        </div>

                        <p className="text-[14.5px] sm:text-[15px] text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* How We Approach Education Section - Improved Animation */}
          <section
            ref={approachRef}
            className="relative bg-slate-50 py-16 sm:py-20 lg:py-24 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-5 sm:px-6">
              <div ref={approachHeadingRef} className="text-center mb-12 sm:mb-16">
                <h2 className="text-[26px] sm:text-[30px] lg:text-[34px] font-bold text-teal-600 leading-snug">
                  How We Approach Education
                </h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Image - Animated from left */}
                <div ref={approachImageRef} className="relative order-2 lg:order-1">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={images.learningImage}
                      alt="Learning Environment"
                      className="w-full h-[260px] sm:h-[340px] lg:h-[420px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Floating decoration */}
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-slate-700 to-gray-800 flex items-center justify-center shadow-xl">
                      <FaGraduationCap className="text-white text-xl" />
                    </div>
                  </div>
                </div>

                {/* Text - Animated from right */}
                <div ref={approachTextRef} className="space-y-6 sm:space-y-8 order-1 lg:order-2">
                  <p className="text-[15.5px] sm:text-[16.5px] text-slate-600 leading-relaxed max-w-xl">
                    {approach.description}
                  </p>

                  <div className="space-y-5 sm:space-y-6">
                    {approach.aspects.map((aspect, index) => (
                      <div
                        key={index}
                        className="flex gap-4 group hover:translate-x-2 transition-transform duration-300"
                      >
                        {/* Number */}
                        <div className="shrink-0">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-100 to-gray-100 flex items-center justify-center border border-slate-200 group-hover:border-teal-200 transition-all duration-300">
                            <span className="text-xs font-semibold text-slate-700 group-hover:text-teal-600">
                              {index + 1}
                            </span>
                          </div>
                        </div>

                        {/* Text */}
                        <div>
                          <h3 className="text-[16px] sm:text-[17px] font-semibold text-slate-900 mb-1 group-hover:text-slate-800 transition-colors">
                            {aspect.title}
                          </h3>
                          <p className="text-[14.5px] sm:text-[15.5px] text-slate-600 leading-relaxed max-w-lg">
                            {aspect.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-slate-50/50 to-transparent -z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-slate-50/50 to-transparent -z-10"></div>
      </div>

      {/* Add CSS animations */}
      <style jsx global>{`
        /* Why Choose Us card hover animations */
        .why-choose-card {
          transform: translateY(0);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .why-choose-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        /* Animated line effect */
        .why-choose-card .border-gradient {
          position: absolute;
          inset: 0;
          border-radius: 24px;
          padding: 2px;
          background: linear-gradient(45deg, #64748b, #475569, #64748b);
          background-size: 300% 300%;
          animation: gradientShift 3s ease infinite;
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .why-choose-card:hover .border-gradient {
          opacity: 1;
        }
        
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        /* Floating animation */
        .floating-element {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .floating-element,
          .why-choose-card,
          .value-item {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};