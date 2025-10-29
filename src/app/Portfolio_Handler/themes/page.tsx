// app/themes/page.tsx
'use client';
import { MainLayout } from '../components/layout/main-layout';
import { ThemeCard } from '../components/themes/theme-card';
import { CustomThemeCard } from '../components/themes/custom-theme-card'; 
import { ThemeCustomizer } from '../components/themes/theme-customizer'; 
import { ThemePreview } from '../components/themes/theme-preview'; 
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { College, Theme, ThemeColors } from '@/app/types';

const predefinedThemes: Theme[] = [
  // ... (keep your existing predefined themes)
];

const defaultCustomTheme: ThemeColors = {
  primary: '#3B82F6',
  secondary: '#1E40AF',
  accent: '#6366F1',
  background: '#F8FAFC',
};

export default function ThemesPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<string>('all');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [customTheme, setCustomTheme] = useState<ThemeColors>(defaultCustomTheme);
  const [showCustomizer, setShowCustomizer] = useState<boolean>(false);

  // Watch system or Tailwind global dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const html = document.documentElement;
      const localSetting = localStorage.getItem('settings');
      const systemDark = html.classList.contains('dark');
      let localDark = false;

      if (localSetting) {
        try {
          localDark = JSON.parse(localSetting).darkMode;
        } catch {
          localDark = false;
        }
      }

      setIsDarkMode(systemDark || localDark);
      
      // Update custom theme background for dark mode
      if (systemDark || localDark) {
        setCustomTheme(prev => ({
          ...prev,
          background: '#1F2937' // gray-900
        }));
      }
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  // Load colleges from storage
  useEffect(() => {
    const storedColleges = localStorage.getItem('colleges');
    if (storedColleges) setColleges(JSON.parse(storedColleges));
    
    // Load saved custom theme
  const savedCustomTheme = localStorage.getItem('customTheme');



    if (savedCustomTheme) {
      setCustomTheme(JSON.parse(savedCustomTheme));
    }
  }, []);

  // Save custom theme when it changes
  useEffect(() => {
    localStorage.setItem('customTheme', JSON.stringify(customTheme));
  }, [customTheme]);

  const applyThemeToCollege = (themeId: string, collegeId: string, isCustom: boolean = false, customColors?: ThemeColors) => {
    let updatedColleges: College[] = [];

    if (collegeId === 'all') {
      updatedColleges = colleges.map((college) => ({
        ...college,
        theme: themeId,
        ...(isCustom && { customTheme: customColors })
      }));
    } else {
      updatedColleges = colleges.map((college) =>
        college.id === collegeId ? { 
          ...college, 
          theme: themeId,
          ...(isCustom && { customTheme: customColors })
        } : college
      );
    }

    setColleges(updatedColleges);
    localStorage.setItem('colleges', JSON.stringify(updatedColleges));
  };

  const handleCustomThemeApply = (collegeId: string) => {
    applyThemeToCollege('custom', collegeId, true, customTheme);
  };

  const handleThemeChange = (colors: ThemeColors) => {
    setCustomTheme(colors);
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`space-y-6 transition-colors duration-300 min-h-screen p-6 rounded-lg
          ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}
        `}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Theme Management</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Customize and apply themes to colleges
            </p>
          </div>
          <button
            onClick={() => setShowCustomizer(!showCustomizer)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              showCustomizer 
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {showCustomizer ? 'Hide Customizer' : 'Create Custom Theme'}
          </button>
        </div>

        {/* Custom Theme Section */}
        {showCustomizer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ThemeCustomizer
                collegeId={selectedCollege}
                currentTheme={customTheme}
                onThemeChange={handleThemeChange}
                isDarkMode={isDarkMode}
              />
              <div className={`p-6 rounded-xl border transition-all duration-300 ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
                <ThemePreview 
                  colors={customTheme} 
                  isDarkMode={isDarkMode}
                  className="max-w-md mx-auto"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* College Selector */}
        <div
          className={`p-6 rounded-xl shadow-sm border transition-all duration-300 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Select College to Apply Theme
          </label>
          <select
            value={selectedCollege}
            onChange={(e) => setSelectedCollege(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 dark:text-gray-100"
          >
            <option value="all">Apply to All Colleges</option>
            {colleges.map((college) => (
              <option key={college.id} value={college.id}>
                {college.name}
              </option>
            ))}
          </select>
        </div>

        {/* Themes Grid */}
        <div className="space-y-8">
          {/* Custom Theme Card */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Custom Theme</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <CustomThemeCard
                colors={customTheme}
                isDarkMode={isDarkMode}
                onApply={() => handleCustomThemeApply(selectedCollege)}
                delay={0}
              />
            </div>
          </div>

          {/* Predefined Themes */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Predefined Themes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {predefinedThemes.map((theme, index) => (
                <motion.div
                  key={theme.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (showCustomizer ? index + 1 : index) * 0.1, duration: 0.3 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: isDarkMode
                      ? '0 8px 20px rgba(255, 255, 255, 0.08)'
                      : '0 8px 20px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <ThemeCard
                    theme={theme}
                    delay={(showCustomizer ? index + 1 : index) * 0.1}
                    onApply={() => applyThemeToCollege(theme.id, selectedCollege)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
}