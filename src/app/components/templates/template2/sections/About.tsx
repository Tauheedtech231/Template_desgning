"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Video, Wallet, Trophy } from "lucide-react";
/* eslint-disable */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const aboutLineRef = useRef<SVGPathElement>(null);
  const visionLineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade + slide animation
      gsap.fromTo(
        ".about-element",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Line animations
      [aboutLineRef.current, visionLineRef.current].forEach((line) => {
        if (!line) return;
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: line,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Count-up numbers
      gsap.utils.toArray(".stat-number").forEach((el: any) => {
        const finalValue = Number(el.dataset.value);
        const suffix = el.dataset.suffix || "";
        const obj = { val: 0 };
        gsap.to(obj, {
          val: finalValue,
          duration: 2,
          ease: "power1.out",
          onUpdate: () => {
            let display = "";
            if (finalValue >= 1000000) {
              display = (obj.val / 1000000).toFixed(1) + " M";
            } else if (finalValue >= 1000) {
              display = (obj.val / 1000).toFixed(0) + " K";
            } else {
              display = Math.floor(obj.val).toLocaleString();
            }
            el.innerText = display + suffix;
          },
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      icon: <Users className="w-8 h-8 text-white" />,
      number: 165489,
      suffix: "+",
      label: "Community",
    },
    {
      icon: <Video className="w-8 h-8 text-white" />,
      number: 200,
      suffix: "+",
      label: "International Courses",
    },
    {
      icon: <Wallet className="w-8 h-8 text-white" />,
      number: 2000000,
      suffix: "+",
      label: "Registered Members",
    },
    {
      icon: <Trophy className="w-8 h-8 text-white" />,
      number: 578,
      label: "Awards Won",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16 about-element">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-[#1000F0] italic">Mansol</span>
          </h2>

          <div className="flex justify-center mb-6">
            <svg width="120" height="4" viewBox="0 0 120 4" fill="none">
              <path
                ref={aboutLineRef}
                d="M0,2 L120,2"
                stroke="#FF6347"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            Mansol Hab Trainings is a premier educational institution dedicated
            to providing top-quality education that empowers students to excel
            academically and evolve into responsible, capable individuals.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="text-center about-element bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 bg-[#1000F0] rounded-full flex justify-center items-center mx-auto shadow-lg">
                {item.icon}
              </div>
              <h3
                className="text-3xl md:text-4xl font-bold mt-5 mb-2 stat-number"
                data-value={item.number}
                data-suffix={item.suffix || ""}
              >
                0
              </h3>
              <p className="text-gray-600 text-base">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Vision Section */}
        <div className="text-center max-w-4xl mx-auto about-element">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-[#1000F0] italic">Vision</span>
          </h2>

          <div className="flex justify-center mb-6">
            <svg width="120" height="4" viewBox="0 0 120 4" fill="none">
              <path
                ref={visionLineRef}
                d="M0,2 L120,2"
                stroke="#FF6347"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed md:leading-loose">
            Our vision is to lead in the creation, implementation, and delivery
            of innovative workforce solutions, tools, and services that empower
            our clients to succeed and thrive in the dynamic and evolving
            landscape of work.
          </p>
        </div>
      </div>
    </section>
  );
};
