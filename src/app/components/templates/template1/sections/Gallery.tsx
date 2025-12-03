"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { SectionTitle } from '../../../shared/SectionTitle';
import { Card } from '../../../shared/Card';
import { defaultCollegeInfo } from '../data/collegeInfo';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
/* eslint-disable */

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Define GalleryImage type if it exists in your default data
interface GalleryImage {
  id: string;
  title: string;
  description: string;
  url: string; // Changed from image to url if that's what your default data uses
  category: string;
  createdAt: string; // Changed from date to createdAt if that's what your default data uses
}

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
}

// Type guard to check if an item is GalleryItem
function isGalleryItem(item: any): item is GalleryItem {
  return item && typeof item.image === 'string';
}

// Type guard to check if an item is GalleryImage
function isGalleryImage(item: any): item is GalleryImage {
  return item && typeof item.url === 'string';
}

// Normalize item to GalleryItem format
function normalizeGalleryItem(item: any): GalleryItem {
  if (isGalleryItem(item)) {
    return item;
  }
  
  if (isGalleryImage(item)) {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      image: item.url, // Map url to image
      category: item.category,
      date: item.createdAt // Map createdAt to date
    };
  }
  
  // Fallback for any other structure
  return {
    id: item.id || '',
    title: item.title || '',
    description: item.description || '',
    image: item.image || item.url || '',
    category: item.category || '',
    date: item.date || item.createdAt || ''
  };
}

interface GallerySection {
  id: number;
  template_id: number;
  section_name: string;
  content: {
    gallery: GalleryItem[];
    title?: string;
    subtitle?: string;
  };
  created_at: string;
}

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [galleryData, setGalleryData] = useState<GallerySection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const res = await fetch(
          "https://nes-tick-portfolio-handler.vercel.app/api/sections?template_id=1&section_name=Gallery",
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched gallery data:", data);
        
        // Assuming API returns an array of sections, take the first one
        if (Array.isArray(data.sections) && data.sections.length > 0) {
          setGalleryData(data.sections[0]);
        } else {
          throw new Error('No gallery data found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  // Get all unique categories from gallery items
  const categories = galleryData?.content?.gallery 
    ? ['all', ...new Set(galleryData.content.gallery.map(item => item.category))]
    : ['all', ...new Set(defaultCollegeInfo.gallery.map(item => 
        typeof item === 'object' && 'category' in item ? item.category : ''
      ).filter(Boolean))];

  // Get filtered images based on selected category
  const filteredImages: GalleryItem[] = (() => {
    if (galleryData?.content?.gallery) {
      const items = selectedCategory === 'all' 
        ? galleryData.content.gallery 
        : galleryData.content.gallery.filter((img: GalleryItem) => img.category === selectedCategory);
      return items.map(normalizeGalleryItem);
    } else {
      // Normalize default data
      const defaultItems = defaultCollegeInfo.gallery.map(normalizeGalleryItem);
      return selectedCategory === 'all' 
        ? defaultItems 
        : defaultItems.filter((img: GalleryItem) => img.category === selectedCategory);
    }
  })();

  useEffect(() => {
    if (!galleryData) return;

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
  }, [selectedCategory, galleryData]);

  // Loading state
  if (loading) {
    return (
      <section id="gallery" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="gallery" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-500">Error: {error}</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Failed to load gallery. Using default data.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Use API data if available, otherwise use default data
  const content = galleryData?.content || {
    gallery: defaultCollegeInfo.gallery,
    title: "Campus Gallery",
    subtitle: "Explore our beautiful campus and vibrant student life"
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Format category for display (capitalize, replace dashes with spaces)
  const formatCategory = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <section id="gallery" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={content.title || "Campus Gallery"}
          subtitle={content.subtitle || "Explore our beautiful campus and vibrant student life"}
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
              {formatCategory(category)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((item: GalleryItem) => (
            <Card key={item.id} hover className="gallery-item group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative overflow-hidden">
                {/* Image with Next.js optimization */}
                <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
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
                      <span className="text-white font-bold text-lg">No Image</span>
                    </div>
                  )}
                </div>
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-start justify-end p-4">
                  <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                    <p className="text-blue-100 text-xs font-medium mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    {item.date && (
                      <p className="text-xs text-gray-300 mt-1">
                        {formatDate(item.date)}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    {formatCategory(item.category)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Show message if no images */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">
              No images found in the {selectedCategory === 'all' ? 'gallery' : selectedCategory} category.
            </p>
          </div>
        )}

        {/* Load More - You can implement pagination here if needed */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm">
            View More Photos
          </button>
        </div>
      </div>
    </section>
  );
};