"use client";

import React from "react";
import Image from "next/image";

type Company = {
  name: string;
  url: string;
  svg: string;
  mobileSvg?: string;
};

const PublishedAndPartnership: React.FC = () => {
  const published: readonly Company[] = [
    {
      name: "kumparan",
      url: "https://kumparan.com/",
      svg: "/assets/home/published-on/kumparan.svg",
      mobileSvg: "/assets/mobile/home/partnership-with/mobilekumparan.png",
    },
    {
      name: "idntimes",
      url: "https://www.idntimes.com/",
      svg: "/assets/home/published-on/idntimes.svg",
      mobileSvg: "/assets/mobile/home/partnership-with/mobileidntimes.png",
    },
    {
      name: "cnbc",
      url: "https://www.cnbcindonesia.com/",
      svg: "/assets/home/published-on/cnbc.svg",
      mobileSvg: "/assets/mobile/home/partnership-with/mobilecnbc.png",
    },
    {
      name: "rri",
      url: "https://rri.co.id/",
      svg: "/assets/home/published-on/rri.svg",
      mobileSvg: "/assets/mobile/home/partnership-with/mobilerri.png",
    },
    {
      name: "pertamina",
      url: "https://www.pertamina.com/",
      svg: "/assets/home/published-on/pertamina.svg",
      mobileSvg: "/assets/mobile/home/partnership-with/mobilepertamina.png",
    },
  ] as const;

  const partner: readonly Company[] = [
    {
      name: "badaklng",
      url: "https://badaklng.com/id/",
      svg: "/assets/home/partnership-with/badaklng.svg",
      mobileSvg: "/assets/mobile/home/published-on/mobilebadaklng.png",
    },
    {
      name: "dana",
      url: "https://www.dana.id/",
      svg: "/assets/home/partnership-with/dana.svg",
      mobileSvg: "/assets/mobile/home/published-on/mobiledana.png",
    },
    {
      name: "glints",
      url: "https://glints.com/id/en",
      svg: "/assets/home/partnership-with/glints.svg",
      mobileSvg: "/assets/mobile/home/published-on/mobileglints.png",
    },
    {
      name: "kariermu",
      url: "https://www.karier.mu/",
      svg: "/assets/home/partnership-with/kariermu.svg",
      mobileSvg: "/assets/mobile/home/published-on/mobilekariermu.png",
    },
    {
      name: "kitalulus",
      url: "https://www.kitalulus.com/",
      svg: "/assets/home/partnership-with/kitalulus.svg",
      mobileSvg: "/assets/mobile/home/published-on/mobilekitalulus.png",
    },
    {
      name: "kobieducation",
      url: "https://kobieducation.com/",
      svg: "/assets/home/partnership-with/kobieducation.svg",
      mobileSvg: "/assets/mobile/home/published-on/mobilekobieducation.png",
    },
    {
      name: "line",
      url: "https://www.line.me/id/",
      svg: "/assets/home/partnership-with/line.svg",
      mobileSvg: "/assets/mobile/home/published-on/mobileline.png",
    },
    {
      name: "reddoorz",
      url: "https://www.reddoorz.com/en-id/",
      svg: "/assets/home/partnership-with/reddoorz.svg",
      mobileSvg: "/assets/mobile/home/published-on/mobilereddoorz.png",
    },
  ] as const;

  const publishedDup = [
    ...published,
    ...published,
    ...published,
    ...published,
  ] as const;
  const partnerDup = [...partner, ...partner, ...partner, ...partner] as const;
  const publishedDupDesktop = [...published, ...published] as const;
  const partnerDupDesktop = [...partner, ...partner] as const;

  const LogoCard: React.FC<{ company: Company; isMobile?: boolean }> = ({
    company,
    isMobile = false,
  }) => {
    if (isMobile) {
      return (
        <a
          href={company.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={company.name}
          className="logo-card-mobile"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "180px",
            width: "180px",
            height: "100px",
            flexShrink: 0,
          }}
        >
          <img
            src={company.mobileSvg || company.svg}
            alt={company.name}
            style={{
              width: "180px",
              height: "100px",
              objectFit: "contain",
            }}
          />
        </a>
      );
    }

    return (
      <a
        href={company.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={company.name}
        className="logo-card"
      >
        <Image
          src={company.svg}
          alt={company.name}
          width={300}
          height={104}
          className="logo-image"
          priority={false}
        />
      </a>
    );
  };

  return (
    <div className="w-screen bg-white py-8 md:py-16 overflow-hidden">
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-row justify-between gap-15">
        {/* Published On */}
        <div className="pr-4 md:pr-0 md:flex-1">
          <div className="bg-[#EAF3FF] rounded-r-3xl p-8 space-y-6 md:pl-16 pl-4">
            <h2 className="text-center text-3xl md:text-4xl font-extrabold text-gray-900 font-['Plus Jakarta Sans']">
              Published On
            </h2>

            <div className="flex gap-x-2 md:gap-x-4">
              {/* Kolom kiri */}
              <div className="marquee-col">
                <div className="marquee-track marquee-down">
                  {publishedDupDesktop.map((c, i) => (
                    <LogoCard key={`pub-left-${c.name}-${i}`} company={c} />
                  ))}
                </div>
              </div>

              {/* Kolom kanan */}
              <div className="marquee-col">
                <div className="marquee-track marquee-up">
                  {publishedDupDesktop.map((c, i) => (
                    <LogoCard key={`pub-right-${c.name}-${i}`} company={c} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership With */}
        <div className="pl-4 md:pl-0 md:flex-1">
          <div className="bg-[#EAF3FF] rounded-l-3xl p-8 space-y-6 md:pr-16 pr-4">
            <h2 className="text-center text-3xl md:text-4xl font-extrabold text-gray-900 font-['Plus Jakarta Sans']">
              Partnership With
            </h2>

            <div className="flex gap-x-2 md:gap-x-4">
              {/* Kolom kiri */}
              <div className="marquee-col">
                <div className="marquee-track marquee-down">
                  {partnerDupDesktop.map((c, i) => (
                    <LogoCard key={`part-left-${c.name}-${i}`} company={c} />
                  ))}
                </div>
              </div>

              {/* Kolom kanan */}
              <div className="marquee-col">
                <div className="marquee-track marquee-up">
                  {partnerDupDesktop.map((c, i) => (
                    <LogoCard key={`part-right-${c.name}-${i}`} company={c} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden flex-col space-y-10 px-4">
        {/* Published By */}
        <div className="space-y-3">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-semibold text-[#1E5BA8] font-['Poppins']">
              Published By
            </h2>
            <div className="w-52 h-1 bg-[#AFC6FF] rounded-full mt-2.5"></div>
          </div>

          <div className="relative overflow-hidden">
            <div className="carousel-container">
              <div className="carousel-track-left">
                {publishedDup.map((c, i) => (
                  <LogoCard
                    key={`pub-mobile-${c.name}-${i}`}
                    company={c}
                    isMobile={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Partnership With */}
        <div className="space-y-3">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-semibold text-[#1E5BA8] font-['Poppins']">
              Partnership With
            </h2>
            <div className="w-72 h-1 bg-[#AFC6FF] rounded-full mt-2.5"></div>
          </div>
          <div className="relative overflow-hidden">
            <div className="carousel-container">
              <div className="carousel-track-right">
                {partnerDup.map((c, i) => (
                  <LogoCard
                    key={`part-mobile-${c.name}-${i}`}
                    company={c}
                    isMobile={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .logo-card {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
          border: 2px solid #c5dbf5;
          border-radius: 20px;
          padding: 20px;
          min-width: 240px;
          height: 120px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }
        .logo-card:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
          border-color: #3b82f6;
        }
        .logo-card:active {
          transform: scale(0.98);
        }
        .logo-image {
          width: 300px;
          height: 104px;
          object-fit: contain;
        }

        .logo-card-mobile {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .logo-card-mobile:active {
          transform: scale(0.95);
        }

        .carousel-container {
          overflow: hidden;
          width: 100%;
          padding: 10px 0;
          position: relative;
          -webkit-overflow-scrolling: touch;
        }
        .carousel-track-left,
        .carousel-track-right {
          display: flex;
          gap: 24px;
          width: fit-content;
        }
        .carousel-track-left {
          animation: scroll-left-mobile 40s linear infinite;
          will-change: transform;
        }
        .carousel-track-right {
          animation: scroll-right-mobile 50s linear infinite;
          will-change: transform;
        }
        .carousel-track-left:hover,
        .carousel-track-right:hover {
          animation-play-state: paused;
        }
        @keyframes scroll-left-mobile {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-25% - 6px));
          }
        }
        @keyframes scroll-right-mobile {
          0% {
            transform: translateX(calc(-25% - 6px));
          }
          100% {
            transform: translateX(0);
          }
        }
        .carousel-track-left *,
        .carousel-track-right * {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
        }

        /* ----------------- DESKTOP ----------------- */
        /* Kolom container dengan tinggi tetap; track auto-height (konten) */
        .marquee-col {
          position: relative;
          overflow: hidden;
          height: 420px;
          width: 100%;
        }

        /* Track absolut: hanya top/left/right supaya tingginya = konten (auto),
           bukan terkunci 420px. Ini kunci biar % transform pakai tinggi track sendiri. */
        .marquee-track {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          gap: 1.25rem; /* md:gap-y-5 ekuivalen 20px; sesuaikan jika perlu */
          will-change: transform;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
        }

        /* Animasi (dipakai hanya di desktop via media query) */
        @keyframes marquee-down {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(0, -50%, 0);
          } /* geser setengah tinggi track */
        }
        @keyframes marquee-up {
          0% {
            transform: translate3d(0, -50%, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        @media (min-width: 768px) {
          .marquee-down {
            animation: marquee-down 12s linear infinite;
          }
          .marquee-up {
            animation: marquee-up 12s linear infinite;
          }

          /* Opsional: pause on hover di desktop */
          .marquee-down:hover,
          .marquee-up:hover {
            animation-play-state: paused;
          }
        }

        /* Aksesibilitas: hormati preferensi pengurangan gerak */
        @media (prefers-reduced-motion: reduce) {
          .marquee-down,
          .marquee-up,
          .carousel-track-left,
          .carousel-track-right {
            animation: none !important;
          }
        }
        /* ------------------------------------------------------------------- */
      `}</style>
    </div>
  );
};

export default PublishedAndPartnership;
