"use client";

import React, { useEffect } from "react";

import { Navbar } from "./sections/Navbar";
import HeroSlider from "./sections/Hero";
import { About } from "./sections/About";
import { CoursesSection } from "./sections/Services";




import { FacultySection } from "./sections/Faculty";
import { GallerySection } from "./sections/Gallery";
import { ContactSection } from "./sections/Contact";


export const Template2: React.FC = () => {
  useEffect(() => {
    const storedData = localStorage.getItem("collegeInfo");
    if (!storedData) {
      localStorage.setItem(
        "collegeInfo",
        JSON.stringify({
          name: "Mansol Hub",
          tagline: "Excellence in Education, Innovation in Research",
        })
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <HeroSlider />
      <About />
      <CoursesSection />
      {/* <CertificatesSection /> */}
      <FacultySection />
      <GallerySection />
      <ContactSection />
    </div>
  );
};
