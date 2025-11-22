"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Add custom animations
const customStyles = `
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slide-up {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .animate-fade-in {
    animation: fade-in 0.6s ease-out;
  }

  .animate-slide-up {
    animation: slide-up 0.6s ease-out 0.1s backwards;
  }

  .animate-slide-up-delay {
    animation: slide-up 0.6s ease-out 0.2s backwards;
  }
`;

interface SectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  path: string;
  reverse?: boolean;
  bgClass: string;
  gapClass?: string;
  imgWrapClass?: string;
  textWrapClass?: string;
  center?: boolean;
  customPadding?: string;
  customImageHeight?: string;
}

const Section: React.FC<SectionProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  path,
  reverse = false,
  bgClass,
  gapClass = "gap-8",
  imgWrapClass = "basis-72 md:basis-[28rem]",
  textWrapClass = "flex-1",
  center = false,
  customPadding = "py-3 md:py-2",
  customImageHeight = "w-72 h-72 md:w-[24rem] md:h-[20rem] lg:w-[28rem] lg:h-[23.333rem]",
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    const section = document.getElementById(`section-${title}`);
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [title]);

  return (
    <section
      id={`section-${title}`}
      className={`${bgClass} overflow-hidden hidden md:block transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`w-full mx-auto max-w-7xl px-8 md:px-12 ${customPadding} flex flex-col md:flex-row items-center ${gapClass} ${
          reverse ? "md:flex-row-reverse" : ""
        } ${center ? "justify-center" : "justify-between"}`}
      >
        <div
          className={`flex-shrink-0 flex ${
            reverse ? "md:justify-start" : "md:justify-end"
          } ${imgWrapClass} justify-center transition-all duration-1000 transform ${
            isVisible
              ? "translate-x-0 opacity-100"
              : reverse
                ? "translate-x-20 opacity-0"
                : "-translate-x-20 opacity-0"
          }`}
        >
          <div
            className={`relative ${customImageHeight} hover:scale-105 transition-transform duration-500`}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 80vw, (max-width: 1280px) 50vw, 40vw"
              className="object-bottom object-cover"
            />
          </div>
        </div>
        <div
          className={`text-white ${textWrapClass} ${
            reverse ? "text-right md:text-right" : "text-left md:text-left"
          } transition-all duration-1000 delay-300 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 leading-tight">
            {title}
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl mb-5 opacity-95 leading-relaxed">
            {description}
          </p>
          <div className={`flex ${reverse ? "justify-end" : "justify-start"}`}>
            <Link href={path}>
              <button
                className="bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 text-lg shadow-sm hover:shadow-lg transform hover:scale-105"
                style={{
                  transition:
                    "background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#D9E6F1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#ffffff";
                }}
              >
                Selengkapnya
                <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const MobileCarousel: React.FC = () => {
  const slides = [
    {
      id: "e-learning",
      label: "Program Kita",
      title: "E-Learning",
      description: "Pelajari Ratusan Skill Bersertifikat kapanpun dimanapun",
      imageSrc: "/assets/mobile/home/program-section/e-learningmobile.png",
      buttonText: "Lihat E-Learning",
      path: "/e-learning",
    },
    {
      id: "bootcamp",
      label: "Program Kita",
      title: "Bootcamp & Webinar",
      description:
        "Intensive Live Class Bareng Experts hingga disalurkan kerja",
      imageSrc:
        "/assets/mobile/home/program-section/bootcamp-webinarmobile.png",
      buttonText: "Lihat Bootcamp",
      path: "/bootcamp-webinar",
    },
    {
      id: "corporate",
      label: "Program Kita",
      title: "For Corporate",
      description:
        "Esiensikan Operasionalmu dan Tingkatkan Omset Perusahaanmu dengan Talent Berkualitas",
      imageSrc: "/assets/mobile/home/program-section/forcorporatemobile.png",
      buttonText: "Lihat Corporate",
      path: "/for-corporate",
    },
    {
      id: "event",
      label: "Program Kita",
      title: "Event",
      description:
        "Ikuti event dan program menarik lainnya untuk upgrade diri kamu",
      imageSrc: "/assets/mobile/home/program-section/eventmobile.png",
      buttonText: "Lihat Event",
      path: "/event",
    },
  ] as const;

  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoplayKey, setAutoplayKey] = useState(0);

  const minSwipeDistance = 50;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % slides.length;
        console.log("Carousel moving to:", next, slides[next]?.title);
        return next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length, autoplayKey]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && current < slides.length - 1) {
      setCurrent(current + 1);
      setAutoplayKey((prev) => prev + 1);
    }
    if (isRightSwipe && current > 0) {
      setCurrent(current - 1);
      setAutoplayKey((prev) => prev + 1);
    }

    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchEnd(0);
    setTouchStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setTouchEnd(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && current < slides.length - 1) {
      setCurrent(current + 1);
      setAutoplayKey((prev) => prev + 1);
    }
    if (isRightSwipe && current > 0) {
      setCurrent(current - 1);
      setAutoplayKey((prev) => prev + 1);
    }

    setIsDragging(false);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    setAutoplayKey((prev) => prev + 1);
  };

  return (
    <div
      className="md:hidden overflow-hidden relative w-full bg-white"
      role="region"
      aria-roledescription="carousel"
      aria-label="Program SmartPath"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => isDragging && setIsDragging(false)}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`flex-shrink-0 w-full flex flex-col bg-white px-6 pt-6 pb-8 transition-all duration-500 ${
              index === current
                ? "scale-100 opacity-100"
                : "scale-95 opacity-50"
            }`}
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <div
              className={`relative w-full aspect-[1.2] mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 transition-all duration-700 ${
                index === current ? "scale-100 rotate-0" : "scale-95 rotate-1"
              }`}
            >
              <Image
                src={slide.imageSrc}
                alt={slide.title}
                fill
                sizes="100vw"
                className={`object-cover transition-transform duration-700 ${
                  index === current ? "scale-100" : "scale-110"
                }`}
              />
            </div>
            <div
              className={`flex flex-col transition-all duration-500 delay-100 ${
                index === current
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <p className="text-blue-600 text-base font-medium mb-2 animate-fade-in">
                {slide.label}
              </p>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-3 animate-slide-up">
                {slide.title}
              </h2>
              <p className="text-black text-lg leading-relaxed mb-6 animate-slide-up-delay">
                {slide.description}
              </p>
              <Link href={slide.path}>
                <button
                  className="text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-300 text-base w-fit transform hover:scale-105 active:scale-95 hover:shadow-lg"
                  style={{ backgroundColor: "#0056A3" }}
                >
                  {slide.buttonText}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <nav
        className="absolute bottom-2 right-6 flex gap-1.5"
        aria-label="Pilih slide program"
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goToSlide(i)}
            className={`h-2 rounded-full transition-all duration-500 ease-in-out ${
              i === current
                ? "bg-yellow-500 w-8 shadow-lg"
                : "bg-gray-300 w-2 hover:bg-gray-400"
            }`}
            title={`Ke slide ${i + 1}: ${s.title}`}
            aria-label={`Ke slide ${i + 1}: ${s.title}`}
            aria-current={i === current ? "true" : undefined}
          >
            <span className="sr-only">{`Slide ${i + 1} - ${s.title}`}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

const LearningPlatformSections: React.FC = () => {
  const sections: SectionProps[] = [
    {
      title: "E-Learning",
      description: "Pelajari Ratusan Skill Bersertifikat kapanpun dimanapun",
      imageSrc: "/assets/home/program-section/e-learning.png",
      imageAlt: "E-Learning",
      bgClass: "bg-[#0056A3]",
      path: "/e-learning",
    },
    {
      title: "Bootcamp & Webinar",
      description:
        "Intensive Live Class Bareng Experts hingga disalurkan kerja",
      imageSrc: "/assets/home/program-section/bootcampdanwebinar.png",
      imageAlt: "Bootcamp & Webinar",
      reverse: true,
      bgClass: "bg-[#0B69BE]",
      path: "/bootcamp-webinar",
    },
    {
      title: "For Corporate",
      description:
        "Esiensikan Operasionalmu dan Tingkatkan Omset Perusahaanmu dengan Talent Berkualitas",
      imageSrc: "/assets/home/program-section/forcorporate.png",
      imageAlt: "For Corporate",
      bgClass: "bg-[#0056A3]",
      center: true,
      gapClass: "gap-4",
      customImageHeight:
        "w-72 h-72 md:w-[24rem] md:h-[20rem] lg:w-[28rem] lg:h-[23.333rem]",
      customPadding: "py-1 md:py-0.5",
      path: "/for-corporate",
    },
    {
      title: "Event",
      description:
        "Ikuti event dan program menarik lainnya untuk upgrade diri kamu",
      imageSrc: "/assets/home/program-section/event.png",
      imageAlt: "Event",
      reverse: true,
      bgClass: "bg-[#0B69BE]",
      gapClass: "gap-4",
      customPadding: "py-2 md:py-1",
      path: "/event",
    },
  ];
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <MobileCarousel />
      {sections.map((section) => (
        <Section key={section.title} {...section} />
      ))}
    </>
  );
};

export default LearningPlatformSections;
