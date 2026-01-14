"use client";

import React, { useEffect } from "react";

import  Navbar  from "./sections/Navbar";
import   HeroSection  from "./sections/Hero";
import { About } from "./sections/About";
import { Footer } from "./sections/Footer";




const Template4: React.FC = () => {
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
      {/* <StatsSection/> */}
     
      <About />
     
      {/* <CertificatesSection /> */}
      <Footer />
    </div>
  );
};

export default Template4; // ✅ default export
