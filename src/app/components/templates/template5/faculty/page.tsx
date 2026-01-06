"use client";

import React, { useState } from "react";
import { 
  FaLinkedin, 
  
  FaEnvelope, 
 
  FaChalkboardTeacher,
 
  FaBookOpen,
 
  FaHeart,
  FaLightbulb,
  FaHandsHelping,
  FaCompass,
  FaLeaf
} from "react-icons/fa";
import Image from "next/image";

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
  
  // Updated faculty data with human, personal bios
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
      description: "Her approach to teaching is shaped by a belief that computational thinking should be accessible to everyone, not just specialists.",
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
      bio: "Spent a decade in corporate leadership before deciding to focus on developing the next generation of thoughtful leaders.",
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
      bio: "Finds equal joy in publishing research papers and helping a student grasp a difficult concept for the first time.",
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
      bio: "Combines clinical experience with a deep commitment to compassionate, patient-centered care in her teaching.",
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
      description: "Encourages students to see art not as decoration, but as a vital form of human expression and inquiry.",
      department: "Arts & Humanities",
      bio: "An exhibiting artist who believes the studio and the classroom are both places of discovery and transformation.",
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
  const personalIcons = [FaHeart, FaCompass, FaLightbulb, FaHandsHelping, FaLeaf, FaBookOpen];

  return (
    <section
      id="faculty"
      className="relative py-20 bg-[#FAFAFA] font-sans"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header - refined typography */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#E0E0E0]"></div>
            <div className="text-[13px] text-[#8A8A8A] tracking-[0.3em] uppercase">
              Our Educators
            </div>
            <div className="w-8 h-px bg-[#E0E0E0]"></div>
          </div>
          
          <h1 className="text-[30px] md:text-[34px] font-serif font-medium text-[#1E1E1E] mb-6 leading-[1.3]">
            Mentors & <span className="text-[#2F5D62]">Guides</span>
          </h1>
          
          <p className="text-[17px] md:text-[18px] text-[#4A4A4A] max-w-2xl mx-auto leading-[1.75] px-4">
            People who bring more than credentials to the classroom—they bring perspective, 
            patience, and a genuine commitment to student growth.
          </p>
        </div>

        {/* Faculty Grid - organic, non-uniform layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {facultyMembers.map((faculty, index) => {
            const PersonalIcon = personalIcons[index];
            // Vary card styles slightly for organic feel
            const cardStyle = index % 3 === 0 ? "border-t-[3px] border-[#2F5D62]" : 
                            index % 3 === 1 ? "border-l-[3px] border-[#2F5D62]" : 
                            "border-b-[3px] border-[#2F5D62]";
            
            // Vary text alignment for natural feel
            const textAlignment = index % 2 === 0 ? "text-left" : "text-center";
            
            return (
              <div
                key={faculty.id}
                className={`faculty-card bg-white border border-[#EDEDED] transition-all duration-300 overflow-hidden hover:border-[#E0E0E0] ${cardStyle} ${textAlignment}`}
                onClick={() => setActiveIndex(index)}
                style={{
                  // Slight variations in padding for organic feel
                  paddingTop: index % 4 === 0 ? '2rem' : '1.5rem',
                  paddingBottom: index % 4 === 2 ? '2.5rem' : '2rem',
                }}
              >
                <div className="relative px-6">
                  {/* Avatar with organic positioning */}
                  <div className={`relative mb-6 ${textAlignment === 'text-center' ? 'flex justify-center' : ''}`}>
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] mx-auto">
                      <Image
                        src={faculty.image}
                        alt={faculty.name}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>
                    
                    {/* Personal touch icon */}
                    <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white border border-[#EDEDED] flex items-center justify-center shadow-sm">
                      <PersonalIcon className="text-[#2F5D62] text-sm" />
                    </div>

                    {/* Experience - organic placement */}
                    <div className={`mt-4 ${textAlignment === 'text-center' ? 'mx-auto' : ''}`}>
                      <div className="inline-block px-3 py-1.5 bg-[#FAFAFA] border border-[#EDEDED] rounded-sm text-[13px] text-[#6E6E6E]">
                        {faculty.experience}
                      </div>
                    </div>
                  </div>

                  {/* Name and designation - human typography */}
                  <div className="mb-6">
                    {/* Name - Merriweather 18-20px, Weight 500 */}
                    <h3 className="text-[18px] md:text-[20px] font-serif font-medium text-[#1E1E1E] mb-2">
                      {faculty.name}
                    </h3>
                    <div className="mb-4">
                      {/* Designation - Inter 14-15px, Color #6E6E6E */}
                      <p className="text-[14px] md:text-[15px] text-[#6E6E6E] font-medium mb-1">
                        {faculty.designation}
                      </p>
                      <p className="text-[13px] text-[#8A8A8A]">
                        {faculty.position}
                      </p>
                    </div>
                  </div>

                  {/* Personal bio - natural language, varying lengths */}
                  <div className="mb-6">
                    {/* Bio - Inter 15-16px, Line-height 1.6, Color #4A4A4A */}
                    <p className="text-[15px] md:text-[16px] text-[#4A4A4A] leading-[1.6] mb-3">
                      {faculty.description}
                    </p>
                    {faculty.bio && (
                      <p className="text-[14px] text-[#6E6E6E] leading-[1.6]">
                        {faculty.bio}
                      </p>
                    )}
                  </div>

                  {/* Expertise - minimal presentation */}
                  {(faculty.expertise && faculty.expertise.length > 0) && (
                    <div className="mb-6">
                      <div className={`flex flex-wrap gap-2 ${textAlignment === 'text-center' ? 'justify-center' : ''}`}>
                        {faculty.expertise.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-[#FAFAFA] text-[#4A4A4A] text-[12px] rounded-sm border border-[#EDEDED]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact links - subtle and refined */}
                  <div className={`space-y-3 ${textAlignment === 'text-center' ? 'text-center' : ''}`}>
                    {faculty.linkedin && (
                      <a
                        href={faculty.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-[13px] text-[#4A4A4A] hover:text-[#2F5D62] transition-colors duration-200"
                      >
                        <FaLinkedin className="text-[14px]" />
                        <span>Connect</span>
                      </a>
                    )}
                    
                    {faculty.email && (
                      <a
                        href={`mailto:${faculty.email}`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-[13px] text-[#4A4A4A] hover:text-[#2F5D62] transition-colors duration-200"
                      >
                        <FaEnvelope className="text-[14px]" />
                        <span>Email</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Faculty Philosophy - replacing highlights with a story */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="bg-white border border-[#EDEDED] rounded-sm p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-[#E0E0E0]"></div>
                <FaChalkboardTeacher className="text-[#2F5D62] text-lg" />
                <div className="w-6 h-px bg-[#E0E0E0]"></div>
              </div>
              <h2 className="text-[22px] font-serif font-medium text-[#1E1E1E] mb-4">
                Our approach to <span className="text-[#2F5D62]">teaching</span>
              </h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-sm bg-[#FAFAFA] border border-[#EDEDED] flex items-center justify-center">
                    <FaHeart className="text-[#2F5D62] text-sm" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[15px] font-medium text-[#1E1E1E] mb-2">
                    Relationship first
                  </h3>
                  <p className="text-[15px] md:text-[16px] text-[#4A4A4A] leading-[1.6]">
                    We believe meaningful learning happens in the context of trust and connection. 
                    Our faculty prioritize getting to know students as individuals.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-sm bg-[#FAFAFA] border border-[#EDEDED] flex items-center justify-center">
                    <FaCompass className="text-[#1E1E1E] text-sm" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[15px] font-medium text-[#1E1E1E] mb-2">
                    Practical wisdom
                  </h3>
                  <p className="text-[15px] md:text-[16px] text-[#4A4A4A] leading-[1.6]">
                    Balancing theoretical knowledge with real-world application, 
                    ensuring students graduate with both understanding and capability.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-sm bg-[#FAFAFA] border border-[#EDEDED] flex items-center justify-center">
                    <FaLightbulb className="text-[#1E1E1E] text-sm" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[15px] font-medium text-[#1E1E1E] mb-2">
                    Curiosity-driven learning
                  </h3>
                  <p className="text-[15px] md:text-[16px] text-[#4A4A4A] leading-[1.6]">
                    Encouraging questions and exploration over rote memorization, 
                    creating classrooms where curiosity is the starting point for everything.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Closing statement */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#F0F0F0]"></div>
            <div className="text-[13px] text-[#8A8A8A] tracking-[0.2em] uppercase">
              Across Departments
            </div>
            <div className="w-12 h-px bg-[#F0F0F0]"></div>
          </div>
          <p className="text-[16px] text-[#4A4A4A] max-w-xl mx-auto leading-[1.6]">
            From arts to sciences, business to healthcare—our educators share a common commitment 
            to thoughtful, student-centered teaching.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FacultySection;