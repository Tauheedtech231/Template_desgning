// components/dashboard/stats-card.tsx
'use client';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  trend: string;
}

export function StatsCard({ title, value, description, trend }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative overflow-hidden p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800 
                 border border-transparent hover:shadow-lg hover:shadow-blue-400/20 
                 transition-all duration-300"
    >
      {/* Decorative gradient border glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 opacity-0 hover:opacity-100 blur-2xl transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{description}</p>
      <p
        className={`text-sm mt-2 font-medium ${
          trend.includes('-') ? 'text-red-500' : 'text-green-500'
        }`}
      >
        {trend}
      </p>
    </motion.div>
  );
}
