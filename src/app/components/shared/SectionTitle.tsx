"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export interface SectionTitleProps {
  /** Main title text */
  title: string;
  /** Optional subtitle text */
  subtitle?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Additional CSS classes */
  className?: string;
  /** Show decorative underline */
  underline?: boolean;
  /** Underline color variant */
  underlineVariant?: 'primary' | 'secondary' | 'accent';
  /** Animation type */
  animation?: 'fade' | 'slide' | 'zoom' | 'none';
  /** Animation delay in seconds */
  animationDelay?: number;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = 'center',
  className = '',
  underline = true,
  underlineVariant = 'primary',
  animation = 'fade',
  animationDelay = 0,
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = [];
      if (titleRef.current) elements.push(titleRef.current);
      if (subtitleRef.current) elements.push(subtitleRef.current);
      if (underlineRef.current && underline) elements.push(underlineRef.current);

      elements.forEach((element, index) => {
        const delay = animationDelay + index * 0.2;

        switch (animation) {
          case 'fade':
            gsap.fromTo(element,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 80%",
                  end: "bottom 20%",
                  toggleActions: "play none none reverse"
                }
              }
            );
            break;

          case 'slide':
            gsap.fromTo(element,
              { 
                opacity: 0, 
                x: align === 'center' ? 0 : align === 'left' ? -50 : 50 
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                delay,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 80%",
                  end: "bottom 20%",
                  toggleActions: "play none none reverse"
                }
              }
            );
            break;

          case 'zoom':
            gsap.fromTo(element,
              { opacity: 0, scale: 0.8 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                delay,
                ease: "back.out(1.7)",
                scrollTrigger: {
                  trigger: element,
                  start: "top 80%",
                  end: "bottom 20%",
                  toggleActions: "play none none reverse"
                }
              }
            );
            break;

          case 'none':
          default:
            // No animation
            break;
        }
      });
    });

    return () => ctx.revert();
  }, [align, animation, animationDelay, underline]);

  // Alignment classes
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // Underline color classes
  const underlineColors = {
    primary: 'bg-blue-600 dark:bg-blue-500',
    secondary: 'bg-gray-600 dark:bg-gray-400',
    accent: 'bg-purple-600 dark:bg-purple-500',
  };

  // Underline alignment classes
  const underlineAlignment = {
    left: 'ml-0',
    center: 'mx-auto',
    right: 'ml-auto',
  };

  return (
    <div className={`mb-12 ${alignmentClasses[align]} ${className}`}>
      {/* Main Title */}
      <h2 
        ref={titleRef}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
      >
        {title}
      </h2>

      {/* Optional Subtitle */}
      {subtitle && (
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
          style={{ 
            marginLeft: align === 'left' ? 0 : 'auto',
            marginRight: align === 'right' ? 0 : 'auto'
          }}
        >
          {subtitle}
        </p>
      )}

      {/* Optional Decorative Underline */}
      {underline && (
        <div 
          ref={underlineRef}
          className={`mt-6 w-20 h-1 ${underlineColors[underlineVariant]} ${underlineAlignment[align]} rounded-full`}
        />
      )}
    </div>
  );
};

// Variant components for common use cases
export const SectionTitlePrimary: React.FC<Omit<SectionTitleProps, 'underlineVariant'>> = (props) => (
  <SectionTitle {...props} underlineVariant="primary" />
);

export const SectionTitleSecondary: React.FC<Omit<SectionTitleProps, 'underlineVariant'>> = (props) => (
  <SectionTitle {...props} underlineVariant="secondary" />
);

export const SectionTitleAccent: React.FC<Omit<SectionTitleProps, 'underlineVariant'>> = (props) => (
  <SectionTitle {...props} underlineVariant="accent" />
);

// No-underline variant
export const SectionTitleSimple: React.FC<Omit<SectionTitleProps, 'underline'>> = (props) => (
  <SectionTitle {...props} underline={false} />
);

// Compact variant for smaller sections
export const SectionTitleCompact: React.FC<SectionTitleProps> = (props) => (
  <SectionTitle {...props} className={`${props.className} mb-8`} />
);

// Large variant for hero sections
export const SectionTitleLarge: React.FC<SectionTitleProps> = (props) => (
  <div className={props.className}>
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
      {props.title}
    </h2>
    {props.subtitle && (
      <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
        {props.subtitle}
      </p>
    )}
  </div>
);