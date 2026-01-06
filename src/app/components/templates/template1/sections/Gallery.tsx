"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { SectionTitle } from '../../../shared/SectionTitle';
import { Card, CardContent } from '../../../shared/Card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt,
  FaHeart,
  FaShareAlt,
  FaExpand,
  FaChevronRight,
  FaCamera,
  FaUsers,
  FaGraduationCap,
  FaPaintBrush,
  FaFlask,
  FaFutbol
} from 'react-icons/fa';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  likes?: number;
}

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  // Simplified static gallery data
  const galleryImages: GalleryImage[] = [
    {
      id: '1',
      title: 'Morning Lectures',
      description: 'Students engaging in morning discussions',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'academics',
      date: '2024-03-15',
      likes: 45
    },
    {
      id: '2',
      title: 'Science Lab',
      description: 'Hands-on experiments in progress',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'science',
      date: '2024-03-14',
      likes: 32
    },
    {
      id: '3',
      title: 'Campus Garden',
      description: 'Student-led garden project',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'campus',
      date: '2024-03-10',
      likes: 28
    },
    {
      id: '4',
      title: 'Sports Day',
      description: 'Annual university sports competition',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'sports',
      date: '2024-03-08',
      likes: 56
    },
    {
      id: '5',
      title: 'Art Exhibition',
      description: 'Student artwork showcase',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'arts',
      date: '2024-03-05',
      likes: 39
    },
    {
      id: '6',
      title: 'Study Cafe',
      description: 'Collaborative study session',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'campus',
      date: '2024-03-01',
      likes: 24
    }
  ];

  // Simple categories
  const categories = [
    { id: 'all', name: 'All', icon: FaCamera, color: 'from-blue-500 to-cyan-500' },
    { id: 'academics', name: 'Academics', icon: FaGraduationCap, color: 'from-purple-500 to-pink-500' },
    { id: 'campus', name: 'Campus', icon: FaMapMarkerAlt, color: 'from-emerald-500 to-teal-500' },
    { id: 'science', name: 'Science', icon: FaFlask, color: 'from-amber-500 to-orange-500' },
    { id: 'arts', name: 'Arts', icon: FaPaintBrush, color: 'from-pink-500 to-rose-500' },
    { id: 'sports', name: 'Sports', icon: FaFutbol, color: 'from-red-500 to-orange-500' }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const handleLike = (imageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newLikedImages = new Set(likedImages);
    if (newLikedImages.has(imageId)) {
      newLikedImages.delete(imageId);
    } else {
      newLikedImages.add(imageId);
    }
    setLikedImages(newLikedImages);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade-in animation for cards
      gsap.fromTo('.gallery-card',
        { 
          opacity: 0, 
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section id="gallery" ref={sectionRef} className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimal Header */}
        <div className="text-center mb-12">
          <SectionTitle
            title="Campus Gallery"
            subtitle="Moments that define our community"
            align="center"
            underline={true}
            underlineVariant="primary"
          />
          
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            A collection of authentic campus life captured by our community
          </p>
        </div>

        {/* Simple Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2.5 rounded-full flex items-center gap-2 transition-all duration-200 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-md`
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <Icon className="text-sm" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Clean Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((item) => (
            <Card 
              key={item.id}
              className="gallery-card group border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 dark:text-gray-200">
                    {item.category}
                  </span>
                </div>

                {/* Like Button */}
                <button 
                  onClick={(e) => handleLike(item.id, e)}
                  className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full hover:scale-110 transition-all duration-200"
                >
                  <FaHeart 
                    className={`text-sm ${
                      likedImages.has(item.id) ? 'text-red-500 fill-red-500' : 'text-gray-500'
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <CardContent className="p-5">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <FaCalendarAlt className="text-blue-500" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <FaHeart className="text-red-400" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                    
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1">
                      <FaExpand className="text-xs" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Simple CTA */}
     

        {/* Simple Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {galleryImages.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Photos
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {categories.length - 1}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Categories
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {galleryImages.reduce((acc, img) => acc + (img.likes || 0), 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Total Likes
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};