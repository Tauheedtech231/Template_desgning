'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  UserCircleIcon, 
  DocumentTextIcon, 
  DocumentArrowUpIcon, 
  CreditCardIcon,
  ChartBarIcon,
  EnvelopeIcon,
  ChevronDownIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdmissionsSection() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
  const processRef = useRef<HTMLDivElement | null>(null);
  const faqRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  const admissionSteps = [
    {
      step: 1,
      title: "Register/Login",
      description: "Create your applicant account or login to existing account",
      icon: UserCircleIcon,
      details: "Start by creating a secure applicant profile with your basic information and contact details.",
      color: "from-blue-500 to-blue-600"
    },
    {
      step: 2,
      title: "Fill Application",
      description: "Complete the online admission application form",
      icon: DocumentTextIcon,
      details: "Provide your academic history, personal information, and program preferences in our secure online form.",
      color: "from-green-500 to-green-600"
    },
    {
      step: 3,
      title: "Upload Documents",
      description: "Submit required documents and certificates",
      icon: DocumentArrowUpIcon,
      details: "Upload scanned copies of your previous transcripts, CNIC/B-Form, and other required documentation.",
      color: "from-purple-500 to-purple-600"
    },
    {
      step: 4,
      title: "Pay Fee",
      description: "Submit admission processing fee",
      icon: CreditCardIcon,
      details: "Pay the non-refundable admission processing fee through secure online payment methods or bank challan.",
      color: "from-orange-500 to-orange-600"
    },
    {
      step: 5,
      title: "Track Status",
      description: "Monitor your application status online",
      icon: ChartBarIcon,
      details: "Check your application progress, review updates, and see if any additional information is required.",
      color: "from-pink-500 to-pink-600"
    },
    {
      step: 6,
      title: "Get Admission Letter",
      description: "Receive official admission confirmation",
      icon: EnvelopeIcon,
      details: "Upon approval, download your official admission letter and next steps instructions.",
      color: "from-teal-500 to-teal-600"
    }
  ];

  const faqs = [
    {
      id: "faq-1",
      question: "What documents are required for admission?",
      answer: "You'll need your Matric/O-Level certificate and marksheet, CNIC/B-Form, 4 recent passport-size photographs, and any relevant certificates for scholarships or sports quotas."
    },
    {
      id: "faq-2",
      question: "When is the admission deadline?",
      answer: "Admissions are open throughout the year, but we recommend applying at least 4 weeks before the semester start date to complete all formalities. Early applications may qualify for discounts."
    },
    {
      id: "faq-3",
      question: "Can I apply for multiple programs?",
      answer: "Yes, you can apply for up to 3 programs simultaneously. However, you'll need to submit separate application forms and pay individual processing fees for each program."
    },
    {
      id: "faq-4",
      question: "How long does the admission process take?",
      answer: "The complete admission process typically takes 7-10 working days from application submission to final admission confirmation, provided all documents are submitted correctly."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      
      // Update active step based on scroll position
      if (processRef.current) {
        const processTop = processRef.current.offsetTop;
        const processHeight = processRef.current.offsetHeight;
        const scrollPosition = window.scrollY + 100;
        
        if (scrollPosition >= processTop && scrollPosition <= processTop + processHeight) {
          const stepProgress = (scrollPosition - processTop) / processHeight;
          const activeStepIndex = Math.min(Math.floor(stepProgress * admissionSteps.length), admissionSteps.length - 1);
          setActiveStep(activeStepIndex + 1);
        } else {
          setActiveStep(null);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [admissionSteps.length]);

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fixed navigation items with proper typing
  const navigationItems: { label: string; ref: React.RefObject<HTMLElement | null> }[] = [
    { label: "Process", ref: processRef },
    { label: "FAQ", ref: faqRef },
    { label: "Apply", ref: ctaRef }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 py-16 transition-colors duration-300 relative">
      
      {/* Quick Navigation */}
      <motion.div 
        className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        {navigationItems.map((item, index) => (
          <motion.button
            key={item.label}
            onClick={() => scrollToSection(item.ref)}
            className="w-3 h-3 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors shadow-lg"
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            title={`Scroll to ${item.label}`}
          />
        ))}
      </motion.div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg shadow-blue-500/30 transition-all duration-300"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUpIcon className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Admission Guidance & Support
          </motion.h1>
          <motion.p 
            className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your complete guide to joining Aspire College. Follow our streamlined process for a smooth admission experience.
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div 
            className="mt-12 flex flex-col items-center cursor-pointer"
            onClick={() => scrollToSection(processRef)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ y: 5 }}
          >
            <span className="text-blue-600 dark:text-blue-400 text-sm mb-2 font-medium">Explore Process</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-blue-500 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-blue-500 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Admission Process Section */}
        <div ref={processRef} className="mb-20 scroll-mt-20">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Admission Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Follow these 6 simple steps to complete your admission journey with us
            </p>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div 
            className="max-w-4xl mx-auto mb-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {activeStep ? `Step ${activeStep} of ${admissionSteps.length}` : 'Start your journey'}
              </span>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {activeStep ? `${Math.round((activeStep / admissionSteps.length) * 100)}% Complete` : 'Scroll to explore'}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                initial={{ width: 0 }}
                animate={{ width: activeStep ? `${(activeStep / admissionSteps.length) * 100}%` : '0%' }}
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {admissionSteps.map((step) => {
              const IconComponent = step.icon;
              const isActive = activeStep === step.step;
              
              return (
                <motion.div 
                  key={step.step}
                  className={`group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${
                    isActive 
                      ? 'border-blue-400 dark:border-blue-500 scale-105' 
                      : 'border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-400'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: step.step * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <motion.div 
                        className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`text-sm font-semibold px-2 py-1 rounded-full transition-colors ${
                          isActive
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          Step {step.step}
                        </span>
                      </div>
                      <motion.h3 
                        className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {step.title}
                      </motion.h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                        {step.description}
                      </p>
                      <motion.p 
                        className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        {step.details}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div ref={faqRef} className="max-w-4xl mx-auto scroll-mt-20">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Find answers to common questions about our admission process
            </p>
          </motion.div>

          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {faqs.map((faq, index) => (
              <motion.div 
                key={faq.id}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 5 }}
              >
                <motion.button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {expandedFaq === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <motion.p 
                          className="text-gray-600 dark:text-gray-300 leading-relaxed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {faq.answer}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div 
          ref={ctaRef}
          className="text-center mt-16 scroll-mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-2xl mx-auto border border-gray-100 dark:border-gray-700">
            <motion.h3 
              className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Ready to Begin Your Journey?
            </motion.h3>
            <motion.p 
              className="text-gray-600 dark:text-gray-300 mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Start your admission process today and take the first step toward your educational goals.
            </motion.p>
            <Link href="https://nes-tick.vercel.app">
              <motion.button 
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Go to Applicant Portal
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}