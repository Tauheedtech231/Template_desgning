"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { SectionTitle } from '../../../shared/SectionTitle';
import { Card } from '../../../shared/Card';
import { defaultCollegeInfo } from '../data/collegeInfo';
import { gsap } from 'gsap';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const categories = ['all', 'campus', 'facilities', 'events', 'student-life'];

  const filteredImages = selectedCategory === 'all' 
    ? defaultCollegeInfo.gallery 
    : defaultCollegeInfo.gallery.filter(img => img.category === selectedCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for gallery items
      gsap.fromTo('.gallery-item',
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Filter animation
      gsap.to('.gallery-item', {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        onComplete: () => {
          gsap.to('.gallery-item', {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.05
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  return (
    <section id="gallery" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Campus Gallery"
          subtitle="Explore our beautiful campus and vibrant student life"
          align="center"
          underline={true}
          underlineVariant="primary"
          animation="fade"
        />

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-sm ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 shadow-sm hover:shadow-md'
              }`}
            >
              {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <Card key={image.id} hover className="gallery-item group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative overflow-hidden">
                {/* Image with Next.js optimization */}
                <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <Image
                    src={image.imageUrl}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-lg font-bold mb-1">{image.title}</h4>
                    <p className="text-blue-100 text-xs font-medium">{image.description}</p>
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    {image.category}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm">
            View More Photos
          </button>
        </div>
      </div>
    </section>
  );
};