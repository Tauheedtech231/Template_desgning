"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { SectionTitle } from '../../../shared/SectionTitle';
import { Card, CardContent, CardHeader } from '../../../shared/Card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const Events: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);
  const [activeEvent, setActiveEvent] = useState(0);

  // Static events data
  const eventsData = {
    title: "Upcoming Events",
    subtitle: "Join us for exciting campus activities and academic events",
    events: [
      {
        id: "1",
        title: "Annual Tech Fest 2024",
        description: "Three days of innovation, workshops, and competitions featuring industry leaders and alumni speakers.",
        date: "2024-03-15",
        type: "Conference",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        time: "9:00 AM - 6:00 PM",
        location: "Main Auditorium",
        featured: true,
        seats: 250
      },
      {
        id: "2",
        title: "Career Fair & Networking",
        description: "Connect with top employers from tech, finance, and healthcare industries. Bring your resume!",
        date: "2024-03-22",
        type: "Workshop",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        time: "10:00 AM - 4:00 PM",
        location: "Campus Grounds",
        featured: false,
        seats: 500
      },
      {
        id: "3",
        title: "Research Symposium",
        description: "Showcase of undergraduate and graduate research projects across all departments.",
        date: "2024-04-05",
        type: "Academic",
        image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        time: "11:00 AM - 5:00 PM",
        location: "Science Building",
        featured: true,
        seats: 180
      },
      {
        id: "4",
        title: "Cultural Night",
        description: "An evening of music, dance, and food celebrating our diverse student community.",
        date: "2024-04-12",
        type: "Cultural",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        time: "6:00 PM - 10:00 PM",
        location: "Open Amphitheater",
        featured: false,
        seats: 300
      },
      {
        id: "5",
        title: "Hackathon",
        description: "48-hour coding marathon to solve real-world problems. Prizes worth $10,000.",
        date: "2024-04-20",
        type: "Competition",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        time: "All Day",
        location: "Computer Labs",
        featured: true,
        seats: 100
      },
      {
        id: "6",
        title: "Alumni Meet",
        description: "Network with successful alumni and learn about industry trends and opportunities.",
        date: "2024-04-25",
        type: "Networking",
        image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        time: "5:00 PM - 8:00 PM",
        location: "Alumni Center",
        featured: false,
        seats: 150
      }
    ]
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline for section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo('.event-section-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.2)" }
      );

      tl.fromTo('.event-featured',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.3"
      );

      // Animate event stats
      gsap.fromTo('.event-stat',
        { scale: 0, rotation: -10 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: '.event-stats',
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating animation for featured badge
      gsap.to('.floating-badge', {
        y: -8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatEventType = (type: string) => {
    return type.toUpperCase();
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Conference': 'bg-blue-100 text-blue-800 border-blue-200',
      'Workshop': 'bg-green-100 text-green-800 border-green-200',
      'Academic': 'bg-purple-100 text-purple-800 border-purple-200',
      'Cultural': 'bg-pink-100 text-pink-800 border-pink-200',
      'Competition': 'bg-amber-100 text-amber-800 border-amber-200',
      'Networking': 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const nextEvent = eventsData.events[0];

  return (
    <section id="events" ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={eventsData.title}
          subtitle={eventsData.subtitle}
          align="center"
          underline={true}
         
          animation="fade"
          className="event-section-title"
        />

        {/* Next Event Highlight */}
        <div className="event-featured mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-90"></div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>

            <div className="relative z-10 p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="floating-badge px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-bold">
                      NEXT EVENT
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getTypeColor(nextEvent.type)}`}>
                      {formatEventType(nextEvent.type)}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                    {nextEvent.title}
                  </h3>
                  
                  <p className="text-blue-100 mb-6 text-sm leading-relaxed max-w-lg">
                    {nextEvent.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                      <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <span className="text-white text-sm">{formatDate(nextEvent.date)}</span>
                    </div>
                    
                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                      <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span className="text-white text-sm">{nextEvent.time}</span>
                    </div>
                    
                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                      <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      <span className="text-white text-sm">{nextEvent.location}</span>
                    </div>
                  </div>
                  
                  <button className="px-6 py-3 bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm flex items-center gap-2 group/btn">
                    <span>Register Now</span>
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </button>
                </div>
                
                <div className="flex flex-col items-center justify-center">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-white mb-2">
                      {formatDate(nextEvent.date).split(' ')[1]}
                    </div>
                    <div className="text-blue-200 text-sm">
                      {formatDate(nextEvent.date).split(' ')[0]} {formatDate(nextEvent.date).split(' ')[2]}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-3">
                    {[15, 8, 45, 0].map((number, index) => (
                      <div key={index} className="text-center">
                        <div className="countdown-number bg-white/20 rounded-xl p-4 backdrop-blur-sm border border-white/30">
                          <div className="text-xl font-bold text-white">{number}</div>
                          <div className="text-xs text-blue-200 font-medium mt-1">
                            {['Days', 'Hrs', 'Min', 'Sec'][index]}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <div className="text-white text-sm mb-1">Seats Available</div>
                    <div className="w-48 bg-white/20 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full"
                        style={{ width: `${(nextEvent.seats / 300) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-blue-200 text-xs mt-1">{nextEvent.seats} of 300 remaining</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Events Stats */}
        <div className="event-stats mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: eventsData.events.length, label: 'Upcoming Events', color: 'blue' },
              { number: eventsData.events.filter(e => e.featured).length, label: 'Featured', color: 'purple' },
              { number: 1200, label: 'Total Seats', color: 'green' },
              { number: 6, label: 'Event Types', color: 'amber' }
            ].map((stat, index) => (
              <div key={index} className="event-stat text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <div className={`text-2xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400 mb-1`}>
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Events Slider */}
        <div className="relative">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="events-slider"
            onSlideChange={(swiper) => setActiveEvent(swiper.activeIndex)}
          >
            {eventsData.events.slice(1).map((event) => (
              <SwiperSlide key={event.id}>
                <Card className="group border-0 shadow-lg hover:shadow-xl h-full transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  <CardHeader className="p-0 overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getTypeColor(event.type)}`}>
                          {formatEventType(event.type)}
                        </span>
                      </div>
                      
                      {event.featured && (
                        <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold rounded-full">
                          FEATURED
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-grow flex flex-col p-5">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <svg className="w-3 h-3 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <span>{formatDate(event.date)}</span>
                      <span className="mx-2">•</span>
                      <svg className="w-3 h-3 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span>{event.time}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 leading-tight line-clamp-2">
                      {event.title}
                    </h3>
                    
                    <div className="flex-grow mb-4">
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {event.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <svg className="w-3 h-3 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-3 h-3 mr-1 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>{event.seats} seats</span>
                      </div>
                    </div>
                    
                    <button className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg text-sm group/btn">
                      <span className="flex items-center justify-center gap-2">
                        Learn More
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                      </span>
                    </button>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => swiperRef.current?.swiper.slidePrev()}
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              onClick={() => swiperRef.current?.swiper.slideNext()}
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Calendar Link */}
        <div className="text-center mt-12">
          <div className="inline-flex flex-col items-center gap-4">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span>View Full Events Calendar</span>
            </button>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mx-auto">
              Don not miss out on any events! Subscribe to our calendar for automatic updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};