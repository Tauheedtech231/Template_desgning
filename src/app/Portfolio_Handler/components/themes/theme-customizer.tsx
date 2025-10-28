// components/themes/theme-customizer.tsx
'use client';
import { useState, useEffect } from 'react';
import { ThemeColors, Theme } from '@/app/types';
import { motion } from 'framer-motion';

interface ThemeCustomizerProps {
  collegeId: string;
  currentTheme: ThemeColors;
  onThemeChange: (colors: ThemeColors) => void;
  isDarkMode: boolean;
}

export function ThemeCustomizer({ collegeId, currentTheme, onThemeChange, isDarkMode }: ThemeCustomizerProps) {
  const [customColors, setCustomColors] = useState<ThemeColors>(currentTheme);

  useEffect(() => {
    onThemeChange(customColors);
  }, [customColors, onThemeChange]);

  const handleColorChange = (colorKey: keyof ThemeColors, value: string) => {
    setCustomColors(prev => ({
      ...prev,
      [colorKey]: value
    }));
  };

  const resetToDefault = () => {
    const defaultTheme: ThemeColors = {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#6366F1',
      background: isDarkMode ? '#1F2937' : '#F8FAFC'
    };
    setCustomColors(defaultTheme);
  };

  return (
    <div className={`p-6 rounded-xl border transition-all duration-300 ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Custom Theme</h3>
        <button
          onClick={resetToDefault}
          className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Reset to Default
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(customColors).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <label className="capitalize text-sm font-medium w-24">
              {key}
            </label>
            <div className="flex items-center gap-3 flex-1 max-w-xs">
              <input
                type="color"
                value={value}
                onChange={(e) => handleColorChange(key as keyof ThemeColors, e.target.value)}
                className="w-12 h-8 cursor-pointer rounded border border-gray-300 dark:border-gray-600"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => handleColorChange(key as keyof ThemeColors, e.target.value)}
                className="flex-1 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}