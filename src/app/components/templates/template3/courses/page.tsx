'use client';

import React, { useState, useEffect, useRef } from "react";
import { 
  FaSearch,
  FaGraduationCap,
  FaChartLine,
  FaBookOpen,
  FaClock,
  FaUserFriends,
  FaStar,
  FaArrowRight,
  FaTimes,
  FaCheckCircle,
  FaCertificate,
  FaHeart,
  FaFilter
} from "react-icons/fa";
import Image from "next/image";

// Import GSAP for animations
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Define TypeScript interface for course data
interface Course {
  id: number;
  image: string;
  title: string;
  participants: number;
  duration: string;
  instructor: string;
  stream: string;
  rating: number;
  description: string;
  features: string[];
  board: string;
  price: string;
  subjects: string[];
  exam: string;
}

// Programs array
const programs = [
  "FSc Pre-Engineering",
  "FSc Pre-Medical",
  "ICS (Computer Science)",
  "ICS (Statistics)",
  "I.Com (Commerce)",
  "FA (Humanities)",
  "FA (General Arts)",
  "FSc General Science"
];

const CoursesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const leftTitleRef = useRef<HTMLDivElement>(null);
  const rightTitleRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStream, setSelectedStream] = useState<string>("All");
  const [selectedBoard, setSelectedBoard] = useState<string>("All");
  const [selectedProgram, setSelectedProgram] = useState<string>("All");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  // Streams for 12th class
  const streams = ["All", "Science", "Commerce", "Arts/Humanities", "Medical", "Non-Medical"];

  // Education Boards
  const boards = ["All", "CBSE", "ICSE", "State Board", "International", "NIOS"];

  // 12th Class Courses Data
  const coursesData: Course[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop",
      title: "Class 12 Physics Complete Course",
      participants: 3500,
      duration: "9 Months",
      instructor: "Dr. Ravi Sharma",
      stream: "Science",
      rating: 4.9,
      description: "Comprehensive physics course covering mechanics, optics, electromagnetism, and modern physics with practical demonstrations.",
      features: ["Video Lectures", "Practice Problems", "Mock Tests", "Doubt Support"],
      board: "CBSE",
      price: "₹8,999",
      subjects: ["Physics", "Practical Lab"],
      exam: "Board + JEE/NEET"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop",
      title: "Class 12 Chemistry Mastery",
      participants: 2800,
      duration: "8 Months",
      instructor: "Prof. Anjali Verma",
      stream: "Science",
      rating: 4.8,
      description: "Complete chemistry syllabus with organic, inorganic, and physical chemistry concepts explained through animations.",
      features: ["3D Animations", "Reaction Mechanisms", "Sample Papers", "Revision Notes"],
      board: "CBSE",
      price: "₹7,999",
      subjects: ["Chemistry", "Organic Chemistry"],
      exam: "Board + Competitive"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop",
      title: "Mathematics for Class 12",
      participants: 4200,
      duration: "10 Months",
      instructor: "Dr. Sanjay Kumar",
      stream: "Science",
      rating: 4.9,
      description: "Advanced mathematics course covering calculus, algebra, probability, and vectors with problem-solving techniques.",
      features: ["1000+ Problems", "Shortcut Methods", "Previous Year Papers", "Online Tests"],
      board: "CBSE",
      price: "₹9,499",
      subjects: ["Mathematics", "Calculus", "Algebra"],
      exam: "Board + JEE"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop",
      title: "Biology Complete Syllabus",
      participants: 3200,
      duration: "9 Months",
      instructor: "Dr. Priya Singh",
      stream: "Medical",
      rating: 4.8,
      description: "Detailed biology course covering human physiology, genetics, biotechnology, and ecology with diagrams.",
      features: ["Diagram-based Learning", "NCERT Solutions", "NEET Preparation", "Quick Revisions"],
      board: "CBSE",
      price: "₹8,499",
      subjects: ["Biology", "Zoology", "Botany"],
      exam: "Board + NEET"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop",
      title: "Accountancy & Business Studies",
      participants: 2500,
      duration: "8 Months",
      instructor: "CA Rohit Mehta",
      stream: "Commerce",
      rating: 4.7,
      description: "Complete commerce course covering accounting principles, business laws, and financial management.",
      features: ["Case Studies", "Practical Accounting", "Project Work", "CA Foundation Prep"],
      board: "CBSE",
      price: "₹7,499",
      subjects: ["Accountancy", "Business Studies", "Economics"],
      exam: "Board + CA/CS"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop",
      title: "Economics for Class 12",
      participants: 1800,
      duration: "7 Months",
      instructor: "Prof. Sameer Joshi",
      stream: "Commerce",
      rating: 4.6,
      description: "Micro and macro economics concepts with real-world applications and current economic scenario analysis.",
      features: ["Current Affairs", "Data Interpretation", "Graphs & Charts", "Case Studies"],
      board: "CBSE",
      price: "₹6,999",
      subjects: ["Economics", "Statistics"],
      exam: "Board"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&auto=format&fit=crop",
      title: "Computer Science with Python",
      participants: 2200,
      duration: "8 Months",
      instructor: "Prof. Arvind Patel",
      stream: "Science",
      rating: 4.8,
      description: "Python programming, database management, networking, and web development concepts for class 12.",
      features: ["Coding Exercises", "Projects", "Debugging Sessions", "Placement Prep"],
      board: "CBSE",
      price: "₹8,999",
      subjects: ["Computer Science", "Python", "MySQL"],
      exam: "Board"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&auto=format&fit=crop",
      title: "English Literature & Language",
      participants: 3000,
      duration: "7 Months",
      instructor: "Prof. Meera Nair",
      stream: "Arts/Humanities",
      rating: 4.7,
      description: "Complete English course covering literature, writing skills, comprehension, and communication skills.",
      features: ["Writing Practice", "Literature Analysis", "Speaking Sessions", "Grammar Exercises"],
      board: "CBSE",
      price: "₹5,999",
      subjects: ["English", "Literature", "Writing Skills"],
      exam: "Board"
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&auto=format&fit=crop",
      title: "History & Political Science",
      participants: 1500,
      duration: "8 Months",
      instructor: "Dr. Vikram Sen",
      stream: "Arts/Humanities",
      rating: 4.6,
      description: "World history, Indian history, political theories, and constitutional framework with maps and timelines.",
      features: ["Map Work", "Timeline Charts", "Current Politics", "Answer Writing"],
      board: "CBSE",
      price: "₹6,499",
      subjects: ["History", "Political Science", "Geography"],
      exam: "Board"
    },
    {
      id: 10,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop",
      title: "Hindi Sahitya & Vyakaran",
      participants: 2000,
      duration: "7 Months",
      instructor: "Dr. Suman Gupta",
      stream: "Arts/Humanities",
      rating: 4.7,
      description: "Complete Hindi literature and grammar course with poetry analysis, prose, and writing practice.",
      features: ["Poetry Sessions", "Grammar Drills", "Writing Practice", "Oral Tests"],
      board: "CBSE",
      price: "₹5,499",
      subjects: ["Hindi", "Sahitya", "Vyakaran"],
      exam: "Board"
    },
    {
      id: 11,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop",
      title: "Physical Education",
      participants: 1200,
      duration: "6 Months",
      instructor: "Coach Rajesh Yadav",
      stream: "Non-Medical",
      rating: 4.5,
      description: "Sports science, nutrition, training methods, and practical demonstrations for physical education.",
      features: ["Practical Videos", "Training Plans", "Nutrition Guide", "Sports Psychology"],
      board: "CBSE",
      price: "₹4,999",
      subjects: ["Physical Education", "Sports Science"],
      exam: "Board"
    },
    {
      id: 12,
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop",
      title: "Psychology for Class 12",
      participants: 1600,
      duration: "7 Months",
      instructor: "Dr. Ananya Roy",
      stream: "Arts/Humanities",
      rating: 4.7,
      description: "Introduction to psychology, human behavior, personality theories, and psychological disorders.",
      features: ["Case Studies", "Psychology Tests", "Research Methods", "Counseling Basics"],
      board: "CBSE",
      price: "₹6,999",
      subjects: ["Psychology", "Human Behavior"],
      exam: "Board"
    }
  ];

  // Initialize filtered courses
  useEffect(() => {
    setFilteredCourses(coursesData);
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let results = coursesData;

    // Apply search filter
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      results = results.filter(course =>
        course.title.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term) ||
        course.subjects.some(subject => subject.toLowerCase().includes(term)) ||
        course.stream.toLowerCase().includes(term) ||
        course.board.toLowerCase().includes(term) ||
        (selectedProgram !== "All" && course.title.toLowerCase().includes(selectedProgram.toLowerCase()))
      );
    }

    // Apply stream filter
    if (selectedStream !== "All") {
      results = results.filter(course => course.stream === selectedStream);
    }

    // Apply board filter
    if (selectedBoard !== "All") {
      results = results.filter(course => course.board === selectedBoard);
    }

    // Apply program filter
    if (selectedProgram !== "All") {
      results = results.filter(course => 
        course.stream.toLowerCase().includes(selectedProgram.toLowerCase()) ||
        course.title.toLowerCase().includes(selectedProgram.toLowerCase())
      );
    }

    setFilteredCourses(results);
  }, [searchTerm, selectedStream, selectedBoard, selectedProgram]);

  // Handle popular search click
  const handlePopularSearch = (term: string) => {
    setSearchTerm(term);
    setShowSuggestions(false);
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  // Handle program click
  const handleProgramClick = (program: string) => {
    setSelectedProgram(program);
    setSearchTerm("");
    setSelectedStream("All");
    setSelectedBoard("All");
    setShowSuggestions(false);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedStream("All");
    setSelectedBoard("All");
    setSelectedProgram("All");
    setShowSuggestions(false);
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        searchRef.current && 
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Animation effects
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation - split into left and right parts
      gsap.fromTo(
        leftTitleRef.current,
        { 
          x: -100, 
          opacity: 0,
          filter: "blur(10px)"
        },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          }
        }
      );

      gsap.fromTo(
        rightTitleRef.current,
        { 
          x: 100, 
          opacity: 0,
          filter: "blur(10px)"
        },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          }
        }
      );

      // Search bar animation
      gsap.fromTo(
        ".search-container",
        { 
          scale: 0.9, 
          opacity: 0,
          y: 30
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          }
        }
      );

      // Program cards animation
      gsap.fromTo(
        ".program-card",
        { 
          opacity: 0, 
          scale: 0.8,
          y: 20
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          }
        }
      );

      // Filter buttons animation
      gsap.fromTo(
        ".filter-btn",
        { 
          opacity: 0, 
          scale: 0.8,
          y: 20
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          }
        }
      );

      // Available Courses heading animation (from right)
      gsap.fromTo(
        ".available-courses-heading",
        { 
          x: 50, 
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      // Course cards animation
      gsap.fromTo(
        ".course-card",
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
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // Stats section animation (from left)
      gsap.fromTo(
        ".stats-section",
        { 
          x: -50, 
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mt-4 py-8 md:py-16 bg-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-10 md:mb-14">
          {/* Animated Divider */}
          <div className="flex items-center justify-center gap-3 mb-5 md:mb-7">
            <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-700 to-transparent rounded-full"></div>
            <div className="w-2 h-2 rounded-full bg-gray-600 animate-pulse"></div>
            <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-700 to-transparent rounded-full"></div>
          </div>
          
          {/* Title with split animation */}
         <div className="section-title overflow-hidden mb-4 md:mb-5">
  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
    <span
      ref={leftTitleRef}
      className="text-white inline-block mr-2"
    >
      Our
    </span>
    <span
      ref={rightTitleRef}
      className="text-emerald-500 inline-block"
    >
      Courses
    </span>
  </h1>
</div>

          
          {/* Description */}
          <div className="overflow-hidden max-w-3xl mx-auto mb-6 md:mb-10">
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
              Comprehensive learning solutions for CBSE, ICSE, and State Boards. Prepare for board exams and competitive tests with expert guidance.
            </p>
          </div>

          {/* Search Bar */}
          <div className="search-container max-w-3xl mx-auto mb-6 md:mb-8">
            <div className="relative" ref={suggestionsRef}>
              <div className="relative">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search courses by subject, stream, or board..."
                  className="w-full bg-gray-900 border-2 border-gray-800 rounded-3xl py-3 md:py-4 pl-12 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-900/30 transition-all duration-300 text-base md:text-lg"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4 md:w-5 md:h-5" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-white transition-colors duration-300"
                  >
                    <FaTimes className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                )}
              </div>

              {/* Search Suggestions - Fixed overlapping issue */}
              {showSuggestions && searchTerm && filteredCourses.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-black border border-gray-800 rounded-2xl shadow-2xl z-50 max-h-80 md:max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-800">
                    <h3 className="text-white font-medium text-base flex items-center gap-2">
                      <FaSearch className="text-emerald-500 w-4 h-4" />
                      Course Suggestions ({filteredCourses.slice(0, 5).length})
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-800">
                    {filteredCourses.slice(0, 5).map((course) => (
                      <button
                        key={course.id}
                        onClick={() => {
                          setSearchTerm(course.title);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left p-4 hover:bg-gray-900 transition-all duration-300"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center">
                            <FaBookOpen className="text-emerald-500 w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium text-sm md:text-base mb-1">{course.title}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-emerald-500 bg-emerald-900/20 px-2 py-1 rounded-full">
                                {course.stream}
                              </span>
                              <span className="text-xs text-gray-500">•</span>
                              <span className="text-xs text-gray-500">{course.board}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Programs Section */}
        

          {/* Stream Filters */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-base md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 justify-center">
              <FaFilter className="text-emerald-500 w-4 h-4 md:w-5 md:h-5" />
              Choose Your Stream
            </h3>
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
              {streams.map((stream) => (
                <button
                  key={stream}
                  onClick={() => {
                    setSelectedStream(stream);
                    setSelectedProgram("All");
                  }}
                  className={`filter-btn px-4 py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 text-sm md:text-base ${
                    selectedStream === stream
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/30 border-2 border-emerald-500"
                      : "bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white border-2 border-gray-800"
                  }`}
                >
                  {stream}
                </button>
              ))}
            </div>
          </div>

          {/* Board Filters */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-base md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 justify-center">
              <FaFilter className="text-emerald-500 w-4 h-4 md:w-5 md:h-5" />
              Education Board
            </h3>
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
              {boards.map((board) => (
                <button
                  key={board}
                  onClick={() => setSelectedBoard(board)}
                  className={`filter-btn px-4 py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 text-sm md:text-base ${
                    selectedBoard === board
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/30 border-2 border-emerald-500"
                      : "bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white border-2 border-gray-800"
                  }`}
                >
                  {board}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedStream !== "All" || selectedBoard !== "All" || selectedProgram !== "All") && (
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
              <span className="text-gray-500 text-xs md:text-sm">Active filters:</span>
              <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center">
                {searchTerm && (
                  <span className="px-3 py-1.5 bg-emerald-900/20 text-emerald-500 text-xs md:text-sm rounded-full border border-emerald-900/30 flex items-center gap-1.5">
                    Search: {searchTerm}
                    <button
                      onClick={() => setSearchTerm("")}
                      className="text-emerald-500 hover:text-white"
                    >
                      <FaTimes className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    </button>
                  </span>
                )}
                {selectedProgram !== "All" && (
                  <span className="px-3 py-1.5 bg-emerald-900/20 text-emerald-500 text-xs md:text-sm rounded-full border border-emerald-900/30 flex items-center gap-1.5">
                    Program: {selectedProgram}
                    <button
                      onClick={() => setSelectedProgram("All")}
                      className="text-emerald-500 hover:text-white"
                    >
                      <FaTimes className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    </button>
                  </span>
                )}
                {selectedStream !== "All" && (
                  <span className="px-3 py-1.5 bg-emerald-900/20 text-emerald-500 text-xs md:text-sm rounded-full border border-emerald-900/30 flex items-center gap-1.5">
                    Stream: {selectedStream}
                    <button
                      onClick={() => setSelectedStream("All")}
                      className="text-emerald-500 hover:text-white"
                    >
                      <FaTimes className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    </button>
                  </span>
                )}
                {selectedBoard !== "All" && (
                  <span className="px-3 py-1.5 bg-emerald-900/20 text-emerald-500 text-xs md:text-sm rounded-full border border-emerald-900/30 flex items-center gap-1.5">
                    Board: {selectedBoard}
                    <button
                      onClick={() => setSelectedBoard("All")}
                      className="text-emerald-500 hover:text-white"
                    >
                      <FaTimes className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="px-3 py-1.5 text-gray-500 text-xs md:text-sm hover:text-white transition-colors duration-300"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-3 md:gap-4 available-courses-heading">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
              Available Courses
            </h2>
            <p className="text-gray-500 mt-1 md:mt-2 text-sm md:text-base">
              Showing <span className="text-white font-bold">{filteredCourses.length}</span> of {coursesData.length} courses
            </p>
          </div>
          
          <div className="flex items-center gap-3 md:gap-4">
            <div className="text-gray-500 text-xs md:text-sm">
              {searchTerm && `Search: "${searchTerm}"`}
              {selectedProgram !== "All" && ` • Program: ${selectedProgram}`}
              {selectedStream !== "All" && ` • Stream: ${selectedStream}`}
              {selectedBoard !== "All" && ` • Board: ${selectedBoard}`}
            </div>
            {(searchTerm || selectedStream !== "All" || selectedBoard !== "All" || selectedProgram !== "All") && (
              <button
                onClick={clearFilters}
                className="px-3 py-1.5 md:px-4 md:py-2 text-gray-500 hover:text-white transition-colors duration-300 text-xs md:text-sm rounded-full border border-gray-800 hover:border-gray-700"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="course-card group bg-gray-900 border-2 border-gray-800 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-emerald-900/20 transition-all duration-500 overflow-hidden hover:-translate-y-1 md:hover:-translate-y-2"
              >
                {/* Course Image */}
                <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Stream Badge */}
                  <div className="absolute top-3 left-3 md:top-4 md:left-4">
                    <span className="px-2.5 py-1 bg-black/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                      {course.stream}
                    </span>
                  </div>

                  {/* Board Badge */}
                  <div className="absolute top-3 right-3 md:top-4 md:right-4">
                    <span className="px-2.5 py-1 bg-emerald-600 text-white text-xs font-medium rounded-full">
                      {course.board}
                    </span>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4">
                    <span className="px-3 py-1.5 md:px-4 md:py-2 bg-black/80 backdrop-blur-sm text-white text-sm md:text-base font-bold rounded-full">
                      {course.price}
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-4 md:p-6">
                  {/* Title and Rating */}
                  <div className="mb-3 md:mb-4">
                    <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-emerald-400 transition-colors duration-300 line-clamp-2">
                      {course.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`w-3 h-3 md:w-4 md:h-4 ${i < Math.floor(course.rating) ? "text-yellow-400" : "text-gray-700"} mr-0.5 md:mr-1`}
                          />
                        ))}
                        <span className="ml-1 md:ml-2 text-sm font-medium text-white">
                          {course.rating.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500 text-xs md:text-sm">
                        <FaUserFriends className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                        {course.participants}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed line-clamp-2">
                    {course.description}
                  </p>

                  {/* Subjects */}
                  <div className="mb-4 md:mb-6">
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {course.subjects.slice(0, 3).map((subject, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                        >
                          {subject}
                        </span>
                      ))}
                      {course.subjects.length > 3 && (
                        <span className="px-2.5 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                          +{course.subjects.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="flex items-center justify-between text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
                    <div className="flex items-center">
                      <FaClock className="text-emerald-500 w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium text-sm">{course.instructor}</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4 md:mb-6">
                    <div className="space-y-1.5 md:space-y-2">
                      {course.features.slice(0, 2).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 md:gap-2">
                          <FaCheckCircle className="text-emerald-500 w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                          <span className="text-xs md:text-sm text-gray-300 line-clamp-1">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full py-2.5 md:py-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-900/30 transform hover:-translate-y-0.5 md:hover:-translate-y-1 transition-all duration-300 font-bold flex items-center justify-center text-sm md:text-base">
                    <span>View Details</span>
                    <FaArrowRight className="ml-2 md:ml-3 w-3 h-3 md:w-4 md:h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 md:py-20">
            <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 rounded-full bg-gray-900 border-2 border-gray-800 flex items-center justify-center">
              <FaSearch className="w-6 h-6 md:w-10 md:h-10 text-gray-600" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
              No Courses Found
            </h3>
            <p className="text-gray-500 mb-6 md:mb-8 max-w-md mx-auto text-sm md:text-base">
              Try adjusting your search or filters to find what you are looking for.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 md:px-8 md:py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-900/30 transition-all duration-300 text-sm md:text-base"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Stats Section */}
        <div className="stats-section bg-gray-900 border-2 border-gray-800 rounded-3xl p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: <FaGraduationCap />, value: "50K+", label: "Students Enrolled" },
              { icon: <FaUserFriends />, value: "100+", label: "Expert Faculty" },
              { icon: <FaChartLine />, value: "95%", label: "Pass Rate" },
              { icon: <FaCertificate />, value: "12+", label: "Subjects Covered" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 rounded-full bg-gray-800 flex items-center justify-center">
                  <div className="text-xl md:text-2xl text-emerald-500">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">{stat.value}</div>
                <div className="text-gray-500 text-xs md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        /* Smooth transitions */
        .course-card, .program-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Line clamp for descriptions */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom scrollbar for suggestions */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #059669;
          border-radius: 10px;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .section-title h1 {
            font-size: 1.75rem;
          }
          
          input {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
};

export default CoursesSection;