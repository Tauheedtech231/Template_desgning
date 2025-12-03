"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { SectionTitle } from '../../../shared/SectionTitle';
import { Card, CardContent, CardHeader } from '../../../shared/Card';
import { defaultCollegeInfo } from '../data/collegeInfo';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
/* eslint-disable */

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  image: string;
  time?: string;
  location?: string;
  // Additional fields from API if they exist
  [key: string]: any;
}

interface EventsSection {
  id: number;
  template_id: number;
  section_name: string;
  content: {
    events: EventItem[];
    title?: string;
    subtitle?: string;
  };
  created_at: string;
}

export const Events: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const [eventsData, setEventsData] = useState<EventsSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const res = await fetch(
          "https://nes-tick-portfolio-handler.vercel.app/api/sections?template_id=1&section_name=Events",
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched events data:", data);
        
        // Assuming API returns an array of sections, take the first one
        if (Array.isArray(data.sections) && data.sections.length > 0) {
          setEventsData(data.sections[0]);
        } else {
          throw new Error('No events data found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsData();
  }, []);

  useEffect(() => {
    if (!eventsData) return;

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
  }, [eventsData]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Loading state
  if (loading) {
    return (
      <section id="events" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="events" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-500">Error: {error}</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Failed to load events. Using default data.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Use API data if available, otherwise use default data
  const content = eventsData?.content || {
    events: defaultCollegeInfo.events,
    title: "Upcoming Events",
    subtitle: "Join us for exciting campus activities and academic events"
  };

  const events = content.events || [];
  const nextEvent = events[0];

  // Format event type for display
  const formatEventType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  // Calculate days until event for countdown (simple implementation)
  const getDaysUntilEvent = (dateString: string) => {
    try {
      const eventDate = new Date(dateString);
      const today = new Date();
      const diffTime = eventDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays.toString() : "0";
    } catch {
      return "15"; // Default fallback
    }
  };

  return (
    <section id="events" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={content.title || "Upcoming Events"}
          subtitle={content.subtitle || "Join us for exciting campus activities and academic events"}
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
                    <p className="text-blue-100 mb-4 text-sm leading-relaxed">
                      {nextEvent.description || "Join us for this exciting event!"}
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <div className="flex items-center bg-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        {formatDate(nextEvent.date)}
                      </div>
                      {nextEvent.time && (
                        <div className="flex items-center bg-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          {nextEvent.time}
                        </div>
                      )}
                      {nextEvent.location && (
                        <div className="flex items-center bg-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>
                          {nextEvent.location}
                        </div>
                      )}
                      <div className="flex items-center bg-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
  <span className="text-xs font-medium">
    Type:{' '}
    {'type' in nextEvent && nextEvent.type
      ? formatEventType(nextEvent.type)
      : formatEventType("event")}
  </span>
</div>

                    </div>
                    <button className="mt-4 px-6 py-2.5 bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md text-sm">
                      Register Now
                    </button>
                  </div>
                  <div className="flex justify-center space-x-3">
                    {/* Countdown Timer */}
                    {[
                      [getDaysUntilEvent(nextEvent.date), 'Days'], 
                      ['08', 'Hours'], 
                      ['45', 'Minutes']
                    ].map(([number, label], index) => (
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
        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">No upcoming events at the moment.</p>
          </div>
        ) : (
          <>
            <div ref={eventsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card key={event.id} hover className="event-card group border-0 shadow-lg hover:shadow-xl flex flex-col h-full transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader className="p-0 overflow-hidden">
                    <div className="relative h-40 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      {event.image ? (
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            // Show fallback background
                            target.parentElement!.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">Event</span>
                        </div>
                      )}
                      {/* Event Type Overlay */}
                      <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1">
  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
    {'type' in event && event.type
      ? formatEventType(event.type)
      : formatEventType("event")}
  </span>
</div>

                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-grow flex flex-col p-5">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                      {event.title}
                    </h3>
                    
                    <div className="flex-grow mb-4">
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {event.description || "Join us for this exciting event!"}
                      </p>
                    </div>

                    <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <svg className="w-3 h-3 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span>{formatDate(event.date)}</span>
                      </div>
                      {event.time && (
                        <div className="flex items-center">
                          <svg className="w-3 h-3 mr-2 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <span>{event.time}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center">
                          <svg className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>
                          <span>{event.location}</span>
                        </div>
                      )}
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
          </>
        )}
      </div>
    </section>
  );
};