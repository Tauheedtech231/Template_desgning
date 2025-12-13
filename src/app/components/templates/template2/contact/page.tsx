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
  FaBuilding,
  FaChevronRight,
  FaClock,
  FaWhatsapp
} from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const contacts = [
  {
    title: "Mansol Manpower Solutions",
    email: "info@mansol.com.pk",
    location: "Office No. 123, 1st Floor, Divine Mega-2, New Airport Road, Opposite Honda Point, Lahore",
    phone: "+92 (423) 5700362",
    whatsapp: "+92 300 1234567"
  },
  {
    title: "Mansol Technical Training Institute",
    email: "mtti@mansol.com.pk",
    location: "E-210, Gulshan Ali Colony, New Airport Road, Lahore",
    phone: "+92 (423) 7169399",
    whatsapp: "+92 300 1234567"
  },
  {
    title: "Mansol Engineering Services",
    email: "mes@mansol.com.pk",
    location: "Office No. 122, 1st Floor, Divine Mega-2, New Airport Road, Opposite Honda Point, Lahore",
    phone: "+92 (423) 5700362",
    whatsapp: "+92 300 1234567"
  },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [selectedContact, setSelectedContact] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(
        ".section-title",
        { 
          y: -40, 
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      // Contact cards animation
      gsap.fromTo(
        ".contact-card",
        { 
          y: 40, 
          opacity: 0,
          rotationX: -15
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Form animation
      gsap.fromTo(
        ".contact-form",
        { 
          x: 40, 
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 85%",
          },
        }
      );

      // Form elements animation
      gsap.fromTo(
        ".form-element",
        { 
          y: 20, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%",
          },
        }
      );

      // Icon animations
      gsap.fromTo(
        ".contact-icon",
        { 
          scale: 0, 
          rotation: -180 
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Hover effects for contact cards
      document.querySelectorAll(".contact-card").forEach((card, index) => {
        card.addEventListener("mouseenter", () => {
          if (index !== selectedContact) {
            gsap.to(card, {
              y: -5,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out",
              boxShadow: "0 10px 30px rgba(6, 182, 212, 0.1)",
            });
          }
        });

        card.addEventListener("mouseleave", () => {
          if (index !== selectedContact) {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
              boxShadow: "none",
            });
          }
        });
      });

      // Form input focus animations
      document.querySelectorAll("input, textarea").forEach((input) => {
        input.addEventListener("focus", () => {
          gsap.to(input, {
            borderColor: "#06B6D4",
            boxShadow: "0 0 0 3px rgba(6, 182, 212, 0.1)",
            duration: 0.3,
            ease: "power2.out",
          });
        });

        input.addEventListener("blur", () => {
          gsap.to(input, {
            borderColor: "#E5E5E5",
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedContact]);

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
      className="relative py-16 bg-[#F8FAFC] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-[#06B6D4]/5 to-[#14B8A6]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-[#06B6D4]/5 to-transparent rounded-full blur-3xl"></div>
        
        {/* Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(90deg, transparent 95%, #06B6D4 100%),
                             linear-gradient(180deg, transparent 95%, #06B6D4 100%)`,
            backgroundSize: '50px 50px',
          }}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 section-title">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#06B6D4]/10 rounded-full mb-5">
            <FaEnvelope className="text-[#06B6D4] text-sm" />
            <span className="text-[#06B6D4] text-xs font-medium uppercase tracking-wider">
              Get in Touch
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-5">
            Contact{" "}
            <span className="relative">
              <span className="text-[#06B6D4]">Mansol</span>
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent"></div>
            </span>
          </h2>
          
          <p className="text-base text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Connect with our specialized departments for inquiries, partnerships, or any assistance you may need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#111827] mb-6">
              Our Departments
            </h3>
            
            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedContact(index)}
                  className={`contact-card cursor-pointer bg-white rounded-xl border p-5 transition-all duration-300 ${
                    selectedContact === index 
                      ? 'border-[#06B6D4] shadow-lg shadow-[#06B6D4]/10' 
                      : 'border-gray-200 hover:border-[#06B6D4]/50'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="contact-icon flex-shrink-0">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        selectedContact === index 
                          ? 'bg-[#06B6D4] text-white' 
                          : 'bg-[#06B6D4]/10 text-[#06B6D4]'
                      }`}>
                        <FaBuilding className="text-sm" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-[#111827] mb-1">
                        {contact.title}
                      </h4>
                      <div className={`w-8 h-0.5 ${
                        selectedContact === index ? 'bg-[#06B6D4]' : 'bg-gray-300'
                      }`}></div>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-3 ml-13">
                    {/* Email */}
                    <div className="flex items-center group">
                      <div className="w-6 h-6 rounded-full bg-[#06B6D4]/10 flex items-center justify-center mr-2 flex-shrink-0">
                        <FaEnvelope className="text-[#06B6D4] text-xs" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <a 
                          href={`mailto:${contact.email}`}
                          className="text-sm text-[#475569] hover:text-[#06B6D4] transition-colors truncate block"
                        >
                          {contact.email}
                        </a>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center group">
                      <div className="w-6 h-6 rounded-full bg-[#06B6D4]/10 flex items-center justify-center mr-2 flex-shrink-0">
                        <FaPhone className="text-[#06B6D4] text-xs" />
                      </div>
                      <div className="flex-1">
                        <a 
                          href={`tel:${contact.phone.replace(/\D/g, '')}`}
                          className="text-sm text-[#475569] hover:text-[#06B6D4] transition-colors"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-center group">
                      <div className="w-6 h-6 rounded-full bg-[#06B6D4]/10 flex items-center justify-center mr-2 flex-shrink-0">
                        <FaWhatsapp className="text-[#06B6D4] text-xs" />
                      </div>
                      <div className="flex-1">
                        <a 
                          href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#475569] hover:text-[#06B6D4] transition-colors"
                        >
                          {contact.whatsapp}
                        </a>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start group">
                      <div className="w-6 h-6 rounded-full bg-[#06B6D4]/10 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        <FaMapMarkerAlt className="text-[#06B6D4] text-xs" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-[#475569] leading-relaxed">
                          {contact.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Response Times */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 mt-6">
              <h4 className="text-base font-semibold text-[#111827] mb-4">
                Response Times
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 border border-gray-100 rounded-lg bg-[#F1F5F9]">
                  <div className="w-8 h-8 rounded-full bg-[#06B6D4]/10 flex items-center justify-center mx-auto mb-2">
                    <FaEnvelope className="text-[#06B6D4] text-xs" />
                  </div>
                  <p className="text-xs text-[#475569] mb-1">Email Response</p>
                  <p className="text-sm font-semibold text-[#111827]">Within 24 Hours</p>
                </div>
                <div className="text-center p-3 border border-gray-100 rounded-lg bg-[#F1F5F9]">
                  <div className="w-8 h-8 rounded-full bg-[#06B6D4]/10 flex items-center justify-center mx-auto mb-2">
                    <FaPhone className="text-[#06B6D4] text-xs" />
                  </div>
                  <p className="text-xs text-[#475569] mb-1">Phone Response</p>
                  <p className="text-sm font-semibold text-[#111827]">Within 2 Hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="contact-form">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
              <div className="mb-8 form-element">
                <h2 className="text-xl md:text-2xl font-bold text-[#111827] mb-3">
                  Send Us a Message
                </h2>
                <p className="text-sm text-[#475569]">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="form-element">
                  <label className="block text-[#475569] text-xs font-medium mb-1.5 uppercase tracking-wider" htmlFor="name">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <FaUser className="text-gray-400 text-sm" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/10 focus:outline-none transition-all duration-300 text-sm bg-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="form-element">
                  <label className="block text-[#475569] text-xs font-medium mb-1.5 uppercase tracking-wider" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <FaEnvelope className="text-gray-400 text-sm" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/10 focus:outline-none transition-all duration-300 text-sm bg-white"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div className="form-element">
                  <label className="block text-[#475569] text-xs font-medium mb-1.5 uppercase tracking-wider" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/10 focus:outline-none transition-all duration-300 text-sm bg-white"
                    placeholder="What is this regarding?"
                  />
                </div>

                {/* Message Field */}
                <div className="form-element">
                  <label className="block text-[#475569] text-xs font-medium mb-1.5 uppercase tracking-wider" htmlFor="message">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/10 focus:outline-none transition-all duration-300 text-sm bg-white resize-none"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <div className="form-element pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-gradient-to-r from-[#06B6D4] to-[#14B8A6] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center text-sm"
                  >
                    <FaPaperPlane className="mr-2 text-sm" />
                    Send Message
                  </button>
                </div>

                {/* Privacy Notice */}
                <div className="form-element">
                  <p className="text-gray-500 text-xs text-center leading-relaxed">
                    By submitting this form, you agree to our{" "}
                    <a href="#" className="text-[#06B6D4] hover:underline font-medium">
                      Privacy Policy
                    </a>
                    . We will never share your information with third parties.
                  </p>
                </div>
              </form>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-gray-100 form-element">
                <div className="text-center">
                  <p className="text-sm text-[#475569] mb-4">
                    Connect with us on social media
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="https://www.linkedin.com/in/mansol-hab-traning-services-b7b4b1296/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-icon w-10 h-10 rounded-full bg-[#06B6D4]/10 flex items-center justify-center text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white transition-colors"
                    >
                      <FaLinkedin className="text-sm" />
                    </a>
                    <a
                      href="https://www.instagram.com/mansol.hab.training.services/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-icon w-10 h-10 rounded-full bg-[#06B6D4]/10 flex items-center justify-center text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white transition-colors"
                    >
                      <FaInstagram className="text-sm" />
                    </a>
                    <a
                      href="https://www.facebook.com/people/Mansol-Hab/61567152315949/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-icon w-10 h-10 rounded-full bg-[#06B6D4]/10 flex items-center justify-center text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white transition-colors"
                    >
                      <FaFacebook className="text-sm" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map/Business Hours Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-[#111827] mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#06B6D4]" />
              Our Locations
            </h4>
            <div className="space-y-3">
              {contacts.map((contact, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#06B6D4] mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-[#111827]">{contact.title}</p>
                    <p className="text-xs text-[#475569]">{contact.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-[#111827] mb-4 flex items-center gap-2">
              <FaClock className="text-[#06B6D4]" />
              Business Hours
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-[#475569]">Monday - Friday</span>
                <span className="text-sm font-medium text-[#111827]">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#475569]">Saturday</span>
                <span className="text-sm font-medium text-[#111827]">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#475569]">Sunday</span>
                <span className="text-sm font-medium text-[#111827]">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;