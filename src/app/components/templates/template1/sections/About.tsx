"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { SectionTitle } from '../../../shared/SectionTitle';
import { Card, CardContent } from '../../../shared/Card';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionContent {
  images: {
    coverImage: string;
    logo: string;
  };
  text: {
    longDescription: string;
    mission: string;
    name: string;
    shortDescription: string;
    vision: string;
  };
}

interface AboutSection {
  id: number;
  template_id: number;
  section_name: string;
  content: SectionContent;
}

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [aboutData, setAboutData] = useState<AboutSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await fetch('https://nes-tick-portfolio-handler.vercel.app/api/sections?template_id=1&section_name=About', {
          cache: "no-store"
        });
        
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status}`);
        }
        
        const data = await res.json();
        // Assuming API returns an array of sections, take the first one
        if (Array.isArray(data.sections) && data.sections.length > 0) {
          setAboutData(data.sections[0]);
        } else {
          throw new Error('No section data found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching about data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  useEffect(() => {
    if (!aboutData) return;

    const ctx = gsap.context(() => {
      // Simple fade in animation for cards
      gsap.fromTo('.about-element',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [aboutData]);

  // Loading state
  if (loading) {
    return (
      <section id="about" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading content...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="about" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-500">Error: {error}</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Failed to load content. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Default fallback data
  const defaultContent = {
    images: {
      coverImage: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      logo: "https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-4.0.3&w=400"
    },
    text: {
      longDescription: "Founded in 1995, the Institute of Advanced Technology has been at the forefront of technical education, providing cutting-edge programs in computer science, engineering, and information technology. Our institution is committed to fostering innovation, research, and industry collaboration.",
      mission: "To empower students through excellence in technical education, research, and innovation while fostering ethical leadership and social responsibility.",
      name: "Kips College",
      shortDescription: "Premier institution for technology and innovation education",
      vision: "To be a globally recognized center of excellence in technology education that transforms lives and drives innovation."
    }
  };

  // Use API data if available, otherwise use default data
  const content = aboutData?.content || defaultContent;

  // Static data for stats and values (not provided in API)
  const stats = [
    { number: '50+', label: 'Academic Programs', icon: '📚' },
    { number: '10k+', label: 'Students Enrolled', icon: '🎓' },
    { number: '500+', label: 'Expert Faculty', icon: '👨‍🏫' },
    { number: '95%', label: 'Success Rate', icon: '⭐' },
  ];

  const values = [
    { 
      icon: '🎯', 
      title: 'Excellence', 
      description: 'Commitment to the highest standards in teaching, research, and service.',
    },
    { 
      icon: '💡', 
      title: 'Innovation', 
      description: 'Fostering creativity and cutting-edge research across all disciplines.',
    },
    { 
      icon: '🤝', 
      title: 'Community', 
      description: 'Building inclusive environments that support diversity and collaboration.',
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <SectionTitle
          title={`About ${content.text.name}`}
          subtitle={content.text.shortDescription}
          align="center"
          underline={true}
          underlineVariant="primary"
          animation="fade"
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - College Image */}
          <div className="about-element">
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-80 lg:h-full">
              <Image
                src={content.images.coverImage}
                alt={`${content.text.name} Campus`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              
              {/* Experience Badge - Static since not in API */}
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">25+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Years Excellence</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - College Info */}
          <div className="about-element space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to {content.text.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {content.text.longDescription}
              </p>
            </div>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 gap-4">
              <Card className="border-0 shadow-md bg-blue-50 dark:bg-blue-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">
                      🎯
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Our Mission</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                        {content.text.mission}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-purple-50 dark:bg-purple-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white text-sm">
                      🚀
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Our Vision</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                        {content.text.vision}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Statistics - Static since not in API */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="about-element text-center border-0 shadow-md">
              <CardContent className="p-4">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Values Section - Static since not in API */}
        <div className="about-element">
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Our Core Values
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm max-w-2xl mx-auto">
              The principles that guide our institution and shape the future of our students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg mx-auto mb-3">
                    {value.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};