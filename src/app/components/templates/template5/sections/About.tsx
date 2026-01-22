"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  MdArrowForward, 
  MdAutoAwesome, 
  MdCheckCircleOutline, 
  MdSchool, 
  MdGroups, 
  MdPublic, 
  MdHistory, 
  MdStar,
  MdRemoveRedEye,
  MdFlag,
  MdArrowRight,
  MdCheck
} from "react-icons/md";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const sliderData = [
    {
      title: "Innovative Learning Spaces",
      description: "Modern classrooms designed for collaboration and creativity",
      icon: MdSchool
    },
    {
      title: "Expert Faculty",
      description: "Dedicated educators with industry experience",
      icon: MdGroups
    },
    {
      title: "Global Recognition",
      description: "Internationally accredited programs and partnerships",
      icon: MdPublic
    }
  ];

  const aboutData = {
    intro: {
      title: "Redefining Education for Tomorrow's Leaders",
      subtitle: "Where Tradition Meets Innovation in Learning",
      description: "For over two decades, we've been at the forefront of educational excellence, shaping minds and building futures with a perfect blend of academic rigor and practical experience."
    },

    story: {
      title: "Our Story",
      timeline: [
        {
          year: "1998",
          title: "The Beginning",
          description: "Founded with a vision to provide quality education accessible to all",
          color: "#A17A74"
        },
        {
          year: "2008",
          title: "Expansion",
          description: "Expanded to multiple campuses with international collaborations",
          color: "#C99789"
        },
        {
          year: "2018",
          title: "Digital Transformation",
          description: "Integrated modern technology with traditional teaching methods",
          color: "#A17A74"
        },
        {
          year: "2026",
          title: "Global Recognition",
          description: "Recognized as a leading institution with 95% placement rate",
          color: "#C99789"
        }
      ]
    },

    missionVision: {
      mission: {
        title: "Our Mission",
        description: "To empower students with knowledge, skills, and values that enable them to become responsible global citizens and innovative leaders.",
        icon: MdFlag,
        points: [
          "Provide transformative learning experiences",
          "Foster innovation and critical thinking",
          "Promote ethical leadership and social responsibility",
          "Bridge academia with industry requirements"
        ]
      },
      vision: {
        title: "Our Vision",
        description: "To be a globally recognized center of excellence in education, research, and innovation that shapes the future of society.",
        icon: MdRemoveRedEye,
        points: [
          "Lead in educational innovation",
          "Create sustainable societal impact",
          "Develop world-class professionals",
          "Pioneer interdisciplinary research"
        ]
      }
    },

    whyChoose: {
      title: "Why Choose Us",
      reasons: [
        {
          title: "Industry-Ready Curriculum",
          description: "Courses designed in collaboration with industry leaders",
          icon: MdCheckCircleOutline
        },
        {
          title: "Personal Mentorship",
          description: "One-on-one guidance from experienced faculty",
          icon: MdCheckCircleOutline
        },
        {
          title: "Modern Infrastructure",
          description: "State-of-the-art labs, libraries, and sports facilities",
          icon: MdCheckCircleOutline
        },
        {
          title: "Global Opportunities",
          description: "Student exchange programs with 30+ international universities",
          icon: MdCheckCircleOutline
        }
      ]
    },

    values: [
      {
        title: "Excellence in Education",
        description: "Maintaining the highest standards in teaching and learning methodologies.",
        icon: MdAutoAwesome,
        features: [
          "Curriculum designed by industry experts",
          "Regular academic audits",
          "Quality assurance programs"
        ]
      },
      {
        title: "Student-Centered Approach",
        description: "Focused on individual growth and personalized learning paths.",
        icon: MdStar,
        features: [
          "One-on-one mentorship programs",
          "Customized learning plans",
          "Career guidance and counseling"
        ]
      }
    ],

    stats: [
      { label: "Established", value: "1998", suffix: "" },
      { label: "Global Alumni", value: "25K+", suffix: "" },
      { label: "Placement Rate", value: "96", suffix: "%" },
      { label: "Faculty Ratio", value: "1:12", suffix: "" }
    ],

    highlights: [
      {
        title: "Industry Partnerships",
        description: "Collaborations with 200+ leading companies"
      },
      {
        title: "Research Excellence",
        description: "₹5Cr+ in research grants annually"
      },
      {
        title: "Campus Placements",
        description: "500+ recruiters visit campus yearly"
      },
      {
        title: "Student Diversity",
        description: "Students from 25+ countries"
      }
    ]
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (typeof window === "undefined") return;

      // Configure default ScrollTrigger
      ScrollTrigger.defaults({
        toggleActions: "play none none reverse",
        start: "top 80%",
        end: "bottom 20%",
        scrub: false
      });

      // Enhanced heading animations with text reveal effect
      const headings = sectionRef.current?.querySelectorAll('.scroll-heading');
      headings?.forEach((heading) => {
        // Split text into words for animation
        const text = heading.textContent || '';
        heading.innerHTML = text.split(' ').map(word => 
          `<span class="word" style="display: inline-block; opacity: 0; transform: translateX(-30px)">${word}&nbsp;</span>`
        ).join('');
        
        gsap.fromTo(heading.querySelectorAll('.word'),
          {
            x: -30,
            opacity: 0,
            filter: "blur(5px)"
          },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 85%"
            }
          }
        );
      });

      // Animate all text elements with fade up effect
      const textElements = sectionRef.current?.querySelectorAll('.animate-text');
      textElements?.forEach((text, i) => {
        gsap.fromTo(text,
          {
            y: 20,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: text,
              start: "top 90%"
            }
          }
        );
      });

      // Animate stats from bottom
      const stats = sectionRef.current?.querySelectorAll('.stat-item');
      stats?.forEach((stat, i) => {
        gsap.fromTo(stat,
          { 
            opacity: 0, 
            y: 50,
            scale: 0.9 
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: stat,
              start: "top 85%"
            }
          }
        );
      });

      // Timeline cards animation - stagger from left and right
      const timelineCards = sectionRef.current?.querySelectorAll('.timeline-card');
      timelineCards?.forEach((card, i) => {
        const direction = i % 2 === 0 ? -80 : 80;
        
        gsap.fromTo(card,
          {
            x: direction,
            opacity: 0,
            rotateY: direction > 0 ? 15 : -15
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%"
            }
          }
        );
      });

      // Why choose us cards - scale up animation
      const whyCards = sectionRef.current?.querySelectorAll('.why-card');
      whyCards?.forEach((card, i) => {
        gsap.fromTo(card,
          {
            scale: 0.8,
            opacity: 0,
            y: 30
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%"
            }
          }
        );
      });

      // Mission & Vision cards - flip animation
      const missionVisionCards = sectionRef.current?.querySelectorAll('.mission-vision-card');
      missionVisionCards?.forEach((card, i) => {
        gsap.fromTo(card,
          {
            rotateX: 90,
            opacity: 0,
            y: 50
          },
          {
            rotateX: 0,
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%"
            }
          }
        );
      });

      // Values cards - flip animation
      const valueCards = sectionRef.current?.querySelectorAll('.value-card');
      valueCards?.forEach((card, i) => {
        gsap.fromTo(card,
          {
            rotateX: 90,
            opacity: 0,
            y: 50
          },
          {
            rotateX: 0,
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%"
            }
          }
        );
      });

      // Highlights - staggered fade in
      const highlights = sectionRef.current?.querySelectorAll('.highlight-card');
      highlights?.forEach((card, i) => {
        const direction = i % 2 === 0 ? -40 : 40;
        
        gsap.fromTo(card,
          {
            x: direction,
            opacity: 0,
            scale: 0.95
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%"
            }
          }
        );
      });

      // Auto slider
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderData.length);
      }, 4000);

      return () => clearInterval(interval);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
    >
      {/* Hero Section with Video Background */}
      <div className="relative h-[70vh] sm:h-screen min-h-[500px] sm:min-h-[600px] flex items-center justify-center">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/data/about4-poster.jpg"
          >
            <source src="/data/about4.mp4" type="video/mp4" />
          </video>
          
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 animate-text">
            <div className="h-px w-6 sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-white to-transparent" />
            <span className="text-xs sm:text-sm text-white/90 font-semibold tracking-widest uppercase">
              Welcome To Excellence
            </span>
            <div className="h-px w-6 sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-white to-transparent" />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="text-white">
              <span className="scroll-heading inline-block">Redefining Education</span>
              <br />
              <span className="scroll-heading bg-gradient-to-r from-[#A17A74] via-[#C99789] to-[#A17A74] bg-clip-text text-transparent">
                for Tomorrows Leaders
              </span>
            </span>
          </h1>
          
          <div className="w-20 sm:w-24 md:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-[#A17A74] to-[#C99789] mx-auto mb-4 sm:mb-6 animate-text"></div>
          
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto font-light animate-text">
            <span className="scroll-heading">Where Tradition Meets Innovation in Learning</span>
          </h2>
          
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed max-w-lg sm:max-w-xl md:max-w-2xl mx-auto mb-6 sm:mb-8 animate-text">
            {aboutData.intro.description}
          </p>

          {/* Video Controls */}
          <button 
            onClick={toggleVideo}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-sm text-white rounded-full font-medium text-xs sm:text-sm md:text-base hover:bg-white/30 transition-all duration-300 border border-white/30 animate-text"
          >
            {isPlaying ? (
              <>
                <MdArrowForward className="h-3 w-3 sm:h-4 sm:w-4 rotate-90" />
                Pause Video
              </>
            ) : (
              <>
                <MdArrowForward className="h-3 w-3 sm:h-4 sm:w-4" />
                Play Video
              </>
            )}
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <MdArrowForward className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white rotate-90" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
     <div className="py-12 sm:py-16 md:py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      {aboutData.stats.map((stat, index) => (
        <div
          key={index}
          className="
            stat-item 
            bg-[#F7F2EE] 
            border border-transparent 
            border-b-2 border-b-transparent 
            rounded-2xl
            p-4 sm:p-6 md:p-8 
            text-center 
            transition-all duration-300 ease-out
            hover:border-b-[#A17A74]  /* bottom border on hover */
            hover:scale-[1.03]
          "
        >
          {/* Stat Value */}
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#A17A74] mb-1 sm:mb-2">
            {stat.value}
            <span className="text-[#C99789]">{stat.suffix}</span>
          </div>

          {/* Stat Label */}
          <div className="text-[10px] sm:text-xs md:text-sm text-[#3B3B3B]/80 uppercase tracking-wider font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


   {/* Mission & Vision Section */}
<div className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#F7F2EE] via-white to-[#EADBC8]/30">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-8 sm:mb-12 md:mb-16">
      <div className="inline-flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="h-px w-6 sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-[#A17A74] to-transparent" />
        <span className="text-xs sm:text-sm text-[#A17A74] font-semibold tracking-widest uppercase animate-text">
          Guiding Principles
        </span>
        <div className="h-px w-6 sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-[#C99789] to-transparent" />
      </div>
      <h2 className="scroll-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#3B3B3B] mb-4 sm:mb-6">
        Mission & Vision
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-[#3B3B3B]/70 max-w-xl sm:max-w-2xl mx-auto animate-text">
        The foundation upon which we build futures
      </p>
    </div>

    {/* Combined Card */}
    <div className="mission-vision-card bg-white border border-[#EADBC8] rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 hover:border-[#A17A74] transition-all duration-500 relative overflow-hidden group">
      
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#A17A74]/5 to-transparent rounded-bl-full" />
      <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#C99789]/5 to-transparent rounded-br-full" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 md:gap-8">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#F7F2EE] to-[#EADBC8] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <MdFlag className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#A17A74]" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#A17A74] mb-2 sm:mb-3 md:mb-4 animate-text">
              {aboutData.missionVision.mission.title}
            </h3>
            <p className="text-sm sm:text-base text-[#3B3B3B]/80 animate-text">
              {aboutData.missionVision.mission.description}
            </p>
            <div className="space-y-2 sm:space-y-3 md:space-y-4 pl-4 mt-2">
              {aboutData.missionVision.mission.points.map((point, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3 md:gap-4 animate-text" style={{ animationDelay: `${index * 0.1}s` }}>
                  <MdCheckCircleOutline className="h-4 w-4 sm:h-5 sm:w-5 text-[#C99789] mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-[#3B3B3B]">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 md:gap-8">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#F7F2EE] to-[#EADBC8] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <MdRemoveRedEye className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#C99789]" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#C99789] mb-2 sm:mb-3 md:mb-4 animate-text">
              {aboutData.missionVision.vision.title}
            </h3>
            <p className="text-sm sm:text-base text-[#3B3B3B]/80 animate-text">
              {aboutData.missionVision.vision.description}
            </p>
            <div className="space-y-2 sm:space-y-3 md:space-y-4 pl-4 mt-2">
              {aboutData.missionVision.vision.points.map((point, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3 md:gap-4 animate-text" style={{ animationDelay: `${index * 0.1}s` }}>
                  <MdCheckCircleOutline className="h-4 w-4 sm:h-5 sm:w-5 text-[#A17A74] mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-[#3B3B3B]">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Our Story Section */}
      <div className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-[#F7F2EE] to-[#EADBC8]/30">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-8 sm:mb-12 md:mb-16">
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <MdHistory className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-[#A17A74]" />
        <h2 className="scroll-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#3B3B3B]">
          {aboutData.story.title}
        </h2>
      </div>
      <p className="text-sm sm:text-base md:text-lg text-[#3B3B3B]/70 max-w-xl sm:max-w-2xl mx-auto animate-text">
        A journey of excellence and innovation in education
      </p>
    </div>

    <div className="relative">
      {/* Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {aboutData.story.timeline.map((item, index) => (
          <div 
            key={index}
            className="timeline-card p-4 sm:p-6 md:p-8 transition-all duration-300 animate-text"
          >
            <div 
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-3 sm:mb-4 md:mb-6 mx-auto"
              style={{ backgroundColor: `${item.color}20` }}
            >
              <span 
                className="text-base sm:text-lg md:text-xl font-bold"
                style={{ color: item.color }}
              >
                {item.year}
              </span>
            </div>
            
            <h3 
              className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-center mb-2 sm:mb-3 md:mb-4"
              style={{ color: item.color }}
            >
              {item.title}
            </h3>
            
            <p className="text-xs sm:text-sm text-[#3B3B3B]/80 text-center">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>


      {/* Why Choose Us - Black Background */}
   <div className="py-12 sm:py-16 md:py-20 lg:py-24 bg-black text-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-8 sm:mb-12 md:mb-16">
      <div className="inline-flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="h-px w-6 sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-white to-transparent" />
        <span className="text-xs sm:text-sm text-white/80 font-semibold tracking-widest uppercase animate-text">
          Advantages
        </span>
        <div className="h-px w-6 sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>
      
      <h2 className="scroll-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
        {aboutData.whyChoose.title}
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-xl sm:max-w-2xl mx-auto animate-text">
        Discover what makes us different and better
      </p>
    </div>

    {/* Grid of Advantages */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 text-center">
      {aboutData.whyChoose.reasons.map((reason, index) => {
        const Icon = reason.icon;
        return (
          <div key={index} className="flex flex-col items-center gap-3 animate-text">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-2">
              <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
            </div>

            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 sm:mb-2">
              {reason.title}
            </h3>

            <p className="text-xs sm:text-sm text-white/70 max-w-[200px] sm:max-w-[220px] md:max-w-[250px]">
              {reason.description}
            </p>
          </div>
        );
      })}
    </div>
  </div>
</div>


      {/* Values Section - Light Background */}
     <div className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-8 sm:mb-12 md:mb-16">
      <h2 className="scroll-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#3B3B3B] mb-4 sm:mb-6">
        Our Core Values
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-[#3B3B3B]/70 max-w-xl sm:max-w-2xl mx-auto animate-text">
        Principles that guide every decision we make
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 text-left">
      {aboutData.values.map((value, index) => {
        const Icon = value.icon;
        return (
          <div key={index} className="flex flex-col gap-4 animate-text">
            
            {/* Value Header */}
            <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#F7F2EE] to-[#EADBC8] flex items-center justify-center flex-shrink-0">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-[#A17A74]" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#A17A74] mb-1 sm:mb-2 md:mb-3">
                  {value.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-[#3B3B3B]/80">
                  {value.description}
                </p>
              </div>
            </div>

            {/* Features List */}
            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 pl-12">
              {value.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center gap-2 sm:gap-3 md:gap-4 animate-text">
                  <MdArrowRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#C99789] flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-[#3B3B3B]">{feature}</span>
                </div>
              ))}
            </div>

          </div>
        );
      })}
    </div>
  </div>
</div>


      {/* Slider Section - Light Background */}
      <div className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-[#F7F2EE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="scroll-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#3B3B3B] mb-4 sm:mb-6">
              What Sets Us Apart
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#3B3B3B]/70 max-w-xl sm:max-w-2xl mx-auto animate-text">
              Key differentiators that make us a preferred choice for students
            </p>
          </div>

          <div className="relative" ref={sliderRef}>
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {sliderData.map((slide, index) => {
                  const Icon = slide.icon;
                  return (
                    <div 
                      key={index}
                      className="w-full flex-shrink-0 px-2 sm:px-4"
                    >
                      <div className="bg-white border border-[#EADBC8] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 text-center hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#F7F2EE] mx-auto mb-3 sm:mb-4 md:mb-6 flex items-center justify-center">
                          <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#A17A74]" />
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#A17A74] mb-2 sm:mb-3 md:mb-4 animate-text">
                          {slide.title}
                        </h3>
                        <p className="text-xs sm:text-sm md:text-base text-[#3B3B3B]/80 max-w-md sm:max-w-lg md:max-w-xl mx-auto animate-text">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 md:mt-8">
              {sliderData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-[#A17A74] w-4 sm:w-6' 
                      : 'bg-[#EADBC8] hover:bg-[#C99789]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
     <div className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-8 sm:mb-12 md:mb-16">
      <div className="inline-flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="h-px w-6 sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-[#A17A74] to-transparent" />
        <span className="text-xs sm:text-sm text-[#A17A74] font-semibold tracking-widest uppercase animate-text">
          Institutional Highlights
        </span>
        <div className="h-px w-6 sm:w-8 md:w-12 bg-gradient-to-r from-transparent via-[#C99789] to-transparent" />
      </div>
      <h2 className="scroll-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#3B3B3B] mb-4 sm:mb-6">
        Excellence Across All Dimensions
      </h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
      {aboutData.highlights.map((highlight, index) => (
        <div key={index} className="flex items-start gap-3 sm:gap-4 md:gap-6 animate-text">
          
          {/* Icon */}
          <MdCheck className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#A17A74] flex-shrink-0 mt-1" />
          
          {/* Text */}
          <div>
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#A17A74] mb-1 sm:mb-2">
              {highlight.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#3B3B3B]/80">
              {highlight.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


      {/* Closing Section */}
     <div className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-[#F7F2EE]">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div 
      className="rounded-xl sm:rounded-2xl p-6 md:p-8 lg:p-10 mb-6 sm:mb-8 md:mb-12 border border-[#EADBC8] bg-white cursor-pointer hover:bg-[#F7F2EE] transition-colors duration-300"
      onClick={() => window.location.href = "/components/templates/template5/contact"}
    >
      {/* Icon */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#A17A74] to-[#C99789] flex items-center justify-center mx-auto mb-4 sm:mb-6">
        <MdAutoAwesome className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
      </div>

      {/* Text */}
      <p className="text-base sm:text-lg md:text-xl text-[#3B3B3B] mb-4 sm:mb-6 leading-relaxed">
        Get in Touch – connect with us to explore opportunities, collaborations, and insights.  
        We’re here to answer your questions and guide your journey.
      </p>

      {/* Since text */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6">
        <div className="h-px w-6 sm:w-8 md:w-12 bg-gradient-to-r from-transparent to-[#EADBC8]" />
        <span className="text-xs sm:text-sm text-[#A17A74] font-semibold tracking-widest">
          SINCE 1998
        </span>
        <div className="h-px w-6 sm:w-8 md:w-12 bg-gradient-to-r from-[#EADBC8] to-transparent" />
      </div>
    </div>
  </div>
</div>

    </section>
  );
};