// components/themes/theme-preview.tsx
'use client';
import { ThemeColors } from '@/app/types';
import { motion } from 'framer-motion';

interface ThemePreviewProps {
  colors: ThemeColors;
  isDarkMode: boolean;
  className?: string;
}

export function ThemePreview({ colors, isDarkMode, className = '' }: ThemePreviewProps) {
  return (
    <motion.div
      className={`rounded-xl border-2 overflow-hidden transition-all duration-300 ${className}`}
      style={{
        backgroundColor: colors.background,
        borderColor: colors.primary + '40'
      }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Preview Header */}
      <div
        className="h-4 p-4 flex items-center"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-white opacity-20"></div>
          <div className="w-2 h-2 rounded-full bg-white opacity-20"></div>
          <div className="w-2 h-2 rounded-full bg-white opacity-20"></div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div
          className="h-3 rounded"
          style={{ backgroundColor: colors.primary }}
        ></div>
        
        {/* Content */}
        <div className="space-y-2">
          <div
            className="h-2 rounded opacity-80"
            style={{ backgroundColor: colors.secondary }}
          ></div>
          <div
            className="h-2 rounded opacity-60"
            style={{ backgroundColor: colors.secondary }}
          ></div>
          <div
            className="h-2 rounded w-3/4 opacity-40"
            style={{ backgroundColor: colors.secondary }}
          ></div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <div
            className="h-6 rounded flex-1"
            style={{ backgroundColor: colors.accent }}
          ></div>
          <div
            className="h-6 rounded w-1/4"
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
}