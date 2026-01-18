"use client";

import { useState, useRef, useEffect } from "react";
import { 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaPaperPlane,
  FaUser,
  FaBuilding,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";

// Import GSAP for animations
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftTitleRef = useRef<HTMLDivElement>(null);
  const rightTitleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [selectedContact, setSelectedContact] = useState(0);

  // Generic college contact data
  const contacts = [
    {
      title: "Admissions Office",
      email: "admissions@college.edu",
      location: "123 Education Street, Academic District, City, State 12345",
      phone: "+1 (555) 123-4567",
      description: "For enrollment, applications, and admission inquiries"
    },
    {
      title: "Academic Affairs",
      email: "academic@college.edu",
      location: "456 University Avenue, Campus Center, City, State 12345",
      phone: "+1 (555) 987-6543",
      description: "For curriculum, programs, and academic policies"
    },
    {
      title: "Student Services",
      email: "support@college.edu",
      location: "789 Student Union Building, Campus West, City, State 12345",
      phone: "+1 (555) 456-7890",
      description: "For student support, counseling, and campus services"
    },
  ];

  // Office hours data
  const officeHours = [
    { day: "Monday - Friday", time: "8:00 AM - 6:00 PM" },
    { day: "Saturday", time: "9:00 AM - 2:00 PM" },
    { day: "Sunday", time: "Closed" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  // Animation effects
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation - split into left and right parts
      gsap.fromTo(
        leftTitleRef.current,
        { 
          x: -100, 
          opacity: 0,
          filter: "blur(10px)"
        },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          }
        }
      );

      gsap.fromTo(
        rightTitleRef.current,
        { 
          x: 100, 
          opacity: 0,
          filter: "blur(10px)"
        },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          }
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { 
          x: 50, 
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // Info card animation
      gsap.fromTo(
        infoCardRef.current,
        { 
          x: -50, 
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // Contact items animation
      gsap.fromTo(
        ".contact-item",
        { 
          x: -50, 
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative mt-4 py-16 md:py-20 bg-black text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-full mb-6">
            <FaEnvelope className="text-emerald-500" />
            <span className="text-gray-300 text-sm font-medium uppercase tracking-wider">
              Get in Touch
            </span>
          </div>
          
         <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
  <span
    ref={leftTitleRef}
    className="inline-block mr-2"
  >
    Contact
  </span>
  <span
    ref={rightTitleRef}
    className="inline-block text-emerald-500"
  >
    Our College
  </span>
</h2>

          
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Connect with our dedicated teams for admissions, academic support, or any assistance you may need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">
              Campus Departments
            </h3>
            
            {/* Contact List */}
            <ul className="space-y-6">
              {contacts.map((contact, index) => (
                <li 
                  key={index}
                  className="contact-item"
                  onClick={() => setSelectedContact(index)}
                >
                  <div className={`p-6 transition-all duration-300 cursor-pointer border-2 rounded-2xl ${
                    selectedContact === index 
                      ? 'border-emerald-500 bg-emerald-900/10' 
                      : 'border-gray-800 bg-gray-900 hover:border-gray-700 hover:bg-gray-800/50'
                  }`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          selectedContact === index 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-gray-800 text-gray-300'
                        }`}>
                          <FaBuilding className="text-lg" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2">
                          {contact.title}
                        </h4>
                        <p className="text-sm text-gray-400 mb-3">
                          {contact.description}
                        </p>
                        <div className={`w-12 h-0.5 ${
                          selectedContact === index ? 'bg-emerald-500' : 'bg-gray-700'
                        }`}></div>
                      </div>
                    </div>

                    {/* Contact Details */}
                    <ul className="space-y-3 ml-16">
                      {/* Email */}
                      <li className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3 flex-shrink-0">
                          <FaEnvelope className="text-emerald-500 text-sm" />
                        </div>
                        <div className="flex-1">
                          <a 
                            href={`mailto:${contact.email}`}
                            className="text-white hover:text-emerald-400 transition-colors"
                          >
                            {contact.email}
                          </a>
                        </div>
                      </li>

                      {/* Phone */}
                      <li className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3 flex-shrink-0">
                          <FaPhone className="text-emerald-500 text-sm" />
                        </div>
                        <div className="flex-1">
                          <a 
                            href={`tel:${contact.phone.replace(/\D/g, '')}`}
                            className="text-white hover:text-emerald-400 transition-colors"
                          >
                            {contact.phone}
                          </a>
                        </div>
                      </li>

                      {/* Location */}
                      <li className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                          <FaMapMarkerAlt className="text-emerald-500 text-sm" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {contact.location}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              ))}
            </ul>

            {/* Response Times */}
            <div className="mt-8 bg-gray-900 border-2 border-gray-800 rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">
                <FaClock className="text-emerald-500" />
                Response Times
              </h4>
              <ul className="grid grid-cols-2 gap-4">
                <li className="text-center p-4 border-2 border-gray-800 rounded-2xl bg-gray-800/50">
                  <div className="w-10 h-10 rounded-full bg-emerald-900/30 flex items-center justify-center mx-auto mb-3">
                    <FaEnvelope className="text-emerald-500 text-sm" />
                  </div>
                  <p className="text-xs text-gray-400 mb-1">Email Response</p>
                  <p className="text-sm font-semibold text-white">24-48 Hours</p>
                </li>
                <li className="text-center p-4 border-2 border-gray-800 rounded-2xl bg-gray-800/50">
                  <div className="w-10 h-10 rounded-full bg-emerald-900/30 flex items-center justify-center mx-auto mb-3">
                    <FaPhone className="text-emerald-500 text-sm" />
                  </div>
                  <p className="text-xs text-gray-400 mb-1">Phone Response</p>
                  <p className="text-sm font-semibold text-white">2-4 Hours</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Contact Form & Info Card */}
          <div className="space-y-8">
            {/* Contact Form */}
            <div ref={formRef}>
              <div className="bg-gray-900 border-2 border-gray-800 rounded-2xl p-6 md:p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-400">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="name">
                      Your Name
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <FaUser className="text-gray-500 text-sm" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border-2 border-gray-700 text-white rounded-2xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <FaEnvelope className="text-gray-500 text-sm" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border-2 border-gray-700 text-white rounded-2xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-300"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="subject">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 text-white rounded-2xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-300"
                      placeholder="What is this regarding?"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="message">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 text-white rounded-2xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-300 resize-none"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 px-6 bg-emerald-600 text-white font-semibold rounded-2xl hover:bg-emerald-700 hover:shadow-xl transition-all duration-300 flex items-center justify-center text-base shadow-md"
                    >
                      <FaPaperPlane className="mr-3 text-base" />
                      Send Message
                      <FaArrowRight className="ml-3 text-sm" />
                    </button>
                  </div>

                  {/* Privacy Notice */}
                  <div>
                    <p className="text-gray-500 text-xs text-center leading-relaxed">
                      By submitting this form, you agree to our{" "}
                      <a href="#" className="text-emerald-500 hover:underline font-medium">
                        Privacy Policy
                      </a>
                      . We will never share your information with third parties.
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Information Section with Lists */}
            <div ref={infoCardRef}>
              <div className="bg-gray-900 border-2 border-gray-800 rounded-2xl p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Campus Locations */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                      <FaMapMarkerAlt className="text-emerald-500" />
                      Campus Locations
                    </h4>
                    <ol className="space-y-4">
                      {contacts.map((contact, index) => (
                        <li key={index} className="pb-4 border-b border-gray-800 last:border-0 last:pb-0">
                          <div className="flex items-start gap-3 mb-2">
                            <div className="w-6 h-6 rounded-full bg-emerald-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-xs font-semibold text-emerald-500">{index + 1}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{contact.title}</p>
                              <p className="text-xs text-gray-400 mt-1">{contact.location}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Office Hours & Quick Links */}
                  <div className="space-y-6">
                    {/* Office Hours */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                        <FaClock className="text-emerald-500" />
                        Office Hours
                      </h4>
                      <ul className="space-y-3">
                        {officeHours.map((hour, index) => (
                          <li key={index} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
                            <span className="text-sm text-gray-400">{hour.day}</span>
                            <span className="text-sm font-medium text-white">{hour.time}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        /* Smooth transitions for form inputs */
        input, textarea {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Custom scrollbar styling */
        textarea::-webkit-scrollbar {
          width: 6px;
        }
        
        textarea::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        textarea::-webkit-scrollbar-thumb {
          background: #059669;
          border-radius: 10px;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .section-title h1 {
            font-size: 1.75rem;
          }
          
          input, textarea {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;