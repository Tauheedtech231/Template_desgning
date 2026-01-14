"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  FaLinkedin, 
  FaEnvelope,
  FaArrowRight,
  FaArrowLeft,
  FaQuoteLeft,
  FaQuoteRight,
  FaStar
} from "react-icons/fa";

interface Faculty {
  id: number;
  image: string;
  name: string;
  position: string;
  designation: string;
  linkedin?: string;
  email?: string;
  quote: string;
  expertise: string[];
  experience: string;
  description: string;
}

const FacultySection: React.FC = () => {
  const [activeFaculty, setActiveFaculty] = useState<Faculty | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

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
      expertise: ["AI Research", "Machine Learning", "Data Science"],
      experience: "15+ Years",
      description: "A visionary educator who bridges cutting-edge technology with accessible learning. Her innovative teaching methods have transformed how computer science is taught."
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
      description: "Brings real-world corporate experience into the classroom, focusing on ethical leadership and innovative business strategies."
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
      expertise: ["Structural Design", "Project Management", "Innovation"],
      experience: "18+ Years",
      description: "Combines theoretical knowledge with practical application, emphasizing sustainable and innovative engineering solutions."
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
      expertise: ["Clinical Practice", "Healthcare Management", "Public Health"],
      experience: "20+ Years",
      description: "Passionate about creating healthcare professionals who see patients as whole people, not just cases."
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1976&q=80",
      name: "Prof. David Miller",
      position: "Director of Arts",
      designation: "Professor of Fine Arts",
      linkedin: "https://linkedin.com",
      email: "david.miller@college.edu",
      quote: "Art enables us to find ourselves and lose ourselves at the same time.",
      expertise: ["Visual Arts", "Art History", "Creative Theory"],
      experience: "14+ Years",
      description: "Encourages students to see art as vital human expression and inquiry."
    }
  ];

  // Continuous right-to-left slider effect
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || activeFaculty) return;

    const animateSlider = () => {
      if (isDragging) {
        requestAnimationFrame(animateSlider);
        return;
      }

      const totalWidth = slider.scrollWidth;
      const visibleWidth = slider.clientWidth;
      
      if (slider.scrollLeft >= totalWidth - visibleWidth) {
        slider.scrollLeft = 0;
      } else {
        slider.scrollLeft += 0.5;
      }
      
      requestAnimationFrame(animateSlider);
    };

    const animationId = requestAnimationFrame(animateSlider);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isDragging, activeFaculty]);

  // Handle drag for manual control
  const handleDragStart = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleFacultyClick = (faculty: Faculty) => {
    setActiveFaculty(faculty);
  };

  const handleCloseDetails = () => {
    setActiveFaculty(null);
  };

  return (
    <section className="relative py-16 bg-[#0B1220]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-teal-400 mb-4">
            Our Faculty
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Click on any faculty member to see their details
          </p>
        </motion.div>

        {/* Continuous Slider */}
        <div className="mb-12">
          <div className="relative overflow-hidden">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0B1220] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0B1220] to-transparent z-10" />
            
            {/* Continuous slider */}
            <div
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing py-4"
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
            >
              {/* First set of cards */}
              {facultyMembers.map((faculty) => (
                <motion.div
                  key={`first-${faculty.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="flex-shrink-0 w-64 cursor-pointer"
                  onClick={() => handleFacultyClick(faculty)}
                >
                  <div className="bg-[#0F1729] border border-gray-800 rounded-xl p-4 hover:border-teal-400 transition-all duration-300 hover:scale-[1.02]">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                      <Image
                        src={faculty.image}
                        alt={faculty.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-white text-center mb-2">
                      {faculty.name}
                    </h3>
                    <p className="text-teal-400 text-sm text-center mb-2">
                      {faculty.designation}
                    </p>
                    <div className="px-3 py-1 bg-[#1E293B] text-gray-300 text-xs rounded-full text-center">
                      {faculty.experience}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {facultyMembers.map((faculty) => (
                <motion.div
                  key={`second-${faculty.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="flex-shrink-0 w-64 cursor-pointer"
                  onClick={() => handleFacultyClick(faculty)}
                >
                  <div className="bg-[#0F1729] border border-gray-800 rounded-xl p-4 hover:border-teal-400 transition-all duration-300 hover:scale-[1.02]">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                      <Image
                        src={faculty.image}
                        alt={faculty.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-white text-center mb-2">
                      {faculty.name}
                    </h3>
                    <p className="text-teal-400 text-sm text-center mb-2">
                      {faculty.designation}
                    </p>
                    <div className="px-3 py-1 bg-[#1E293B] text-gray-300 text-xs rounded-full text-center">
                      {faculty.experience}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Faculty Details Section */}
        <AnimatePresence>
          {activeFaculty && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.4 }}
              className="bg-[#0F1729] rounded-2xl border border-gray-800 mb-12 overflow-hidden"
            >
              <div className="p-6">
                {/* Close button */}
                <div className="flex justify-end mb-4">
                  <motion.button
                    onClick={handleCloseDetails}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-[#1E293B] rounded-full border border-gray-700 hover:border-teal-400"
                  >
                    <FaArrowLeft className="text-gray-300" />
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Details */}
                  <motion.div 
                    className="space-y-6"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {/* Name and Title */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {activeFaculty.name}
                      </h2>
                      <p className="text-gray-300 font-medium mb-1">
                        {activeFaculty.designation}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {activeFaculty.position}
                      </p>
                    </div>

                    {/* Experience Badge */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="px-4 py-2 bg-[#1E293B] text-teal-400 font-medium rounded-full inline-block border border-gray-700">
                        {activeFaculty.experience} Experience
                      </div>
                    </motion.div>

                    {/* Quote */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="pt-4 border-t border-gray-800"
                    >
                      <div className="flex items-start gap-3">
                        <FaQuoteLeft className="text-teal-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-300 italic">
                          {activeFaculty.quote}
                        </p>
                        <FaQuoteRight className="text-teal-400 mt-1 flex-shrink-0" />
                      </div>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <p className="text-gray-300 leading-relaxed">
                        {activeFaculty.description}
                      </p>
                    </motion.div>

                    {/* Expertise */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Expertise
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {activeFaculty.expertise.map((skill, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.6 + (idx * 0.1) }}
                            className="px-3 py-1.5 bg-[#1E293B] text-gray-300 text-sm rounded-full border border-gray-700"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Contact Links */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex gap-3 pt-4 border-t border-gray-800"
                    >
                      {activeFaculty.linkedin && (
                        <a
                          href={activeFaculty.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] hover:bg-teal-400 text-gray-300 hover:text-white rounded-full text-sm transition-colors border border-gray-700"
                        >
                          <FaLinkedin />
                          <span>Connect</span>
                        </a>
                      )}
                      
                      {activeFaculty.email && (
                        <a
                          href={`mailto:${activeFaculty.email}`}
                          className="flex items-center gap-2 px-4 py-2 bg-teal-400 hover:bg-teal-500 text-white rounded-full text-sm transition-colors"
                        >
                          <FaEnvelope />
                          <span>Email</span>
                        </a>
                      )}
                    </motion.div>
                  </motion.div>

                  {/* Right Column - Image */}
                  <motion.div 
                    className="relative"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="relative h-96 rounded-xl overflow-hidden">
                      <Image
                        src={activeFaculty.image}
                        alt={activeFaculty.name}
                        fill
                        className="object-cover rounded-xl"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      
                      {/* Experience badge */}
                      <motion.div 
                        className="absolute bottom-6 left-6"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="px-4 py-2 bg-black/70 backdrop-blur-sm text-white font-medium rounded-full">
                          {activeFaculty.experience}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        {!activeFaculty && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-[#0F1729] rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-teal-400 mb-4">
                Learn From Experts
              </h2>
              <p className="text-gray-300 max-w-xl mx-auto mb-6">
                Click on any faculty member to learn more about their expertise and experience
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-teal-400 hover:bg-teal-500 text-white font-medium rounded-full transition-colors"
              >
                Explore All Programs
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Custom scrollbar hide */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default FacultySection;