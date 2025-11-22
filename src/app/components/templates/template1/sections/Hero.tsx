"use client";

import React from 'react';
import Image from 'next/image';

export const Hero: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Hero Section */}
      <main className="relative flex h-screen flex-col items-center justify-center">
        {/* Background Image and Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <Image
            alt="Modern college campus with students walking through green spaces and clean architecture."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5xb7prWaAzGpEGujEfAVP2WIdZmfxz2_g8mDesOgRpZ8kyD2lJf_2FEtvICvjbiqMSrKWo-E5nIcN564SyG_aUaN4FOtPzd2uYZtgeWjpxkVqsD6EYayWEZaeWaFtB5CUtKaEjdZP7SwpnEBgqPhy78UV3dJ7_w07Y62S2Kn_OPpUHYs500P9AwVbY-NTOXK_ZZMwAoweOKSGrDMAV8XNFpyQ1bQkVSLAqbSm17jrVbCPPZirSEZj99uKp6YXF2EEGSbB_PyNjYc"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-1/4 -left-1/4 h-1/2 w-1/2 rounded-full bg-blue-600/20 blur-3xl animate-[spin_20s_linear_infinite_reverse]"></div>
          <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-purple-600/20 blur-3xl animate-[spin_25s_linear_infinite]"></div>
        </div>

        {/* Central Content Block */}
        <div className="relative z-20 flex flex-col items-center justify-center gap-6 p-4 text-center text-white sm:gap-8">
          <div className="flex flex-col gap-2">
            <h1 
              className="text-2xl font-black leading-tight tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl"
              style={{
                background: "linear-gradient(90deg, #2b6cee, #6A3F9C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              Kips College
            </h1>
            <p className="mx-auto max-w-lg text-base font-normal text-white/90 sm:text-lg md:text-xl">
              Innovate Your Future. Where Ambition Meets Opportunity.
            </p>
          </div>
          
          <div className="flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
            <button 
              onClick={() => {
                const programsSection = document.querySelector('#programs');
                programsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-blue-600 text-white text-base font-bold tracking-[0.015em] transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-600/50"
            >
              <span className="truncate">Explore Programs</span>
            </button>
            
            <button 
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-white/10 text-white backdrop-blur-sm border border-white/20 text-base font-bold tracking-[0.015em] transition-colors hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/30"
            >
              <span className="truncate">Start Your Journey</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};