"use client";

import React, { useEffect } from "react";


import { Navbar } from "./sections/Navbar";
import HeroSlider from "./sections/Hero";
import { About } from "./sections/About";
import FeaturedPrograms from "./sections/Services";
import CertificatesSection from "./sections/Certificates";
import ContactSection from "./sections/Contact";







 

export const Template2: React.FC = () => {
  useEffect(() => {
    // Initialize localStorage with default data if not present
    const storedData = localStorage.getItem("collegeInfo");
    if (!storedData) {
      localStorage.setItem(
        "collegeInfo",
        JSON.stringify({
          name: "Mansol Hub",
          tagline: "Excellence in Education, Innovation in Research",
          // ... other default data
        })
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Only Navbar is shown for now */}
      <Navbar />
      <HeroSlider />
      <About/>
      <FeaturedPrograms/>
      <CertificatesSection/>
      <ContactSection/>
    
    </div>
  );
};
