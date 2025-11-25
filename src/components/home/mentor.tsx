"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

type MentorCardProps = {
  delay?: number;
  photo: string;
  linkedIn: string;
};

type MentorData = {
  name: string;
  photo: string;
  company: string;
  companyIcon: string;
  position: string;
  linkedIn: string;
};

const delayClass = (ms: number) => {
  switch (ms) {
    case 0:
      return "anim-delay-0";
    case 80:
      return "anim-delay-80";
    case 160:
      return "anim-delay-160";
    case 240:
      return "anim-delay-240";
    case 320:
      return "anim-delay-320";
    case 400:
      return "anim-delay-400";
    case 480:
      return "anim-delay-480";
    case 560:
      return "anim-delay-560";
    case 640:
      return "anim-delay-640";
    case 720:
      return "anim-delay-720";
    default:
      return "anim-delay-0";
  }
};

// Desktop mentor data
const desktopMentorData = [
  {
    photo: "/assets/home/mentor/mentordian.png",
    linkedIn: "https://www.linkedin.com/in/dianpitaloka/",
  },
  {
    photo: "/assets/home/mentor/mentorjavas.png",
    linkedIn: "https://www.linkedin.com/in/javasalfredabyp/",
  },
  {
    photo: "/assets/home/mentor/mentoranugrah.png",
    linkedIn: "https://www.linkedin.com/in/anugrahakbarp/",
  },
  {
    photo: "/assets/home/mentor/mentorgerald.png",
    linkedIn: "https://www.linkedin.com/in/gerald-plakasa/",
  },
  {
    photo: "/assets/home/mentor/mentormochammad.png",
    linkedIn: "https://www.linkedin.com/in/mochammadtriantoro/",
  },
  {
    photo: "/assets/home/mentor/mentorfarrell.png",
    linkedIn: "https://www.linkedin.com/in/farrellfachriadi/",
  },
  {
    photo: "/assets/home/mentor/mentorputri.png",
    linkedIn: "https://www.linkedin.com/in/putriintanlarasati/",
  },
  {
    photo: "/assets/home/mentor/mentorputrishilla.png",
    linkedIn: "https://www.linkedin.com/in/putri-shilla-dwisurta/",
  },
  {
    photo: "/assets/home/mentor/mentorrifky.png",
    linkedIn: "https://www.linkedin.com/in/muhammadrifky26/",
  },
  {
    photo: "/assets/home/mentor/mentormande.png",
    linkedIn: "https://www.linkedin.com/in/mande-mandiri/",
  },
];

// Mobile mentor data
const mentorData: MentorData[] = [
  {
    name: "Dian Rezky Catur Pitaloka",
    photo: "/assets/mobile/home/mentor/mentordianrezky.png",
    company: "Grab",
    companyIcon: "grab.svg",
    position: "Territory Strategi & Planning Analyst",
    linkedIn: "https://www.linkedin.com/in/dianpitaloka/",
  },
  {
    name: "Javas Alfreda Belva Yoga Pratama",
    photo: "/assets/mobile/home/mentor/mentorjavasalfreda.png",
    company: "LinkAja",
    companyIcon: "linkaja.svg",
    position: "Senior Product Analytics",
    linkedIn: "https://www.linkedin.com/in/javasalfredabyp/",
  },
  {
    name: "Anugrah Akbar",
    photo: "/assets/mobile/home/mentor/mentoranugrahakbar.png",
    company: "Reckitt",
    companyIcon: "reckitt.svg",
    position: "IT&D Regional Data Scientist",
    linkedIn: "https://www.linkedin.com/in/anugrahakbarp/",
  },
  {
    name: "Gerald Plakasa",
    photo: "/assets/mobile/home/mentor/mentorgeraldplaksa.png",
    company: "Huawei",
    companyIcon: "huawei.svg",
    position: "Data Analyst",
    linkedIn: "https://www.linkedin.com/in/gerald-plakasa/",
  },
  {
    name: "Mochammad Tri Antoro",
    photo: "/assets/mobile/home/mentor/mentormochammadtri.png",
    company: "Lazada",
    companyIcon: "lazada.svg",
    position: "Key Account Manager",
    linkedIn: "https://www.linkedin.com/in/mochammadtriantoro/",
  },
  {
    name: "Farrell Fachriadi",
    photo: "/assets/mobile/home/mentor/mentorfarrellfachriadi.png",
    company: "Glints",
    companyIcon: "glints.svg",
    position: "International Business Development Associate",
    linkedIn: "https://www.linkedin.com/in/farrellfachriadi/",
  },
  {
    name: "Putri Larasati",
    photo: "/assets/mobile/home/mentor/mentorputrilarasati.png",
    company: "PwC Indonesia",
    companyIcon: "pwcindonesia.svg",
    position: "Human Capital Business Partner",
    linkedIn: "https://www.linkedin.com/in/putriintanlarasati/",
  },
  {
    name: "Putri Shilla Dwisurta",
    photo: "/assets/mobile/home/mentor/mentorputrishilla.png",
    company: "Shopee",
    companyIcon: "shopee.svg",
    position: "Recruitment",
    linkedIn: "https://www.linkedin.com/in/putri-shilla-dwisurta/",
  },
];

// Desktop Card
const MentorCard: React.FC<MentorCardProps> = ({
  delay = 0,
  photo,
  linkedIn,
}) => {
  return (
    <div
      className={`flex-shrink-0 w-[240px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${delayClass(
        delay,
      )}`}
    >
      <div className="relative">
        <Image
          src={photo}
          alt="Mentor"
          width={480}
          height={270}
          className="w-full h-auto object-cover"
          priority={false}
        />
        <div className="absolute bottom-3 left-0 right-0 flex justify-center">
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:scale-105 transition-transform duration-200 inline-block"
          >
            <Image
              src="/assets/home/linkedinbutton.svg"
              alt="LinkedIn Button"
              width={170}
              height={48}
              className="h-auto w-[170px]"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

// Mobile Card
const MentorCardMobile: React.FC<{ mentor: MentorData }> = ({ mentor }) => {
  return (
    <div className="flex-shrink-0 w-[280px] h-[380px] bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-[1.02] flex flex-col snap-center">
      <div className="relative h-[200px] flex-shrink-0 pb-3">
        <div className="w-full h-[180px] overflow-hidden">
          <Image
            src={mentor.photo}
            alt={mentor.name}
            width={280}
            height={180}
            className="w-full h-full object-cover object-top"
            priority={false}
          />
        </div>
        <div className="absolute bottom-0 right-3 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-300 z-10">
          <Image
            src={`/assets/mobile/home/mentor/companies/${mentor.companyIcon}`}
            alt={mentor.company}
            width={36}
            height={36}
            className="w-9 h-9 object-contain"
          />
        </div>
      </div>
      <div className="pt-2 px-4 pb-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
            {mentor.name}
          </h3>

          <div className="flex items-center gap-2 mb-2">
            <Image
              src="/assets/mobile/home/office.svg"
              alt="Office"
              width={18}
              height={18}
              className="w-[18px] h-[18px] flex-shrink-0"
            />
            <span className="text-sm text-[#000000] font-medium line-clamp-1">
              {mentor.company}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Image
              src="/assets/mobile/home/position.svg"
              alt="Position"
              width={18}
              height={18}
              className="w-[18px] h-[18px] flex-shrink-0"
            />
            <span className="text-sm text-[#000000] font-medium line-clamp-2">
              {mentor.position}
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <a
            href={mentor.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
          >
            <Image
              src="/assets/home/linkedinbutton.svg"
              alt="LinkedIn Button"
              width={200}
              height={56}
              className="h-auto w-[200px]"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default function MentorCarousel() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 8;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let isPaused = false;
    const onEnter = () => {
      isPaused = true;
    };
    const onLeave = () => {
      isPaused = false;
    };
    const tick = () => {
      if (!el) return;
      if (!isPaused) {
        el.scrollLeft += 1;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      }
    };
    const id = setInterval(tick, 18);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      clearInterval(id);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const el = mobileScrollRef.current;
    if (!el) return;

    let isPaused = false;
    let isManualScroll = false;
    let scrollTimeout: NodeJS.Timeout;

    const enableSnapScroll = () => {
      el.style.scrollBehavior = "smooth";
      el.classList.add("snap-x", "snap-mandatory");
    };

    const disableSnapScroll = () => {
      el.style.scrollBehavior = "auto";
      el.classList.remove("snap-x", "snap-mandatory");
    };

    const onTouchStart = () => {
      isPaused = true;
      isManualScroll = true;
      disableSnapScroll();
    };

    const onTouchEnd = () => {
      enableSnapScroll();
      setTimeout(() => {
        isPaused = false;
      }, 2500);
      setTimeout(() => {
        isManualScroll = false;
        disableSnapScroll();
      }, 3000);
    };

    const onScroll = () => {
      if (isManualScroll) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const cardWidth = 280 + 24;
          const newSlide = Math.round(el.scrollLeft / cardWidth) % totalSlides;
          setCurrentSlide(newSlide);
        }, 100);
      }
    };

    const autoScroll = setInterval(() => {
      if (!isPaused && el && !isManualScroll) {
        const cardWidth = 280 + 24;
        el.scrollLeft += 1;
        const newSlide = Math.round(el.scrollLeft / cardWidth) % totalSlides;
        setCurrentSlide(newSlide);

        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
    }, 16);

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("mousedown", onTouchStart);
    el.addEventListener("mouseup", onTouchEnd);
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearInterval(autoScroll);
      clearTimeout(scrollTimeout);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("mousedown", onTouchStart);
      el.removeEventListener("mouseup", onTouchEnd);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="w-full bg-white py-6 px-4">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl md:text-5xl font-bold mb-5 mt-10">
          <span className="text-gray-900">Mentor Berpengalaman dari </span>
          <span className="text-[#0056A3] relative inline-block">
            Top Company
            <span className="absolute left-0 right-0 -bottom-2 h-1 bg-[#AFC6FF] rounded-full"></span>
          </span>
        </h2>

        {/* Desktop View */}
        <div className="hidden md:block relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10" />

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

        {/* Mobile View */}
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
                  i === currentSlide ? "w-8 bg-[#AFC6FF]" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar {
          -ms-overflow-style: none; /* IE/Edge */
          scrollbar-width: none; /* Firefox */
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome/Safari/WebKit */
        }
        .scroll-smooth {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        .snap-x {
          scroll-snap-type: x mandatory;
        }
        .snap-mandatory {
          scroll-snap-type: x mandatory;
        }
        .snap-center {
          scroll-snap-align: center;
        }
        /* Optimized smooth auto-scroll */
        .flex.gap-6.overflow-x-auto {
          will-change: scroll-position;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .anim-delay-0 {
          animation-delay: 0ms;
        }
        .anim-delay-80 {
          animation-delay: 80ms;
        }
        .anim-delay-160 {
          animation-delay: 160ms;
        }
        .anim-delay-240 {
          animation-delay: 240ms;
        }
        .anim-delay-320 {
          animation-delay: 320ms;
        }
        .anim-delay-400 {
          animation-delay: 400ms;
        }
        .anim-delay-480 {
          animation-delay: 480ms;
        }
        .anim-delay-560 {
          animation-delay: 560ms;
        }
        .anim-delay-640 {
          animation-delay: 640ms;
        }
        .anim-delay-720 {
          animation-delay: 720ms;
        }
      `}</style>
    </section>
  );
}
