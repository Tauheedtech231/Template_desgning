"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaBullseye, FaRocket, FaBookOpen, FaLightbulb, 
  FaStar, FaShieldAlt, FaGraduationCap,
  FaChalkboardTeacher, FaLeaf, FaBrain,
  FaHeartbeat, FaBalanceScale, FaHandshake,
  FaCompass, FaSeedling, FaUsersCog, FaMountain
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
  const valuesRef = useRef<HTMLUListElement>(null);
  const valuesHeadingRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);
  const approachHeadingRef = useRef<HTMLDivElement>(null);
  const approachImageRef = useRef<HTMLDivElement>(null);
  const approachTextRef = useRef<HTMLDivElement>(null);
  const imageTextRef = useRef<HTMLDivElement>(null);
  const whyChooseUsRef = useRef<HTMLDivElement>(null);
  const whyChooseHeadingRef = useRef<HTMLDivElement>(null);
  const storyParagraphsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Slider refs and state
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (typeof window === "undefined") return;

      ScrollTrigger.defaults({
        toggleActions: "play none none reverse",
        start: "top 80%",
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

      // Why Choose Us heading
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
        const valueItems = valuesRef.current.querySelectorAll('li');
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

      // Approach section
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

    return () => ctx.revert();
  }, []);

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

  const {
    tagline,
    shortDescription: description,
    mission,
    vision,
    establishedYear,
    story,
    philosophy,
    values,
    approach,
    whyChooseUs
  } = aboutData;

  // Continuous right-to-left slider effect
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const animateSlider = () => {
      if (isDragging) {
        requestAnimationFrame(animateSlider);
        return;
      }

      const totalWidth = slider.scrollWidth;
      const visibleWidth = slider.clientWidth;
      
      if (slider.scrollLeft >= totalWidth - visibleWidth) {
        slider.scrollLeft = 0;
      } else {
        slider.scrollLeft += 0.5;
      }
      
      requestAnimationFrame(animateSlider);
    };

    const animationId = requestAnimationFrame(animateSlider);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isDragging]);

  // Mouse drag handlers for slider
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setScrollLeftStart(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.clientX;
    const walk = (x - dragStartX) * 2;
    sliderRef.current.scrollLeft = scrollLeftStart - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

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
      <div className="relative pt-24 pb-20 bg-white">
  <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
    <div ref={introTextRef} className="text-center">
      {/* Small Top Label */}
      <div className="flex justify-center items-center gap-3 mb-8">
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
        <div className="text-[13px] text-teal-600 font-medium tracking-widest uppercase">
          About Us
        </div>
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[48px] font-bold tracking-tight text-teal-600 mb-6 leading-snug">
        Our Purpose & Perspective
      </h1>

      {/* Tagline */}
      <div className="inline-block px-6 py-3 bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-full text-[15px] text-slate-700 font-medium shadow-sm mb-6">
        {tagline}
      </div>

      {/* Description */}
      <p className="text-[16.5px] sm:text-[17px] md:text-[18px] text-slate-700 leading-relaxed max-w-2xl mx-auto">
        {description}
      </p>

      {/* Established Year */}
      <div className="mt-14 pt-10 border-t border-slate-200">
        <div className="text-[13px] sm:text-[14px] text-slate-500">
          Cultivating learning since{" "}
          <span className="text-slate-700 font-semibold">{establishedYear}</span>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Full Width Hero Video Section */}
      <div className="relative w-full h-[300px] md:h-[350px] overflow-hidden rounded-2xl">
        <video
          src="/data/about4.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/50 to-transparent"></div>

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
                    <div className="shrink-0">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-slate-100 to-gray-100 flex items-center justify-center border border-slate-200 group-hover:from-slate-200 group-hover:to-gray-200 transition-all duration-300">
                        <span className="text-xs sm:text-sm font-semibold text-slate-600">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <p className="text-[15.5px] sm:text-[17px] text-slate-700 leading-relaxed border-l-2 border-slate-100 pl-5 sm:pl-6 py-1">
                        {paragraph}
                      </p>

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
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
  {/* Mission */}
  <div
    ref={missionRef}
    className="group bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
  >
    {/* Header */}
    <div className="flex items-center gap-4 mb-4">
      <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-600 to-gray-700 flex items-center justify-center shadow-md">
        <FaBullseye className="text-teal-400 text-lg" />
      </div>
      <h3 className="text-xl sm:text-[22px] font-bold text-teal-600">
        Our Intention
      </h3>
    </div>

    {/* Description */}
    <p className="text-[15px] sm:text-[16px] text-slate-700 leading-relaxed mb-6">
      {mission}
    </p>

    {/* Focus Areas */}
    <div>
      <div className="text-sm font-semibold text-slate-600 mb-3">
        Focus areas
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {["Academic depth", "Practical relevance", "Personal growth", "Community contribution"].map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
            <span className="text-[14.5px] text-slate-700 font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Vision */}
  <div
    ref={visionRef}
    className="group bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
  >
    {/* Header */}
    <div className="flex items-center gap-4 mb-4">
      <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-600 to-slate-700 flex items-center justify-center shadow-md">
        <FaRocket className="text-teal-400 text-lg" />
      </div>
      <h3 className="text-xl sm:text-[22px] font-bold text-teal-600">
        Looking Ahead
      </h3>
    </div>

    {/* Description */}
    <p className="text-[15px] sm:text-[16px] text-slate-700 leading-relaxed mb-6">
      {vision}
    </p>

    {/* Direction */}
    <div>
      <div className="text-sm font-semibold text-gray-600 mb-3">
        Our direction
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {["Adaptive learning", "Real-world impact", "Sustainable growth", "Human-centered design"].map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
            <span className="text-[14.5px] text-slate-700 font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>



          {/* Philosophy Section */}
        <div className="mb-20 sm:mb-24">
  {/* Centered Section Heading */}
  <div className="text-center mb-12">
    <h2 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-teal-600">
      Our Educational Philosophy
    </h2>
  </div>

  {/* Content Container */}
  <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
    <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
      {/* Left Column – Philosophy Points */}
      <div ref={philosophyRef} className="p-8 sm:p-10 lg:p-12 space-y-8">
        <ul className="space-y-5">
          {philosophy.points.map((point, index) => (
            <li key={index} className="flex items-start gap-4">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-gray-700 shrink-0" />
              <p className="text-[15.5px] sm:text-[16px] text-slate-700 leading-relaxed">
                {point}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Column – Video */}
      <div className="relative min-h-[260px] sm:min-h-[320px] lg:min-h-full">
        <video
          src="/data/about1.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        <div className="absolute bottom-6 right-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-800 flex items-center justify-center shadow-lg">
          <FaGraduationCap className="text-white text-lg sm:text-xl" />
        </div>
      </div>
    </div>
  </div>
</div>


          {/* Why Choose Us - Full Width Section with Continuous Slider */}
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#0B1220] py-20 sm:py-24 mb-20 sm:mb-24" ref={whyChooseUsRef}>
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
              <div ref={whyChooseHeadingRef} className="text-center mb-10 sm:mb-14">
                <div className="inline-flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-600/30 border border-teal-500/30 flex items-center justify-center shadow-lg">
                    <FaStar className="text-teal-400 text-sm" />
                  </div>
                  <h2 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-white">
                    Why Choose Us
                  </h2>
                </div>

                <p className="text-[15.5px] sm:text-[17px] text-white/80 max-w-xl mx-auto leading-relaxed italic">
                  {whyChooseUs.intro}
                </p>
              </div>

              {/* Continuous Slider Container */}
              <div 
                ref={sliderRef}
                className="flex overflow-x-auto scrollbar-hide whitespace-nowrap py-4"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                style={{ 
                  cursor: isDragging ? 'grabbing' : 'grab',
                  scrollBehavior: 'auto'
                }}
              >
                {/* Duplicate content for seamless looping */}
                {[...whyChooseUs.points, ...whyChooseUs.points, ...whyChooseUs.points].map((point, index) => {
                  const Icon = point.icon;
                  
                  return (
                    <div 
                      key={index}
                      className="inline-block w-[300px] sm:w-[350px] lg:w-[400px] flex-shrink-0 px-4"
                    >
                      <div className="h-full bg-gradient-to-b from-white/10 to-white/5 rounded-2xl p-6 border border-white/10 shadow-lg hover:border-teal-500/30 transition-all duration-300">
                        <div className="mb-5">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/10 border border-white/20 flex items-center justify-center">
                            <Icon className="text-white text-lg" />
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold text-white mb-3">
                          {point.title}
                        </h3>

                        <p className="text-sm text-white/80 leading-relaxed whitespace-normal">
                          {point.description}
                        </p>

                        <div className="mt-6 pt-4 border-t border-white/20">
                          <span className="text-xs text-white/60">
                            Feature {(index % whyChooseUs.points.length) + 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Instruction for users */}
              
            </div>
          </div>

          {/* Values Section - White Background */}
       <div className="w-full bg-white py-20 sm:py-24 mb-20 sm:mb-24">
  <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
    {/* Section Heading */}
    <div ref={valuesHeadingRef} className="text-center mb-10 sm:mb-14">
      <div className="inline-flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-600/30 flex items-center justify-center">
          <FaShieldAlt className="text-teal-400 text-sm" />
        </div>
        <h2 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-slate-800">
          The principles that guide our choices
        </h2>
      </div>

      <p className="text-[15.5px] sm:text-[16px] text-slate-700 max-w-xl mx-auto leading-relaxed">
        These are not just words on a wall — they are the criteria we use when making decisions, big and small.
      </p>
    </div>

    {/* List of values */}
    <ul ref={valuesRef} className="space-y-6">
      {values.map((value) => {
        const Icon = value.icon;
        return (
          <li key={value.id} className="flex items-start gap-4">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white">
                <Icon className="text-base" />
              </div>
            </div>

            {/* Text */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-slate-800">
                  {value.title}
                </h3>
                <span className="text-xs text-slate-500">
                  0{value.id}
                </span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {value.description}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  </div>
</div>


          {/* Approach Section */}
<section
  ref={approachRef}
  className="relative bg-white py-16 sm:py-20 lg:py-24 overflow-hidden rounded-3xl"
>
  <div className="max-w-7xl mx-auto px-5 sm:px-6">
    {/* Section Heading */}
    <div ref={approachHeadingRef} className="text-center mb-12 sm:mb-16">
      <h2 className="text-[26px] sm:text-[30px] lg:text-[34px] font-bold text-teal-600 leading-snug">
        How We Approach Education
      </h2>
    </div>

    {/* Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">
      
      {/* Image Column */}
      <div ref={approachImageRef} className="relative w-full flex justify-center lg:justify-end">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl w-full max-w-lg">
          <img
            src="https://media.istockphoto.com/id/2162068738/photo/class-at-university.jpg?s=2048x2048&w=is&k=20&c=fSck5eYGgQwzKDf0mtb27ArRq_Q3Wme4XkL7Ut1KDZw="
            alt="Learning Environment"
            className="w-full h-[260px] sm:h-[340px] lg:h-[420px] object-cover"
          />
          <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-slate-700 to-gray-800 flex items-center justify-center shadow-xl">
            <FaGraduationCap className="text-white text-xl" />
          </div>
        </div>
      </div>

      {/* Text Column */}
      <div ref={approachTextRef} className="space-y-6 sm:space-y-8">
        <p className="text-[15.5px] sm:text-[16.5px] text-slate-600 leading-relaxed max-w-lg">
          {approach.description}
        </p>

        <div className="space-y-5 sm:space-y-6">
          {approach.aspects.map((aspect, index) => (
            <div
              key={index}
              className="flex gap-4 items-start"
            >
              {/* Number Circle */}
              <div className="shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-gray-100 flex items-center justify-center border border-slate-200">
                  <span className="text-xs font-semibold text-slate-700">
                    {index + 1}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-[16px] sm:text-[17px] font-semibold text-slate-900 mb-1">
                  {aspect.title}
                </h3>
                <p className="text-[14.5px] sm:text-[15.5px] text-slate-600 leading-relaxed">
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

        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-slate-50/50 to-transparent -z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-slate-50/50 to-transparent -z-10"></div>
      </div>

      {/* Add CSS animations */}
      <style jsx global>{`
        /* Hide scrollbar for the slider */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};
export default About;