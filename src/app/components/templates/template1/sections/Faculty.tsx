"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { SectionTitle } from '../../../shared/SectionTitle';
import { Card, CardContent } from '../../../shared/Card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaChevronLeft, 
  FaChevronRight,
  FaGraduationCap,
  FaUserGraduate,
  FaAward,
  FaBook,
  FaUniversity,
  FaChalkboardTeacher,
  FaFlask,
  FaPaintBrush,
  FaMicroscope,
  FaChartLine,
  FaCode
} from 'react-icons/fa';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FacultyMember {
  id: string;
  name: string;
  position: string;
  department: string;
  bio: string;
  image: string;
  qualifications: string[];
  expertise: string[];
}

export const Faculty: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

  // Static faculty data
  const facultyData: FacultyMember[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      position: 'Professor & Department Head',
      department: 'Computer Science',
      bio: '20+ years of experience in AI research. Published 50+ papers in top-tier conferences. Focuses on making AI education accessible.',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      qualifications: ['PhD Computer Science', 'Stanford University', 'Postdoc MIT'],
      expertise: ['Artificial Intelligence', 'Machine Learning', 'Computer Vision']
    },
    {
      id: '2',
      name: 'Prof. James Wilson',
      position: 'Senior Lecturer',
      department: 'Engineering',
      bio: 'Industry veteran turned educator. Worked at leading tech companies before joining academia. Passionate about practical engineering.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      qualifications: ['MSc Mechanical Engineering', 'Industry Experience: 15 years', 'PE Certified'],
      expertise: ['Robotics', 'CAD Design', 'Thermodynamics']
    },
    {
      id: '3',
      name: 'Dr. Maria Rodriguez',
      position: 'Associate Professor',
      department: 'Health Sciences',
      bio: 'Medical researcher focusing on public health. Leads community health initiatives and mentors future healthcare professionals.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      qualifications: ['MD, PhD Public Health', 'Johns Hopkins', 'Board Certified'],
      expertise: ['Public Health', 'Epidemiology', 'Clinical Research']
    },
    {
      id: '4',
      name: 'Prof. David Kim',
      position: 'Professor of Business',
      department: 'Business School',
      bio: 'Former startup founder turned business educator. Teaches entrepreneurship and strategic management with real-world case studies.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      qualifications: ['MBA Harvard', 'Former CEO', 'Angel Investor'],
      expertise: ['Entrepreneurship', 'Strategy', 'Finance']
    },
    {
      id: '5',
      name: 'Dr. Lisa Wang',
      position: 'Research Professor',
      department: 'Life Sciences',
      bio: 'Leading researcher in environmental biology. Focuses on sustainable ecosystems and conservation biology. NSF grant recipient.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      qualifications: ['PhD Environmental Science', 'Oxford University', 'NSF Fellow'],
      expertise: ['Ecology', 'Conservation', 'Biotechnology']
    }
  ];

  // Department icons mapping
  const departmentIcons: { [key: string]: React.ElementType } = {
    'Computer Science': FaCode,
    'Engineering': FaFlask,
    'Health Sciences': FaMicroscope,
    'Business School': FaChartLine,
    'Life Sciences': FaFlask,
    'Arts': FaPaintBrush,
    'default': FaUniversity
  };

  const getDepartmentIcon = (department: string) => {
    const Icon = departmentIcons[department] || departmentIcons.default;
    return <Icon />;
  };

  // Auto-play slider
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % facultyData.length);
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, facultyData.length]);

  // Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.faculty-card',
        { 
          opacity: 0, 
          y: 40,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stats animation
      gsap.fromTo('.faculty-stat',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.stats-section',
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % facultyData.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? facultyData.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section id="faculty" ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <span className="text-blue-600 dark:text-blue-400 text-sm font-medium tracking-wider">
              GUIDING MINDS
            </span>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          </div>
          
          <SectionTitle
            title="Our Faculty"
            subtitle="Learn from industry leaders and passionate educators"
            align="center"
            underline={true}
            
            animation="fade"
          />
        </div>

        {/* Stats */}
        <div className="stats-section mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="faculty-stat bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <FaGraduationCap className="text-blue-600 dark:text-blue-400 text-2xl" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">15:1</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">Student-Faculty Ratio</div>
            </div>
            
            <div className="faculty-stat bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                  <FaUserGraduate className="text-emerald-600 dark:text-emerald-400 text-2xl" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">90%</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">PhD Faculty</div>
            </div>
            
            <div className="faculty-stat bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                  <FaAward className="text-amber-600 dark:text-amber-400 text-2xl" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">25+</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">Industry Awards</div>
            </div>
            
            <div className="faculty-stat bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <FaBook className="text-purple-600 dark:text-purple-400 text-2xl" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">10+</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">Avg. Years Experience</div>
            </div>
          </div>
        </div>

        {/* Faculty Slider */}
        <div className="relative mb-20">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <FaChevronLeft />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <FaChevronRight />
          </button>

          {/* Slider Container */}
          <div 
            ref={sliderRef}
            className="overflow-hidden px-2"
          >
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {facultyData.map((faculty, index) => (
                <div 
                  key={faculty.id}
                  className="w-full flex-shrink-0 px-2"
                >
                  <Card className="faculty-card border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      {/* Image Section */}
                      <div className="md:w-1/3 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
                        <div className="relative h-64 md:h-full">
                          <Image
                            src={faculty.image}
                            alt={faculty.name}
                            fill
                            className="object-cover opacity-90"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                          
                          {/* Department Icon */}
                          <div className="absolute bottom-4 left-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                              <div className="text-white text-xl">
                                {getDepartmentIcon(faculty.department)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="md:w-2/3 p-6 md:p-8">
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {faculty.name}
                            </h3>
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full">
                              {faculty.department}
                            </span>
                          </div>
                          <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-4">
                            {faculty.position}
                          </p>
                        </div>

                        {/* Bio */}
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
                          {faculty.bio}
                        </p>

                        {/* Expertise */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Expertise</h4>
                          <div className="flex flex-wrap gap-2">
                            {faculty.expertise.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full border border-gray-200 dark:border-gray-700"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Qualifications */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Qualifications</h4>
                          <ul className="space-y-2">
                            {faculty.qualifications.map((qual, idx) => (
                              <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <div className="w-1 h-1 bg-blue-500 rounded-full mr-3"></div>
                                {qual}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Dots */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {facultyData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-blue-600'
                    : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Small Faculty Cards Grid (Supporting Faculty) */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Supporting Faculty
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {facultyData.slice(0, 4).map((faculty) => (
              <Card 
                key={faculty.id}
                className="border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors duration-300"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={faculty.image}
                        alt={faculty.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {faculty.name.split(' ')[0]}
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 text-xs">
                        {faculty.position.split('&')[0]}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800/30">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-full">
                <FaChalkboardTeacher className="text-blue-600 dark:text-blue-400 text-3xl" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Want to learn directly from our faculty?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Schedule a meeting with our professors or attend their open office hours.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Contact Faculty Office
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};