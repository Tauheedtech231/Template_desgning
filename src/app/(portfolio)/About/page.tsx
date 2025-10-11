'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, Variants } from 'framer-motion';

export default function AboutUs() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Ref for sections
  const heroRef = useRef<HTMLDivElement | null>(null);
  const historyRef = useRef<HTMLDivElement | null>(null);
  const visionRef = useRef<HTMLDivElement | null>(null);
  const accreditationRef = useRef<HTMLDivElement | null>(null);

  // Check if sections are in view
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const historyInView = useInView(historyRef, { once: true, amount: 0.3 });
  const visionInView = useInView(visionRef, { once: true, amount: 0.3 });
  const accreditationInView = useInView(accreditationRef, { once: true, amount: 0.3 });

  // Animation variants
  const fadeInUp :Variants= {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scaleIn :Variants= {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div id="about" className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      {/* Enhanced Hero Section with Parallax */}
      <motion.section 
        ref={heroRef}
        style={{ y }}
        className="relative bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 dark:from-blue-950 dark:via-purple-900 dark:to-indigo-950 text-white py-32 lg:py-40 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400 rounded-full blur-3xl opacity-20"
        />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
            >
              About Aspire College
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
            >
              Shaping futures through excellence in education, innovation, and character building since 1985
            </motion.p>
            
            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center"
              >
                <p className="text-blue-200 text-sm mb-2">Scroll to explore</p>
                <div className="w-6 h-10 border-2 border-blue-300 rounded-full flex justify-center mx-auto">
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1 h-3 bg-blue-300 rounded-full mt-2"
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced History & Legacy Section */}
      <motion.section 
        ref={historyRef}
        initial="hidden"
        animate={historyInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 bg-gray-50 dark:bg-gray-800"
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={fadeInUp}>
              <motion.div 
                className="flex items-center mb-8"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mr-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white">History & Legacy</h2>
              </motion.div>
              
              <motion.p 
                variants={fadeInUp}
                className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed"
              >
                Established in 1985, Aspire College has been at the forefront of educational excellence for nearly four decades. 
                What began as a small institution with just 200 students has grown into a premier educational hub serving over 10,000 students annually.
              </motion.p>
              
              <motion.p 
                variants={fadeInUp}
                className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed"
              >
                Our legacy is built on a foundation of academic rigor, innovative teaching methodologies, and a commitment to 
                developing well-rounded individuals who contribute meaningfully to society.
              </motion.p>

              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-2 gap-6"
              >
                {[
                  { number: "35+", label: "Years of Excellence", color: "blue" },
                  { number: "50k+", label: "Alumni Worldwide", color: "purple" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      transition: { type: "spring", stiffness: 400 }
                    }}
                    className={`text-center p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-${stat.color}-500`}
                  >
                    <div className={`text-3xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400 mb-2`}>
                      {stat.number}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative overflow-hidden rounded-2xl shadow-2xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80"
                  alt="Aspire College Campus" 
                  className="w-full h-96 lg:h-[500px] object-cover transform hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* Floating info card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 shadow-lg"
                >
                  <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-2">Prestigious Heritage</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Our campus blends historic architecture with modern facilities
                  </p>
                </motion.div>
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full opacity-20"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Vision & Mission Section */}
      <motion.section 
        ref={visionRef}
        initial="hidden"
        animate={visionInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto px-6">
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Our Guiding Principles
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Driving excellence through visionary leadership and purposeful mission
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision Card */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <motion.div 
                  className="flex items-center mb-6"
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="w-14 h-14 bg-white dark:bg-blue-800 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-white">Our Vision</h3>
                </motion.div>
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  To be a globally recognized institution that empowers students to become innovative leaders, 
                  critical thinkers, and responsible citizens who drive positive change in an interconnected world.
                </motion.p>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group relative bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <motion.div 
                  className="flex items-center mb-6"
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="w-14 h-14 bg-white dark:bg-purple-800 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <svg className="w-7 h-7 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-white">Our Mission</h3>
                </motion.div>
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  To provide transformative education through innovative curricula, world-class faculty, 
                  and state-of-the-art facilities that foster intellectual growth, ethical values, and 
                  lifelong learning skills essential for success in the 21st century.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Accreditations & Affiliations */}
      <motion.section 
        ref={accreditationRef}
        initial="hidden"
        animate={accreditationInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 bg-gray-50 dark:bg-gray-800"
      >
        <div className="container mx-auto px-6">
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <motion.div 
              className="flex items-center justify-center mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="w-14 h-14 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mr-4 shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Recognitions & Partners</h2>
            </motion.div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our commitment to quality education is recognized by leading national and international accreditation bodies.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16"
          >
            {[
              { name: 'NAAC A++', desc: 'National Assessment and Accreditation Council', color: 'green' },
              { name: 'UGC', desc: 'University Grants Commission', color: 'blue' },
              { name: 'AICTE', desc: 'All India Council for Technical Education', color: 'purple' },
              { name: 'ISO 9001:2015', desc: 'Quality Management System Certified', color: 'orange' },
            ].map((accreditation, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  transition: { type: "spring", stiffness: 400 }
                }}
                className="group relative bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Hover effect background */}
                <div className={`absolute inset-0 bg-gradient-to-r from-${accreditation.color}-500/10 to-${accreditation.color}-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 text-center">
                  <motion.div 
                    className={`w-16 h-16 bg-${accreditation.color}-100 dark:bg-${accreditation.color}-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span className={`text-${accreditation.color}-600 dark:text-${accreditation.color}-400 font-bold text-xl`}>✓</span>
                  </motion.div>
                  <h3 className={`text-xl font-bold text-gray-800 dark:text-white mb-3 text-${accreditation.color}-600 dark:text-${accreditation.color}-400`}>
                    {accreditation.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {accreditation.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="text-center"
          >
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-12">International Affiliations</h3>
            <motion.div 
              variants={staggerContainer}
              className="flex flex-wrap justify-center gap-6 lg:gap-8 items-center"
            >
              {[
                { name: 'International University A', logo: '🎓' },
                { name: 'Global College B', logo: '🌍' },
                { name: 'World Institute C', logo: '⚡' },
                { name: 'Education Network D', logo: '🔗' },
              ].map((affiliation, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ 
                    scale: 1.1,
                    y: -5,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  className="group bg-white dark:bg-gray-700 px-8 py-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <motion.span 
                      className="text-2xl"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {affiliation.logo}
                    </motion.span>
                    <span className="text-gray-700 dark:text-gray-300 font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {affiliation.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Floating Navigation Dots */}
      {!isMobile && (
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
          <div className="flex flex-col space-y-4">
            {([
              { ref: heroRef, label: 'Hero' },
              { ref: historyRef, label: 'History' },
              { ref: visionRef, label: 'Vision' },
              { ref: accreditationRef, label: 'Accreditations' },
            ] as { ref: React.RefObject<HTMLDivElement | null>; label: string }[]).map((section, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => section.ref.current?.scrollIntoView({ behavior: 'smooth' })}
                className="w-4 h-4 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label={`Scroll to ${section.label} section`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}