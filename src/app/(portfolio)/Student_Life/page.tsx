'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, Variants } from 'framer-motion';
import Image from 'next/image';

interface FacilityCardProps {
  title: string;
  description: string;
  imageUrl: string;
  icon: string;
}


interface EventCardProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  type: string;
}

interface ClubCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

const StudentLifePage = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll progress for parallax
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Refs for sections
  const heroRef = useRef<HTMLDivElement | null>(null);
  const facilitiesRef = useRef<HTMLDivElement | null>(null);
  const eventsRef = useRef<HTMLDivElement | null>(null);
  const clubsRef = useRef<HTMLDivElement | null>(null);

  // Check if sections are in view
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const facilitiesInView = useInView(facilitiesRef, { once: true, amount: 0.2 });
  const eventsInView = useInView(eventsRef, { once: true, amount: 0.2 });
  const clubsInView = useInView(clubsRef, { once: true, amount: 0.2 });

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

  const scaleIn = {
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

  // Campus Facilities Data
  const facilities: FacilityCardProps[] = [
    {
      title: "Advanced Science Labs",
      description: "State-of-the-art laboratories equipped with modern instruments for physics, chemistry, and biology research.",
      imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      icon: "🔬"
    },
    {
      title: "Digital Library",
      description: "A vast collection of books, journals, and digital resources with quiet study spaces and group discussion rooms.",
      imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      icon: "📚"
    },
    {
      title: "Sports Complex",
      description: "Modern sports facilities including basketball courts, football field, swimming pool, and fitness center.",
      imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      icon: "⚽"
    },
    {
      title: "Student Hostels",
      description: "Comfortable and secure accommodation with modern amenities, WiFi, and 24/7 security.",
      imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      icon: "🏠"
    },
    {
      title: "Cafeteria & Food Court",
      description: "Multiple dining options serving healthy and delicious meals in a vibrant social environment.",
      imageUrl: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      icon: "🍽️"
    },
    {
      title: "Auditorium",
      description: "A 500-seat auditorium with advanced audio-visual equipment for seminars, conferences, and cultural events.",
      imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      icon: "🎭"
    }
  ];

  // Events Data
  const events: EventCardProps[] = [
    {
      title: "Annual Cultural Fest",
      description: "A three-day celebration of art, music, dance, and drama with performances and competitions.",
      imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "March 15-17, 2024",
      type: "Cultural"
    },
    {
      title: "Tech Symposium",
      description: "Showcasing innovative projects and research in technology with industry expert talks.",
      imageUrl: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "April 5, 2024",
      type: "Technical"
    },
    {
      title: "Sports Tournament",
      description: "Inter-college competitions in various sports including cricket, football, and basketball.",
      imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "February 20-25, 2024",
      type: "Sports"
    },
    {
      title: "Career Fair",
      description: "Connect with top companies and explore internship and job opportunities across various fields.",
      imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "May 10, 2024",
      type: "Professional"
    }
  ];

  // Clubs Data
  const clubs: ClubCardProps[] = [
    {
      title: "Coding Club",
      description: "Learn programming, participate in hackathons, and work on real-world software projects.",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Technical"
    },
    {
      title: "Drama Society",
      description: "Explore acting, script writing, and stage production through workshops and performances.",
      imageUrl: "https://images.unsplash.com/photo-1549144511-c559a6f30d82?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Cultural"
    },
    {
      title: "Music Club",
      description: "Join our choir, band, or learn various musical instruments with professional guidance.",
      imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Cultural"
    },
    {
      title: "Environmental Club",
      description: "Promote sustainability and environmental awareness through campus initiatives and community projects.",
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Social"
    },
    {
      title: "Debating Society",
      description: "Enhance your public speaking and critical thinking skills through regular debates and competitions.",
      imageUrl: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Academic"
    },
    {
      title: "Sports Club",
      description: "Regular training sessions and competitions in various sports with professional coaches.",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Sports"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Enhanced Hero Section with Parallax */}
      <motion.section 
        ref={heroRef}
        style={{ y }}
        className="relative py-32 bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 dark:from-blue-950 dark:via-purple-900 dark:to-indigo-950 text-white overflow-hidden"
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

        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
            >
              Student Life
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
            >
              Experience a vibrant campus life with state-of-the-art facilities, exciting events, and diverse student communities.
            </motion.p>
          </motion.div>
        </div>

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
      </motion.section>

      {/* Enhanced Campus Facilities Section */}
      <motion.section 
        ref={facilitiesRef}
        initial="hidden"
        animate={facilitiesInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Campus Facilities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our campus is equipped with modern facilities designed to support your academic journey and personal growth.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {facilities.map((facility, index) => (
              <FacilityCard key={index} {...facility} index={index} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Events & Activities Section */}
      <motion.section 
        ref={eventsRef}
        initial="hidden"
        animate={eventsInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 bg-white dark:bg-gray-800"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Events & Activities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Engage in a wide range of events that foster learning, creativity, and community building.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {events.map((event, index) => (
              <EventCard key={index} {...event} index={index} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Student Societies & Clubs Section */}
      <motion.section 
        ref={clubsRef}
        initial="hidden"
        animate={clubsInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Student Societies & Clubs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join our diverse range of clubs and societies to pursue your interests and develop new skills.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {clubs.map((club, index) => (
              <ClubCard key={index} {...club} index={index} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Floating Navigation Dots */}
      {!isMobile && (
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
          <div className="flex flex-col space-y-4">
            {([
              { ref: heroRef, label: 'Hero' },
              { ref: facilitiesRef, label: 'Facilities' },
              { ref: eventsRef, label: 'Events' },
              { ref: clubsRef, label: 'Clubs' },
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
};

// Enhanced Facility Card Component
const FacilityCard = ({ title, description, imageUrl, icon, index }: FacilityCardProps & { index: number }) => {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={cardInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.1,
            ease: "easeOut"
          }
        }
      }}
      whileHover={{ 
        y: -10,
        transition: { type: "spring", stiffness: 300 }
      }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <motion.div 
          className="absolute top-4 left-4"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg group-hover:shadow-xl transition-all duration-300">
            <span className="text-2xl">{icon}</span>
          </div>
        </motion.div>
      </div>
      
      <div className="p-6">
        <motion.h3 
          className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
          whileHover={{ x: 5 }}
        >
          {title}
        </motion.h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 rounded-2xl transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
};

// Enhanced Event Card Component
const EventCard = ({ title, description, imageUrl, date, type, index }: EventCardProps & { index: number }) => {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, amount: 0.3 });

  const typeColors = {
    Cultural: { bg: 'bg-purple-100', text: 'text-purple-800', darkBg: 'dark:bg-purple-900', darkText: 'dark:text-purple-200' },
    Technical: { bg: 'bg-blue-100', text: 'text-blue-800', darkBg: 'dark:bg-blue-900', darkText: 'dark:text-blue-200' },
    Sports: { bg: 'bg-green-100', text: 'text-green-800', darkBg: 'dark:bg-green-900', darkText: 'dark:text-green-200' },
    Professional: { bg: 'bg-orange-100', text: 'text-orange-800', darkBg: 'dark:bg-orange-900', darkText: 'dark:text-orange-200' }
  };

  const colors = typeColors[type as keyof typeof typeColors] || typeColors.Technical;

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={cardInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.1,
            ease: "easeOut"
          }
        }
      }}
      whileHover={{ 
        y: -8,
        transition: { type: "spring", stiffness: 300 }
      }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        <motion.div 
          className="absolute top-4 right-4"
          whileHover={{ scale: 1.1 }}
        >
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText} shadow-lg`}>
            {type}
          </span>
        </motion.div>

        {/* Date overlay */}
        <motion.div 
          className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center text-white text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {date}
          </div>
        </motion.div>
      </div>
      
      <div className="p-6">
        <motion.h3 
          className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
          whileHover={{ x: 5 }}
        >
          {title}
        </motion.h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// Enhanced Club Card Component
const ClubCard = ({ title, description, imageUrl, category, index }: ClubCardProps & { index: number }) => {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, amount: 0.3 });

  const categoryColors = {
    Technical: { bg: 'bg-blue-100', text: 'text-blue-800', darkBg: 'dark:bg-blue-900', darkText: 'dark:text-blue-200' },
    Cultural: { bg: 'bg-purple-100', text: 'text-purple-800', darkBg: 'dark:bg-purple-900', darkText: 'dark:text-purple-200' },
    Sports: { bg: 'bg-green-100', text: 'text-green-800', darkBg: 'dark:bg-green-900', darkText: 'dark:text-green-200' },
    Academic: { bg: 'bg-red-100', text: 'text-red-800', darkBg: 'dark:bg-red-900', darkText: 'dark:text-red-200' },
    Social: { bg: 'bg-yellow-100', text: 'text-yellow-800', darkBg: 'dark:bg-yellow-900', darkText: 'dark:text-yellow-200' }
  };

  const colors = categoryColors[category as keyof typeof categoryColors] || categoryColors.Technical;

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={cardInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 60, scale: 0.9 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            delay: index * 0.1,
            ease: "easeOut"
          }
        }
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300 }
      }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category badge */}
        <motion.div 
          className="absolute top-4 right-4"
          whileHover={{ scale: 1.1 }}
        >
          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText} shadow-lg`}>
            {category}
          </span>
        </motion.div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <motion.h3 
            className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
            whileHover={{ x: 3 }}
          >
            {title}
          </motion.h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Join button that appears on hover */}
      <motion.div 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        whileHover={{ scale: 1.05 }}
      >
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg transition-colors duration-300">
          Join Club
        </button>
      </motion.div>
    </motion.div>
  );
};

export default StudentLifePage;