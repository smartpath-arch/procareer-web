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
      <AlumniCompaniesSection />

      {/* Section Program */}
      <ProgramSection />

      {/* Section Mentor */}
      <MentorCarousel />

      {/* Section Testimoni */}
      <AlumniTestimonial />

      {/* Section Published and Partnership */}
      <PublishedAndPartnership />

      {/* Footer */}
      <Footer />
    </main>
  );
}
