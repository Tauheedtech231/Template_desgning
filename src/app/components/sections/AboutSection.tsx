'use client';

import React, { useState } from 'react';
import { College } from '@/app/lib/gsap'
import { Button } from '@/components/ui/button'; 
import { UploadImage } from '@/components/ui/UploadImage';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';
/* eslint-disable */


interface AboutSectionProps {
  data: any;
  college: College;
  onUpdate: (data: any) => void;
}

export function AboutSection({ data, college, onUpdate }: AboutSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ...data,
    logo: data?.logo || undefined,
    coverImage: data?.coverImage || undefined,
  });

  // helper to update local form state and notify parent for live preview
  const updateForm = (patch: Partial<typeof formData>) => {
    const next = { ...formData, ...patch };
    setFormData(next);
    // notify parent so PreviewPane receives fresh data immediately
    onUpdate(next);
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(data);
    // revert preview to original data
    onUpdate(data);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">About College</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage basic college information and branding</p>
        </div>
        
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <FiEdit2 className="w-4 h-4 mr-2" />
            Edit Content
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handleCancel}>
              <FiX className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <FiSave className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6">
        {/* Logo and Cover Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              College Logo
            </label>
            <UploadImage
              value={formData.logo}
              onChange={(url) => updateForm({ logo: url })}
              onRemove={() => updateForm({ logo: undefined })}
              aspectRatio="square"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cover Image
            </label>
            <UploadImage
              value={formData.coverImage}
              onChange={(url) => updateForm({ coverImage: url })}
              onRemove={() => updateForm({ coverImage: undefined })}
              aspectRatio="banner"
            />
          </div>
        </div>

        {/* College Details */}
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              College Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateForm({ name: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Short Description
            </label>
            <textarea
              value={formData.shortDescription}
              onChange={(e) => updateForm({ shortDescription: e.target.value })}
              disabled={!isEditing}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Long Description
            </label>
            <textarea
              value={formData.longDescription}
              onChange={(e) => updateForm({ longDescription: e.target.value })}
              disabled={!isEditing}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mission Statement
              </label>
              <textarea
                value={formData.mission}
                onChange={(e) => updateForm({ mission: e.target.value })}
                disabled={!isEditing}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vision Statement
              </label>
              <textarea
                value={formData.vision}
                onChange={(e) => updateForm({ vision: e.target.value })}
                disabled={!isEditing}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}