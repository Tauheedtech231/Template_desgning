"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { SectionTitle } from '../../../shared/SectionTitle';
import { Card, CardContent, CardHeader } from '../../../shared/Card';
import { defaultCollegeInfo } from '../data/collegeInfo';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const Faculty: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for faculty cards
      gsap.fromTo('.faculty-card',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stats animation
      gsap.fromTo('.faculty-stat',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="faculty" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Meet Our Faculty"
          subtitle="Distinguished educators and researchers dedicated to your success"
          align="center"
          underline={true}
          underlineVariant="primary"
          animation="fade"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultCollegeInfo.faculty.map((faculty) => (
            <Card key={faculty.id} hover className="faculty-card group border-0 shadow-lg hover:shadow-xl flex flex-col h-full transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="text-center pb-4 pt-6">
                {/* Faculty Image */}
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={faculty.image}
                    alt={faculty.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {faculty.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-1">{faculty.position}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">{faculty.department}</p>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col p-5">
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
                  {faculty.bio}
                </p>
                <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                  {faculty.qualifications.map((qual, index) => (
                    <div
                      key={index}
                      className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 border border-gray-200 dark:border-gray-700"
                    >
                      {qual}
                    </div>
                  ))}
                </div>
                <button className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg text-sm">
                  View Profile
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Faculty Stats */}
        {/* <div ref={statsRef} className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="faculty-stat">
              <div className="text-xl font-bold mb-1">95%</div>
              <div className="text-blue-100 text-xs font-medium">PhD Holders</div>
            </div>
            <div className="faculty-stat">
              <div className="text-xl font-bold mb-1">15+</div>
              <div className="text-blue-100 text-xs font-medium">Years Experience</div>
            </div>
            <div className="faculty-stat">
              <div className="text-xl font-bold mb-1">50+</div>
              <div className="text-blue-100 text-xs font-medium">Publications</div>
            </div>
            <div className="faculty-stat">
              <div className="text-xl font-bold mb-1">25</div>
              <div className="text-blue-100 text-xs font-medium">Awards & Honors</div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};