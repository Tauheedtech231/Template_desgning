'use client';

import { MainLayout } from './components/layout/main-layout';
import { StatsCard } from './components/dashboard/stats-card';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { College } from '@/app/types';
import { Plus, Palette, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedColleges = localStorage.getItem('colleges');
    if (storedColleges) {
      setColleges(JSON.parse(storedColleges));
    }
  }, []);

  const totalColleges = colleges.length;
  const activeColleges = colleges.filter((c) => c.status === 'active').length;
  const inactiveColleges = colleges.filter((c) => c.status === 'inactive').length;

  const handleAddCollege = () => router.push('/Portfolio_Handler/colleges');
  const handleManageThemes = () => router.push('/Portfolio_Handler/themes');
  const handleBackupData = () => {
    const data = {
      colleges: localStorage.getItem('colleges'),
      themes: localStorage.getItem('themes'),
      announcements: localStorage.getItem('announcements'),
      settings: localStorage.getItem('settings'),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-backup.json';
    link.click();
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 transition-colors duration-300 bg-gray-50 dark:bg-gray-900 min-h-screen p-6 rounded-lg"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
            Dashboard
          </h1>
          <p className="hidden sm:block text-gray-600 dark:text-gray-400">
            Overview of your portfolio system
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Colleges"
            value={totalColleges.toString()}
            description="All registered colleges"
            trend="+2 this month"
          />
          <StatsCard
            title="Active Colleges"
            value={activeColleges.toString()}
            description="Currently active portfolios"
            trend="+12% from last month"
          />
          <StatsCard
            title="Disabled Colleges"
            value={inactiveColleges.toString()}
            description="Inactive portfolios"
            trend="-5% from last month"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Add College */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAddCollege}
            className="p-6 rounded-2xl shadow-lg flex items-center space-x-3 
            bg-gradient-to-r from-blue-500 to-cyan-400 text-white 
            hover:shadow-cyan-400/40 transition-all duration-300"
          >
            <Plus size={24} />
            <div className="text-left">
              <h3 className="font-semibold">Add College</h3>
              <p className="text-cyan-100 text-sm">Register new college</p>
            </div>
          </motion.button>

          {/* Manage Themes */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleManageThemes}
            className="p-6 rounded-2xl shadow-lg flex items-center space-x-3 
            bg-gradient-to-r from-purple-500 to-pink-500 text-white 
            hover:shadow-pink-400/40 transition-all duration-300"
          >
            <Palette size={24} />
            <div className="text-left">
              <h3 className="font-semibold">Manage Themes</h3>
              <p className="text-pink-100 text-sm">Customize appearance</p>
            </div>
          </motion.button>

          {/* Backup Data */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleBackupData}
            className="p-6 rounded-2xl shadow-lg flex items-center space-x-3 
            bg-gradient-to-r from-green-500 to-emerald-600 text-white 
            hover:shadow-green-400/40 transition-all duration-300"
          >
            <Download size={24} />
            <div className="text-left">
              <h3 className="font-semibold">Backup Data</h3>
              <p className="text-emerald-100 text-sm">Export all data</p>
            </div>
          </motion.button>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* College Status Distribution */}
          <div className="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">
              College Status Distribution
            </h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div className="flex justify-between items-center">
                <span>Active Colleges</span>
                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                    style={{
                      width: `${totalColleges ? (activeColleges / totalColleges) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
                <span>{activeColleges}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Inactive Colleges</span>
                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-red-400 to-pink-500 h-2 rounded-full"
                    style={{
                      width: `${totalColleges ? (inactiveColleges / totalColleges) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
                <span>{inactiveColleges}</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Recent Activity
            </h3>
            <div className="text-gray-600 dark:text-gray-300 space-y-1">
              <p>Last backup: {new Date().toLocaleDateString()}</p>
              <p>Total themes: 5</p>
              <p>System status: Operational</p>
            </div>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
}
