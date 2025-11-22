"use client";

import React, { useEffect } from 'react';

import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Programs } from './sections/Programs';
import { Events } from './sections/Events';
import { Gallery } from './sections/Gallery';
import { Faculty } from './sections/Faculty';
import { Contact } from './sections/Contact';
import { Navbar } from '../../shared/Navbar';
import { Footer } from '../../shared/Footer';

export const Template1: React.FC = () => {
  useEffect(() => {
    // Initialize localStorage with default data if not present
    const storedData = localStorage.getItem('collegeInfo');
    if (!storedData) {
      // In production, this would come from an API
      localStorage.setItem('collegeInfo', JSON.stringify({
        name: "Prestige University",
        tagline: "Excellence in Education, Innovation in Research",
        // ... other default data
      }));
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Programs />
        <Events />
        <Gallery />
        <Faculty />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};