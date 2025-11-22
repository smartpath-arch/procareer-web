"use client";

import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

type Company = { src: string; alt: string };

const companies: readonly Company[] = [
  { src: "/assets/home/companies/unilever.png", alt: "Unilever" },
  { src: "/assets/home/companies/grab.png", alt: "Grab" },
  { src: "/assets/home/companies/pertamina.png", alt: "Pertamina" },
  { src: "/assets/home/companies/paragon.png", alt: "Paragon" },
  { src: "/assets/home/companies/shopee.png", alt: "Shopee" },
  { src: "/assets/home/companies/prudential.png", alt: "Prudential" },
  { src: "/assets/home/companies/telkom.png", alt: "Telkom Indonesia" },
  { src: "/assets/home/companies/gojek.png", alt: "Gojek" },
  { src: "/assets/home/companies/kumparan.png", alt: "kumparan" },
] as const;

const benefits: readonly string[] = [
  "Disalurkan dan dibimbing sampai dapat kerja",
  "Dibuatkan CV standar top company impianmu",
  "Sertifikat Internasional",
  "Program dipersonalisasi sesuai diri dan karir kamu",
] as const;

export default function AlumniCompaniesSection() {
  return (
    <section
      id="alumni"
      aria-label="Alumni and partner companies"
      className="w-full bg-[#FFFFFF]"
    >
      <div className="relative bg-[#FFFFFF]">
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-2 md:pt-10 md:pb-4">
          <div className="pb-1 md:pb-2">
            <h2
              className="md:hidden text-center font-extrabold text-gray-900 text-[24px] leading-tight px-2"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Thousands of Our Alumni Land Jobs at
              <br />
              Top Companies
            </h2>
            <h2 className="hidden md:block text-center font-extrabold text-gray-900 text-2xl sm:text-3xl md:text-[44px] leading-tight">
              Thousands of Our Alumni Land Jobs at Top Companies
            </h2>
            {/* underline removed */}
          </div>
        </div>

        <div className="relative w-full overflow-hidden bg-[#FFFFFF] pb-10 md:pb-14">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#FFFFFF] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#FFFFFF] to-transparent z-10" />

          <div className="flex animate-marquee will-change-transform">
            {companies.concat(companies).map((c, i) => (
              <div
                key={`${c.src}-${i}`}
                className="mx-6 my-4 flex h-14 w-28 sm:h-16 sm:w-32 flex-none items-center justify-center"
              >
                <Image
                  src={c.src}
                  alt={c.alt}
                  width={128}
                  height={64}
                  className="object-contain"
                  priority={i < 2}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#D4A017] via-[#F7C948] to-[#FDE68A]">
        <div className="md:hidden px-5 py-8">
          <h3 className="text-[28px] text-center font-extrabold text-gray-900 mb-6">
            Why Choose Smartpath?
          </h3>
          <ul className="space-y-4">
            {benefits.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="mt-[2px] grid place-items-center h-7 w-7 shrink-0 rounded-full bg-transparent ring-[3px] ring-gray-900">
                  <Check className="h-4 w-4 text-gray-900 stroke-[3]" />
                </span>
                <span className="text-gray-900 text-[18px] leading-7 font-semibold">
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex items-center gap-16">
              <div className="flex-shrink-0">
                <h3 className="text-5xl font-extrabold text-gray-900 whitespace-nowrap">
                  Why Choose Smartpath?
                </h3>
              </div>
              <ul className="space-y-4 flex-1">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-4">
                    <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-transparent ring-[3px] ring-gray-900">
                      <Check className="h-6 w-6 text-gray-900 stroke-[3]" />
                    </span>
                    <span className="text-gray-900 text-xl font-semibold">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
