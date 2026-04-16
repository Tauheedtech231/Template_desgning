"use client";

import React, { useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

import HeroSection from "./sections/Hero";
import { About } from "./sections/About";
import { Footer } from "./sections/Footer";

// ✅ Dynamically import Navbar with SSR disabled to avoid hydration issues
const Navbar = dynamic(() => import("./sections/Navbar"), {
  ssr: false,
  loading: () => (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="ml-3 w-32 h-6 bg-gray-200 animate-pulse rounded"></div>
      </div>
    </div>
  ),
});

// Component that uses useSearchParams (if needed at this level)
function Template4Content() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Get college ID from URL and store in sessionStorage
    let collegeId = searchParams.get('college_id');
    if (!collegeId && typeof window !== 'undefined') {
      collegeId = sessionStorage.getItem('college_id');
    }
    if (collegeId && typeof window !== 'undefined') {
      sessionStorage.setItem('college_id', collegeId);
      console.log('🏫 [Template4] College ID loaded:', collegeId);
    }
    
    // ✅ Check if window is defined (browser environment)
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("collegeInfo");
      if (!storedData) {
        localStorage.setItem(
          "collegeInfo",
          JSON.stringify({
            name: "generic Hub",
            tagline: "Excellence in Education, Innovation in Research",
          })
        );
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <HeroSection />
      <About />
      <Footer />
    </div>
  );
}

// Main component with Suspense boundary
const Template4: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="h-16 bg-gray-100 dark:bg-gray-800 animate-pulse" />
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="space-y-8">
            <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
            <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
            <div className="h-80 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    }>
      <Template4Content />
    </Suspense>
  );
};

export default Template4;