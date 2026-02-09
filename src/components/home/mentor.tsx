"use client";

import React from "react";
import Image from "next/image";

type CompanyLogo = {
  name: string;
  src: string;
};

const topCompanies: CompanyLogo[] = [
  { name: "Toyota", src: "/assets/home/companies/toyota.png" },
  { name: "Garuda Indonesia", src: "/assets/home/companies/garuda.png" },
  { name: "Unilever", src: "/assets/home/companies/unilever.png" },
  { name: "Bank Mandiri", src: "/assets/home/companies/mandiri.png" },
  { name: "Mayora", src: "/assets/home/companies/mayora.png" },
  { name: "Shopee", src: "/assets/home/companies/shopee.png" },
  { name: "DANA", src: "/assets/home/companies/dana.png" },
];

const mentorData: MentorData[] = [
  {
    name: "Deva Fitrianti",
    photo: "/assets/mobile/home/mentor/mentordevaFitrianti.png",
    company: "Unilever",
    companyIcon: "unilever.svg",
    position: "Customer Development",
    linkedIn: "https://www.linkedin.com/in/devafitrianti/",
  },
  {
    name: "Anis Dewinta",
    photo: "/assets/mobile/home/mentor/mentoranisDewinta.png",
    company: "Mayora Group",
    companyIcon: "mayoragroup.svg",
    position: "Recruitment & People Organization and Development",
    linkedIn: "https://www.linkedin.com/in/anis-dewinta-6a69a3137/",
  },
  {
    name: "Kurniawan Wicaksono",
    photo: "/assets/mobile/home/mentor/mentorkurniawanwicaksono.png",
    company: "Glints",
    companyIcon: "glints.svg",
    position: "Associate Talent Consultant",
    linkedIn: "https://www.linkedin.com/in/kurniawanwicaksono/",
  },
  {
    name: "Achmad Fikry",
    photo: "/assets/mobile/home/mentor/mentorachmadfikry.png",
    company: "Mayora",
    companyIcon: "mayora.svg",
    position: "Production & Engineering Packaging Section Head",
    linkedIn: "https://www.linkedin.com/in/achmadfikry/",
  },
];

function LogoItem({ logo }: { logo: CompanyLogo }) {
  return (
    <div className="flex items-center justify-center flex-shrink-0 px-3 md:px-5">
      <div className="relative h-14 w-[100px] md:h-14 md:w-[100px]">
        <Image
          src={logo.src}
          alt={logo.name}
          fill
          className="object-contain"
          priority={false}
        />
      </div>
    </div>
  );
}

export default function MentorCarousel() {
  return (
    <section className="w-full bg-white py-8 px-4">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-2xl md:text-4xl font-bold mb-6 mt-6">
          <span className="text-gray-900">Mentor from </span>
          <span className="text-[#2F184C] relative inline-block">
            Top Company
            <span className="absolute left-0 right-0 -bottom-2 h-1 bg-[#2F184C] rounded-full"></span>
          </span>
        </h2>

        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white to-transparent z-10" />

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-hidden py-1 no-scrollbar"
          >
            {desktopMentorData.map((mentor, i) => (
              <MentorCard
                key={`m1-${i}`}
                photo={mentor.photo}
                linkedIn={mentor.linkedIn}
                delay={i * 80}
              />
            ))}
            {desktopMentorData.map((mentor, i) => (
              <MentorCard
                key={`m2-${i}`}
                photo={mentor.photo}
                linkedIn={mentor.linkedIn}
                delay={i * 80}
              />
            ))}
          </div>
        </div>

        <div className="md:hidden">
          <div
            ref={mobileScrollRef}
            className="flex gap-6 overflow-x-auto py-1 px-[calc(50vw-140px)] no-scrollbar"
            style={{
              scrollBehavior: "auto",
            }}
          >
            {mentorData.map((mentor, i) => (
              <MentorCardMobile key={`mobile1-${i}`} mentor={mentor} />
            ))}
            {mentorData.map((mentor, i) => (
              <MentorCardMobile key={`mobile2-${i}`} mentor={mentor} />
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {[...Array(totalSlides)].map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-500 ease-in-out ${
                  i === currentSlide ? "w-8 bg-[#262626]" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .logo-track {
          display: flex;
          gap: 0px;
          width: fit-content;
          will-change: transform;
          animation: logo-marquee 35s linear infinite;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* optional: kalau mau pause pas hover, uncomment */
        /* .logo-track:hover { animation-play-state: paused; } */

        @keyframes logo-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .logo-track {
            animation: none !important;
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </section>
  );
}
