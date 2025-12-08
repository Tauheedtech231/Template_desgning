"use client";

import React, { useState } from "react";
import { Mail, MapPin, Phone, Send, Building2, GraduationCap, Briefcase } from "lucide-react";

const contacts = [
  {
    title: "Mansol Manpower Solutions",
    email: "info@mansol.com.pk",
    location: "Office No. 123, 1st Floor, Divine Mega-2, New Airport Road, Opposite Honda Point, Lahore",
    phone: "+92 (423) 5700362",
    icon: <Building2 className="w-5 h-5" />,
    color: "bg-gradient-to-br from-[#4B3F72] to-[#6D5BA6]",
  },
  {
    title: "Mansol Technical Training Institute",
    email: "mtti@mansol.com.pk",
    location: "E-210, Gulshan Ali Colony, New Airport Road, Lahore",
    phone: "+92 (423) 7169399",
    icon: <GraduationCap className="w-5 h-5" />,
    color: "bg-gradient-to-br from-[#F28C28] to-[#FF9E40]",
  },
  {
    title: "Mansol Engineering Services",
    email: "mes@mansol.com.pk",
    location: "Office No. 122, 1st Floor, Divine Mega-2, New Airport Road, Opposite Honda Point, Lahore",
    phone: "+92 (423) 5700362",
    icon: <Briefcase className="w-5 h-5" />,
    color: "bg-gradient-to-br from-emerald-600 to-teal-500",
  },
];

const ContactSection: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setFormSubmitted(true);
      setIsSubmitting(false);
      setTimeout(() => {
        setFormSubmitted(false);
        setForm({ name: "", email: "", subject: "", message: "" });
      }, 3000);
    }, 1500);
  };

  return (
    <section className="relative bg-gradient-to-b from-white to-[#F8F5F0] py-16 md:py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#F28C28]/10 to-[#4B3F72]/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-[#4B3F72]/10 to-[#F28C28]/10 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-[#F28C28]/10 to-[#4B3F72]/10">
            <div className="w-2 h-2 rounded-full bg-[#F28C28]" />
            <span className="text-sm font-semibold text-[#F28C28] uppercase tracking-wider">
              Get in Touch
            </span>
            <div className="w-2 h-2 rounded-full bg-[#4B3F72]" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-[#4B3F72] mb-6">
            Contact <span className="bg-gradient-to-r from-[#4B3F72] to-[#F28C28] bg-clip-text text-transparent">
              Us
            </span>
          </h2>
          
          <p className="text-lg text-[#8E8D8A] max-w-2xl mx-auto">
            Reach out to our teams or send us a message. We are here to help you!
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {contacts.map((contact, idx) => (
              <div 
                key={idx}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 ${contact.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative">
                  {/* Header with icon */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-xl ${contact.color} flex items-center justify-center shadow-md`}>
                      <div className="text-white">
                        {contact.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-[#4B3F72] leading-tight">
                      {contact.title}
                    </h3>
                  </div>
                  
                  {/* Contact Details */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-[#F28C28] flex-shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#8E8D8A] mb-1">Email</p>
                        <a 
                          href={`mailto:${contact.email}`}
                          className="text-base text-[#4B3F72] hover:text-[#F28C28] transition-colors font-medium"
                        >
                          {contact.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-[#F28C28] flex-shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#8E8D8A] mb-1">Location</p>
                        <p className="text-base text-[#4B3F72] font-medium leading-relaxed">
                          {contact.location}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-[#F28C28] flex-shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#8E8D8A] mb-1">Phone</p>
                        <a 
                          href={`tel:${contact.phone.replace(/\D/g, '')}`}
                          className="text-base text-[#4B3F72] hover:text-[#F28C28] transition-colors font-medium"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative corner */}
                  <div className={`absolute top-0 right-0 w-12 h-12 ${contact.color} opacity-10 rounded-bl-2xl`} />
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-2">
            <div className="relative bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-10 overflow-hidden">
              {/* Success Message Overlay */}
              {formSubmitted && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#4B3F72] mb-2">Message Sent!</h3>
                    <p className="text-[#8E8D8A]">Thank you for contacting us. We will get back to you soon.</p>
                  </div>
                </div>
              )}
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#4B3F72] to-[#F28C28] flex items-center justify-center">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#4B3F72]">
                      Send Us a Message
                    </h3>
                    <p className="text-[#8E8D8A]">
                      Fill out the form below and we will respond within 24 hours
                    </p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#4B3F72]">
                        Your Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F28C28]/30 focus:border-[#F28C28] transition-all placeholder:text-[#8E8D8A]/60"
                        />
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                          <div className="w-2 h-2 rounded-full bg-[#F28C28]" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#4B3F72]">
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F28C28]/30 focus:border-[#F28C28] transition-all placeholder:text-[#8E8D8A]/60"
                        />
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                          <div className="w-2 h-2 rounded-full bg-[#F28C28]" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#4B3F72]">
                      Subject *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F28C28]/30 focus:border-[#F28C28] transition-all placeholder:text-[#8E8D8A]/60"
                      />
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <div className="w-2 h-2 rounded-full bg-[#F28C28]" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#4B3F72]">
                      Message *
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your requirements..."
                        rows={6}
                        required
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F28C28]/30 focus:border-[#F28C28] transition-all placeholder:text-[#8E8D8A]/60 resize-none"
                      />
                      <div className="absolute top-3 left-3 flex items-center pointer-events-none">
                        <div className="w-2 h-2 rounded-full bg-[#F28C28]" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[#4B3F72] to-[#F28C28] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </div>
                    </button>
                    
                    <p className="mt-4 text-sm text-[#8E8D8A]">
                      By submitting this form, you agree to our privacy policy and terms of service.
                    </p>
                  </div>
                </form>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#F28C28]/10 to-purple-500/10 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-[#F28C28]/10 rounded-full blur-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <div className="text-sm text-[#8E8D8A] mb-2">
                &copy; {new Date().getFullYear()} Mansol Group. All rights reserved.
              </div>
              <div className="text-xs text-[#8E8D8A]/70">
                Leading the way in workforce solutions and technical training
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#4B3F72]/10 to-[#F28C28]/10 flex items-center justify-center">
                  <Phone className="w-3 h-3 text-[#4B3F72]" />
                </div>
                <span className="text-sm text-[#4B3F72] font-medium">24/7 Support</span>
              </div>
              <div className="w-px h-6 bg-gray-300" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#4B3F72]/10 to-[#F28C28]/10 flex items-center justify-center">
                  <Mail className="w-3 h-3 text-[#4B3F72]" />
                </div>
                <span className="text-sm text-[#4B3F72] font-medium">Fast Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;