"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { 
  FiCompass,
  FiTarget,
  FiEye,
  FiUsers,
  FiBookOpen,
  FiAward,
  FiCalendar,
  FiMapPin,
  FiChevronRight,
  FiClock,
  FiMessageSquare,
  FiLayers,
  FiGlobe,
  FiTrendingUp,
  FiHeart
} from "react-icons/fi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

  // Human, conversational content
  const aboutData = {
    intro: {
      title: "How we think about education",
      subtitle: "A place where learning feels meaningful, not mechanical.",
      description: "For over two decades, we've focused on creating spaces where education feels human—where questions are welcomed, and understanding goes beyond textbooks."
    },

    story: [
      {
        year: "1998",
        title: "Started small",
        description: "Began with three classrooms and a simple idea: education should adapt to students, not the other way around.",
        mood: "humble"
      },
      {
        year: "2008",
        title: "Found our voice",
        description: "After ten years, we realized our strength was in personal attention. Reduced class sizes, focused on mentorship.",
        mood: "focused"
      },
      {
        year: "Present",
        title: "Still learning",
        description: "We're continuously adjusting, listening to students, and refining what we do. The work is never finished.",
        mood: "evolving"
      }
    ],

    missionVision: {
      mission: {
        title: "What we do",
        description: "We create learning environments that feel relevant and thoughtful. Where students learn how to think, not just what to think.",
        icon: FiTarget
      },
      vision: {
        title: "Where we're headed",
        description: "Towards education that recognizes each student's unique path. More conversation, less monologue.",
        icon: FiEye
      }
    },

    values: [
      {
        title: "Attention to detail",
        description: "We notice the small things—how a student is engaging, when someone needs more time, what's working.",
        icon: FiCompass,
        color: "#2F5D62"
      },
      {
        title: "Real conversations",
        description: "Learning happens in dialogue. We prioritize discussion, questions, and genuine exchange.",
        icon: FiMessageSquare,
        color: "#4A4A4A"
      },
      {
        title: "Patient growth",
        description: "Real understanding takes time. We create space for ideas to settle and connections to form.",
        icon: FiClock,
        color: "#2F5D62"
      },
      {
        title: "Local connections",
        description: "We're rooted in our communities. Learning connects to real places and real people.",
        icon: FiMapPin,
        color: "#4A4A4A"
      }
    ],

    approach: [
      {
        title: "Thoughtful pacing",
        description: "Alternating between focused work and reflective space. Good learning needs rhythm.",
        detail: "Not rushed, not slow—just right for understanding."
      },
      {
        title: "Practical projects",
        description: "Work that connects to real contexts. Students solve actual problems, not just textbook ones.",
        detail: "Often partnering with local organizations and businesses."
      },
      {
        title: "Continuous dialogue",
        description: "Feedback as ongoing conversation. We talk about progress regularly, not just at grading periods.",
        detail: "More like mentoring than evaluating."
      },
      {
        title: "Connected learning",
        description: "Linking ideas across subjects. Real understanding doesn't stay in disciplinary boxes.",
        detail: "How history connects to science, art to mathematics."
      }
    ],

    details: [
      { label: "Founded", value: "1998", icon: FiCalendar },
      { label: "Students per faculty", value: "12", icon: FiUsers },
      { label: "Campuses", value: "3", icon: FiMapPin },
      { label: "Graduation rate", value: "94%", icon: FiTrendingUp }
    ]
  };

  // Gentle, human-paced animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (typeof window === "undefined") return;

      // Simple fade up animations with natural delays
      const sections = [
        introRef.current,
        storyRef.current,
        missionRef.current,
        valuesRef.current,
        approachRef.current
      ].filter(Boolean);

      sections.forEach((section, i) => {
        if (!section) return;
        
        gsap.fromTo(section,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.1
          }
        );
      });

      // Gentle image fade only for hero image
      const heroImage = sectionRef.current?.querySelector('.hero-image');
      if (heroImage) {
        gsap.fromTo(heroImage,
          { opacity: 0, scale: 1.05 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.3
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
    >
      {/* Simple background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Introduction with ONE strategic hero image */}
      <div 
        ref={introRef}
        className="pt-28 pb-24"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Single hero image - makes the biggest impact */}
          <div className="mb-16 relative h-[400px] md:h-[450px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2070&auto=format&fit=crop"
              alt="A genuine moment of student collaboration and discussion"
              fill
              className="hero-image object-cover"
              sizes="(max-width: 1024px) 100vw, 100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div className="h-px w-8 bg-white/50 mb-2" />
              <p className="text-sm text-white/80 italic max-w-md">
                Morning conversations where ideas take shape naturally
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Simple, understated header */}
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-8 bg-[#121212]" />
              <span className="text-[13px] text-[#6E6E6E] tracking-wider">
                About our approach
              </span>
              <div className="h-px w-4 bg-[#EDEDED]" />
            </div>

            {/* Human-scale typography */}
            <div className="space-y-8 mb-16">
              <h1 className="font-serif text-[34px] leading-[1.2] tracking-tight text-[#121212] font-medium">
                {aboutData.intro.title}
              </h1>
              
              <p className="font-sans text-[18px] text-[#4A4A4A] leading-relaxed">
                {aboutData.intro.subtitle}
              </p>
              
              <p className="font-sans text-[16px] text-[#4A4A4A] leading-relaxed">
                {aboutData.intro.description}
              </p>
            </div>

            {/* Simple details - no images */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#EDEDED] pt-12">
              {aboutData.details.map((detail, index) => {
                const Icon = detail.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex w-10 h-10 rounded-full bg-[#F6F6F6] items-center justify-center mb-3">
                      <Icon className="h-4 w-4 text-[#4A4A4A]" />
                    </div>
                    <div className="text-[28px] font-serif text-[#121212] mb-1">
                      {detail.value}
                    </div>
                    <div className="text-[11px] text-[#6E6E6E] uppercase tracking-wider">
                      {detail.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Story - Text only, more editorial */}
      <div className="py-24 border-t border-[#EDEDED]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div ref={storyRef}>
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-6 bg-[#2F5D62]" />
                <h2 className="font-serif text-[28px] font-medium text-[#121212]">
                  Our journey
                </h2>
              </div>
              
              <p className="font-sans text-[16px] text-[#4A4A4A] leading-relaxed max-w-xl">
                How a simple idea grew into what we are today—always evolving, always learning.
              </p>
            </div>

            {/* Story with natural spacing - no images */}
            <div className="space-y-16">
              {aboutData.story.map((item, index) => (
                <div key={index} className="relative pl-12">
                  {/* Year marker - simple and human */}
                  <div className="absolute left-0 top-0">
                    <div className="text-[14px] text-[#2F5D62] font-medium mb-2">
                      {item.year}
                    </div>
                    <div className="w-8 h-px bg-[#2F5D62]/30" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <h3 className="font-serif text-[20px] font-medium text-[#121212]">
                        {item.title}
                      </h3>
                      <span className="text-[12px] text-[#6E6E6E] bg-[#F6F6F6] px-2 py-1 rounded-sm">
                        {item.mood}
                      </span>
                    </div>
                    <p className="font-sans text-[16px] text-[#4A4A4A] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Natural divider */}
                  {index < aboutData.story.length - 1 && (
                    <div className="mt-12 flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#EDEDED] rounded-full" />
                      <div className="w-2 h-2 bg-[#EDEDED] rounded-full" />
                      <div className="w-2 h-2 bg-[#EDEDED] rounded-full" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision - Clean, text-focused */}
      <div className="py-24 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div ref={missionRef}>
            <div className="mb-16">
              <h2 className="font-serif text-[28px] font-medium text-[#121212] mb-6">
                Our focus
              </h2>
              <div className="h-px w-12 bg-[#2F5D62]/30 mb-8" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {Object.values(aboutData.missionVision).map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white border border-[#EDEDED] flex items-center justify-center">
                        <Icon className="h-4 w-4 text-[#2F5D62]" />
                      </div>
                      <h3 className="font-serif text-[20px] font-medium text-[#121212]">
                        {item.title}
                      </h3>
                    </div>
                    
                    <p className="font-sans text-[15px] text-[#4A4A4A] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Values - Simple grid, no images */}
      <div className="py-24 border-t border-[#EDEDED]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div ref={valuesRef}>
            <div className="mb-16">
              <div className="text-center">
                <h2 className="font-serif text-[28px] font-medium text-[#121212] mb-6">
                  What guides us
                </h2>
                <p className="font-sans text-[16px] text-[#4A4A4A] leading-relaxed max-w-xl mx-auto">
                  The principles that shape our decisions every day.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {aboutData.values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white border border-[#EDEDED] p-8 hover:border-[#2F5D62]/30 transition-colors duration-300"
                  >
                    <div className="flex items-start gap-6">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                        style={{ backgroundColor: `${value.color}10` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: value.color }} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-serif text-[18px] font-medium text-[#121212] mb-3">
                          {value.title}
                        </h3>
                        <p className="font-sans text-[15px] text-[#4A4A4A] leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Approach - Clean numbered list */}
      <div className="py-24 md:py-32 border-t border-[#EDEDED] bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div ref={approachRef}>
            <div className="mb-20">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-8 rounded-full bg-white border border-[#EDEDED] flex items-center justify-center">
                  <FiBookOpen className="h-4 w-4 text-[#2F5D62]" />
                </div>
                <h2 className="font-serif text-[28px] font-medium text-[#121212]">
                  How we teach
                </h2>
              </div>
              
              <p className="font-sans text-[16px] text-[#4A4A4A] leading-relaxed">
                Simple practices that make learning more meaningful and lasting.
              </p>
            </div>

            <div className="space-y-16">
              {aboutData.approach.map((item, index) => (
                <div key={index} className="relative">
                  {/* Simple number */}
                  <div className="absolute -left-12 top-0 text-[48px] font-serif font-medium text-[#EDEDED] leading-none">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="font-serif text-[20px] font-medium text-[#121212]">
                      {item.title}
                    </h3>
                    
                    <div className="space-y-4">
                      <p className="font-sans text-[16px] text-[#4A4A4A] leading-relaxed">
                        {item.description}
                      </p>
                      <p className="font-sans text-[14px] text-[#6E6E6E] leading-relaxed italic">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                  
                  {/* Simple divider */}
                  {index < aboutData.approach.length - 1 && (
                    <div className="mt-16 pt-8 border-t border-[#EDEDED]" />
                  )}
                </div>
              ))}
            </div>

            {/* Closing - Simple and human, no image */}
            <div className="mt-32 pt-16 border-t border-[#EDEDED]">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-white border border-[#EDEDED] flex items-center justify-center flex-shrink-0">
                  <FiHeart className="h-5 w-5 text-[#2F5D62]" />
                </div>
                
                <div>
                  <p className="font-sans text-[16px] text-[#4A4A4A] leading-relaxed mb-6">
                    At the end of the day, we're here to create a space where learning 
                    feels worthwhile and students feel seen. It's simple, but it matters.
                  </p>
                  
                  {/* Simple signature */}
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-px bg-[#EDEDED]" />
                    <span className="text-[13px] text-[#6E6E6E]">
                      The team at Academy
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};