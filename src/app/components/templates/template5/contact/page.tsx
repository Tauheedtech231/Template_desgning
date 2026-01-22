"use client";
/* eslint-disable */

import { useState, useRef } from "react";
import { 
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiUser,
  FiChevronRight,
  FiCheck,
  FiArrowLeft,
  FiClock,
 
} from "react-icons/fi";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Define proper types
interface ContactCard {
  id: number;
  title: string;
  front: {
    icon: any;
    mainInfo: string;
    description: string;
    actionText: string;
  };
  back: {
    type: "email" | "phone" | "location";
    email?: string;
    phone?: string;
    address?: string;
    department: string;
    responseTime: string;
    bestFor: string[];
    details: string;
  };
}

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  // Only 3 cards as requested
  const contactCards: ContactCard[] = [
    {
      id: 1,
      title: "Email Support",
      front: {
        icon: FiMail,
        mainInfo: "contact@college.edu",
        description: "For general inquiries and support",
        actionText: "View Email Details"
      },
      back: {
        type: "email",
        email: "contact@college.edu",
        department: "General Support",
        responseTime: "24 hours",
        bestFor: [
          "General questions",
          "Document submissions",
          "Information requests"
        ],
        details: "Our support team responds to all emails within 24 business hours. Include relevant details for faster assistance."
      }
    },
    {
      id: 2,
      title: "Phone Support",
      front: {
        icon: FiPhone,
        mainInfo: "+1 (555) 123-4567",
        description: "For immediate assistance",
        actionText: "View Call Details"
      },
      back: {
        type: "phone",
        phone: "+1 (555) 123-4567",
        department: "Student Services",
        responseTime: "Immediate",
        bestFor: [
          "Urgent inquiries",
          "Technical support",
          "Live assistance"
        ],
        details: "Available Monday-Friday, 9am-5pm. Press 1 for admissions, 2 for academic support, 3 for student services."
      }
    },
    {
      id: 3,
      title: "Campus Visit",
      front: {
        icon: FiMapPin,
        mainInfo: "123 Education Street",
        description: "Visit our main campus",
        actionText: "View Location Details"
      },
      back: {
        type: "location",
        address: "123 Education Street, Academic District",
        department: "Campus Administration",
        responseTime: "By appointment",
        bestFor: [
          "In-person meetings",
          "Campus tours",
          "Document drop-off"
        ],
        details: "Main campus location. Free parking available. Wheelchair accessible. Public transit accessible via multiple routes."
      }
    }
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
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleCardFlip = (id: number) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

  const handleSelectCard = (id: number) => {
    setSelectedCard(id);
    const card = contactCards.find(c => c.id === id);
    if (card?.back.type === "email") {
      setFormData(prev => ({
        ...prev,
        email: card.back.email || "",
        subject: `Inquiry for ${card.back.department}`
      }));
    }
  };

  // Get selected card details for the info list
  const selectedCardDetails = selectedCard ? contactCards.find(c => c.id === selectedCard) : null;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "#EADBC8"
      }}
    >
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/contact-5.jpg" 
            alt="College campus"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20"></div>
        
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-8 bg-white/50" />
                <span className="text-sm text-white/80 tracking-widest">
                  CONTACT US
                </span>
                <div className="h-px w-8 bg-white/50" />
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Get In Touch
              </h1>
              
              <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-xl">
                Choose your preferred contact method or fill out the form below.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        {/* Contact Cards Section - Only 3 cards */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#A17A74" }}>
              Contact Methods
            </h2>
            <p className="text-lg" style={{ color: "#3B3B3B" }}>
              Click on any card to see complete details
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {contactCards.map((card) => {
              const FrontIcon = card.front.icon;
              
              return (
                <div key={card.id} className="relative h-[280px] perspective-1000">
                  <div 
                    className={`absolute inset-0 transition-all duration-500 ${
                      flippedCard === card.id ? 'rotate-y-180' : ''
                    }`}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: flippedCard === card.id ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                  >
                    {/* Front of Card */}
                    <motion.div 
                      className="absolute inset-0 bg-white rounded-2xl p-6 backface-hidden overflow-hidden cursor-pointer border border-[#D9C9BB] shadow-sm"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden'
                      }}
                      whileHover={{ y: -5 }}
                      onClick={() => handleCardFlip(card.id)}
                    >
                      <div className="relative z-10 h-full flex flex-col items-center justify-between">
                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#F7F2EE] border border-[#D9C9BB] mb-4">
                          <FrontIcon className="text-xl" style={{ color: "#A17A74" }} />
                        </div>
                        
                        <div className="text-center mb-4">
                          <h3 className="text-lg font-bold mb-2" style={{ color: "#A17A74" }}>
                            {card.title}
                          </h3>
                          <p className="text-lg font-medium mb-2" style={{ color: "#A17A74" }}>
                            {card.front.mainInfo}
                          </p>
                          <p className="text-sm" style={{ color: "#3B3B3B" }}>
                            {card.front.description}
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <button className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: "#C99789" }}>
                            <span>{card.front.actionText}</span>
                            <FiChevronRight className="text-xs" />
                          </button>
                        </div>
                      </div>
                    </motion.div>

                    {/* Back of Card - Now shows complete info in list format */}
                    <motion.div 
                      className="absolute inset-0 bg-white rounded-2xl p-6 overflow-hidden border border-[#A17A74] shadow-sm"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        color: "#3B3B3B"
                      }}
                    >
                      <button 
                        onClick={() => setFlippedCard(null)}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white border border-[#D9C9BB] flex items-center justify-center hover:bg-[#F7F2EE] transition-colors z-10"
                      >
                        <FiArrowLeft className="text-sm" style={{ color: "#A17A74" }} />
                      </button>
                      
                      <div className="h-full overflow-y-auto pt-8">
                        <h3 className="text-lg font-bold mb-6 text-center" style={{ color: "#A17A74" }}>
                          Complete Details
                        </h3>
                        
                        <div className="space-y-4">
                          {/* Main Info */}
                          <div>
                            <h4 className="text-sm font-medium mb-2" style={{ color: "#A17A74" }}>Contact Information</h4>
                            <ul className="space-y-2">
                              {card.back.type === "email" && (
                                <li className="flex items-center gap-3">
                                  <FiMail className="text-[#C99789] flex-shrink-0" />
                                  <span>{card.back.email}</span>
                                </li>
                              )}
                              {card.back.type === "phone" && (
                                <li className="flex items-center gap-3">
                                  <FiPhone className="text-[#C99789] flex-shrink-0" />
                                  <span>{card.back.phone}</span>
                                </li>
                              )}
                              {card.back.type === "location" && (
                                <li className="flex items-start gap-3">
                                  <FiMapPin className="text-[#C99789] flex-shrink-0 mt-0.5" />
                                  <span>{card.back.address}</span>
                                </li>
                              )}
                              <li className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#C99789" }}></div>
                                <span>Department: {card.back.department}</span>
                              </li>
                            </ul>
                          </div>

                          {/* Response Time */}
                          <div>
                            <h4 className="text-sm font-medium mb-2" style={{ color: "#A17A74" }}>Response Time</h4>
                            <div className="flex items-center gap-2">
                              <FiClock className="text-[#C99789]" />
                              <span>{card.back.responseTime}</span>
                            </div>
                          </div>

                          {/* Best For - List */}
                          <div>
                            <h4 className="text-sm font-medium mb-2" style={{ color: "#A17A74" }}>Best Used For</h4>
                            <ul className="space-y-1">
                              {card.back.bestFor.map((item, idx) => (
                                <li key={idx} className="text-sm flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#C99789" }}></div>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Additional Details */}
                          <div>
                            <h4 className="text-sm font-medium mb-2" style={{ color: "#A17A74" }}>Additional Information</h4>
                            <p className="text-sm leading-relaxed">{card.back.details}</p>
                          </div>

                          {/* Action Button for email cards */}
                          {card.back.type === "email" && (
                            <button 
                              onClick={() => handleSelectCard(card.id)}
                              className="w-full py-3 text-sm font-medium rounded-xl transition-colors mt-4"
                              style={{
                                backgroundColor: selectedCard === card.id ? "#A17A74" : "#C99789",
                                color: "#FFFFFF"
                              }}
                            >
                              {selectedCard === card.id ? "✓ Selected for Form" : "Use This Email for Form"}
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Card Info Section - Now shows as a list on the side */}
        <div className="max-w-6xl mx-auto mb-12">
          <AnimatePresence>
            {selectedCardDetails && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-2xl p-8 border border-[#D9C9BB] shadow-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <FiCheck className="text-xl" style={{ color: "#A17A74" }} />
                  <h3 className="text-xl font-bold" style={{ color: "#A17A74" }}>
                    Selected Contact Method
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Info List */}
                  <div>
                    <h4 className="text-lg font-medium mb-4" style={{ color: "#3B3B3B" }}>Contact Details</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: "#C99789" }}></div>
                        <div>
                          <div className="text-sm font-medium" style={{ color: "#A17A74" }}>Method</div>
                          <div style={{ color: "#3B3B3B" }}>{selectedCardDetails.title}</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: "#C99789" }}></div>
                        <div>
                          <div className="text-sm font-medium" style={{ color: "#A17A74" }}>Department</div>
                          <div style={{ color: "#3B3B3B" }}>{selectedCardDetails.back.department}</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: "#C99789" }}></div>
                        <div>
                          <div className="text-sm font-medium" style={{ color: "#A17A74" }}>Response Time</div>
                          <div style={{ color: "#3B3B3B" }}>{selectedCardDetails.back.responseTime}</div>
                        </div>
                      </li>
                      {selectedCardDetails.back.email && (
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: "#C99789" }}></div>
                          <div>
                            <div className="text-sm font-medium" style={{ color: "#A17A74" }}>Email</div>
                            <div style={{ color: "#3B3B3B" }}>{selectedCardDetails.back.email}</div>
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  {/* Best For List */}
                  <div>
                    <h4 className="text-lg font-medium mb-4" style={{ color: "#3B3B3B" }}>Best For</h4>
                    <ul className="space-y-2">
                      {selectedCardDetails.back.bestFor.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#C99789" }}></div>
                          <span style={{ color: "#3B3B3B" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6 p-4 bg-[#F7F2EE] rounded-xl border border-[#D9C9BB]">
                      <p className="text-sm" style={{ color: "#3B3B3B" }}>
                        This contact method has been selected for your form submission.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#D9C9BB]">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4" style={{ color: "#A17A74" }}>
                Send Us a Message
              </h2>
              <p className="text-lg" style={{ color: "#3B3B3B" }}>
                Fill out the form below and we will get back to you soon
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="name" style={{ color: "#3B3B3B" }}>
                  Your Name
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FiUser className="text-sm" style={{ color: "#C99789" }} />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white border border-[#D9C9BB] rounded-xl focus:border-[#A17A74] focus:ring-0 focus:outline-none transition-all duration-300"
                    style={{ color: "#3B3B3B" }}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="email" style={{ color: "#3B3B3B" }}>
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FiMail className="text-sm" style={{ color: "#C99789" }} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white border border-[#D9C9BB] rounded-xl focus:border-[#A17A74] focus:ring-0 focus:outline-none transition-all duration-300"
                    style={{ color: "#3B3B3B" }}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="subject" style={{ color: "#3B3B3B" }}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-[#D9C9BB] rounded-xl focus:border-[#A17A74] focus:ring-0 focus:outline-none transition-all duration-300"
                  style={{ color: "#3B3B3B" }}
                  placeholder="What would you like to discuss?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="message" style={{ color: "#3B3B3B" }}>
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-[#D9C9BB] rounded-xl focus:border-[#A17A74] focus:ring-0 focus:outline-none transition-all duration-300 resize-none"
                  style={{ color: "#3B3B3B" }}
                  placeholder="Please share details about your inquiry..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 font-medium rounded-xl transition-all duration-300 flex items-center justify-center ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
                  }`}
                  style={{
                    backgroundColor: "#C99789",
                    color: "#FFFFFF"
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = "#A17A74";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = "#C99789";
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-3">Sending...</span>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </>
                  ) : (
                    <>
                      <FiSend className="mr-3 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>

              {/* Privacy Notice */}
              <div className="text-center pt-4">
                <p className="text-xs" style={{ color: "#3B3B3B" }}>
                  Your information is secure. We respect your privacy and never share contact details.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-sm" style={{ color: "#3B3B3B" }}>
            We are here to help. Your success is our priority.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;