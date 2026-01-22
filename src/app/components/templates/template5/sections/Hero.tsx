import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function HeroSection() {
  const [descriptionIndex, setDescriptionIndex] = useState(0);
  const [headingIndex, setHeadingIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const headingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const descriptions = [
    "Since 1995, we have been dedicated to providing exceptional education that empowers students to become future leaders.",
    "Our commitment to academic excellence and personal growth sets us apart from other institutions.",
    "We focus on developing practical skills along with theoretical knowledge for holistic development.",
    "Join our community of learners and experience education that transforms lives and builds careers."
  ];

  const headings = [
    "Excellence College",
    "Future Leaders",
    "Academic Excellence",
    "Quality Education"
  ];

  // Check mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Rotate descriptions every 4 seconds
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setDescriptionIndex((prev) => (prev + 1) % descriptions.length);
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [descriptions.length]);

  // Rotate headings every 5 seconds
  useEffect(() => {
    if (headingIntervalRef.current) {
      clearInterval(headingIntervalRef.current);
    }

    headingIntervalRef.current = setInterval(() => {
      setHeadingIndex((prev) => (prev + 1) % headings.length);
    }, 5000);

    return () => {
      if (headingIntervalRef.current) {
        clearInterval(headingIntervalRef.current);
      }
    };
  }, [headings.length]);

  // Optimized animation variants
  const headingVariants:Variants = {
    exit: {
      opacity: 0,
      y: isMobile ? 25 : 40,
      scale: 0.95,
      filter: "blur(5px)",
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    enter: {
      opacity: 0,
      y: isMobile ? -25 : -40,
      scale: 0.95,
      filter: "blur(5px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.05
      }
    }
  };

  const welcomeVariants:Variants = {
    hidden: { 
      opacity: 0, 
      y: 8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const descriptionVariants:Variants = {
    hidden: { 
      opacity: 0, 
      x: isMobile ? -15 : -30,
      filter: "blur(3px)"
    },
    visible: { 
      opacity: 1, 
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.15
      }
    },
    exit: {
      opacity: 0,
      x: isMobile ? 15 : 30,
      filter: "blur(3px)",
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.5
      }
    }
  };

  // Split heading into letters for animation
  const splitText = (text: string) => {
    return text.split("").map((char, index) => ({
      char,
      key: `${text}-${index}`,
      delay: index * 0.02
    }));
  };

  return (
    <section className="relative overflow-hidden bg-black flex items-center justify-center" 
            style={{ minHeight: isMobile ? '75vh' : '80vh' }}>
      
      {/* Simple background effect */}
      <div className="absolute inset-0">
        {/* Center glow - smaller */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]
                      bg-[#8B6B61] rounded-full opacity-4 blur-[50px] sm:blur-[70px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 text-center flex flex-col items-center">
        
        {/* Welcome text - smaller */}
        <motion.div 
          className="mb-3 sm:mb-4 md:mb-5"
          variants={welcomeVariants}
          initial="hidden"
          animate="visible"
        >
          <span className="text-xs sm:text-sm md:text-base text-[#D6C7B9] font-light tracking-widest uppercase">
            Welcome to
          </span>
        </motion.div>

        {/* Dynamic Animated Heading - compact */}
        <div className="h-20 sm:h-28 md:h-32 lg:h-36 flex items-center justify-center mb-4 sm:mb-6 md:mb-8">
          <AnimatePresence mode="wait">
            <motion.h1 
              key={headingIndex}
              className="font-bold leading-tight"
              variants={headingVariants}
              initial="enter"
              animate="visible"
              exit="exit"
              style={{
                fontSize: isMobile ? '1.5rem' : 'clamp(2rem, 4vw, 4rem)'
              }}
            >
              <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5 md:gap-2">
                {splitText(headings[headingIndex]).map(({ char, key, delay }) => (
                  <motion.span
                    key={key}
                    initial={{ opacity: 0, y: isMobile ? 8 : 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay, duration: 0.25 }}
                    className={`inline-block ${
                      char === " " ? (isMobile ? "w-1.5" : "w-2 sm:w-2.5") : ""
                    } ${
                      headings[headingIndex] === "Excellence College" 
                        ? "bg-gradient-to-r from-[#8B6B61] via-[#A17A74] to-[#C99789] bg-clip-text text-transparent"
                        : headings[headingIndex] === "Future Leaders"
                        ? "bg-gradient-to-r from-[#A17A74] via-[#C99789] to-[#8B6B61] bg-clip-text text-transparent"
                        : headings[headingIndex] === "Academic Excellence"
                        ? "bg-gradient-to-r from-[#C99789] via-[#8B6B61] to-[#A17A74] bg-clip-text text-transparent"
                        : "bg-gradient-to-r from-[#8B6B61] to-[#C99789] bg-clip-text text-transparent"
                    }`}
                    style={{
                      fontSize: 'inherit'
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              
              {/* Animated underline - smaller */}
              <motion.div 
                className="h-0.5 sm:h-0.75 bg-gradient-to-r from-transparent via-[#A17A74] to-transparent mt-1.5 sm:mt-2.5 mx-auto"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.7, ease: "easeOut" }}
                style={{ width: isMobile ? '55%' : '65%' }}
              />
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Animated Description - compact */}
        <div className="h-16 sm:h-18 mb-6 sm:mb-8 flex items-center justify-center w-full max-w-xl sm:max-w-2xl px-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={descriptionIndex}
              variants={descriptionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-xs sm:text-sm md:text-base lg:text-lg text-[#D6C7B9] leading-relaxed"
            >
              {isMobile 
                ? descriptions[descriptionIndex].substring(0, 80) + "..."
                : descriptions[descriptionIndex].substring(0, 120) + "..."
              }
            </motion.p>
          </AnimatePresence>
        </div>

        {/* CTA Buttons - compact */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 px-4 w-full max-w-sm sm:max-w-md"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button 
            whileHover={{ scale: isMobile ? 1.02 : 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = "/components/templates/template5/contact"}
            className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#8B6B61] via-[#A17A74] to-[#8B6B61] text-white font-medium rounded-full overflow-hidden text-xs sm:text-sm md:text-base"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B6B61] via-[#A17A74] to-[#8B6B61]"></div>
            
            <span className="relative flex items-center justify-center gap-1.5">
              Apply Now
              <span className="group-hover:translate-x-0.5 transition-transform duration-300 text-sm">
                →
              </span>
            </span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: isMobile ? 1.02 : 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = "/components/templates/template5/courses"}
            className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-transparent text-white font-medium rounded-full border border-[#8B6B61] hover:border-[#A17A74] hover:text-[#A17A74] transition-all duration-300 text-xs sm:text-sm md:text-base"
          >
            <span className="relative flex items-center justify-center gap-1.5">
              Explore Programs
              <span className="text-[#A17A74] group-hover:translate-x-0.5 transition-transform duration-300 text-sm">
                →
              </span>
            </span>
          </motion.button>
        </motion.div>

        {/* No Trust Indicator */}
        {/* No Scroll Indicator */}

      </div>
    </section>
  );
}