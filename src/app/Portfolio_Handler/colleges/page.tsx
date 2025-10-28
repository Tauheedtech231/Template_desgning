// app/colleges/page.tsx
'use client';

import { MainLayout } from '../components/layout/main-layout';
import { CollegeTable } from '../components/colleges/college-table';
import { AddCollegeModal } from '../components/colleges/add-college-modal';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { College } from '@/app/types';
import { Plus, Search } from 'lucide-react';

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const storedColleges = localStorage.getItem('colleges');
    if (storedColleges) {
      setColleges(JSON.parse(storedColleges));
    }
  }, []);

  const filteredColleges = colleges.filter((college) => {
    const matchesSearch =
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.representativeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || college.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddCollege = (collegeData: Omit<College, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCollege: College = {
      ...collegeData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedColleges = [...colleges, newCollege];
    setColleges(updatedColleges);
    localStorage.setItem('colleges', JSON.stringify(updatedColleges));
    setIsAddModalOpen(false);
  };

  const handleEditCollege = (id: string, collegeData: Partial<College>) => {
    const updatedColleges = colleges.map((college) =>
      college.id === id ? { ...college, ...collegeData, updatedAt: new Date() } : college
    );
    setColleges(updatedColleges);
    localStorage.setItem('colleges', JSON.stringify(updatedColleges));
  };

  const handleDeleteCollege = (id: string) => {
    const updatedColleges = colleges.filter((college) => college.id !== id);
    setColleges(updatedColleges);
    localStorage.setItem('colleges', JSON.stringify(updatedColleges));
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 transition-colors duration-500"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            College Management
          </h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-300"
          >
            <Plus size={20} />
            <span>Add College</span>
          </motion.button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-500">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search input */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search colleges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 
                           rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                           bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 
                           placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
              />
            </div>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                         bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 
                         transition-colors duration-300"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* College Table */}
        <CollegeTable
          colleges={filteredColleges}
          onEdit={handleEditCollege}
          onDelete={handleDeleteCollege}
        />

        {/* Add College Modal */}
        <AddCollegeModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddCollege}
        />
      </motion.div>
    </MainLayout>
  );
}
