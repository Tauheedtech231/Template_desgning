'use client';
import { Moon, Sun, Bell, User, Home as HomeIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const settings = localStorage.getItem('settings');
    if (settings) {
      const { darkMode } = JSON.parse(settings);
      setDarkMode(darkMode);
      if (darkMode) document.documentElement.classList.add('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      if (prefersDark) document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    const settings = localStorage.getItem('settings');
    const currentSettings = settings ? JSON.parse(settings) : {};
    const updatedSettings = { ...currentSettings, darkMode: newDarkMode };
    localStorage.setItem('settings', JSON.stringify(updatedSettings));

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleNavigateCollege = () => {
    window.location.href = '/College_Portfolio_Handler';
  };

  const handleNavigateHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 px-4 sm:px-8 py-4 transition-colors duration-500">
      <div className="flex justify-between items-center">
        {/* Left side (hide on mobile) */}
        <div className="hidden sm:block">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
            Welcome back, Admin
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage your college portfolios efficiently
          </p>
        </div>

        {/* Right side buttons + icons */}
        <div className="flex items-center space-x-3 sm:space-x-4 ml-auto">
          {/* Home Button */}
          <button
            onClick={handleNavigateHome}
            className="bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold px-3 sm:px-4 py-2 rounded-lg shadow-md hover:opacity-90 active:scale-95 text-sm sm:text-base flex items-center gap-2 transition-all duration-300"
          >
            <HomeIcon size={18} />
            Home
          </button>

          {/* College Portfolio Handler Button */}
          <button
            onClick={handleNavigateCollege}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold px-3 sm:px-4 py-2 rounded-lg shadow-md hover:opacity-90 active:scale-95 text-sm sm:text-base transition-all duration-300"
          >
            College Portfolio
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications (hide on mobile) */}
          <button className="hidden sm:flex p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>

          {/* User icon (hide on mobile) */}
          <button className="hidden sm:flex p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <User size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
