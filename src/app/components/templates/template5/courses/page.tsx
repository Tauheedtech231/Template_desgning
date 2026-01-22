'use client';

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaPlay, FaBookOpen, FaUserGraduate, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CoursesSection: React.FC = () => {
  const [activeCourse, setActiveCourse] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Updated course data with new theme colors
  const coursesData = {
    courses: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Computer Science Foundations",
        participants: 250,
        duration: "12 weeks",
        instructor: "Dr. Sarah Johnson",
        category: "Technology",
        description: "Master computational thinking through deliberate practice and real-world applications. Build intuition for complex systems.",
        features: ["Algorithmic patterns", "Systems thinking", "Code reviews", "Architecture principles"],
        level: "Beginner to Advanced"
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2111&q=80",
        title: "Strategic Leadership",
        participants: 180,
        duration: "16 weeks",
        instructor: "Prof. Michael Chen",
        category: "Business",
        description: "Develop frameworks for organizational clarity and decision-making under uncertainty.",
        features: ["Decision matrices", "Team dynamics", "Resource allocation", "Growth strategies"],
        level: "Intermediate"
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Modern Engineering",
        participants: 150,
        duration: "20 weeks",
        instructor: "Dr. Robert Williams",
        category: "Engineering",
        description: "Bridge theoretical principles with practical implementation through iterative design cycles.",
        features: ["Prototyping methods", "Failure analysis", "Material selection", "System integration"],
        level: "Advanced"
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Digital Strategy",
        participants: 220,
        duration: "10 weeks",
        instructor: "Prof. Lisa Anderson",
        category: "Marketing",
        description: "Craft resonant narratives that connect products with audiences in meaningful ways.",
        features: ["Audience mapping", "Channel optimization", "Metric frameworks", "Content systems"],
        level: "All Levels"
      },
      {
        id: 5,
        image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2036&q=80",
        title: "Data Interpretation",
        participants: 190,
        duration: "14 weeks",
        instructor: "Dr. David Miller",
        category: "Data Science",
        description: "Transform raw information into actionable insights through systematic analysis.",
        features: ["Pattern recognition", "Visual storytelling", "Statistical reasoning", "Ethical considerations"],
        level: "Intermediate"
      }
    ],
    stats: [
      { value: "95%", label: "Completion Rate", icon: FaBookOpen },
      { value: "500+", label: "Active Students", icon: FaUserGraduate },
      { value: "4.8/5", label: "Course Rating", icon: FaPlay },
      { value: "Flexible", label: "Schedule Options", icon: FaCalendarAlt }
    ]
  };

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (typeof window === "undefined") return;

      // Configure ScrollTrigger
      ScrollTrigger.defaults({
        toggleActions: "play none none reverse",
        start: "top 80%",
        end: "bottom 20%",
        scrub: false
      });

      // Animate heading with split text effect
      if (headingRef.current) {
        const text = headingRef.current.textContent || '';
        headingRef.current.innerHTML = text.split(' ').map(word => 
          `<span class="word inline-block opacity-0">${word}&nbsp;</span>`
        ).join('');
        
        gsap.fromTo(headingRef.current.querySelectorAll('.word'),
          {
            x: -60,
            opacity: 0,
            filter: "blur(8px)"
          },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%"
            }
          }
        );
      }

      // Animate stats with staggered scale
      const statItems = sectionRef.current?.querySelectorAll('.stat-item');
      statItems?.forEach((item, i) => {
        gsap.fromTo(item,
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
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 90%"
            }
          }
        );
      });

      // Animate course cards with 3D rotation
      const courseCards = sectionRef.current?.querySelectorAll('.course-card');
      courseCards?.forEach((card, i) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 50,
            rotateY: 15,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%"
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotate active course
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setActiveCourse(prev => (prev + 1) % coursesData.courses.length);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [coursesData.courses.length, isHovered]);

  const handleCourseSelect = (index: number) => {
    setActiveCourse(index);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#F7F2EE] overflow-hidden"
    >
      {/* Hero Section with Gradient Background */}
      <div className="relative min-h-[70vh] flex items-center">
  {/* Background Image */}
  <div className="absolute inset-0">
    <Image
      src="/course5.jpg" // Make sure the image is in the public folder
      alt="Academic Programs Background"
      fill
      className="object-cover"
      priority
    />
    {/* Subtle overlay for readability */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#F7F2EE]/40 via-[#F7F2EE]/20 to-[#EADBC8]/30"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 w-full">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Header with decorative elements */}
      <div className="text-center mb-12 md:mb-16">
        <div className="inline-flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#A17A74] to-transparent" />
          <span className="text-sm text-[#A17A74] font-medium tracking-widest uppercase">
            Learning Pathways
          </span>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#C99789] to-transparent" />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#3B3B3B] mb-6 leading-tight">
          <span className="block">Structured</span>
          <span className="block bg-gradient-to-r from-[#A17A74] via-[#C99789] to-[#A17A74] bg-clip-text text-transparent">
            Academic Programs
          </span>
        </h1>

        {/* Decorative line */}
        <div className="w-24 h-1 bg-gradient-to-r from-[#A17A74] via-[#C99789] to-[#A17A74] mx-auto mb-8 rounded-full" />

        <p className="text-lg md:text-xl text-[#3B3B3B]/70 max-w-2xl mx-auto leading-relaxed">
          Expertly crafted curricula that balance theoretical foundations with 
          practical application for measurable skill development
        </p>
      </div>

      {/* Stats Section - Rounded Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 md:mb-16">
        {coursesData.stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index}
              className="stat-item bg-white/80 backdrop-blur-sm border border-[#EADBC8] rounded-2xl p-6 text-center hover:scale-[1.02] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F7F2EE] to-[#EADBC8] flex items-center justify-center mx-auto mb-4">
                <Icon className="h-5 w-5 text-[#A17A74]" />
              </div>
              <div className="text-2xl font-bold text-[#A17A74] mb-1">{stat.value}</div>
              <div className="text-sm text-[#3B3B3B]/70">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</div>


      {/* Featured Course Section */}
      <div className="relative bg-white/50">
        {/* Curved Divider */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-[#F7F2EE] rounded-b-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-light text-[#3B3B3B] mb-4">
              Featured Program
            </h2>
            <p className="text-[#3B3B3B]/60 max-w-xl mx-auto">
              Currently active course with detailed curriculum overview
            </p>
          </div>

          {/* Featured Course Display - Unique Rounded Layout */}
          <div className="mb-16">
            <AnimatePresence mode="wait">
              {coursesData.courses.map((course, index) => {
                if (index !== activeCourse) return null;
                
                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {/* Left Column - Image with Rounded Frame */}
                    <div className="relative">
                      {/* Decorative background shape */}
                      <div className="absolute -inset-4 bg-gradient-to-br from-[#EADBC8]/20 to-[#F7F2EE]/20 rounded-3xl" />
                      
                      {/* Main image container */}
                      <div className="relative rounded-3xl overflow-hidden bg-white border border-[#EADBC8] p-4">
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
                          <Image
                            src={course.image}
                            alt={course.title}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            quality={90}
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                        </div>
                        
                        {/* Floating badge */}
                        <div className="absolute top-6 right-6">
                          <div className="px-4 py-2 rounded-full bg-[#C99789] text-white text-sm font-medium backdrop-blur-sm">
                            {course.level}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Course Details */}
                    <div className="flex flex-col justify-center">
                      <div className="bg-white/80 backdrop-blur-sm border border-[#EADBC8] rounded-3xl p-6 md:p-8">
                        {/* Category tag */}
                        <div className="inline-flex items-center gap-2 mb-6">
                          <div className="w-2 h-2 rounded-full bg-[#C99789]" />
                          <span className="text-sm text-[#C99789] font-medium uppercase tracking-wider">
                            {course.category}
                          </span>
                        </div>
                        
                        {/* Course title */}
                        <h3 className="text-2xl md:text-3xl font-light text-[#A17A74] mb-4 leading-tight">
                          {course.title}
                        </h3>
                        
                        {/* Instructor info */}
                        <div className="mb-6">
                          <div className="text-sm text-[#3B3B3B]/60 mb-2">Led by expert instructor</div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F7F2EE] to-[#EADBC8] flex items-center justify-center">
                              <FaPlay className="h-4 w-4 text-[#A17A74]" />
                            </div>
                            <div>
                              <div className="text-[#3B3B3B] font-medium">{course.instructor}</div>
                              <div className="text-sm text-[#3B3B3B]/60">{course.duration} program</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Course description */}
                        <div className="mb-8">
                          <p className="text-[#3B3B3B] leading-relaxed">
                            {course.description}
                          </p>
                        </div>
                        
                        {/* Course features - Rounded list */}
                        <div className="mb-8">
                          <div className="text-sm text-[#3B3B3B]/60 mb-4">Key learning objectives</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {course.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-3 bg-[#F7F2EE] rounded-xl p-3">
                                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                                  <div className="w-2 h-2 rounded-full bg-[#C99789]" />
                                </div>
                                <span className="text-sm text-[#3B3B3B]">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Course stats */}
                        <div className="pt-6 border-t border-[#EADBC8]">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                              <div className="text-center">
                                <div className="text-lg font-bold text-[#A17A74]">{course.participants}</div>
                                <div className="text-xs text-[#3B3B3B]/60">Students</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-[#C99789]">{course.duration}</div>
                                <div className="text-xs text-[#3B3B3B]/60">Duration</div>
                              </div>
                            </div>
                            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#A17A74] to-[#C99789] text-white font-medium hover:scale-105 transition-all duration-300 flex items-center gap-2">
                              Enroll Now
                              <FaArrowRight className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Course Navigation - Unique Circular Design */}
          <div className="mt-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-gradient-to-r from-transparent via-[#A17A74] to-transparent" />
                <span className="text-sm text-[#A17A74] font-medium tracking-wider">
                  Browse Programs
                </span>
                <div className="h-px w-8 bg-gradient-to-r from-transparent via-[#C99789] to-transparent" />
              </div>
            </div>

            {/* Course Cards Grid - Unique Rounded Design */}
            <div 
              ref={cardsRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {coursesData.courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  layoutId={`card-${course.id}`}
                  className={`course-card relative group cursor-pointer ${
                    activeCourse === index ? 'scale-105' : ''
                  }`}
                  onClick={() => handleCourseSelect(index)}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Card with unique rounded corners */}
                  <div className="bg-white border border-[#EADBC8] rounded-3xl p-6 h-full transition-all duration-300 group-hover:border-[#A17A74]">
                    {/* Category badge */}
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#C99789]/10 text-[#C99789] text-xs font-medium">
                        {course.category}
                      </span>
                    </div>
                    
                    {/* Course title */}
                    <h3 className="text-lg font-light text-[#A17A74] mb-3 leading-tight group-hover:text-[#C99789] transition-colors duration-300">
                      {course.title}
                    </h3>
                    
                    {/* Course description excerpt */}
                    <p className="text-sm text-[#3B3B3B]/70 mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    
                    {/* Course info */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#EADBC8]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F7F2EE] to-[#EADBC8] flex items-center justify-center">
                          <FaBookOpen className="h-3 w-3 text-[#A17A74]" />
                        </div>
                        <div className="text-xs text-[#3B3B3B]/60">
                          {course.duration}
                        </div>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        activeCourse === index 
                          ? 'bg-[#A17A74] text-white' 
                          : 'bg-[#F7F2EE] text-[#A17A74] group-hover:bg-[#A17A74] group-hover:text-white'
                      }`}>
                        <FaArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Active indicator */}
                  {activeCourse === index && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gradient-to-r from-[#A17A74] to-[#C99789] animate-pulse" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress Indicator - Circular Design */}
            <div className="flex items-center justify-center gap-8 mt-12">
              <div className="flex gap-2">
                {coursesData.courses.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleCourseSelect(index)}
                    className="focus:outline-none transition-all duration-300"
                    aria-label={`View course ${index + 1}`}
                  >
                    <div className="relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        index === activeCourse 
                          ? 'bg-gradient-to-r from-[#A17A74] to-[#C99789] scale-110' 
                          : 'bg-white border border-[#EADBC8] hover:border-[#A17A74]'
                      }`}>
                        {index === activeCourse ? (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        ) : (
                          <div className="w-1.5 h-1.5 bg-[#EADBC8] rounded-full" />
                        )}
                      </div>
                      {index === activeCourse && (
                        <div className="absolute inset-0 rounded-full border-2 border-[#A17A74]/30 animate-ping" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="text-center">
                <div className="text-sm text-[#3B3B3B]/60 mb-1">Program</div>
                <div className="text-xl font-light text-[#A17A74]">
                  <span className="font-bold">{activeCourse + 1}</span>
                  <span className="mx-2">of</span>
                  <span>{coursesData.courses.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-gradient-to-r from-[#F7F2EE] to-white/50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F7F2EE] to-[#EADBC8] flex items-center justify-center mx-auto mb-4">
              <FaCalendarAlt className="h-5 w-5 text-[#A17A74]" />
            </div>
            <h3 className="text-xl font-light text-[#3B3B3B] mb-3">
              Flexible Learning Paths
            </h3>
          </div>
          <p className="text-[#3B3B3B]/70 leading-relaxed max-w-2xl mx-auto">
            Our programs feature adaptive scheduling that accommodates diverse learning paces 
            while maintaining cohort cohesion. Learning intensity adjusts based on individual 
            progress markers and continuous feedback cycles.
          </p>
        </div>
      </div>

      {/* Add line-clamp utility */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default CoursesSection;