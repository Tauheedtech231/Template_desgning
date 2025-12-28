"use client";

import { useState, useRef } from "react";
import { 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaPaperPlane,
  FaUser,
  FaBuilding,
  FaClock,
  FaArrowRight,
  FaGraduationCap,
  FaBookOpen
} from "react-icons/fa";

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-[#064E3B] to-[#0B6E5E] text-white overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(90deg, transparent 95%, white 100%),
                             linear-gradient(180deg, transparent 95%, white 100%)`,
            backgroundSize: '50px 50px',
          }}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <FaEnvelope className="text-white" />
            <span className="text-white text-sm font-medium uppercase tracking-wider">
              Get in Touch
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Contact{" "}
            <span className="text-white/90">
              Our College
            </span>
          </h2>
          
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            Connect with our dedicated teams for admissions, academic support, or any assistance you may need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">
              Campus Departments
            </h3>
            
            <div className="space-y-6">
              {contacts.map((contact, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedContact(index)}
                  className={`bg-white/10 backdrop-blur-sm rounded-xl border p-6 transition-all duration-300 cursor-pointer ${
                    selectedContact === index 
                      ? 'border-white/50 shadow-lg' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        selectedContact === index 
                          ? 'bg-white text-[#064E3B]' 
                          : 'bg-white/20 text-white'
                      }`}>
                        <FaBuilding className="text-lg" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {contact.title}
                      </h4>
                      <p className="text-sm text-white/70 mb-3">
                        {contact.description}
                      </p>
                      <div className={`w-12 h-0.5 ${
                        selectedContact === index ? 'bg-white' : 'bg-white/30'
                      }`}></div>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-3 ml-16">
                    {/* Email */}
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3 flex-shrink-0">
                        <FaEnvelope className="text-white text-sm" />
                      </div>
                      <div className="flex-1">
                        <a 
                          href={`mailto:${contact.email}`}
                          className="text-white hover:text-white/90 transition-colors"
                        >
                          {contact.email}
                        </a>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3 flex-shrink-0">
                        <FaPhone className="text-white text-sm" />
                      </div>
                      <div className="flex-1">
                        <a 
                          href={`tel:${contact.phone.replace(/\D/g, '')}`}
                          className="text-white hover:text-white/90 transition-colors"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                        <FaMapMarkerAlt className="text-white text-sm" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white/90 text-sm leading-relaxed">
                          {contact.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Response Times */}
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <h4 className="text-lg font-semibold text-white mb-6">
                Response Times
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 border border-white/10 rounded-lg bg-white/5">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                    <FaEnvelope className="text-white text-sm" />
                  </div>
                  <p className="text-xs text-white/70 mb-1">Email Response</p>
                  <p className="text-sm font-semibold text-white">24-48 Hours</p>
                </div>
                <div className="text-center p-4 border border-white/10 rounded-lg bg-white/5">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                    <FaPhone className="text-white text-sm" />
                  </div>
                  <p className="text-xs text-white/70 mb-1">Phone Response</p>
                  <p className="text-sm font-semibold text-white">2-4 Hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <div className="bg-white rounded-2xl p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
                  Send Us a Message
                </h2>
                <p className="text-[#475569]">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-[#475569] text-sm font-medium mb-2" htmlFor="name">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <FaUser className="text-[#64748B] text-sm" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#1FB6A6] focus:ring-2 focus:ring-[#1FB6A6]/20 focus:outline-none transition-all duration-300 bg-white text-[#0F172A]"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-[#475569] text-sm font-medium mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <FaEnvelope className="text-[#64748B] text-sm" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#1FB6A6] focus:ring-2 focus:ring-[#1FB6A6]/20 focus:outline-none transition-all duration-300 bg-white text-[#0F172A]"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-[#475569] text-sm font-medium mb-2" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#1FB6A6] focus:ring-2 focus:ring-[#1FB6A6]/20 focus:outline-none transition-all duration-300 bg-white text-[#0F172A]"
                    placeholder="What is this regarding?"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-[#475569] text-sm font-medium mb-2" htmlFor="message">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#1FB6A6] focus:ring-2 focus:ring-[#1FB6A6]/20 focus:outline-none transition-all duration-300 bg-white text-[#0F172A] resize-none"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-white text-[#064E3B] font-semibold rounded-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 flex items-center justify-center text-base shadow-md"
                  >
                    <FaPaperPlane className="mr-3 text-base" />
                    Send Message
                    <FaArrowRight className="ml-3 text-sm" />
                  </button>
                </div>

                {/* Privacy Notice */}
                <div>
                  <p className="text-[#64748B] text-xs text-center leading-relaxed">
                    By submitting this form, you agree to our{" "}
                    <a href="#" className="text-[#064E3B] hover:underline font-medium">
                      Privacy Policy
                    </a>
                    . We will never share your information with third parties.
                  </p>
                </div>
              </form>

              {/* Additional CTA */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#064E3B]/10 flex items-center justify-center">
                      <FaGraduationCap className="text-[#064E3B] text-lg" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#0F172A]">Schedule a Campus Tour</p>
                      <p className="text-xs text-[#64748B]">Experience our campus firsthand</p>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-[#064E3B] text-white font-medium rounded-lg hover:bg-[#04332A] transition-colors shadow-sm">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
              <FaMapMarkerAlt className="text-white" />
              Campus Locations
            </h4>
            <div className="space-y-3">
              {contacts.map((contact, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-white">{contact.title}</p>
                    <p className="text-xs text-white/70">{contact.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
              <FaClock className="text-white" />
              Office Hours
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/80">Monday - Friday</span>
                <span className="text-sm font-medium text-white">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/80">Saturday</span>
                <span className="text-sm font-medium text-white">9:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/80">Sunday</span>
                <span className="text-sm font-medium text-white">Closed</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
              <FaBookOpen className="text-white" />
              Quick Links
            </h4>
            <div className="space-y-2">
              {[
                { label: "Download Brochure", href: "#" },
                { label: "Academic Calendar", href: "#" },
                { label: "Faculty Directory", href: "#" },
                { label: "Virtual Tour", href: "#" },
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="flex items-center justify-between text-white/90 hover:text-white transition-colors py-2 border-b border-white/10 last:border-0"
                >
                  <span>{link.label}</span>
                  <FaArrowRight className="text-xs" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;