import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const heroImages = [
    "/assets/home/hero-section/herosection5.png",
    "/assets/home/hero-section/heroe-learning.png",
    "/assets/home/hero-section/herobootcampdanwebinar.png",
    "/assets/home/hero-section/heroforcorporate.png",
    "/assets/home/hero-section/heroevent.png",
  ];

  const SLIDE_DURATION = 4000;

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [heroImages.length, isPaused]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-background">
      <style jsx>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(60px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInZoom {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(50px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.6s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .animate-fadeInZoom {
          animation: fadeInZoom 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
          opacity: 0;
        }
      `}</style>

      <div className="md:hidden">
        <div className="relative bg-gradient-to-b from-[#5C89C7] to-[#86BEFF] rounded-b-[40px] overflow-hidden">
          <div className="relative z-10 w-full px-6 pb-0">
            <div className="w-full pb-0">
              <Image
                src="/assets/mobile/home/mobileheroskillspace.png"
                alt="Hero Mobile"
                width={800}
                height={600}
                sizes="100vw"
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
        <div className="relative px-4 pt-6 pb-6">
          <div className="overflow-hidden rounded-3xl bg-background">
            <Image
              src="/assets/mobile/home/mobileb4.png"
              alt="Statistik SmartPath - 310k+ Pengguna, 1000+ Materi, 100+ Instansi"
              width={450}
              height={380}
              sizes="100vw"
              className="block w-full h-auto"
            />
          </div>
        </div>
      </div>

      <div className="hidden md:block relative bg-gradient-to-b from-[#CB66E8] to-[#2F184C] pb-8 rounded-b-[60px]">
        <div className="mx-auto max-w-[1450px] px-2 pt-4">
          <div
            className={`relative w-full overflow-hidden aspect-video mx-auto transition-opacity ${
              isVisible ? "animate-fadeInUp" : "opacity-0"
            }`}
          >
            <Image
              src="/assets/home/hero-section/herosection5.png"
              alt="Bantu Kamu Cepat Berkarir di Bidang Data & AI"
              width={1600}
              height={900}
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="block w-full h-auto"
            />
          </div>
        </div>
        <div
          className={`relative z-10 mx-auto -mt-[380px] w-[92%] max-w-5xl transition-opacity ${
            isVisible ? "animate-fadeInZoom" : "opacity-0"
          }`}
        >
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/assets/home/herostatistik4.png"
              alt="Statistik SmartPath"
              width={1600}
              height={600}
              priority
              sizes="(max-width: 1280px) 92vw, 1024px"
              className="block w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
