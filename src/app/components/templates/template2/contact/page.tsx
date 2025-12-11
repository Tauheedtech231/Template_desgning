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
  FaChevronRight
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
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left side animations
      gsap.fromTo(
        ".contact-info",
        { 
          x: -60, 
          opacity: 0,
          scale: 0.95
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      // Right side animations
      gsap.fromTo(
        ".contact-form",
        { 
          x: 60, 
          opacity: 0,
          scale: 0.95
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      // Contact card stagger animation
      gsap.fromTo(
        ".contact-card",
        { 
          y: 30, 
          opacity: 0,
          rotationX: -10
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
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
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%",
          },
        }
      );

      // Icon animations with bounce
      gsap.fromTo(
        ".contact-icon",
        { 
          scale: 0, 
          rotation: -180 
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Contact card hover effect
      document.querySelectorAll(".contact-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -8,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Form input focus animations
      document.querySelectorAll("input, textarea").forEach((input) => {
        input.addEventListener("focus", () => {
          gsap.to(input, {
            borderColor: "#2563EB",
            boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
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
  }, []);

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
      className="relative py-12 lg:py-16 mt-8 lg:mt-12"
    >
      {/* Split Layout Container */}
      <div className="flex flex-col lg:flex-row min-h-[70vh]">
        {/* Left Side - Contact Info (Black Background) */}
        <div className="lg:w-1/2 bg-black text-white p-5 lg:p-10">
          <div className="h-full flex flex-col justify-between contact-info">
            {/* Section Header - Reduced font size */}
            <div className="mb-6">
              <div className="mb-4">
                <span className="text-[#2563EB] text-xs font-light tracking-wider uppercase">
                  Get in Touch
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                Contact Us
              </h1>
              
              <p className="text-[#CCCCCC] text-sm mb-6 max-w-lg leading-relaxed">
                Connect with our specialized departments for inquiries, partnerships, or any assistance you may need.
              </p>
            </div>

            {/* Contact Cards - Compact design */}
            <div className="space-y-4 mb-6">
              {contacts.map((contact, index) => (
                <div 
                  key={index} 
                  className="contact-card p-4 border border-white/10 rounded-xl hover:border-[#2563EB]/40 transition-all duration-300 bg-black/50"
                >
                  <div className="flex items-start mb-3">
                    <div className="contact-icon mr-3">
                      <div className="w-8 h-8 rounded-full border-2 border-[#2563EB] flex items-center justify-center bg-black">
                        <FaBuilding className="text-[#2563EB] text-sm" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white mb-1">
                        {contact.title}
                      </h3>
                      <div className="w-10 h-0.5 bg-[#2563EB] mb-2"></div>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-3">
                    {/* Email */}
                    <div className="flex items-center group">
                      <div className="contact-icon mr-2">
                        <div className="w-6 h-6 rounded-full border border-[#2563EB] flex items-center justify-center bg-black">
                          <FaEnvelope className="text-[#2563EB] text-xs" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-[#CCCCCC] text-xs mb-0.5">Email</p>
                        <a 
                          href={`mailto:${contact.email}`}
                          className="text-white hover:text-[#2563EB] transition-colors text-xs flex items-center"
                        >
                          {contact.email}
                          <FaChevronRight className="ml-1 text-[#2563EB] text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
                        </a>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start group">
                      <div className="contact-icon mr-2 mt-0.5">
                        <div className="w-6 h-6 rounded-full border border-[#2563EB] flex items-center justify-center bg-black">
                          <FaMapMarkerAlt className="text-[#2563EB] text-xs" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-[#CCCCCC] text-xs mb-0.5">Location</p>
                        <p className="text-white text-xs leading-relaxed">
                          {contact.location}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center group">
                      <div className="contact-icon mr-2">
                        <div className="w-6 h-6 rounded-full border border-[#2563EB] flex items-center justify-center bg-black">
                          <FaPhone className="text-[#2563EB] text-xs" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-[#CCCCCC] text-xs mb-0.5">Phone</p>
                        <a 
                          href={`tel:${contact.phone.replace(/\D/g, '')}`}
                          className="text-white hover:text-[#2563EB] transition-colors text-xs flex items-center"
                        >
                          {contact.phone}
                          <FaChevronRight className="ml-1 text-[#2563EB] text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Response Time Info */}
            <div className="pt-4 border-t border-white/10 mt-auto">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 border border-white/10 rounded-lg bg-black/30">
                  <div className="w-6 h-6 rounded-full bg-[#2563EB]/20 flex items-center justify-center mx-auto mb-1">
                    <FaEnvelope className="text-[#2563EB] text-xs" />
                  </div>
                  <p className="text-[#CCCCCC] text-xs mb-0.5">Email Response</p>
                  <p className="text-white text-xs font-medium">24 Hours</p>
                </div>
                <div className="text-center p-2 border border-white/10 rounded-lg bg-black/30">
                  <div className="w-6 h-6 rounded-full bg-[#2563EB]/20 flex items-center justify-center mx-auto mb-1">
                    <FaPhone className="text-[#2563EB] text-xs" />
                  </div>
                  <p className="text-[#CCCCCC] text-xs mb-0.5">Phone Response</p>
                  <p className="text-white text-xs font-medium">2 Hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form (White Background) */}
        <div className="lg:w-1/2 bg-white p-5 lg:p-10 flex items-start justify-center">
          <div className="w-full max-w-lg contact-form mt-8 lg:mt-12">
            <div className="mb-8 form-element">
              <h2 className="text-xl md:text-2xl font-bold text-black mb-2 leading-tight">
                Send Us a Message
              </h2>
              <p className="text-gray-600 text-sm">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="form-element">
                <label className="block text-gray-700 text-xs font-medium mb-1.5 uppercase tracking-wider" htmlFor="name">
                  Your Name
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <FaUser className="text-gray-400 text-xs" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-9 pr-3 py-2.5 border border-[#E5E5E5] rounded-lg focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 focus:outline-none transition-all duration-300 text-sm"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="form-element">
                <label className="block text-gray-700 text-xs font-medium mb-1.5 uppercase tracking-wider" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <FaEnvelope className="text-gray-400 text-xs" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-9 pr-3 py-2.5 border border-[#E5E5E5] rounded-lg focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 focus:outline-none transition-all duration-300 text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div className="form-element">
                <label className="block text-gray-700 text-xs font-medium mb-1.5 uppercase tracking-wider" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 border border-[#E5E5E5] rounded-lg focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 focus:outline-none transition-all duration-300 text-sm"
                  placeholder="What is this regarding?"
                />
              </div>

              {/* Message Field */}
              <div className="form-element">
                <label className="block text-gray-700 text-xs font-medium mb-1.5 uppercase tracking-wider" htmlFor="message">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2.5 border border-[#E5E5E5] rounded-lg focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 focus:outline-none transition-all duration-300 text-sm resize-none"
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              {/* Submit Button */}
              <div className="form-element pt-4">
                <button
                  type="submit"
                  className="w-full py-2.5 px-5 bg-[#2563EB] text-white font-medium rounded-lg hover:bg-[#1d4ed8] transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg text-sm"
                >
                  <FaPaperPlane className="mr-2 text-xs" />
                  Send Message
                </button>
              </div>

              {/* Privacy Notice - Smaller font */}
              <div className="form-element">
                <p className="text-gray-500 text-xs text-center leading-relaxed">
                  By submitting this form, you agree to our{" "}
                  <a href="#" className="text-[#2563EB] hover:underline font-medium">
                    Privacy Policy
                  </a>
                  . We will never share your information with third parties.
                </p>
              </div>
            </form>

            {/* Quick Contact Info */}
            <div className="mt-8 pt-6 border-t border-gray-100 form-element">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-[#2563EB]/10 flex items-center justify-center mx-auto mb-1">
                      <FaEnvelope className="text-[#2563EB] text-xs" />
                    </div>
                    <p className="text-gray-600 text-xs mb-0.5">Email</p>
                    <p className="text-black text-xs font-medium">info@mansol.com.pk</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-[#2563EB]/10 flex items-center justify-center mx-auto mb-1">
                      <FaPhone className="text-[#2563EB] text-xs" />
                    </div>
                    <p className="text-gray-600 text-xs mb-0.5">Phone</p>
                    <p className="text-black text-xs font-medium">+92 (423) 5700362</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;