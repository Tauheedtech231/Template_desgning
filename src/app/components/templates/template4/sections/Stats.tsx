"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  id: number;
  title: string;
  value: number;
  suffix?: string;
  color: string; // color for the circle stroke
}

const stats: Stat[] = [
  { id: 1, title: "Students Enrolled", value: 1200, suffix: "+", color: "#1E3A8A" },
  { id: 2, title: "Courses Offered", value: 85, color: "#D97706" },
  { id: 3, title: "Projects Completed", value: 320, suffix: "+", color: "#059669" },
  { id: 4, title: "Awards Won", value: 15, color: "#B91C1C" },
];

const StatsSection = () => {
  const circlesRefs = useRef<SVGCircleElement[]>([]);
  const numbersRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    stats.forEach((stat, i) => {
      const circle = circlesRefs.current[i];
      const numberEl = numbersRefs.current[i];
      if (!circle || !numberEl) return;

      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;

      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`;

      // Animate circle fill and number simultaneously
      gsap.to(circle, {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: circle,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      let counter = { value: 0 };
      gsap.to(counter, {
        value: stat.value,
        duration: 2.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: circle,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          numberEl.innerText =
            Math.floor(counter.value) + (stat.suffix ? stat.suffix : "");
        },
      });
    });
  }, []);

  return (
    <section className="w-full bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12">
        {stats.map((stat, index) => (
          <div key={stat.id} className="relative w-36 h-36 flex flex-col items-center justify-center">
            {/* SVG Circle */}
            <svg className="w-36 h-36 rotate-[-90deg]">
              <circle
                ref={(el) => (circlesRefs.current[index] = el!)}
                cx="72"
                cy="72"
                r="70"
                stroke={stat.color}
                strokeWidth="8"
                fill="transparent"
                strokeLinecap="round"
              />
            </svg>

            {/* Number */}
            <div
              ref={(el) => (numbersRefs.current[index] = el!)}
              className="absolute text-3xl font-bold text-slate-900"
            >
              0
            </div>

            {/* Title */}
            <p className="absolute bottom-[-2.5rem] text-center text-sm text-slate-600 w-full">
              {stat.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
