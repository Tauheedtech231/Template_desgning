"use client";

import React, { useState } from "react";
import { 
  FaLinkedin, 
  FaQuoteLeft, 
  FaQuoteRight, 
  FaEnvelope, 
  FaBriefcase, 
  FaGraduationCap, 
  FaChalkboardTeacher,
  FaAward,
  FaBookOpen,
  FaUsers
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
  
  // Generic faculty data
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
      description: "Former Google AI researcher with extensive industry experience",
      department: "Computer Science",
      bio: "PhD in Computer Science from Stanford University",
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
      quote: "Success in business requires training, discipline, and hard work.",
      expertise: ["Strategic Management", "Entrepreneurship", "Finance"],
      experience: "12+ Years",
      description: "Former Fortune 500 executive turned educator",
      department: "Business",
      bio: "MBA from Harvard Business School",
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
      description: "Award-winning engineer with multiple patents",
      department: "Engineering",
      bio: "PhD in Civil Engineering from MIT",
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
      description: "Former hospital administrator and clinical educator",
      department: "Health Sciences",
      bio: "Doctor of Nursing Practice from Johns Hopkins",
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
      description: "Internationally exhibited artist and curator",
      department: "Arts & Humanities",
      bio: "MFA from Rhode Island School of Design",
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
      description: "Published researcher and clinical psychologist",
      department: "Social Sciences",
      bio: "PhD in Clinical Psychology from University of Chicago",
      skills: ["Psychological Assessment", "Research Design", "Statistical Analysis"]
    }
  ];

  return (
    <section
      id="faculty"
      className="relative py-20 bg-[#F1F5F9]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#064E3B]/10 rounded-full mb-6">
            <FaChalkboardTeacher className="text-[#064E3B]" />
            <span className="text-[#064E3B] text-sm font-medium uppercase tracking-wider">
              Expert Faculty
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-6">
            Meet Our Distinguished{" "}
            <span className="text-[#064E3B]">Faculty</span>
          </h2>
          
          <p className="text-lg text-[#475569] max-w-3xl mx-auto leading-relaxed">
            Our faculty members bring a wealth of industry experience and academic excellence to provide quality education and mentorship.
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {facultyMembers.map((faculty, index) => (
            <div
              key={faculty.id}
              className={`faculty-card bg-white rounded-xl border ${
                activeIndex === index 
                  ? 'border-[#064E3B] shadow-lg' 
                  : 'border-gray-200 shadow-sm hover:shadow-lg'
              } transition-all duration-300 overflow-hidden`}
              onClick={() => setActiveIndex(index)}
            >
              {/* Avatar Section */}
              <div className="relative p-8 pb-12">
                {/* Avatar Container */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Circular Avatar */}
                  <div className="mb-6">
                    <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                      <Image
                        src={faculty.image}
                        alt={faculty.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                    
                    {/* Experience Badge */}
                    {faculty.experience && (
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#064E3B] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                        {faculty.experience}
                      </div>
                    )}
                  </div>

                  {/* Name and Designation */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                      {faculty.name}
                    </h3>
                    <p className="text-sm text-[#064E3B] font-medium mb-3">
                      {faculty.designation}
                    </p>
                    <p className="text-sm text-[#64748B] mb-2">
                      {faculty.position}
                    </p>
                    
                    {/* Description */}
                    {faculty.description && (
                      <p className="text-sm text-[#475569] mb-4 leading-relaxed">
                        {faculty.description}
                      </p>
                    )}
                  </div>

                  {/* Quote */}
                  {faculty.quote && (
                    <div className="mb-6 relative px-4">
                      <FaQuoteLeft className="absolute -top-2 -left-2 text-[#064E3B] text-sm opacity-30" />
                      <p className="text-sm text-[#475569] italic text-center leading-relaxed">
                        {faculty.quote}
                      </p>
                      <FaQuoteRight className="absolute -bottom-2 -right-2 text-[#064E3B] text-sm opacity-30" />
                    </div>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="px-6 pb-6">
                {/* Expertise Tags */}
                {(faculty.expertise && faculty.expertise.length > 0) && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {faculty.expertise.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-[#F1F5F9] text-[#475569] text-xs rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div className="space-y-3">
                  {/* LinkedIn Link */}
                  {faculty.linkedin && (
                    <a
                      href={faculty.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-gray-100 border border-gray-300 text-gray-600 rounded-lg hover:bg-[#064E3B] hover:text-white hover:border-[#064E3B] transition-all duration-300 font-medium text-sm flex items-center justify-center"
                    >
                      <FaLinkedin className="mr-2" />
                      Connect on LinkedIn
                    </a>
                  )}
                  
                  {/* Email */}
                  {faculty.email && (
                    <a
                      href={`mailto:${faculty.email}`}
                      className="w-full py-2.5 bg-gray-100 border border-gray-300 text-gray-600 rounded-lg hover:bg-[#064E3B] hover:text-white hover:border-[#064E3B] transition-all duration-300 font-medium text-sm flex items-center justify-center"
                    >
                      <FaEnvelope className="mr-2" />
                      Send Email
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Faculty Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#064E3B]/10 flex items-center justify-center">
                <FaBriefcase className="text-[#064E3B] text-lg" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#0F172A]">Industry Experience</h4>
              </div>
            </div>
            <p className="text-sm text-[#475569]">
              Faculty with real-world industry experience to provide practical insights
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#064E3B]/10 flex items-center justify-center">
                <FaGraduationCap className="text-[#064E3B] text-lg" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#0F172A]">Academic Excellence</h4>
              </div>
            </div>
            <p className="text-sm text-[#475569]">
              Advanced degrees from top institutions worldwide
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#064E3B]/10 flex items-center justify-center">
                <FaAward className="text-[#064E3B] text-lg" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#0F172A]">Recognition & Awards</h4>
              </div>
            </div>
            <p className="text-sm text-[#475569]">
              Award-winning faculty recognized for teaching and research excellence
            </p>
          </div>
        </div>

        {/* Department Overview */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">
                Diverse Academic Departments
              </h3>
              <p className="text-[#475569] mb-6">
                Our faculty spans across multiple departments, providing comprehensive 
                expertise in various academic disciplines and professional fields.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {["Computer Science", "Business", "Engineering", "Health Sciences", 
                  "Arts & Humanities", "Social Sciences", "Natural Sciences", "Law"].map((dept) => (
                  <div key={dept} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#064E3B] rounded-full"></div>
                    <span className="text-sm text-[#475569]">{dept}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-[#064E3B]/10 flex items-center justify-center mb-4">
                <FaUsers className="text-[#064E3B] text-3xl" />
              </div>
              <div className="text-4xl font-bold text-[#0F172A] mb-2">50+</div>
              <div className="text-sm text-[#475569]">Faculty Members</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacultySection;