// components/themes/custom-theme-card.tsx
'use client';
import { ThemeColors } from '@/app/types';
import { ThemePreview } from './theme-preview';
import { motion } from 'framer-motion';

interface CustomThemeCardProps {
  colors: ThemeColors;
  isDarkMode: boolean;
  onApply: () => void;
  delay?: number;
}

export function CustomThemeCard({ colors, isDarkMode, onApply, delay = 0 }: CustomThemeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      className={`rounded-xl border-2 p-4 transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
      whileHover={{
        scale: 1.03,
        boxShadow: isDarkMode
          ? '0 8px 20px rgba(255, 255, 255, 0.08)'
          : '0 8px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="mb-3">
        <h3 className="font-semibold text-lg mb-2">Custom Theme</h3>
        <ThemePreview colors={colors} isDarkMode={isDarkMode} />
      </div>
      
      <button
        onClick={onApply}
        className="w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
        style={{
          backgroundColor: colors.primary,
          color: 'white',
        }}
        
        
      >
        Apply Custom Theme
      </button>
    </motion.div>
  );
}