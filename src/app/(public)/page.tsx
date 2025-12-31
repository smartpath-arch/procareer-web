"use client";

import React from "react";
import HeroSection from "@/components/home/HeroSection";
import AlumniCompaniesSection from "@/components/home/AlumniCompaniesSection";
import ProgramSection from "@/components/home/programsection";
import MentorCarousel from "@/components/home/mentor";
import AlumniTestimonial from "@/components/home/AlumniTestimonial";
import PublishedAndPartnership from "@/components/home/PublishedAndPartnership";
import Footer from "@/components/common/Footer";

export default function HomePage() {
  return (
    <main className="w-full overflow-hidden">
      {/* Section Hero */}
      <HeroSection />

      {/* Section Alumni Companies */}
      <div className="py-5 bg-[#FAFAFA]">
        <AlumniCompaniesSection />
      </div>

      {/* Section Program */}
      <ProgramSection />

      {/* Section Mentor */}
      <div className="py-24 bg-white">
        <MentorCarousel />
      </div>

      {/* Section Testimoni */}
      <div className="py-20 bg-[#FEFADD]">
        <AlumniTestimonial />
      </div>

      {/* Section Published and Partnership */}
      <PublishedAndPartnership />

      {/* Footer */}
      <Footer />
    </main>
  );
}
