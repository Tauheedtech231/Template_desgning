import React from "react";
import { Navbar } from "./sections/Navbar";
import { Footer } from "./sections/Footer";



export const metadata = {
  title: "Generic College",
  description: "Excellence in Education ",
};

const Template4Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

export default Template4Layout;
