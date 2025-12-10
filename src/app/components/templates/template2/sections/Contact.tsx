"use client";

import { Mail, MapPin, Phone, Linkedin, Instagram, Facebook } from "lucide-react";

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
const socialLinks = [
  { icon: <Linkedin className="w-5 h-5" />, url: "https://www.linkedin.com/in/mansol-hab-traning-services-b7b4b1296/" },
  { icon: <Instagram className="w-5 h-5" />, url: "https://www.instagram.com/mansol.hab.training.services/?next=%2F&hl=en" },
  { icon: <Facebook className="w-5 h-5" />, url: "https://www.facebook.com/people/Mansol-Hab/61567152315949/" },
];
const ContactSection = () => {
  return (
    <section id="contact" className="relative bg-[#111] text-white py-16 md:py-24 overflow-hidden">
      {/* Background World Map */}
      <div
        className="absolute inset-0 opacity-5 bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.imgur.com/yd7Tb0X.png')" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            Contact <span className="text-red-500">Us</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get in touch with our specialized departments
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {contacts.map((contact, index) => (
            <div 
              key={index} 
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 md:p-8 hover:border-gray-700 transition-all duration-300"
            >
              {/* Contact Title */}
              <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center text-white">
                {contact.title}
              </h3>

              {/* Contact Details Container */}
              <div className="space-y-6 md:space-y-8">
                {/* Email Section */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                    <Mail className="text-white w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm mb-1">Email Us</p>
                    <a 
                      href={`mailto:${contact.email}`}
                      className="font-medium text-white hover:text-red-400 transition-colors break-words"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                {/* Location Section */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                    <MapPin className="text-white w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm mb-1">Location</p>
                    <p className="font-medium text-white leading-relaxed">
                      {contact.location}
                    </p>
                  </div>
                </div>

                {/* Phone Section */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                    <Phone className="text-white w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm mb-1">Call Us</p>
                    <a 
                      href={`tel:${contact.phone.replace(/\D/g, '')}`}
                      className="font-medium text-white hover:text-red-400 transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-16 md:mt-20 pt-8 border-t border-gray-700 text-center space-y-4">
          <p className="text-gray-400 text-sm mb-2">
            Operating Hours: Monday - Friday, 9:00 AM - 6:00 PM
          </p>
          <div className="flex justify-center gap-6">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-2">
            &copy; {new Date().getFullYear()} Mansol Group. All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;