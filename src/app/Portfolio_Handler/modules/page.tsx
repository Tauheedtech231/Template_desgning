// app/modules/page.tsx
'use client';

import { MainLayout } from '../components/layout/main-layout';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { College } from '@/app/types';
import { ToggleSwitch } from '@/components/ui/toggle-switch';
import { Users, Calendar, Image, Trophy, Building2, Phone, Plus } from 'lucide-react';

export default function ModulesPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>('');
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [newModuleName, setNewModuleName] = useState('');
  const [newModuleDescription, setNewModuleDescription] = useState('');
  const [customModules, setCustomModules] = useState<
    { key: string; label: string; description: string }[]
  >([]);

  // Load colleges and modules from localStorage
  useEffect(() => {
    const storedColleges = localStorage.getItem('colleges');
    const storedCustomModules = localStorage.getItem('customModules');

    if (storedColleges) {
      const collegesData = JSON.parse(storedColleges);
      setColleges(collegesData);
      if (collegesData.length > 0) {
        setSelectedCollegeId(collegesData[0].id);
        setSelectedCollege(collegesData[0]);
      }
    }

    if (storedCustomModules) {
      setCustomModules(JSON.parse(storedCustomModules));
    }
  }, []);

  useEffect(() => {
    if (selectedCollegeId && colleges.length > 0) {
      const college = colleges.find((c) => c.id === selectedCollegeId);
      setSelectedCollege(college || null);
    }
  }, [selectedCollegeId, colleges]);

  const handleModuleToggle = (module: string) => {
    if (!selectedCollege) return;

    const updatedModules = {
      ...selectedCollege.modules,
      [module]: !selectedCollege.modules[module],
    };

    const updatedCollege = {
      ...selectedCollege,
      modules: updatedModules,
    };

    const updatedColleges = colleges.map((college) =>
      college.id === selectedCollegeId ? updatedCollege : college
    );

    setColleges(updatedColleges);
    setSelectedCollege(updatedCollege);
    localStorage.setItem('colleges', JSON.stringify(updatedColleges));
  };

  // Predefined modules + custom ones
  const moduleConfig = [
    {
      key: 'about',
      icon: Building2,
      label: 'About Us',
      description: 'College information and overview',
    },
    {
      key: 'faculty',
      icon: Users,
      label: 'Faculty',
      description: 'Staff and faculty members',
    },
    {
      key: 'events',
      icon: Calendar,
      label: 'Events',
      description: 'Upcoming events and calendar',
    },
    {
      key: 'gallery',
      icon: Image,
      label: 'Gallery',
      description: 'Photo and media gallery',
    },
    {
      key: 'achievements',
      icon: Trophy,
      label: 'Achievements',
      description: 'Awards and accomplishments',
    },
    {
      key: 'contact',
      icon: Phone,
      label: 'Contact',
      description: 'College contact details and inquiries',
    },
    ...customModules.map((m) => ({
      key: m.key,
      icon: Plus,
      label: m.label,
      description: m.description,
    })),
  ];

  // Add new module handler
  const handleAddCustomModule = () => {
    if (!newModuleName.trim()) return;

    const newModule = {
      key: newModuleName.toLowerCase().replace(/\s+/g, '-'),
      label: newModuleName,
      description: newModuleDescription || 'Custom module added by admin',
    };

    const updatedModules = [...customModules, newModule];
    setCustomModules(updatedModules);
    localStorage.setItem('customModules', JSON.stringify(updatedModules));

    setNewModuleName('');
    setNewModuleDescription('');
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 transition-colors duration-300"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
            Module Control
          </h1>
        </div>

        {/* College Selector */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select College
          </label>
          <select
            value={selectedCollegeId}
            onChange={(e) => setSelectedCollegeId(e.target.value)}
            className="w-full md:w-96 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">Select a college</option>
            {colleges.map((college) => (
              <option key={college.id} value={college.id}>
                {college.name} ({college.status})
              </option>
            ))}
          </select>
        </div>

        {/* Add new module section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Plus className="text-blue-500" /> Add Custom Module
          </h3>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Module Name"
              value={newModuleName}
              onChange={(e) => setNewModuleName(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                         focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={newModuleDescription}
              onChange={(e) => setNewModuleDescription(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                         focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <button
              onClick={handleAddCustomModule}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg 
                         transition-all duration-300 transform hover:scale-105"
            >
              Add Module
            </button>
          </div>
        </div>

        {selectedCollege ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* Module toggles */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300">
              <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {selectedCollege.name} - Module Settings
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Enable or disable content modules for this college
                </p>
              </div>

              <div className="p-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {moduleConfig.map((module, index) => (
                  <motion.div
                    key={module.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg 
                               hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <module.icon className="text-blue-600 dark:text-blue-400" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                          {module.label}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {module.description}
                        </p>
                      </div>
                    </div>

                    <ToggleSwitch
  enabled={selectedCollege.modules[module.key] ?? false}
  onChange={() => handleModuleToggle(module.key)}
/>

                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center border border-gray-200 dark:border-gray-700 transition-all duration-300"
          >
            <Building2 size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              No College Selected
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Please select a college to manage its modules.
            </p>
          </motion.div>
        )}
      </motion.div>
    </MainLayout>
  );
}
