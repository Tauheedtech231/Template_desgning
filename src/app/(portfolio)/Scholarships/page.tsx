"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Scholarship {
  id: number;
  name: string;
  program: string;
  eligibility: string;
  amount: string;
  description: string;
  type: 'merit' | 'need' | 'sports' | 'special';
}

interface ProgramScholarships {
  program: string;
  scholarships: Scholarship[];
}

const ScholarshipsPage = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const firstYearRef = useRef<HTMLElement | null>(null);
  const secondYearRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  // First Year Scholarships Data
  const firstYearScholarships: Scholarship[] = [
    {
      id: 1,
      name: "Merit Excellence Scholarship",
      program: "All Programs",
      eligibility: "95%+ marks in Matriculation",
      amount: "100% Tuition Fee",
      description: "Awarded to top-performing students demonstrating exceptional academic achievement.",
      type: "merit"
    },
    {
      id: 2,
      name: "Science Talent Scholarship",
      program: "FSc & ICS",
      eligibility: "90%+ marks in Science subjects",
      amount: "75% Tuition Fee",
      description: "For students with outstanding performance in science and mathematics.",
      type: "merit"
    },
    {
      id: 3,
      name: "Sports Achievement Scholarship",
      program: "All Programs",
      eligibility: "District/Provincial level sports recognition",
      amount: "50-100% Tuition Fee",
      description: "Support for athletes representing college in competitive sports.",
      type: "sports"
    },
    {
      id: 4,
      name: "Financial Need Scholarship",
      program: "All Programs",
      eligibility: "Family income below ₹500,000 annually",
      amount: "25-75% Tuition Fee",
      description: "Financial assistance for students from economically challenged backgrounds.",
      type: "need"
    },
    {
      id: 5,
      name: "Arts & Humanities Scholarship",
      program: "FA & ICom",
      eligibility: "85%+ marks in Arts/Commerce subjects",
      amount: "50% Tuition Fee",
      description: "Encouraging excellence in arts, humanities, and commerce education.",
      type: "merit"
    },
    {
      id: 6,
      name: "Early Admission Scholarship",
      program: "All Programs",
      eligibility: "Application submitted before December 31st",
      amount: "15% Tuition Fee",
      description: "Incentive for early decision and application submission.",
      type: "special"
    }
  ];

  // Second Year Scholarships Data
  const secondYearScholarships: ProgramScholarships[] = [
    {
      program: "Intermediate in Commerce (ICom)",
      scholarships: [
        {
          id: 7,
          name: "Commerce Excellence Award",
          program: "ICom",
          eligibility: "80%+ in 1st year & clear academic record",
          amount: "60% Tuition Fee",
          description: "Reward for consistent academic performance in commerce stream.",
          type: "merit"
        },
        {
          id: 8,
          name: "Business Leadership Scholarship",
          program: "ICom",
          eligibility: "Active participation in business clubs & 75%+ marks",
          amount: "40% Tuition Fee",
          description: "For students demonstrating leadership in business activities.",
          type: "special"
        }
      ]
    },
    {
      program: "Intermediate in Computer Science (ICS)",
      scholarships: [
        {
          id: 9,
          name: "Tech Innovation Grant",
          program: "ICS",
          eligibility: "85%+ in computer subjects & project portfolio",
          amount: "70% Tuition Fee",
          description: "Support for students with innovative tech projects and high grades.",
          type: "merit"
        },
        {
          id: 10,
          name: "Women in Tech Scholarship",
          program: "ICS",
          eligibility: "Female students with 80%+ in 1st year",
          amount: "50% Tuition Fee",
          description: "Encouraging female participation in computer science education.",
          type: "special"
        }
      ]
    },
    {
      program: "Faculty of Science (FSc)",
      scholarships: [
        {
          id: 11,
          name: "Science Research Fellowship",
          program: "FSc",
          eligibility: "88%+ in science subjects & research interest",
          amount: "80% Tuition Fee",
          description: "For students pursuing research in scientific fields.",
          type: "merit"
        },
        {
          id: 12,
          name: "Medical Aspirants Scholarship",
          program: "FSc Pre-Medical",
          eligibility: "90%+ in biology & chemistry",
          amount: "65% Tuition Fee",
          description: "Support for students aiming for medical careers.",
          type: "merit"
        }
      ]
    },
    {
      program: "Faculty of Arts (FA)",
      scholarships: [
        {
          id: 13,
          name: "Creative Arts Scholarship",
          program: "FA",
          eligibility: "Outstanding performance in arts subjects",
          amount: "45% Tuition Fee",
          description: "For students excelling in creative and performing arts.",
          type: "merit"
        },
        {
          id: 14,
          name: "Social Sciences Award",
          program: "FA",
          eligibility: "85%+ in social sciences & community service",
          amount: "55% Tuition Fee",
          description: "Recognizing excellence in social sciences and community engagement.",
          type: "merit"
        }
      ]
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animation
    gsap.fromTo(heroRef.current, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // First year scholarships animation
    gsap.fromTo(".scholarship-card", 
      { 
        opacity: 0, 
        y: 60,
        scale: 0.9
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: firstYearRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Second year scholarships animation
    gsap.fromTo(".program-group", 
      { 
        opacity: 0, 
        x: -50 
      },
      { 
        opacity: 1, 
        x: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: secondYearRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Contact section animation
    gsap.fromTo(contactRef.current, 
      { opacity: 0 },
      { 
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Smooth scrolling for internal links
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(window, {
      scrollTo: {
        y: 0,
        autoKill: false
      },
      duration: 1
    });

  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'merit':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'need':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'sports':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'special':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'merit':
        return '🏆';
      case 'need':
        return '💝';
      case 'sports':
        return '⚽';
      case 'special':
        return '⭐';
      default:
        return '🎓';
    }
  };

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement | null>) => {
    if (sectionRef.current) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: sectionRef.current,
          offsetY: 20
        },
        ease: "power2.inOut"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      {/* Navigation Dots */}
    

      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 bg-gradient-to-br from-blue-900 to-purple-800 dark:from-blue-950 dark:to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Scholarships & <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Financial Aid</span>
            </h1>
            <motion.p 
              className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Investing in your future through comprehensive scholarship programs and financial support systems.
            </motion.p>
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 inline-block border border-white/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-blue-100 text-lg font-semibold">
                <strong>Application Deadline:</strong> January 15, 2024
              </p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
              className="mt-12 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="text-blue-200 text-sm mb-2">Explore Scholarships</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-white rounded-full mt-2"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* First Year Scholarships Section */}
      <section ref={firstYearRef} className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              First Year Scholarships
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Available for all incoming students across ICom, ICS, FSc, and FA programs. 
              Apply once for multiple scholarship considerations.
            </p>
          </motion.div>

          {/* Scholarship Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {firstYearScholarships.map((scholarship) => (
              <motion.div
                key={scholarship.id}
                className="scholarship-card bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform border border-gray-200 dark:border-gray-700 overflow-hidden"
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <div className="p-6 lg:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <motion.span 
                        className="text-2xl"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {getTypeIcon(scholarship.type)}
                      </motion.span>
                      <div>
                        <h3 className="text-lg lg:text-xl font-bold text-gray-800 dark:text-white line-clamp-2">
                          {scholarship.name}
                        </h3>
                        <span className={`text-xs px-3 py-1 rounded-full ${getTypeColor(scholarship.type)} font-medium`}>
                          {scholarship.type.charAt(0).toUpperCase() + scholarship.type.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Program */}
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Program:</span>
                    <p className="text-gray-700 dark:text-gray-300 font-semibold text-sm lg:text-base">{scholarship.program}</p>
                  </div>

                  {/* Eligibility */}
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Eligibility:</span>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{scholarship.eligibility}</p>
                  </div>

                  {/* Amount */}
                  <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Award:</span>
                    <p className="text-green-600 dark:text-green-400 font-bold text-xl lg:text-2xl">{scholarship.amount}</p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base leading-relaxed">
                    {scholarship.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Second Year Scholarships Section */}
      <section ref={secondYearRef} className="py-16 lg:py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Second Year Scholarships
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Continuation and performance-based scholarships for returning students. 
              Maintain academic excellence to renew your awards.
            </p>
          </motion.div>

          <div className="space-y-8 lg:space-y-12">
            {secondYearScholarships.map((programGroup, index) => (
              <motion.div 
                key={index} 
                className="program-group bg-gray-50 dark:bg-gray-700 rounded-3xl p-6 lg:p-8 shadow-lg"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h3 
                  className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-6 lg:mb-8 pb-4 border-b border-gray-200 dark:border-gray-600"
                  whileInView={{ x: 0, opacity: 1 }}
                  initial={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {programGroup.program}
                </motion.h3>
                
                <div className="grid gap-6 lg:gap-8">
                  {programGroup.scholarships.map((scholarship) => (
                    <motion.div
                      key={scholarship.id}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                      whileHover={{ 
                        scale: 1.02,
                        borderColor: "rgb(59, 130, 246)"
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 lg:space-x-4 mb-4">
                            <motion.span 
                              className="text-2xl lg:text-3xl"
                              whileHover={{ scale: 1.3 }}
                              transition={{ duration: 0.3 }}
                            >
                              {getTypeIcon(scholarship.type)}
                            </motion.span>
                            <div>
                              <h4 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                {scholarship.name}
                              </h4>
                              <span className={`text-xs lg:text-sm px-3 py-1 lg:px-4 lg:py-2 rounded-full ${getTypeColor(scholarship.type)} font-medium`}>
                                {scholarship.type.charAt(0).toUpperCase() + scholarship.type.slice(1)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-4">
                            <div>
                              <span className="text-sm lg:text-base font-medium text-gray-500 dark:text-gray-400">Eligibility:</span>
                              <p className="text-gray-700 dark:text-gray-300 text-sm lg:text-base leading-relaxed">{scholarship.eligibility}</p>
                            </div>
                            <div>
                              <span className="text-sm lg:text-base font-medium text-gray-500 dark:text-gray-400">Award Value:</span>
                              <p className="text-green-600 dark:text-green-400 font-bold text-xl lg:text-2xl">{scholarship.amount}</p>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base leading-relaxed">
                            {scholarship.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Renewal Information */}
          <motion.div 
            className="mt-12 lg:mt-16 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-3xl p-6 lg:p-8 border border-yellow-200 dark:border-yellow-800 shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center mb-6 lg:mb-8">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-800 rounded-2xl flex items-center justify-center mr-0 lg:mr-6 mb-4 lg:mb-0">
                <motion.svg 
                  className="w-8 h-8 text-yellow-600 dark:text-yellow-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </motion.svg>
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-2">Scholarship Renewal</h3>
                <p className="text-yellow-700 dark:text-yellow-300 text-lg">Maintain your academic standing to continue receiving support</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 text-sm lg:text-base">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-3 lg:mb-4">Renewal Requirements:</h4>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2 lg:space-y-3">
                  <li className="flex items-center">
                    <motion.span 
                      className="w-2 h-2 bg-yellow-500 rounded-full mr-3"
                      whileHover={{ scale: 1.5 }}
                    />
                    Maintain minimum 3.0 GPA
                  </li>
                  <li className="flex items-center">
                    <motion.span 
                      className="w-2 h-2 bg-yellow-500 rounded-full mr-3"
                      whileHover={{ scale: 1.5 }}
                    />
                    Complete 90% attendance
                  </li>
                  <li className="flex items-center">
                    <motion.span 
                      className="w-2 h-2 bg-yellow-500 rounded-full mr-3"
                      whileHover={{ scale: 1.5 }}
                    />
                    Clear all academic dues
                  </li>
                  <li className="flex items-center">
                    <motion.span 
                      className="w-2 h-2 bg-yellow-500 rounded-full mr-3"
                      whileHover={{ scale: 1.5 }}
                    />
                    No disciplinary actions
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-3 lg:mb-4">Application Timeline:</h4>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2 lg:space-y-3">
                  <li className="flex items-center">
                    <motion.span 
                      className="w-2 h-2 bg-yellow-500 rounded-full mr-3"
                      whileHover={{ scale: 1.5 }}
                    />
                    Applications open: December 1st
                  </li>
                  <li className="flex items-center">
                    <motion.span 
                      className="w-2 h-2 bg-yellow-500 rounded-full mr-3"
                      whileHover={{ scale: 1.5 }}
                    />
                    Deadline: January 15th
                  </li>
                  <li className="flex items-center">
                    <motion.span 
                      className="w-2 h-2 bg-yellow-500 rounded-full mr-3"
                      whileHover={{ scale: 1.5 }}
                    />
                    Results announced: February 28th
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Need More Information?
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 lg:mb-12 leading-relaxed">
              Our financial aid office is here to help you navigate scholarship opportunities and application processes.
            </p>
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 text-sm lg:text-base">
              {[
                {
                  icon: "📞",
                  title: "Call Us",
                  info: "+1 (555) 123-4567",
                  bg: "bg-blue-100 dark:bg-blue-900",
                  color: "text-blue-600 dark:text-blue-400"
                },
                {
                  icon: "✉️",
                  title: "Email Us",
                  info: "financialaid@college.edu",
                  bg: "bg-green-100 dark:bg-green-900",
                  color: "text-green-600 dark:text-green-400"
                },
                {
                  icon: "📍",
                  title: "Visit Us",
                  info: "Financial Aid Office, Admin Building",
                  bg: "bg-purple-100 dark:bg-purple-900",
                  color: "text-purple-600 dark:text-purple-400"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 text-2xl`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-2 lg:mb-3 text-lg lg:text-xl">{item.title}</h3>
                  <p className={`font-semibold ${item.color}`}>{item.info}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ScholarshipsPage;