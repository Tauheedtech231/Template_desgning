"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUserFriends, FaSearch } from "react-icons/fa";

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

const EventsSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);

  // Animation triggers
  useEffect(() => {
    // Heading animation
    const headingTimer = setTimeout(() => {
      setIsHeadingVisible(true);
    }, 300);

    // Subtitle animation
    const subtitleTimer = setTimeout(() => {
      setIsSubtitleVisible(true);
    }, 800);

    return () => {
      clearTimeout(headingTimer);
      clearTimeout(subtitleTimer);
    };
  }, []);

  const eventsData: Event[] = [
    {
      id: 1,
      title: "Campus Open House 2024",
      date: "December 15",
      day: "Friday",
      time: "9:00 AM - 4:00 PM",
      location: "Main Campus Auditorium",
      description: "Explore our campus facilities and academic programs. Meet faculty and current students during guided tours.",
      capacity: 200,
      category: "Admission",
      featuredImage: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2064&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Tech Career Development Workshop",
      date: "January 22",
      day: "Monday",
      time: "2:00 PM - 5:00 PM",
      location: "Engineering Building, Room 302",
      description: "Learn about career opportunities in technology. Industry experts will share insights and opportunities.",
      capacity: 80,
      category: "Career",
      featuredImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Annual Research Symposium",
      date: "February 8",
      day: "Thursday",
      time: "10:00 AM - 4:00 PM",
      location: "Science Research Center",
      description: "Annual showcase of student research projects across all disciplines. Open to public and industry partners.",
      capacity: 150,
      category: "Academic",
      featuredImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Alumni Networking Night",
      date: "March 5",
      day: "Wednesday",
      time: "6:00 PM - 9:00 PM",
      location: "University Club Lounge",
      description: "Connect with successful alumni from various industries. Networking opportunities for current students.",
      capacity: 120,
      category: "Networking",
      featuredImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Sports Tournament Finals",
      date: "April 12",
      day: "Saturday",
      time: "11:00 AM - 6:00 PM",
      location: "University Sports Ground",
      description: "Annual inter-department sports tournament finals. Cricket, Football, and Basketball championship matches.",
      capacity: 500,
      category: "Sports",
      featuredImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Cultural Fest 2024",
      date: "May 18",
      day: "Saturday",
      time: "4:00 PM - 10:00 PM",
      location: "Central Campus Lawn",
      description: "Annual cultural festival featuring music, dance, food stalls, and performances from different states.",
      capacity: 1000,
      category: "Cultural",
      featuredImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    let results = eventsData;
    
    if (searchTerm.trim() !== "") {
      const searchLower = searchTerm.toLowerCase();
      results = results.filter(event => 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower) ||
        event.category.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredEvents(results);
    
    // Generate suggestions
    if (searchTerm.trim() !== "") {
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
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      {/* Hero Section with Center Alignment */}
      <div className="relative min-h-[45vh] flex flex-col items-center justify-center px-4 py-12 md:py-16 overflow-hidden">
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
              {/* "Discover" with left-to-right animation */}
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
              
              {/* "Campus Events" with right-to-left animation */}
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
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events by title, location, or category..."
                className="w-full pl-12 pr-6 py-4 md:py-3 bg-gray-900/80 backdrop-blur-sm rounded-full border border-gray-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white placeholder-gray-400 text-base md:text-lg transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              />

              {/* Search Suggestions */}
              {suggestions.length > 0 && searchTerm && (
                <div className="absolute w-full mt-2 bg-gray-900/95 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-lg overflow-hidden animate-fadeIn z-50">
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

            {/* Search Hint */}
            <p className="text-sm text-gray-400 mt-3 md:mt-4">
              {searchTerm ? `Found ${filteredEvents.length} events` : "Try searching for 'Campus', 'Workshop', or 'Symposium'"}
            </p>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Events Counter */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900/50 rounded-full border border-gray-800">
            <span className="text-gray-300">Showing</span>
            <span className="text-2xl font-bold text-teal-400">{filteredEvents.length}</span>
            <span className="text-gray-300">{filteredEvents.length === 1 ? 'event' : 'events'}</span>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="group bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden hover:border-teal-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-900/10 flex flex-col h-full animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.featuredImage}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
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
                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-teal-400 transition-colors duration-300">
                    {event.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Event Details List */}
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
                    onClick={() => window.location.href = "/components/templates/template4/contact"}
                    className="w-full py-3 bg-gray-800 hover:bg-teal-600 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-6">
              <FaSearch className="h-16 w-16 text-gray-700 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No events found</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              No events match your search for {searchTerm}. Try different keywords.
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"
            >
              Show All Events
            </button>
          </div>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes fadeOutDown {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
          to {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
            filter: blur(4px);
          }
        }

        .animate-slideUp {
          opacity: 0;
          animation: slideUp 0.6s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-slide-left {
          animation: slideInFromLeft 1s ease-out forwards;
        }

        .animate-slide-right {
          animation: slideInFromRight 1s ease-out forwards 0.3s;
        }

        .animate-fade-up {
          animation: fadeInUp 1.2s ease-out forwards;
        }

        .animate-fade-down {
          animation: fadeOutDown 0.8s ease-in forwards;
        }

        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      `}</style>
    </div>
  );
};

export default EventsSection;