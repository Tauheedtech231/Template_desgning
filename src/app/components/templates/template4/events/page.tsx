"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUserFriends } from "react-icons/fa";

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
        // Reset to beginning without animation for seamless loop
        slider.scrollLeft = 0;
      } else {
        // Smooth continuous scroll
        slider.scrollLeft += 0.5; // Adjust speed here
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
    const walk = (x - startX) * 2; // Adjust sensitivity
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
      {/* Hero Section with background image */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
          alt="Community events"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Overlay content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-white/50" />
                <span className="text-white/90 text-sm tracking-wide">
                  Community gatherings
                </span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl font-medium text-[#E86A58] mb-6 leading-tight">
                Upcoming events
              </h1>
              
              <p className="text-lg text-white/90 leading-relaxed max-w-xl">
                Join us for conversations, workshops, and gatherings that bring our community together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Events content section */}
      <section className="relative bg-[#FAFAFA] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
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
                    {/* Event image with date badge */}
                    <div className="relative">
                      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                        <Image
                          src={event.featuredImage || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80"}
                          alt={event.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                        
                        {/* Date badge */}
                        <div className="absolute top-6 left-6">
                          <div className="bg-white px-4 py-3 text-center shadow-sm">
                            <div className="text-[#E86A58] text-lg font-medium tracking-wide leading-none">
                              {event.date.split(' ')[0]}
                            </div>
                            <div className="text-[#1E1E1E] text-sm font-medium">
                              {event.date.split(' ')[1]}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Event details */}
                    <div className="flex flex-col justify-center">
                      <div className="p-6 md:p-8 bg-white shadow-sm">
                        {/* Event title and category */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#E86A58]/10 flex items-center justify-center">
                                <FaCalendarAlt className="h-4 w-4 text-[#E86A58]" />
                              </div>
                              <span className="text-sm text-[#5A5A5A] uppercase tracking-wide">
                                {event.category}
                              </span>
                            </div>
                            <div className="px-3 py-1 border border-[#E5E5E5] rounded-full">
                              <span className="text-xs text-[#5A5A5A] font-medium">
                                {event.capacity} spots
                              </span>
                            </div>
                          </div>
                          
                          <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#1E1E1E] leading-tight mb-4">
                            {event.title}
                          </h2>
                        </div>
                        
                        {/* Event description */}
                        <div className="mb-8">
                          <p className="text-[#5A5A5A] leading-relaxed tracking-tight text-base">
                            {event.description}
                          </p>
                        </div>
                        
                        {/* Event details */}
                        <div className="space-y-4 mb-8">
                          <div className="flex items-center gap-3 text-[#5A5A5A]">
                            <div className="w-10 h-10 rounded-full bg-[#E5E5E5] flex items-center justify-center flex-shrink-0">
                              <FaClock className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="text-sm text-[#5A5A5A]">Time</div>
                              <div className="text-[#1E1E1E] font-medium">{event.time}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 text-[#5A5A5A]">
                            <div className="w-10 h-10 rounded-full bg-[#E5E5E5] flex items-center justify-center flex-shrink-0">
                              <FaMapMarkerAlt className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="text-sm text-[#5A5A5A]">Location</div>
                              <div className="text-[#1E1E1E] font-medium">{event.location}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 text-[#5A5A5A]">
                            <div className="w-10 h-10 rounded-full bg-[#E5E5E5] flex items-center justify-center flex-shrink-0">
                              <FaUserFriends className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="text-sm text-[#5A5A5A]">Day</div>
                              <div className="text-[#1E1E1E] font-medium">{event.day}</div>
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

          {/* Horizontal Slider - Continuous right to left */}
          <div className="mt-16">
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-[#E86A58]/30" />
                <span className="text-sm text-[#5A5A5A] tracking-wide">
                  Browse all events
                </span>
              </div>
            </div>
            
            {/* Slider container */}
            <div className="relative overflow-hidden">
              {/* Gradient overlays for smooth edges */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10" />
              
              {/* Continuous slider */}
              <div
                ref={sliderRef}
                className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide"
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
                    className={`flex-shrink-0 w-64 md:w-80 cursor-pointer transition-all duration-300 ${
                      activeEvent === index 
                        ? 'opacity-100 scale-105' 
                        : 'opacity-80 hover:opacity-100'
                    }`}
                    onClick={() => handleEventSelect(index)}
                  >
                    <div className="bg-white p-4 shadow-sm border border-[#E5E5E5]">
                      <div className="mb-3">
                        <div className="text-[#E86A58] text-sm font-medium">
                          {event.date}
                        </div>
                        <h3 className="font-medium text-[#1E1E1E] mt-1">
                          {event.title}
                        </h3>
                      </div>
                      <div className="text-xs text-[#5A5A5A]">
                        {event.location}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {eventsData.map((event, index) => (
                  <div
                    key={`second-${event.id}`}
                    className={`flex-shrink-0 w-64 md:w-80 cursor-pointer transition-all duration-300 ${
                      activeEvent === index 
                        ? 'opacity-100 scale-105' 
                        : 'opacity-80 hover:opacity-100'
                    }`}
                    onClick={() => handleEventSelect(index)}
                  >
                    <div className="bg-white p-4 shadow-sm border border-[#E5E5E5]">
                      <div className="mb-3">
                        <div className="text-[#E86A58] text-sm font-medium">
                          {event.date}
                        </div>
                        <h3 className="font-medium text-[#1E1E1E] mt-1">
                          {event.title}
                        </h3>
                      </div>
                      <div className="text-xs text-[#5A5A5A]">
                        {event.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="flex gap-2">
                {eventsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleEventSelect(index)}
                    className="focus:outline-none"
                    aria-label={`View event ${index + 1}`}
                  >
                    <div 
                      className={`h-1 rounded-full transition-all duration-300 ${
                        index === activeEvent 
                          ? 'w-6 bg-[#E86A58]' 
                          : 'w-2 bg-[#E5E5E5] hover:bg-[#D0D0D0]'
                      }`}
                    />
                  </button>
                ))}
              </div>
              
              <div className="text-sm text-[#5A5A5A]">
                <span className="font-medium">{activeEvent + 1}</span>
                <span className="mx-2">of</span>
                <span>{eventsData.length}</span>
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

        {/* Subtle section separator */}
        <div className="h-px bg-[#E5E5E5] max-w-4xl mx-auto" />
      </section>
    </>
  );
};

export default EventsSection;