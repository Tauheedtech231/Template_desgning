import React, { useEffect, useState } from 'react';
import { defaultCollegeInfo } from '../templates/template1/data/collegeInfo';
/* eslint-disable */

// Updated ContactInfo interface with website property
interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  website: string; // Add website property here
  socialMedia: {
    twitter: string;
    facebook: string;
    linkedin: string;
    instagram: string;
  };
}

interface ContactsSection {
  id: number;
  template_id: number;
  section_name: string;
  content: {
    contactInfo: ContactInfo;
    collegeName?: string;
    description?: string;
  };
  created_at: string;
}

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [contactsData, setContactsData] = useState<ContactsSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactsData = async () => {
      try {
        const res = await fetch(
          "https://nes-tick-portfolio-handler.vercel.app/api/sections?template_id=1&section_name=Contacts",
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched contact data:", data);
        
        if (Array.isArray(data.sections) && data.sections.length > 0) {
          setContactsData(data.sections[0]);
        } else {
          throw new Error('No contacts data found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error("Error fetching contacts data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContactsData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          <p className="mt-2 text-gray-300 text-sm">Loading footer...</p>
        </div>
      </footer>
    );
  }

  // Safely extract contact info with defaults
  const getContactInfo = () => {
    if (contactsData?.content?.contactInfo) {
      const apiContact = contactsData.content.contactInfo;
      return {
        address: apiContact.address || "123 College Street, City, Country",
        email: apiContact.email || "info@college.edu",
        phone: apiContact.phone || "+1 (555) 123-4567",
        // Use the website property if it exists in API response, otherwise use default
        website: (apiContact as any).website || "https://www.college.edu",
        socialMedia: {
          twitter: apiContact.socialMedia?.twitter || "",
          facebook: apiContact.socialMedia?.facebook || "",
          linkedin: apiContact.socialMedia?.linkedin || "",
          instagram: apiContact.socialMedia?.instagram || "",
        }
      };
    }
    
    // Use default data
    return {
      address: defaultCollegeInfo.contact.address,
      email: defaultCollegeInfo.contact.email,
      phone: defaultCollegeInfo.contact.phone,
      // Use type assertion to access website if it exists in default data
      website: (defaultCollegeInfo.contact as any).website || "https://www.college.edu",
      socialMedia: defaultCollegeInfo.contact.socialMedia
    };
  };

  const contactInfo = getContactInfo();
  const collegeName = contactsData?.content?.collegeName || "Kips College";
  const description = contactsData?.content?.description || "Empowering students through quality education and innovative research since 1990.";

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* College Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-white mb-3">
              {collegeName}
            </h3>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {description}
            </p>
            <div className="flex space-x-2">
              {contactInfo.socialMedia.facebook && (
                <a 
                  href={contactInfo.socialMedia.facebook} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {contactInfo.socialMedia.twitter && (
                <a 
                  href={contactInfo.socialMedia.twitter} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 hover:bg-blue-500 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
              )}
              {contactInfo.socialMedia.instagram && (
                <a 
                  href={contactInfo.socialMedia.instagram} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                  </svg>
                </a>
              )}
              {contactInfo.socialMedia.linkedin && (
                <a 
                  href={contactInfo.socialMedia.linkedin} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 hover:bg-blue-700 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-white transition-colors duration-200 text-xs">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200 text-xs">
                  About Us
                </a>
              </li>
              <li>
                <a href="#programs" className="text-gray-300 hover:text-white transition-colors duration-200 text-xs">
                  Programs
                </a>
              </li>
              <li>
                <a href="#events" className="text-gray-300 hover:text-white transition-colors duration-200 text-xs">
                  Events
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200 text-xs">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Contact</h4>
            <address className="text-gray-300 not-italic space-y-2 text-xs">
              <p className="flex items-start">
                <svg className="w-3 h-3 mt-0.5 mr-1.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {contactInfo.address}
              </p>
              <p className="flex items-center">
                <svg className="w-3 h-3 mr-1.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                {contactInfo.phone}
              </p>
              <p className="flex items-center">
                <svg className="w-3 h-3 mr-1.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                {contactInfo.email}
              </p>
              {contactInfo.website && (
                <p className="flex items-center">
                  <svg className="w-3 h-3 mr-1.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                  </svg>
                  <a 
                    href={contactInfo.website} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Visit Website
                  </a>
                </p>
              )}
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-gray-300 text-xs">
            &copy; {currentYear} <span className="text-white font-semibold">{collegeName}</span>. All rights reserved.
          </p>
          {contactInfo.website && (
            <p className="text-gray-400 text-xs mt-1">
              <a 
                href={contactInfo.website} 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200"
              >
                {contactInfo.website.replace(/^https?:\/\//, '')}
              </a>
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};