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
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);
  const imageTextRef = useRef<HTMLDivElement>(null);
  const whyChooseUsRef = useRef<HTMLDivElement>(null);
  const whyChooseCardsRef = useRef<HTMLDivElement>(null);

  // Image URLs - Using Unsplash education/college related images
  const images = {
    heroImage: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    philosophyImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    learningImage: "https://media.istockphoto.com/id/2162068738/photo/class-at-university.jpg?s=2048x2048&w=is&k=20&c=fSck5eYGgQwzKDf0mtb27ArRq_Q3Wme4XkL7Ut1KDZw="
  };

  // Updated data with human, storytelling tone
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
    // Initialize animations only after component mounts
    const ctx = gsap.context(() => {
      // Check if we're in a browser environment
      if (typeof window === "undefined") return;

      // Enhanced introductory text animation - slide from bottom
      if (introTextRef.current) {
        const elements = introTextRef.current.children;
        gsap.fromTo(
          elements,
          { 
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: introTextRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Story paragraphs - alternating slide animations
      if (storyRef.current) {
        const paragraphs = storyRef.current.querySelectorAll('.story-paragraph');
        paragraphs.forEach((para, index) => {
          gsap.fromTo(
            para,
            {
              opacity: 0,
              x: index % 2 === 0 ? -80 : 80, // Alternate left/right
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: para,
                start: "top 85%",
                toggleActions: "play none none reverse",
              }
            }
          );
        });
      }

      // Mission card - slide from left
      if (missionRef.current) {
        gsap.fromTo(
          missionRef.current,
          {
            opacity: 0,
            x: -100,
            rotateY: -15,
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: missionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Vision card - slide from right
      if (visionRef.current) {
        gsap.fromTo(
          visionRef.current,
          {
            opacity: 0,
            x: 100,
            rotateY: 15,
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: visionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Philosophy points - staggered slide from left
      if (philosophyRef.current) {
        const points = philosophyRef.current.querySelectorAll('.philosophy-point');
        gsap.fromTo(
          points,
          {
            opacity: 0,
            x: -50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: philosophyRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Values cards - staggered slide from right
      if (valuesRef.current) {
        const valueItems = valuesRef.current.querySelectorAll('.value-item');
        gsap.fromTo(
          valueItems,
          {
            opacity: 0,
            x: 80,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: valuesRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Why Choose Us section - slide from bottom
      if (whyChooseUsRef.current) {
        gsap.fromTo(
          whyChooseUsRef.current,
          {
            opacity: 0,
            y: 80,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: whyChooseUsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Why Choose Us cards - alternating left/right slide
      if (whyChooseCardsRef.current) {
        const cards = whyChooseCardsRef.current.querySelectorAll('.why-choose-card');
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: index % 2 === 0 ? -100 : 100,
              scale: 0.9,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse",
              }
            }
          );
        });
      }

      // Approach section - slide from left with rotation
      if (approachRef.current) {
        gsap.fromTo(
          approachRef.current,
          {
            opacity: 0,
            x: -120,
            rotateZ: -2,
          },
          {
            opacity: 1,
            x: 0,
            rotateZ: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: approachRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Image text - slide from bottom with blur
      if (imageTextRef.current) {
        gsap.fromTo(
          imageTextRef.current,
          {
            opacity: 0,
            y: 100,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageTextRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Animate all cards on hover with mouse movement
      const cards = document.querySelectorAll('.hover-card');
      cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
          // Cast to MouseEvent to access clientX and clientY
          const mouseEvent = e as MouseEvent;
          const rect = card.getBoundingClientRect();
          const x = mouseEvent.clientX - rect.left;
          const y = mouseEvent.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateY = ((x - centerX) / centerX) * 5;
          const rotateX = ((centerY - y) / centerY) * 5;
          
          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          });
        });
      });

      // Parallax effect for background elements
      gsap.utils.toArray<HTMLElement>(".parallax-bg").forEach((element) => {
        gsap.to(element, {
          y: 100,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });
      });

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
      <div className="parallax-bg absolute top-0 left-0 w-1/2 h-96 bg-gradient-to-br from-slate-100/30 to-gray-100/30 rounded-full blur-3xl -translate-x-1/4 -translate-y-1/4 -z-10"></div>
      <div className="parallax-bg absolute bottom-0 right-0 w-1/2 h-96 bg-gradient-to-tl from-slate-100/30 to-gray-100/30 rounded-full blur-3xl translate-x-1/4 translate-y-1/4 -z-10"></div>

      {/* Introduction Section */}
      <div className="relative pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <div ref={introTextRef} className="text-center">
            {/* Decorative element - subtle and organic */}
            <div className="flex justify-center items-center gap-3 mb-8">
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
              <div className="text-[13px] text-slate-600 font-medium tracking-[0.3em] uppercase">
                About us
              </div>
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
            </div>
            
            {/* Main heading with serif font */}
            <h1 className="text-[36px] md:text-[42px] font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Our Purpose & Perspective
            </h1>
            
            {/* Tagline - human, conversational */}
            <div className="mb-10">
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-full text-[15px] text-slate-700 font-medium mb-6 shadow-sm">
                {tagline}
              </div>
              <p className="text-[17px] text-slate-700 leading-[1.7] max-w-2xl mx-auto">
                {description}
              </p>
            </div>

            {/* Established year - subtle */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="text-[13px] text-slate-500">
                Cultivating learning since <span className="text-slate-700 font-semibold">{establishedYear}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Hero Image Section */}
      <div className="relative w-full h-[300px] md:h-[350px] overflow-hidden">
        <img
          src={images.heroImage}
          alt="College Campus with students studying"
          className="w-full h-full object-cover"
          loading="eager"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/50 to-transparent"></div>
        
        {/* Text Overlay - refined typography */}
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
            <div className="mb-12">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-gray-700 flex items-center justify-center">
                  <FaBookOpen className="text-white text-sm" />
                </div>
                <h2 className="text-[28px] md:text-[32px] font-bold text-slate-900 leading-tight">
                  How we arrived here, and why it matters
                </h2>
              </div>
            </div>

            <div className="space-y-8">
              {story.map((paragraph, index) => (
                <div key={index} className="story-paragraph group">
                  <div className="flex">
                    {/* Paragraph number - subtle */}
                    <div className="flex-shrink-0 w-10 mt-1">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-gray-100 flex items-center justify-center group-hover:from-slate-200 group-hover:to-gray-200 transition-all duration-300">
                        <div className="text-sm font-semibold text-slate-600">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                    <p className="text-[17px] text-slate-700 leading-[1.7] flex-1 ml-4 border-l-2 border-slate-100 pl-6 py-2">
                      {paragraph}
                    </p>
                  </div>
                  
                  {/* Decorative element between paragraphs */}
                  {index < story.length - 1 && (
                    <div className="ml-10 mt-6 mb-4">
                      <div className="w-12 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mission & Vision - side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
            {/* Mission */}
            <div ref={missionRef} className="space-y-6 hover-card bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-600 to-gray-700 flex items-center justify-center shadow-md">
                  <FaBullseye className="text-white text-lg" />
                </div>
                <h3 className="text-[22px] font-bold text-slate-900">
                  Our Intention
                </h3>
              </div>
              
              <div className="pl-16">
                <p className="text-[16px] text-slate-700 leading-[1.7]">
                  {mission}
                </p>
              </div>

              {/* Key focus - minimal list */}
              <div className="pl-16 pt-6">
                <div className="text-sm font-medium text-slate-600 mb-4">Focus areas:</div>
                <div className="grid grid-cols-2 gap-3">
                  {["Academic depth", "Practical relevance", "Personal growth", "Community contribution"].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white/80 rounded-lg p-3 border border-slate-200">
                      <div className="w-2 h-2 bg-gradient-to-r from-slate-600 to-gray-700 rounded-full"></div>
                      <span className="text-[15px] text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vision */}
            <div ref={visionRef} className="space-y-6 hover-card bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-600 to-slate-700 flex items-center justify-center shadow-md">
                  <FaRocket className="text-white text-lg" />
                </div>
                <h3 className="text-[22px] font-bold text-slate-900">
                  Looking Ahead
                </h3>
              </div>
              
              <div className="pl-16">
                <p className="text-[16px] text-slate-700 leading-[1.7]">
                  {vision}
                </p>
              </div>

              {/* Guiding principles */}
              <div className="pl-16 pt-6">
                <div className="text-sm font-medium text-gray-600 mb-4">Our direction:</div>
                <div className="grid grid-cols-2 gap-3">
                  {["Adaptive learning", "Real-world impact", "Sustainable growth", "Human-centered design"].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white/80 rounded-lg p-3 border border-gray-200">
                      <div className="w-2 h-2 bg-gradient-to-r from-gray-600 to-slate-700 rounded-full"></div>
                      <span className="text-[15px] text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Section - Image on Right, Content on Left */}
          <div ref={philosophyRef} className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                      <FaLightbulb className="text-white text-lg" />
                    </div>
                    <h2 className="text-[28px] md:text-[32px] font-bold text-slate-900">
                      {philosophy.heading}
                    </h2>
                  </div>
                </div>

                <div className="space-y-6">
                  {philosophy.points.map((point, index) => (
                    <div 
                      key={index}
                      className="philosophy-point flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                          <div className="text-sm font-bold text-slate-700">{index + 1}</div>
                        </div>
                      </div>
                      <p className="text-[16px] text-slate-700 leading-[1.6] flex-1">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Image */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={images.philosophyImage}
                    alt="Educational Philosophy - Students collaborating"
                    className="w-full h-[400px] object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-slate-600 to-gray-700 rounded-full flex items-center justify-center shadow-lg">
                  <FaGraduationCap className="text-white text-2xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Us - Rounded Curve Cards */}
          <div ref={whyChooseUsRef} className="mb-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-gray-700 flex items-center justify-center">
                  <FaStar className="text-white text-sm" />
                </div>
                <h2 className="text-[28px] md:text-[32px] font-bold text-slate-900">
                  Why Choose Us
                </h2>
              </div>
              <p className="text-[17px] text-slate-600 max-w-2xl mx-auto leading-[1.7] italic">
                {whyChooseUs.intro}
              </p>
            </div>

            <div ref={whyChooseCardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUs.points.map((point, index) => {
                const Icon = point.icon;
                return (
                  <div 
                    key={index}
                    className="why-choose-card hover-card group"
                  >
                    <div className="relative h-full">
                      {/* Rounded Curve Design */}
                      <div className="absolute -inset-2 bg-gradient-to-br from-slate-100/30 to-gray-100/30 rounded-3xl blur-sm group-hover:blur-md transition-all duration-500"></div>
                      
                      {/* Main Card with Rounded Curves */}
                      <div className="relative bg-gradient-to-b from-white to-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                        {/* Corner accent */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-slate-400/10 to-transparent rounded-tr-2xl"></div>
                        
                        <div className="flex flex-col h-full">
                          {/* Icon with rounded container */}
                          <div className="mb-5">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-slate-100 group-hover:to-gray-100 transition-all duration-300 shadow-sm">
                              <Icon className="text-slate-600 text-xl group-hover:text-slate-700 group-hover:scale-110 transition-all duration-300" />
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="text-[18px] font-semibold text-slate-900 mb-3 leading-snug">
                            {point.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-[15px] text-slate-600 leading-[1.6] flex-grow mb-4">
                            {point.description}
                          </p>

                          {/* Subtle indicator with curved design */}
                          <div className="mt-auto pt-4 border-t border-slate-200/50">
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-slate-500 font-medium">Feature {index + 1}</div>
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-1 bg-gradient-to-r from-slate-400 to-gray-400 rounded-full group-hover:w-10 transition-all duration-300"></div>
                                <div className="w-2 h-2 rounded-full bg-slate-400 group-hover:scale-125 transition-transform duration-300"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Values - minimal presentation */}
          <div ref={valuesRef} className="mb-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-gray-700 flex items-center justify-center">
                  <FaShieldAlt className="text-white text-sm" />
                </div>
                <h2 className="text-[28px] md:text-[32px] font-bold text-slate-900">
                  The principles that guide our choices
                </h2>
              </div>
              <p className="text-[16px] text-slate-600 max-w-xl mx-auto leading-relaxed">
                These are not just words on a wall—they are the criteria we use when making decisions, big and small.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.id} className="value-item hover-card group">
                    <div className="flex items-start gap-6 p-6 bg-gradient-to-b from-white to-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          <Icon className="text-slate-600 text-xl" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-[18px] font-semibold text-slate-900">
                            {value.title}
                          </h3>
                          <div className="text-sm font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded">0{value.id}</div>
                        </div>
                        <p className="text-[15px] text-slate-600 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Approach Section with Third Image */}
          <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Image */}
              <div className="relative order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={images.learningImage}
                    alt="Modern learning environment"
                    className="w-full h-[400px] object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-slate-600 to-gray-700 rounded-full flex items-center justify-center shadow-lg">
                  <FaLightbulb className="text-white text-xl" />
                </div>
              </div>

              {/* Right Content */}
              <div ref={approachRef} className="space-y-8 hover-card bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 order-1 lg:order-2">
                <div>
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-gray-700 flex items-center justify-center">
                      <FaGraduationCap className="text-white text-lg" />
                    </div>
                    <h2 className="text-[28px] md:text-[32px] font-bold text-slate-900">
                      {approach.heading}
                    </h2>
                  </div>
                  <p className="text-[16px] text-slate-600 leading-relaxed mb-8">
                    {approach.description}
                  </p>
                </div>

                <div className="space-y-6">
                  {approach.aspects.map((aspect, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-4 p-4 bg-white/80 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-100 to-gray-100 flex items-center justify-center">
                          <div className="text-sm font-bold text-slate-700">{index + 1}</div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[17px] font-semibold text-slate-900 mb-2">
                          {aspect.title}
                        </h3>
                        <p className="text-[15px] text-slate-600 leading-relaxed">
                          {aspect.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Closing element */}
          <div className="py-16 border-t border-slate-200 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
              <div className="inline-flex items-center gap-4 mb-6 hover-card">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-600 to-gray-700 flex items-center justify-center">
                  <FaShieldAlt className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Accredited Excellence</h3>
                  <p className="text-[15px] text-slate-600">
                    Accredited by the National Education Board • Committed to educational excellence since {establishedYear}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-slate-50/50 to-transparent -z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-slate-50/50 to-transparent -z-10"></div>
      </div>
    </section>
  );
};
export default About;