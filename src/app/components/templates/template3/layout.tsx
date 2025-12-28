import React from "react";
import { Navbar } from "./sections/Navbar";
import { Footer } from "./sections/Footer";



export const metadata = {
  title: "Mansol Hub",
  description: "Excellence in Education, Innovation in Research",
};

const Template2Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default Template2Layout;
