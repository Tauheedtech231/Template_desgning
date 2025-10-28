// components/layout/navbar.tsx
'use client';
import { Moon, Sun, Bell, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  // Load and apply theme on mount
  useEffect(() => {
    const settings = localStorage.getItem('settings');
    if (settings) {
      const { darkMode } = JSON.parse(settings);
      setDarkMode(darkMode);
      if (darkMode) document.documentElement.classList.add('dark');
    } else {
      // Default to system preference if no saved setting
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      if (prefersDark) document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle and save dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    const settings = localStorage.getItem('settings');
    const currentSettings = settings ? JSON.parse(settings) : {};
    const updatedSettings = { ...currentSettings, darkMode: newDarkMode };
    localStorage.setItem('settings', JSON.stringify(updatedSettings));

    // Apply theme
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-8 py-4 transition-colors duration-500">
      <div className="flex justify-between items-center">
        {/* Left side */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Welcome back, Admin
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Manage your college portfolios efficiently
          </p>
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>

          {/* User icon */}
          <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <User size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
