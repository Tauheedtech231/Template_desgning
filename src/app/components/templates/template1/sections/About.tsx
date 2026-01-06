"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { SectionTitle } from '../../../shared/SectionTitle';
import { Card, CardContent } from '../../../shared/Card';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered fade in for cards
      gsap.fromTo('.about-element',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
            markers: false
          }
        }
      );

      // Subtle scale animation for main image
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { scale: 1.05 },
          {
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top bottom",
              end: "top 70%",
              scrub: 0.5
            }
          }
        );
      }

      // Floating animation for experience badge
      gsap.to('.experience-badge', {
        y: -8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Enhanced static content with more personality
  const collegeInfo = {
    name: "Kips College",
    foundingYear: "1995",
    shortDescription: "Where curious minds become tomorrow's innovators",
    tagline: "Education that transforms, inspires, and empowers",
    
    longDescription: "For nearly three decades, Kips has been more than just a college—it's been a launchpad for dreamers, thinkers, and doers. What started as a small technical institute has grown into a vibrant educational community where hands-on learning meets big-picture thinking. Our classrooms are spaces where questions are celebrated, where failure is just another step toward understanding, and where every student's unique path is honored.",
    
    mission: "To create learning experiences that stick—not just in memory, but in practice. We're here to equip students with both the technical skills to excel and the human skills to lead with empathy and integrity.",
    
    vision: "A future where education adapts to the learner, not the other way around. We imagine a world where every graduate leaves not just with a degree, but with the confidence to shape industries, communities, and their own journeys.",
    
    uniqueFact: "Fun fact: Our first computer lab had just 8 machines—students took turns coding through the night. That spirit of shared discovery still defines us."
  };

  // Stats with more contextual meaning
  const stats = [
    { 
      number: '50+', 
      label: 'Learning Paths', 
      icon: '📚',
      note: 'From AI ethics to sustainable design'
    },
    { 
      number: '10k+', 
      label: 'Alumni Stories', 
      icon: '🎓',
      note: 'Building futures worldwide'
    },
    { 
      number: '500+', 
      label: 'Mentors & Guides', 
      icon: '👨‍🏫',
      note: 'Industry leaders & practitioners'
    },
    { 
      number: '95%', 
      label: 'Graduate Success', 
      icon: '⭐',
      note: 'Within 6 months of graduation'
    },
  ];

  // Core values with richer descriptions
  const values = [
    { 
      emoji: '🌱', 
      title: 'Growth Mindset', 
      description: 'We believe brilliance isn\'t fixed—it\'s cultivated. Every challenge is an opportunity to stretch, learn, and become.',
      color: 'from-emerald-500 to-teal-600'
    },
    { 
      emoji: '🤝', 
      title: 'Community First', 
      description: 'Learning happens together. We prioritize collaboration over competition, building networks that last beyond graduation.',
      color: 'from-amber-500 to-orange-600'
    },
    { 
      emoji: '✨', 
      title: 'Practical Magic', 
      description: 'The sweet spot where theory meets practice. We love ideas that work in the real world.',
      color: 'from-violet-500 to-purple-600'
    },
  ];

  // Campus highlights
  const highlights = [
    '24/7 innovation lab access',
    'Industry mentorship program',
    'Green campus initiative since 2008',
    'Student-run tech incubator'
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-24 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-950/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with personality */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium mb-4 tracking-wide">
            Our Story • Est. {collegeInfo.foundingYear}
          </span>
          
          <SectionTitle
            title={`Getting to Know ${collegeInfo.name}`}
            subtitle={collegeInfo.tagline}
            align="center"
            underline={true}
            underlineVariant="primary"
            animation="fade"
          />
          
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
            {collegeInfo.shortDescription}
          </p>
        </div>

        {/* Main Content with improved layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left Column - Visual Story */}
          <div className="space-y-8">
            <div 
              ref={imageRef}
              className="relative rounded-2xl overflow-hidden shadow-2xl h-96 lg:h-[480px] group"
            >
              <Image
                src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Kips College campus courtyard with students collaborating"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* Experience Badge */}
              <div className="experience-badge absolute top-6 left-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{collegeInfo.foundingYear}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">Rooted in Excellence</div>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-2"></div>
                </div>
              </div>

              {/* Image caption */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/90 text-sm font-light">
                  Morning study sessions in our main courtyard—where ideas meet sunlight
                </p>
              </div>
            </div>

            {/* Campus Highlights */}
            <div className="about-element">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-4 flex items-center gap-2">
                  <span className="text-lg">🏛️</span> Campus Features
                </h4>
                <ul className="space-y-3">
                  {highlights.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Narrative */}
          <div className="space-y-8">
            {/* Introduction */}
            <div className="about-element">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                  {collegeInfo.longDescription}
                </p>
                
                <div className="mt-8 p-4 border-l-4 border-amber-500 bg-amber-50/50 dark:bg-amber-900/10 rounded-r-lg">
                  <p className="text-gray-700 dark:text-gray-300 text-sm italic">
                    {collegeInfo.uniqueFact}
                  </p>
                </div>
              </div>
            </div>

            {/* Mission & Vision Cards - Enhanced */}
            <div className="grid grid-cols-1 gap-6 about-element">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/10 dark:to-gray-900 overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-400"></div>
                <CardContent className="p-6 pl-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg flex-shrink-0">
                      🎯
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-3">Our Purpose</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {collegeInfo.mission}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/10 dark:to-gray-900 overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-400"></div>
                <CardContent className="p-6 pl-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg flex-shrink-0">
                      🔭
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-3">Looking Ahead</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {collegeInfo.vision}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Statistics with context */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              By the Numbers
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The impact we measure, the lives we touch
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                className="about-element text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className={`text-3xl mb-4 ${index === 0 ? 'animate-bounce' : ''}`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-2">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.note}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section - More Visual */}
        <div className="about-element">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">OUR FOUNDATION</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              What Guides Us
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base">
              These are not just words on a wall—they are the principles that shape every decision, every class, every conversation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group"
              >
                <CardContent className="p-8 relative">
                  {/* Animated background effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-2xl text-white shadow-lg mb-6 mx-auto`}>
                    {value.emoji}
                  </div>
                  
                  <h4 className="font-bold text-gray-900 dark:text-white text-xl text-center mb-4">
                    {value.title}
                  </h4>
                  
                  <p className="text-gray-700 dark:text-gray-300 text-sm text-center leading-relaxed">
                    {value.description}
                  </p>
                  
                  {/* Bottom accent */}
                  <div className="w-12 h-1 rounded-full bg-gradient-to-r from-transparent via-current to-transparent opacity-30 mx-auto mt-6"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Closing note */}
        <div className="mt-20 text-center about-element">
          <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-gray-50 to-blue-50/30 dark:from-gray-800/30 dark:to-blue-900/10 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-4xl mb-4">✨</div>
            <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-4">
              Still Curious?
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              The best way to understand Kips is to experience it. Join a campus tour, sit in on a class, or chat with our students.
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
              Plan Your Visit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};