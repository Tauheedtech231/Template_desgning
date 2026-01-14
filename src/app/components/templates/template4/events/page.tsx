"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUserFriends, FaChevronRight, FaArrowRight } from "react-icons/fa";

interface Event {
  id: number;
  title: string;
  date: string;
  day: string;
  time: string;
  location: string;
  description: string;
  capacity: number;
  category: string;
  featuredImage?: string;
}

const EventsSection: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Events data with featured images
  const eventsData: Event[] = [
    {
      id: 1,
      title: "Campus Open House",
      date: "Dec 15",
      day: "Friday",
      time: "10:00 AM - 3:00 PM",
      location: "Main Campus Hall",
      description: "Come visit our campus and see what we're all about. You'll have a chance to tour the facilities, meet current students, and chat with faculty members about our programs.",
      capacity: 120,
      category: "Campus",
      featuredImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      title: "Career Fair & Networking",
      date: "Jan 22",
      day: "Monday",
      time: "1:00 PM - 5:00 PM",
      location: "Student Union Building",
      description: "Meet with companies looking for interns and new graduates. Bring your resume and be ready to chat about opportunities in various industries. It's a good chance to make connections.",
      capacity: 200,
      category: "Career",
      featuredImage: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      title: "Guest Lecture Series",
      date: "Feb 08",
      day: "Thursday",
      time: "6:30 PM - 8:00 PM",
      location: "Lecture Hall B",
      description: "Industry leaders share insights about current trends and future directions. Each talk includes time for questions and discussion. Coffee and refreshments will be provided.",
      capacity: 80,
      category: "Academic",
      featuredImage: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      title: "Workshop: Practical Skills",
      date: "Mar 05",
      day: "Wednesday",
      time: "2:00 PM - 4:30 PM",
      location: "Learning Commons",
      description: "Hands-on session focused on developing practical skills that apply directly to workplace situations. You'll work through real scenarios and leave with actionable takeaways.",
      capacity: 40,
      category: "Workshop",
      featuredImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80"
    },
    {
      id: 5,
      title: "Student Research Symposium",
      date: "Apr 12",
      day: "Saturday",
      time: "9:00 AM - 1:00 PM",
      location: "Research Center",
      description: "Students present their research projects and findings. It's a chance to see the innovative work happening across disciplines and support fellow students in their academic pursuits.",
      capacity: 150,
      category: "Academic",
      featuredImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&auto=format&fit=crop&q=80"
    }
  ];

  // Continuous right-to-left slider effect
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const animateSlider = () => {
      const totalWidth = slider.scrollWidth;
      const visibleWidth = slider.clientWidth;
      
      if (slider.scrollLeft >= totalWidth - visibleWidth) {
        slider.scrollLeft = 0;
      } else {
        slider.scrollLeft += 0.5;
      }
      
      requestAnimationFrame(animateSlider);
    };

    const animationId = requestAnimationFrame(animateSlider);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Handle drag for manual control
  const handleDragStart = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleEventSelect = (index: number) => {
    setActiveEvent(index);
  };

  // Auto-rotate active event
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEvent(prev => (prev + 1) % eventsData.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [eventsData.length]);

  return (
    <>
      {/* Hero Section with improved design */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
          alt="Community events"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/40 via-teal-800/30 to-transparent" />
        
        {/* Overlay content with improved design */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 mb-6"
              >
                <div className="h-px w-12 bg-white/50" />
                <span className="text-white/90 text-sm tracking-wide">
                  Upcoming Events
                </span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                <span className="text-teal-600">Campus</span>
                <span className="text-white ml-3">Events</span>
              </h1>
              
              <div className="h-1 w-20 bg-teal-500/50 mb-6"></div>
              
              <p className="text-lg text-white/90 leading-relaxed max-w-xl font-light">
                Join us for conversations, workshops, and gatherings that bring our community together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Events content section with improved design */}
      <section className="relative bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          {/* Active event details */}
          <div className="mb-16 md:mb-20">
            <AnimatePresence mode="wait">
              {eventsData.map((event, index) => {
                if (index !== activeEvent) return null;
                
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
                  >
                    {/* Event image with date badge - improved rounded design */}
                    <div className="relative">
                      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl">
                        <Image
                          src={event.featuredImage || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80"}
                          alt={event.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                        
                        {/* Date badge - improved design */}
                        <div className="absolute top-6 left-6">
                          <div className="bg-white/95 backdrop-blur-sm px-5 py-3 text-center rounded-xl shadow-lg border border-white/20">
                            <div className="text-teal-600 text-xl font-semibold tracking-wide leading-none">
                              {event.date.split(' ')[0]}
                            </div>
                            <div className="text-gray-800 text-sm font-medium mt-1">
                              {event.date.split(' ')[1]}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Event details - improved design */}
                    <div className="flex flex-col justify-center">
                      <div className="p-6 md:p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                        {/* Event title and category */}
                        <div className="mb-8">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center border border-teal-200">
                                <FaCalendarAlt className="h-5 w-5 text-teal-600" />
                              </div>
                              <span className="text-sm text-teal-700 uppercase tracking-wide font-medium">
                                {event.category}
                              </span>
                            </div>
                            <div className="px-4 py-2 bg-teal-50 border border-teal-200 rounded-full">
                              <span className="text-sm text-teal-700 font-medium flex items-center gap-2">
                                <FaUserFriends className="h-3 w-3" />
                                {event.capacity} spots
                              </span>
                            </div>
                          </div>
                          
                          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-6">
                            {event.title}
                          </h2>
                        </div>
                        
                        {/* Event description */}
                        <div className="mb-8">
                          <p className="text-gray-600 leading-relaxed text-base">
                            {event.description}
                          </p>
                        </div>
                        
                        {/* Event details - improved design */}
                        <div className="space-y-4 mb-8">
                          <div className="flex items-center gap-4 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                            <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0 border border-teal-200">
                              <FaClock className="h-5 w-5 text-teal-600" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 mb-1">Time</div>
                              <div className="text-gray-900 font-semibold">{event.time}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                            <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0 border border-teal-200">
                              <FaMapMarkerAlt className="h-5 w-5 text-teal-600" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 mb-1">Location</div>
                              <div className="text-gray-900 font-semibold">{event.location}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                            <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0 border border-teal-200">
                              <FaUserFriends className="h-5 w-5 text-teal-600" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 mb-1">Day</div>
                              <div className="text-gray-900 font-semibold">{event.day}</div>
                            </div>
                          </div>
                        </div>

                      
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Horizontal Slider Section - Improved Design */}
          <div className="mt-20">
            <div className="mb-10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-px w-8 bg-teal-400" />
                    <span className="text-sm text-teal-700 tracking-wide font-medium">
                      Browse All Events
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    More Upcoming Events
                  </h3>
                </div>
                
                {/* View all button */}
                
              </div>
            </div>
            
            {/* Slider container with improved design */}
            <div className="relative overflow-hidden">
              {/* Gradient overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none" />
              
              {/* Continuous slider */}
              <div
                ref={sliderRef}
                className="flex gap-5 md:gap-6 overflow-x-auto scrollbar-hide py-4"
                style={{ scrollBehavior: 'auto' }}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onDragStart={(e) => e.preventDefault()}
              >
                {/* First set of events */}
                {eventsData.map((event, index) => (
                  <div
                    key={`first-${event.id}`}
                    className={`flex-shrink-0 w-72 md:w-80 cursor-pointer transition-all duration-300 ${
                      activeEvent === index 
                        ? 'opacity-100' 
                        : 'opacity-90 hover:opacity-100'
                    }`}
                    onClick={() => handleEventSelect(index)}
                  >
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300 h-full">
                      {/* Date badge */}
                      <div className="mb-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-50 rounded-lg border border-teal-100">
                          <FaCalendarAlt className="h-3.5 w-3.5 text-teal-600" />
                          <span className="text-teal-700 text-sm font-medium">
                            {event.date} • {event.day}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg leading-tight">
                        {event.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <FaMapMarkerAlt className="h-3.5 w-3.5" />
                        <span>{event.location}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <FaClock className="h-3.5 w-3.5 text-gray-400" />
                          <span className="text-sm text-gray-600">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1 text-teal-600">
                          <span className="text-sm font-medium">Details</span>
                          <FaChevronRight className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {eventsData.map((event, index) => (
                  <div
                    key={`second-${event.id}`}
                    className={`flex-shrink-0 w-72 md:w-80 cursor-pointer transition-all duration-300 ${
                      activeEvent === index 
                        ? 'opacity-100' 
                        : 'opacity-90 hover:opacity-100'
                    }`}
                    onClick={() => handleEventSelect(index)}
                  >
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300 h-full">
                      {/* Date badge */}
                      <div className="mb-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-50 rounded-lg border border-teal-100">
                          <FaCalendarAlt className="h-3.5 w-3.5 text-teal-600" />
                          <span className="text-teal-700 text-sm font-medium">
                            {event.date} • {event.day}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg leading-tight">
                        {event.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <FaMapMarkerAlt className="h-3.5 w-3.5" />
                        <span>{event.location}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <FaClock className="h-3.5 w-3.5 text-gray-400" />
                          <span className="text-sm text-gray-600">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1 text-teal-600">
                          <span className="text-sm font-medium">Details</span>
                          <FaChevronRight className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress indicator - improved design */}
            <div className="flex items-center justify-between mt-10">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  {eventsData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleEventSelect(index)}
                      className="focus:outline-none group"
                      aria-label={`View event ${index + 1}`}
                    >
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          index === activeEvent 
                            ? 'w-8 bg-teal-600' 
                            : 'w-3 bg-gray-300 group-hover:bg-gray-400'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                
                <div className="text-sm text-gray-600 ml-4">
                  <span className="font-semibold text-teal-700">{activeEvent + 1}</span>
                  <span className="mx-2 text-gray-400">of</span>
                  <span className="font-medium text-gray-800">{eventsData.length}</span>
                </div>
              </div>
              
             
            </div>
          </div>

        </div>

        {/* Add CSS for hiding scrollbar */}
        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Decorative elements */}
        <div className="h-px bg-gradient-to-r from-transparent via-teal-200/50 to-transparent max-w-7xl mx-auto" />
      </section>
    </>
  );
};

export default EventsSection;