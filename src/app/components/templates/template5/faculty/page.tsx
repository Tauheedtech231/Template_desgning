"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  FaLinkedin, 
  FaEnvelope, 
  FaChalkboardTeacher,
  FaBookOpen,
  FaHeart,
  FaLightbulb,
  FaHandsHelping,
  FaCompass,
  FaLeaf,
  FaGraduationCap,
  FaUsers,
  FaStar,
  FaPlay,
  FaPause
} from "react-icons/fa";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

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
  department?: string;
  bio?: string;
  skills?: string[];
}

const FacultySection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Updated faculty data with theme colors
  const facultyMembers: Faculty[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      name: "Dr. Sarah Johnson",
      position: "Dean of Academic Affairs",
      designation: "Professor of Computer Science",
      linkedin: "https://linkedin.com",
      email: "sarah.johnson@college.edu",
      quote: "Education is not the learning of facts, but the training of the mind to think.",
      expertise: ["Artificial Intelligence", "Machine Learning", "Data Science"],
      experience: "15+ Years",
      description: "Her approach to teaching is shaped by a belief that computational thinking should be accessible to everyone.",
      department: "Computer Science",
      bio: "After years in industry research, she found her true calling in helping students uncover their own curiosity.",
      skills: ["AI Research", "Curriculum Development", "Student Mentorship"]
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      name: "Prof. Michael Chen",
      position: "Department Head",
      designation: "Professor of Business Administration",
      linkedin: "https://linkedin.com",
      email: "michael.chen@college.edu",
      quote: "The classroom is where theory meets practice, and ideas become action.",
      expertise: ["Strategic Management", "Entrepreneurship", "Finance"],
      experience: "12+ Years",
      description: "Believes that business education should be grounded in ethical decision-making and real-world impact.",
      department: "Business",
      bio: "Spent a decade in corporate leadership before deciding to focus on developing the next generation of leaders.",
      skills: ["Business Strategy", "Leadership Development", "Corporate Finance"]
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      name: "Dr. Robert Williams",
      position: "Research Director",
      designation: "Professor of Engineering",
      linkedin: "https://linkedin.com",
      email: "robert.williams@college.edu",
      quote: "Engineering is the art of directing the great sources of power in nature.",
      expertise: ["Civil Engineering", "Structural Design", "Project Management"],
      experience: "18+ Years",
      description: "His teaching philosophy centers on the idea that elegant solutions emerge from understanding fundamental principles.",
      department: "Engineering",
      bio: "Finds equal joy in publishing research papers and helping a student grasp a difficult concept.",
      skills: ["Structural Analysis", "Research Methodology", "Innovation"]
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      name: "Dr. Lisa Anderson",
      position: "Director of Health Sciences",
      designation: "Professor of Nursing",
      linkedin: "https://linkedin.com",
      email: "lisa.anderson@college.edu",
      quote: "The best way to find yourself is to lose yourself in the service of others.",
      expertise: ["Public Health", "Clinical Practice", "Healthcare Management"],
      experience: "20+ Years",
      description: "Passionate about creating healthcare professionals who see patients as whole people, not just cases.",
      department: "Health Sciences",
      bio: "Combines clinical experience with a deep commitment to compassionate, patient-centered care.",
      skills: ["Healthcare Education", "Clinical Training", "Public Policy"]
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      name: "Prof. David Miller",
      position: "Director of Arts",
      designation: "Professor of Fine Arts",
      linkedin: "https://linkedin.com",
      email: "david.miller@college.edu",
      quote: "Art enables us to find ourselves and lose ourselves at the same time.",
      expertise: ["Visual Arts", "Art History", "Creative Theory"],
      experience: "14+ Years",
      description: "Encourages students to see art as a vital form of human expression and inquiry.",
      department: "Arts & Humanities",
      bio: "An exhibiting artist who believes the studio and the classroom are both places of discovery.",
      skills: ["Art Criticism", "Exhibition Curation", "Creative Direction"]
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      name: "Dr. Maria Garcia",
      position: "Department Chair",
      designation: "Professor of Psychology",
      linkedin: "https://linkedin.com",
      email: "maria.garcia@college.edu",
      quote: "Psychology helps us understand why we think, feel, and act as we do.",
      expertise: ["Cognitive Psychology", "Behavioral Science", "Research Methods"],
      experience: "16+ Years",
      description: "Focuses on helping students understand the complex interplay between mind, behavior, and environment.",
      department: "Social Sciences",
      bio: "Her research on cognitive development informs her teaching, but it's the one-on-one mentoring she values most.",
      skills: ["Psychological Assessment", "Research Design", "Statistical Analysis"]
    }
  ];

  // Personal touch icons for different faculty
  const personalIcons = [FaGraduationCap, FaUsers, FaStar, FaHeart, FaCompass, FaLeaf];

  // Animation variants
  const headingVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const slideInLeftVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideInRightVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer: Variants = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  useEffect(() => {
    // Auto-play video on component mount
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
      style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #F7F2EE 100%)" }}
    >
      {/* Hero Video Section */}
      <div className="relative w-full h-[70vh] min-h-[600px] md:h-[80vh] overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/data/team-poster.jpg"
          >
            <source src="/data/team.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>

        {/* Video Controls */}
        <button
          onClick={toggleVideoPlay}
          className="absolute bottom-8 right-8 z-20 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
        >
          {isVideoPlaying ? (
            <FaPause className="text-white text-lg group-hover:scale-110 transition-transform" />
          ) : (
            <FaPlay className="text-white text-lg group-hover:scale-110 transition-transform" />
          )}
        </button>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <motion.div 
                className="inline-flex items-center gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-white to-transparent" />
                <span className="text-sm text-white/80 tracking-widest uppercase">
                  OUR FACULTY TEAM
                </span>
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-white to-transparent" />
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Meet Our 
                <span className="block mt-4">
                  <span className="bg-gradient-to-r from-[#A17A74] to-[#C99789] bg-clip-text text-transparent">
                    Dedicated
                  </span>
                  <span className="text-white ml-4">Educators</span>
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Passionate educators committed to shaping future leaders through innovative teaching and personalized mentorship.
              </motion.p>
              
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="w-6 h-px bg-white/50"></div>
                <div className="text-sm text-white/70 tracking-widest uppercase">
                  Scroll to Explore
                </div>
                <div className="w-6 h-px bg-white/50"></div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="flex flex-col items-center">
            <div className="h-8 w-px bg-gradient-to-b from-white via-white/50 to-transparent"></div>
            <div className="w-2 h-2 rounded-full bg-white mt-2"></div>
          </div>
        </motion.div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23A17A74' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-20">
        {/* Section Header with unique left-right animation */}
        <div ref={headingRef} className="text-center mb-20">
          <motion.div 
            className="inline-flex items-center gap-4 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={headingVariants}
          >
            <motion.div 
              className="w-12 h-0.5 rounded-full bg-gradient-to-r from-transparent to-[#A17A74]"
              variants={slideInLeftVariants}
            />
            <span className="text-sm text-[#A17A74] tracking-widest uppercase font-medium">
              Distinguished Faculty
            </span>
            <motion.div 
              className="w-12 h-0.5 rounded-full bg-gradient-to-r from-[#A17A74] to-transparent"
              variants={slideInRightVariants}
            />
          </motion.div>
          
          <div className="overflow-hidden">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-[#3B3B3B] mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Expert Educators Across All Disciplines
            </motion.h2>
          </div>
          
          <motion.p 
            className="text-lg text-[#3B3B3B]/80 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Our faculty combines academic excellence with real-world experience to provide comprehensive education.
          </motion.p>
        </div>

        {/* Faculty Grid with soft rounded cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {facultyMembers.map((faculty, index) => {
            const PersonalIcon = personalIcons[index];
            
            return (
              <motion.div
                key={faculty.id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group cursor-pointer"
              >
                <div 
                  className="bg-white border border-[#EADBC8] rounded-2xl p-8 hover:shadow-xl transition-all duration-300 h-full overflow-hidden relative"
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Hover dot indicator */}
                  <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#C99789] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Profile Image with soft rounded corners */}
                  <div className="relative mb-6 flex justify-center">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <Image
                        src={faculty.image}
                        alt={faculty.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="128px"
                      />
                      {/* Soft gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#A17A74]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Personal icon badge */}
                    <div className="absolute -bottom-2 right-8 w-12 h-12 rounded-full bg-white border-2 border-[#A17A74] flex items-center justify-center shadow-lg">
                      <PersonalIcon className="text-[#A17A74] text-lg" />
                    </div>
                  </div>

                  {/* Experience badge */}
                  <div className="mb-6 flex justify-center">
                    <div className="inline-block px-4 py-2 bg-[#F7F2EE] border border-[#EADBC8] rounded-full text-sm text-[#A17A74] font-medium">
                      {faculty.experience}
                    </div>
                  </div>

                  {/* Name and Designation */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-[#A17A74] mb-2 group-hover:text-[#C99789] transition-colors duration-300">
                      {faculty.name}
                    </h3>
                    <p className="text-[#3B3B3B] font-medium mb-1">
                      {faculty.designation}
                    </p>
                    <p className="text-sm text-[#3B3B3B]/70">
                      {faculty.position}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-[#3B3B3B]/80 leading-relaxed text-center">
                      {faculty.description}
                    </p>
                  </div>

                  {/* Expertise tags with soft rounded corners */}
                  {faculty.expertise && faculty.expertise.length > 0 && (
                    <div className="mb-6 flex flex-wrap justify-center gap-2">
                      {faculty.expertise.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-[#F7F2EE] border border-[#EADBC8] rounded-full text-xs text-[#3B3B3B] hover:bg-[#A17A74] hover:text-white transition-colors duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Contact links with rounded icons */}
                  <div className="flex justify-center space-x-4 pt-4 border-t border-[#EADBC8]">
                    {faculty.linkedin && (
                      <a
                        href={faculty.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#F7F2EE] border border-[#EADBC8] flex items-center justify-center hover:bg-[#A17A74] hover:border-[#A17A74] group/link transition-all duration-300"
                      >
                        <FaLinkedin className="text-[#3B3B3B] group-hover/link:text-white text-sm transition-colors duration-300" />
                      </a>
                    )}
                    
                    {faculty.email && (
                      <a
                        href={`mailto:${faculty.email}`}
                        className="w-10 h-10 rounded-full bg-[#F7F2EE] border border-[#EADBC8] flex items-center justify-center hover:bg-[#C99789] hover:border-[#C99789] group/link transition-all duration-300"
                      >
                        <FaEnvelope className="text-[#3B3B3B] group-hover/link:text-white text-sm transition-colors duration-300" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Teaching Philosophy Section */}
        <motion.div 
          className="max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white border border-[#EADBC8] rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-8 h-0.5 rounded-full bg-gradient-to-r from-transparent to-[#A17A74]"></div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A17A74] to-[#C99789] flex items-center justify-center">
                  <FaChalkboardTeacher className="text-white text-lg" />
                </div>
                <div className="w-8 h-0.5 rounded-full bg-gradient-to-r from-[#A17A74] to-transparent"></div>
              </div>
              <h2 className="text-3xl font-bold text-[#3B3B3B] mb-4">
                Our Teaching <span className="text-[#A17A74]">Philosophy</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Philosophy 1 */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F7F2EE] to-white border border-[#EADBC8] flex items-center justify-center mx-auto mb-4">
                  <FaHeart className="text-[#A17A74] text-xl" />
                </div>
                <h3 className="text-lg font-bold text-[#3B3B3B] mb-3">Student-Centered Approach</h3>
                <p className="text-[#3B3B3B]/80">
                  We believe in tailoring education to individual needs and learning styles.
                </p>
              </div>
              
              {/* Philosophy 2 */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F7F2EE] to-white border border-[#EADBC8] flex items-center justify-center mx-auto mb-4">
                  <FaLightbulb className="text-[#C99789] text-xl" />
                </div>
                <h3 className="text-lg font-bold text-[#3B3B3B] mb-3">Innovative Methods</h3>
                <p className="text-[#3B3B3B]/80">
                  Combining traditional wisdom with modern teaching techniques for optimal results.
                </p>
              </div>
              
              {/* Philosophy 3 */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F7F2EE] to-white border border-[#EADBC8] flex items-center justify-center mx-auto mb-4">
                  <FaHandsHelping className="text-[#A17A74] text-xl" />
                </div>
                <h3 className="text-lg font-bold text-[#3B3B3B] mb-3">Mentorship Focus</h3>
                <p className="text-[#3B3B3B]/80">
                  Going beyond teaching to provide guidance, support, and career development.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Closing Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-6 mb-8">
            <div className="w-16 h-0.5 rounded-full bg-gradient-to-r from-transparent to-[#EADBC8]"></div>
            <span className="text-sm text-[#A17A74] tracking-widest uppercase font-medium">
              Excellence in Education
            </span>
            <div className="w-16 h-0.5 rounded-full bg-gradient-to-r from-[#EADBC8] to-transparent"></div>
          </div>
          <p className="text-lg text-[#3B3B3B]/80 max-w-xl mx-auto leading-relaxed">
            Dedicated faculty committed to nurturing the next generation of thinkers, leaders, and innovators.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FacultySection;