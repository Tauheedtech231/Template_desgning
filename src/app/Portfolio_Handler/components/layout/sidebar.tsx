'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Building2,
  Palette,
  Layers,
  Database,
  Megaphone,
  Settings
} from 'lucide-react';

const menuItems = [
  { href: '/Portfolio_Handler', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/Portfolio_Handler/colleges', icon: Building2, label: 'Colleges' },
  { href: '/Portfolio_Handler/themes', icon: Palette, label: 'Themes' },
  { href: '/Portfolio_Handler/modules', icon: Layers, label: 'Modules' },
  { href: '/Portfolio_Handler/announcements', icon: Megaphone, label: 'Announcements' },
  { href: '/Portfolio_Handler/backup', icon: Database, label: 'Data & Backup' },
  { href: '/Portfolio_Handler/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-white dark:bg-gray-900 shadow-lg min-h-screen p-6 transition-colors duration-300"
    >
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Portfolio Handler</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">Admin Portal</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-500'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
}
