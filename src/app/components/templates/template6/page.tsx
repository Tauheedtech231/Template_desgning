"use client";

import React, { useEffect } from "react";

import  Navbar  from "./sections/Navbar"; 
import  { HeroSection } from "./sections/Hero";
import { About } from "./sections/About";
import { Footer } from "./sections/Footer";
import ContactSection from "./sections/Contact";

const Template6: React.FC = () => {
  useEffect(() => {
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
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <HeroSection/>
      <About />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Template6; // ✅ default export
