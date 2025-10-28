// components/colleges/college-table.tsx
'use client';
import { College } from '@/app/types';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { EditCollegeModal } from './edit-college-modal';

interface CollegeTableProps {
  colleges: College[];
  onEdit: (id: string, collegeData: Partial<College>) => void;
  onDelete: (id: string) => void;
}

export function CollegeTable({ colleges, onEdit, onDelete }: CollegeTableProps) {
  const [editingCollege, setEditingCollege] = useState<College | null>(null);

  const handleStatusToggle = (id: string, currentStatus: 'active' | 'inactive') => {
    onEdit(id, { status: currentStatus === 'active' ? 'inactive' : 'active' });
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {['College', 'Representative', 'Status', 'Created', 'Actions'].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {colleges.map((college, index) => (
                <motion.tr
                  key={college.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {college.logo && (
                        <img
                          src={college.logo}
                          alt={college.name}
                          className="h-8 w-8 rounded-full object-cover mr-3"
                        />
                      )}
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {college.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {college.representativeName}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleStatusToggle(college.id, college.status)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition ${
                        college.status === 'active'
                          ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200'
                      }`}
                    >
                      {college.status === 'active' ? (
                        <Eye size={12} className="mr-1" />
                      ) : (
                        <EyeOff size={12} className="mr-1" />
                      )}
                      {college.status}
                    </button>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(college.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium space-x-3">
                    <button
                      onClick={() => setEditingCollege(college)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(college.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4 p-4">
          {colleges.map((college, index) => (
            <motion.div
              key={college.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-3 mb-3">
                {college.logo && (
                  <img
                    src={college.logo}
                    alt={college.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {college.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {college.representativeName}
                  </p>
                </div>
              </div>

              <div className="flex justify-between text-sm mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    college.status === 'active'
                      ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200'
                  }`}
                >
                  {college.status === 'active' ? 'Active' : 'Inactive'}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {new Date(college.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setEditingCollege(college)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => onDelete(college.id)}
                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {editingCollege && (
        <EditCollegeModal
          college={editingCollege}
          isOpen={!!editingCollege}
          onClose={() => setEditingCollege(null)}
          onSave={(collegeData) => {
            onEdit(editingCollege.id, collegeData);
            setEditingCollege(null);
          }}
        />
      )}
    </>
  );
}
