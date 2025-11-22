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

export const Events: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for events animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: eventsRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo('.event-card',
        { opacity: 0, y: 50, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "back.out(1.7)" 
        }
      );

      // Countdown animation for next event
      gsap.fromTo('.countdown-number',
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 1,
          stagger: 0.1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: '.countdown-section',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const nextEvent = defaultCollegeInfo.events[0];

  return (
    <section id="events" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Upcoming Events"
          subtitle="Join us for exciting campus activities and academic events"
          align="center"
          underline={true}
          underlineVariant="primary"
          animation="fade"
        />

        {/* Next Event Highlight */}
        {nextEvent && (
          <div className="countdown-section mb-12">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden border-0 shadow-xl">
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div>
                    <h3 className="text-lg font-bold mb-3">Next Event</h3>
                    <h4 className="text-xl font-bold mb-3">{nextEvent.title}</h4>
                    <p className="text-blue-100 mb-4 text-sm leading-relaxed">{nextEvent.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <div className="flex items-center bg-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        {formatDate(nextEvent.date)}
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        {nextEvent.time}
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        {nextEvent.location}
                      </div>
                    </div>
                    <button className="mt-4 px-6 py-2.5 bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md text-sm">
                      Register Now
                    </button>
                  </div>
                  <div className="flex justify-center space-x-3">
                    {/* Countdown Timer */}
                    {[['15', 'Days'], ['08', 'Hours'], ['45', 'Minutes']].map(([number, label], index) => (
                      <div key={index} className="text-center">
                        <div className="countdown-number bg-white/20 rounded-xl p-3 backdrop-blur-sm border border-white/30">
                          <div className="text-xl font-bold">{number}</div>
                          <div className="text-xs opacity-90 font-medium">{label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Events List */}
        <div ref={eventsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultCollegeInfo.events.map((event) => (
            <Card key={event.id} hover className="event-card group border-0 shadow-lg hover:shadow-xl flex flex-col h-full transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="p-0 overflow-hidden">
                <div className="relative h-40 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Event Type Overlay */}
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                      Event
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow flex flex-col p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                  {event.title}
                </h3>
                
                <div className="flex-grow mb-4">
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mr-2 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <button className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg text-sm">
                  Learn More
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Calendar Link */}
        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm">
            View Full Events Calendar
          </button>
        </div>
      </div>
    </section>
  );
};