"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaPaperPlane,
  FaUser,
  FaBuilding,
  FaClock,
  FaArrowRight,
  FaArrowLeft,
  FaCheck,
  FaGraduationCap,
  FaHandshake,
  FaUsers
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contacts = [
    {
      title: "Admissions & Enrollment",
      email: "admissions@college.edu",
      location: "123 Education Street, Academic District",
      phone: "+1 (555) 123-4567",
      description: "Questions about joining our community, application process, or visiting campus",
      hours: "Weekdays 9–5, Saturday 10–2",
      icon: FaGraduationCap,
      color: "from-gray-800 to-gray-900"
    },
    {
      title: "Academic Support",
      email: "academic@college.edu",
      location: "456 University Avenue, Campus Center",
      phone: "+1 (555) 987-6543",
      description: "For course information, program details, or academic advising",
      hours: "Weekdays 8–6, by appointment",
      icon: FaHandshake,
      color: "from-gray-700 to-gray-800"
    },
    {
      title: "Student Services",
      email: "support@college.edu",
      location: "789 Student Union Building, Campus West",
      phone: "+1 (555) 456-7890",
      description: "General questions, campus life, or student support resources",
      hours: "Weekdays 8–7, Saturday 9–1",
      icon: FaUsers,
      color: "from-gray-600 to-gray-700"
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
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-white py-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-teal-600 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are here to help with any questions you may have
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Contact Options */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Contact Options
              </h2>
              <p className="text-gray-600">
                Choose the department that best fits your inquiry
              </p>
            </div>

            <div className="space-y-4">
              {contacts.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    className={`relative bg-white border rounded-2xl p-6 transition-all duration-300 cursor-pointer overflow-hidden ${
                      selectedContact === index 
                        ? 'border-gray-900 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                    onClick={() => setSelectedContact(index)}
                  >
                    {/* Selection indicator */}
                    {selectedContact === index && (
                      <motion.div 
                        className="absolute top-4 right-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                          <FaCheck className="text-white text-sm" />
                        </div>
                      </motion.div>
                    )}

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          selectedContact === index 
                            ? 'bg-gray-900 text-white' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          <Icon className="text-lg" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {contact.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {contact.description}
                        </p>

                        <AnimatePresence>
                          {selectedContact === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="pt-4 border-t border-gray-100"
                            >
                              <div className="space-y-3">
                                <a 
                                  href={`mailto:${contact.email}`}
                                  className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors group"
                                >
                                  <FaEnvelope className="text-gray-500 flex-shrink-0" />
                                  <span className="text-sm truncate">{contact.email}</span>
                                  <motion.div
                                    className="ml-auto"
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                  >
                                    <FaArrowRight className="text-xs text-gray-500 group-hover:text-gray-900" />
                                  </motion.div>
                                </a>
                                
                                <a 
                                  href={`tel:${contact.phone.replace(/\D/g, '')}`}
                                  className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors group"
                                >
                                  <FaPhone className="text-gray-500 flex-shrink-0" />
                                  <span className="text-sm">{contact.phone}</span>
                                  <motion.div
                                    className="ml-auto"
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                  >
                                    <FaArrowRight className="text-xs text-gray-500 group-hover:text-gray-900" />
                                  </motion.div>
                                </a>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                  <FaClock className="text-gray-700" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Response Time</h4>
                  <p className="text-gray-600 text-sm">
                    We respond to all inquiries within 24 hours
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-2 h-2 bg-gray-900 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-500">Currently online</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center"
                  >
                    <FaEnvelope className="text-gray-700" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Send a Message
                    </h3>
                    <p className="text-gray-600 mt-1">
                      We will get back to you as soon as possible
                    </p>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6"
                    >
                      <FaCheck className="text-2xl text-gray-900" />
                    </motion.div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      Message Sent!
                    </h4>
                    <p className="text-gray-600">
                      Thank you for reaching out. We will respond shortly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Name Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="group"
                    >
                      <label className="block text-sm font-medium text-gray-900 mb-2" htmlFor="name">
                        Your Name
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <FaUser className="text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none transition-all duration-300 bg-white text-gray-900"
                          placeholder="Enter your name"
                        />
                      </div>
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="group"
                    >
                      <label className="block text-sm font-medium text-gray-900 mb-2" htmlFor="email">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <FaEnvelope className="text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none transition-all duration-300 bg-white text-gray-900"
                          placeholder="Enter your email"
                        />
                      </div>
                    </motion.div>

                    {/* Subject Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="group"
                    >
                      <label className="block text-sm font-medium text-gray-900 mb-2" htmlFor="subject">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none transition-all duration-300 bg-white text-gray-900"
                        placeholder="What is this regarding?"
                      />
                    </motion.div>

                    {/* Message Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="group"
                    >
                      <label className="block text-sm font-medium text-gray-900 mb-2" htmlFor="message">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none transition-all duration-300 bg-white text-gray-900 resize-none"
                        placeholder="Type your message here..."
                      />
                      <div className="mt-2 flex justify-between items-center">
                        <p className="text-xs text-gray-500">
                          Please provide as much detail as possible
                        </p>
                        <span className="text-xs text-gray-500">
                          {formData.message.length}/1000
                        </span>
                      </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="pt-4"
                    >
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 px-6 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-lg"
                      >
                        <span className="flex items-center">
                          <FaPaperPlane className="mr-3 text-sm" />
                          Send Message
                          <motion.div
                            className="ml-3"
                            initial={{ x: -10, opacity: 0 }}
                            whileHover={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FaArrowRight className="text-xs" />
                          </motion.div>
                        </span>
                      </motion.button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>

              <motion.div 
                className="mt-8 pt-6 border-t border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-start gap-3">
                  <FaCheck className="text-gray-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    Your information is secure and will only be used to respond to your inquiry.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Contact Information */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Other Ways to Reach Us
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sometimes a direct approach works best
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-gray-700" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">
                  Visit Our Campus
                </h4>
              </div>
              <div className="space-y-4">
                {contacts.map((contact, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-2 h-2 rounded-full ${index === selectedContact ? 'bg-gray-900' : 'bg-gray-300'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{contact.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{contact.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hours Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <FaClock className="text-gray-700" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">
                  Office Hours
                </h4>
              </div>
              <div className="space-y-3">
                {[
                  { day: "Monday–Thursday", time: "8:30 AM – 6:00 PM" },
                  { day: "Friday", time: "8:30 AM – 5:00 PM" },
                  { day: "Saturday", time: "9:00 AM – 2:00 PM" },
                  { day: "Sunday", time: "By Appointment" }
                ].map((schedule, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm text-gray-700">{schedule.day}</span>
                    <span className={`text-sm font-medium ${index === 3 ? 'text-gray-900' : 'text-gray-600'}`}>
                      {schedule.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;