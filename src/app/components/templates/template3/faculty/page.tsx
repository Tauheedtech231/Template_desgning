"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaLinkedin, 
  FaQuoteLeft, 
  FaQuoteRight, 
  FaEnvelope, 
  FaBriefcase, 
  FaGraduationCap, 
  FaChalkboardTeacher,
  FaAward,
  FaUsers,
  FaChevronRight,
  FaChevronLeft,
  FaStar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBook,
  FaGlobe,
  FaRocket,
  FaMicroscope,
  FaLightbulb,
  FaPhone,
  FaHandshake,
  FaSearch,
  FaFilter,
  FaUniversity,
  FaLaptopCode,
  FaStethoscope,
  FaPaintBrush,
  FaBalanceScale,
  FaFlask,
  FaBusinessTime
} from "react-icons/fa";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Faculty {
  id: number;
  image: string;
  name: string;
  position: string;
  designation: string;
  linkedin?: string;
  email?: string;
  quote?: string;
  expertise?: string[];
  experience: string;
  description?: string;
  department: string;
  bio?: string;
  skills?: string[];
  achievements?: string[];
  research?: string[];
  funFact?: string;
  teachingStyle?: string;
}

const FacultySection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [selectedExperience, setSelectedExperience] = useState<string>("All");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setViewMode('carousel');
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generic faculty data
  const facultyMembers: Faculty[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop",
      name: "Dr. Sarah Johnson",
      position: "Dean of Academic Affairs",
      designation: "Professor of Computer Science",
      linkedin: "https://linkedin.com",
      email: "sarah.johnson@college.edu",
      quote: "Education is not the learning of facts, but the training of the mind to think.",
      expertise: ["AI", "ML", "Data Science", "Quantum"],
      experience: "15+ Years",
      description: "Former Google AI researcher with extensive industry experience",
      department: "Computer Science",
      bio: "PhD from Stanford University",
      skills: ["AI Research", "Curriculum Development", "Mentorship"],
      achievements: ["Google AI Award", "Best Paper AAAI 2022"],
      research: ["Explainable AI", "Ethical ML", "Quantum Computing"],
      funFact: "Built first AI model at age 16",
      teachingStyle: "Interactive problem-solving with real apps"
    },
    {
      id: 2,
      image: "https://plus.unsplash.com/premium_photo-1664300900349-afd61c20f8b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRlYWNoZXJ8ZW58MHx8MHx8fDA%3D",
      name: "Prof. Michael Chen",
      position: "Department Head",
      designation: "Professor of Business",
      linkedin: "https://linkedin.com",
      email: "michael.chen@college.edu",
      quote: "Success in business requires training, discipline, and hard work.",
      expertise: ["Strategy", "Entrepreneurship", "Finance", "Marketing"],
      experience: "12+ Years",
      description: "Former Fortune 500 executive turned educator",
      department: "Business",
      bio: "MBA from Harvard",
      skills: ["Business Strategy", "Leadership", "Finance"],
      achievements: ["Forbes 30 Under 30", "Best Educator 2022"],
      research: ["Sustainable Business", "Digital Transformation"],
      funFact: "Started first company at 22",
      teachingStyle: "Case-study based learning"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop",
      name: "Dr. Robert Williams",
      position: "Research Director",
      designation: "Professor of Engineering",
      linkedin: "https://linkedin.com",
      email: "robert.williams@college.edu",
      quote: "Engineering is the art of directing nature's power.",
      expertise: ["Civil Eng", "Design", "Management", "Sustainable"],
      experience: "18+ Years",
      description: "Award-winning engineer with multiple patents",
      department: "Engineering",
      bio: "PhD from MIT",
      skills: ["Structural Analysis", "Research", "Innovation"],
      achievements: ["National Award", "5 Patents", "IEEE Fellow"],
      research: ["Smart Cities", "Earthquake Structures"],
      funFact: "Designed national landmark bridge",
      teachingStyle: "Hands-on labs and competitions"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop",
      name: "Dr. Lisa Anderson",
      position: "Health Sciences Director",
      designation: "Professor of Nursing",
      linkedin: "https://linkedin.com",
      email: "lisa.anderson@college.edu",
      quote: "Find yourself by serving others.",
      expertise: ["Public Health", "Clinical", "Management", "Ethics"],
      experience: "20+ Years",
      description: "Former hospital administrator and educator",
      department: "Health Sciences",
      bio: "DNP from Johns Hopkins",
      skills: ["Healthcare Ed", "Clinical Training", "Policy"],
      achievements: ["Nightingale Award", "50+ Papers", "WHO Consultant"],
      research: ["Telemedicine", "Patient Care", "Global Health"],
      funFact: "Worked in 3 countries with Doctors Without Borders",
      teachingStyle: "Clinical simulations"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop",
      name: "Prof. David Miller",
      position: "Director of Arts",
      designation: "Professor of Fine Arts",
      linkedin: "https://linkedin.com",
      email: "david.miller@college.edu",
      quote: "Art enables us to find ourselves and lose ourselves at the same time.",
      expertise: ["Visual Arts", "Art History", "Digital Media"],
      experience: "14+ Years",
      description: "Internationally exhibited artist and curator",
      department: "Arts & Humanities",
      bio: "MFA from Rhode Island School of Design",
      skills: ["Art Criticism", "Exhibition Curation"],
      achievements: ["Guggenheim Fellowship", "Venice Biennale"],
      research: ["Art Therapy", "Digital Preservation"],
      funFact: "Artwork hangs in the White House",
      teachingStyle: "Studio-based critique sessions"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop",
      name: "Dr. Maria Garcia",
      position: "Department Chair",
      designation: "Professor of Psychology",
      linkedin: "https://linkedin.com",
      email: "maria.garcia@college.edu",
      quote: "Psychology helps us understand why we think, feel, and act as we do.",
      expertise: ["Cognitive", "Behavioral", "Research Methods", "Neuroscience"],
      experience: "16+ Years",
      description: "Published researcher and clinical psychologist",
      department: "Social Sciences",
      bio: "PhD from University of Chicago",
      skills: ["Assessment", "Research Design", "Analysis"],
      achievements: ["APA Lifetime", "Best Seller Author", "TED Speaker"],
      research: ["Mindfulness", "Cognitive Therapy", "Social Psychology"],
      funFact: "Hosts popular psychology podcast",
      teachingStyle: "Interactive experiments"
    },
   
  
  ];

  // Get unique departments
  const departments = ["All", ...Array.from(new Set(facultyMembers.map(f => f.department)))];

  // Experience filters
  const experienceFilters = ["All", "10+ Years", "15+ Years", "20+ Years"];

  // Filter faculty members
  const filteredFaculty = facultyMembers.filter(faculty => {
    const matchesSearch = searchTerm === "" || 
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.expertise?.some(skill => 
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesDepartment = selectedDepartment === "All" || 
      faculty.department === selectedDepartment;

    const matchesExperience = selectedExperience === "All" || 
      faculty.experience === selectedExperience;

    return matchesSearch && matchesDepartment && matchesExperience;
  });

  // Animation for section entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (typeof window === "undefined") return;

      ScrollTrigger.defaults({
        toggleActions: "play none none reverse",
        start: "top 80%",
        end: "bottom 20%",
        scrub: false,
      });

      gsap.fromTo(
        ".section-title",
        { 
          y: 50, 
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          }
        }
      );

      gsap.fromTo(
        ".faculty-card",
        { 
          y: 40, 
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % filteredFaculty.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + filteredFaculty.length) % filteredFaculty.length);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDepartment("All");
    setSelectedExperience("All");
  };

  const getDepartmentIcon = (dept: string) => {
    switch(dept) {
      case "Computer Science": return <FaLaptopCode />;
      case "Business": return <FaBusinessTime />;
      case "Engineering": return <FaUniversity />;
      case "Health Sciences": return <FaStethoscope />;
      case "Arts & Humanities": return <FaPaintBrush />;
      case "Social Sciences": return <FaUsers />;
      case "Natural Sciences": return <FaFlask />;
      case "Law": return <FaBalanceScale />;
      default: return <FaUniversity />;
    }
  };

  const renderCarouselView = () => (
    <div className="relative px-2 md:px-0 ">
      {isMobile ? (
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {filteredFaculty.map((faculty) => (
              <div key={faculty.id} className="w-full flex-shrink-0 px-2">
                <FacultyCard faculty={faculty} isMobile={true} />
              </div>
            ))}
          </div>

          {filteredFaculty.length > 0 && (
            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-[#10B981] to-[#34D399] text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <FaChevronLeft />
              </button>
              
              <div className="flex items-center gap-2">
                {filteredFaculty.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'w-8 bg-gradient-to-r from-[#10B981] to-[#34D399]' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-[#10B981] to-[#34D399] text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.map((faculty, index) => (
            <FacultyCard 
              key={faculty.id} 
              faculty={faculty} 
              isMobile={false}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      )}
    </div>
  );

  const FacultyCard = ({ 
    faculty, 
    isMobile, 
    index,
    hoveredIndex,
    setHoveredIndex 
  }: { 
    faculty: Faculty; 
    isMobile: boolean;
    index?: number;
    hoveredIndex?: number | null;
    setHoveredIndex?: (index: number | null) => void;
  }) => (
    <div
      className="faculty-card  bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 border border-gray-700 shadow-xl hover:shadow-2xl hover:shadow-[#10B981]/20 hover:-translate-y-2 transition-all duration-500 group"
      onMouseEnter={() => !isMobile && setHoveredIndex?.(index!)}
      onMouseLeave={() => !isMobile && setHoveredIndex?.(null)}
    >
      <div className="flex flex-col items-center text-center">
        {/* Profile Image */}
        <div className="relative mb-6 group-hover:scale-110 transition-transform duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
          <div className="relative w-28 h-28 md:w-32 md:h-32">
            <Image
              src={faculty.image}
              alt={faculty.name}
              fill
              className="rounded-full object-cover border-4 border-gray-800 group-hover:border-[#10B981]/50 transition-all duration-500"
              sizes="(max-width: 768px) 112px, 128px"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#10B981] to-[#34D399] rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
            {faculty.experience}
          </div>
        </div>

        {/* Department Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 text-gray-300 text-xs rounded-full border border-gray-700 group-hover:border-[#10B981]/30 group-hover:bg-[#10B981]/10 group-hover:text-[#34D399] transition-all duration-300">
            {getDepartmentIcon(faculty.department)}
            {faculty.department}
          </span>
        </div>

        {/* Name and Title */}
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-[#34D399] transition-colors duration-300">
          {faculty.name}
        </h3>
        <p className="text-[#10B981] font-medium text-sm md:text-base mb-1">
          {faculty.designation}
        </p>
        <p className="text-gray-400 text-xs md:text-sm mb-4">
          {faculty.position}
        </p>

        {/* Quote */}
        <div className="mb-6 relative px-4 group-hover:scale-105 transition-transform duration-300">
          <FaQuoteLeft className="absolute -top-2 left-0 text-[#10B981]/30 text-sm group-hover:text-[#10B981] transition-colors duration-300" />
          <p className="text-gray-300 italic text-sm line-clamp-2">
            {faculty.quote}
          </p>
          <FaQuoteRight className="absolute -bottom-2 right-0 text-[#10B981]/30 text-sm group-hover:text-[#10B981] transition-colors duration-300" />
        </div>

        {/* Expertise Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {faculty.expertise?.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full border border-gray-700 group-hover:border-[#10B981]/50 group-hover:bg-[#10B981]/10 group-hover:text-[#34D399] transform group-hover:scale-105 transition-all duration-300"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Contact Buttons */}
        <div className="w-full space-y-3">
          {faculty.linkedin && (
            <a
              href={faculty.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2.5 md:py-3 bg-gradient-to-r from-[#10B981] to-[#34D399] text-white rounded-2xl font-medium hover:shadow-lg hover:shadow-[#10B981]/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <FaLinkedin className="text-lg" /> Connect
            </a>
          )}
          {faculty.email && (
            <a
              href={`mailto:${faculty.email}`}
              className="block w-full py-2.5 md:py-3 bg-gray-800 text-white rounded-2xl font-medium hover:bg-gray-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <FaEnvelope className="text-lg" /> Email
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="faculty"
      ref={sectionRef}
      className="relative mt-4 py-12 md:py-20 bg-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-5 md:top-1/4 md:left-10 w-48 h-48 md:w-72 md:h-72 bg-gradient-to-br from-[#10B981] to-transparent rounded-full blur-2xl md:blur-3xl"></div>
        <div className="absolute bottom-10 right-5 md:bottom-1/4 md:right-10 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-tl from-[#34D399] to-transparent rounded-full blur-2xl md:blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          {/* Animated Divider */}
          <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
            <div className="w-12 md:w-20 h-0.5 bg-gradient-to-r from-transparent via-[#10B981] to-transparent rounded-full"></div>
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-br from-[#10B981] to-[#34D399] animate-pulse"></div>
            <div className="w-12 md:w-20 h-0.5 bg-gradient-to-r from-transparent via-[#10B981] to-transparent rounded-full"></div>
          </div>
          
          {/* Title */}
          <div className="section-title overflow-hidden mb-3 md:mb-4">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold px-4">
              <span className="text-white">Expert </span>
              <span className="bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#10B981] bg-clip-text text-transparent">
                Faculty Team
              </span>
            </h2>
          </div>
          
          {/* Description */}
          <div className="section-description overflow-hidden max-w-2xl mx-auto px-4">
            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
              Find and connect with our world-class educators across departments
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Left Side Filters - Hidden on mobile, show below on mobile */}
          {!isMobile ? (
            <div className="lg:w-1/4">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50 sticky top-6">
                {/* Search Bar */}
                <div className="mb-6">
                  <label className="block text-white font-medium mb-3 flex items-center gap-2">
                    <FaSearch /> Search Faculty
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by name, expertise..."
                      className="w-full bg-gray-900 border border-gray-700 rounded-2xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all duration-300"
                    />
                    <FaSearch className="absolute right-4 top-3.5 text-gray-500" />
                  </div>
                </div>

                {/* Filters Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium flex items-center gap-2">
                    <FaFilter /> Filters
                  </h3>
                  {(selectedDepartment !== "All" || selectedExperience !== "All" || searchTerm) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-[#10B981] hover:text-[#34D399] transition-colors duration-300"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Department Filter */}
                <div className="mb-6">
                  <h4 className="text-gray-300 text-sm font-medium mb-3">Department</h4>
                  <div className="space-y-2">
                    {departments.map((dept) => (
                      <button
                        key={dept}
                        onClick={() => setSelectedDepartment(dept)}
                        className={`w-full text-left py-2.5 px-4 rounded-2xl transition-all duration-300 flex items-center gap-3 ${
                          selectedDepartment === dept
                            ? 'bg-gradient-to-r from-[#10B981]/20 to-[#34D399]/20 text-[#34D399] border border-[#10B981]/30'
                            : 'bg-gray-900/50 text-gray-400 hover:bg-gray-800 hover:text-gray-300 border border-transparent'
                        }`}
                      >
                        <span className={`${selectedDepartment === dept ? 'text-[#10B981]' : 'text-gray-500'}`}>
                          {getDepartmentIcon(dept)}
                        </span>
                        <span className="text-sm">{dept}</span>
                        {selectedDepartment === dept && (
                          <span className="ml-auto w-2 h-2 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full"></span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experience Filter */}
                <div className="mb-6">
                  <h4 className="text-gray-300 text-sm font-medium mb-3">Experience</h4>
                  <div className="space-y-2">
                    {experienceFilters.map((exp) => (
                      <button
                        key={exp}
                        onClick={() => setSelectedExperience(exp)}
                        className={`w-full text-left py-2.5 px-4 rounded-2xl transition-all duration-300 ${
                          selectedExperience === exp
                            ? 'bg-gradient-to-r from-[#10B981]/20 to-[#34D399]/20 text-[#34D399] border border-[#10B981]/30'
                            : 'bg-gray-900/50 text-gray-400 hover:bg-gray-800 hover:text-gray-300 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{exp}</span>
                          {selectedExperience === exp && (
                            <span className="w-2 h-2 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full"></span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results Count */}
                <div className="pt-4 border-t border-gray-700/50">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">
                      {filteredFaculty.length}
                    </div>
                    <div className="text-gray-400 text-sm">
                      Faculty Members
                    </div>
                    <div className="text-gray-500 text-xs mt-2">
                      {selectedDepartment !== "All" && `Department: ${selectedDepartment}`}
                      {selectedExperience !== "All" && ` • Experience: ${selectedExperience}`}
                      {searchTerm && ` • Search: "${searchTerm}"`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Mobile Filters - Collapsible */
            <div className="mb-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-4 border border-gray-700/50">
                {/* Mobile Search */}
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search faculty..."
                      className="w-full bg-gray-900 border border-gray-700 rounded-2xl py-3 px-4 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#10B981]"
                    />
                    <FaSearch className="absolute right-4 top-3.5 text-gray-500" />
                  </div>
                </div>

                {/* Mobile Filters Row */}
                <div className="flex gap-2 mb-3">
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="flex-1 bg-gray-900 border border-gray-700 rounded-2xl py-2.5 px-3 text-white text-sm focus:outline-none focus:border-[#10B981]"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  
                  <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="flex-1 bg-gray-900 border border-gray-700 rounded-2xl py-2.5 px-3 text-white text-sm focus:outline-none focus:border-[#10B981]"
                  >
                    {experienceFilters.map((exp) => (
                      <option key={exp} value={exp}>{exp}</option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters Button */}
                {(selectedDepartment !== "All" || selectedExperience !== "All" || searchTerm) && (
                  <button
                    onClick={clearFilters}
                    className="w-full py-2.5 bg-gray-900 text-gray-400 text-sm rounded-2xl border border-gray-700 hover:text-white hover:border-[#10B981]/30 transition-all duration-300"
                  >
                    Clear Filters
                  </button>
                )}

                {/* Results Count */}
                <div className="text-center mt-3 pt-3 border-t border-gray-700/50">
                  <div className="text-sm text-gray-400">
                    Showing <span className="text-white font-bold">{filteredFaculty.length}</span> of {facultyMembers.length} faculty
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Side Content */}
          <div className={`${!isMobile ? 'lg:w-3/4' : 'w-full'}`}>
            {/* View Mode Toggle - Hidden on mobile */}
            {!isMobile && (
              <div className="flex justify-between items-center mb-6">
                <div className="text-white">
                  <span className="text-gray-400">View:</span>
                  <div className="inline-flex ml-3 gap-2">
                    <button
                      onClick={() => setViewMode('carousel')}
                      className={`px-4 py-2 rounded-full transition-all duration-300 ${
                        viewMode === 'carousel'
                          ? 'bg-gradient-to-r from-[#10B981] to-[#34D399] text-white'
                          : 'bg-gray-800 text-gray-400 hover:text-white'
                      }`}
                    >
                      Carousel
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-4 py-2 rounded-full transition-all duration-300 ${
                        viewMode === 'grid'
                          ? 'bg-gradient-to-r from-[#10B981] to-[#34D399] text-white'
                          : 'bg-gray-800 text-gray-400 hover:text-white'
                      }`}
                    >
                      Grid
                    </button>
                  </div>
                </div>

                {/* Active Filters Display */}
                <div className="flex items-center gap-2">
                  {(selectedDepartment !== "All" || selectedExperience !== "All") && (
                    <div className="text-sm text-gray-400">
                      Active filters: 
                      {selectedDepartment !== "All" && (
                        <span className="ml-2 px-2 py-1 bg-[#10B981]/10 text-[#10B981] text-xs rounded-full">
                          {selectedDepartment}
                        </span>
                      )}
                      {selectedExperience !== "All" && (
                        <span className="ml-2 px-2 py-1 bg-[#10B981]/10 text-[#10B981] text-xs rounded-full">
                          {selectedExperience}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Faculty Cards */}
            {filteredFaculty.length > 0 ? (
              viewMode === 'carousel' ? renderCarouselView() : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFaculty.map((faculty, index) => (
                    <FacultyCard 
                      key={faculty.id} 
                      faculty={faculty} 
                      isMobile={false}
                      index={index}
                      hoveredIndex={hoveredIndex}
                      setHoveredIndex={setHoveredIndex}
                    />
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-12 md:py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-800/50 flex items-center justify-center">
                  <FaSearch className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  No Faculty Found
                </h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Try adjusting your search or filters to find what you are looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-gradient-to-r from-[#10B981] to-[#34D399] text-white rounded-2xl font-medium hover:shadow-lg hover:shadow-[#10B981]/30 transition-all duration-300"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Faculty Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-12">
              {[
                { icon: <FaUsers />, value: "50+", label: "Total Faculty" },
                { icon: <FaGraduationCap />, value: "15+", label: "PhD Holders" },
                { icon: <FaBriefcase />, value: "12+", label: "Avg Experience" },
                { icon: <FaAward />, value: "100+", label: "Awards Won" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center border border-gray-700/30 hover:border-[#10B981]/30 transition-all duration-300"
                >
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-xs md:text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx global>{`
        /* Smooth transitions */
        .faculty-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faculty-card:hover {
          transform: translateY(-8px) scale(1.02);
        }

        /* Line clamp for quotes */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10B981, #34D399);
          border-radius: 3px;
        }

        /* Better focus styles */
        input:focus, select:focus, button:focus {
          outline: none;
          ring: 2px;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .section-title h2 {
            font-size: 1.75rem;
          }
          
          input, select {
            font-size: 16px; /* Prevents zoom on iOS */
          }
          
          button, a {
            min-height: 44px;
            min-width: 44px;
          }
        }

        /* Performance optimizations */
        .will-change-transform {
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default FacultySection;