import React from "react";
import Navbar from "./sections/Navbar";
import { Footer } from "./sections/Footer";

export const metadata = {
  title: "Generic College",
  description: "Excellence in Education",
};

const Template4Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-200 min-h-screen flex flex-col">
      
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />

    </div>
  );
};

export default Template4Layout;