"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUserFriends, FaSearch } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

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
  featuredImage: string;
}

// Component that uses useSearchParams - wrapped in Suspense boundary
function EventsContent() {
  const searchParams = useSearchParams();
  const [collegeId, setCollegeId] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get college ID from URL
  useEffect(() => {
    let id = searchParams.get('college_id');
    if (!id) {
      id = sessionStorage.getItem('college_id');
    }
    if (id) {
      setCollegeId(id);
      sessionStorage.setItem('college_id', id);
      console.log('🏫 [Events] College ID loaded:', id);
    }
  }, [searchParams]);

  // Fetch events data from API
  useEffect(() => {
    async function fetchEventsData() {
      if (!collegeId) {
        console.log('⚠️ [Events] No college ID, skipping fetch');
        setLoading(false);
        return;
      }
      
      setLoading(true);
      console.log('🔄 [Events] Fetching events data for college ID:', collegeId);
      
      try {
        const response = await fetch(`/api/public/sections?college_id=${collegeId}&section_name=Events`);
        console.log('📡 [Events] API Response Status:', response.status);
        
        const data = await response.json();
        console.log('📦 [Events] Full API Response:', JSON.stringify(data, null, 2));
        
        if (data.success && data.content) {
          if (data.content.events && Array.isArray(data.content.events)) {
            setEventsData(data.content.events);
            setFilteredEvents(data.content.events);
            console.log('✅ [Events] Loaded', data.content.events.length, 'events');
          } else {
            console.log('⚠️ [Events] No events array in content');
          }
        } else {
          console.log('❌ [Events] No content or success false');
        }
      } catch (error) {
        console.error('❌ [Events] Error fetching events data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchEventsData();
  }, [collegeId]);

  // Animation triggers
  useEffect(() => {
    const headingTimer = setTimeout(() => {
      setIsHeadingVisible(true);
    }, 300);

    const subtitleTimer = setTimeout(() => {
      setIsSubtitleVisible(true);
    }, 800);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);

      const cards = document.querySelectorAll('.event-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.85 && rect.bottom >= 0);
        if (isVisible) {
          card.classList.add('animate-card-enter');
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    setTimeout(() => {
      const cards = document.querySelectorAll('.event-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animate-card-enter');
        }, index * 100);
      });
    }, 1200);

    return () => {
      clearTimeout(headingTimer);
      clearTimeout(subtitleTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, eventsData]);

  // Filter events based on search term
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const searchLower = searchTerm.toLowerCase();
      const results = eventsData.filter(event => 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower) ||
        event.category.toLowerCase().includes(searchLower)
      );
      setFilteredEvents(results);
      
      // Generate suggestions
      const allSuggestions = eventsData.flatMap(event => [
        event.title,
        event.category,
        event.location.split(',')[0]
      ]);
      const uniqueSuggestions = [...new Set(allSuggestions)];
      const filteredSuggestions = uniqueSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 5));
    } else {
      setFilteredEvents(eventsData);
      setSuggestions([]);
    }
  }, [searchTerm, eventsData]);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-[#0B1220]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1220] text-white" ref={containerRef}>
      {/* Hero Section with Center Alignment */}
      <div className="relative min-h-[45vh] flex flex-col items-center justify-center px-4 py-12 md:py-16 overflow-visible">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-teal-600/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-600/3 rounded-full blur-3xl" />
        </div>

        {/* Centered Content */}
        <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
          {/* Animated Heading */}
          <div className="overflow-hidden mb-6 md:mb-8">
            <div className="relative">
              <div 
                className={`
                  transform transition-all duration-1000 ease-out
                  ${isHeadingVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
                `}
              >
                <h1 className="text-4xl md:text-6xl font-bold">
                  <span className="block text-teal-600 mb-2">
                    Discover
                  </span>
                </h1>
              </div>
              
              <div 
                className={`
                  transform transition-all duration-1000 ease-out delay-300
                  ${isHeadingVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
                `}
              >
                <h1 className="text-4xl md:text-6xl font-bold">
                  <span className="block text-white">
                    Campus Events
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* Subtitle with enter/exit animation */}
          <div 
            className={`
              transition-all duration-1000 ease-out delay-700
              ${isSubtitleVisible ? 
                'translate-y-0 opacity-100 blur-0' : 
                'translate-y-8 opacity-0 blur-sm'
              }
            `}
          >
            <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto">
              Explore and join events happening across our university campus
            </p>
          </div>

          {/* Search Bar with Suggestions */}
          <div 
            className={`
              max-w-2xl mx-auto transition-all duration-1000 ease-out delay-1000
              ${isSubtitleVisible ? 
                'translate-y-0 opacity-100 blur-0' : 
                'translate-y-8 opacity-0 blur-sm'
              }
            `}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="relative z-50 flex-1">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search events by title, location, or category..."
                  className="w-full pl-12 pr-6 py-4 md:py-3 bg-gray-900/80 backdrop-blur-sm rounded-full border border-gray-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white placeholder-gray-400 text-base md:text-lg transition-all duration-300 relative z-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                />

                {/* Search Suggestions */}
                {suggestions.length > 0 && (searchTerm || isSearchFocused) && (
                  <div className="absolute w-full mt-2 bg-gray-900/95 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-2xl overflow-hidden animate-fadeIn z-50">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-6 py-3 hover:bg-gray-800/50 cursor-pointer transition-colors duration-200 border-b border-gray-800 last:border-b-0"
                        onMouseDown={() => handleSuggestionClick(suggestion)}
                      >
                        <div className="flex items-center gap-3">
                          <FaSearch className="h-4 w-4 text-teal-400 flex-shrink-0" />
                          <span className="text-gray-200">{suggestion}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Events Counter */}
              <div className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 bg-gray-900/50 rounded-full border border-gray-800 whitespace-nowrap flex-shrink-0">
                <span className="text-xs md:text-sm text-gray-300">Total</span>
                <span className="text-lg md:text-xl font-bold text-teal-400">{filteredEvents.length}</span>
              </div>
            </div>

            {/* Search Hint */}
            <p className="text-sm text-gray-400 mt-3 md:mt-4">
              {searchTerm ? `Found ${filteredEvents.length} events` : "Try searching for 'Campus', 'Workshop', or 'Symposium'"}
            </p>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {filteredEvents.map((event, index) => {
              const isEven = index % 2 === 0;
              const animationDirection = isEven ? 'slide-from-left' : 'slide-from-right';
              
              return (
                <div
                  key={event.id}
                  className={`
                    event-card group bg-gray-900 rounded-2xl border border-gray-800 
                    overflow-hidden hover:border-teal-600/50 transition-all duration-500 
                    hover:shadow-2xl hover:shadow-teal-900/10 flex flex-col h-full
                    ${animationDirection}
                    opacity-0
                  `}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    {event.featuredImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={event.featuredImage}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <FaCalendarAlt className="h-12 w-12 text-gray-600" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="px-4 py-2 bg-teal-600/90 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                        {event.category}
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-teal-400 transition-colors duration-300">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-3 mb-6 flex-1">
                      {/* Date & Time */}
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-teal-600/20 transition-colors duration-300 flex-shrink-0">
                          <FaCalendarAlt className="h-4 w-4 text-teal-400" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Date & Time</div>
                          <div className="text-sm text-white">
                            {event.day}, {event.date} • {event.time}
                          </div>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-teal-600/20 transition-colors duration-300 flex-shrink-0">
                          <FaMapMarkerAlt className="h-4 w-4 text-teal-400" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Location</div>
                          <div className="text-sm text-white">{event.location}</div>
                        </div>
                      </div>

                      {/* Capacity */}
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-teal-600/20 transition-colors duration-300 flex-shrink-0">
                          <FaUserFriends className="h-4 w-4 text-teal-400" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Available Seats</div>
                          <div className="text-sm text-white">{event.capacity} seats available</div>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => window.location.href = `/components/templates/template4/contact?college_id=${collegeId}`}
                      className="w-full py-3 bg-gray-800 hover:bg-teal-600 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-6">
              <FaSearch className="h-16 w-16 text-gray-700 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No events found</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              {searchTerm ? `No events match your search for "${searchTerm}".` : "No events scheduled yet. Check back later!"}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"
              >
                Show All Events
              </button>
            )}
          </div>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInFromLeft {
          from { opacity: 0; transform: translateX(-80px) rotateY(10deg); filter: blur(5px); }
          to { opacity: 1; transform: translateX(0) rotateY(0); filter: blur(0); }
        }

        @keyframes slideInFromRight {
          from { opacity: 0; transform: translateX(80px) rotateY(-10deg); filter: blur(5px); }
          to { opacity: 1; transform: translateX(0) rotateY(0); filter: blur(0); }
        }

        @keyframes cardEnter {
          from { opacity: 0; transform: translateY(50px) scale(0.95); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-card-enter { animation: cardEnter 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
        .slide-from-left { animation: slideInFromLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .slide-from-right { animation: slideInFromRight 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
        .event-card:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 25px 50px -12px rgba(45, 212, 191, 0.25); }

        @media (max-width: 768px) {
          .slide-from-left, .slide-from-right { animation: cardEnter 0.6s ease-out forwards; }
        }
      `}</style>
    </div>
  );
}

// Main component with Suspense boundary
const EventsSection: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="min-h-[400px] flex items-center justify-center bg-[#0B1220]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    }>
      <EventsContent />
    </Suspense>
  );
};

export default EventsSection;