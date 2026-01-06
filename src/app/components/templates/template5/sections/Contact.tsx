"use client";

import { useState, useRef } from "react";
import { 
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiUser,
  FiBookOpen,
  FiClock,
  FiArrowRight,
  FiMessageSquare,
  FiCalendar,
  FiChevronRight,
  FiCheck
} from "react-icons/fi";

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(0);

  // Editorial-style contact data
  const departments = [
    {
      title: "Admissions & inquiries",
      email: "admissions@college.edu",
      location: "123 Education Street, Academic District",
      phone: "+1 (555) 123-4567",
      description: "Questions about enrollment, applications, or visiting campus",
      hours: "Weekdays 9–5, Saturdays 10–2"
    },
    {
      title: "Academic support",
      email: "academic@college.edu",
      location: "456 University Avenue, Campus Center",
      phone: "+1 (555) 987-6543",
      description: "Curriculum, program details, and academic guidance",
      hours: "Weekdays 10–6"
    },
    {
      title: "Student services",
      email: "support@college.edu",
      location: "789 Student Union Building",
      phone: "+1 (555) 456-7890",
      description: "General assistance and campus services",
      hours: "Weekdays 8–7, Saturdays 9–1"
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
    >
      {/* Simple background texture - matches About section */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24 md:py-32">
        {/* Section Header - Editorial style */}
        <div className="mb-20 max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-8 bg-[#121212]" />
            <span className="text-[13px] text-[#6E6E6E] tracking-widest uppercase">
              Get in touch
            </span>
          </div>
          
          <h1 className="font-serif text-[38px] leading-[1.2] tracking-tight text-[#121212] font-medium mb-8">
            We're here to help
          </h1>
          
          <p className="font-sans text-[17px] text-[#4A4A4A] leading-relaxed">
            Have questions or want to learn more? Reach out to our dedicated teams. 
            We typically respond within a day.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left Column - Contact Information */}
          <div className="lg:w-7/12">
            {/* Department Selector */}
            <div className="mb-12">
              <h2 className="font-serif text-[22px] font-medium text-[#121212] mb-8">
                Departments & hours
              </h2>
              
              <div className="space-y-6">
                {departments.map((dept, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedDepartment(index)}
                    className={`border rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                      selectedDepartment === index 
                        ? 'border-[#2F5D62] bg-[#F6F6F6]' 
                        : 'border-[#EDEDED] hover:border-[#2F5D62]/30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2">
                        <h3 className="font-serif text-[18px] font-medium text-[#121212]">
                          {dept.title}
                        </h3>
                        <p className="font-sans text-[14px] text-[#6E6E6E]">
                          {dept.description}
                        </p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ${
                        selectedDepartment === index 
                          ? 'border-[#2F5D62] bg-[#2F5D62]' 
                          : 'border-[#EDEDED]'
                      }`}>
                        {selectedDepartment === index && (
                          <FiCheck className="h-3 w-3 text-white" />
                        )}
                      </div>
                    </div>

                    {/* Contact details */}
                    <div className="space-y-4 pl-2">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-white border border-[#EDEDED] flex items-center justify-center flex-shrink-0">
                          <FiMail className="h-3 w-3 text-[#4A4A4A]" />
                        </div>
                        <div>
                          <div className="text-[11px] text-[#6E6E6E] uppercase tracking-wider mb-1">
                            Email
                          </div>
                          <a 
                            href={`mailto:${dept.email}`}
                            className="font-sans text-[15px] text-[#121212] hover:text-[#2F5D62] transition-colors"
                          >
                            {dept.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-white border border-[#EDEDED] flex items-center justify-center flex-shrink-0">
                          <FiPhone className="h-3 w-3 text-[#4A4A4A]" />
                        </div>
                        <div>
                          <div className="text-[11px] text-[#6E6E6E] uppercase tracking-wider mb-1">
                            Phone
                          </div>
                          <a 
                            href={`tel:${dept.phone.replace(/\D/g, '')}`}
                            className="font-sans text-[15px] text-[#121212] hover:text-[#2F5D62] transition-colors"
                          >
                            {dept.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-white border border-[#EDEDED] flex items-center justify-center flex-shrink-0 mt-1">
                          <FiMapPin className="h-3 w-3 text-[#4A4A4A]" />
                        </div>
                        <div>
                          <div className="text-[11px] text-[#6E6E6E] uppercase tracking-wider mb-1">
                            Location
                          </div>
                          <p className="font-sans text-[14px] text-[#4A4A4A] leading-relaxed">
                            {dept.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-white border border-[#EDEDED] flex items-center justify-center flex-shrink-0">
                          <FiClock className="h-3 w-3 text-[#4A4A4A]" />
                        </div>
                        <div>
                          <div className="text-[11px] text-[#6E6E6E] uppercase tracking-wider mb-1">
                            Hours
                          </div>
                          <p className="font-sans text-[14px] text-[#4A4A4A]">
                            {dept.hours}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Information - Editorial layout */}
            <div className="border-t border-[#EDEDED] pt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-serif text-[18px] font-medium text-[#121212] mb-6">
                    Campus visits
                  </h3>
                  <p className="font-sans text-[14px] text-[#4A4A4A] leading-relaxed mb-6">
                    We welcome visitors Monday through Friday. Tours are best scheduled in advance.
                  </p>
                  <button className="inline-flex items-center gap-2 text-[#2F5D62] font-sans text-sm font-medium hover:text-[#121212] transition-colors">
                    <span>Schedule a tour</span>
                    <FiChevronRight className="h-3 w-3" />
                  </button>
                </div>

                <div>
                  <h3 className="font-serif text-[18px] font-medium text-[#121212] mb-6">
                    Response times
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-sans text-[14px] text-[#4A4A4A]">Email inquiries</span>
                      <span className="font-sans text-[14px] text-[#121212] font-medium">1–2 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-sans text-[14px] text-[#4A4A4A]">Phone calls</span>
                      <span className="font-sans text-[14px] text-[#121212] font-medium">Same day</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-sans text-[14px] text-[#4A4A4A]">Admissions</span>
                      <span className="font-sans text-[14px] text-[#121212] font-medium">3–5 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:w-5/12">
            <div className="border border-[#EDEDED] rounded-lg p-8">
              <div className="mb-10">
                <h2 className="font-serif text-[24px] font-medium text-[#121212] mb-4">
                  Send a message
                </h2>
                <p className="font-sans text-[15px] text-[#4A4A4A] leading-relaxed">
                  Complete the form below and we'll respond as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name Field */}
                <div>
                  <label className="block font-sans text-[14px] text-[#4A4A4A] font-medium mb-3" htmlFor="name">
                    Your name
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <FiUser className="text-[#6E6E6E] text-sm" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-[#EDEDED] rounded-lg focus:border-[#2F5D62] focus:ring-0 focus:outline-none transition-all duration-300 bg-white text-[#121212] font-sans text-[15px]"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block font-sans text-[14px] text-[#4A4A4A] font-medium mb-3" htmlFor="email">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <FiMail className="text-[#6E6E6E] text-sm" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-[#EDEDED] rounded-lg focus:border-[#2F5D62] focus:ring-0 focus:outline-none transition-all duration-300 bg-white text-[#121212] font-sans text-[15px]"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block font-sans text-[14px] text-[#4A4A4A] font-medium mb-3" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#EDEDED] rounded-lg focus:border-[#2F5D62] focus:ring-0 focus:outline-none transition-all duration-300 bg-white text-[#121212] font-sans text-[15px]"
                    placeholder="What would you like to discuss?"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block font-sans text-[14px] text-[#4A4A4A] font-medium mb-3" htmlFor="message">
                    Your message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-[#EDEDED] rounded-lg focus:border-[#2F5D62] focus:ring-0 focus:outline-none transition-all duration-300 bg-white text-[#121212] font-sans text-[15px] resize-none leading-relaxed"
                    placeholder="Please share details about your inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 border border-[#121212] text-[#121212] font-sans text-[15px] font-medium rounded-lg transition-all duration-300 flex items-center justify-center hover:text-[#2F5D62] hover:border-[#2F5D62] ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-3">Sending...</span>
                        <div className="w-4 h-4 border-2 border-[#2F5D62] border-t-transparent rounded-full animate-spin"></div>
                      </>
                    ) : (
                      <>
                        <FiSend className="mr-3 h-4 w-4" />
                        Send message
                      </>
                    )}
                  </button>
                </div>

                {/* Privacy Notice */}
                <div>
                  <p className="font-sans text-[12px] text-[#6E6E6E] leading-relaxed text-center">
                    Your information is secure. We respect your privacy and never share contact details.
                  </p>
                </div>
              </form>

              {/* Direct Contact Option */}
              <div className="mt-12 pt-8 border-t border-[#EDEDED]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F6F6F6] border border-[#EDEDED] flex items-center justify-center flex-shrink-0">
                    <FiMessageSquare className="h-4 w-4 text-[#2F5D62]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-sans text-[14px] text-[#121212] font-medium">
                      Prefer to call?
                    </p>
                    <p className="font-sans text-[13px] text-[#6E6E6E]">
                      Speak directly with our team during office hours
                    </p>
                  </div>
                  <a 
                    href={`tel:${departments[selectedDepartment].phone.replace(/\D/g, '')}`}
                    className="font-sans text-[14px] text-[#2F5D62] font-medium hover:text-[#121212] transition-colors whitespace-nowrap"
                  >
                    Call now →
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links - Editorial style */}
            <div className="mt-12 p-6 border border-[#EDEDED] rounded-lg">
              <h3 className="font-serif text-[18px] font-medium text-[#121212] mb-6">
                Quick resources
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Academic calendar", icon: FiCalendar },
                  { label: "Faculty directory", icon: FiBookOpen },
                  { label: "Campus map", icon: FiMapPin },
                  { label: "FAQs", icon: FiMessageSquare }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={index}
                      href="#"
                      className="flex items-center justify-between font-sans text-[14px] text-[#4A4A4A] hover:text-[#121212] transition-colors py-3 border-b border-[#EDEDED] last:border-0 group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-3 w-3 text-[#6E6E6E]" />
                        <span>{item.label}</span>
                      </div>
                      <FiArrowRight className="h-3 w-3 text-[#6E6E6E] group-hover:text-[#121212]" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Location Note */}
        <div className="mt-20 pt-12 border-t border-[#EDEDED]">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-8/12">
              <h3 className="font-serif text-[20px] font-medium text-[#121212] mb-6">
                Our location
              </h3>
              <p className="font-sans text-[15px] text-[#4A4A4A] leading-relaxed mb-6">
                Main campus is located in the academic district, accessible by public transit 
                and with ample parking. Visitors are welcome during business hours.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#2F5D62] rounded-full"></div>
                  <span className="font-sans text-[14px] text-[#4A4A4A]">Free parking available</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#2F5D62] rounded-full"></div>
                  <span className="font-sans text-[14px] text-[#4A4A4A]">Public transit accessible</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#2F5D62] rounded-full"></div>
                  <span className="font-sans text-[14px] text-[#4A4A4A]">Wheelchair accessible</span>
                </div>
              </div>
            </div>
            <div className="md:w-4/12">
              <div className="bg-[#F6F6F6] border border-[#EDEDED] p-6 rounded-lg">
                <p className="font-sans text-[13px] text-[#6E6E6E] mb-3">
                  For urgent matters outside business hours:
                </p>
                <a 
                  href="mailto:emergency@college.edu"
                  className="font-sans text-[14px] text-[#2F5D62] font-medium hover:text-[#121212] transition-colors"
                >
                  emergency@college.edu
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;