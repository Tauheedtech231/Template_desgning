// components/themes/theme-card.tsx
'use client';
import { Theme } from '@/app/types';
import { ThemePreview } from './theme-preview';
import { motion } from 'framer-motion';
import { useDarkMode } from '@/app/hooks/useDarkMode'; 

interface ThemeCardProps {
  theme: Theme;
  delay?: number;
  onApply: () => void;
}

export function ThemeCard({ theme, delay = 0, onApply }: ThemeCardProps) {
  const isDarkMode = useDarkMode();

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
        <h3 className="font-semibold text-lg mb-2">{theme.name}</h3>
        <ThemePreview colors={theme.colors} isDarkMode={isDarkMode} />
      </div>
      
      <button
        onClick={onApply}
        className="w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
        style={{
          backgroundColor: theme.colors.primary,
          color: 'white',
        }}
        
      >
        Apply {theme.name} Theme
      </button>
    </motion.div>
  );
}