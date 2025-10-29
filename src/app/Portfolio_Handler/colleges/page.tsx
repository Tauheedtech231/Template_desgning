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
     {/* Header */}
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
  <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
    College Management
  </h1>

  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    onClick={() => setIsAddModalOpen(true)}
    className="px-4 py-2 rounded-lg font-semibold text-white 
               bg-gradient-to-r from-blue-600 to-indigo-600 
               hover:from-indigo-600 hover:to-blue-700 
               shadow-md transition-all duration-300 flex items-center 
               justify-center space-x-2 mx-auto sm:mx-0"
  >
    <Plus size={18} />
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
