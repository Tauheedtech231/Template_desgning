'use client';

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { CollegeData, SectionType } from '@/app/lib/gsap';
import { PortalLayout } from '@/app/components/layout/PortalLayout';
import { PreviewPane } from '@/app/components/PreviewModal';
import { AboutSection } from '@/app/components/sections/AboutSection';
import { FacultySection } from '@/app/components/sections/FacultySection';
import { EventsSection } from '@/app/components/sections/EventsSection';
import { GallerySection } from '@/app/components/sections/GallerySection';
import { CoursesSection } from '@/app/components/sections/CoursesSection';
import { ContactSection } from '@/app/components/sections/ContactSection';

/* eslint-disable */

interface DashboardProps {
  initialData: CollegeData;
}

const sectionComponents: Record<SectionType, React.ComponentType<any>> = {
  about: AboutSection,
  faculty: FacultySection,
  events: EventsSection,
  gallery: GallerySection,
  courses: CoursesSection,
  contact: ContactSection,
  flexible: () => <div className="text-gray-400 text-center py-8">Flexible section</div>,
};

export default function DashboardPage({ initialData }: DashboardProps) {
  const [activeSection, setActiveSection] = useState<SectionType>('about');
  const [collegeData, setCollegeData] = useState<CollegeData>(initialData);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Animate section switch
  useEffect(() => {
    gsap.fromTo(
      '.section-content',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );
  }, [activeSection]);

  // ✅ Update state section-wise with full immutability
  const updateSectionData = (section: SectionType, data: any) => {
    setCollegeData(prev => {
      const updated = structuredClone(prev); // safer deep clone
      if (section === 'about') {
        updated.college = { ...updated.college, ...data };
      } else if (section === 'contact') {
        updated.college.contact = { ...updated.college.contact, ...data };
      } else {
        (updated as any)[section] = data;
      }
      return updated;
    });
  };

  const ActiveComponent = sectionComponents[activeSection];
  const sectionData =
    activeSection === 'about'
      ? collegeData.college
      : activeSection === 'contact'
      ? collegeData.college.contact
      : (collegeData as any)[activeSection];

  return (
    <PortalLayout
      collegeName={collegeData.college.name}
      onPreview={() => setIsPreviewOpen(true)}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      <div className="section-content transition-all duration-300 ease-in-out">
        <ActiveComponent
          data={sectionData}
          college={collegeData.college}
          onUpdate={(data: any) => updateSectionData(activeSection, data)}
        />
      </div>

      {/* 🔹 Preview Modal */}
      <PreviewPane
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        data={collegeData}
      />
    </PortalLayout>
  );
}
