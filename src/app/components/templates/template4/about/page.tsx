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
  const philosophyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);
  const imageTextRef = useRef<HTMLDivElement>(null);
  const whyChooseUsRef = useRef<HTMLDivElement>(null);
  const whyChooseCardsRef = useRef<HTMLDivElement>(null);

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

      // Introductory text fade up
      if (introTextRef.current) {
        gsap.fromTo(
          introTextRef.current,
          { 
            opacity: 0,
            y: 40 
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.3
          }
        );
      }

      // Story section staggered fade
      if (storyRef.current) {
        const paragraphs = storyRef.current.querySelectorAll('.story-paragraph');
        gsap.fromTo(
          paragraphs,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: storyRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Philosophy section fade in
      if (philosophyRef.current) {
        gsap.fromTo(
          philosophyRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: philosophyRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Values staggered fade
      if (valuesRef.current) {
        const valueItems = valuesRef.current.querySelectorAll('.value-item');
        gsap.fromTo(
          valueItems,
          {
            opacity: 0,
            x: -20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: valuesRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Why Choose Us section
      if (whyChooseUsRef.current) {
        gsap.fromTo(
          whyChooseUsRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: whyChooseUsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Why Choose Us cards staggered animation
      if (whyChooseCardsRef.current) {
        const cards = whyChooseCardsRef.current.querySelectorAll('.why-choose-card');
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 20,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: whyChooseCardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Approach section fade in
      if (approachRef.current) {
        gsap.fromTo(
          approachRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: approachRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Image text animation
      if (imageTextRef.current) {
        gsap.fromTo(
          imageTextRef.current,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageTextRef.current,
              start: "top 85%",
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
      className="relative bg-[#FAFAFA] overflow-hidden font-sans"
    >
      {/* Introduction Section */}
      <div className="relative pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <div ref={introTextRef} className="text-center">
            {/* Decorative element - subtle and organic */}
            <div className="flex justify-center items-center gap-3 mb-8">
              <div className="w-10 h-px bg-[#E0E0E0]" />
              <div className="text-[13px] text-[#8A8A8A] tracking-[0.3em] uppercase">
                About us
              </div>
              <div className="w-10 h-px bg-[#E0E0E0]" />
            </div>
            
            {/* Main heading with serif font */}
            <h1 className="text-[36px] md:text-[42px] font-serif font-medium tracking-tight text-[#E86A58] mb-6 leading-[1.1]">
              Our purpose & perspective
            </h1>
            
            {/* Tagline - human, conversational */}
            <div className="mb-10">
              <div className="inline-block px-4 py-2 bg-[#FAFAFA] border border-[#EDEDED] rounded-sm text-[15px] text-[#5A5A5A] mb-6">
                {tagline}
              </div>
              <p className="text-[17px] text-[#5A5A5A] leading-[1.7] max-w-2xl mx-auto">
                {description}
              </p>
            </div>

            {/* Established year - subtle */}
            <div className="mt-12 pt-8 border-t border-[#F0F0F0]">
              <div className="text-[13px] text-[#8A8A8A]">
                Cultivating learning since <span className="text-[#1E1E1E] font-medium">{establishedYear}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Image Section with Text Overlay */}
      <div className="relative w-full h-[300px] md:h-[350px] overflow-hidden bg-[#F5F5F5]">
        <img
          src="https://media.istockphoto.com/id/2189800037/photo/university-students-studying-and-discussing-standing-on-the-steps-of-the-campus.jpg?s=1024x1024&w=is&k=20&c=pAd_InfDuWrWS6BSXsLo2ZQSxWG7QGj-F6mPWyUtJjA="
          alt="College Campus"
          className="w-full h-full object-cover opacity-90"
        />
        
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-[#1E1E1E]/30"></div>
        
        {/* Text Overlay - refined typography */}
        <div 
          ref={imageTextRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center max-w-2xl px-6">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="w-6 h-px bg-white/50"></div>
                <div className="w-2 h-2 border border-white/50 rounded-full"></div>
                <div className="w-6 h-px bg-white/50"></div>
              </div>
              <h3 className="text-2xl md:text-[32px] font-serif font-medium text-white mb-4 leading-tight tracking-tight">
                Learning as a human experience
              </h3>
              <p className="text-base text-white/85 max-w-lg mx-auto leading-relaxed">
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
              <div className="inline-block px-4 py-2 bg-[#FAFAFA] border border-[#EDEDED] rounded-sm text-[13px] text-[#8A8A8A] tracking-[0.2em] uppercase mb-6">
                Our story
              </div>
              <h2 className="text-[28px] md:text-[32px] font-serif font-medium text-[#E86A58] mb-8 leading-tight">
                How we arrived here, and why it matters
              </h2>
            </div>

            <div className="space-y-8">
              {story.map((paragraph, index) => (
                <div key={index} className="story-paragraph">
                  <div className="flex">
                    {/* Paragraph number - subtle */}
                    <div className="flex-shrink-0 w-10 mt-1">
                      <div className="text-[13px] text-[#8A8A8A] font-medium">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <p className="text-[17px] text-[#5A5A5A] leading-[1.7] flex-1">
                      {paragraph}
                    </p>
                  </div>
                  
                  {/* Decorative element between paragraphs */}
                  {index < story.length - 1 && (
                    <div className="ml-10 mt-6 mb-4">
                      <div className="w-12 h-px bg-[#F0F0F0]"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mission & Vision - side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            {/* Mission */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#FAFAFA] border border-[#EDEDED] flex items-center justify-center">
                  <FaBullseye className="text-[#1E1E1E] text-lg" />
                </div>
                <h3 className="text-[22px] font-serif font-medium text-[#1E1E1E]">
                  Our intention
                </h3>
              </div>
              
              <div className="pl-14">
                <p className="text-[16px] text-[#5A5A5A] leading-[1.7]">
                  {mission}
                </p>
              </div>

              {/* Key focus - minimal list */}
              <div className="pl-14 pt-4">
                <div className="text-[14px] text-[#8A8A8A] mb-3">Focus areas:</div>
                <div className="space-y-2">
                  {["Academic depth", "Practical relevance", "Personal growth", "Community contribution"].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-[#E86A58] rounded-full"></div>
                      <span className="text-[15px] text-[#5A5A5A]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#1E1E1E] flex items-center justify-center">
                  <FaRocket className="text-white text-lg" />
                </div>
                <h3 className="text-[22px] font-serif font-medium text-[#1E1E1E]">
                  Looking ahead
                </h3>
              </div>
              
              <div className="pl-14">
                <p className="text-[16px] text-[#5A5A5A] leading-[1.7]">
                  {vision}
                </p>
              </div>

              {/* Guiding principles */}
              <div className="pl-14 pt-4">
                <div className="text-[14px] text-[#8A8A8A] mb-3">Our direction:</div>
                <div className="space-y-2">
                  {["Adaptive learning", "Real-world impact", "Sustainable growth", "Human-centered design"].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-[#1E1E1E] rounded-full"></div>
                      <span className="text-[15px] text-[#5A5A5A]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy */}
          <div ref={philosophyRef} className="mb-24">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-block px-4 py-2 bg-[#FAFAFA] border border-[#EDEDED] rounded-sm text-[13px] text-[#8A8A8A] tracking-[0.2em] uppercase mb-6">
                  Philosophy
                </div>
                <h2 className="text-[28px] md:text-[32px] font-serif font-medium text-[#E86A58] mb-6 leading-tight">
                  {philosophy.heading}
                </h2>
              </div>

              <div className="space-y-6">
                {philosophy.points.map((point, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-[#FAFAFA] border border-[#EDEDED] rounded-sm">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-6 h-6 rounded-full bg-white border border-[#EDEDED] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-[#1E1E1E] rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-[16px] text-[#5A5A5A] leading-[1.7] flex-1">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Choose Us - Added Section */}
          <div ref={whyChooseUsRef} className="mb-24">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-[#FAFAFA] border border-[#EDEDED] rounded-sm text-[13px] text-[#8A8A8A] tracking-[0.2em] uppercase mb-6">
                The difference
              </div>
              <h2 className="text-[28px] md:text-[32px] font-serif font-medium text-[#E86A58] mb-6 leading-tight">
                Why choose 
              </h2>
              <p className="text-[17px] text-[#5A5A5A] max-w-2xl mx-auto leading-[1.7] italic">
                {whyChooseUs.intro}
              </p>
            </div>

            <div ref={whyChooseCardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUs.points.map((point, index) => {
                const Icon = point.icon;
                return (
                  <div 
                    key={index}
                    className="why-choose-card group bg-white border border-[#EDEDED] rounded-sm p-6 hover:border-[#E86A58]/30 transition-all duration-300"
                  >
                    <div className="flex flex-col h-full">
                      {/* Icon with subtle background */}
                      <div className="mb-5">
                        <div className="w-12 h-12 rounded-sm bg-[#FAFAFA] border border-[#EDEDED] flex items-center justify-center group-hover:border-[#E86A58]/30 transition-colors duration-300">
                          <Icon className="text-[#1E1E1E] text-lg" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-[18px] font-medium text-[#1E1E1E] mb-3 leading-snug">
                        {point.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-[15px] text-[#5A5A5A] leading-[1.6] flex-grow mb-4">
                        {point.description}
                      </p>

                      {/* Subtle indicator */}
                      <div className="mt-auto pt-4 border-t border-[#F0F0F0]">
                        <div className="flex items-center justify-between">
                          
                          
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
              <div className="inline-block px-4 py-2 bg-[#FAFAFA] border border-[#EDEDED] rounded-sm text-[13px] text-[#8A8A8A] tracking-[0.2em] uppercase mb-6">
                Our values
              </div>
              <h2 className="text-[28px] md:text-[32px] font-serif font-medium text-[#E86A58] mb-6 leading-tight">
                The principles that guide our choices
              </h2>
              <p className="text-[16px] text-[#5A5A5A] max-w-xl mx-auto leading-relaxed">
                These are not just words on a wall they are the criteria we use when making decisions, big and small.
              </p>
            </div>

            <div className="space-y-8">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.id} className="value-item">
                    <div className="flex flex-col md:flex-row md:items-start gap-6 p-6 bg-white border border-[#F0F0F0] rounded-sm hover:border-[#E0E0E0] transition-colors duration-300">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-sm bg-[#FAFAFA] border border-[#EDEDED] flex items-center justify-center">
                          <Icon className="text-[#1E1E1E] text-xl" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[18px] font-medium text-[#1E1E1E] mb-3">
                          {value.title}
                        </h3>
                        <p className="text-[15px] text-[#5A5A5A] leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="text-[13px] text-[#8A8A8A] font-medium">
                          0{value.id}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Approach */}
          <div ref={approachRef} className="bg-[#FAFAFA] border border-[#EDEDED] rounded-sm p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-block px-4 py-2 bg-white border border-[#EDEDED] rounded-sm text-[13px] text-[#8A8A8A] tracking-[0.2em] uppercase mb-6">
                  Approach
                </div>
                <h2 className="text-[28px] md:text-[32px] font-serif font-medium text-[#E86A58] mb-6 leading-tight">
                  {approach.heading}
                </h2>
                <p className="text-[16px] text-[#5A5A5A] max-w-xl mx-auto leading-relaxed">
                  {approach.description}
                </p>
              </div>

              <div className="space-y-8">
                {approach.aspects.map((aspect, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-6 pb-8 border-b border-[#F0F0F0] last:border-0 last:pb-0">
                    <div className="flex-shrink-0 md:w-40">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-px bg-[#E86A58]"></div>
                        <h3 className="text-[18px] font-medium text-[#1E1E1E]">
                          {aspect.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-[15px] text-[#5A5A5A] leading-relaxed">
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
        <div className="py-16 border-t border-[#F0F0F0] bg-[#FAFAFA]">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-[#E0E0E0]"></div>
              <FaShieldAlt className="text-[#8A8A8A]" />
              <div className="w-6 h-px bg-[#E0E0E0]"></div>
            </div>
            <p className="text-[15px] text-[#5A5A5A] leading-relaxed">
              Accredited by the National Education Board • Committed to educational excellence since {establishedYear}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;