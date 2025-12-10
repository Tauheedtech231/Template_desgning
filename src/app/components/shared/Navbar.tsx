"use client";

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-red-600 cursor-pointer">
          KISPS College
        </h1>

        {/* Menu Items */}
        <ul
          className={`md:flex md:items-center md:static absolute bg-white w-full left-0 md:w-auto transition-all duration-300 ease-in ${
            open ? "top-14 opacity-100" : "top-[-400px] opacity-0 md:opacity-100"
          }`}
        >
          <li className="mx-4 my-2 md:my-0">
            <Link href="/" className="text-gray-700 font-semibold hover:text-red-600">
              Home
            </Link>
          </li>
          <li className="mx-4 my-2 md:my-0">
            <Link href="#about" className="text-gray-700 font-semibold hover:text-red-600">
              About
            </Link>
          </li>
          <li className="mx-4 my-2 md:my-0">
            <Link href="#courses" className="text-gray-700 font-semibold hover:text-red-600">
              Courses
            </Link>
          </li>
          <li className="mx-4 my-2 md:my-0">
            <Link href="#admission" className="text-gray-700 font-semibold hover:text-red-600">
              Admission
            </Link>
          </li>
          <li className="mx-4 my-2 md:my-0">
            <Link href="#contact" className="text-gray-700 font-semibold hover:text-red-600">
              Contact
            </Link>
          </li>
        </ul>

        {/* Hamburger Button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-3xl md:hidden text-gray-700"
        >
          {open ? "✖" : "☰"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
