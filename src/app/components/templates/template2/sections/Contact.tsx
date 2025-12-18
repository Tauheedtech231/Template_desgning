"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaLinkedin, 
  FaInstagram, 
  FaFacebook,
  FaPaperPlane,
  FaUser,
  FaBuilding
} from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ContactCard {
  title: string;
  email: string;
  location: string;
  phone: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface ContactData {
  cards: ContactCard[];
  socialLinks: SocialLink[];
  formHeader?: string;
  formDescription?: string;
  operatingHours?: string;
}

export const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contactData, setContactData] = useState<ContactData>({
    cards: [],
    socialLinks: [],
    formHeader: "Send Us a Message",
    formDescription: "Fill out the form below and our team will get back to you within 24 hours.",
    operatingHours: "Operating Hours: Monday - Friday, 9:00 AM - 6:00 PM"
  });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // ✅ Load contact data from database with template_id = 2
  useEffect(() => {
    const loadContactData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/sections?template_id=2&section_name=Contacts`
        );
        
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched contact data:', data);
          
          if (data.sections && data.sections.length > 0) {
            const dbContent = data.sections[0].content;
            
            // Map database data to component format
            const mappedData: ContactData = {
              // If we have contactInfo in database, create cards from it
              cards: dbContent.contactInfo ? [
                {
                  title: "Mansol Manpower Solutions",
                  email: dbContent.contactInfo.email || "info@mansol.com.pk",
                  location: dbContent.contactInfo.address || "Office No. 123, 1st Floor, Divine Mega-2, New Airport Road, Opposite Honda Point, Lahore",
                  phone: dbContent.contactInfo.contactNumbers?.phone || "+92 (423) 5700362"
                },
                {
                  title: "Mansol Technical Training Institute",
                  email: dbContent.contactInfo.email || "mtti@mansol.com.pk",
                  location: dbContent.contactInfo.address || "E-210, Gulshan Ali Colony, New Airport Road, Lahore",
                  phone: dbContent.contactInfo.contactNumbers?.office || "+92 (423) 7169399"
                },
                {
                  title: "Mansol Engineering Services",
                  email: dbContent.contactInfo.email || "mes@mansol.com.pk",
                  location: dbContent.contactInfo.address || "Office No. 122, 1st Floor, Divine Mega-2, New Airport Road, Opposite Honda Point, Lahore",
                  phone: dbContent.contactInfo.contactNumbers?.phone || "+92 (423) 5700362"
                }
              ] : [
                // Fallback default data
                {
                  title: "Mansol Manpower Solutions",
                  email: "info@mansol.com.pk",
                  location: "Office No. 123, 1st Floor, Divine Mega-2, New Airport Road, Opposite Honda Point, Lahore",
                  phone: "+92 (423) 5700362",
                },
                {
                  title: "Mansol Technical Training Institute",
                  email: "mtti@mansol.com.pk",
                  location: "E-210, Gulshan Ali Colony, New Airport Road, Lahore",
                  phone: "+92 (423) 7169399",
                },
                {
                  title: "Mansol Engineering Services",
                  email: "mes@mansol.com.pk",
                  location: "Office No. 122, 1st Floor, Divine Mega-2, New Airport Road, Opposite Honda Point, Lahore",
                  phone: "+92 (423) 5700362",
                },
              ],
              
              // Social links from database or default
              socialLinks: dbContent.contactInfo?.socialMedia ? 
                Object.entries(dbContent.contactInfo.socialMedia)
                  .filter(([_, url]) => url && typeof url === 'string')
                  .map(([platform, url]) => ({
                    platform,
                    url: url as string
                  }))
                  .slice(0, 3) // Take only first 3
              : [
                { platform: "linkedin", url: "https://www.linkedin.com/in/mansol-hab-traning-services-b7b4b1296/" },
                { platform: "instagram", url: "https://www.instagram.com/mansol.hab.training.services/?next=%2F&hl=en" },
                { platform: "facebook", url: "https://www.facebook.com/people/Mansol-Hab/61567152315949/" },
              ],
              
              formHeader: "Send Us a Message",
              formDescription: "Fill out the form below and our team will get back to you within 24 hours.",
              operatingHours: dbContent.contactInfo?.workingHours 
                ? `Operating Hours: Weekdays ${dbContent.contactInfo.workingHours.weekdays || '9:00 AM - 6:00 PM'}, Saturday ${dbContent.contactInfo.workingHours.saturday || '9:00 AM - 2:00 PM'}, Sunday ${dbContent.contactInfo.workingHours.sunday || 'Closed'}`
                : "Operating Hours: Monday - Friday, 9:00 AM - 6:00 PM"
            };
            
            setContactData(mappedData);
          } else {
            // Use default data if no data in database
            setContactData({
              cards: [
                {
                  title: "Mansol Manpower Solutions",
                  email: "info@mansol.com.pk",
                  location: "Office No. 123, 1st Floor, Divine Mega-2, New Airport Road, Opposite Honda Point, Lahore",
                  phone: "+92 (423) 5700362",
                },
                {
                  title: "Mansol Technical Training Institute",
                  email: "mtti@mansol.com.pk",
                  location: "E-210, Gulshan Ali Colony, New Airport Road, Lahore",
                  phone: "+92 (423) 7169399",
                },
                {
                  title: "Mansol Engineering Services",
                  email: "mes@mansol.com.pk",
                  location: "Office No. 122, 1st Floor, Divine Mega-2, New Airport Road, Opposite Honda Point, Lahore",
                  phone: "+92 (423) 5700362",
                },
              ],
              socialLinks: [
                { platform: "linkedin", url: "https://www.linkedin.com/in/mansol-hab-traning-services-b7b4b1296/" },
                { platform: "instagram", url: "https://www.instagram.com/mansol.hab.training.services/?next=%2F&hl=en" },
                { platform: "facebook", url: "https://www.facebook.com/people/Mansol-Hab/61567152315949/" },
              ],
              formHeader: "Send Us a Message",
              formDescription: "Fill out the form below and our team will get back to you within 24 hours.",
              operatingHours: "Operating Hours: Monday - Friday, 9:00 AM - 6:00 PM"
            });
          }
        } else {
          console.error('Failed to fetch contact data');
          // Use default data on error
          setContactData({
            cards: [
              {
                title: "Mansol Manpower Solutions",
                email: "info@mansol.com.pk",
                location: "Office No. 123, 1st Floor, Divine Mega-2, New Airport Road, Opposite Honda Point, Lahore",
                phone: "+92 (423) 5700362",
              },
              {
                title: "Mansol Technical Training Institute",
                email: "mtti@mansol.com.pk",
                location: "E-210, Gulshan Ali Colony, New Airport Road, Lahore",
                phone: "+92 (423) 7169399",
              },
              {
                title: "Mansol Engineering Services",
                email: "mes@mansol.com.pk",
                location: "Office No. 122, 1st Floor, Divine Mega-2, New Airport Road, Opposite Honda Point, Lahore",
                phone: "+92 (423) 5700362",
              },
            ],
            socialLinks: [
              { platform: "linkedin", url: "https://www.linkedin.com/in/mansol-hab-traning-services-b7b4b1296/" },
              { platform: "instagram", url: "https://www.linkedin.com/in/mansol-hab-traning-services-b7b4b1296/" },
              { platform: "facebook", url: "https://www.facebook.com/people/Mansol-Hab/61567152315949/" },
            ],
            formHeader: "Send Us a Message",
            formDescription: "Fill out the form below and our team will get back to you within 24 hours.",
            operatingHours: "Operating Hours: Monday - Friday, 9:00 AM - 6:00 PM"
          });
        }
      } catch (error) {
        console.error('Error loading contact data:', error);
        // Use default data on error
        setContactData({
          cards: [
            {
              title: "Mansol Manpower Solutions",
              email: "info@mansol.com.pk",
              location: "Office No. 123, 1st Floor, Divine Mega-2, New Airport Road, Opposite Honda Point, Lahore",
              phone: "+92 (423) 5700362",
            },
            {
              title: "Mansol Technical Training Institute",
              email: "mtti@mansol.com.pk",
              location: "E-210, Gulshan Ali Colony, New Airport Road, Lahore",
              phone: "+92 (423) 7169399",
            },
            {
              title: "Mansol Engineering Services",
              email: "mes@mansol.com.pk",
              location: "Office No. 122, 1st Floor, Divine Mega-2, New Airport Road, Opposite Honda Point, Lahore",
              phone: "+92 (423) 5700362",
            },
          ],
          socialLinks: [
            { platform: "linkedin", url: "https://www.linkedin.com/in/mansol-hab-traning-services-b7b4b1296/" },
            { platform: "instagram", url: "https://www.instagram.com/mansol.hab.training.services/?next=%2F&hl=en" },
            { platform: "facebook", url: "https://www.facebook.com/people/Mansol-Hab/61567152315949/" },
          ],
          formHeader: "Send Us a Message",
          formDescription: "Fill out the form below and our team will get back to you within 24 hours.",
          operatingHours: "Operating Hours: Monday - Friday, 9:00 AM - 6:00 PM"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadContactData();
  }, []);

  useEffect(() => {
    if (isLoading || contactData.cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Left side animations
      gsap.fromTo(
        ".contact-info",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Right side animations
      gsap.fromTo(
        ".contact-form",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Icon animations
      gsap.fromTo(
        ".contact-icon",
        { scale: 0, rotation: -90 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Form element animations
      gsap.fromTo(
        ".form-element",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, contactData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  // Helper function to get social icon
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <FaLinkedin />;
      case 'instagram':
        return <FaInstagram />;
      case 'facebook':
        return <FaFacebook />;
      case 'twitter':
        return null; // Add if needed
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <section id="contact" className="relative min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB]"></div>
            <span className="ml-3 text-gray-600">Loading contact information...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen"
    >
      {/* Split Layout Container */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Contact Info (Black Background) */}
        <div className="lg:w-1/2 bg-black text-white p-8 lg:p-16">
          <div className="h-full flex flex-col justify-between contact-info">
            {/* Section Header */}
            <div>
              <div className="mb-8">
                <span className="text-[#2563EB] text-sm font-light tracking-widest uppercase">
                  Get in Touch
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Contact Us
              </h1>
              
              <p className="text-[#CCCCCC] text-lg mb-12 max-w-lg">
                Connect with our specialized departments for inquiries, partnerships, or any assistance you may need.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-8 mb-12">
              {contactData.cards.map((contact, index) => (
                <div 
                  key={index} 
                  className="p-6 border border-white/10 rounded-lg hover:border-[#2563EB]/30 transition-all duration-300"
                >
                  <div className="flex items-start mb-4">
                    <div className="contact-icon mr-4">
                      <div className="w-12 h-12 rounded-full border-2 border-[#2563EB] flex items-center justify-center">
                        <FaBuilding className="text-[#2563EB] text-lg" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {contact.title}
                      </h3>
                      <div className="w-16 h-0.5 bg-[#2563EB] mb-4"></div>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-4">
                    {/* Email */}
                    <div className="flex items-center">
                      <div className="contact-icon mr-4">
                        <div className="w-10 h-10 rounded-full border border-[#2563EB] flex items-center justify-center">
                          <FaEnvelope className="text-[#2563EB]" />
                        </div>
                      </div>
                      <div>
                        <p className="text-[#CCCCCC] text-sm mb-1">Email</p>
                        <a 
                          href={`mailto:${contact.email}`}
                          className="text-white hover:text-[#2563EB] transition-colors"
                        >
                          {contact.email}
                        </a>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start">
                      <div className="contact-icon mr-4 mt-1">
                        <div className="w-10 h-10 rounded-full border border-[#2563EB] flex items-center justify-center">
                          <FaMapMarkerAlt className="text-[#2563EB]" />
                        </div>
                      </div>
                      <div>
                        <p className="text-[#CCCCCC] text-sm mb-1">Location</p>
                        <p className="text-white">
                          {contact.location}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center">
                      <div className="contact-icon mr-4">
                        <div className="w-10 h-10 rounded-full border border-[#2563EB] flex items-center justify-center">
                          <FaPhone className="text-[#2563EB]" />
                        </div>
                      </div>
                      <div>
                        <p className="text-[#CCCCCC] text-sm mb-1">Phone</p>
                        <a 
                          href={`tel:${contact.phone.replace(/\D/g, '')}`}
                          className="text-white hover:text-[#2563EB] transition-colors"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#CCCCCC] text-sm mb-4">
                    {contactData.operatingHours}
                  </p>
                  <div className="flex space-x-4">
                    {contactData.socialLinks.map((social, idx) => (
                      <a
                        key={idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all duration-300 flex items-center justify-center"
                      >
                        {getSocialIcon(social.platform)}
                      </a>
                    ))}
                  </div>
                </div>
                <p className="text-[#CCCCCC] text-sm">
                  &copy; {new Date().getFullYear()} Mansol Group. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form (White Background) */}
        <div className="lg:w-1/2 bg-white p-8 lg:p-16 flex items-center justify-center">
          <div className="w-full max-w-lg contact-form">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {contactData.formHeader}
              </h2>
              <p className="text-gray-600">
                {contactData.formDescription}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="form-element">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                  Your Name
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-[#E5E5E5] rounded-lg focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="form-element">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-[#E5E5E5] rounded-lg focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div className="form-element">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-[#E5E5E5] rounded-lg focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none transition-all duration-300"
                  placeholder="What is this regarding?"
                />
              </div>

              {/* Message Field */}
              <div className="form-element">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="message">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-[#E5E5E5] rounded-lg focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              {/* Submit Button */}
              <div className="form-element pt-4">
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-[#2563EB] text-white font-semibold rounded-lg hover:bg-[#1d4ed8] transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <FaPaperPlane className="mr-3" />
                  Send Message
                </button>
              </div>

              {/* Privacy Notice */}
              <div className="form-element">
                <p className="text-gray-500 text-sm text-center">
                  By submitting this form, you agree to our{" "}
                  <a href="#" className="text-[#2563EB] hover:underline">
                    Privacy Policy
                  </a>
                  . We will never share your information with third parties.
                </p>
              </div>
            </form>

            {/* Contact Methods Alternative */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-4 border border-gray-100 rounded-lg hover:border-[#2563EB]/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#2563EB]/10 flex items-center justify-center mx-auto mb-3">
                    <FaEnvelope className="text-[#2563EB]" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Email Response Time</p>
                  <p className="font-semibold text-black">Within 24 Hours</p>
                </div>
                <div className="text-center p-4 border border-gray-100 rounded-lg hover:border-[#2563EB]/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#2563EB]/10 flex items-center justify-center mx-auto mb-3">
                    <FaPhone className="text-[#2563EB]" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Phone Response Time</p>
                  <p className="font-semibold text-black">Within 2 Hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};