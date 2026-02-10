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

const topCompaniesDup = [
  ...topCompanies,
  ...topCompanies,
  ...topCompanies,
  ...topCompanies,
] as const;

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

          <div className="overflow-hidden py-4 rounded-xl bg-[#FCFCFC]">
            <div className="logo-track">
              {topCompaniesDup.map((logo, i) => (
                <LogoItem key={`${logo.name}-${i}`} logo={logo} />
              ))}
            </div>
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
