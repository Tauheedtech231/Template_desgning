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
  FaHeart,
  FaComment,
  FaHandshake,
  FaLeaf,
  FaCoffee,
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

  const contacts = [
    {
      title: "Admissions & Enrollment",
      email: "admissions@college.edu",
      location: "123 Education Street, Academic District",
      phone: "+1 (555) 123-4567",
      description: "Questions about joining our community, application process, or visiting campus",
      hours: "Weekdays 9–5, Saturday 10–2",
      icon: FaGraduationCap,
      personality: "Friendly and informative"
    },
    {
      title: "Academic Support",
      email: "academic@college.edu",
      location: "456 University Avenue, Campus Center",
      phone: "+1 (555) 987-6543",
      description: "For course information, program details, or academic advising",
      hours: "Weekdays 8–6, by appointment",
      icon: FaHandshake,
      personality: "Detailed and patient"
    },
    {
      title: "Student Services",
      email: "support@college.edu",
      location: "789 Student Union Building, Campus West",
      phone: "+1 (555) 456-7890",
      description: "General questions, campus life, or student support resources",
      hours: "Weekdays 8–7, Saturday 9–1",
      icon: FaUsers,
      personality: "Helpful and solution-oriented"
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
      className="relative text-[#333333] overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Hero Background Image with Overlay */}
      <div className="relative h-[400px] md:h-[500px] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/uploads/1413222992504f1b734a6/1928e537?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
          }}
        >
          <div className="absolute inset-0 bg-[#1E1E1E]/70"></div>
          
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(45deg, transparent 65%, #E86A58 100%)`,
            }}></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-6xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-px bg-white/40"></div>
                <div className="text-[13px] text-white/60 tracking-[0.3em] uppercase">
                  Let&apos;s Connect
                </div>
                <div className="w-12 h-px bg-white/40"></div>
              </div>
              
              <h1 
                className="text-[42px] md:text-[52px] font-medium text-white mb-6 leading-[1.1]"
                style={{ fontFamily: "'Merriweather', serif" }}
              >
                Questions are<br />
                <span className="text-[#E86A58] font-medium">the beginning</span>
              </h1>
              
              <div className="space-y-4">
                <p className="text-[18px] text-white/90 leading-[1.7] max-w-xl">
                  Every meaningful conversation starts with a question. We&apos;re here to listen, 
                  understand, and help you find clarity.
                </p>
                <div className="flex items-center gap-3 pt-4">
                  <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center">
                    <FaUsers className="text-white/70 text-xs" />
                  </div>
                  <p className="text-[14px] text-white/70">
                    Real people answer every inquiry
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#FAFAFA] to-transparent"></div>
      </div>

      <div className="relative bg-[#FAFAFA] -mt-20 pt-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E86A58]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E86A58]/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="mb-16 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <FaCoffee className="text-[#E86A58] text-sm" />
              <div className="text-[13px] text-[#9A9A9A] tracking-[0.1em]">
                NO ROBOTIC RESPONSES
              </div>
            </div>
            <p className="text-[18px] text-[#5A5A5A] leading-[1.7]">
              We believe in human conversations. Whether you&apos;re exploring options, 
              have specific questions, or just want to understand our approach better—we&apos;re ready to talk.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <div>
              <div className="sticky top-24">
                <div className="mb-12">
                  <h3 className="text-[24px] font-medium text-[#333333] mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                    Choose how you&apos;d like to connect
                  </h3>
                  <p className="text-[16px] text-[#5A5A5A] leading-[1.7]">
                    Different situations call for different approaches. 
                    Pick the method that feels most comfortable for your question.
                  </p>
                </div>
                
                <div className="space-y-6">
                  {contacts.map((contact, index) => {
                    const Icon = contact.icon;
                    return (
                      <div 
                        key={index}
                        onClick={() => setSelectedContact(index)}
                        className={`group relative bg-white border rounded-xl p-6 transition-all duration-300 cursor-pointer overflow-hidden ${
                          selectedContact === index 
                            ? 'border-[#E86A58] shadow-lg' 
                            : 'border-[#E8E8E8] hover:border-[#E86A58]/40 hover:shadow-md'
                        }`}
                      >
                        {selectedContact === index && (
                          <div className="absolute top-0 right-0 w-32 h-32 bg-[#E86A58]/5 rounded-full -translate-y-16 translate-x-16"></div>
                        )}
                        
                        <div className="relative flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              selectedContact === index 
                                ? 'bg-[#E86A58] text-white transform scale-110' 
                                : 'bg-[#FAFAFA] text-[#333333] group-hover:bg-[#E86A58]/10'
                            }`}>
                              <Icon className="text-lg" />
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="text-[18px] font-medium text-[#333333] pr-4">
                                {contact.title}
                              </h4>
                              {selectedContact === index && (
                                <div className="flex-shrink-0">
                                  <div className="px-3 py-1 bg-[#E86A58]/10 text-[#E86A58] text-xs font-medium rounded-full">
                                    Selected
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <p className="text-[15px] text-[#5A5A5A] leading-[1.6] mb-4">
                              {contact.description}
                            </p>
                            
                            <div className="flex items-center gap-2 mb-4">
                              <div className="flex items-center gap-1">
                                {[...Array(3)].map((_, i) => (
                                  <div 
                                    key={i} 
                                    className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-[#E86A58]' : 'bg-[#E8E8E8]'}`}
                                  ></div>
                                ))}
                              </div>
                              <span className="text-[13px] text-[#9A9A9A]">{contact.personality}</span>
                            </div>

                            <div className={`space-y-3 transition-all duration-500 ${
                              selectedContact === index ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'
                            }`}>
                              <div className="pt-4 border-t border-[#F0F0F0]">
                                <div className="space-y-3">
                                  <a 
                                    href={`mailto:${contact.email}`}
                                    className="flex items-center gap-3 text-[#333333] hover:text-[#E86A58] transition-colors group/item"
                                  >
                                    <FaEnvelope className="text-[#9A9A9A] text-sm flex-shrink-0" />
                                    <span className="text-[15px] truncate">{contact.email}</span>
                                    <FaArrowRight className="text-xs text-[#E86A58] opacity-0 group-hover/item:opacity-100 transition-opacity ml-auto" />
                                  </a>
                                  
                                  <a 
                                    href={`tel:${contact.phone.replace(/\D/g, '')}`}
                                    className="flex items-center gap-3 text-[#333333] hover:text-[#E86A58] transition-colors group/item"
                                  >
                                    <FaPhone className="text-[#9A9A9A] text-sm flex-shrink-0" />
                                    <span className="text-[15px]">{contact.phone}</span>
                                    <FaArrowRight className="text-xs text-[#E86A58] opacity-0 group-hover/item:opacity-100 transition-opacity ml-auto" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12 p-6 bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#E8E8E8] flex items-center justify-center flex-shrink-0">
                      <FaHeart className="text-[#E86A58] text-sm" />
                    </div>
                    <div>
                      <p className="text-[15px] text-[#5A5A5A] leading-[1.7]">
                        We take our time with every inquiry. Expect thoughtful responses, 
                        not automated replies. Your questions deserve genuine attention.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#E86A58] rounded-full animate-pulse"></div>
                        <span className="text-[13px] text-[#9A9A9A]">Average response time: 4 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-500">
                <div className="mb-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-[#FAFAFA] border border-[#E8E8E8] flex items-center justify-center">
                        <FaComment className="text-[#E86A58]" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#E86A58] rounded-full animate-ping opacity-75"></div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#E86A58] rounded-full"></div>
                    </div>
                    <div>
                      <h3 
                        className="text-[26px] font-medium text-[#333333] leading-tight"
                        style={{ fontFamily: "'Merriweather', serif" }}
                      >
                        Start a conversation
                      </h3>
                      <p className="text-[15px] text-[#9A9A9A] mt-1">
                        We read every word you write
                      </p>
                    </div>
                  </div>
                  
                  <div className="pl-16">
                    <p className="text-[16px] text-[#5A5A5A] leading-[1.7]">
                      Tell us what&apos;s on your mind. No question is too small, 
                      and no topic is off limits. We&apos;re here to help you find clarity.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="group">
                    <label className="block text-[15px] font-medium text-[#333333] mb-3" htmlFor="name">
                      Your name
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <FaUser className="text-[#9A9A9A] text-sm group-focus-within:text-[#E86A58] transition-colors" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-4 border border-[#E8E8E8] rounded-xl focus:border-[#E86A58] focus:ring-4 focus:ring-[#E86A58]/10 focus:outline-none transition-all duration-300 bg-white text-[#1E1E1E] text-[16px] placeholder:text-[#9A9A9A]"
                        placeholder="What should we call you?"
                      />
                    </div>
                    <p className="mt-2 text-[13px] text-[#9A9A9A] opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                      We use this to personalize our response
                    </p>
                  </div>

                  <div className="group">
                    <label className="block text-[15px] font-medium text-[#333333] mb-3" htmlFor="email">
                      Email address
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <FaEnvelope className="text-[#9A9A9A] text-sm group-focus-within:text-[#E86A58] transition-colors" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-4 border border-[#E8E8E8] rounded-xl focus:border-[#E86A58] focus:ring-4 focus:ring-[#E86A58]/10 focus:outline-none transition-all duration-300 bg-white text-[#1E1E1E] text-[16px] placeholder:text-[#9A9A9A]"
                        placeholder="Where would you like us to reply?"
                      />
                    </div>
                    <p className="mt-2 text-[13px] text-[#9A9A9A] opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                      We&apos;ll only use this to respond to your message
                    </p>
                  </div>

                  <div className="group">
                    <label className="block text-[15px] font-medium text-[#333333] mb-3" htmlFor="subject">
                      What&apos;s this about?
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 border border-[#E8E8E8] rounded-xl focus:border-[#E86A58] focus:ring-4 focus:ring-[#E86A58]/10 focus:outline-none transition-all duration-300 bg-white text-[#1E1E1E] text-[16px] placeholder:text-[#9A9A9A]"
                      placeholder="Briefly describe what you&apos;d like to discuss"
                    />
                    <p className="mt-2 text-[13px] text-[#9A9A9A] opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                      Helps us direct your inquiry to the right person
                    </p>
                  </div>

                  <div className="group">
                    <label className="block text-[15px] font-medium text-[#333333] mb-3" htmlFor="message">
                      Your message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-4 border border-[#E8E8E8] rounded-xl focus:border-[#E86A58] focus:ring-4 focus:ring-[#E86A58]/10 focus:outline-none transition-all duration-300 bg-white text-[#1E1E1E] text-[16px] placeholder:text-[#9A9A9A] leading-[1.6] resize-none"
                      placeholder="Take your time. Share as much or as little as you&apos;d like..."
                    />
                    <div className="mt-2 flex justify-between items-center">
                      <p className="text-[13px] text-[#9A9A9A] opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                        The more context you provide, the better we can help
                      </p>
                      <div className="text-[12px] text-[#9A9A9A]">
                        {formData.message.length}/1000
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      className="group w-full py-4 px-6 bg-[#E86A58] text-white font-medium rounded-xl hover:bg-[#D55A48] transition-all duration-300 flex items-center justify-center text-[16px] shadow-sm hover:shadow-lg hover:shadow-[#E86A58]/20"
                    >
                      <span className="relative flex items-center">
                        <FaPaperPlane className="mr-3 text-sm group-hover:translate-x-1 transition-transform duration-300" />
                        Send your message
                        <FaArrowRight className="ml-3 text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </span>
                    </button>
                    
                    <div className="mt-8 pt-6 border-t border-[#F0F0F0]">
                      <div className="flex items-start gap-3">
                        <FaLeaf className="text-[#9A9A9A] text-sm mt-0.5 flex-shrink-0" />
                        <p className="text-[13px] text-[#9A9A9A] leading-[1.6]">
                          Your privacy matters. We never share your information, 
                          and you won&apos;t be added to any mailing lists unless you ask.
                        </p>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="mt-12 pt-8 border-t border-[#F0F0F0]">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 bg-[#FAFAFA] rounded-xl">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white border border-[#E8E8E8] flex items-center justify-center flex-shrink-0">
                        <FaGraduationCap className="text-[#333333]" />
                      </div>
                      <div>
                        <p className="text-[16px] font-medium text-[#333333] mb-2">
                          Prefer to meet in person?
                        </p>
                        <p className="text-[14px] text-[#5A5A5A]">
                          Campus tours and meetings available most weekdays
                        </p>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-white border border-[#E8E8E8] text-[#333333] font-medium rounded-lg hover:border-[#E86A58] hover:text-[#E86A58] transition-colors shadow-sm text-[15px] hover:shadow-md whitespace-nowrap">
                      Schedule a visit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-24">
            <div className="text-center mb-12">
              <h3 className="text-[26px] font-medium text-[#333333] mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
                More ways to connect
              </h3>
              <p className="text-[16px] text-[#5A5A5A] max-w-2xl mx-auto">
                Sometimes the best conversations happen outside traditional channels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#E8E8E8] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#FAFAFA] border border-[#E8E8E8] flex items-center justify-center">
                    <FaMapMarkerAlt className="text-[#E86A58]" />
                  </div>
                  <h4 className="text-[18px] font-medium text-[#333333]">
                    Visit our campus
                  </h4>
                </div>
                <div className="space-y-4">
                  {contacts.map((contact, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-[#E86A58] animate-pulse' : 'bg-[#E8E8E8]'}`}></div>
                      </div>
                      <div>
                        <p className="text-[15px] font-medium text-[#333333]">{contact.title}</p>
                        <p className="text-[14px] text-[#5A5A5A] mt-1">{contact.location}</p>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 mt-4 border-t border-[#F0F0F0]">
                    <p className="text-[14px] text-[#9A9A9A]">
                      Free parking available in designated visitor areas
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-[#E8E8E8] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#FAFAFA] border border-[#E8E8E8] flex items-center justify-center">
                    <FaClock className="text-[#E86A58]" />
                  </div>
                  <h4 className="text-[18px] font-medium text-[#333333]">
                    When we&apos;re here
                  </h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[14px] text-[#9A9A9A] mb-2">Main office hours</p>
                    <div className="space-y-3">
                      {[
                        { day: "Monday–Thursday", time: "8:30am–6pm" },
                        { day: "Friday", time: "8:30am–5pm" },
                        { day: "Saturday", time: "9am–2pm" },
                        { day: "Sunday", time: "By appointment" }
                      ].map((schedule, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-[15px] text-[#5A5A5A]">{schedule.day}</span>
                          <span className={`text-[15px] font-medium ${index === 3 ? 'text-[#E86A58]' : 'text-[#333333]'}`}>
                            {schedule.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#F0F0F0]">
                    <p className="text-[14px] text-[#9A9A9A]">
                      Evening appointments available upon request
                    </p>
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