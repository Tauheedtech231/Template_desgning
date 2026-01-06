"use client";

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-lg fixed top-0 left-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-red-600 cursor-pointer hover:text-red-500 transition-colors duration-300">
          KISPS College
        </h1>

        {/* Menu Items */}
        <ul
          className={`md:flex md:items-center md:static absolute bg-white w-full left-0 md:w-auto md:bg-transparent transition-all duration-300 ease-in-out shadow-md md:shadow-none rounded-md md:rounded-none ${
            open ? "top-16 opacity-100" : "top-[-500px] opacity-0 md:opacity-100"
          }`}
        >
          {[
            { name: "Home", href: "/" },
            { name: "About", href: "#about" },
            { name: "Courses", href: "#courses" },
            { name: "Admission", href: "#admission" },
            { name: "Contact", href: "#contact" },
          ].map((item) => (
            <li key={item.name} className="mx-4 my-3 md:my-0">
              <Link
                href={item.href}
                className="relative text-gray-700 font-semibold hover:text-red-600 transition-colors duration-300"
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger Button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-3xl md:hidden text-gray-700 hover:text-red-600 transition-colors duration-300"
        >
          {open ? "✖" : "☰"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
